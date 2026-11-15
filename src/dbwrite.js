// 生成一个 Bedrock 可读的 LevelDB：CURRENT + MANIFEST + 单个 .log（全部键值放在 write batch 里）
// 不重写 SSTable，避免破坏原有表结构；读取方按日志重放即可拿到全部键值。

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0x82f63b78 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32c(u8) {
  let c = 0xffffffff;
  for (let i = 0; i < u8.length; i++) c = CRC_TABLE[(c ^ u8[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function mask(crc) { return ((((crc >>> 15) | (crc << 17)) >>> 0) + 0xa282ead8) >>> 0; }

function varint(n) {
  const out = [];
  n = Number(n);
  while (n >= 0x80) { out.push((n & 0x7f) | 0x80); n = Math.floor(n / 128); }
  out.push(n);
  return Uint8Array.from(out);
}

const concat = (arrs) => {
  let len = 0; for (const a of arrs) len += a.length;
  const out = new Uint8Array(len); let p = 0;
  for (const a of arrs) { out.set(a, p); p += a.length; }
  return out;
};

// 日志记录（32KB 块，7 字节头）
function logRecords(payloads) {
  const BLOCK = 32768, HEAD = 7;
  const out = [];
  let blockPos = 0;                 // 当前块内已用字节
  for (const data of payloads) {
    let pos = 0;
    while (pos < data.length) {
      let avail = BLOCK - blockPos;
      if (avail < HEAD) {           // 块尾不足一个头，填零
        out.push(new Uint8Array(avail));
        blockPos = 0;
        avail = BLOCK;
      }
      const len = Math.min(avail - HEAD, data.length - pos);
      const type = (pos === 0 && len === data.length) ? 1 : (pos === 0 ? 2 : (pos + len === data.length ? 4 : 3));
      const frag = data.subarray(pos, pos + len);
      const crc = mask(crc32c(concat([Uint8Array.from([type]), frag])));
      const h = new Uint8Array(HEAD);
      const dv = new DataView(h.buffer);
      dv.setUint32(0, crc, true);
      dv.setUint16(4, len, true);
      dv.setUint8(6, type);
      out.push(h, frag);
      pos += len;
      blockPos += HEAD + len;
    }
  }
  return concat(out);
}

function writeBatch(entries, seq) {
  const parts = [new Uint8Array(8), new Uint8Array(4)];
  new DataView(parts[0].buffer).setUint32(0, seq >>> 0, true);
  if (seq >= 2 ** 32) new DataView(parts[0].buffer).setUint32(4, Math.floor(seq / 2 ** 32), true);
  new DataView(parts[1].buffer).setUint32(0, entries.length, true);
  const body = [parts[0], parts[1]];
  for (const e of entries) {
    const k = typeof e.key === 'string' ? new TextEncoder().encode(e.key) : e.key;
    const v = typeof e.value === 'string' ? new TextEncoder().encode(e.value) : e.value;
    body.push(Uint8Array.from([1]), varint(k.length), k, varint(v.length), v);
  }
  return concat(body);
}

// VersionEdit：comparator + log number + next file + last sequence
function versionEdit(comparator, logNumber, nextFile, lastSeq) {
  const parts = [];
  const str = new TextEncoder().encode(comparator);
  parts.push(varint(1), varint(str.length), str);
  parts.push(varint(2), varint(logNumber));
  parts.push(varint(9), varint(0));            // prev log number
  parts.push(varint(3), varint(nextFile));
  parts.push(varint(4), varint(lastSeq));
  return concat(parts);
}

// entries: [{key, value}]（value 可为 Uint8Array 或字符串）
export function buildDb(entries, { comparator = 'leveldb.BytewiseComparator', chunk = 2000 } = {}) {
  if (!entries.length) throw new Error('没有可写入的键值');
  const batches = [];
  let seq = 0;
  for (let i = 0; i < entries.length; i += chunk) {
    const slice = entries.slice(i, i + chunk);
    seq += slice.length;
    batches.push(writeBatch(slice, seq));
  }
  const logNumber = 2;
  const nextFile = 3;
  const manifestName = 'MANIFEST-000001';
  const logName = String(logNumber).padStart(6, '0') + '.log';
  return {
    [manifestName]: logRecords([versionEdit(comparator, logNumber, nextFile, seq)]),
    [logName]: logRecords(batches),
    CURRENT: new TextEncoder().encode(manifestName + '\n'),
    logName,
  };
}

export function crc32cOf(u8) { return crc32c(u8); }
