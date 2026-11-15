import { parseNBT } from './nbt.js';

// 解析一个子区块（v8/v9）。返回各层的调色板与索引。
export function parseSubchunk(u8, padding = 2) {
  const dv = new DataView(u8.buffer, u8.byteOffset, u8.byteLength);
  const version = dv.getUint8(0);
  const layerCount = dv.getUint8(1);
  let p = 2;
  let yIndex = 0;
  if (version >= 9) { yIndex = dv.getInt8(2); p = 3; }   // v9 才有 YIndex
  const layers = [];
  for (let li = 0; li < layerCount; li++) {
    if (p >= u8.length) break;
    const header = dv.getUint8(p++);
    const bits = header >> 1;
    const storageType = header & 1;
    if (storageType !== 0) {                       // 非方块层（如旧版 meta），跳过
      layers.push({ bits, palette: [], indices: null, skipped: true });
      continue;
    }
    if (bits === 0) {
      layers.push({ bits: 0, palette: [], indices: null, solid: true });
      continue;
    }
    const pad = (bits === 3 || bits === 5 || bits === 6) ? padding : 0;
    const eff = 32 - pad;
    const words = Math.ceil((4096 * bits) / eff);
    const w = new Uint32Array(words);
    for (let i = 0; i < words; i++) { w[i] = dv.getUint32(p + i * 4, true); }
    p += words * 4;
    // 调色板
    const palCount = dv.getInt32(p, true); p += 4;
    const palette = [];
    for (let i = 0; i < palCount; i++) {
      const r = parseNBT(u8, p, true);
      const cmpd = r.root.value;
      palette.push({
        name: cmpd.name ? String(cmpd.name.v) : 'unknown',
        states: cmpd.states && cmpd.states.v ? cmpd.states.v : {}
      });
      p = r.end;
    }
    // 索引（YZX 顺序：y 变化最快）
    const mask = (1 << bits) - 1;
    const indices = new Uint16Array(4096);
    for (let i = 0; i < 4096; i++) {
      const bitPos = i * bits;
      const wi = (bitPos / eff) | 0;
      const off = bitPos - wi * eff;
      let v = (w[wi] >>> off) & mask;
      if (off + bits > eff && wi + 1 < words) {
        v = (((w[wi] >>> off) | (w[wi + 1] << (eff - off))) & mask);
      }
      indices[i] = v;
    }
    layers.push({ bits, palette, indices });
  }
  return { version, layerCount, yIndex, layers, bytesRead: p };
}

export function blockAt(layer, i) {
  if (layer.solid) return layer.palette[0];
  const idx = layer.indices[i];
  return layer.palette[idx] || layer.palette[0];
}
