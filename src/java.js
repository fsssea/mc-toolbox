// Java 版存档 / NBT / 模组工程支持
import { ungzip, gzip, inflate } from 'pako';
import { parseZip, buildZip } from './zip.js';
import { colorOf } from './mapview.js';
import { renderStructure3D, colorLegend } from './struct3d.js';

const TAG = { 0: 'End', 1: 'Byte', 2: 'Short', 3: 'Int', 4: 'Long', 5: 'Float', 6: 'Double', 7: 'ByteArray', 8: 'String', 9: 'List', 10: 'Compound', 11: 'IntArray', 12: 'LongArray' };

function td(buf, pos) { return new TextDecoder('utf-8', { fatal: false }).decode(buf.subarray(pos, pos + 2)); }

export function parseJavaNbt(u8) {
  const dv = new DataView(u8.buffer, u8.byteOffset, u8.byteLength);
  const dec = new TextDecoder('utf-8', { fatal: false });
  let p = 0;
  const readStr = () => { const len = dv.getUint16(p); p += 2; if (p + len > u8.length) throw new Error('NBT 字符串越界'); const s = dec.decode(u8.subarray(p, p + len)); p += len; return s; };
  function readPayload(type) {
    switch (type) {
      case 1: { const v = dv.getInt8(p); p += 1; return v; }
      case 2: { const v = dv.getInt16(p); p += 2; return v; }
      case 3: { const v = dv.getInt32(p); p += 4; return v; }
      case 4: { const bi = dv.getBigInt64(p); p += 8; const n = Number(bi); return Number.isSafeInteger(n) ? n : bi; }
      case 5: { const v = dv.getFloat32(p); p += 4; return v; }
      case 6: { const v = dv.getFloat64(p); p += 8; return v; }
      case 7: { const n = dv.getInt32(p); p += 4; const a = u8.subarray(p, p + n); p += n; return a; }
      case 8: return readStr();
      case 9: {
        const et = dv.getInt8(p); p += 1;
        const n = dv.getInt32(p); p += 4;
        const arr = [];
        for (let i = 0; i < n; i++) arr.push(readPayload(et));
        return { listType: et, items: arr };
      }
      case 10: {
        const obj = {};
        while (true) {
          const t = dv.getInt8(p); p += 1;
          if (t === 0) break;
          const name = readStr();
          obj[name] = { type: t, value: readPayload(t) };
        }
        return obj;
      }
      case 11: { const n = dv.getInt32(p); p += 4; const a = new Int32Array(n); for (let i = 0; i < n; i++) { a[i] = dv.getInt32(p); p += 4; } return a; }
      case 12: { const n = dv.getInt32(p); p += 4; const a = []; for (let i = 0; i < n; i++) { a.push(dv.getBigInt64(p)); p += 8; } return a; }
      default: throw new Error('未知 NBT 类型 ' + type);
    }
  }
  const type = dv.getInt8(p); p += 1;
  if (type !== 10) throw new Error('NBT 根节点不是 Compound');
  const name = readStr();
  return { rootType: type, rootName: name, data: readPayload(10) };
}

export function writeJavaNbt(root) {
  const enc = new TextEncoder();
  const chunks = [];
  let size = 0;
  const push = (u8) => { chunks.push(u8); size += u8.length; };
  const writeStr = (s) => { const b = enc.encode(s); if (b.length > 65535) throw new Error('NBT 字符串超过 65535 字节'); const h = new Uint8Array(2); new DataView(h.buffer).setUint16(0, b.length); push(h); push(b); };
  const writePayload = (type, v) => {
    const buf = new Uint8Array(
      type === 1 ? 1 : type === 2 ? 2 : type === 3 ? 4 : type === 4 ? 8 : type === 5 ? 4 : type === 6 ? 8 : 0);
    const dv = new DataView(buf.buffer);
    if (type === 1) dv.setInt8(0, v);
    else if (type === 2) dv.setInt16(0, v);
    else if (type === 3) dv.setInt32(0, v);
    else if (type === 4) dv.setBigInt64(0, typeof v === 'bigint' ? v : BigInt(Math.trunc(v)));
    else if (type === 5) dv.setFloat32(0, v);
    else if (type === 6) dv.setFloat64(0, v);
    if (type <= 6) { push(buf); return; }
    if (type === 7) { const b = v instanceof Uint8Array ? v : new Uint8Array(v); const h = new Uint8Array(4 + b.length); new DataView(h.buffer).setInt32(0, b.length); h.set(b, 4); push(h); return; }
    if (type === 8) { writeStr(v); return; }
    if (type === 9) {
      const et = v.listType, items = v.items;
      const h = new Uint8Array(5); h[0] = et; new DataView(h.buffer).setInt32(1, items.length); push(h);
      for (const it of items) writePayload(et, it);
      return;
    }
    if (type === 10) {
      for (const k of Object.keys(v)) {
        const t = v[k].type, val = v[k].value;
        push(new Uint8Array([t])); writeStr(k); writePayload(t, val);
      }
      push(new Uint8Array([0]));
      return;
    }
    if (type === 11) { const h = new Uint8Array(4 + v.length * 4); new DataView(h.buffer).setInt32(0, v.length); for (let i = 0; i < v.length; i++) new DataView(h.buffer).setInt32(4 + i * 4, v[i]); push(h); return; }
    if (type === 12) { const h = new Uint8Array(4 + v.length * 8); new DataView(h.buffer).setInt32(0, v.length); for (let i = 0; i < v.length; i++) new DataView(h.buffer).setBigInt64(4 + i * 8, typeof v[i] === 'bigint' ? v[i] : BigInt(Math.trunc(v[i]))); push(h); return; }
  };
  push(new Uint8Array([10])); writeStr(root.rootName || '');
  writePayload(10, root.data);
  const out = new Uint8Array(size);
  let off = 0;
  for (const c of chunks) { out.set(c, off); off += c.length; }
  return out;
}

function tagVal(compound, key, dflt) {
  const t = compound && compound[key];
  return t ? t.value : dflt;
}

export function analyzeJavaZip(u8) {
  const z = parseZip(u8);
  const levelEntry = z.entries.find(e => e.name === 'level.dat' || e.name.endsWith('/level.dat'));
  if (!levelEntry) throw new Error('ZIP 里没有 level.dat，可能不是 Java 存档');
  const level = parseJavaNbt(ungzip(z.read(levelEntry)));
  const D = level.data.Data ? level.data.Data.value : level.data;
  const regions = z.entries.filter(e => /(^|\/)region\/r\.-?\d+\.-?\d+\.mca$/.test(e.name));
  const players = z.entries.filter(e => /(^|\/)playerdata\/[0-9a-f-]+\.dat$/.test(e.name));
  const stats = {
    name: tagVal(D, 'LevelName', ''),
    version: tagVal(D, 'Version', null) ? tagVal(tagVal(D, 'Version', {}), 'Name', '') : '',
    seed: tagVal(D, 'WorldGenSettings', null) ? tagVal(tagVal(D, 'WorldGenSettings', {}), 'seed', 0) : tagVal(D, 'RandomSeed', 0),
    spawn: [tagVal(D, 'SpawnX', 0), tagVal(D, 'SpawnY', 0), tagVal(D, 'SpawnZ', 0)],
    time: tagVal(D, 'Time', 0),
    dayTime: tagVal(D, 'DayTime', 0),
    gameType: tagVal(D, 'GameType', 0),
    difficulty: tagVal(D, 'Difficulty', 0),
    hardcore: tagVal(D, 'hardcore', 0),
    allowCommands: tagVal(D, 'allowCommands', 0),
    lastPlayed: tagVal(D, 'LastPlayed', 0),
    regions: regions.length,
    players: players.length,
    data: D, level, zip: z,
  };
  stats.days = Math.floor(stats.dayTime / 24000);
  return stats;
}

export function javaPlayer(u8) {
  const nbt = parseJavaNbt(ungzip(u8));
  const D = nbt.data.Data.value;
  return {
    pos: tagVal(D, 'Pos', [0, 0, 0]),
    health: tagVal(D, 'Health', 0),
    food: tagVal(D, 'foodLevel', 0),
    xp: tagVal(D, 'XpLevel', 0),
    inventory: (tagVal(D, 'Inventory', null) ? tagVal(D, 'Inventory', null).items.length : 0),
    gameType: tagVal(D, 'playerGameType', -1),
  };
}

// 从 region 构建俯视地图
export function javaSurface(z, onProgress) {
  const regions = z.entries.filter(e => /(^|\/)region\/r\.-?\d+\.-?\d+\.mca$/.test(e.name));
  const cols = new Map();
  let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity, chunks = 0;
  for (const re of regions) {
    let buf;
    try { buf = z.read(re); } catch (e) { continue; }
    if (!buf || buf.length < 8192) continue;
    const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    for (let i = 0; i < 1024; i++) {
      const off = (dv.getUint32(i * 4) >>> 8) * 4096;
      if (!off || off + 8 > buf.length) continue;
      const len = dv.getUint32(off);
      if (len < 5 || off + 4 + len > buf.length) continue;
      const comp = dv.getUint8(off + 4);
      let raw = buf.subarray(off + 5, off + 4 + len);
      try { raw = comp === 1 ? ungzip(raw) : comp === 2 ? inflate(raw) : raw; } catch (e) { continue; }
      let nbt;
      try { nbt = parseJavaNbt(raw); } catch (e) { continue; }
      chunks++;
      const L = nbt.data;
      const lv = tagVal(L, 'Level', null) ? tagVal(L, 'Level', {}) : L;
      const cx = tagVal(lv, 'xPos', 0);
      const cz = tagVal(lv, 'zPos', 0);
      const sections = tagVal(lv, 'Sections', null) || tagVal(lv, 'sections', null);
      if (!sections) continue;
      const items = sections.items;
      for (const sec of items) {
        const sy = tagVal(sec, 'Y', 0);
        const bs = tagVal(sec, 'block_states', null);
        const pal = tagVal(sec, 'Palette', null) || (bs && tagVal(bs, 'palette', null));
        if (!pal) continue;
        const names = pal.items.map(p => tagVal(p, 'Name', 'minecraft:air'));
        const bits = Math.max(4, Math.ceil(Math.log2(Math.max(2, names.length))));
        const longs = tagVal(sec, 'BlockStates', null) || (bs && tagVal(bs, 'data', null));
        if (!longs) continue;
        const bpl = Math.floor(64 / bits);
        const mask = (1n << BigInt(bits)) - 1n;
        for (let y = 0; y < 16; y++) for (let zz = 0; zz < 16; zz++) for (let x = 0; x < 16; x++) {
          const idx = y * 256 + zz * 16 + x;
          const li = Math.floor(idx / bpl), sh = BigInt((idx % bpl) * bits);
          const lv0 = longs[li];
          const base0 = typeof lv0 === 'bigint' ? lv0 : BigInt(Math.trunc(lv0 || 0));
          const val = Number((base0 >> sh) & mask);
          const name = names[val] || 'minecraft:air';
          if (name.endsWith(':air') || name.includes('cave_air') || name.includes('void_air')) continue;
          const wx = cx * 16 + x, wz = cz * 16 + zz, wy = sy * 16 + y;
          const key = wx + ',' + wz;
          const prev = cols.get(key);
          if (!prev || wy > prev.y) cols.set(key, { block: name, y: wy });
        }
      }
      for (const k of [cx, cx]) { }
      minX = Math.min(minX, cx * 16); maxX = Math.max(maxX, cx * 16 + 15);
      minZ = Math.min(minZ, cz * 16); maxZ = Math.max(maxZ, cz * 16 + 15);
    }
    if (onProgress) onProgress(chunks);
  }
  return { cols, minX, maxX, minZ, maxZ, chunkSet: new Set(), chunks, simulated: 0 };
}

function $(id) { return document.getElementById(id); }
function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

export function openJavaTools() {
  const body = $('modalBody');
  body.innerHTML = `<h3>Java 版存档</h3>
    <p class="muted">支持 Java 存档 .zip（含 level.dat + region）、单文件 .mca、.dat、.nbt 结构。</p>
    <input type="file" id="jvFile" accept=".zip,.mca,.dat,.nbt,*/*" style="margin:6px 0">
    <div id="jvOut" class="muted"></div>
    <div class="modalbtns"><button id="jvClose" class="ghost">关闭</button></div>`;
  $('modal').style.display = 'flex';
  const box = document.querySelector('.modalbox'); if (box) { box.style.maxWidth = '760px'; box.style.width = '96vw'; }
  $('jvClose').onclick = () => { if (box) { box.style.maxWidth = ''; box.style.width = ''; } $('modal').style.display = 'none'; };
  $('jvFile').onchange = async (ev) => {
    const f = ev.target.files[0]; if (!f) return;
    const out = $('jvOut'); out.innerHTML = '读取中…';
    try {
      const buf = new Uint8Array(await f.arrayBuffer());
      if (/\.nbt$/i.test(f.name)) return showStructureNbt(buf, out);
      if (/\.mca$/i.test(f.name)) {
        if (buf.length < 8192) throw new Error('不是有效的 .mca（不足 8KB 头部）');
        // 单 region：包一层假 zip 结构直接解析
        const surf = javaSurface({ entries: [{ name: 'region/r.0.0.mca' }], read: () => buf }, null);
        out.innerHTML = `<p>区块 ${surf.chunks} 个，范围 X ${surf.minX}~${surf.maxX}，Z ${surf.minZ}~${surf.maxZ}</p>
          <div class="mapwrap" style="max-height:56vh"><canvas id="jvCanvas"></canvas></div>`;
        drawJavaMap(surf); return;
      }
      if (/\.dat$/i.test(f.name)) {
        let nbt;
        try { nbt = parseJavaNbt(ungzip(buf)); } catch (e) { nbt = parseJavaNbt(buf); }
        out.innerHTML = `<p class="skbar"><button id="jvTree" class="primary">树状编辑</button></p>
          <pre class="code" style="height:40vh;overflow:auto">${esc(JSON.stringify(strip(nbt.data), null, 2).slice(0, 20000))}</pre>`;
        $('jvTree').onclick = () => openNbtTreeEditor(nbt, (edited) => {
          const gz = gzip(writeJavaNbt(edited));
          const name = '修改后的.dat';
          if (window.AndroidBridge && window.AndroidBridge.saveBinary) saveB64(name, gz);
          else { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([gz])); a.download = name; a.click(); }
        });
        return;
      }
      const st = analyzeJavaZip(buf);
      const surf = javaSurface(st.zip, null);
      out.innerHTML = `<div class="grid2">
        <div class="card"><span>世界名</span><b>${esc(st.name || '未命名')}</b></div>
        <div class="card"><span>版本</span><b>${esc(st.version || '未知')}</b></div>
        <div class="card"><span>种子</span><b>${st.seed}</b></div>
        <div class="card"><span>出生点</span><b>${st.spawn.join(', ')}</b></div>
        <div class="card"><span>游戏天数</span><b>${st.days}</b></div>
        <div class="card"><span>存档区块</span><b>${st.regions} 个 region</b></div>
        <div class="card"><span>玩家数据</span><b>${st.players} 个</b></div>
        <div class="card"><span>方块列</span><b>${surf.cols.size}</b></div>
      </div>
      <p class="muted">区域范围 X ${surf.minX}~${surf.maxX}，Z ${surf.minZ}~${surf.maxZ}</p>
      <div class="form2">
        <label>世界名<input id="jvName" value="${esc(st.name)}"></label>
        <label>种子<input id="jvSeed" value="${st.seed}"></label>
        <label>游戏天数<input id="jvDay" value="${st.days}"></label>
        <label>模式<input id="jvMode" value="${st.gameType}"></label>
        <label>出生 X<input id="jvSx" value="${st.spawn[0]}"></label>
        <label>出生 Y<input id="jvSy" value="${st.spawn[1]}"></label>
        <label>出生 Z<input id="jvSz" value="${st.spawn[2]}"></label>
      </div>
      <div class="skbar"><button id="jvMap" class="primary">渲染地图</button><button id="jvPlayers" class="ghost">玩家列表</button><button id="jvTree" class="ghost">NBT 树编辑</button><button id="jvSave" class="ghost">保存修改（导出 ZIP）</button></div>
      <div class="mapwrap" style="max-height:46vh"><canvas id="jvCanvas"></canvas></div>`;
      $('jvMap').onclick = () => drawJavaMap(surf);
      $('jvPlayers').onclick = () => {
        const names = st.zip.entries.filter(e => /playerdata\/[0-9a-f-]+\.dat$/.test(e.name));
        out.insertAdjacentHTML('beforeend', `<p class="muted">${names.length} 个玩家数据：${names.map(e => e.name.split('/').pop()).join('、') || '无'}</p>`);
      };
      $('jvTree').onclick = () => openNbtTreeEditor(st.level, (edited) => { st.level = edited; out.insertAdjacentHTML('beforeend', '<p class="muted">已修改到内存，点“保存修改”导出 ZIP 生效</p>'); });
      $('jvSave').onclick = () => {
        const D = st.level.data.Data.value;
        const set = (k, type, v) => { if (!D[k]) D[k] = { type, value: v }; else D[k].value = v; };
        const num = (id, d) => { const n = Number($(id).value); return Number.isFinite(n) ? n : d; };
        set('LevelName', 8, $('jvName').value);
        if (D.WorldGenSettings) D.WorldGenSettings.value.seed.value = num('jvSeed', st.seed);
        else set('RandomSeed', 4, num('jvSeed', st.seed));
        set('DayTime', 4, num('jvDay', st.days) * 24000);
        set('GameType', 3, num('jvMode', st.gameType));
        set('SpawnX', 3, num('jvSx', st.spawn[0]));
        set('SpawnY', 3, num('jvSy', st.spawn[1]));
        set('SpawnZ', 3, num('jvSz', st.spawn[2]));
        const gz = gzip(writeJavaNbt(st.level));
        const entryName = st.zip.entries.find(e => e.name === 'level.dat' || e.name.endsWith('/level.dat')).name;
        const files = st.zip.entries.map(e => ({ name: e.name, data: e.name === entryName ? gz : st.zip.read(e) }));
        const zipOut = buildZip(files);
        const name = '修改后的存档.zip';
        if (window.AndroidBridge && window.AndroidBridge.saveBinary) {
          saveB64(name, zipOut);
        } else {
          const a = document.createElement('a');
          a.href = URL.createObjectURL(new Blob([zipOut])); a.download = name; a.click();
        }
        out.insertAdjacentHTML('beforeend', '<p class="muted">已导出修改后的完整存档 ZIP（level.dat 已替换）</p>');
      };
    } catch (e) { out.innerHTML = '<p class="banner" style="display:block">' + esc(e.message) + '</p>'; }
  };
}

function drawJavaMap(surf) {
  const cv = $('jvCanvas'); if (!cv || !surf.cols.size) return;
  const spanX = surf.maxX - surf.minX + 1, spanZ = surf.maxZ - surf.minZ + 1;
  const scale = spanX > 1400 ? 1 : (spanX > 800 ? 2 : 3);
  if (spanX * scale > 4096 || spanZ * scale > 4096) return;
  cv.width = spanX * scale; cv.height = spanZ * scale;
  const g = cv.getContext('2d'); g.fillStyle = '#0b0f15'; g.fillRect(0, 0, cv.width, cv.height);
  for (const [k, v] of surf.cols) {
    const [x, z] = k.split(',').map(Number);
    g.fillStyle = colorOf(v.block);
    g.fillRect((x - surf.minX) * scale, (z - surf.minZ) * scale, scale, scale);
  }
  cv.style.width = Math.min(cv.width, 720) + 'px'; cv.style.imageRendering = 'pixelated';
}

function strip(v) {
  if (!v || typeof v !== 'object') return v;
  if (typeof v === 'bigint') return v.toString();
  if (v instanceof Uint8Array) return '<bytes ' + v.length + '>';
  if (Array.isArray(v)) return v.map(strip);
  if ('type' in v && 'value' in v) return strip(v.value);
  const o = {};
  for (const k of Object.keys(v)) o[k] = strip(v[k]);
  return o;
}

function saveB64(name, u8) {
  let s = '';
  const CH = 0x8000;
  for (let i = 0; i < u8.length; i += CH) s += String.fromCharCode.apply(null, u8.subarray(i, i + CH));
  window.AndroidBridge.saveBinary(name, btoa(s));
}

function showStructureNbt(u8, out) {
  try {
    let nbt;
    try { nbt = parseJavaNbt(ungzip(u8)); } catch (e) { nbt = parseJavaNbt(u8); }
    const root = nbt.data;
    const size = root.size ? root.size.value : null;
    const pal = root.palette ? root.palette.value.items.map(p => tagVal(p, 'Name', '?')) : [];
    const blocksN = root.blocks ? root.blocks.value.items : [];
    const blocks = blocksN.map(b => ({ pos: tagVal(b, 'pos', [0, 0, 0]), state: tagVal(b, 'state', 0) }));
    let rot = 0;
    out.innerHTML = `<p>结构大小：${size ? size.join(' × ') + ' 方块' : '未知'}，方块 ${blocks.length} 个，状态 ${pal.length} 种</p>
      <div class="skbar"><button id="st3dL" class="ghost">左转</button><button id="st3dR" class="ghost">右转</button><button id="st3dTop" class="ghost">俯视</button></div>
      <div class="mapwrap" style="max-height:52vh"><canvas id="st3dCanvas"></canvas></div>
      <div class="legend">${colorLegend(pal)}</div>
      <p class="muted">按高度堆叠渲染，可左右旋转 90°；方块颜色取自调色板名称。</p>`;
    const draw = () => renderStructure3D($('st3dCanvas'), { size, palette: pal, blocks }, rot);
    draw();
    $('st3dL').onclick = () => { rot = (rot + 3) % 4; draw(); };
    $('st3dR').onclick = () => { rot = (rot + 1) % 4; draw(); };
    $('st3dTop').onclick = () => { rot = 0; draw(); };
  } catch (e) { out.innerHTML = '<p class="banner" style="display:block">' + esc(e.message) + '</p>'; }
}

// ---- Java 模组工程生成器 ----
const LOADERS = {
  fabric: { name: 'Fabric', build: 'fabric-loom' },
  forge: { name: 'Forge', build: 'forgegradle' },
  neoforge: { name: 'NeoForge', build: 'neoForge' },
};

function pkgPath(pkg) { return pkg.replace(/\./g, '/'); }

export function openJavaModStudio() {
  const body = $('modalBody');
  body.innerHTML = `<h3>Java 模组制作器</h3>
    <p class="muted">生成可直接用 Gradle 构建的模组工程（源码 + 构建脚本 + 资源），不在这里编译 jar。</p>
    <div class="form"><label>模组名</label><input id="jmName" value="MyMod">
      <label>modid</label><input id="jmId" value="mymod">
      <label>包名</label><input id="jmPkg" value="com.example.mymod">
      <label>加载器</label><select id="jmLoader">
        <option value="fabric">Fabric</option><option value="forge">Forge</option><option value="neoforge">NeoForge</option>
      </select>
      <label>Minecraft 版本</label><input id="jmMc" value="1.21.1">
      <label>包含内容</label>
      <div class="skbar"><label class="chk"><input type="checkbox" id="jmItem" checked> 物品</label>
      <label class="chk"><input type="checkbox" id="jmBlock" checked> 方块</label>
      <label class="chk"><input type="checkbox" id="jmFood"> 食物</label>
      <label class="chk"><input type="checkbox" id="jmRecipe" checked> 合成配方</label></div>
    </div>
    <div class="skbar"><button id="jmGen" class="primary">生成工程 ZIP</button><button id="jmClose" class="ghost">关闭</button></div>
    <p id="jmMsg" class="muted"></p>`;
  $('modal').style.display = 'flex';
  const box = document.querySelector('.modalbox'); if (box) { box.style.maxWidth = '640px'; box.style.width = '96vw'; }
  $('jmClose').onclick = () => { if (box) { box.style.maxWidth = ''; box.style.width = ''; } $('modal').style.display = 'none'; };
  $('jmGen').onclick = () => {
    const name = $('jmName').value.trim() || 'MyMod';
    const id = ($('jmId').value.trim() || 'mymod').replace(/[^a-z0-9_]/gi, '');
    const pkg = $('jmPkg').value.trim() || 'com.example.' + id;
    const loader = $('jmLoader').value;
    const mc = $('jmMc').value.trim() || '1.21.1';
    const item = $('jmItem').checked, block = $('jmBlock').checked, food = $('jmFood').checked, recipe = $('jmRecipe').checked;
    const files = {};
    if (loader === 'fabric') {
      files['build.gradle'] = `plugins { id 'fabric-loom' version '1.7-SNAPSHOT' }\nversion = '1.0.0'\ngroup = '${pkg}'\nrepositories { mavenCentral() }\ndependencies { minecraft "com.mojang:minecraft:${mc}" mappings "net.fabricmc:yarn:${mc}+build.1:v2" modImplementation "net.fabricmc:fabric-loader:0.15.11" modImplementation "net.fabricmc.fabric-api:fabric-api:0.100.0" }\n`;
      files['settings.gradle'] = `pluginManagement { repositories { maven { url 'https://maven.fabricmc.net/' } gradlePluginPortal() } }\n`;
      files['src/main/resources/fabric.mod.json'] = JSON.stringify({ schemaVersion: 1, id, name, version: '1.0.0', entrypoints: { main: [pkg + '.MyMod'] }, depends: { minecraft: mc, 'fabric-loader': '>=0.15' }, description: name }, null, 2);
    } else {
      const nf = loader === 'neoforge';
      files['build.gradle'] = nf
        ? `plugins { id 'net.neoforged.gradle.userdev' version '7.0.+' }\nversion='1.0.0'\ngroup='${pkg}'\nminecraft { version = '${mc}' }\ndependencies { implementation 'net.neoforged:neoforge:21.1.0' }\n`
        : `buildscript { repositories { maven { url 'https://maven.minecraftforge.net' } } dependencies { classpath 'net.minecraftforge.gradle:ForgeGradle:6.0.+' } }\napply plugin: 'net.minecraftforge.gradle'\nminecraft { mappings channel: 'official', version: '${mc}' }\ndependencies { minecraft 'net.minecraftforge:forge:${mc}-47.2.0' }\n`;
      const meta = `modLoader="javafml"\nloaderVersion="[1,) "license="${id}"\n[[mods]]\nmodId="${id}"\nversion="1.0.0"\ndisplayName="${name}"\n`;
      files[nf ? 'src/main/resources/META-INF/neoforge.mods.toml' : 'src/main/resources/META-INF/mods.toml'] = meta;
    }
    const jp = 'src/main/java/' + pkgPath(pkg);
    files[jp + '/MyMod.java'] = `package ${pkg};\n\nimport net.minecraft.resources.ResourceLocation;\n\npublic class MyMod {\n    public static final String MODID = "${id}";\n    public static ResourceLocation id(String path) { return ResourceLocation.fromNamespaceAndPath(MODID, path); }\n}\n`;
    if (item) {
      files[jp + '/ModItems.java'] = `package ${pkg};\n\nimport net.minecraft.world.item.Item;\nimport net.minecraft.world.item.Rarity;\n\npublic final class ModItems {\n    public static final Item SAMPLE = new Item(new Item.Properties().stacksTo(64).rarity(Rarity.COMMON));\n}\n`;
      files['src/main/resources/assets/' + id + '/lang/en_us.json'] = JSON.stringify({ ['item.' + id + '.sample']: 'Sample Item' }, null, 2);
      files['src/main/resources/assets/' + id + '/models/item/sample.json'] = JSON.stringify({ parent: 'item/generated', textures: { layer0: id + ':item/sample' } }, null, 2);
    }
    if (block) {
      files[jp + '/ModBlocks.java'] = `package ${pkg};\n\nimport net.minecraft.world.level.block.Block;\nimport net.minecraft.world.level.block.state.BlockBehaviour;\n\npublic final class ModBlocks {\n    public static final Block SAMPLE_BLOCK = new Block(BlockBehaviour.Properties.of().strength(2.0f));\n}\n`;
    }
    if (recipe) {
      files['src/main/resources/data/' + id + '/recipe/sample.json'] = JSON.stringify({
        type: 'minecraft:crafting_shapeless',
        ingredients: [{ item: 'minecraft:dirt' }],
        result: { id: id + ':sample', count: 1 },
      }, null, 2);
    }
    files['README.md'] = `# ${name}\n\n- modid: ${id}\n- 加载器: ${LOADERS[loader].name}\n- MC 版本: ${mc}\n\n构建：安装 JDK 17+ 后执行 \`./gradlew build\`，产物在 \`build/libs\`。\n本工程由 MCBE工具箱 生成，未在此环境编译。\n`;
    const bytes = {};
    for (const [path, text] of Object.entries(files)) bytes[path] = new TextEncoder().encode(text);
    const zip = buildZip(Object.entries(bytes).map(([name, data]) => ({ name, data })));
    const name2 = id + '-project.zip';
    if (window.AndroidBridge && window.AndroidBridge.saveBinary) {
      saveB64(name2, zip); $('jmMsg').textContent = '已保存到 下载/MCBE解析/' + name2;
    } else {
      const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([zip])); a.download = name2; a.click();
      $('jmMsg').textContent = '已导出 ' + name2;
    }
  };
}


// ---- Java NBT 树状编辑器 ----
const TYPE_NAMES = { 1: 'byte', 2: 'short', 3: 'int', 4: 'long', 5: 'float', 6: 'double', 8: 'string' };
function openNbtTreeEditor(root, onSave) {
  const body = $('modalBody');
  const host = document.createElement('div');
  host.className = 'nbtroot';
  body.innerHTML = '<h3>NBT 树编辑</h3><p class="muted">改值、加键、删键；数组只读。保存后写回文件。</p><div id="nbtHost"></div><div class="skbar"><button id="nbtSave" class="primary">保存</button><button id="nbtClose" class="ghost">关闭</button></div><p id="nbtMsg" class="muted"></p>';
  buildTree(root.data, 0);
  $('modal').style.display = 'flex';
  const box = document.querySelector('.modalbox'); if (box) { box.style.maxWidth = '760px'; box.style.width = '96vw'; }
  function buildTree(node, depth) {
    for (const k of Object.keys(node)) box2(node, k, depth);
  }
  function box2(parent, key, depth) {
    const t = parent[key];
    const row = document.createElement('div');
    row.className = 'nbtrow';
    row.style.marginLeft = (depth * 12) + 'px';
    const name = document.createElement('code'); name.textContent = key; row.appendChild(name);
    if (t.type === 10) {
      const btn = document.createElement('button'); btn.className = 'nbtdel'; btn.textContent = '删';
      btn.onclick = () => { delete parent[key]; row.remove(); };
      row.appendChild(btn);
      $('nbtHost').appendChild(row);
      buildTree(t.value, depth + 1);
      const add = document.createElement('div');
      add.className = 'nbtadd'; add.style.marginLeft = ((depth + 1) * 12) + 'px';
      const ni = document.createElement('input'); ni.placeholder = '新键名';
      const ts = document.createElement('select');
      for (const [k, v] of Object.entries(TYPE_NAMES)) ts.innerHTML += `<option value="${k}">${v}</option>`;
      const vi = document.createElement('input'); vi.placeholder = '值';
      const ok = document.createElement('button'); ok.textContent = '＋';
      ok.onclick = () => {
        const k2 = ni.value.trim(); if (!k2) return;
        const ty = Number(ts.value);
        let val = vi.value;
        if (ty === 8) val = String(val); else val = Number(val) || 0;
        t.value[k2] = { type: ty, value: val };
        row.remove(); add.remove(); buildTree(t.value, depth + 1); buildTreeNext(parent, key, depth);
      };
      add.append(ni, ts, vi, ok);
      $('nbtHost').appendChild(add);
      return;
    }
    if (t.type === 9) {
      row.appendChild(document.createTextNode(` [list ${t.value.items.length}]`));
      $('nbtHost').appendChild(row);
      return;
    }
    if (t.type >= 7 && t.type <= 12) {
      row.appendChild(document.createTextNode(` [${t.value.length ?? t.value.items?.length ?? 0}]`));
      $('nbtHost').appendChild(row);
      return;
    }
    const inp = document.createElement('input');
    inp.value = t.value;
    inp.onchange = () => { t.value = t.type === 8 ? inp.value : (Number(inp.value) || 0); };
    row.appendChild(inp);
    if (parent !== root.data) {
      const del = document.createElement('button'); del.className = 'nbtdel'; del.textContent = '删';
      del.onclick = () => { delete parent[key]; row.remove(); };
      row.appendChild(del);
    }
    $('nbtHost').appendChild(row);
  }
  function buildTreeNext(parent, key, depth) { /* 重新渲染该复合体 */ const t = parent[key]; buildTree(t.value, depth + 1); }
  $('nbtClose').onclick = () => { $('modal').style.display = 'none'; };
  $('nbtSave').onclick = () => { onSave(root); $('nbtMsg').textContent = '已保存'; };
}
