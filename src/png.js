// 最小 PNG 编码器：RGBA → PNG（zlib 存储块 + CRC32/Adler32）
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(bytes) {
  let c = 0xffffffff;
  for (const b of bytes) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function adler32(bytes) {
  let a = 1, b = 0;
  for (const x of bytes) { a = (a + x) % 65521; b = (b + a) % 65521; }
  return ((b << 16) | a) >>> 0;
}

function u32(n) { return [n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, n & 255]; }

function chunk(type, data) {
  const out = new Uint8Array(12 + data.length);
  out.set(u32(data.length), 0);
  out[4] = type.charCodeAt(0); out[5] = type.charCodeAt(1); out[6] = type.charCodeAt(2); out[7] = type.charCodeAt(3);
  out.set(data, 8);
  const crcInput = out.subarray(4, 8 + data.length);
  out.set(u32(crc32(crcInput)), 8 + data.length);
  return out;
}

/** 把 RGBA 像素编码成 PNG（24 位或 32 位真彩，无调色板） */
export function encodePNG(rgba, width, height) {
  const raw = new Uint8Array(height * (1 + width * 4));
  for (let y = 0; y < height; y++) {
    raw[y * (1 + width * 4)] = 0; // filter none
    raw.set(rgba.subarray(y * width * 4, (y + 1) * width * 4), y * (1 + width * 4) + 1);
  }
  // zlib 包装，全部用存储块（不压缩，保证正确）
  const blocks = [];
  for (let i = 0; i < raw.length; i += 65535) {
    const part = raw.subarray(i, Math.min(raw.length, i + 65535));
    const len = part.length;
    const head = new Uint8Array(5);
    head[0] = i + 65535 >= raw.length ? 1 : 0;
    head[1] = len & 255; head[2] = len >>> 8 & 255;
    head[3] = (~len) & 255; head[4] = ((~len) >>> 8) & 255;
    blocks.push(head, part);
  }
  let total = 2 + 4 + blocks.reduce((a, b) => a + b.length, 0);
  const z = new Uint8Array(total);
  z[0] = 0x78; z[1] = 0x01;
  let p = 2;
  for (const b of blocks) { z.set(b, p); p += b.length; }
  z.set(u32(adler32(raw)), p);

  const ihdr = new Uint8Array(13);
  ihdr.set(u32(width), 0); ihdr.set(u32(height), 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

  const parts = [new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', z), chunk('IEND', new Uint8Array(0))];
  const out = new Uint8Array(parts.reduce((a, b) => a + b.length, 0));
  let q = 0;
  for (const part of parts) { out.set(part, q); q += part.length; }
  return out;
}
