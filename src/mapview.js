// 世界观看：从 LevelDB 里取出每个区块每个方柱的最高非空气方块，画成俯视图
import { parseSubchunk } from './subchunk.js';

const TAG_SUBCHUNK = 0x2f;

const COLORS = {
  'minecraft:air': null,
  'minecraft:water': '#2d6bb3',
  'minecraft:lava': '#d94b1e',
  'minecraft:grass_block': '#63a64b',
  'minecraft:grass': '#63a64b',
  'minecraft:dirt': '#8a6642',
  'minecraft:stone': '#8a8a8a',
  'minecraft:deepslate': '#4a4a50',
  'minecraft:sand': '#ded29a',
  'minecraft:sandstone': '#d9c98a',
  'minecraft:gravel': '#9c9188',
  'minecraft:ice': '#a8d8f0',
  'minecraft:snow': '#f2f7fb',
  'minecraft:bedrock': '#2a2a2a',
  'minecraft:oak_planks': '#b08a4e',
  'minecraft:oak_log': '#6b5328',
  'minecraft:oak_leaves': '#3f7a33',
  'minecraft:acacia_planks': '#ad5d32',
  'minecraft:tuff': '#6d6b63',
  'minecraft:sulfur': '#d6cf5a',
  'minecraft:cinnabar': '#b3443f',
  'minecraft:clay': '#a3a8b4',
  'minecraft:moss_block': '#5b7d3a',
  'minecraft:podzol': '#6b4f26',
  'minecraft:mycelium': '#8b7b8b',
  'minecraft:red_sand': '#c2661f',
  'minecraft:snow_layer': '#eef4f8',
  'sim:lush_cave': '#3f8a4a',
  'sim:sulfur_cave': '#c9b52e',
  'sim:dripstone_cave': '#a89a86',
};

// 从 db 生成地表数据
export async function buildSurface(db, opts = {}) {
  const chunks = new Set();
  const cols = new Map();           // "x,z" -> { y, block }
  let scanned = 0;
  for (const [k, kv] of db) {
    const kb = kv.keyBytes || new Uint8Array();
    if (kb.length !== 10) continue;
    const dv = new DataView(kb.buffer, kb.byteOffset, kb.byteLength);
    const cx = dv.getInt32(0, true), cz = dv.getInt32(4, true), tag = kb[8];
    if (tag !== TAG_SUBCHUNK) continue;
    const sy = (kb[9] << 24) >> 24;
    let sc;
    try { sc = parseSubchunk(kv.value, 2); } catch (e) { continue; }
    const layer = sc.layers[0];
    if (!layer || !layer.indices || layer.solid) continue;
    chunks.add(cx + ',' + cz);
    scanned++;
    for (let x = 0; x < 16; x++) {
        for (let z = 0; z < 16; z++) {
          if (opts.y !== undefined && opts.y !== null) {
            // 地下模式：只看指定世界高度这一层
            const wy = Math.floor(opts.y);
            if (wy < sy * 16 || wy > sy * 16 + 15) continue;
            const ly = wy - sy * 16;
            const idx = ly + 16 * (z + 16 * x);
            const p = layer.palette[layer.indices[idx]];
            if (!p || /^minecraft:(air|void_air|structure_void)$/.test(p.name)) continue;
            const wx = cx * 16 + x, wz = cz * 16 + z;
            cols.set(wx + ',' + wz, { y: wy, block: p.name });
            continue;
          }
          for (let y = 15; y >= 0; y--) {
            const idx = y + 16 * (z + 16 * x);
            const p = layer.palette[layer.indices[idx]];
            if (!p || /^minecraft:(air|cave_air|void_air|structure_void)$/.test(p.name)) continue;
            const wx = cx * 16 + x, wz = cz * 16 + z, wy = sy * 16 + y;
            const key = wx + ',' + wz;
            const old = cols.get(key);
            if (!old || wy > old.y) cols.set(key, { y: wy, block: p.name, subs: 1 });
            else { old.subs = (old.subs || 1) + 1; }
            break;
          }
        }
    }
    if (opts.onProgress && scanned % 32 === 0) opts.onProgress(scanned);
  }
  let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
  for (const [key] of cols) {
    const [x, z] = key.split(',').map(Number);
    if (x < minX) minX = x; if (x > maxX) maxX = x;
    if (z < minZ) minZ = z; if (z > maxZ) maxZ = z;
  }
  if (!cols.size) return { cols, chunks: 0, chunkSet: chunks, minX: 0, maxX: 0, minZ: 0, maxZ: 0, yRange: [0, 0] };
  let minY = Infinity, maxY = -Infinity;
  for (const c of cols.values()) { if (c.y < minY) minY = c.y; if (c.y > maxY) maxY = c.y; }
  return { cols, chunks: chunks.size, chunkSet: chunks, minX, maxX, minZ, maxZ, yRange: [minY, maxY] };
}

export function blockColor(name, y, yRange) {
  if (COLORS[name] !== undefined && COLORS[name]) return COLORS[name];
  if (!name) return '#1b1f26';
  // 未知方块：按名称哈希给个稳定颜色，并按高度调明暗
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffff;
  const hue = h % 360;
  const t = yRange && yRange[1] > yRange[0] ? (y - yRange[0]) / (yRange[1] - yRange[0]) : 0.5;
  const l = 32 + t * 28;
  return `hsl(${hue},38%,${l.toFixed(0)}%)`;
}

export function renderSurface(canvas, surface, scale = 2) {
  const { cols, minX, maxX, minZ, maxZ, yRange } = surface;
  const w = (maxX - minX + 1) * scale, h = (maxZ - minZ + 1) * scale;
  if (w > 8192 || h > 8192) return;
  canvas.width = Math.max(1, w); canvas.height = Math.max(1, h);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#14181e'; ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (const [key, c] of cols) {
    const [x, z] = key.split(',').map(Number);
    const color = blockColor(c.block, c.y, yRange);
    if (!color) continue;
    if (c.biome && COLORS[c.biome]) {
      ctx.globalAlpha = 0.18;
      ctx.fillStyle = COLORS[c.biome];
      const st0 = c.sim ? (surface.simStep || 1) : 1;
      ctx.fillRect((x - minX) * scale, (z - minZ) * scale, scale * st0, scale * st0);
    }
    ctx.globalAlpha = c.sim ? 0.72 : 1;
    ctx.fillStyle = color;
    const st = c.sim ? (surface.simStep || 1) : 1;
    ctx.fillRect((x - minX) * scale, (z - minZ) * scale, scale * st, scale * st);
  }
  ctx.globalAlpha = 1;
  return { width: canvas.width, height: canvas.height, origin: [minX, minZ], scale };
}

import { blockName } from './langdict.js';
export function describeColumn(surface, worldX, worldZ) {
  const c = surface.cols.get(worldX + ',' + worldZ);
  if (!c) return `(${worldX}, ${worldZ})：未保存的区块`;
  const tag = c.sim ? '　【模拟推测，非真实数据】' : '';
  let bioTxt = '';
  if (c.sim) { try { bioTxt = '　群系推测：' + surfaceBiome(worldX, worldZ, surface.seed || 0).zh; } catch (e) { } }
  if (c.block === 'minecraft:cave_air') return `(${worldX}, ${worldZ})  洞穴空腔（推测）  y=${c.y}${tag}${bioTxt}`;
  const bio = c.biome === 'sim:lush_cave' ? '　推测生物群系：繁茂洞穴' : c.biome === 'sim:sulfur_cave' ? '　推测生物群系：硫磺洞穴' : c.biome === 'sim:dripstone_cave' ? '　推测生物群系：滴水石洞穴' : '';
  const nm = c.block.startsWith('sim:') ? (c.block === 'sim:lush_cave' ? '繁茂洞穴（推测）' : c.block === 'sim:sulfur_cave' ? '硫磺洞穴（推测）' : '滴水石洞穴（推测）') : `${blockName(c.block)}（${c.block}）`;
  return `(${worldX}, ${worldZ})  方块：${nm}  y=${c.y}${bio}${tag}`;
}

// ---- 未探索区域模拟：多层 Perlin（近似，不是官方生成器）----
// 说明：基岩版真实地形由生物群系源、surface rules、洞穴/结构等多阶段生成，
// 这里用可复现的多噪声地形（大陆度/侵蚀度/山脊/温度）做近似，只求形态合理。
function splitmix32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x9e3779b9) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function makePerm(seed) {
  const rnd = splitmix32(seed || 1);
  const p = new Uint8Array(512);
  const base = [...Array(256).keys()];
  for (let i = 255; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const t = base[i]; base[i] = base[j]; base[j] = t; }
  for (let i = 0; i < 512; i++) p[i] = base[i & 255];
  return p;
}
function grad2(h, x, y) {
  switch (h & 7) {
    case 0: return x + y; case 1: return -x + y; case 2: return x - y; case 3: return -x - y;
    case 4: return x; case 5: return -x; case 6: return y; default: return -y;
  }
}
function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
function perlin2(perm, x, y) {
  const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
  const xf = x - Math.floor(x), yf = y - Math.floor(y);
  const u = fade(xf), v = fade(yf);
  const aa = perm[perm[X] + Y], ab = perm[perm[X] + Y + 1];
  const ba = perm[perm[X + 1] + Y], bb = perm[perm[X + 1] + Y + 1];
  const x1 = grad2(aa, xf, yf) * (1 - u) + grad2(ba, xf - 1, yf) * u;
  const x2 = grad2(ab, xf, yf - 1) * (1 - u) + grad2(bb, xf - 1, yf - 1) * u;
  return (x1 * (1 - v) + x2 * v) * 0.7;
}
function fbm(perm, x, z, scale, octaves = 4) {
  let sum = 0, amp = 1, freq = 1 / scale, norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum += perlin2(perm, x * freq, z * freq) * amp;
    norm += amp; amp *= 0.5; freq *= 2;
  }
  return sum / norm; // 约 -0.7..0.7
}

export function terrainHeight(x, z, seed) {
  const perm = getPerm(seed);
  const cont = fbm(perm, x, z, 320, 5);        // 大陆度：决定海陆
  const ero = fbm(perm, x + 1000, z - 1000, 180, 4); // 侵蚀度：决定起伏
  const ridge = 1 - Math.abs(fbm(perm, x - 700, z + 700, 90, 3)) * 1.4; // 山脊
  const detail = fbm(perm, x + 500, z + 500, 22, 3);
  let h = 64 + cont * 34 + detail * 6;
  if (cont > 0.18) h += (cont - 0.18) * 46 + Math.max(0, ridge - 0.55) * 34 * (0.4 + ero * 0.6);
  if (cont < -0.2) h -= (-0.2 - cont) * 70;    // 海洋/深海
  return Math.round(Math.max(-64, Math.min(150, h)));
}

let PERM_CACHE = { seed: null, perm: null };
function getPerm(seed) {
  if (PERM_CACHE.seed !== seed) PERM_CACHE = { seed, perm: makePerm(seed || 1) };
  return PERM_CACHE.perm;
}

export function biomeAt(x, z, seed) {
  const temp = fbm(getPerm(seed), x + 2000, z + 2000, 260, 3);
  const humid = fbm(getPerm(seed), x - 2000, z - 2000, 260, 3);
  return { temp, humid };
}

function hash2(x, z, seed) {
  let h = 2166136261 ^ seed;
  h ^= x * 374761393; h = Math.imul(h, 16777619);
  h ^= z * 668265263; h = Math.imul(h, 16777619);
  h ^= h >>> 13; return (h >>> 0) / 4294967295;
}
function grad3(h, x, y, z) {
  switch (h & 15) {
    case 0: return x + y; case 1: return -x + y; case 2: return x - y; case 3: return -x - y;
    case 4: return x + z; case 5: return -x + z; case 6: return x - z; case 7: return -x - z;
    case 8: return y + z; case 9: return -y + z; case 10: return y - z; case 11: return -y - z;
    case 12: return x + y; case 13: return -x + y; case 14: return -y + z; default: return -y - z;
  }
}
function perlin3(perm, x, y, z) {
  const X = Math.floor(x) & 255, Y = Math.floor(y) & 255, Z = Math.floor(z) & 255;
  const xf = x - Math.floor(x), yf = y - Math.floor(y), zf = z - Math.floor(z);
  const u = fade(xf), v = fade(yf), w = fade(zf);
  const A = perm[X] + Y, AA = perm[A] + Z, AB = perm[A + 1] + Z;
  const B = perm[X + 1] + Y, BA = perm[B] + Z, BB = perm[B + 1] + Z;
  const g = (h, dx, dy, dz) => grad3(perm[h & 511], dx, dy, dz);
  const x1 = g(AA, xf, yf, zf) * (1 - u) + g(BA, xf - 1, yf, zf) * u;
  const x2 = g(AB, xf, yf - 1, zf) * (1 - u) + g(BB, xf - 1, yf - 1, zf) * u;
  const x3 = g(AA + 1, xf, yf, zf - 1) * (1 - u) + g(BA + 1, xf - 1, yf, zf - 1) * u;
  const x4 = g(AB + 1, xf, yf - 1, zf - 1) * (1 - u) + g(BB + 1, xf - 1, yf - 1, zf - 1) * u;
  const y1 = x1 * (1 - v) + x2 * v, y2 = x3 * (1 - v) + x4 * v;
  return (y1 * (1 - w) + y2 * w) * 0.7;
}
function fbm3(perm, x, y, z, scale, oct = 2) {
  let sum = 0, amp = 1, f = 1 / scale, n = 0;
  for (let i = 0; i < oct; i++) { sum += perlin3(perm, x * f, y * f, z * f) * amp; n += amp; amp *= 0.5; f *= 2; }
  return sum / n;
}
// 地表生物群系：气候参数空间（温度/湿度/大陆度/侵蚀度）最近邻匹配。
// 加一个新群系只需要往 BIOMES 加一行数据，不用写 if 分支。
const BIOMES = [
  { id: 'plains', zh: '平原', temp: 0.05, humid: 0.00, cont: 0.10, ero: 0.05, top: 'minecraft:grass_block', sub: 'minecraft:dirt', accent: 'minecraft:oak_leaves' },
  { id: 'forest', zh: '森林', temp: 0.05, humid: 0.18, cont: 0.10, ero: 0.05, top: 'minecraft:grass_block', sub: 'minecraft:dirt', accent: 'minecraft:oak_leaves' },
  { id: 'birch_forest', zh: '白桦森林', temp: -0.02, humid: 0.14, cont: 0.10, ero: 0.02, top: 'minecraft:grass_block', sub: 'minecraft:dirt', accent: 'minecraft:oak_leaves' },
  { id: 'dark_forest', zh: '黑森林', temp: 0.04, humid: 0.30, cont: 0.10, ero: 0.02, top: 'minecraft:grass_block', sub: 'minecraft:dirt', accent: 'minecraft:oak_leaves' },
  { id: 'cherry_grove', zh: '樱花树林', temp: 0.16, humid: 0.16, cont: 0.22, ero: 0.10, top: 'minecraft:grass_block', sub: 'minecraft:dirt', accent: 'minecraft:cherry_leaves' },
  { id: 'pale_garden', zh: '苍白之园', temp: -0.05, humid: 0.24, cont: 0.12, ero: 0.00, top: 'minecraft:grass_block', sub: 'minecraft:dirt', accent: 'minecraft:pale_oak_leaves' },
  { id: 'jungle', zh: '丛林', temp: 0.35, humid: 0.45, cont: 0.12, ero: 0.05, top: 'minecraft:grass_block', sub: 'minecraft:dirt', accent: 'minecraft:oak_leaves' },
  { id: 'swamp', zh: '沼泽', temp: 0.14, humid: 0.40, cont: 0.02, ero: 0.00, top: 'minecraft:grass_block', sub: 'minecraft:mud', accent: 'minecraft:oak_leaves' },
  { id: 'mangrove_swamp', zh: '红树林沼泽', temp: 0.32, humid: 0.42, cont: 0.02, ero: 0.00, top: 'minecraft:mud', sub: 'minecraft:mud', accent: 'minecraft:mangrove_roots' },
  { id: 'desert', zh: '沙漠', temp: 0.45, humid: -0.35, cont: 0.16, ero: 0.10, top: 'minecraft:sand', sub: 'minecraft:sandstone', accent: 'minecraft:sand' },
  { id: 'badlands', zh: '恶地', temp: 0.45, humid: -0.40, cont: 0.30, ero: 0.40, top: 'minecraft:red_sand', sub: 'minecraft:terracotta', accent: 'minecraft:orange_terracotta' },
  { id: 'savanna', zh: '热带草原', temp: 0.35, humid: -0.05, cont: 0.20, ero: 0.12, top: 'minecraft:grass_block', sub: 'minecraft:coarse_dirt', accent: 'minecraft:oak_leaves' },
  { id: 'taiga', zh: '针叶林', temp: -0.15, humid: 0.25, cont: 0.16, ero: 0.10, top: 'minecraft:grass_block', sub: 'minecraft:podzol', accent: 'minecraft:oak_leaves' },
  { id: 'snowy_taiga', zh: '雪针叶林', temp: -0.40, humid: 0.25, cont: 0.16, ero: 0.10, top: 'minecraft:snowy_grass_block', sub: 'minecraft:dirt', accent: 'minecraft:snow' },
  { id: 'snowy_plains', zh: '雪原', temp: -0.45, humid: 0.00, cont: 0.10, ero: 0.02, top: 'minecraft:snowy_grass_block', sub: 'minecraft:dirt', accent: 'minecraft:snow_layer' },
  { id: 'ice_spikes', zh: '冰刺平原', temp: -0.50, humid: 0.05, cont: 0.20, ero: 0.35, top: 'minecraft:snow_layer', sub: 'minecraft:packed_mud', accent: 'minecraft:ice' },
  { id: 'mushroom_fields', zh: '蘑菇岛', temp: 0.10, humid: 0.35, cont: 0.35, ero: -0.10, top: 'minecraft:mycelium', sub: 'minecraft:dirt', accent: 'minecraft:mycelium' },
  { id: 'meadow', zh: '草甸', temp: 0.00, humid: 0.05, cont: 0.38, ero: -0.20, top: 'minecraft:grass_block', sub: 'minecraft:dirt', accent: 'minecraft:grass_block' },
  { id: 'windswept_hills', zh: '风袭丘陵', temp: -0.05, humid: 0.02, cont: 0.40, ero: 0.35, top: 'minecraft:grass_block', sub: 'minecraft:stone', accent: 'minecraft:stone' },
  { id: 'stony_peaks', zh: '裸岩山峰', temp: -0.10, humid: -0.10, cont: 0.55, ero: 0.55, top: 'minecraft:stone', sub: 'minecraft:stone', accent: 'minecraft:snow_layer' },
  { id: 'beach', zh: '沙滩', temp: 0.20, humid: 0.00, cont: 0.18, ero: 0.00, top: 'minecraft:sand', sub: 'minecraft:sandstone', accent: 'minecraft:sand' },
  { id: 'warm_ocean', zh: '暖水海洋', temp: 0.40, humid: 0.10, cont: -0.45, ero: 0.05, top: 'minecraft:water', sub: 'minecraft:sand', accent: 'minecraft:sand' },
  { id: 'ocean', zh: '海洋', temp: 0.10, humid: 0.10, cont: -0.30, ero: 0.05, top: 'minecraft:water', sub: 'minecraft:gravel', accent: 'minecraft:gravel' },
  { id: 'frozen_ocean', zh: '冻洋', temp: -0.45, humid: 0.10, cont: -0.35, ero: 0.05, top: 'minecraft:ice', sub: 'minecraft:gravel', accent: 'minecraft:ice' },
];

export function surfaceBiome(x, z, seed) {
  const perm = getPerm(seed);
  const temp = fbm(perm, x + 2000, z + 2000, 260, 3) + fbm(perm, x - 400, z + 400, 90, 2) * 0.25;
  const humid = fbm(perm, x - 2000, z - 2000, 260, 3) + fbm(perm, x + 400, z - 400, 90, 2) * 0.25;
  const cont = fbm(perm, x, z, 320, 5);
  const ero = fbm(perm, x + 1000, z - 1000, 180, 4);
  let best = BIOMES[0], bd = 1e9;
  for (const b of BIOMES) {
    const d = (temp - b.temp) ** 2 * 2.2 + (humid - b.humid) ** 2 * 1.8 + (cont - b.cont) ** 2 * 2.6 + (ero - b.ero) ** 2 * 1.2;
    if (d < bd) { bd = d; best = b; }
  }
  return best;
}

export function undergroundBiome(x, y, z, seed) {
  const perm = getPerm(seed);
  const b = fbm(perm, x + 3000, z + 3000, 150, 3) + fbm3(perm, x, y * 2, z, 220, 2) * 0.35;
  if (y < -24 && b < -0.12) return 'deep_dark';
  if (b > 0.22) return 'lush';
  if (b > 0.02) return 'dripstone';
  if (b > -0.06 && y < 16) return 'sulfur';
  return 'stone';
}
function caveAt(perm, x, y, z) {
  const cheese = fbm3(perm, x, y * 1.6, z, 56, 2);
  const worm = Math.abs(fbm3(perm, x + 800, y * 1.8, z - 800, 28, 2));
  const noodle = Math.abs(fbm3(perm, x - 900, y * 1.5, z + 900, 42, 2));
  if (cheese > 0.66) return true;
  if (worm < 0.020) return true;
  if (noodle < 0.014 && y < 30) return true;
  return false;
}
const BIO_BLOCKS = {
  lush: ['minecraft:moss_block', 'minecraft:clay', 'minecraft:azalea_leaves', 'minecraft:moss_carpet'],
  dripstone: ['minecraft:dripstone_block', 'minecraft:stone', 'minecraft:calcite'],
  deep_dark: ['minecraft:sculk', 'minecraft:deepslate', 'minecraft:sculk_catalyst'],
  sulfur: ['minecraft:sulfur_block', 'minecraft:stone', 'minecraft:sulfur'],
  stone: ['minecraft:stone', 'minecraft:stone', 'minecraft:deepslate', 'minecraft:tuff'],
};

export function simulatedBlock(x, z, y, seed, h, caveOpts) {
  const height = h === undefined ? terrainHeight(x, z, seed) : h;
  if (y > height) return null;
  const { temp, humid } = biomeAt(x, z, seed);
  if (caveOpts && caveOpts.caves && y < height - 2) {
    const perm = getPerm(seed);
    const n1 = perlin3(perm, x / 46, y / 28, z / 46);
    const n2 = perlin3(perm, x / 19 + 300, y / 14 - 200, z / 19 + 700);
    if (Math.abs(n1) < 0.10 && Math.abs(n2) < 0.16) return null; // 空腔：管道 + 洞室
  }
  const bio2 = surfaceBiome(x, z, seed);
  if (y === height) {
    if (height > 126) return 'minecraft:snow_layer';
    if (height > 108) return bio2.accent === 'minecraft:snow_layer' ? 'minecraft:snow_layer' : 'minecraft:stone';
    if (bio2.top === 'minecraft:water') return height <= 61 ? 'minecraft:water' : 'minecraft:sand';
    if (height <= 62) return 'minecraft:sand';
    return bio2.top;
  }
  if (y > height - 3) return height <= 62 ? 'minecraft:sand' : bio2.sub;
  const depth = height - y;
  if (depth > 6) {
    const perm = getPerm(seed);
    if (y < -54) return 'minecraft:lava';
    if (caveAt(perm, x, y, z)) return 'minecraft:cave_air';   // 洞穴空腔，画成暗色
    const bio = undergroundBiome(x, y, z, seed);
    const list = BIO_BLOCKS[bio] || BIO_BLOCKS.stone;
    const idx = Math.floor(hash2(x + y * 7, z - y * 3, seed + 11) * list.length);
    return list[Math.min(list.length - 1, idx)];
  }
  if (y < 0) return 'minecraft:deepslate';
  return 'minecraft:stone';
}

export function simulateMissing(surface, opts = {}) {
  const seed = Number(opts.seed || 0);
  const margin = opts.margin ?? 512;
  const yMode = opts.y !== undefined && opts.y !== null ? Math.floor(opts.y) : null;
  const real = surface.chunkSet || new Set();
  const minX = surface.minX - margin, maxX = surface.maxX + margin;
  const minZ = surface.minZ - margin, maxZ = surface.maxZ + margin;
  const spanX = maxX - minX + 1, spanZ = maxZ - minZ + 1;
  const step = opts.step || (spanX * spanZ > 1400000 ? 2 : 1);
  let added = 0;
  const perm = getPerm(seed);
  for (let x = minX; x <= maxX; x += step) {
    for (let z = minZ; z <= maxZ; z += step) {
      if (real.has(Math.floor(x / 16) + ',' + Math.floor(z / 16))) continue;
      if (surface.cols.has(x + ',' + z)) continue;
      const h = terrainHeight(x, z, seed);
      let block, y;
      let biome = null;
      if (yMode === null) { y = h; block = simulatedBlock(x, z, h, seed, h); }
      else {
        y = yMode;
        block = simulatedBlock(x, z, yMode, seed, h, { caves: opts.caves });
        biome = opts.caves ? undergroundBiome(x, yMode, z, seed) : null;
        if (!block) {
          // 空腔：留黑表示洞穴；属于推测生物群系时用群系色填充
          if (biome) { block = biome; y = yMode; }
          else y = null;
        }
      }
      if (!block) continue;
      surface.cols.set(x + ',' + z, { y, block, sim: true, biome });
      added++;
    }
  }
  surface.minX = minX; surface.maxX = maxX; surface.minZ = minZ; surface.maxZ = maxZ;
  surface.simulated = added;
  surface.simStep = step;
  surface.seed = seed;
  return surface;
}

export function isSimulated(surface, x, z) {
  const c = surface.cols.get(x + ',' + z);
  return !!(c && c.sim);
}

// ---- 结构推测：数据驱动（加一种结构只加一行），按区块网格 + 种子哈希放置 ----
const STRUCTURES = [
  { id: 'village_plains', zh: '村庄（平原）', biomes: ['plains', 'meadow', 'forest'], spacing: 34, chance: 0.35, color: '#e0b34a' },
  { id: 'village_desert', zh: '村庄（沙漠）', biomes: ['desert'], spacing: 34, chance: 0.4, color: '#e0b34a' },
  { id: 'village_savanna', zh: '村庄（热带草原）', biomes: ['savanna'], spacing: 34, chance: 0.4, color: '#e0b34a' },
  { id: 'village_taiga', zh: '村庄（针叶林）', biomes: ['taiga', 'snowy_taiga'], spacing: 34, chance: 0.4, color: '#e0b34a' },
  { id: 'village_snowy', zh: '村庄（雪原）', biomes: ['snowy_plains'], spacing: 34, chance: 0.35, color: '#e0b34a' },
  { id: 'pillager_outpost', zh: '掠夺者前哨站', biomes: ['plains', 'desert', 'savanna', 'taiga'], spacing: 40, chance: 0.25, color: '#c0504d' },
  { id: 'ruined_portal', zh: '下界传送门遗址', biomes: ['plains', 'forest', 'desert', 'savanna', 'taiga', 'snowy_plains', 'beach', 'swamp'], spacing: 24, chance: 0.3, color: '#9b59b6' },
  { id: 'ruined_portal_nether', zh: '下界传送门遗址（下界型）', biomes: ['ocean', 'warm_ocean'], spacing: 24, chance: 0.2, color: '#8e44ad' },
  { id: 'abandoned_camp', zh: '废弃营地', biomes: ['forest', 'taiga', 'plains', 'savanna'], spacing: 30, chance: 0.22, color: '#7f8c8d' },
  { id: 'shipwreck', zh: '沉船', biomes: ['ocean', 'warm_ocean', 'frozen_ocean', 'beach'], spacing: 22, chance: 0.35, color: '#5d8aa8' },
  { id: 'buried_treasure', zh: '埋藏的宝藏', biomes: ['beach'], spacing: 18, chance: 0.45, color: '#d4af37' },
  { id: 'ocean_monument', zh: '海底神殿', biomes: ['ocean', 'frozen_ocean'], spacing: 60, chance: 0.3, color: '#2e86c1' },
  { id: 'woodland_mansion', zh: '林地府邸', biomes: ['dark_forest'], spacing: 80, chance: 0.3, color: '#6c3483' },
  { id: 'desert_temple', zh: '沙漠神殿', biomes: ['desert'], spacing: 40, chance: 0.3, color: '#d68910' },
  { id: 'jungle_temple', zh: '丛林神庙', biomes: ['jungle'], spacing: 40, chance: 0.3, color: '#229954' },
  { id: 'witch_hut', zh: '女巫小屋', biomes: ['swamp'], spacing: 36, chance: 0.35, color: '#7d3c98' },
];

const LOOT_POOLS = {
  village: [
    ['minecraft:bread', 1, 4, 6], ['minecraft:emerald', 1, 2, 4], ['minecraft:iron_ingot', 1, 3, 3],
    ['minecraft:oak_planks', 4, 12, 4], ['minecraft:apple', 1, 3, 3], ['minecraft:torch', 1, 4, 3],
    ['minecraft:iron_pickaxe', 1, 1, 1], ['minecraft:diamond', 1, 1, 0.5],
  ],
  outpost: [
    ['minecraft:crossbow', 1, 1, 2], ['minecraft:arrow', 4, 12, 4], ['minecraft:iron_ingot', 1, 3, 3],
    ['minecraft:dark_oak_log', 3, 8, 3], ['minecraft:emerald', 1, 3, 1],
  ],
  portal: [
    ['minecraft:gold_ingot', 1, 4, 4], ['minecraft:golden_apple', 1, 1, 0.6], ['minecraft:flint_and_steel', 1, 1, 1],
    ['minecraft:obsidian', 1, 4, 4], ['minecraft:gold_block', 1, 2, 1], ['minecraft:fire_charge', 1, 3, 1],
  ],
  camp: [
    ['minecraft:campfire', 1, 1, 2], ['minecraft:leather', 2, 5, 3], ['minecraft:iron_ingot', 1, 2, 2],
    ['minecraft:bread', 1, 4, 3], ['minecraft:arrow', 3, 9, 2], ['minecraft:emerald', 1, 2, 1],
  ],
  shipwreck: [
    ['minecraft:iron_ingot', 2, 6, 4], ['minecraft:emerald', 1, 3, 2], ['minecraft:gold_ingot', 1, 3, 2],
    ['minecraft:map', 1, 1, 1], ['minecraft:oak_planks', 4, 10, 3], ['minecraft:paper', 2, 6, 2],
  ],
  buried: [['minecraft:heart_of_the_sea', 1, 1, 0.5], ['minecraft:gold_ingot', 1, 4, 2], ['minecraft:emerald', 2, 5, 2], ['minecraft:tnt', 1, 2, 1]],
  monument: [['minecraft:gold_block', 1, 3, 2], ['minecraft:emerald', 1, 4, 2], ['minecraft:prismarine_shard', 2, 6, 3], ['minecraft:sponge', 1, 2, 1]],
  mansion: [['minecraft:iron_ingot', 2, 6, 2], ['minecraft:diamond', 1, 2, 1], ['minecraft:emerald', 1, 4, 2], ['minecraft:gold_ingot', 1, 3, 2]],
  temple: [['minecraft:gold_ingot', 2, 5, 2], ['minecraft:diamond', 1, 2, 1], ['minecraft:iron_ingot', 2, 5, 2], ['minecraft:emerald', 1, 3, 1]],
  jungle: [['minecraft:diamond', 1, 2, 1], ['minecraft:emerald', 1, 3, 1], ['minecraft:gold_ingot', 2, 5, 2], ['minecraft:bamboo', 2, 8, 2]],
  witch: [['minecraft:glass_bottle', 1, 3, 2], ['minecraft:redstone', 1, 4, 3], ['minecraft:glowstone_dust', 1, 4, 3], ['minecraft:spider_eye', 1, 3, 2]],
};

export function structureAt(biomeId, seed) {
  for (const st of STRUCTURES) {
    if (st.biomes.includes(biomeId)) return st;
  }
  return null;
}

export function simStructures(surface, opts = {}) {
  const seed = Number(opts.seed || 0);
  const margin = opts.margin ?? 512;
  const minX = surface.minX - margin, maxX = surface.maxX + margin;
  const minZ = surface.minZ - margin, maxZ = surface.maxZ + margin;
  const step = 32; // 每 32×32 格检查一个候选格
  const out = [];
  for (let cx = Math.floor(minX / step) * step; cx <= maxX; cx += step) {
    for (let cz = Math.floor(minZ / step) * step; cz <= maxZ; cz += step) {
      const r = hash2(Math.floor(cx / step), Math.floor(cz / step), seed + 12345);
      const bx = cx + Math.floor(hash2(cx, cz, seed + 7) * step);
      const bz = cz + Math.floor(hash2(cx, cz, seed + 19) * step);
      const bio = surfaceBiome(bx, bz, seed);
      const pool = STRUCTURES.filter(v => v.biomes.includes(bio.id));
      if (!pool.length) continue;
      const pickRoll = hash2(cx + 11, cz - 13, seed + 41) * pool.length;
      const st = pool[Math.min(pool.length - 1, Math.floor(pickRoll))];
      const r2 = hash2(cx + 3, cz - 5, seed + 31);
      if (r2 > st.chance) continue;
      const h = terrainHeight(bx, bz, seed);
      out.push({ x: bx, z: bz, y: h, type: st.id, zh: st.zh, color: st.color, biome: bio.zh });
    }
  }
  return out;
}

export function rollLoot(type, seed) {
  const fam = type.startsWith('village') ? 'village'
    : type.startsWith('ruined_portal') ? 'portal'
    : type === 'pillager_outpost' ? 'outpost'
    : type === 'abandoned_camp' ? 'camp'
    : type === 'shipwreck' ? 'shipwreck'
    : type === 'buried_treasure' ? 'buried'
    : type === 'ocean_monument' ? 'monument'
    : type === 'woodland_mansion' ? 'mansion'
    : type === 'desert_temple' || type === 'jungle_temple' ? 'temple'
    : type === 'witch_hut' ? 'witch' : 'village';
  const pool = LOOT_POOLS[fam] || LOOT_POOLS.village;
  const n = 3 + Math.floor(hash2(seed, fam.length, 5) * 5);
  const items = [];
  for (let i = 0; i < n; i++) {
    let roll = hash2(i + 1, seed, fam.length + 9), acc = 0, pick = pool[0];
    for (const it of pool) { acc += it[3]; if (roll * pool.reduce((a, b) => a + b[3], 0) < acc) { pick = it; break; } }
    const cnt = pick[1] + Math.floor(hash2(i, seed + 3, 11) * (pick[2] - pick[1] + 1));
    items.push({ name: pick[0], count: cnt });
  }
  return items;
}

// ---- 结构外形程序化生成（不是逐个手画模板，按类型规则拼出来） ----
const STRUCT_RULES = {
  village: { size: 27, ground: 'minecraft:grass_block', path: 'minecraft:dirt_path', wall: 'minecraft:oak_planks', roof: 'minecraft:oak_log', floor: 'minecraft:cobblestone', light: 'minecraft:torch' },
  desert_village: { size: 27, ground: 'minecraft:sand', path: 'minecraft:sandstone', wall: 'minecraft:sandstone', roof: 'minecraft:smooth_sandstone', floor: 'minecraft:sandstone', light: 'minecraft:torch' },
  outpost: { size: 17, ground: 'minecraft:grass_block', wall: 'minecraft:dark_oak_planks', roof: 'minecraft:dark_oak_log', floor: 'minecraft:cobblestone', light: 'minecraft:torch' },
  portal: { size: 15, ground: 'minecraft:netherrack', frame: 'minecraft:obsidian', broken: 'minecraft:crying_obsidian', light: 'minecraft:fire' },
  camp: { size: 15, ground: 'minecraft:grass_block', tent: 'minecraft:white_wool', log: 'minecraft:oak_log', fire: 'minecraft:campfire' },
  shipwreck: { size: 21, hull: 'minecraft:oak_planks', deck: 'minecraft:spruce_planks', mast: 'minecraft:oak_log' },
  temple: { size: 21, ground: 'minecraft:sandstone', wall: 'minecraft:sandstone', accent: 'minecraft:orange_terracotta', gold: 'minecraft:gold_block' },
  jungle_temple: { size: 21, ground: 'minecraft:mossy_cobblestone', wall: 'minecraft:cobblestone', accent: 'minecraft:chiseled_stone_bricks' },
  monument: { size: 25, ground: 'minecraft:prismarine', wall: 'minecraft:prismarine_bricks', accent: 'minecraft:sea_lantern' },
  mansion: { size: 31, ground: 'minecraft:grass_block', wall: 'minecraft:dark_oak_planks', roof: 'minecraft:dark_oak_log', floor: 'minecraft:cobblestone' },
  witch_hut: { size: 13, ground: 'minecraft:grass_block', wall: 'minecraft:spruce_planks', roof: 'minecraft:dark_oak_log' },
};

export function structurePreview(type, seed) {
  const kind = type.startsWith('village') ? (type.includes('desert') ? 'desert_village' : 'village')
    : type.startsWith('ruined_portal') ? 'portal'
    : type === 'pillager_outpost' ? 'outpost'
    : type === 'abandoned_camp' ? 'camp'
    : type === 'shipwreck' ? 'shipwreck'
    : type === 'desert_temple' ? 'temple'
    : type === 'jungle_temple' ? 'jungle_temple'
    : type === 'ocean_monument' ? 'monument'
    : type === 'woodland_mansion' ? 'mansion'
    : type === 'witch_hut' ? 'witch_hut' : 'camp';
  const R = STRUCT_RULES[kind];
  const N = R.size, half = Math.floor(N / 2);
  const grid = new Map();
  const put = (x, z, b) => { if (x >= 0 && z >= 0 && x < N && z < N) grid.set(x + ',' + z, b); };
  const rnd = (i) => hash2(i * 7 + 1, i * 13 + 3, seed + 99);
  for (let x = 0; x < N; x++) for (let z = 0; z < N; z++) put(x, z, R.ground || R.hull || R.wall);
  if (kind === 'village' || kind === 'desert_village') {
    for (let i = 0; i < N; i++) { put(i, half, R.path); put(half, i, R.path); }
    const houses = 3 + Math.floor(rnd(1) * 4);
    for (let h = 0; h < houses; h++) {
      const cx = 3 + Math.floor(hash2(h, 2, seed + 5) * (N - 8));
      const cz = 3 + Math.floor(hash2(h, 3, seed + 6) * (N - 8));
      const w = 5 + Math.floor(hash2(h, 4, seed + 7) * 3), d = 5 + Math.floor(hash2(h, 5, seed + 8) * 3);
      for (let x = cx; x < cx + w; x++) for (let z = cz; z < cz + d; z++) put(x, z, R.wall);
      for (let x = cx; x < cx + w; x++) put(x, cz, R.roof);
      put(cx + Math.floor(w / 2), cz + d - 1, R.light);
    }
    for (let x = half - 1; x <= half + 1; x++) for (let z = half - 1; z <= half + 1; z++) put(x, z, R.floor);
  } else if (kind === 'portal') {
    for (const [x, z] of [[5,5],[5,10],[10,5],[10,10]]) put(x, z, R.frame);
    for (let x = 6; x <= 9; x++) { put(x, 6, R.broken); put(x, 9, R.broken); }
    put(6, 7, R.frame); put(7, 7, R.light); put(8, 8, R.frame);
  } else if (kind === 'camp') {
    for (let i = 0; i < N; i++) put(i, half, 'minecraft:dirt_path');
    put(half, half, R.fire);
    for (let t = 0; t < 3; t++) {
      const cx = 2 + Math.floor(hash2(t, 1, seed + 3) * (N - 6));
      const cz = 2 + Math.floor(hash2(t, 2, seed + 4) * (N - 6));
      for (let x = cx; x < cx + 4; x++) for (let z = cz; z < cz + 3; z++) put(x, z, R.tent);
    }
    put(2, 2, R.log); put(N - 3, N - 3, R.log);
  } else if (kind === 'shipwreck') {
    for (let x = 4; x < N - 4; x++) { put(x, 4, R.hull); put(x, N - 5, R.hull); }
    for (let z = 4; z < N - 4; z++) { put(4, z, R.hull); put(N - 5, z, R.hull); }
    for (let x = 6; x < N - 6; x++) for (let z = 6; z < N - 6; z++) put(x, z, R.deck);
    put(half, half, R.mast);
  } else if (kind === 'temple') {
    for (let x = 1; x < N - 1; x++) for (let z = 1; z < N - 1; z++) put(x, z, R.wall);
    for (let i = 2; i < N - 2; i += 3) { put(i, 2, R.accent); put(2, i, R.accent); put(i, N - 3, R.accent); put(N - 3, i, R.accent); }
    put(half, half, R.gold);
  } else if (kind === 'outpost' || kind === 'mansion' || kind === 'witch_hut') {
    for (let x = 2; x < N - 2; x++) for (let z = 2; z < N - 2; z++) put(x, z, R.wall);
    for (let x = 2; x < N - 2; x++) put(x, 2, R.roof);
    put(half, half, R.light);
  } else if (kind === 'monument') {
    for (let x = 2; x < N - 2; x++) for (let z = 2; z < N - 2; z++) put(x, z, R.wall);
    for (let i = 3; i < N - 3; i += 4) put(i, half, R.accent);
  } else if (kind === 'jungle_temple') {
    for (let x = 1; x < N - 1; x++) for (let z = 1; z < N - 1; z++) put(x, z, R.wall);
    for (let i = 2; i < N - 2; i += 2) put(i, 2, R.accent);
  }
  const blocks = [];
  for (const [k, b] of grid) { const [x, z] = k.split(',').map(Number); blocks.push({ x, z, block: b }); }
  return { size: N, blocks, kind };
}

export function colorOf(block) { return COLORS[block] || '#6b7280'; }
