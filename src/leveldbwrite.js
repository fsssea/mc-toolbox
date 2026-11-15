// LevelDB 写入：按官方 log + WriteBatch 格式追加记录
import { writeNBT, parseNBT, plainNBT } from './nbt.js';

const BLOCK = 32768, HEADER = 7;

let CRC_TABLE = null;
function crcTable() {
  if (CRC_TABLE) return CRC_TABLE;
  CRC_TABLE = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0x82f63b78 ^ (c >>> 1)) : (c >>> 1);
    CRC_TABLE[n] = c;
  }
  return CRC_TABLE;
}
function crc32c(data) {
  const t = crcTable(); let c = 0xffffffff;
  for (let i = 0; i < data.length; i++) c = t[(c ^ data[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function maskCrc(c) { return (((c >>> 15) | (c << 17)) + 0xa282ead8) >>> 0; }

function varint(n) {
  const out = [];
  while (n >= 0x80) { out.push((n & 0x7f) | 0x80); n >>>= 7; }
  out.push(n & 0x7f);
  return out;
}

// WriteBatch：seq(u64) + count(u32) + [type=1, keyVarint, key, valVarint, val]
export function writeBatch(seq, ops) {
  const bytes = [];
  const u64 = (v) => { const b = new Uint8Array(8); new DataView(b.buffer).setBigUint64(0, BigInt(v), true); bytes.push(...b); };
  const u32 = (v) => { const b = new Uint8Array(4); new DataView(b.buffer).setUint32(0, v, true); bytes.push(...b); };
  u64(seq); u32(ops.length);
  for (const op of ops) {
    bytes.push(1);
    const kb = toBytes(op.key), vb = toBytes(op.value);
    bytes.push(...varint(kb.length), ...kb, ...varint(vb.length), ...vb);
  }
  return new Uint8Array(bytes);
}

function toBytes(v) {
  if (v instanceof Uint8Array) return v;
  if (v instanceof ArrayBuffer) return new Uint8Array(v);
  if (ArrayBuffer.isView(v)) return new Uint8Array(v.buffer, v.byteOffset, v.byteLength);
  return new TextEncoder().encode(String(v));
}

function recordFragments(payload) {
  const frags = [];
  let p = 0;
  while (p < payload.length) {
    const left = payload.length - p;
    if (left <= BLOCK - HEADER) { frags.push({ type: 1, data: payload.subarray(p) }); p = payload.length; break; }
    frags.push({ type: 2, data: payload.subarray(p, p + BLOCK - HEADER) });
    p += BLOCK - HEADER;
    while (payload.length - p > BLOCK - HEADER) {
      frags.push({ type: 3, data: payload.subarray(p, p + BLOCK - HEADER) });
      p += BLOCK - HEADER;
    }
    frags.push({ type: 4, data: payload.subarray(p) });
    p = payload.length;
  }
  return frags;
}

// 追加逻辑记录到已有 log 末尾（按 32768 字节块规则分片，与官方 writer 一致）
export function appendRecords(logU8, records) {
  const out = Array.from(logU8);
  const ensure = (n) => { while (out.length < n) out.push(0); };
  const writeFrag = (data, type) => {
    const left = BLOCK - (out.length % BLOCK);
    if (left < HEADER + 1) { for (let i = 0; i < left; i++) out.push(0); }
    const h = new Uint8Array(HEADER + data.length);
    const dv = new DataView(h.buffer);
    dv.setUint32(0, maskCrc(crc32c(data)), true);
    dv.setUint32(4, data.length, true);
    h[6] = type;
    h.set(data, HEADER);
    for (let i = 0; i < h.length; i++) out.push(h[i]);
  };
  for (const rec of records) {
    let p = 0;
    let first = true;
    while (p < rec.length) {
      let left = BLOCK - (out.length % BLOCK);
      if (left < HEADER + 1) { for (let i = 0; i < left; i++) out.push(0); left = BLOCK; }
      const avail = left - HEADER;
      const take = Math.min(avail, rec.length - p);
      const isLast = (p + take === rec.length);
      const type = first && isLast ? 1 : (first ? 2 : (isLast ? 4 : 3));
      writeFrag(rec.subarray(p, p + take), type);
      p += take;
      first = false;
    }
  }
  return new Uint8Array(out);
}

// 从 NBT 节点树改玩家数据
export function editPlayerNbt(u8, edits) {
  const res = parseNBT(u8, 0, true);
  const root = res.root.value;
  const put = (k, node) => { root[k] = node; };
  if (edits.pos) {
    const [x, y, z] = edits.pos;
    const old = root.Pos;
    const et = old && old.t === 9 && old.et === 6 ? 6 : 5;
    put('Pos', { t: 9, et, v: [x, y, z].map(v => ({ t: et, v: Number(v) })) });
  }
  if (edits.health !== undefined) {
    const old = root.Health;
    const t = old && (old.t === 2 || old.t === 5) ? old.t : 5;
    put('Health', { t, v: Number(edits.health) });
  }
  if (edits.inventory) {
    const items = edits.inventory.map(it => ({
      t: 10, v: {
        Name: { t: 8, v: String(it.name || it.Name || 'minecraft:stone') },
        Count: { t: 1, v: Number(it.count || it.Count || 1) },
        Damage: { t: 2, v: Number(it.damage || it.Damage || 0) },
        WasPickedUp: { t: 1, v: 0 },
        Slot: { t: 1, v: Number(it.slot ?? it.Slot ?? 0) }
      }
    }));
    put('Inventory', { t: 9, et: 10, v: items });
  }
  return writeNBT({ root: { type: 10, name: '', value: root } }, true);
}

// 改玩家背包里某本成书的页面/标题/作者，其余 NBT 原样保留
export function editBookPages(u8, invIndex, pages, title, author) {
  const res = parseNBT(u8, 0, true);
  const root = res.root.value;
  const inv = root.Inventory;
  if (!inv || inv.t !== 9) throw new Error('玩家数据里没有背包');
  const item = inv.v[invIndex];
  if (!item || item.t !== 10) throw new Error('背包槽位 ' + invIndex + ' 不是物品');
  const tag = item.v.tag;
  if (!tag || tag.t !== 10) throw new Error('这本书没有 NBT tag');
  const list = { t: 9, et: 8, v: pages.map(pg => ({ t: 8, v: String(pg) })) };
  tag.v.pages = list;
  if (title !== undefined && title !== null && title !== '') tag.v.title = { t: 8, v: String(title) };
  if (author !== undefined && author !== null && author !== '') tag.v.author = { t: 8, v: String(author) };
  return writeNBT({ root: { type: 10, name: '', value: root } }, true);
}

// 调整个物品在背包里的槽位；其余 NBT（含书的 pages）原样保留
export function editItemSlots(u8, slotMap) {
  const res = parseNBT(u8, 0, true);
  const root = res.root.value;
  const inv = root.Inventory;
  if (!inv || inv.t !== 9) throw new Error('玩家数据里没有背包');
  const items = inv.v;
  const slots = items.map(it => (it.v.Slot ? Number(it.v.Slot.v) : 0));
  for (const [idxStr, wantStr] of Object.entries(slotMap)) {
    const i = Number(idxStr), want = Number(wantStr);
    if (!items[i] || !Number.isFinite(want) || want < 0) continue;
    const from = slots[i];
    if (want === from) continue;
    const occupied = slots.findIndex((s0, k) => k !== i && s0 === want);
    if (occupied >= 0) slots[occupied] = from; // 目标被占：互换
    slots[i] = want;
  }
  items.forEach((it, i) => {
    if (!it.v.Slot) it.v.Slot = { t: 1, v: slots[i] };
    else it.v.Slot.v = slots[i];
  });
  return writeNBT({ root: { type: 10, name: '', value: root } }, true);
}

// 在 db 文件集合里找到目标 log 并追加
export function appendKvToDb(dbFilesRaw, key, value, seq) {
  // dbFilesRaw: [{name, data}]
  const logs = dbFilesRaw.filter(f => /\.log$/i.test(f.name)).sort((a, b) => a.name.localeCompare(b.name));
  if (!logs.length) throw new Error('这个存档没有 .log 文件，无法安全追加写入');
  const log = logs[logs.length - 1];
  const batch = writeBatch(seq, [{ key, value }]);
  log.data = appendRecords(log.data, [batch]);
  return { logName: log.name, bytes: log.data };
}

export function playerSummary(u8) {
  const p = plainNBT(parseNBT(u8, 0, true));
  const inv = Array.isArray(p.Inventory) ? p.Inventory : [];
  return {
    pos: p.Pos ? p.Pos.map(v => Number(v)) : null,
    health: p.Health !== undefined ? Number(p.Health) : null,
    inventory: inv.map(i => ({ name: String(i.Name || ''), count: Number(i.Count ?? 1), slot: Number(i.Slot ?? 0), damage: Number(i.Damage ?? 0) })),
    raw: p
  };
}
