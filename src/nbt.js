// 基岩版 NBT 解析（支持小端/大端），纯 JS 实现
export function parseNBT(u8, offset = 0, little = true) {
  let p = offset;
  const dv = new DataView(u8.buffer, u8.byteOffset, u8.byteLength);
  const u16 = () => { const v = dv.getUint16(p, little); p += 2; return v; };
  const i32 = () => { const v = dv.getInt32(p, little); p += 4; return v; };
  const f32 = () => { const v = dv.getFloat32(p, little); p += 4; return v; };
  const f64 = () => { const v = dv.getFloat64(p, little); p += 8; return v; };
  const u64 = () => { const v = dv.getBigInt64(p, little); p += 8; return v; };
  const str = () => { const n = u16(); const s = new TextDecoder('utf-8', { fatal: false }).decode(u8.subarray(p, p + n)); p += n; return s; };

  function payload(t) {
    switch (t) {
      case 1: return { t, v: dv.getInt8(p++) };
      case 2: { const v = dv.getInt16(p, little); p += 2; return { t, v }; }
      case 3: return { t, v: i32() };
      case 4: return { t, v: u64() };
      case 5: return { t, v: f32() };
      case 6: return { t, v: f64() };
      case 7: { const n = i32(); const a = u8.subarray(p, p + n); p += n; return { t, v: Array.from(a) }; }
      case 8: return { t, v: str() };
      case 9: {
        const et = dv.getUint8(p++); const n = i32(); const arr = [];
        for (let i = 0; i < n; i++) arr.push(payload(et));
        return { t: 9, et, v: arr };
      }
      case 10: {
        const obj = {};
        while (true) {
          const ct = dv.getUint8(p++);
          if (ct === 0) break;
          const name = str();
          obj[name] = payload(ct);
        }
        return { t: 10, v: obj };
      }
      case 11: { const n = i32(); const arr = []; for (let i = 0; i < n; i++) arr.push(i32()); return { t, v: arr }; }
      case 12: { const n = i32(); const arr = []; for (let i = 0; i < n; i++) arr.push(Number(u64())); return { t, v: arr }; }
      default: throw new Error('未知 NBT 类型 ' + t + ' @' + (p - 1));
    }
  }

  const rootType = dv.getUint8(p++);
  const rootName = str();
  const root = payload(rootType);
  return { root: { type: rootType, name: rootName, value: root.v }, end: p, consumed: p - offset };
}

// 把 NBT 结构翻译成普通 JS 对象
export function plain(node) {
  if (node === undefined) return undefined;
  const v = node.v !== undefined ? node.v : node;
  switch (node.t) {
    case 4: return Number(v);
    case 7: return v;
    case 9: return v.map(x => (x && x.t !== undefined) ? plain(x) : x);
    case 10: {
      const o = {};
      for (const k in v) o[k] = plain(v[k]);
      return o;
    }
    default: return v;
  }
}

// 直接把 parseNBT 的返回值转成普通对象
export function plainNBT(res) {
  return plain({ t: res.root.type, v: res.root.value });
}

// 自动跳过可能的 8 字节 level.dat 文件头
export function parseNBTWithHeader(u8, little = true) {
  let best = null;
  for (const off of [0, 8]) {
    try {
      const r = parseNBT(u8, off, little);
      if (r.root.type === 10) { best = r; if (off === 8) return r; }
    } catch (e) { /* 忽略 */ }
  }
  if (best) return best;
  throw new Error('无法解析 NBT');
}

// ---------- 序列化 ----------
const TE = new TextEncoder();

export function writeNBT(res, little = true) {
  const buf = [];
  let cap = 4096;
  let out = new Uint8Array(cap);
  let p = 0;
  const ensure = (n) => {
    if (p + n <= cap) return;
    while (p + n > cap) cap *= 2;
    const nb = new Uint8Array(cap);
    nb.set(out.subarray(0, p));
    out = nb;
  };
  const u8 = (v) => { ensure(1); out[p++] = v & 0xff; };
  const i16 = (v) => { ensure(2); new DataView(out.buffer).setInt16(p, v, little); p += 2; };
  const i32 = (v) => { ensure(4); new DataView(out.buffer).setInt32(p, v, little); p += 4; };
  const i64 = (v) => { ensure(8); new DataView(out.buffer).setBigInt64(p, BigInt(v), little); p += 8; };
  const f32 = (v) => { ensure(4); new DataView(out.buffer).setFloat32(p, v, little); p += 4; };
  const f64 = (v) => { ensure(8); new DataView(out.buffer).setFloat64(p, v, little); p += 8; };
  const str = (s) => {
    const b = TE.encode(String(s));
    i16(b.length); ensure(b.length); out.set(b, p); p += b.length;
  };
  function payload(node) {
    const { t, v } = node;
    switch (t) {
      case 1: u8(v); break;
      case 2: i16(v); break;
      case 3: i32(v); break;
      case 4: i64(v); break;
      case 5: f32(v); break;
      case 6: f64(v); break;
      case 7: { const a = v instanceof Uint8Array ? v : Uint8Array.from(v); i32(a.length); ensure(a.length); out.set(a, p); p += a.length; break; }
      case 8: str(v); break;
      case 9: {
        u8(node.et); i32(v.length);
        for (const el of v) payload(el);
        break;
      }
      case 10: {
        for (const k in v) {
          const child = v[k];
          u8(child.t); str(k); payload(child);
        }
        u8(0);
        break;
      }
      case 11: { i32(v.length); for (const x of v) i32(x); break; }
      case 12: { i32(v.length); for (const x of v) i64(x); break; }
      default: throw new Error('无法序列化 NBT 类型 ' + t);
    }
  }
  u8(res.root.type); str(res.root.name || '');
  payload({ t: res.root.type, v: res.root.value });
  return out.subarray(0, p);
}

// 写回 level.dat：保留原 8 字节头的前 4 字节，更新文件头里的长度字段
export function writeLevelDat(originalU8, res) {
  const body = writeNBT(res, true);
  const out = new Uint8Array(8 + body.length);
  out.set(originalU8.subarray(0, 4), 0);
  new DataView(out.buffer).setUint32(4, body.length, true);
  out.set(body, 8);
  return out;
}
