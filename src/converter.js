// 基岩版 ⇄ Java 版 存档转换（地形层，无实体/方块实体/容器）
import { parseZip, buildZip } from './zip.js';
import { ungzip, gzip, deflate } from 'pako';
import { analyzeJavaZip, javaSurface, writeJavaNbt } from './java.js';
import { readLevelDb } from 'mcbe-leveldb-reader';
import { buildDb } from './dbwrite.js';
import { buildSurface } from './mapview.js';
import { readArchiveDb } from './worlddb.js';
import { writeNBT } from './nbt.js';

export const B2J = {
  'minecraft:grass_block': 'minecraft:grass_block',
  'minecraft:grass_path': 'minecraft:dirt_path',
  'minecraft:stone': 'minecraft:stone',
  'minecraft:cobblestone': 'minecraft:cobblestone',
  'minecraft:dirt': 'minecraft:dirt',
  'minecraft:sand': 'minecraft:sand',
  'minecraft:sandstone': 'minecraft:sandstone',
  'minecraft:gravel': 'minecraft:gravel',
  'minecraft:water': 'minecraft:water',
  'minecraft:flowing_water': 'minecraft:water',
  'minecraft:lava': 'minecraft:lava',
  'minecraft:flowing_lava': 'minecraft:lava',
  'minecraft:bedrock': 'minecraft:bedrock',
  'minecraft:snow': 'minecraft:snow_block',
  'minecraft:snow_layer': 'minecraft:snow',
  'minecraft:ice': 'minecraft:ice',
  'minecraft:packed_ice': 'minecraft:packed_ice',
  'minecraft:clay': 'minecraft:clay',
  'minecraft:log': 'minecraft:oak_log',
  'minecraft:log2': 'minecraft:birch_log',
  'minecraft:leaves': 'minecraft:oak_leaves',
  'minecraft:leaves2': 'minecraft:birch_leaves',
  'minecraft:planks': 'minecraft:oak_planks',
  'minecraft:stonebrick': 'minecraft:stone_bricks',
  'minecraft:stone_stairs': 'minecraft:stone_brick_stairs',
  'minecraft:wooden_slab': 'minecraft:oak_slab',
  'minecraft:double_wooden_slab': 'minecraft:oak_planks',
  'minecraft:tallgrass': 'minecraft:short_grass',
  'minecraft:short_grass': 'minecraft:short_grass',
  'minecraft:yellow_flower': 'minecraft:dandelion',
  'minecraft:red_flower': 'minecraft:poppy',
  'minecraft:mob_spawner': 'minecraft:spawner',
  'minecraft:monster_egg': 'minecraft:infested_stone',
  'minecraft:quartz_block': 'minecraft:quartz_block',
  'minecraft:hardened_clay': 'minecraft:terracotta',
  'minecraft:stained_hardened_clay': 'minecraft:white_terracotta',
  'minecraft:iron_ore': 'minecraft:iron_ore',
  'minecraft:gold_ore': 'minecraft:gold_ore',
  'minecraft:diamond_ore': 'minecraft:diamond_ore',
  'minecraft:redstone_ore': 'minecraft:redstone_ore',
  'minecraft:lit_redstone_ore': 'minecraft:redstone_ore',
  'minecraft:emerald_ore': 'minecraft:emerald_ore',
  'minecraft:coal_ore': 'minecraft:coal_ore',
  'minecraft:lapis_ore': 'minecraft:lapis_ore',
  'minecraft:copper_ore': 'minecraft:copper_ore',
  'minecraft:deepslate': 'minecraft:deepslate',
  'minecraft:tuff': 'minecraft:tuff',
  'minecraft:dripstone_block': 'minecraft:dripstone_block',
  'minecraft:moss_block': 'minecraft:moss_block',
  'minecraft:netherrack': 'minecraft:netherrack',
  'minecraft:soul_sand': 'minecraft:soul_sand',
  'minecraft:magma': 'minecraft:magma_block',
  'minecraft:glowstone': 'minecraft:glowstone',
  'minecraft:end_stone': 'minecraft:end_stone',
  'minecraft:obsidian': 'minecraft:obsidian',
  'minecraft:mycelium': 'minecraft:mycelium',
  'minecraft:podzol': 'minecraft:podzol',
  'minecraft:red_sand': 'minecraft:red_sand',
  'minecraft:red_sandstone': 'minecraft:red_sandstone',
};
export const J2B = (() => {
  const m = {};
  for (const [b, j] of Object.entries(B2J)) if (!m[j]) m[j] = b;
  return m;
})();

function mapBlock(name, table) {
  const n = String(name || '');
  return table[n] || table[n.replace('minecraft:', 'minecraft:')] || n;
}

function bedrockDbAdapter(z) {
  return {
    paths: () => z.entries.map(e => e.name),
    getBytes: (p) => { const e = z.entries.find(x => x.name === p); if (!e) throw new Error('缺少 ' + p); return z.read(e); },
  };
}

function sectionBlocks(cols, cx, cz, depth = 12) {
  const yy = new Map();
  let minY = Infinity, maxY = -Infinity;
  for (let x = 0; x < 16; x++) for (let z = 0; z < 16; z++) {
    const c = cols.get((cx * 16 + x) + ',' + (cz * 16 + z));
    if (!c) continue;
    minY = Math.min(minY, c.y); maxY = Math.max(maxY, c.y);
    const from = Math.max(-64, c.y - depth);
    for (let y = from; y <= c.y; y++) {
      const key = y + '|' + x + '|' + z;
      yy.set(key, y === c.y ? c.block : (y < c.y - 3 ? 'minecraft:stone' : 'minecraft:dirt'));
    }
  }
  return { yy, minY: Math.max(-64, minY - depth), maxY };
}

function javaChunkNbt(cx, cz, yy) {
  const secMap = new Map();
  const order = [];
  for (const [k, name] of yy) {
    const [y, x, z] = k.split('|').map(Number);
    const sy = Math.floor(y / 16);
    if (!secMap.has(sy)) { secMap.set(sy, []); order.push(sy); }
    secMap.get(sy).push({ y, x, z, name });
  }
  if (!order.length) return null;
  const sections = order.sort((a, b) => a - b).map(sy => {
    const list = secMap.get(sy);
    const pal = ['minecraft:air'];
    const idx = {};
    for (const b of list) if (!(b.name in idx)) { idx[b.name] = pal.length; pal.push(b.name); }
    const bits = Math.max(4, Math.ceil(Math.log2(Math.max(2, pal.length))));
    const bpl = Math.floor(64 / bits);
    const longs = new Array(Math.ceil(4096 / bpl)).fill(0n);
    const mask = (BigInt(1) << BigInt(bits)) - 1n;
    for (const b of list) {
      const i = (b.y - sy * 16) * 256 + b.z * 16 + b.x;
      const li = Math.floor(i / bpl), sh = BigInt((i % bpl) * bits);
      const v = BigInt(idx[b.name]);
      longs[li] = (longs[li] & ~(mask << sh)) | (v << sh);
    }
    return {
      Y: { type: 1, value: sy },
      Palette: { type: 9, value: { listType: 10, items: pal.map(n => ({ Name: { type: 8, value: n } })) } },
      BlockStates: { type: 12, value: longs },
    };
  });
  return {
    rootType: 10, rootName: '', data: {
      DataVersion: { type: 3, value: 2586 },
      Level: { type: 10, value: {
        xPos: { type: 3, value: cx }, zPos: { type: 3, value: cz },
        Status: { type: 8, value: 'full' },
        LastUpdate: { type: 4, value: 0 },
        Sections: { type: 9, value: { listType: 10, items: sections } },
      } },
    },
  };
}

function buildJavaRegions(cols) {
  const groups = new Map();
  for (const [k, c] of cols) {
    const [x, z] = k.split(',').map(Number);
    const cx = Math.floor(x / 16), cz = Math.floor(z / 16);
    if (!groups.has(cx + ',' + cz)) groups.set(cx + ',' + cz, new Set());
    groups.get(cx + ',' + cz).add(k);
  }
  const out = {};
  const byRegion = new Map();
  for (const [ck] of groups) {
    const [cx, cz] = ck.split(',').map(Number);
    const rx = Math.floor(cx / 32), rz = Math.floor(cz / 32);
    const rk = rx + ',' + rz;
    if (!byRegion.has(rk)) byRegion.set(rk, []);
    const yy = sectionBlocks(cols, cx, cz);
    if (!yy.yy.size) continue;
    const nbt = javaChunkNbt(cx, cz, yy.yy);
    if (nbt) byRegion.get(rk).push({ cx, cz, nbt });
  }
  for (const [rk, chunks] of byRegion) {
    out[`region/r.${rk.replace(',', '.')}.mca`] = makeMca(chunks);
  }
  return out;
}

function makeMca(chunks) {
  const header = new Uint8Array(8192);
  const dv = new DataView(header.buffer);
  const bodies = [];
  let sector = 2;
  for (const c of chunks) {
    const raw = writeJavaNbt(c.nbt);
    const comp = deflate(raw);
    const body = new Uint8Array(5 + comp.length);
    new DataView(body.buffer).setUint32(0, comp.length + 1);
    body[4] = 2;
    body.set(comp, 5);
    const sectorCount = Math.ceil(body.length / 4096);
    const idx = (c.cx & 31) + (c.cz & 31) * 32;
    dv.setUint32(idx * 4, ((sector << 8) | (sectorCount & 255)) >>> 0);
    dv.setUint32(4096 + idx * 4, Math.floor(Date.now() / 1000));
    const full = new Uint8Array(sectorCount * 4096);
    full.set(body, 0);
    bodies.push({ sector, data: full });
    sector += sectorCount;
  }
  let total = 8192;
  for (const b of bodies) total = Math.max(total, b.sector * 4096 + b.data.length);
  const out = new Uint8Array(total);
  out.set(header, 0);
  for (const b of bodies) out.set(b.data, b.sector * 4096);
  return out;
}

function javaLevelDat(opts) {
  const D = {};
  const add = (k, t, v) => { D[k] = { type: t, value: v }; };
  add('LevelName', 8, opts.name || '转换世界');
  add('Version', 10, { Name: { type: 8, value: '1.16.5' }, Id: { type: 3, value: 2586 }, Snapshot: { type: 1, value: 0 } });
  add('SpawnX', 3, opts.spawn[0]); add('SpawnY', 3, opts.spawn[1]); add('SpawnZ', 3, opts.spawn[2]);
  add('Time', 4, 0); add('DayTime', 4, 0);
  add('GameType', 3, 1); add('Difficulty', 1, 2); add('hardcore', 1, 0); add('allowCommands', 1, 1);
  add('WorldGenSettings', 10, { seed: { type: 4, value: opts.seed || 0 }, generate_features: { type: 1, value: 0 }, bonus_chest: { type: 1, value: 0 } });
  return gzip(writeJavaNbt({ rootType: 10, rootName: '', data: { Data: { type: 10, value: D } } }));
}

export async function convertBedrockToJava(zipBytes, onLog = () => {}) {
  const z = parseZip(zipBytes);
  const adapter = bedrockDbAdapter(z);
  onLog('读取基岩版 LevelDB…');
  const { db } = await readArchiveDb(adapter);
  onLog('解析区块地形…');
  const surf = await buildSurface(db, {});
  if (!surf.cols.size) throw new Error('没有解析到任何区块，无法转换');
  onLog(`解析到 ${surf.chunks} 个区块 / ${surf.cols.size} 列，开始生成 Java 区块…`);
  const files = {};
  const regions = buildJavaRegions(surf.cols);
  for (const [n, d] of Object.entries(regions)) files[n] = d;
  const cx = Math.round((surf.minX + surf.maxX) / 2), cz = Math.round((surf.minZ + surf.maxZ) / 2);
  let spawnY = 64;
  const c = surf.cols.get(cx + ',' + cz); if (c) spawnY = c.y + 1;
  files['level.dat'] = javaLevelDat({ name: '从基岩版转换', spawn: [cx, spawnY, cz] });
  files['levelname.txt'] = new TextEncoder().encode('从基岩版转换');
  onLog('打包 Java 存档 ZIP…');
  return buildZip(Object.entries(files).map(([name, data]) => ({ name, data })));
}

function encodeSubchunk(palette, indices) {
  const bits = palette.length <= 16 ? 4 : (palette.length <= 256 ? 8 : 16);
  const bpl = Math.floor(32 / bits) * 8 / 8;
  // Bedrock 每 32 位字容纳 floor(32/bits) 个索引
  const perWord = Math.floor(32 / bits);
  const words = Math.ceil(4096 / perWord);
  const w = new Uint32Array(words);
  const mask = (1 << bits) - 1;
  for (let i = 0; i < 4096; i++) {
    const wi = Math.floor(i / perWord), sh = (i % perWord) * bits;
    w[wi] |= (indices[i] & mask) << sh;
  }
  const enc = new TextEncoder();
  const palBytes = [];
  for (const name of palette) {
    const nbt = writeNBT({ root: { type: 10, name: '', value: {
      name: { t: 8, v: name },
      states: { t: 10, v: {} },
      version: { t: 3, v: 17959425 },
    } } }, true);
    palBytes.push(nbt);
  }
  const head = new Uint8Array(6 + 4 + words * 4 + 4 + palBytes.reduce((a, b) => a + b.length, 0));
  let p = 0;
  head[p++] = 8; head[p++] = 1;
  head[p++] = (bits << 1) | 0;
  new Uint8Array(head.buffer).set(new Uint8Array(w.buffer), p); p += words * 4;
  const dv = new DataView(head.buffer);
  dv.setInt32(p, palette.length, true); p += 4;
  for (const b of palBytes) { head.set(b, p); p += b.length; }
  return head;
}

function bedrockLevelDat(o) {
  const L = {
    LevelName: { t: 8, v: o.name },
    GameType: { t: 3, v: 1 },
    Difficulty: { t: 3, v: 2 },
    SpawnX: { t: 3, v: o.spawn[0] }, SpawnY: { t: 3, v: o.spawn[1] }, SpawnZ: { t: 3, v: o.spawn[2] },
    Time: { t: 4, v: 0n }, LastPlayed: { t: 4, v: BigInt(Date.now()) },
    StorageVersion: { t: 3, v: 10 }, generator: { t: 3, v: 0 },
    Inventory: { t: 9, et: 10, v: [] },
  };
  const body = writeNBT({ root: { type: 10, name: '', value: L } }, true);
  const out = new Uint8Array(8 + body.length);
  const dv = new DataView(out.buffer);
  dv.setInt32(0, 10, true); dv.setInt32(4, body.length, true);
  out.set(body, 8);
  return out;
}

export function convertJavaToBedrock(zipBytes, onLog = () => {}) {
  const st = analyzeJavaZip(zipBytes);
  onLog('解析 Java 区块…');
  const surf = javaSurface(st.zip, null);
  if (!surf.cols.size) throw new Error('Java 存档里没有解析到区块');
  onLog(`解析到 ${surf.chunks} 个区块 / ${surf.cols.size} 列，生成基岩版子区块…`);
  const entries = [];
  const chunks = new Map();
  for (const [k, c] of surf.cols) {
    const [x, z] = k.split(',').map(Number);
    const cx = Math.floor(x / 16), cz = Math.floor(z / 16);
    const key = cx + ',' + cz;
    if (!chunks.has(key)) chunks.set(key, { cx, cz, cols: new Map(), maxY: 64 });
    const ch = chunks.get(key);
    ch.cols.set((((x % 16) + 16) % 16) + ',' + (((z % 16) + 16) % 16), c);
    if (c.y > ch.maxY) ch.maxY = c.y;
  }
  let count = 0;
  for (const { cx, cz, cols, maxY } of chunks.values()) {
    const secMap = new Map();
    for (let x = 0; x < 16; x++) for (let z = 0; z < 16; z++) {
      const c = cols.get(x + ',' + z);
      const top = c ? c.y : maxY;
      const surface = c ? mapBlock(c.block, J2B) : 'minecraft:stone';
      const from = Math.max(-64, Math.min(319, top) - 12);
      for (let y = from; y <= top; y++) {
        const sy = Math.floor(y / 16);
        if (!secMap.has(sy)) secMap.set(sy, []);
        secMap.get(sy).push({ i: (((y % 16) + 16) % 16) + 16 * (z + 16 * x), name: y === top ? surface : 'minecraft:stone' });
      }
    }
    for (const [sy, list] of secMap) {
      const pal = ['minecraft:air'];
      const idx = { 'minecraft:air': 0 };
      const indices = new Uint16Array(4096);
      for (const b of list) {
        if (!(b.name in idx)) { idx[b.name] = pal.length; pal.push(b.name); }
        indices[b.i] = idx[b.name];
      }
      const val = encodeSubchunk(pal, indices);
      const key = new Uint8Array(10);
      const dv = new DataView(key.buffer);
      dv.setInt32(0, cx, true); dv.setInt32(4, cz, true); key[8] = 0x2f; key[9] = sy & 0xff;
      entries.push({ key, value: val });
      count++;
    }
  }
  const dbFiles = buildDb(entries);
  const files = {};
  for (const [n, d] of Object.entries(dbFiles)) { if (!/^(CURRENT|MANIFEST-[0-9]+|[0-9]+\.log)$/.test(n)) continue; files['db/' + n] = d; }
  const cx = Math.round((surf.minX + surf.maxX) / 2), cz = Math.round((surf.minZ + surf.maxZ) / 2);
  let sy = 64; const c0 = surf.cols.get(cx + ',' + cz); if (c0) sy = c0.y + 1;
  files['level.dat'] = bedrockLevelDat({ name: st.name || '从Java转换', spawn: [cx, sy, cz] });
  files['levelname.txt'] = new TextEncoder().encode(st.name || '从Java转换');
  onLog(`写入 ${count} 个子区块`);
  return buildZip(Object.entries(files).map(([name, data]) => ({ name, data })));
}

function $id(id) { return document.getElementById(id); }

function openTerrainConverter() {
  const body = $id('modalBody');
  body.innerHTML = `<h3>存档转换</h3>
    <p class="muted">双方向地形层转换，不需要安装任何模组/第三方转换器。实体、容器、红石状态不迁移。</p>
    <div class="skbar">
      <button id="cvB2J" class="primary">基岩版 → Java</button>
      <button id="cvJ2B" class="primary">Java → 基岩版</button>
      <button id="cvClose" class="ghost">关闭</button>
    </div>
    <p class="muted">基岩版：.mcworld / .mctemplate；Java：.zip</p>
    <input type="file" id="cvFile" style="display:none">
    <div id="cvLog" class="logbox" style="max-height:34vh;overflow:auto"></div>`;
  $id('modal').style.display = 'flex';
  const box = document.querySelector('.modalbox'); if (box) { box.style.maxWidth = '700px'; box.style.width = '96vw'; }
  $id('cvClose').onclick = () => { if (box) { box.style.maxWidth = ''; box.style.width = ''; } $id('modal').style.display = 'none'; };
  const log = (s) => { const el = $id('cvLog'); if (el) el.textContent += s + '\n'; el.scrollTop = el.scrollHeight; };
  let mode = '';
  const pick = (m) => new Promise((res, rej) => {
    const inp = $id('cvFile'); inp.value = ''; inp.accept = m === 'b2j' ? '.mcworld,.mctemplate,.zip' : '.zip';
    inp.onchange = () => {
      const f = inp.files[0]; if (!f) return rej(new Error('未选择文件'));
      f.arrayBuffer().then(b => res(new Uint8Array(b))).catch(rej);
    };
    inp.click();
  });
  const save = (name, bytes) => {
    if (window.AndroidBridge && window.AndroidBridge.saveBinary) {
      let s = ''; for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
      window.AndroidBridge.saveBinary(name, btoa(s));
    } else {
      const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([bytes])); a.download = name; a.click();
    }
  };
  $id('cvB2J').onclick = async () => {
    try {
      const buf = await pick('b2j');
      log('开始：基岩版 → Java');
      const out = await convertBedrockToJava(buf, log);
      save('转换-Java版.zip', out);
      log('完成：已导出 转换-Java版.zip');
    } catch (e) { log('失败：' + e.message); }
  };
  $id('cvJ2B').onclick = async () => {
    try {
      const buf = await pick('j2b');
      log('开始：Java → 基岩版');
      const out = convertJavaToBedrock(buf, log);
      save('转换-基岩版.mcworld', out);
      log('完成：已导出 转换-基岩版.mcworld');
    } catch (e) { log('失败：' + e.message); }
  };
}

function bytesB64(u8) {
  let s = '';
  const chunk = 0x8000;
  for (let i = 0; i < u8.length; i += chunk) s += String.fromCharCode.apply(null, u8.subarray(i, i + chunk));
  return btoa(s);
}

function safePart(name) {
  const n = String(name || 'world.zip').split(/[\\/]/).pop().replace(/[\\/:*?"<>|\u0000-\u001f]/g, '_').trim();
  return n || 'world.zip';
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

function fullConverterSupported() {
  return !!(window.AndroidBridge && window.AndroidBridge.chunkerStart) ||
    !!(window.McDesktop && window.McDesktop.chunkerConvert);
}

function openFullConverter() {
  const body = $id('modalBody');
  const isAndroid = !!(window.AndroidBridge && window.AndroidBridge.chunkerStart);
  body.innerHTML = `<h3>存档转换 · Chunker 1.21.0</h3>
    <p class="muted">完整地形/方块/方块实体转换，基岩版 ⇄ Java 双方向；实体、玩家背包不迁移。Android 端自动选择 32/64 位内置运行时。</p>
    <label>目标格式</label>
    <select id="cvTarget" style="width:100%;padding:10px;border-radius:10px;background:#141922;color:#e6edf3;border:1px solid #2a3441">
      <option value="JAVA_1_21_11">Java 1.21.11</option>
      <option value="JAVA_1_21_4">Java 1.21.4</option>
      <option value="JAVA_1_20_6">Java 1.20.6</option>
      <option value="JAVA_1_19_2">Java 1.19.2</option>
      <option value="JAVA_1_16_5">Java 1.16.5</option>
      <option value="BEDROCK_1_26_50">基岩版 1.26.50</option>
      <option value="BEDROCK_1_21_130">基岩版 1.21.130</option>
      <option value="BEDROCK_1_21_50">基岩版 1.21.50</option>
    </select>
    <div class="skbar" style="margin-top:10px">
      <button id="cvFullB2J" class="primary">基岩版 → Java</button>
      <button id="cvFullJ2B" class="primary">Java → 基岩版</button>
      <button id="cvFullClose" class="ghost">关闭</button>
    </div>
    <p class="muted">输入：.mcworld / .mctemplate / .zip；输出：Java 世界为 .zip，基岩版为 .mcworld。转换在本地完成，不上传文件。</p>
    <input type="file" id="cvFile" style="display:none" accept=".mcworld,.mctemplate,.zip,.mcpack">
    <div id="cvLog" class="logbox" style="max-height:38vh;overflow:auto;white-space:pre-wrap"></div>`;
  $id('modal').style.display = 'flex';
  const box = document.querySelector('.modalbox'); if (box) { box.style.maxWidth = '760px'; box.style.width = '96vw'; }
  const log = (s) => { const el = $id('cvLog'); if (el) { el.textContent += s + '\n'; el.scrollTop = el.scrollHeight; } };
  const close = () => { if (box) { box.style.maxWidth = ''; box.style.width = ''; } $id('modal').style.display = 'none'; };
  $id('cvFullClose').onclick = close;
  const pick = () => new Promise((res, rej) => {
    const inp = $id('cvFile'); inp.value = '';
    inp.onchange = () => {
      const f = inp.files[0]; if (!f) return rej(new Error('未选择文件'));
      res(f);
    };
    inp.click();
  });
  const targetOf = (dir) => {
    const sel = $id('cvTarget');
    if (dir === 'b2j') sel.value = 'JAVA_1_21_11';
    else sel.value = 'BEDROCK_1_26_50';
    return sel.value;
  };
  const outNameOf = (target) => target.startsWith('JAVA') ? '转换-Java版.zip' : '转换-基岩版.mcworld';

  const runAndroid = async (file, target) => {
    const buf = new Uint8Array(await file.arrayBuffer());
    const rel = 'chunker/in/' + Date.now() + '-' + safePart(file.name);
    log('写入临时输入：' + (buf.length / 1048576).toFixed(2) + ' MB');
    const wr = window.AndroidBridge.writeAppFile(rel, bytesB64(buf));
    if (wr !== 'OK') throw new Error('写入输入失败：' + wr);
    const st = JSON.parse(window.AndroidBridge.chunkerStart(rel, target, outNameOf(target)));
    if (!st.ok) throw new Error(st.error || '启动转换失败');
    log('任务已启动：' + st.id);
    let lastLog = '';
    for (let i = 0; i < 100000; i++) {
      await sleep(700);
      const s = JSON.parse(window.AndroidBridge.chunkerStatus(st.id));
      if (s.log && s.log !== lastLog) {
        lastLog = s.log;
        $id('cvLog').textContent = s.log;
        $id('cvLog').scrollTop = $id('cvLog').scrollHeight;
      }
      if (s.state === 'success') {
        log('转换完成，正在导出……');
        const ex = window.AndroidBridge.exportAppFile(s.output);
        if (ex !== 'OK') throw new Error('导出失败：' + ex);
        log('已导出到「下载/MCBE解析/' + outNameOf(target) + '」');
        return;
      }
      if (s.state === 'error' || s.state === 'cancelled') throw new Error(s.error || s.state);
    }
    throw new Error('转换超时');
  };

  const runDesktop = async (file, target) => {
    const outName = outNameOf(target);
    const payload = { inputName: file.name, target, outName };
    // Electron 会暴露 File.path；没有时退回 base64
    if (file.path) payload.inputPath = file.path;
    else payload.inputBase64 = bytesB64(new Uint8Array(await file.arrayBuffer()));
    log('启动内置 Chunker 引擎…');
    const r = await window.McDesktop.chunkerConvert(payload);
    if (r && r.log) log(r.log);
    if (!r || !r.ok) throw new Error((r && r.error) || '转换失败');
    log('已保存：' + r.path);
  };

  const go = async (dir) => {
    try {
      const target = targetOf(dir);
      const file = await pick();
      log('开始：' + file.name + ' → ' + target);
      if (isAndroid) await runAndroid(file, target);
      else await runDesktop(file, target);
    } catch (e) {
      log('失败：' + (e && e.message || e));
    }
  };
  $id('cvFullB2J').onclick = () => go('b2j');
  $id('cvFullJ2B').onclick = () => go('j2b');
}

export function openConverter() {
  if (fullConverterSupported()) return openFullConverter();
  return openTerrainConverter();
}
