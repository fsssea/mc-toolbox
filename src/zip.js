// 极简 ZIP 读取器：只支持 store / deflate，够读 .mctemplate / .mcworld
import { inflateRaw, deflateRaw } from 'pako';

export function parseZip(u8) {
  const dv = new DataView(u8.buffer, u8.byteOffset, u8.byteLength);
  const len = u8.length;
  // 找 EOCD
  let eocd = -1;
  for (let i = len - 22; i >= Math.max(0, len - 65558); i--) {
    if (dv.getUint32(i, true) === 0x06054b50) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error('不是有效的 ZIP（找不到中央目录）');
  const count = dv.getUint16(eocd + 10, true);
  const cdOffset = dv.getUint32(eocd + 16, true);
  const entries = [];
  let p = cdOffset;
  const td = new TextDecoder('utf-8');
// CP437（ZIP 未设置 0x0800 时的传统文件名编码）
const CP437 = 'ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■\u00A0';
function decodeZipName(bytes, flags) {
  if (flags & 0x0800) return td.decode(bytes);
  let out = '';
  for (const b of bytes) out += b < 128 ? String.fromCharCode(b) : CP437[b - 128] || '?';
  return out;
}
  for (let i = 0; i < count; i++) {
    if (p + 46 > len || dv.getUint32(p, true) !== 0x02014b50) break;
    const flags = dv.getUint16(p + 8, true);
    const method = dv.getUint16(p + 10, true);
    const csize = dv.getUint32(p + 20, true);
    const usize = dv.getUint32(p + 24, true);
    const nameLen = dv.getUint16(p + 28, true);
    const extraLen = dv.getUint16(p + 30, true);
    const commentLen = dv.getUint16(p + 32, true);
    const localOffset = dv.getUint32(p + 42, true);
    const nameBytes = u8.subarray(p + 46, p + 46 + nameLen);
    entries.push({ name: decodeZipName(nameBytes, flags), method, csize, usize, localOffset, flags });
    p += 46 + nameLen + extraLen + commentLen;
  }
  function rawData(entry) {
    if (dv.getUint32(entry.localOffset, true) !== 0x04034b50) throw new Error('ZIP 本地头损坏：' + entry.name);
    const nl = dv.getUint16(entry.localOffset + 26, true);
    const el = dv.getUint16(entry.localOffset + 28, true);
    const start = entry.localOffset + 30 + nl + el;
    const end = start + (entry.csize || entry.usize);
    return u8.subarray(start, end);
  }
  function read(entry) {
    const raw = rawData(entry);
    if (entry.method === 0) return raw;
    if (entry.method === 8) return inflateRaw(raw);
    throw new Error('不支持的压缩方式 ' + entry.method);
  }
  return {
    entries,
    names: entries.map(e => e.name),
    find: (n) => entries.find(e => e.name === n),
    findEndsWith: (s) => entries.find(e => e.name.endsWith(s)),
    read,
    // 取出 db 目录下的 LevelDB 文件，转成 readLevelDb 需要的 {name, arrayBuffer}
    levelDbFiles() {
      const re = /(^|\/)(CURRENT|MANIFEST-[0-9]+|[0-9]+\.(ldb|log|sst))$/;
      const out = [];
      for (const e of entries) {
        const base = e.name.split('/').pop();
        if (!re.test(e.name)) continue;
        if (!base) continue;
        const data = read(e);
        out.push({ name: base, arrayBuffer: async () => data });
      }
      return out;
    }
  };
}

// ---------- 打包 ----------
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(data) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < data.length; i++) c = CRC_TABLE[(c ^ data[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}

// files: [{name, data:Uint8Array}] → ZIP 字节
export function buildZip(files, { deflate = true } = {}) {
  if (!Array.isArray(files)) throw new Error('buildZip 需要 [{name,data}] 数组');
  if (files.length > 65535) throw new Error('ZIP 条目超过 65535，暂不支持');
  const out = [];
  let offset = 0;
  const central = [];
  const te = new TextEncoder();
  for (const f of files) {
    const data = f.data instanceof Uint8Array ? f.data : new Uint8Array(f.data);
    const nameBytes = te.encode(f.name || f.path);
    const crc = crc32(data);
    let comp = data;
    if (deflate && data.length > 64) { try { comp = inflateSafe(data); if (comp.length >= data.length) comp = data; } catch (e) { comp = data; } }
    if (offset > 0xfffffffe) throw new Error('ZIP 超过 4GB');
    const method = comp === data ? 0 : 8;
    const head = new Uint8Array(30 + nameBytes.length);
    const dv = new DataView(head.buffer);
    dv.setUint32(0, 0x04034b50, true);
    dv.setUint16(4, 20, true);
    dv.setUint16(6, 0x0800, true);
    dv.setUint16(8, method, true);
    dv.setUint16(10, 0, true); dv.setUint16(12, 0x21, true); // 1980-01-01
    dv.setUint32(14, crc, true);
    dv.setUint32(18, comp.length, true);
    dv.setUint32(22, data.length, true);
    dv.setUint16(26, nameBytes.length, true);
    dv.setUint16(28, 0, true);
    head.set(nameBytes, 30);
    out.push(head, comp);
    central.push({ nameBytes, crc, compLen: comp.length, size: data.length, method, offset });
    offset += head.length + comp.length;
  }
  const cdStart = offset;
  for (const c of central) {
    const rec = new Uint8Array(46 + c.nameBytes.length);
    const dv = new DataView(rec.buffer);
    dv.setUint32(0, 0x02014b50, true);
    dv.setUint16(4, 20, true); dv.setUint16(6, 20, true);
    dv.setUint16(8, 0x0800, true);
    dv.setUint16(10, c.method, true);
    dv.setUint16(12, 0, true); dv.setUint16(14, 0x21, true);
    dv.setUint32(16, c.crc, true);
    dv.setUint32(20, c.compLen, true);
    dv.setUint32(24, c.size, true);
    dv.setUint16(28, c.nameBytes.length, true);
    dv.setUint32(42, c.offset, true);
    rec.set(c.nameBytes, 46);
    out.push(rec);
    offset += rec.length;
  }
  const eocd = new Uint8Array(22);
  const dv = new DataView(eocd.buffer);
  dv.setUint32(0, 0x06054b50, true);
  dv.setUint16(8, central.length, true);
  dv.setUint16(10, central.length, true);
  dv.setUint32(12, offset - cdStart, true);
  dv.setUint32(16, cdStart, true);
  out.push(eocd);

  const total = out.reduce((s, a) => s + a.length, 0);
  const res = new Uint8Array(total);
  let p = 0;
  for (const a of out) { res.set(a, p); p += a.length; }
  return res;
}

// 压缩（失败则原样存储）
function inflateSafe(data) {
  try {
    const d = deflateRaw(data);
    return d.length < data.length ? d : data;
  } catch (e) { return data; }
}
