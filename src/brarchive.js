// .brarchive：Mojang 新版包内文件归档格式
// 结构：魔数 8B(BE) 0x7d2725b1a0527026 + 条目数 4B(LE) + 版本 4B(LE)=1
//       每条目 256B：名称长度 1B + 名称 247B（补零）+ 偏移 4B(LE) + 长度 4B(LE)
//       数据区紧随目录之后，偏移相对数据区起点
const MAGIC = [0x7d, 0x27, 0x25, 0xb1, 0xa0, 0x52, 0x70, 0x26];
const ENTRY_SIZE = 256, NAME_MAX = 247;

export function isBrarchive(u8) {
  if (u8.length < 16) return false;
  for (let i = 0; i < 8; i++) if (u8[i] !== MAGIC[i]) return false;
  return true;
}

export function parseBrarchive(u8) {
  if (!isBrarchive(u8)) throw new Error('不是有效的 .brarchive 文件');
  const dv = new DataView(u8.buffer, u8.byteOffset, u8.byteLength);
  const count = dv.getUint32(8, true);
  const version = dv.getUint32(12, true);
  if (count > 200000) throw new Error('条目数异常：' + count);
  const dirStart = 16;
  const dataStart = dirStart + count * ENTRY_SIZE;
  const entries = [];
  const te = new TextDecoder('utf-8');
  for (let i = 0; i < count; i++) {
    const base = dirStart + i * ENTRY_SIZE;
    const nameLen = u8[base];
    const name = te.decode(u8.subarray(base + 1, base + 1 + nameLen));
    const offset = dv.getUint32(base + 248, true);
    const length = dv.getUint32(base + 252, true);
    entries.push({ name, offset, length, data: u8.subarray(dataStart + offset, dataStart + offset + length) });
  }
  return { version, entries };
}

export function buildBrarchive(files) {
  const count = files.length;
  const headerLen = 16 + count * ENTRY_SIZE;
  let totalData = 0;
  for (const f of files) totalData += f.data.length;
  const out = new Uint8Array(headerLen + totalData);
  const dv = new DataView(out.buffer);
  for (let i = 0; i < 8; i++) out[i] = MAGIC[i];
  dv.setUint32(8, count, true);
  dv.setUint32(12, 1, true);
  const te = new TextEncoder();
  let cursor = 0;
  for (let i = 0; i < count; i++) {
    const f = files[i];
    const base = 16 + i * ENTRY_SIZE;
    let nb = te.encode(f.name || f.path);
    if (nb.length > NAME_MAX) nb = nb.subarray(0, NAME_MAX);
    out[base] = nb.length;
    out.set(nb, base + 1);
    dv.setUint32(base + 248, cursor, true);
    dv.setUint32(base + 252, f.data.length, true);
    out.set(f.data, headerLen + cursor);
    cursor += f.data.length;
  }
  return out;
}
