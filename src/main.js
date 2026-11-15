import { Archive, detectKind, isTextFile } from './archive.js';
import { readLevelDat, levelFields, applyLevelEdits, writeLevelDatBytes } from './leveldat.js';
import { parseStructure, structureSummary, replaceBlockName, structureToBytes } from './mcstructure.js';
import { parseZip } from './zip.js';
import { langOf, highlightCode } from './highlight.js';
import { parseBrarchive } from './brarchive.js';
import { uuid, genBlockTexture, genItemTexture, genEntityTexture, buildAddon, scriptTemplate } from './creator.js';
import { parseNBT, parseNBTWithHeader, plainNBT } from './nbt.js';
import { onlineUuid, apiTexture } from './maker.js';
import { analyzeWorld, zh } from './world.js';
import { localizeArchive, localizeUiJson } from './lang.js';
import { blockName, entityName, initNames, getNameFixText, saveNameFix } from './langdict.js';
import { writeNBT } from './nbt.js';
import { generateAddon, previewTexture, pngDataUrl, ENTITY_LIST, SNIPPETS } from './addongen.js';
import { openSkinStudio } from './skin.js';
import { openJavaTools, openJavaModStudio } from './java.js';
import { openConverter } from './converter.js';
import { openModConverter } from './modconv.js';
import { openToolbox } from './toolbox.js';
import { initDisplay } from './display.js';
import { initShortcuts } from './shortcuts.js';
import { initSfx } from './sfx.js';
import { buildSurface, renderSurface, describeColumn, simulateMissing, simStructures, rollLoot, structurePreview, colorOf } from './mapview.js';
import { playerSummary, editPlayerNbt, appendKvToDb, editBookPages, editItemSlots } from './leveldbwrite.js';
import { openLevelDb } from 'mcbe-leveldb-reader';
import { setBlock, clearBlock } from './mcstructure.js';

const $ = (id) => document.getElementById(id);
const state = { archive: null, name: '', kind: '', selected: null, level: null, structure: null, stats: null };

const tick = () => new Promise(r => setTimeout(r, 30));
function log(msg) { const el = $('log'); el.textContent += msg + '\n'; el.scrollTop = el.scrollHeight; }
function fmt(n) { return (n === undefined || n === null) ? '-' : Number(n).toLocaleString('zh-CN'); }
function zhName(id) { return blockName(id); }
function entName(id) { return entityName(id); }
function showError(m) { const b = $('banner'); b.textContent = '⚠ ' + m; b.style.display = 'block'; }
function clearError() { $('banner').style.display = 'none'; }
function readFileBytes(file) {
  if (file.arrayBuffer) return file.arrayBuffer().then(b => new Uint8Array(b));
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => res(new Uint8Array(fr.result));
    fr.onerror = () => rej(fr.error || new Error('读取文件失败'));
    fr.readAsArrayBuffer(file);
  });
}
function bytesToBase64(u8) {
  let s = '';
  const chunk = 0x8000;
  for (let i = 0; i < u8.length; i += chunk) {
    s += String.fromCharCode.apply(null, u8.subarray(i, i + chunk));
  }
  return btoa(s);
}
function baseName(p) { return p.split('/').pop(); }
function extOf(p) { const b = baseName(p); const i = b.lastIndexOf('.'); return i < 0 ? '' : b.slice(i); }

// ---- 弹窗 ----
function ask(title, fields) {
  return new Promise((resolve) => {
    const box = $('modal'); const body = $('modalBody');
    body.innerHTML = '';
    const h = document.createElement('h3'); h.textContent = title; body.appendChild(h);
    const inputs = {};
    for (const f of fields) {
      const lab = document.createElement('label'); lab.textContent = f.label; body.appendChild(lab);
      const inp = document.createElement('input');
      inp.value = f.value ?? ''; inp.placeholder = f.placeholder || '';
      if (f.type) inp.type = f.type;
      body.appendChild(inp); inputs[f.key] = inp;
    }
    const row = document.createElement('div'); row.className = 'modalbtns';
    const ok = document.createElement('button'); ok.textContent = '确定';
    const no = document.createElement('button'); no.textContent = '取消'; no.className = 'ghost';
    row.appendChild(ok); row.appendChild(no); body.appendChild(row);
    box.style.display = 'flex';
    const close = (val) => { box.style.display = 'none'; resolve(val); };
    ok.onclick = () => { const v = {}; for (const k in inputs) v[k] = inputs[k].value; close(v); };
    no.onclick = () => close(null);
    setTimeout(() => { const first = Object.values(inputs)[0]; if (first) first.focus(); }, 50);
  });
}

// ---- 打开文件 ----
async function openFile(file) {
  clearError();
  state.name = file.name; state.selected = null; state.level = null; state.structure = null; state.stats = null;
  $('fileName').textContent = file.name + '（' + (file.size / 1048576).toFixed(2) + ' MB）';
  log('打开：' + file.name);
  try { const rec = JSON.parse(localStorage.getItem('mcbeRecent') || '[]').filter(x => x.name !== file.name); rec.unshift({ name: file.name, at: Date.now() }); localStorage.setItem('mcbeRecent', JSON.stringify(rec.slice(0, 20))); } catch (e) { }
  try {
    const u8 = await readFileBytes(file);
    const kind = detectKind(file.name, u8);
    state.kind = kind;
    $('typeBadge').textContent = { zip: '压缩包（.mcpack/.mcaddon/.mcworld）', brarchive: '.brarchive', mcstructure: '.mcstructure', nbt: 'NBT 数据', unknown: '未知类型' }[kind] || kind;
    if (kind === 'mcstructure') {
      state.structure = parseStructure(u8);
      function showStructurePreview(mk) {
      const pv = structurePreview(mk.type, mk.x * 31 + mk.z * 17);
      const pxScale = Math.max(4, Math.floor(560 / pv.size));
      const loot = rollLoot(mk.type, mk.x * 31 + mk.z * 17);
      $('modalBody').innerHTML = `<h3>` + escapeHtml(mk.zh) + `（推测外形）</h3>
        <p class="muted">坐标 ` + mk.x + `, ` + mk.z + `　估算 y≈` + mk.y + `　群系 ` + escapeHtml(mk.biome) + `</p>
        <canvas id="structCv" width="` + (pv.size * pxScale) + `" height="` + (pv.size * pxScale) + `" style="width:100%;max-width:560px;image-rendering:pixelated;border-radius:8px"></canvas>
        <p class="muted">外形按结构类型规则程序生成（含破损/朝向随机），用于看布局，不等于真实模板。宝箱参考：` + loot.map(i => blockName(i.name) + '×' + i.count).join('、') + `</p>
        <div class="modalbtns"><button id="stClose" class="ghost">关闭</button></div>`;
      $('modal').style.display = 'flex';
      const cv = document.getElementById('structCv'); const g = cv.getContext('2d');
      g.fillStyle = '#0b0f15'; g.fillRect(0, 0, cv.width, cv.height);
      for (const b of pv.blocks) { g.fillStyle = colorOf(b.block); g.fillRect(b.x * pxScale, b.z * pxScale, pxScale, pxScale); }
      document.getElementById('stClose').onclick = () => { $('modal').style.display = 'none'; };
    }

    $('workspace').style.display = 'none';
      $('structureView').style.display = 'block';
      renderStructure();
      return;
    }
    if (kind === 'brarchive' || kind === 'zip') {
      state.archive = Archive.fromBytes(file.name, u8);
      state.texIndex = null; state.texCache = new Map(); state.texPending = new Set(); state.texPacks = []; state.texLogged = false;
      setupArchive(kind, '');
      if (state.archiveKind === 'world') log('提示：世界存档可统计 / 观看地形 / 改玩家数据；内嵌模组的 json、js、.mcstructure 都能直接改。');
      return;
    }
    throw new Error('不支持的文件类型：' + file.name);
  } catch (e) {
    console.error(e); showError(e.message || String(e)); log('打开失败：' + (e.message || e));
  }
}

async function openMultiple(files) {
  clearError();
  const parts = [];
  let kind = 'brarchive';
  for (const f of files) {
    const u8 = await readFileBytes(f);
    if (detectKind(f.name, u8) === 'brarchive') {
      const p = parseBrarchive(u8);
      for (const e of p.entries) parts.push({ path: e.name, data: e.data });
    } else if (detectKind(f.name, u8) === 'zip') {
      const z = parseZip(u8);
      for (const e of z.entries) if (!e.name.endsWith('/')) parts.push({ path: e.name, data: z.read(e) });
    } else {
      parts.push({ path: f.name, data: u8 });
    }
  }
  if (!parts.length) return showError('这些文件里没有可读取的条目');
  state.name = files.length + ' 个文件（合并打开）';
  $('fileName').textContent = files.length + ' 个文件（合并打开）';
  state.selected = null; state.level = null; state.structure = null; state.stats = null; state.statsDirty = true;
  state.archive = new Archive(kind, parts);
  state.texIndex = null; state.texCache = new Map(); state.texPending = new Set(); state.texPacks = []; state.texLogged = false;
  setupArchive(kind, files.length + ' 个文件合并');
}

function setupArchive(forcedKind, label) {
  const cls = classify(state.archive);
  state.archiveKind = cls.kind;
  state.structurePath = null;
  state.expanded = new Set();
  state.texIndex = null;
  const named = initNames(state.archive);
  if (named) log('已从包内语言文件建立中文名索引：' + named + ' 条');
  $('structureView').style.display = 'none';
  $('workspace').style.display = 'block';
  applyToolbar(cls.kind);
  syncNewButtons();
  syncNewButtons();
  const typeText = { world: '世界存档（含 LevelDB 与内嵌附加包）', pack: '附加包（可编辑文件）', other: '普通归档（合并 ' + (label || '') + '）' }[cls.kind];
  $('typeBadge').textContent = typeText;
  renderTree();
  const first = pickDefault();
  if (first) selectPath(first);
  log('已载入：' + state.archive.files.length + ' 个文件，识别为 ' + typeText);
}

function classify(archive) {
  const paths = archive.paths();
  // 只认顶层 level.dat / db 目录 / 根 CURRENT，避免把内嵌包的 CURRENT 当世界
  const hasWorld = paths.some(p => p === 'level.dat')
    || paths.some(p => /^db\/(CURRENT|MANIFEST-[0-9]+|[0-9]+\.(ldb|log|sst))$/i.test(p))
    || paths.some(p => p === 'CURRENT');
  const hasPack = paths.some(p => /manifest\.json$/i.test(p))
    || paths.some(p => /^behavior_packs\//.test(p)) || paths.some(p => /^resource_packs\//.test(p));
  if (hasWorld) return { kind: 'world', hasPack };
  if (hasPack) return { kind: 'pack', hasPack: true };
  return { kind: 'other', hasPack: false };
}

function applyToolbar(kind) {
  const worldOnly = ['btnStats', 'btnMap', 'btnPlayer'];
  const packOnly = ['btnRename', 'btnDelete', 'btnNewFile', 'btnNewFolder'];
  for (const id of worldOnly) $(id).style.display = kind === 'world' ? '' : 'none';
  for (const id of packOnly) $(id).style.display = kind === 'pack' ? '' : 'none';
  $('btnExport').textContent = kind === 'world' ? '导出存档' : '导出 / 另存';
}

function pickDefault() {
  if (!state.archive) return null;
  const paths = state.archive.paths();
  return paths.find(p => p === 'manifest.json')
    || paths.find(p => /behavior_packs|resource_packs/.test(p) && p.endsWith('manifest.json'))
    || paths.find(p => p === 'level.dat')
    || paths[0];
}

// ---- 树 ----
function renderTree() {
  const tree = $('tree'); tree.innerHTML = '';
  if (!state.expanded) state.expanded = new Set();
  if (state.filterQ) {
    const q = state.filterQ.toLowerCase();
    const hits = state.archive.files.filter(f => f.path.toLowerCase().includes(q));
    hits.slice(0, 400).forEach(f => {
      const row = document.createElement('div');
      row.className = 'node file';
      row.textContent = f.path + '  ' + sizeTag(f.data.length);
      row.onclick = () => selectPath(f.path);
      $('tree').appendChild(row);
    });
    const tag = document.createElement('div');
    tag.className = 'node muted';
    tag.textContent = '搜索“' + state.filterQ + '”：' + hits.length + ' 个结果（最多显示 400）';
    $('tree').appendChild(tag);
    return;
  }
  const nodes = state.archive.tree();
  // 只渲染展开层级内的节点：1586 个文件默认只画顶层 10 行
  const anc = [];
  const frag = document.createDocumentFragment();
  for (const n of nodes) {
    if (n.depth === 0) anc[0] = n.path;
    else { anc.length = n.depth; anc[n.depth] = n.path; }
    const parent = n.depth ? anc[n.depth - 1] : null;
    if (n.depth && !state.expanded.has(parent)) continue;
    const row = document.createElement('div');
    row.className = 'node ' + n.type + (state.selected === n.path ? ' active' : '');
    row.style.paddingLeft = (8 + n.depth * 14) + 'px';
    const open = n.type === 'dir' && state.expanded.has(n.path);
    row.textContent = (n.type === 'dir' ? (open ? '📂 ' : '📁 ') : '📄 ') + n.name + (n.type === 'file' ? '  ' + sizeTag(n.size) : '');
    row.onclick = () => {
      if (n.type === 'dir') {
        if (state.expanded.has(n.path)) state.expanded.delete(n.path);
        else state.expanded.add(n.path);
        state.selected = n.path;
        renderTree();
        renderDir(n.path);
        return;
      }
      selectPath(n.path);
    };
    frag.appendChild(row);
  }
  tree.appendChild(frag);
  const top = $('tree');
  if (tree.scrollTop === 0) top.scrollTop = 0;
}
function sizeTag(n) { return n < 1024 ? n + ' B' : (n / 1024).toFixed(1) + ' KB'; }
function toggleChildren(dir, row) {
  let next = row.nextElementSibling, hide = row.classList.contains('collapsed');
  while (next && parseInt(next.style.paddingLeft) > parseInt(row.style.paddingLeft)) {
    next.style.display = hide ? 'none' : 'flex'; next = next.nextElementSibling;
  }
}

function selectPath(path) {
  if (/\.brarchive$/i.test(path) && state.archive.get(path)) return openSubArchive(path);
  state.selected = path;
  document.querySelectorAll('#tree .node').forEach(n => n.classList.remove('active'));
  renderTree();
  state.archive.get(path) ? renderEditor(path) : renderDir(path);
}

function openSubArchive(path) {
  try {
    const bytes = state.archive.getBytes(path);
    const sub = Archive.fromBytes(path, bytes);
    state.parent = state.parent || { archive: state.archive, name: state.name, selected: state.selected };
    state.archive = sub;
    state.name = baseName(path);
    state.selected = null;
    log('进入内嵌归档：' + path + '（' + sub.files.length + ' 个条目）');
    renderTree();
    const first = pickDefault();
    if (first) selectPath(first);
    // 返回按钮
    if (!document.getElementById('btnUp')) {
      const b = document.createElement('button');
      b.id = 'btnUp'; b.textContent = '返回上级包'; b.className = 'ghost';
      b.onclick = upArchive;
      $('workspace').querySelector('.toolbar').appendChild(b);
    }
    document.getElementById('btnUp').style.display = '';
  } catch (e) { showError(e.message); }
}

function upArchive() {
  if (!state.parent) return;
  state.archive = state.parent.archive;
  state.name = state.parent.name;
  state.selected = state.parent.selected;
  state.parent = null;
  $('btnUp').style.display = 'none';
  renderTree();
  log('已返回上级包');
}

function renderDir(path) {
  const box = $('editor'); box.innerHTML = '';
  const pref = path + '/';
  const files = state.archive.files.filter(f => f.path.startsWith(pref));
  const total = files.reduce((s, f) => s + f.data.length, 0);
  const head = document.createElement('div');
  head.className = 'edhead';
  head.innerHTML = `<div><b>📁 ${escapeHtml(path)}</b><span class="muted">　${files.length} 个文件，共 ${sizeTag(total)}</span></div>`;
  box.appendChild(head);
  const p = document.createElement('p');
  p.className = 'muted';
  p.textContent = '这是文件夹。可以用上方“重命名”改文件夹名（会连同内部所有文件一起改路径），也可以“删除”整个文件夹。';
  box.appendChild(p);
  const list = document.createElement('pre');
  list.className = 'list';
  list.textContent = files.slice(0, 200).map(f => f.path.slice(pref.length)).join('\n');
  box.appendChild(list);
}

// ---- 编辑器 ----
function isDbPath(p) {
  return /(^|\/)db\/(CURRENT|MANIFEST-[0-9]+|[0-9]+\.(ldb|log|sst))$/i.test(p);
}

function i32le(b, o) {
  return b[o] | (b[o + 1] << 8) | (b[o + 2] << 16) | (b[o + 3] << 24);
}

function describeKey(kv) {
  const kb = kv.keyBytes || new Uint8Array(0);
  const key = kv.key;
  if (key === '~local_player') return '玩家数据 ~local_player';
  const x = i32le(kb, 0), z = i32le(kb, 4);
  if (kb.length === 10 && kb[8] === 0x2f) {
    const y = kb[9] > 127 ? kb[9] - 256 : kb[9];
    return '子区块 (' + x + ',' + z + ') y=' + y;
  }
  if (kb.length === 9 && kb[8] === 0x2b) return '区块 (' + x + ',' + z + ')';
  if (kb.length === 9 && kb[8] === 0x31) return '方块实体索引 (' + x + ',' + z + ')';
  if (kb.length === 9 && kb[8] === 0x77) return '实体索引 (' + x + ',' + z + ')';
  if (kb.length === 9) return '区块附属 0x' + kb[8].toString(16) + ' (' + x + ',' + z + ')';
  if (/^[\x20-\x7e]+$/.test(key) && key.length < 60) return key;
  let txt = '';
  for (let i = 0; i < Math.min(kb.length, 16); i++) txt += kb[i].toString(16).padStart(2, '0') + ' ';
  return '二进制键 ' + txt.trim();
}

function valuePreview(v) {
  if (!v || !v.length) return '（空值）';
  if (v[0] === 10 || v[0] === 8 || v[0] === 9 || v[0] === 7) {
    try {
      const res = parseNBT(v, 0, true);
      const txt = JSON.stringify(plainNBT(res), null, 1);
      if (txt) return txt.length > 1600 ? txt.slice(0, 1600) + ' …' : txt;
    } catch (e) { /* 落到十六进制 */ }
  }
  let hex = '';
  for (let i = 0; i < Math.min(v.length, 64); i++) hex += v[i].toString(16).padStart(2, '0') + (i % 16 === 15 ? '\n' : ' ');
  return hex.trim() + (v.length > 64 ? '\n… 共 ' + v.length + ' 字节' : '');
}

async function openDbViewer(path) {
  log('正在读取 LevelDB（' + path + '）…');
  const files = await dbFiles();
  if (!files.length) return showError('没有找到 LevelDB 文件');
  try {
    const db = state.db || await window.MCBE.readLevelDb(files, {});
    state.db = db;
    const rows = [];
    const chunkXY = new Set();
    let subs = 0, players = 0, others = 0;
    for (const [k, kv] of db) {
      const kb = kv.keyBytes || new Uint8Array(0);
      const isSub = kb.length === 10 && kb[8] === 0x2f;
      if (isSub) subs++;
      else if (kb.length === 9 && kb[8] === 0x2b) chunkXY.add(kb[0] + ',' + kb[1] + ',' + kb[2] + ',' + kb[3] + '|' + kb[4] + ',' + kb[5] + ',' + kb[6] + ',' + kb[7]);
      else others++;
      if (k === '~local_player') players++;
      rows.push({ key: k, keyBytes: kb, value: kv.value, isSub, tag: kv.tag });
    }
    state.dbRows = rows;
    function showStructurePreview(mk) {
      const pv = structurePreview(mk.type, mk.x * 31 + mk.z * 17);
      const pxScale = Math.max(4, Math.floor(560 / pv.size));
      const loot = rollLoot(mk.type, mk.x * 31 + mk.z * 17);
      $('modalBody').innerHTML = `<h3>` + escapeHtml(mk.zh) + `（推测外形）</h3>
        <p class="muted">坐标 ` + mk.x + `, ` + mk.z + `　估算 y≈` + mk.y + `　群系 ` + escapeHtml(mk.biome) + `</p>
        <canvas id="structCv" width="` + (pv.size * pxScale) + `" height="` + (pv.size * pxScale) + `" style="width:100%;max-width:560px;image-rendering:pixelated;border-radius:8px"></canvas>
        <p class="muted">外形按结构类型规则程序生成（含破损/朝向随机），用于看布局，不等于真实模板。宝箱参考：` + loot.map(i => blockName(i.name) + '×' + i.count).join('、') + `</p>
        <div class="modalbtns"><button id="stClose" class="ghost">关闭</button></div>`;
      $('modal').style.display = 'flex';
      const cv = document.getElementById('structCv'); const g = cv.getContext('2d');
      g.fillStyle = '#0b0f15'; g.fillRect(0, 0, cv.width, cv.height);
      for (const b of pv.blocks) { g.fillStyle = colorOf(b.block); g.fillRect(b.x * pxScale, b.z * pxScale, pxScale, pxScale); }
      document.getElementById('stClose').onclick = () => { $('modal').style.display = 'none'; };
    }

    $('workspace').style.display = 'none';
    $('structureView').style.display = 'block';
    $('structureView').innerHTML = `
      <div class="edbar"><button id="dbBack" class="ghost">返回文件列表</button><span class="muted">${escapeHtml(path)}</span></div>
      <h3>LevelDB 查看器</h3>
      <p class="muted">共 ${fmt(rows.length)} 个键　区块 ${fmt(chunkXY.size)}　子区块 ${fmt(subs)}　其他 ${fmt(others)}　玩家 ${fmt(players)}</p>
      <input id="dbSearch" class="" placeholder="搜索键名 / 坐标，例如 local_player 或 80,-100" style="width:100%;background:#0d1219;border:1px solid #232c3a;border-radius:9px;color:#dfe4ee;padding:10px;font-size:13px;margin:6px 0 10px">
      <div id="dbList" class="dblist"></div>
      <div id="dbDetail" class="dbdetail muted">点上面任意一条查看内容</div>`;
    const back = document.getElementById('dbBack');
    back.onclick = () => { $('structureView').style.display = 'none'; $('workspace').style.display = 'block'; };
    const draw = (q) => {
      const list = document.getElementById('dbList');
      const arr = !q ? rows.slice(0, 300) : rows.filter(r => describeKey(r).includes(q) || r.key.includes(q));
      list.innerHTML = arr.slice(0, 300).map((r, i) => `<div class="dbrow" data-i="${rows.indexOf(r)}"><b>${escapeHtml(describeKey(r))}</b><span class="muted">　${sizeTag(r.value ? r.value.length : 0)}</span></div>`).join('') || '<p class="muted">没有匹配的键</p>';
      list.querySelectorAll('.dbrow').forEach(el => {
        el.onclick = () => showDbValue(rows[+el.dataset.i]);
      });
    };
    document.getElementById('dbSearch').oninput = (e) => draw(e.target.value.trim());
    draw('');
    log('已载入 ' + fmt(rows.length) + ' 个键（列表最多显示 300 条，可用搜索）');
  } catch (e) {
    showError('LevelDB 读取失败：' + e.message);
  }
}

function showDbValue(r) {
  const box = document.getElementById('dbDetail');
  const preview = escapeHtml(valuePreview(r.value));
  box.className = 'dbdetail';
  box.innerHTML = `<div class="edhead"><b>${escapeHtml(describeKey(r))}</b><span class="muted">${sizeTag(r.value.length)}</span></div>
    <pre class="dbpre">${preview}</pre>
    <div class="edbar"><button id="dbExport">导出这个值</button></div>`;
  document.getElementById('dbExport').onclick = () => {
    const nm = 'db_' + describeKey(r).replace(/[^0-9A-Za-z\u4e00-\u9fa5]+/g, '_').slice(0, 40) + '.bin';
    saveBytes(nm, r.value);
  };
}

function renderEditor(path) {
  const box = $('editor'); box.innerHTML = '';
  const data = state.archive.getBytes(path);
  const head = document.createElement('div');
  head.className = 'edhead';
  head.innerHTML = `<div><b>${escapeHtml(path)}</b><span class="muted">　${sizeTag(data.length)}</span></div>`;
  box.appendChild(head);

  if (/^\.?mcstructure$/.test(extOf(path).toLowerCase())) {
    try {
      const st = parseStructure(data);
      state.structure = st;
      state.structurePath = path;
      function showStructurePreview(mk) {
      const pv = structurePreview(mk.type, mk.x * 31 + mk.z * 17);
      const pxScale = Math.max(4, Math.floor(560 / pv.size));
      const loot = rollLoot(mk.type, mk.x * 31 + mk.z * 17);
      $('modalBody').innerHTML = `<h3>` + escapeHtml(mk.zh) + `（推测外形）</h3>
        <p class="muted">坐标 ` + mk.x + `, ` + mk.z + `　估算 y≈` + mk.y + `　群系 ` + escapeHtml(mk.biome) + `</p>
        <canvas id="structCv" width="` + (pv.size * pxScale) + `" height="` + (pv.size * pxScale) + `" style="width:100%;max-width:560px;image-rendering:pixelated;border-radius:8px"></canvas>
        <p class="muted">外形按结构类型规则程序生成（含破损/朝向随机），用于看布局，不等于真实模板。宝箱参考：` + loot.map(i => blockName(i.name) + '×' + i.count).join('、') + `</p>
        <div class="modalbtns"><button id="stClose" class="ghost">关闭</button></div>`;
      $('modal').style.display = 'flex';
      const cv = document.getElementById('structCv'); const g = cv.getContext('2d');
      g.fillStyle = '#0b0f15'; g.fillRect(0, 0, cv.width, cv.height);
      for (const b of pv.blocks) { g.fillStyle = colorOf(b.block); g.fillRect(b.x * pxScale, b.z * pxScale, pxScale, pxScale); }
      document.getElementById('stClose').onclick = () => { $('modal').style.display = 'none'; };
    }

    $('workspace').style.display = 'none';
      $('structureView').style.display = 'block';
      renderStructure();
      log('已打开结构：' + path + '（' + st.size.join('×') + '）');
      return;
    } catch (e) { log('结构解析失败：' + e.message); }
  }

  if (isDbPath(path) && state.archiveKind === 'world') {
    openDbViewer(path);
    return;
  }

  if (/\.nbt$/i.test(path)) { openNbtEditor(path); return; }

  if (baseName(path).toLowerCase() === 'level.dat') {
    try {
      const lr = readLevelDat(data);
      state.level = { nbt: lr.nbt, original: data, fields: levelFields(lr.plain) };
      box.appendChild(levelDatForm());
      return;
    } catch (e) { log('level.dat 解析失败：' + e.message); }
  }

  if (isTextFile(path, data)) {
    const fullText = state.archive.getText(path);
    const CAP = 600 * 1024;
    const truncated = fullText.length > CAP;
    if (truncated) log('文件较大（' + sizeTag(data.length) + '），只载入前 600KB 预览，避免卡顿');
    const ed = codeEditor(path, truncated ? fullText.slice(0, CAP) : fullText, truncated);
    const ta = ed.ta;
    box.appendChild(ed.wrap);
    const bar = document.createElement('div'); bar.className = 'edbar';
    const save = document.createElement('button'); save.textContent = '保存修改';
    const dl = document.createElement('button'); dl.textContent = '下载此文件'; dl.className = 'ghost';
    save.onclick = () => {
      if (truncated && ta.value === fullText.slice(0, CAP)) return showError('这是截断预览，未改动内容，不保存以免截掉后半部分');
      state.archive.setBytes(path, new TextEncoder().encode(ta.value));
      state.statsDirty = true;
      const sizeEl = head.querySelector('.muted');
      if (sizeEl) sizeEl.textContent = '　' + sizeTag(new TextEncoder().encode(ta.value).length);
      log('已保存：' + path + '（记得点右上角“导出/另存”生成新包）');
      renderTree();
    };
    dl.onclick = () => downloadPath(path);
    bar.appendChild(save); bar.appendChild(dl); box.appendChild(bar);
  } else if (/^(\.png|\.jpe?g|\.gif|\.webp|\.bmp)$/i.test(extOf(path))) {
    const wrap = document.createElement('div');
    wrap.className = 'imgview';
    const img = document.createElement('img');
    img.className = 'pixelimg';
    img.style.maxHeight = '320px';
    const info = document.createElement('p');
    info.className = 'muted';
    info.textContent = '读取图片…';
    img.onload = () => { info.textContent = '尺寸 ' + img.naturalWidth + '×' + img.naturalHeight + '　格式 ' + extOf(path).slice(1).toUpperCase() + '　大小 ' + sizeTag(data.length) + '　点“放大”看像素细节'; };
    img.onerror = () => { info.textContent = '这张图浏览器无法直接渲染（可能是损坏文件或不支持的子格式），可下载后用其它工具打开'; };
    img.src = bytesToDataUrl(path, data);
    wrap.appendChild(img); wrap.appendChild(info); box.appendChild(wrap);
    const bar = document.createElement('div'); bar.className = 'edbar';
    let zoom = 1;
    const zoomBtn = document.createElement('button'); zoomBtn.textContent = '放大 ×2'; zoomBtn.className = 'ghost';
    zoomBtn.onclick = () => {
      zoom = zoom >= 8 ? 1 : zoom * 2;
      img.style.width = (img.naturalWidth * zoom) + 'px';
      img.style.maxWidth = 'none';
      zoomBtn.textContent = zoom === 1 ? '放大 ×2' : '还原 ×1'.replace('×1', '×1（当前 ×' + zoom + '）');
    };
    const dl = document.createElement('button'); dl.textContent = '下载此文件';
    dl.onclick = () => downloadPath(path);
    const rep = document.createElement('button'); rep.textContent = '用本地文件替换'; rep.className = 'ghost';
    rep.onclick = () => replaceWithFile(path);
    bar.appendChild(zoomBtn); bar.appendChild(dl); bar.appendChild(rep); box.appendChild(bar);
    const tip = document.createElement('p'); tip.className = 'muted';
    tip.textContent = '这是只读预览：改图请先下载，或点“用本地文件替换”导入同名文件，再导出新包。';
    box.appendChild(tip);
  } else if (/.(png|jpg|jpeg|gif|webp|bmp)$/i.test(path)) {
    const img = document.createElement('img');
    img.src = bytesToDataUrl(path, state.archive.getBytes(path));
    img.style.maxWidth = '100%'; img.style.borderRadius = '8px';
    box.appendChild(img);
    const tip = document.createElement('p'); tip.className = 'muted'; tip.textContent = '图片只读预览，可用“用本地文件替换”换图后再导出。';
    box.appendChild(tip);
    const bar = document.createElement('div'); bar.className = 'edbar';
    const dl = document.createElement('button'); dl.textContent = '下载此文件'; dl.onclick = () => downloadPath(path);
    const rep = document.createElement('button'); rep.textContent = '用本地文件替换'; rep.className = 'ghost'; rep.onclick = () => replaceWithFile(path);
    bar.appendChild(dl); bar.appendChild(rep); box.appendChild(bar);
  } else {
    const p = document.createElement('p');
    p.className = 'muted';
    p.textContent = '二进制文件，无法直接编辑。可以下载出来用其它工具处理，或用“删除”后重新导入同名文件。';
    box.appendChild(p);
    const bar = document.createElement('div'); bar.className = 'edbar';
    const dl = document.createElement('button'); dl.textContent = '下载此文件';
    dl.onclick = () => downloadPath(path);
    const rep = document.createElement('button'); rep.textContent = '用本地文件替换'; rep.className = 'ghost';
    rep.onclick = () => replaceWithFile(path);
    bar.appendChild(dl); bar.appendChild(rep); box.appendChild(bar);
  }
}
function bytesToDataUrl(path, bytes) {
  const mime = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', webp: 'image/webp', bmp: 'image/bmp' }[extOf(path).slice(1).toLowerCase()] || 'application/octet-stream';
  let bin = '';
  const CH = 0x8000;
  for (let i = 0; i < bytes.length; i += CH) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + CH));
  return 'data:' + mime + ';base64,' + btoa(bin);
}

function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

function levelDatForm() {
  const f = state.level.fields;
  const wrap = document.createElement('div');
  wrap.className = 'form';
  wrap.innerHTML = `
    <h3>存档设置（level.dat）</h3>
    <label>世界名称</label><input id="lvName" value="${escapeHtml(f.levelName)}">
    <label>游戏模式</label>
    <select id="lvMode">
      <option value="0">生存</option><option value="1">创造</option>
      <option value="2">冒险</option><option value="6">旁观</option>
    </select>
    <label>难度</label>
    <select id="lvDiff">
      <option value="0">和平</option><option value="1">简单</option>
      <option value="2">普通</option><option value="3">困难</option>
    </select>
    <div class="row2">
      <div><label>硬核模式</label><input type="checkbox" id="lvHard" ${f.hardcore ? 'checked' : ''}></div>
      <div><label>允许作弊</label><input type="checkbox" id="lvCheat" ${f.cheats ? 'checked' : ''}></div>
      <div><label>保留物品</label><input type="checkbox" id="lvKeep" ${f.keepInventory ? 'checked' : ''}></div>
    </div>
    <label>出生点 X / Y / Z</label>
    <div class="row3">
      <input id="lvSx" type="number" value="${f.spawnX}">
      <input id="lvSy" type="number" value="${f.spawnY}">
      <input id="lvSz" type="number" value="${f.spawnZ}">
    </div>
    <label>世界时间（tick）</label><input id="lvTime" type="number" value="${f.time}">
    <label>游戏内天数（1 天 = 24000 tick）</label><input id="lvDays" type="number" value="${Math.floor(f.time / 24000)}">
    <div class="edbar"><button id="lvFullNbt" class="ghost">完整 NBT 编辑（天数 / 未睡觉计数 / 全部字段）</button>${state.archive.get('level.dat.bak') ? '<button id="lvRestore" class="ghost">还原 level.dat 备份</button>' : ''}</div>
    <label>种子（改完不会重建地形，只改元数据）</label><input id="lvSeed" value="${escapeHtml(f.seed)}">
    <div class="edbar"><button id="lvSave">保存到存档</button></div>
    <p class="muted">保存后会写回压缩包内的 level.dat；点“导出/另存”才会生成新的 .mcworld / .mctemplate。</p>`;
  setTimeout(() => {
    if (!wrap.querySelector('#lvMode')) return;
    document.getElementById('lvMode').value = String(f.gameType);
    document.getElementById('lvDiff').value = String(f.difficulty);
    document.getElementById('lvFullNbt').onclick = () => openNbtEditor('level.dat');
    const rv = document.getElementById('lvRestore');
    if (rv) rv.onclick = () => {
      state.archive.setBytes('level.dat', state.archive.getBytes('level.dat.bak'));
      state.statsDirty = true;
      log('已从 level.dat.bak 还原');
      selectPath('level.dat');
    };
    document.getElementById('lvSave').onclick = () => {
      const edits = {
        levelName: document.getElementById('lvName').value,
        gameType: Number(document.getElementById('lvMode').value),
        difficulty: Number(document.getElementById('lvDiff').value),
        hardcore: document.getElementById('lvHard').checked,
        cheats: document.getElementById('lvCheat').checked,
        keepInventory: document.getElementById('lvKeep').checked,
        spawnX: Number(document.getElementById('lvSx').value),
        spawnY: Number(document.getElementById('lvSy').value),
        spawnZ: Number(document.getElementById('lvSz').value),
        time: (() => {
          const t = Number(document.getElementById('lvTime').value) || 0;
          const days = Number(document.getElementById('lvDays').value);
          return Number.isFinite(days) && days !== Math.floor(t / 24000) ? days * 24000 + (t % 24000) : t;
        })(),
        seed: document.getElementById('lvSeed').value
      };
      try {
        if (!state.archive.get('level.dat.bak')) state.archive.setBytes('level.dat.bak', state.level.original);
        const nbt = applyLevelEdits(state.level.nbt, edits);
        const bytes = writeLevelDatBytes(state.level.original, nbt);
        state.archive.setBytes('level.dat', bytes);
        state.statsDirty = true;
        log('已更新 level.dat（原文件已存为 level.dat.bak）');
        renderTree();
      } catch (e) { showError(e.message); }
    };
  }, 0);
  return wrap;
}

// ---- 通用 NBT 编辑器 ----
const NBT_NAMES = { 1: 'Byte', 2: 'Short', 3: 'Int', 4: 'Long', 5: 'Float', 6: 'Double', 7: 'ByteArray', 8: 'String', 9: 'List', 10: 'Compound', 11: 'IntArray', 12: 'LongArray' };

function parseNbtSafe(u8) {
  try { return { res: parseNBT(u8, 0, true), little: true }; }
  catch (e) { return { res: parseNBT(u8, 0, false), little: false }; }
}

function openNbtEditor(path) {
  let data;
  try { data = state.archive.getBytes(path); } catch (e) { return showError(e.message); }
  let parsed;
  try {
    if (baseName(path).toLowerCase() === 'level.dat') parsed = { res: parseNBTWithHeader(data, true), little: true };
    else parsed = parseNbtSafe(data);
  } catch (e) { return showError('NBT 解析失败：' + e.message); }
  state.nbtEdit = { res: parsed.res, little: parsed.little, path, original: data };
  $('workspace').style.display = 'none';
  $('structureView').style.display = 'block';
  $('structureView').innerHTML = `
    <div class="edbar"><button id="nbtBack" class="ghost">返回文件列表</button><span class="muted">${escapeHtml(path)}</span></div>
    <h3>NBT 编辑器</h3>
    <p class="muted">根标签：Compound（${Object.keys(parsed.res.root.value || {}).length} 个键）　字节序：${parsed.little ? '小端' : '大端'}　改完点保存写回文件。</p>
    <div id="nbtRoot" class="nbtree"></div>
    <h3>新增标签</h3>
    <div class="form">
      <input id="nbtNewName" placeholder="键名，例如 Time">
      <div class="row2"><select id="nbtNewType">${Object.entries(NBT_NAMES).filter(([k]) => +k <= 8).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}</select>
      <input id="nbtNewVal" placeholder="值，例如 24000"></div>
      <div class="edbar"><button id="nbtAdd">添加</button></div>
    </div>
    <div class="edbar"><button id="nbtSave">保存并写回</button><button id="nbtExport" class="ghost">导出 .nbt</button><button id="nbtExportJson" class="ghost">导出 JSON</button></div>`;
  const root = document.getElementById('nbtRoot');
  const redraw = () => {
    root.innerHTML = '';
    for (const [k, v] of Object.entries(state.nbtEdit.res.root.value || {})) {
      root.appendChild(nbtRow(k, v, () => { delete state.nbtEdit.res.root.value[k]; redraw(); }));
    }
  };
  state.nbtRedraw = redraw;
  redraw();
  document.getElementById('nbtBack').onclick = () => { $('structureView').style.display = 'none'; $('workspace').style.display = 'block'; };
  document.getElementById('nbtAdd').onclick = () => {
    const name = document.getElementById('nbtNewName').value.trim();
    const type = Number(document.getElementById('nbtNewType').value);
    const raw = document.getElementById('nbtNewVal').value;
    if (!name) return showError('键名不能为空');
    state.nbtEdit.res.root.value[name] = { t: type, v: castNbt(type, raw) };
    redraw();
    log('已添加标签 ' + name);
  };
  document.getElementById('nbtSave').onclick = () => {
    try {
      const bytes = path === 'level.dat'
        ? writeLevelDatBytes(state.nbtEdit.original, state.nbtEdit.res)
        : writeNBT(state.nbtEdit.res, state.nbtEdit.little);
      state.archive.setBytes(path, bytes);
      log('已写回：' + path + '（' + bytes.length + ' 字节）');
    } catch (e) { showError('保存失败：' + e.message); }
  };
  document.getElementById('nbtExportJson').onclick = async () => {
    const json = JSON.stringify(plainNBT(state.nbtEdit.res), null, 2);
    await saveBytes(baseName(path) + '.json', new TextEncoder().encode(json));
  };
  document.getElementById('nbtExport').onclick = async () => {
    await saveBytes(baseName(path) === 'level.dat' ? 'level.nbt' : baseName(path), writeNBT(state.nbtEdit.res, state.nbtEdit.little));
  };
  log('已打开 NBT：' + path);
}

function castNbt(type, raw) {
  if (type === 8) return String(raw);
  const n = Number(raw);
  if (!Number.isFinite(n)) throw new Error('不是合法数字：' + raw);
  if (type === 1) return ((n << 24) >> 24);
  if (type === 2) return ((n << 16) >> 16);
  if (type === 3) return n | 0;
  return n;
}

function nbtRow(key, node, onDelete) {
  const el = document.createElement('div');
  el.className = 'nbtr';
  const head = document.createElement('div');
  head.className = 'nbtk';
  head.innerHTML = `<b>${escapeHtml(key)}</b><span class="muted">${NBT_NAMES[node.t] || '?'}</span><button class="nbtdel ghost">删</button>`;
  head.querySelector('.nbtdel').onclick = (ev) => { ev.stopPropagation(); onDelete && onDelete(); };
  el.appendChild(head);
  if (node.t === 10) {
    const box = document.createElement('div'); box.className = 'nbtkids';
    for (const [k, v] of Object.entries(node.v || {})) box.appendChild(nbtRow(k, v, () => { delete node.v[k]; el.remove(); }));
    el.appendChild(box);
  } else if (node.t === 9) {
    const box = document.createElement('div'); box.className = 'nbtkids';
    (node.v || []).forEach((item, i) => box.appendChild(nbtRow('[' + i + ']', item, () => { node.v.splice(i, 1); if (state.nbtRedraw) state.nbtRedraw(); })));
    el.appendChild(box);
  } else if (node.t === 7 || node.t === 11 || node.t === 12) {
    const inp = document.createElement('input');
    inp.className = 'nbtv';
    inp.value = Array.from(node.v || []).join(',');
    inp.onchange = () => {
      const arr = inp.value.split(',').map(x => Number(x.trim())).filter(x => Number.isFinite(x));
      node.v = node.t === 7 ? new Uint8Array(arr) : arr;
      log('已修改 ' + key);
    };
    el.appendChild(inp);
  } else {
    const inp = document.createElement('input');
    inp.className = 'nbtv';
    inp.type = (node.t === 8) ? 'text' : 'number';
    inp.value = String(node.v ?? '');
    inp.onchange = () => {
      try { node.v = castNbt(node.t, inp.value); log('已修改 ' + key + ' = ' + node.v); }
      catch (e) { showError(e.message); }
    };
    el.appendChild(inp);
  }
  return el;
}

// ---- 结构视图 ----
function parseJsonLoose(text) {
  let t = String(text).replace(/^\uFEFF/, '');
  t = t.replace(/\/\*[\s\S]*?\*\//g, '');
  t = t.replace(/^\s*\/\/.*$/gm, '');
  t = t.replace(/,\s*([}\]])/g, '$1');
  return JSON.parse(t);
}

function buildTexIndex() {
  if (state.texIndex) return state.texIndex;
  const idx = new Map();
  const scan = (src, overwrite) => {
    try {
      const paths = src.paths();
      const pngs = paths.filter(x => x.toLowerCase().endsWith('.png'));
      for (const p of paths) {
        if (!/terrain_texture\.json$/i.test(p)) continue;
        try {
          const j = parseJsonLoose(src.getText(p));
          const dir = p.slice(0, p.lastIndexOf('/'));
          const root = dir.replace(/\/textures$/, '');
          for (const [name, val] of Object.entries(j.texture_data || {})) {
            let t = Array.isArray(val.textures) ? val.textures[0] : val.textures;
            if (t && typeof t === 'object') t = t.path || t.texture;
            if (typeof t !== 'string') continue;
            const rel = t.replace(/^textures\//, '').replace(/\.png$/, '');
            const want = (root + '/textures/' + rel + '.png').toLowerCase();
            const real = pngs.find(x => x.toLowerCase() === want) || pngs.find(x => x.toLowerCase().endsWith('/textures/' + rel.toLowerCase() + '.png'));
            if (!real) continue;
            for (const key of [name, 'minecraft:' + name]) {
              if (!overwrite && idx.has(key)) continue;
              idx.set(key, { src, path: real });
            }
          }
          log('材质清单 ' + p + '：' + Object.keys(j.texture_data || {}).length + ' 条');
        } catch (e) { log('材质清单解析失败 ' + p + '：' + e.message); }
      }
    } catch (e) { /* 无归档 */ }
  };
  if (state.archive) scan(state.archive, false);
  for (const pack of (state.texPacks || [])) scan(pack, false);
  state.texIndex = idx;
  return idx;
}

function texImage(name) {
  if (!name) return null;
  const idx = buildTexIndex();
  const ent = idx.get(name) || idx.get('minecraft:' + name);
  if (!ent) return null;
  const key = (ent.src === state.archive ? '' : 'ext:') + ent.path;
  if (state.texCache && state.texCache.has(key)) return state.texCache.get(key);
  if (!state.texCache) state.texCache = new Map();
  if (!state.texPending) state.texPending = new Set();
  if (state.texPending.has(key)) return null;
  state.texPending.add(key);
  try {
    const u8 = ent.src.getBytes(ent.path);
    const url = URL.createObjectURL(new Blob([u8], { type: 'image/png' }));
    const img = new Image();
    img.onload = () => {
      state.texCache.set(key, img);
      state.texPending.delete(key);
      if (state.stEdit && state.stEdit.redraw) state.stEdit.redraw();
    };
    img.onerror = () => { state.texPending.delete(key); };
    img.src = url;
  } catch (e) { state.texPending.delete(key); }
  return null;
}

function structColor(name) {
  if (!name) return null;
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;
  return 'hsl(' + h + ',48%,48%)';
}

function renderStructure() {
  const s = state.structure, sum = structureSummary(s);
  const [sx, sy, sz] = s.size;
  const texN = buildTexIndex().size;
  if (!state.texLogged) { state.texLogged = true; log('已建立方块贴图索引：' + texN + ' 条（来自资源包 terrain_texture.json）'); }
  if (!state.stEdit) state.stEdit = { y: Math.floor(sy / 2), block: '' };
  if (state.stEdit.y >= sy) state.stEdit.y = sy - 1;
  const e = state.stEdit;
  const names = [...new Set(s.palette.map(b => b.name))].filter(Boolean);
  $('structureView').innerHTML = `
    <div class="edbar"><button id="stBack" class="ghost">返回文件列表</button><span class="muted">${state.structurePath ? escapeHtml(state.structurePath) : '独立结构文件'}</span></div>
    <div class="cards">
      <div class="card"><span>尺寸 X×Y×Z</span><b>${sum.size}</b></div>
      <div class="card"><span>方块数</span><b>${fmt(sum.blocks)}</b></div>
      <div class="card"><span>调色板</span><b>${sum.paletteTypes}</b></div>
      <div class="card"><span>实体</span><b>${sum.entities}</b></div>
    </div>

    <h3>切片编辑器</h3>
    <div class="edbar"><button id="stPrevY" class="ghost">◀ 下一层</button><span class="muted">Y = <b id="stYLabel">${e.y}</b> / ${sy - 1}</span><button id="stNextY" class="ghost">上一层 ▶</button></div>
    <div class="mapwrap" style="text-align:center"><canvas id="stSlice" style="width:100%;max-width:360px;image-rendering:pixelated"></canvas></div>
    <div class="edbar"><button id="stTexLoad" class="ghost">导入材质包（原版/模组 .mcpack/.zip）</button><span class="muted" id="stTexInfo">贴图 ${texN} 条${(() => { const miss = names.filter(n => !texImage(n)).length; return '　缺贴图 ' + miss + '/' + names.length; })()}</span><input type="file" id="stTexFile" multiple accept=".mcpack,.zip,.mcaddon" style="display:none"></div>
    <p class="muted" id="stPick">点格子选中坐标；先选下面调色板里的方块，再点格子就会放置。</p>

    <label>调色板（点选要放置的方块）</label>
    <input id="stSearch" placeholder="搜索方块名，例如 stone / 石头">
    <div id="stPalette" class="chips">${names.map(n => `<span class="chip" data-name="${escapeHtml(n)}"><span class="dot" style="background:${structColor(n) || '#333'}"></span>${escapeHtml(zhName(n))}<i>${fmt(s.counts.get(n) || 0)}</i></span>`).join('')}<span class="chip" data-name="" data-clear="1">空 / 删除</span></div>

    <h3>按坐标修改</h3>
    <div class="form">
      <div class="row3"><input id="stX" type="number" placeholder="X"><input id="stY" type="number" placeholder="Y"><input id="stZ" type="number" placeholder="Z"></div>
      <label>方块 ID（留空 = 删除该格）</label><input id="stBlock" placeholder="minecraft:glass">
      <div class="edbar"><button id="stSet">写入方块</button></div>
    </div>

    <h3>批量替换 / 导出</h3>
    <div class="form">
      <label>把哪种方块换成哪种（只改调色板）</label>
      <div class="row3"><input id="stFrom" placeholder="原 ID"><input id="stTo" placeholder="新 ID"><button id="stReplace">替换</button></div>
      <div class="edbar"><button id="stSave" class="ghost">导出结构</button>${state.structurePath ? '<button id="stWriteBack">保存回当前包</button>' : ''}</div>
    </div>`;

  const cv = document.getElementById('stSlice');
  const draw = () => {
    const cell = Math.max(2, Math.floor(360 / Math.max(sx, sz, 1)));
    cv.width = sx * cell; cv.height = sz * cell;
    const ctx = cv.getContext('2d');
    ctx.fillStyle = '#0b0f15'; ctx.fillRect(0, 0, cv.width, cv.height);
    const arr = s.indices[0] || [];
    const step = (sx * sz > 400000) ? Math.ceil(Math.sqrt(sx * sz / 400000)) : 1;
    for (let x = 0; x < sx; x += step) {
      for (let z = 0; z < sz; z += step) {
        const idx = arr[(x * sz + z) * sy + e.y];
        if (idx < 0 || idx === undefined) continue;
        const b = s.palette[idx];
        const img = b && b.name ? texImage(b.name) : null;
        if (img && img.complete && img.naturalWidth) {
          ctx.drawImage(img, x * cell, z * cell, cell, cell);
        } else {
          const col = structColor(b && b.name);
          if (!col) continue;
          ctx.fillStyle = col;
          ctx.fillRect(x * cell, z * cell, cell, cell);
        }
      }
    }
  };
  const refreshLabel = () => { document.getElementById('stYLabel').textContent = e.y; };
  e.redraw = draw;
  draw();

  const texBtn = document.getElementById('stTexLoad');
  const texFile = document.getElementById('stTexFile');
  if (texBtn) texBtn.onclick = () => texFile.click();
  if (texFile) texFile.onchange = async () => {
    const fs = [...texFile.files];
    if (!fs.length) return;
    log('正在读取材质包：' + fs.length + ' 个');
    for (const f of fs) {
      try {
        const u8 = await readFileBytes(f);
        if (detectKind(f.name, u8) === 'zip') state.texPacks.push(Archive.fromBytes(f.name, u8));
      } catch (e) { log('材质包读取失败：' + f.name + '（' + e.message + '）'); }
    }
    state.texIndex = null; state.texCache = new Map(); state.texPending = new Set();
    state.texLogged = false;
    renderStructure();
    log('材质包已加载：' + state.texPacks.length + ' 个');
  };
  document.getElementById('stBack').onclick = () => { $('structureView').style.display = 'none'; state.structurePath = null; $('workspace').style.display = 'block'; };
  document.getElementById('stPrevY').onclick = () => { e.y = Math.max(0, e.y - 1); refreshLabel(); draw(); };
  document.getElementById('stNextY').onclick = () => { e.y = Math.min(sy - 1, e.y + 1); refreshLabel(); draw(); };

  const palette = document.getElementById('stPalette');
  const mark = () => palette.querySelectorAll('.chip').forEach(c => c.classList.toggle('on', (c.dataset.name || '') === e.block && !c.dataset.clear));
  mark();
  palette.querySelectorAll('.chip').forEach(c => {
    c.onclick = () => {
      e.block = c.dataset.clear ? '' : c.dataset.name;
      document.getElementById('stBlock').value = e.block;
      mark();
    };
  });
  document.getElementById('stSearch').oninput = (ev) => {
    const q = ev.target.value.trim().toLowerCase();
    palette.querySelectorAll('.chip').forEach(c => {
      const n = c.dataset.name || '';
      c.style.display = (!q || n.toLowerCase().includes(q) || zhName(n).includes(q)) ? '' : 'none';
    });
  };

  cv.onclick = (ev) => {
    const r = cv.getBoundingClientRect();
    const w = r.width || cv.width || 1, h = r.height || cv.height || 1;
    const x = Math.min(sx - 1, Math.max(0, Math.floor((ev.clientX - r.left) / w * sx)));
    const z = Math.min(sz - 1, Math.max(0, Math.floor((ev.clientY - r.top) / h * sz)));
    const i = (x * sz + z) * sy + e.y;
    const idx = (s.indices[0] || [])[i];
    const cur = idx >= 0 && s.palette[idx] ? s.palette[idx].name : '空气';
    document.getElementById('stX').value = x;
    document.getElementById('stY').value = e.y;
    document.getElementById('stZ').value = z;
    document.getElementById('stPick').textContent = `选中 (${x}, ${e.y}, ${z})：${zhName(cur)}（${cur}）` + (e.block ? '　→ 再点一次即放置' : '');
    if (e.block) {
      try {
        setBlock(s, x, e.y, z, e.block);
        log('已放置 ' + e.block + ` @ ${x},${e.y},${z}`);
        state.stEdit.keepY = true;
        renderStructure();
      } catch (err) { showError(err.message); }
    }
  };

  const back = document.getElementById('stWriteBack');
  if (back) back.onclick = () => {
    if (!state.structurePath) return;
    state.archive.setBytes(state.structurePath, structureToBytes(s));
    log('已写回：' + state.structurePath + '（记得导出）');
  };
  document.getElementById('stSet').onclick = () => {
    const x = Number(document.getElementById('stX').value || 0);
    const y = Number(document.getElementById('stY').value || 0);
    const z = Number(document.getElementById('stZ').value || 0);
    const b = document.getElementById('stBlock').value.trim();
    try {
      if (b) setBlock(s, x, y, z, b); else clearBlock(s, x, y, z);
      log((b ? '已写入 ' + b : '已清除方块') + ` @ ${x},${y},${z}`);
      e.y = Math.min(sy - 1, Math.max(0, y));
      renderStructure();
    } catch (err) { showError(err.message); }
  };
  document.getElementById('stReplace').onclick = () => {
    const from = document.getElementById('stFrom').value.trim();
    const to = document.getElementById('stTo').value.trim();
    if (!from || !to) return showError('两个方块 ID 都要填');
    const n = replaceBlockName(s, from, to);
    log('已替换 ' + n + ' 个调色板条目');
    renderStructure();
  };
  document.getElementById('stSave').onclick = async () => {
    const name = await ask('导出结构文件', [{ key: 'name', label: '文件名', value: state.name.replace(/\.[^.]+$/, '') + '_edit.mcstructure' }]);
    if (!name || !name.name) return;
    $('structureView').style.display = 'block';
    await saveBytes(name.name, structureToBytes(s));
  };
}

async function renameSelected() {
  if (!state.selected) return showError('先在列表里选一个文件或文件夹');
  const isDir = !state.archive.get(state.selected);
  const old = state.selected;
  const r = await ask(isDir ? '重命名文件夹' : '重命名文件（可改后缀）', [{ key: 'name', label: '新名称', value: baseName(old) }]);
  if (!r || !r.name) return;
  const newName = r.name.replace(/\//g, '').trim();
  if (!newName) return;
  const parent = old.includes('/') ? old.slice(0, old.lastIndexOf('/')) : '';
  const newPath = parent ? parent + '/' + newName : newName;
  if (state.archive.paths().includes(newPath)) return showError('同名文件已存在');
  state.archive.rename(old, newPath, isDir);
  state.selected = null;
  renderTree(); log('已重命名：' + old + ' → ' + newPath);
}

async function deleteSelected() {
  if (!state.selected) return showError('先选一个文件或文件夹');
  const p = state.selected;
  const isDir = !state.archive.get(p);
  const r = await ask('删除确认', [{ key: 'ok', label: '输入 DELETE 确认删除 ' + p }]);
  if (!r || r.ok !== 'DELETE') return;
  state.archive.remove(p);
  state.selected = null;
  $('editor').innerHTML = '';
  renderTree(); log('已删除：' + p);
}

async function newFile() {
  const r = await ask('新建文件', [{ key: 'path', label: '路径（可含文件夹）', placeholder: 'scripts/new.js' }]);
  if (!r || !r.path) return;
  const p = r.path.trim().replace(/^\/+/, '');
  state.archive.setBytes(p, new TextEncoder().encode(''));
  renderTree(); selectPath(p); log('已新建：' + p);
}

async function newFolder() {
  const r = await ask('新建文件夹', [{ key: 'path', label: '文件夹路径', placeholder: 'scripts/utils' }]);
  if (!r || !r.path) return;
  const p = r.path.trim().replace(/^\/+/, '').replace(/\/+$/, '');
  state.archive.setBytes(p + '/.keep', new Uint8Array(0));
  renderTree(); log('已新建文件夹：' + p);
}

async function replaceWithFile(path) {
  const inp = document.createElement('input');
  inp.type = 'file';
  inp.onchange = async () => {
    const f = inp.files[0]; if (!f) return;
    const bytes = await readFileBytes(f);
    state.archive.setBytes(path, bytes);
    log('已替换：' + path);
    renderTree(); selectPath(path);
  };
  inp.click();
}

function downloadPath(path) {
  const data = state.archive.getBytes(path);
  saveBytes(baseName(path), data);
}

async function saveBytes(name, u8, b64In) {
  const b64 = b64In || bytesToBase64(u8);
  if (window.AndroidBridge && window.AndroidBridge.saveBinary) {
    const r = window.AndroidBridge.saveBinary(name, b64);
    if (String(r).startsWith('ERR')) showError('保存失败：' + r); else log('已保存到 下载/MCBE解析/' + name);
    return;
  }
  const blob = new Blob([u8], { type: 'application/octet-stream' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; a.click();
  log('已导出：' + name);
}

function ensureExt(name, kind) {
  const want = { world: '.mcworld', pack: '.mcpack', other: '.zip' }[kind] || '.zip';
  if (/\.(mcworld|mcpack|mcaddon|mctemplate|zip)$/i.test(name)) return name;
  return name + want;
}

async function exportArchive() {
  if (!state.archive) return showError('还没有打开压缩包');
  const paths = state.archive.paths();
  const isAddon = paths.some(p => /manifest\.json$/i.test(p)) && !paths.includes('level.dat');
  const oldExt = state.name ? (extOf(state.name) || '.mcpack') : (isAddon ? '.mcaddon' : '.mcpack');
  const base = state.name ? baseName(state.name).replace(/\.[^.]+$/, '') : 'MCBE附加包';
  const def = base + '_new' + oldExt;
  const r = await ask('导出 / 另存为（可改后缀）', [{ key: 'name', label: '文件名（含后缀）', value: def }]);
  if (!r || !r.name) return;
  const name = r.name.trim();
  log('正在打包：' + name + '（' + state.archive.files.length + ' 个文件）');
  await tick();
  const bytes = state.archive.toBytes();
  await saveBytes(name, bytes);
  log('打包完成，大小 ' + bytes.length + ' 字节');
}

// ---- 世界统计 ----
async function runStats() {
  if (!state.archive) return showError('先打开 .mcworld / .mctemplate');
  if (state.stats && !state.statsDirty) { renderStats(state.stats); log('用缓存的统计结果（内容有改动会自动重算）'); return; }
  const paths = state.archive.paths();
  const dbPaths = paths.filter(p => /(^|\/)(CURRENT|MANIFEST-[0-9]+|[0-9]+\.(ldb|log|sst))$/.test(p));
  if (!dbPaths.length) return showError('这个包里没有 LevelDB 数据库（可能只是附加包）');
  log('开始统计：' + dbPaths.length + ' 个 LevelDB 文件…');
  try {
    const files = dbPaths.map(p => { const b = state.archive.getBytes(p); return { name: baseName(p), arrayBuffer: async () => b }; });
    const { readLevelDb } = window.MCBE;
    const db = await readLevelDb(files, {});
    log('读取 ' + db.size + ' 条键值');
    const levelDat = state.archive.get('level.dat') ? state.archive.getBytes('level.dat') : null;
    const report = { file: state.name, size: 0 };
    await analyzeWorld(db, report, levelDat);
    state.stats = report; state.statsDirty = false;
    renderStats(report);
  } catch (e) { console.error(e); showError(e.message); }
}

function renderStats(r) {
  const lv = r.level || {};
  const modeText = ['生存', '创造', '冒险', '旁观'][lv.gameType] ?? lv.gameType;
  const diffText = ['和平', '简单', '普通', '困难'][lv.difficulty] ?? lv.difficulty;
  $('editor').innerHTML = `
    <h3>世界统计</h3>
    <div class="cards">
      <div class="card"><span>世界名称</span><b>${lv.levelName ?? '-'}</b></div>
      <div class="card"><span>种子</span><b>${lv.seed ?? '-'}</b></div>
      <div class="card"><span>模式</span><b>${modeText ?? '-'} / ${diffText ?? '-'}${lv.hardcore ? '（硬核）' : ''}</b></div>
      <div class="card"><span>出生点</span><b>${lv.spawn ?? '-'}</b></div>
    </div>
    <table><tbody>
      <tr><td>LevelDB 键数</td><td>${fmt(r.keys)}</td></tr>
      <tr><td>区块数</td><td>${fmt(r.chunks)}</td></tr>
      <tr><td>子区块数</td><td>${fmt(r.subchunks)}</td></tr>
      <tr><td>主层方块数</td><td>${fmt(r.blocks)}</td></tr>
      <tr><td>方块种类</td><td>${fmt(r.blockTypes)}</td></tr>
      <tr><td>实体</td><td>${fmt(r.entities)}</td></tr>
      <tr><td>方块实体</td><td>${fmt(r.blockEntities)}</td></tr>
    </tbody></table>
    <h3>方块排行</h3>
    <table><tbody>${(r.blockList || []).slice(0, 40).map(b => `<tr><td>${zhName(b.name)}</td><td>${fmt(b.count)}</td></tr>`).join('')}</tbody></table>
    <h3>实体</h3>
    <table><tbody>${Object.entries(r.entitiesByType || {}).map(([k, v]) => `<tr><td>${entName(k)}</td><td>${fmt(v)}</td></tr>`).join('')}</tbody></table>`;
}

// ---- 一键汉化 ----
async function runLocalize() {
  if (!state.archive) return showError('先打开一个 .mcpack / .mcaddon / .mcworld');
  clearError();
  const before = state.archive.files.length;
  log('开始汉化…');
  await tick();
  const reports = localizeArchive(state.archive);
  let ui = 0;
  for (const p of state.archive.paths()) {
    if (/\.json$/i.test(p) && /(^|\/)ui\//.test(p)) ui += localizeUiJson(state.archive, p);
  }
  for (const r of reports) {
    if (r.status === 'no-lang') log(`· ${r.pack}：没有 texts/*.lang，跳过`);
    else if (r.status === 'already-zh') log(`· ${r.pack}：${r.where} 里已有中文，按规则不重复汉化`);
    else log(`· ${r.pack}：已生成 ${r.file}，翻译 ${r.translated} 条`);
  }
  if (ui) log(`· UI 文本：改写了 ${ui} 处`);
  if (!reports.length && !ui) log('没有找到可汉化的语言文件');
  initNames(state.archive);
  log(`完成。文件数 ${before} → ${state.archive.files.length}，记得点“导出/另存”。`);
  renderTree();
}

// ---- 译名修正（用户自填，本机保存，不内置纠错表）----
function openNameFix() {
  const box = $('modal'), body = $('modalBody');
  body.innerHTML = `<h3>译名修正</h3>
    <p class="muted">每行一条，格式 <b>方块id=中文</b>（可以不写 minecraft:）。例如 stone=石块。只保存在本机，不会内置任何固定译文。</p>
    <textarea id="fixText" class="code" style="height:30vh">${escapeHtml(getNameFixText())}</textarea>
    <div class="modalbtns"><button id="fixSave">保存并生效</button><button id="fixClear" class="ghost">清空</button><button id="fixQuit" class="ghost">关闭</button></div>`;
  box.style.display = 'flex';
  const quit = () => { box.style.display = 'none'; };
  document.getElementById('fixQuit').onclick = quit;
  document.getElementById('fixClear').onclick = () => { document.getElementById('fixText').value = ''; };
  document.getElementById('fixSave').onclick = () => {
    const n = saveNameFix(document.getElementById('fixText').value);
    quit();
    log('译名修正已保存：' + n + ' 条（点世界统计/世界观看刷新即可看到）');
    if (state.stats) renderStats(state.stats);
  };
}

// ---- 世界观看 ----
async function dbFiles() {
  const paths = state.archive.paths().filter(p => /(^|\/)(CURRENT|MANIFEST-[0-9]+|[0-9]+\.(ldb|log|sst))$/.test(p));
  return paths.map(p => { const b = state.archive.getBytes(p); return { path: p, name: baseName(p), arrayBuffer: async () => b, data: b }; });
}

async function runMap() {
  if (!state.archive) return showError('先打开 .mcworld / .mctemplate');
  const files = await dbFiles();
  if (!files.length) return showError('这个包里没有 LevelDB（附加包不能看地图）');
  const { readLevelDb } = window.MCBE;
  try {
    const db = state.db || await readLevelDb(files, {});
    state.db = db;
    let seed = 0;
    try {
      const ld = state.archive.getBytes('level.dat');
      if (ld) {
        const lr = readLevelDat(ld);
        seed = Number(lr.plain.RandomSeed || 0);
      }
    } catch (e) { seed = 0; }
    state.mapSeed = seed;
    let mode = 'surface', yLevel = 60, simulate = true, simMargin = 512, simCaves = true, showStruct = true, mapZoom = 1;
    if (!state.mapCache) state.mapCache = {};
    log('正在扫描世界…（种子 ' + seed + '）');

    const build = async () => {
      const key = mode === 'surface' ? 'surface' : 'y' + yLevel;
      let real = state.mapCache[key];
      if (!real) {
        log(mode === 'surface' ? '扫描地表…' : '扫描 Y=' + yLevel + ' 这一层…');
        real = await buildSurface(db, mode === 'surface' ? {} : { y: yLevel, onProgress: (n) => { if (n % 128 === 0) log('已扫描 ' + n + ' 个子区块'); } });
        state.mapCache[key] = real;
      }
      const surf = { ...real, cols: new Map(real.cols), chunkSet: real.chunkSet };
      if (simulate) simulateMissing(surf, { seed, y: mode === 'underground' ? yLevel : null, margin: simMargin, caves: simCaves });
      return surf;
    };

    const paint = async () => {
      const surf = await build();
      if (!surf.cols.size) return showError('没有解析到任何方块列（可能是空存档或新格式）');
      state.surface = surf;
      const spanX = surf.maxX - surf.minX + 1, spanZ = surf.maxZ - surf.minZ + 1;
      const scale = spanX > 1100 ? 1 : (spanX > 700 ? 2 : 3);
      const cv = document.getElementById('mapCanvas');
      renderSurface(cv, surf, scale);
      if (showStruct) {
        const marks = simStructures(surf, { seed, margin: 0 });
        state.structures = marks;
        const g = cv.getContext('2d');
        for (const mk of marks) {
          const px = (mk.x - surf.minX) * scale, pz = (mk.z - surf.minZ) * scale;
          if (px < 0 || pz < 0 || px > cv.width || pz > cv.height) continue;
          g.fillStyle = mk.color;
          g.fillRect(px - 2, pz - 2, 5, 5);
          g.strokeStyle = '#0b0f15'; g.lineWidth = 1;
          g.strokeRect(px - 2.5, pz - 2.5, 6, 6);
        }
        log('结构推测：' + marks.length + ' 处（按群系与种子网格放置，非真实结构）');
      }
      const fitW = (document.getElementById('mapWrap') ? (document.getElementById('mapWrap').clientWidth || 340) : 340) - 6;
      if (!state.zoomSet) mapZoom = Math.max(0.15, Math.min(1, fitW / cv.width));
      const applyZoom = () => {
        cv.style.width = Math.round(cv.width * mapZoom) + 'px';
        cv.style.height = Math.round(cv.height * mapZoom) + 'px';
      };
      applyZoom();
      state.applyZoom = applyZoom;
      cv.onclick = (ev) => {
        if (state.mapDragged) { state.mapDragged = false; return; }
        const r = cv.getBoundingClientRect();
        const px = Math.floor((ev.clientX - r.left) / r.width * cv.width / scale);
        const pz = Math.floor((ev.clientY - r.top) / r.height * cv.height / scale);
        const wx2 = surf.minX + px, wz2 = surf.minZ + pz;
        const near = (state.structures || []).find(mk => Math.abs(mk.x - wx2) <= 8 && Math.abs(mk.z - wz2) <= 8);
        if (near) {
          showStructurePreview(near);
          const loot = rollLoot(near.type, near.x * 31 + near.z * 17);
          document.getElementById('mapInfo').textContent = `${near.zh}（推测） 坐标 ${near.x}, ${near.z}　y≈${near.y}　群系 ${near.biome}　宝箱参考：` + loot.map(i => blockName(i.name) + '×' + i.count).join('、');
        } else {
          document.getElementById('mapInfo').textContent = describeColumn(surf, surf.minX + px, surf.minZ + pz);
        }
      };
      document.getElementById('mapMeta').textContent = (mode === 'surface' ? '地表' : '地下 Y=' + yLevel) + (surf.simStep > 1 ? '（模拟采样步长 ' + surf.simStep + '）' : '') + '　真实区块 ' + fmt(realChunksOf(surf)) + ' 个　范围 X ' + surf.minX + '~' + surf.maxX + '，Z ' + surf.minZ + '~' + surf.maxZ + (surf.simulated ? '　模拟补充 ' + fmt(surf.simulated) + ' 列' : '');
    };

    function realChunksOf(surf) { return surf.chunkSet ? surf.chunkSet.size : surf.chunks; }

    function showStructurePreview(mk) {
      const pv = structurePreview(mk.type, mk.x * 31 + mk.z * 17);
      const pxScale = Math.max(4, Math.floor(560 / pv.size));
      const loot = rollLoot(mk.type, mk.x * 31 + mk.z * 17);
      $('modalBody').innerHTML = `<h3>` + escapeHtml(mk.zh) + `（推测外形）</h3>
        <p class="muted">坐标 ` + mk.x + `, ` + mk.z + `　估算 y≈` + mk.y + `　群系 ` + escapeHtml(mk.biome) + `</p>
        <canvas id="structCv" width="` + (pv.size * pxScale) + `" height="` + (pv.size * pxScale) + `" style="width:100%;max-width:560px;image-rendering:pixelated;border-radius:8px"></canvas>
        <p class="muted">外形按结构类型规则程序生成（含破损/朝向随机），用于看布局，不等于真实模板。宝箱参考：` + loot.map(i => blockName(i.name) + '×' + i.count).join('、') + `</p>
        <div class="modalbtns"><button id="stClose" class="ghost">关闭</button></div>`;
      $('modal').style.display = 'flex';
      const cv = document.getElementById('structCv'); const g = cv.getContext('2d');
      g.fillStyle = '#0b0f15'; g.fillRect(0, 0, cv.width, cv.height);
      for (const b of pv.blocks) { g.fillStyle = colorOf(b.block); g.fillRect(b.x * pxScale, b.z * pxScale, pxScale, pxScale); }
      document.getElementById('stClose').onclick = () => { $('modal').style.display = 'none'; };
    }

    $('workspace').style.display = 'none';
    $('structureView').style.display = 'block';
    $('structureView').innerHTML = `<h3>世界观看</h3>
      <div class="row2">
        <div><label>视图</label><select id="mapMode">
          <option value="surface">地表（最高方块）</option>
          <option value="underground">地下（指定高度）</option>
        </select></div>
        <div><label>地下高度 Y</label><input id="mapY" type="number" min="-64" max="120" value="60"></div>
      </div>
      <label class="chk"><input type="checkbox" id="mapSim" checked> 模拟未探索区域（按种子推算，非真实数据）</label>
      <label class="chk"><input type="checkbox" id="mapStruct" checked> 显示结构推测标记（村庄/传送门遗址/营地/沉船…）</label>
      <div class="row2"><div><label>模拟范围（向外扩展的方块数）</label>
        <select id="mapMargin"><option value="128">128 格</option><option value="512" selected>512 格</option><option value="1024">1024 格</option><option value="2048">2048 格（慢）</option></select></div></div>
      <label class="chk"><input type="checkbox" id="mapCaves" checked> 地下：推测洞穴空腔与生物群系（实验，非官方生成）</label>
      <p class="muted" style="font-size:11.5px">推测群系用淡色叠加：绿=繁茂洞穴，黄=硫磺洞穴，灰=滴水石洞穴；黑色=推测洞穴空腔。</p>
      <div class="edbar"><button id="mapPaint" class="primary">重新生成</button><button id="mapZoomIn" class="ghost">放大</button><button id="mapZoomOut" class="ghost">缩小</button><button id="mapFit" class="ghost">适应宽度</button><button id="mapPng" class="ghost">导出 PNG</button><button id="mapStructList" class="ghost">结构列表</button><button id="mapBack" class="ghost">返回文件列表</button></div>
      <p id="mapMeta" class="muted">准备中…</p>
      <div class="mapwrap" id="mapWrap"><canvas id="mapCanvas"></canvas></div>
      <p id="mapInfo" class="fname">点地图上任意位置查看该列信息；半透明区域是模拟地形</p>
      <p class="muted">真实区域来自存档里的子区块数据；没走过的区域按种子+多噪声推测高度、洞穴和地下群系，只能看个大概，不等于游戏真实地形。</p>
      <div class="legend">
        <span><i style="background:#141a22"></i>洞穴空腔</span>
        <span><i style="background:#5b7d3a"></i>繁茂洞穴</span>
        <span><i style="background:#8a6a52"></i>滴水石洞穴</span>
        <span><i style="background:#123c3a"></i>深暗之域</span>
        <span><i style="background:#c9c04a"></i>硫磺洞穴（模组向）</span>
        <span><i style="background:#d94b1e"></i>岩浆</span>
      </div>`;

    const readUI = () => {
      mode = document.getElementById('mapMode').value;
      yLevel = Number(document.getElementById('mapY').value || 60);
      simulate = document.getElementById('mapSim').checked;
      simMargin = Number(document.getElementById('mapMargin').value || 512);
      simCaves = document.getElementById('mapCaves').checked;
    };
    document.getElementById('mapMode').onchange = () => { readUI(); paint(); };
    document.getElementById('mapY').onchange = () => { readUI(); paint(); };
    document.getElementById('mapSim').onchange = () => { readUI(); paint(); };
    document.getElementById('mapMargin').onchange = () => { readUI(); paint(); };
    document.getElementById('mapStruct').onchange = () => { readUI(); paint(); };
    document.getElementById('mapZoomIn').onclick = () => { state.zoomSet = true; mapZoom = Math.min(5, mapZoom * 1.4); if (state.applyZoom) state.applyZoom(); };
    document.getElementById('mapZoomOut').onclick = () => { state.zoomSet = true; mapZoom = Math.max(0.25, mapZoom / 1.4); if (state.applyZoom) state.applyZoom(); };
    document.getElementById('mapFit').onclick = () => {
      const cv0 = document.getElementById('mapCanvas');
      const w = document.getElementById('mapWrap') ? document.getElementById('mapWrap').clientWidth : 360;
      state.zoomSet = true; mapZoom = Math.max(0.15, (w - 6) / cv0.width); if (state.applyZoom) state.applyZoom();
    };
    { const wrap = document.getElementById('mapWrap');
      if (wrap) { let drag = null;
        wrap.addEventListener('pointerdown', (ev) => { drag = { x: ev.clientX, y: ev.clientY, l: wrap.scrollLeft, t: wrap.scrollTop }; });
        wrap.addEventListener('pointermove', (ev) => { if (!drag) return; wrap.scrollLeft = drag.l - (ev.clientX - drag.x); wrap.scrollTop = drag.t - (ev.clientY - drag.y); });
        wrap.addEventListener('pointerup', (ev) => {
          if (drag && (Math.abs(ev.clientX - drag.x) > 6 || Math.abs(ev.clientY - drag.y) > 6)) state.mapDragged = true;
          drag = null;
        });
        wrap.addEventListener('pointercancel', () => { drag = null; });
      } }
    document.getElementById('mapStructList').onclick = () => {
      const marks = state.structures || [];
      if (!marks.length) return showError('先勾选“显示结构推测标记”再重新生成');
      const rows = marks.slice(0, 80).map(mk => `<div class="slotrow"><span class="slotname">${escapeHtml(mk.zh)}</span><span class="muted">${mk.x}, ${mk.z}</span></div>`).join('');
      $('modalBody').innerHTML = `<h3>结构推测（${marks.length} 处）</h3><p class="muted">按群系与种子哈希放置，只给大致位置；宝箱内容按池子随机，非真实容器数据。</p><div class="slotlist">${rows}</div><div class="modalbtns"><button id="stClose" class="ghost">关闭</button></div>`;
      $('modal').style.display = 'flex';
      document.getElementById('stClose').onclick = () => { $('modal').style.display = 'none'; };
      $('modalBody').querySelectorAll('.slotrow').forEach((el, idx) => {
        el.onclick = () => showStructurePreview(marks[idx]);
      });
    };
    document.getElementById('mapCaves').onchange = () => { readUI(); paint(); };
    document.getElementById('mapPaint').onclick = () => { readUI(); paint(); };
    document.getElementById('mapBack').onclick = () => { $('structureView').style.display = 'none'; $('workspace').style.display = 'block'; };
    document.getElementById('mapPng').onclick = async () => {
      const cv2 = document.getElementById('mapCanvas');
      const b64 = cv2.toDataURL('image/png').split(',')[1];
      await saveBytes('世界观看_' + (mode === 'surface' ? '地表' : 'Y' + yLevel) + '.png', new Uint8Array(0), b64);
      log('已导出地图 PNG');
    };

    await paint();
    log('世界观看完成');
  } catch (e) { console.error(e); showError(e.message); }
}

// ---- 玩家数据 ----
async function runPlayer() {
  if (!state.archive) return showError('先打开 .mcworld / .mctemplate');
  try {
    const files = await dbFiles();
    const { readLevelDb } = window.MCBE;
    const db = state.db || await readLevelDb(files, {});
    state.db = db;
    const kv = db.get('~local_player');
    if (!kv) return showError('这个存档没有单机玩家数据（可能需要先进入过一次世界）');
    const ps = playerSummary(kv.value);
    state.player = ps;
    $('workspace').style.display = 'block';
    $('structureView').style.display = 'none';
    $('editor').innerHTML = `<div class="edhead"><div><b>玩家数据</b><span class="muted">　键 ~local_player</span></div></div>
      <div class="form">
        <label>坐标 X / Y / Z</label>
        <div class="row3"><input id="pX" type="number" step="0.01" value="${ps.pos ? ps.pos[0].toFixed(2) : 0}"><input id="pY" type="number" step="0.01" value="${ps.pos ? ps.pos[1].toFixed(2) : 0}"><input id="pZ" type="number" step="0.01" value="${ps.pos ? ps.pos[2].toFixed(2) : 0}"></div>
        <label>生命值（留空不改）</label><input id="pHp" type="number" step="0.5" placeholder="${ps.health ?? ''}">
        <label>背包（JSON 数组，每项 name / count / slot）</label>
        <textarea id="pInv" class="code" style="height:160px">${escapeHtml(JSON.stringify(ps.inventory, null, 1))}</textarea>
        <div class="edbar"><button id="pSave">写入存档</button></div>
        <p class="muted">写入方式：向 LevelDB 日志追加一条 WriteBatch 记录（不改原文件，导出新包后生效）。</p>
      </div>`;
    document.getElementById('pSave').onclick = async () => {
      try {
        const pos = [Number(document.getElementById('pX').value), Number(document.getElementById('pY').value), Number(document.getElementById('pZ').value)];
        const hpRaw = document.getElementById('pHp').value;
        const inv = JSON.parse(document.getElementById('pInv').value || '[]');
        const edits = { pos, inventory: inv };
        if (hpRaw) edits.health = Number(hpRaw);
        const newBytes = editPlayerNbt(kv.value, edits);
        const files2 = await dbFiles();
        const lv = await openLevelDb(files2, {}); await lv.init({});
        const seq = lv.lastSequence + 1;
        const raw = state.archive.files.filter(f => /(^|\/)(MANIFEST-[0-9]+|[0-9]+\.(ldb|log))$/.test(f.path)).map(f => ({ name: baseName(f.path), data: f.data }));
        const r = appendKvToDb(raw, '~local_player', newBytes, seq);
        const path = state.archive.paths().find(p => baseName(p) === r.logName) || ('db/' + r.logName);
        state.archive.setBytes(path, r.bytes);
        state.db = null; state.statsDirty = true;
        log(`已写入：${r.logName}（序列号 ${seq}），导出后生效`);
      } catch (e) { console.error(e); showError(e.message); }
    };
    log(`玩家坐标 ${ps.pos ? ps.pos.map(v => v.toFixed(2)).join(', ') : '-'}，背包 ${ps.inventory.length} 项`);
  } catch (e) { console.error(e); showError(e.message); }
}

// ---- 背包槽位调整（3.0.4）----
async function openInventorySlots() {
  if (!state.archive) return showError('先打开 .mcworld / .mctemplate');
  try {
    const files = await dbFiles();
    const db = state.db || await (window.MCBE.readLevelDb)(files, {});
    state.db = db;
    const kv = db.get('~local_player');
    if (!kv) return showError('这个存档没有单机玩家数据');
    const pn = plainNBT(parseNBT(kv.value, 0, true));
    const inv = Array.isArray(pn.Inventory) ? pn.Inventory : [];
    if (!inv.length) return showError('玩家背包是空的');
    $('workspace').style.display = 'block';
    $('structureView').style.display = 'none';
    $('editor').innerHTML = `<div class="edhead"><div><b>背包槽位调整</b><span class="muted">　${inv.length} 项（不改物品本身 NBT）</span></div></div>
      <p class="muted">0–35 是主背包，36–39 是快捷栏（部分版本盔甲/副手另有槽位）。改成已被占用的槽位会自动交换，不会丢物品。</p>
      <div class="slotlist">${inv.map((it, i) => `
        <div class="slotrow">
          <span class="slotname">${escapeHtml(blockName(String(it.Name || '')) || String(it.Name || ''))}</span>
          <span class="muted">×${Number(it.Count ?? 1)}</span>
          <input class="slotinput" data-i="${i}" type="number" min="0" max="255" value="${Number(it.Slot ?? 0)}">
          <span class="muted">原槽 ${Number(it.Slot ?? 0)}</span>
        </div>`).join('')}</div>
      <div class="edbar"><button id="slotSave" class="primary">写入槽位</button></div>
      <p class="muted">写入方式：重编码玩家 NBT 后追加 WriteBatch 到 db 日志；导出新包后生效，建议先备份。</p>`;
    document.getElementById('slotSave').onclick = async () => {
      try {
        const map = {};
        let changed = 0;
        document.querySelectorAll('.slotinput').forEach(inp => {
          const i = Number(inp.dataset.i), old = Number(inv[i].Slot ?? 0), now = Number(inp.value);
          if (Number.isFinite(now) && now !== old) { map[i] = now; changed++; }
        });
        if (!changed) return log('槽位没有改动');
        const newBytes = editItemSlots(kv.value, map);
        const files2 = await dbFiles();
        const lv = await openLevelDb(files2, {}); await lv.init({});
        const raw = state.archive.files.filter(f => /(^|\/)(MANIFEST-[0-9]+|[0-9]+\.(ldb|log))$/.test(f.path)).map(f => ({ name: baseName(f.path), data: f.data }));
        const r = appendKvToDb(raw, '~local_player', newBytes, lv.lastSequence + 1);
        const path = state.archive.paths().find(p2 => baseName(p2) === r.logName) || ('db/' + r.logName);
        state.archive.setBytes(path, r.bytes);
        state.db = null; state.statsDirty = true;
        log('槽位已写入 ' + changed + ' 项，日志 ' + r.logName);
      } catch (e) { console.error(e); showError('写入失败：' + e.message); }
    };
    log('背包共 ' + inv.length + ' 项，可调整槽位');
  } catch (e) { console.error(e); showError(e.message); }
}

// ---- 成书内容编辑（3.0.3）----
async function openBooks() {
  if (!state.archive) return showError('先打开 .mcworld / .mctemplate');
  try {
    const files = await dbFiles();
    const db = state.db || await (window.MCBE.readLevelDb)(files, {});
    state.db = db;
    const kv = db.get('~local_player');
    if (!kv) return showError('这个存档没有单机玩家数据，书籍都在玩家背包里，先进入一次世界再试');
    const res = parseNBT(kv.value, 0, true);
    const root = res.root.value;
    const inv = root.Inventory;
    if (!inv || inv.t !== 9) return showError('玩家数据里没有背包');
    const books = [];
    inv.v.forEach((it, idx) => {
      if (!it || it.t !== 10) return;
      const nameNode = it.v.Name;
      const nm = nameNode ? String(nameNode.v) : '';
      if (!nm.includes('written_book')) return;
      const tag = it.v.tag && it.v.tag.t === 10 ? it.v.tag.v : null;
      const pagesNode = tag && tag.pages;
      const pages = pagesNode && pagesNode.t === 9 ? pagesNode.v.map(p => String(p.v)) : [];
      books.push({
        idx, count: it.v.Count ? Number(it.v.Count.v) : 1,
        title: tag && tag.title ? String(tag.title.v) : '',
        author: tag && tag.author ? String(tag.author.v) : '',
        pages,
      });
    });
    if (!books.length) return showError('玩家背包里没有成书（written_book）；成书签过名后才会存这种格式');
    $('workspace').style.display = 'block';
    $('structureView').style.display = 'none';
    $('editor').innerHTML = `<div class="edhead"><div><b>书内容编辑</b><span class="muted">　共 ${books.length} 本（只读玩家背包）</span></div></div>
      ${books.map((b, bi) => `<div class="bookcard">
        <p class="muted">槽位 ${b.idx}　数量 ${b.count}</p>
        <div class="row2"><input id="bkTitle${bi}" placeholder="书名" value="${escapeHtml(b.title)}"><input id="bkAuthor${bi}" placeholder="作者" value="${escapeHtml(b.author)}"></div>
        <label>页面文字（用单独一行 ${'```'} 分页）</label>
        <textarea id="bkPages${bi}" class="code" style="height:180px">${escapeHtml(b.pages.join('\n```\n'))}</textarea>
        <div class="edbar"><button class="bkSave" data-bi="${bi}">写回这本书</button></div>
      </div>`).join('')}
      <p class="muted">写入方式：把整个玩家 NBT 重新编码后追加 WriteBatch 到 db 日志，导出新包后生效；改前建议先导出备份。</p>`;
    document.querySelectorAll('.bkSave').forEach(btn => {
      btn.onclick = async () => {
        const bi = Number(btn.dataset.bi), b = books[bi];
        const pages = document.getElementById('bkPages' + bi).value.split('\n```\n');
        const title = document.getElementById('bkTitle' + bi).value.trim();
        const author = document.getElementById('bkAuthor' + bi).value.trim();
        try {
          const newBytes = editBookPages(kv.value, b.idx, pages, title, author);
          const files2 = await dbFiles();
          const lv = await openLevelDb(files2, {}); await lv.init({});
          const raw = state.archive.files.filter(f => /(^|\/)(MANIFEST-[0-9]+|[0-9]+\.(ldb|log))$/.test(f.path)).map(f => ({ name: baseName(f.path), data: f.data }));
          const r = appendKvToDb(raw, '~local_player', newBytes, lv.lastSequence + 1);
          const path = state.archive.paths().find(p => baseName(p) === r.logName) || ('db/' + r.logName);
          state.archive.setBytes(path, r.bytes);
          state.db = null; state.statsDirty = true;
          log('书已写回：槽位 ' + b.idx + '，' + pages.length + ' 页，日志 ' + r.logName);
        } catch (e) { console.error(e); showError('写入失败：' + e.message); }
      };
    });
    log('找到成书 ' + books.length + ' 本：' + books.map(b => (b.title || '无题') + '（' + b.pages.length + ' 页）').join('、'));
  } catch (e) { console.error(e); showError(e.message); }
}

// ---- 语法高亮 ----
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

function highlight(code, lang) {
  let s = esc(code);
  if (lang === 'json') {
    s = s.replace(/(&quot;|")?(\\?[^"\n]*?)(&quot;|")?\s*:/g, (m) => m); // 保留结构，下面统一处理
    s = s.replace(/(&quot;[^&]*?&quot;)(\s*:)/g, '<span class="tk-key">$1</span>$2');
    s = s.replace(/:\s*(&quot;.*?&quot;)/g, ': <span class="tk-str">$1</span>');
    s = s.replace(/\b(true|false|null)\b/g, '<span class="tk-kw">$1</span>');
    s = s.replace(/\b(-?\d+(?:\.\d+)?)\b/g, '<span class="tk-num">$1</span>');
    return s;
  }
  if (lang === 'py') {
    s = s.replace(/(#[^\n]*)/g, '<span class="tk-com">$1</span>');
    s = s.replace(/(&quot;.*?&quot;|&#39;.*?&#39;|'.*?')/g, '<span class="tk-str">$1</span>');
    s = s.replace(/\b(def|class|import|from|return|if|else|elif|for|while|in|not|and|or|True|False|None|try|except|with|as|lambda|pass)\b/g, '<span class="tk-kw">$1</span>');
    s = s.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="tk-num">$1</span>');
    return s;
  }
  // js / ts
  s = s.replace(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g, '<span class="tk-com">$1</span>');
  s = s.replace(/(&quot;.*?&quot;|'.*?')/g, '<span class="tk-str">$1</span>');
  s = s.replace(/\b(import|from|export|const|let|var|function|return|if|else|for|while|of|in|new|class|extends|async|await|try|catch|throw|true|false|null|undefined|subscribe|system|world)\b/g, '<span class="tk-kw">$1</span>');
  s = s.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="tk-num">$1</span>');
  return s;
}

function codeEditor(path, text, truncated) {
  const wrap = document.createElement('div');
  wrap.className = 'codeedit';
  const lang = langOf(path);
  const pre = document.createElement('pre');
  pre.className = 'codehi';
  const ta = document.createElement('textarea');
  ta.className = 'code';
  ta.spellcheck = false;
  ta.value = text;
  const paint = () => { pre.innerHTML = highlightCode(ta.value, lang) + '\n'; };
  paint();
  ta.oninput = paint;
  ta.onscroll = () => { pre.scrollTop = ta.scrollTop; pre.scrollLeft = ta.scrollLeft; };
  wrap.appendChild(pre); wrap.appendChild(ta);
  return { wrap, ta, paint };
}

// 新建类按钮只在“还没打开任何包”的首页出现，存档编辑页不显示
function syncNewButtons() {
  const show = !state.archive;
  const box = $('newPackRow');
  if (box) box.style.display = show ? 'flex' : 'none';
}

// ---- 创作工坊 ----
function openCreator() {
  const body = $('modalBody');
  const items = [
    ['新建附加包', '行为包 / 资源包 / 合并，自动生成 manifest、UUID、脚本骨架', creatorNewAddon],
    ['生成方块贴图', '16 / 32 / 64，纯色/噪点/条纹/砖块/木纹/矿石/渐变/树叶', creatorBlockTex],
    ['生成物品贴图', '16 / 32 / 64，菱形/圆/剑/镐/药水/方块图标', creatorItemTex],
    ['生成实体贴图', '64×64 人形 / 四足 UV，头身四肢配色 + 眼睛', creatorEntityTex],
    ['脚本模板', '欢迎/计时/方块交互/物品使用/实体生成/自定义命令', creatorScript],
    ['代码编辑器', 'JSON / JS / PY 语法高亮，括号与 JSON 校验', creatorCode],
    ['UUID 生成', '生成符合格式的 UUID，可直接粘贴进 manifest', creatorUuid],
  ];
  body.innerHTML = '<h3>创作工坊</h3><p class="muted">离线生成，直接写入当前包；没有打开包时会先新建一个。</p>' +
    items.map(([t, d], i) => `<button class="toolitem" data-i="${i}"><b>${t}</b><span>${d}</span></button>`).join('') +
    '<div class="modalbtns"><button id="crClose" class="ghost">关闭</button></div>';
  $('modal').style.display = 'flex';
  document.getElementById('crClose').onclick = () => { $('modal').style.display = 'none'; };
  body.querySelectorAll('.toolitem').forEach(el => el.onclick = () => { $('modal').style.display = 'none'; items[+el.dataset.i][2](); });
}

function ensurePackBase() {
  if (state.archive) return '';
  const addon = buildAddon({ name: '新附加包', ns: 'demo', kind: 'addon' });
  state.archive = new Archive('zip', addon.files.map(f => ({ path: f.path, data: f.data })));
  state.name = '新附加包.mcaddon';
  setupArchive('', '');
  return '';
}

async function creatorNewAddon() {
  const r = await ask('新建附加包', [
    { key: 'name', label: '包名称', value: '我的附加包' },
    { key: 'ns', label: '命名空间（小写英文）', value: 'demo' },
    { key: 'kind', label: '类型：behavior / resource / addon', value: 'behavior' },
    { key: 'template', label: '脚本模板：spawn / interval / blockuse / itemuse / entity / command', value: 'spawn' }
  ]);
  if (!r || !r.name) return;
  const addon = buildAddon({ name: r.name, ns: r.ns, kind: r.kind, template: r.template });
  const icon = await genBlockTexture({ size: 64, style: 'gradient', c1: '#2f7d32', c2: '#8bc34a' });
  addon.files.push({ path: (r.kind === 'addon' ? 'behavior_pack/' : '') + 'pack_icon.png', data: icon });
  state.archive = new Archive('zip', addon.files);
  state.name = r.name + (r.kind === 'addon' ? '.mcaddon' : '.mcpack');
  $('fileName').textContent = state.name;
  setupArchive('', '');
  log('已生成附加包：' + r.name + '（' + addon.files.length + ' 个文件，' + r.kind + '）');
}

async function creatorBlockTex() {
  ensurePackBase();
  const r = await ask('生成方块贴图', [
    { key: 'name', label: '方块名（含命名空间，如 demo:ruby_block）', value: 'demo:ruby_block' },
    { key: 'size', label: '尺寸：16 / 32 / 64', value: '16' },
    { key: 'style', label: '样式：solid/noise/stripes/checker/bricks/wood/ore/gradient/leaves', value: 'noise' },
    { key: 'c1', label: '主色 #RRGGBB', value: '#c62828' },
    { key: 'c2', label: '副色 #RRGGBB', value: '#ff8a80' }
  ]);
  if (!r) return;
  const size = Number(r.size) || 16;
  const id = r.name.replace(/^.*:/, '');
  const bytes = await genBlockTexture({ size, style: r.style, c1: r.c1, c2: r.c2, seed: Date.now() % 9999 });
  state.archive.setBytes('textures/blocks/' + id + '.png', bytes);
  const tp = 'textures/terrain_texture.json';
  let j = { resource_pack_name: 'pack', texture_name: 'atlas', texture_data: {} };
  if (state.archive.get(tp)) { try { j = JSON.parse(state.archive.getText(tp)); } catch (e) { } }
  j.texture_data = j.texture_data || {};
  j.texture_data[id] = { textures: ['textures/blocks/' + id] };
  state.archive.setBytes(tp, new TextEncoder().encode(JSON.stringify(j, null, 2)));
  renderTree();
  log('已生成方块贴图 textures/blocks/' + id + '.png（' + size + '×' + size + '）并登记到 terrain_texture.json');
}

async function creatorItemTex() {
  ensurePackBase();
  const r = await ask('生成物品贴图', [
    { key: 'name', label: '物品名（如 demo:ruby）', value: 'demo:ruby' },
    { key: 'size', label: '尺寸：16 / 32 / 64', value: '16' },
    { key: 'shape', label: '形状：diamond/circle/sword/pickaxe/potion/block', value: 'diamond' },
    { key: 'c1', label: '主色', value: '#7b1fa2' },
    { key: 'c2', label: '副色', value: '#e1bee7' }
  ]);
  if (!r) return;
  const size = Number(r.size) || 16;
  const id = r.name.replace(/^.*:/, '');
  const bytes = await genItemTexture({ size, shape: r.shape, c1: r.c1, c2: r.c2 });
  state.archive.setBytes('textures/items/' + id + '.png', bytes);
  const tp = 'textures/item_texture.json';
  let j = { resource_pack_name: 'pack', texture_name: 'atlas', texture_data: {} };
  if (state.archive.get(tp)) { try { j = JSON.parse(state.archive.getText(tp)); } catch (e) { } }
  j.texture_data = j.texture_data || {};
  j.texture_data[id] = { textures: ['textures/items/' + id] };
  state.archive.setBytes(tp, new TextEncoder().encode(JSON.stringify(j, null, 2)));
  renderTree();
  log('已生成物品贴图 textures/items/' + id + '.png（' + size + '×' + size + '）');
}

async function creatorEntityTex() {
  ensurePackBase();
  const r = await ask('生成实体贴图', [
    { key: 'name', label: '实体名（如 demo:golem）', value: 'demo:custom_entity' },
    { key: 'skin', label: '类型：humanoid / quadruped', value: 'humanoid' },
    { key: 'c1', label: '主体色', value: '#455a64' },
    { key: 'c2', label: '副色（四肢）', value: '#90a4ae' },
    { key: 'eye', label: '眼睛色', value: '#ffffff' }
  ]);
  if (!r) return;
  const id = r.name.replace(/^.*:/, '');
  const bytes = await genEntityTexture({ skin: r.skin, c1: r.c1, c2: r.c2, eye: r.eye });
  state.archive.setBytes('textures/entity/' + id + '.png', bytes);
  renderTree();
  log('已生成实体贴图 textures/entity/' + id + '.png（64×64，' + r.skin + ' UV）');
}

async function creatorScript() {
  ensurePackBase();
  const r = await ask('脚本模板', [
    { key: 'kind', label: '模板：spawn / interval / blockuse / itemuse / entity / command', value: 'spawn' },
    { key: 'ns', label: '命名空间', value: 'demo' },
    { key: 'file', label: '写入路径', value: 'scripts/main.js' }
  ]);
  if (!r) return;
  const code = scriptTemplate(r.kind, r.ns, state.name);
  state.archive.setBytes(r.file || 'scripts/main.js', new TextEncoder().encode(code));
  let mp = state.archive.paths().find(p => /manifest\.json$/i.test(p));
  if (mp) {
    try {
      const j = JSON.parse(state.archive.getText(mp));
      j.modules = j.modules || [];
      if (!j.modules.some(m => m.type === 'script')) {
        j.modules.push({ type: 'script', language: 'javascript', uuid: uuid(), version: [1, 0, 0], entry: 'scripts/main.js' });
      }
      const hasDep = (j.dependencies || []).some(d => d.module_name === '@minecraft/server');
      if (!hasDep) { j.dependencies = j.dependencies || []; j.dependencies.push({ module_name: '@minecraft/server', version: '1.11.0' }); }
      state.archive.setBytes(mp, new TextEncoder().encode(JSON.stringify(j, null, 2)));
      log('已更新 manifest.json 的 script 模块与依赖');
    } catch (e) { log('manifest 更新失败：' + e.message); }
  }
  renderTree();
  log('已写入脚本：' + (r.file || 'scripts/main.js') + '（模板 ' + r.kind + '）');
}

async function creatorCode() {
  if (!state.archive) return showError('先打开一个包');
  const r = await ask('打开代码编辑器', [{ key: 'path', label: '文件路径', value: state.selected || 'manifest.json' }]);
  if (!r || !r.path) return;
  const p = state.archive.get(r.path) ? r.path : state.archive.paths().find(x => x.endsWith(r.path));
  if (!p) return showError('找不到文件：' + r.path);
  const langNote = /\.py$/i.test(p) ? 'PY 仅作为脚本设计稿保存，游戏不执行 Python；运行逻辑请用 JS 模板生成。' : '';
  selectPath(p);
  if (langNote) log(langNote);
}

async function creatorUuid() {
  const id = uuid();
  log('UUID：' + id);
  $('modalBody').innerHTML = '<h3>UUID</h3><pre class="dbpre">' + id + '</pre><div class="modalbtns"><button id="uuClose" class="ghost">关闭</button></div>';
  $('modal').style.display = 'flex';
  document.getElementById('uuClose').onclick = () => { $('modal').style.display = 'none'; };
}

// ---- 附加包制作器（2.5.0）----
let makerEls = null;

function makerPreview() {
  if (!makerEls) return;
  const kind = makerEls.pattern.value === 'item' ? 'item' : (makerEls.entity.value ? 'entity' : makerEls.pattern.value);
  try {
    const bytes = previewTexture(kind === 'item' ? 'item' : (makerEls.entity.value ? 'entity' : makerEls.pattern.value),
      Number(makerEls.size.value), makerEls.c1.value, makerEls.c2.value, makerEls.entity.value);
    makerEls.preview.src = pngDataUrl(bytes);
  } catch (e) { /* 预览失败不影响生成 */ }
}

function openMaker() {
  const body = $('modalBody');
  body.innerHTML = `
    <h3>附加包制作器</h3>
    <p class="muted">离线生成行为包 + 资源包，贴图现场绘制，导出的 .mcaddon 可直接用 Minecraft 打开。</p>
    <div class="form">
      <div class="row2"><input id="mkName" placeholder="包名" value="我的附加包"><input id="mkNs" placeholder="命名空间" value="demo"></div>
      <div class="row2">
        <select id="mkMode"><option value="addon">双包 .mcaddon</option><option value="resource">仅资源包</option><option value="behavior">仅行为包</option></select>
        <select id="mkSize"><option value="16">16×16</option><option value="32">32×32</option><option value="64">64×64</option></select>
      </div>
      <div class="row2">
        <select id="mkPattern"><option value="stone">石质噪点</option><option value="wood">木纹</option><option value="metal">金属</option><option value="crystal">水晶</option><option value="wool">羊毛</option></select>
        <select id="mkEntity"><option value="">不生成实体贴图</option>${ENTITY_LIST.map(e => `<option value="${e}">${e}</option>`).join('')}</select>
      </div>
      <div class="row2"><input id="mkC1" type="color" value="#7a7f8c"><input id="mkC2" type="color" value="#4a505c"></div>
      <div class="row2">
        <label class="chk"><input type="checkbox" id="mkBlock" checked> 生成方块</label>
        <label class="chk"><input type="checkbox" id="mkItem" checked> 生成物品</label>
      </div>
      <div class="row2">
        <label class="chk"><input type="checkbox" id="mkOnlineUuid" checked> 在线 UUID</label>
        <label class="chk"><input type="checkbox" id="mkOnlineTex"> 在线贴图（公共接口，默认关）</label>
      </div>
      <input id="mkPrompt" placeholder="在线贴图提示词（英文效果更好，可空）">
      <div class="row2">
        <select id="mkLang"><option value="js">JavaScript（游戏可执行）</option><option value="ts">TypeScript（源码模板）</option><option value="json">JSON（仅数据）</option><option value="py">Python（游戏不执行，仅参考）</option><option value="none">不生成脚本</option></select>
        <select id="mkTpl"><option value="scoreboard">计分板</option><option value="particle">粒子</option><option value="welcome">进服提示</option></select>
      </div>
      <div class="mapwrap" style="text-align:center;background:#0d1219"><img id="mkPrev" style="width:96px;height:96px;image-rendering:pixelated"><div class="muted" id="mkPrevInfo"></div></div>
      <input id="mkBlockName" placeholder="方块中文名（默认 自定义方块）" value="自定义方块">
      <input id="mkItemName" placeholder="物品中文名（默认 自定义物品）" value="自定义物品">
      <div class="edbar"><button id="mkBuild">生成并打开</button><button id="mkPng" class="ghost">只保存这张贴图</button></div>
    </div>
    <div class="modalbtns"><button id="mkClose" class="ghost">关闭</button></div>`;
  $('modal').style.display = 'flex';
  makerEls = {
    name: document.getElementById('mkName'), ns: document.getElementById('mkNs'),
    mode: document.getElementById('mkMode'), size: document.getElementById('mkSize'),
    pattern: document.getElementById('mkPattern'), entity: document.getElementById('mkEntity'),
    c1: document.getElementById('mkC1'), c2: document.getElementById('mkC2'),
    block: document.getElementById('mkBlock'), item: document.getElementById('mkItem'),
    lang: document.getElementById('mkLang'), tpl: document.getElementById('mkTpl'),
    preview: document.getElementById('mkPrev'), info: document.getElementById('mkPrevInfo')
  };
  const refresh = () => {
    makerPreview();
    const kind = makerEls.entity.value ? '实体 ' + makerEls.entity.value : makerEls.pattern.options[makerEls.pattern.selectedIndex].text;
    makerEls.info.textContent = kind + '　' + makerEls.size.value + '×' + makerEls.size.value;
  };
  ['mkName', 'mkNs', 'mkMode', 'mkSize', 'mkPattern', 'mkEntity', 'mkC1', 'mkC2', 'mkBlock', 'mkItem', 'mkLang', 'mkTpl'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', refresh), el.addEventListener('input', refresh);
  });
  refresh();
  document.getElementById('mkClose').onclick = () => { $('modal').style.display = 'none'; };
  document.getElementById('mkPng').onclick = async () => {
    const kind = makerEls.entity.value ? 'entity' : (makerEls.pattern.value === 'item' ? 'item' : makerEls.pattern.value);
    const bytes = previewTexture(kind, Number(makerEls.size.value), makerEls.c1.value, makerEls.c2.value, makerEls.entity.value);
    await saveBytes((makerEls.entity.value || makerEls.pattern.value || 'texture') + '.png', bytes);
  };
  document.getElementById('mkBuild').onclick = async () => {
    const btn = document.getElementById('mkBuild');
    btn.disabled = true; btn.textContent = '生成中…';
    try {
      const cfg = {
        name: makerEls.name.value.trim() || '我的附加包',
        namespace: (makerEls.ns.value.trim() || 'demo').replace(/[^a-z0-9_]/gi, '_').toLowerCase(),
        mode: makerEls.mode.value, size: Number(makerEls.size.value),
        pattern: makerEls.pattern.value, color1: makerEls.c1.value, color2: makerEls.c2.value,
        block: makerEls.block.checked, item: makerEls.item.checked,
        entity: makerEls.entity.value, scriptLang: makerEls.lang.value, scriptTpl: makerEls.tpl.value,
        blockName: document.getElementById('mkBlockName').value.trim(),
        itemName: document.getElementById('mkItemName').value.trim()
      };
      const onlineUuidOn = document.getElementById('mkOnlineUuid').checked;
      const onlineTexOn = document.getElementById('mkOnlineTex').checked;
      const promptBase = document.getElementById('mkPrompt').value.trim() || (cfg.name + ' ' + cfg.pattern + ' minecraft texture');
      if (onlineUuidOn) {
        const uuids = [];
        for (let i = 0; i < 5; i++) {
          let u = null;
          try { u = await onlineUuid(); } catch (e) { }
          uuids.push(u || uuid());
        }
        cfg.uuids = uuids;
        log('UUID：已向在线生成器请求，失败项用本地 v4 兜底');
      }
      if (onlineTexOn && (cfg.block || cfg.item || cfg.entity)) {
        const size = cfg.size;
        const tex = {};
        let api = 0, local = 0;
        const getTex = async (p, k) => {
          const r = await apiTexture(p, size, k);
          if (r.source === 'api') api++; else local++;
          return r.data;
        };
        try { tex.block = await getTex(promptBase + ' block', 'block'); } catch (e) { local++; }
        try { tex.item = await getTex(promptBase + ' item icon', 'item'); } catch (e) { local++; }
        if (cfg.entity) { try { tex.entity = await getTex(promptBase + ' ' + cfg.entity + ' skin', 'entity'); } catch (e) { local++; } }
        cfg.tex = tex;
        log('贴图：在线接口 ' + api + ' 张，本地像素图 ' + local + ' 张');
      }
      const out = generateAddon(cfg);
      state.archive = new Archive('zip', out.entries);
      state.texIndex = null; state.texCache = new Map(); state.texPending = new Set(); state.texPacks = [];
      state.statsDirty = true;
      $('modal').style.display = 'none';
      setupArchive('', '');
      log('生成完成：' + out.entries.length + ' 个文件，命名空间 ' + cfg.namespace);
      out.log.forEach(l => log('· ' + l));
      log('点右上角“导出 / 另存”保存为 .mcaddon 即可安装');
    } catch (e) { showError('生成失败：' + e.message); }
    btn.disabled = false; btn.textContent = '生成并打开';
  };
}

// ---- 附加包制作器 / 贴图生成 / 代码高亮（2.5.0）----
function rng(seed) {
  let a = seed >>> 0;
  return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

function hexToRgb(h) {
  const v = h.replace('#', '');
  return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)];
}

function canvasBytes(cv) {
  const b64 = cv.toDataURL('image/png').split(',')[1];
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

// 程序化贴图：16/32/64/128 均可，风格为像素噪点 + 结构线
function drawTexture(cv, size, style, color) {
  cv.width = size; cv.height = size;
  const ctx = cv.getContext('2d');
  const img = ctx.createImageData(size, size);
  const [r0, g0, b0] = hexToRgb(color || '#8a8a8a');
  const rand = rng(style.length * 977 + size * 31 + r0);
  const set = (x, y, r, g, b, a) => {
    const i = (y * size + x) * 4;
    img.data[i] = r; img.data[i + 1] = g; img.data[i + 2] = b; img.data[i + 3] = a === undefined ? 255 : a;
  };
  const clamp = v => Math.max(0, Math.min(255, Math.round(v)));
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let r = r0, g = g0, b = b0;
      if (style === '石头' || style === '石砖') {
        const n = (rand() - 0.5) * 46; r += n; g += n; b += n;
        if (style === '石砖' && ((x % Math.max(4, size / 4)) === 0 || (y % Math.max(4, size / 4)) === 0)) { r -= 40; g -= 40; b -= 40; }
      } else if (style === '泥土') {
        const n = (rand() - 0.5) * 38; r += n; g += n * 0.8; b += n * 0.7;
      } else if (style === '草方块') {
        if (y < size * 0.28) { r = 86 + rand() * 40; g = 150 + rand() * 50; b = 70 + rand() * 30; }
        else { const n = (rand() - 0.5) * 34; r += n; g += n * 0.8; b += n * 0.7; }
      } else if (style === '木头') {
        const wave = Math.sin((x / size) * Math.PI * 6 + rand() * 0.5) * 18;
        r += wave; g += wave * 0.7; b += wave * 0.4;
      } else if (style === '木板') {
        const line = (y % Math.max(4, size / 4) === 0);
        const n = (rand() - 0.5) * 20;
        r += n - (line ? 30 : 0); g += n - (line ? 22 : 0); b += n - (line ? 15 : 0);
      } else if (style === '树叶') {
        const n = rand();
        if (n < 0.18) { r *= 0.6; g *= 0.75; b *= 0.6; } else { r += 20; g += 30; b += 10; }
      } else if (style === '金属') {
        const grad = (y / size) * 60;
        r += grad; g += grad; b += grad;
        if (x === 0 || y === 0) { r += 30; g += 30; b += 30; }
      } else if (style === '羊毛') {
        const n = (rand() - 0.5) * 16; r += n; g += n; b += n;
      } else if (style === '砖块') {
        const bw = Math.max(8, size / 4), bh = Math.max(4, size / 8);
        const row = Math.floor(y / bh);
        const off = (row % 2) * (bw / 2);
        const mortar = ((y % bh) === 0) || (((x + off) % bw) === 0);
        if (mortar) { r = 150; g = 150; b = 150; } else { const n = (rand() - 0.5) * 26; r += n; g += n; b += n; }
      } else if (style === '沙子') {
        const n = (rand() - 0.5) * 30; r += n; g += n * 0.9; b += n * 0.6;
      } else if (style === '水') {
        const w = Math.sin((x / size) * Math.PI * 4 + Math.cos((y / size) * Math.PI * 3)) * 26;
        r += w * 0.3; g += w * 0.6; b += w;
      } else if (style === '玻璃') {
        const edge = x === 0 || y === 0 || x === size - 1 || y === size - 1;
        if (edge) { r = 220; g = 235; b = 245; } else { r = 200; g = 225; b = 240; if (img.data) { } }
      } else if (style === '发光') {
        const p = Math.sqrt(Math.pow(x - size / 2, 2) + Math.pow(y - size / 2, 2)) / (size / 2);
        r *= (1 - p * 0.4) + 0.6; g *= (1 - p * 0.4) + 0.6; b *= (1 - p * 0.4) + 0.6;
      } else {
        const n = (rand() - 0.5) * 12; r += n; g += n; b += n;
      }
      set(x, y, clamp(r), clamp(g), clamp(b), style === '玻璃' && !(x === 0 || y === 0 || x === size - 1 || y === size - 1) ? 210 : 255);
    }
  }
  ctx.putImageData(img, 0, 0);
  return cv;
}

// 实体立绘（正视图），尺寸 64 或 128，不是官方 UV 皮肤
function drawEntityPortrait(cv, size, color) {
  cv.width = size; cv.height = size;
  const ctx = cv.getContext('2d');
  const [r, g, b] = hexToRgb(color || '#6aa84f');
  const U = size / 16;
  const rect = (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(x * U, y * U, w * U, h * U); };
  ctx.clearRect(0, 0, size, size);
  rect(5, 2, 6, 5, `rgb(${r},${g},${b})`);            // 头
  rect(6, 4, 1, 1, '#111'); rect(9, 4, 1, 1, '#111'); // 眼
  rect(7, 5.6, 2, 0.8, '#3a2b2b');                     // 嘴
  rect(5.5, 7, 5, 4, `rgb(${Math.max(0, r - 25)},${Math.max(0, g - 20)},${Math.max(0, b - 25)})`); // 身
  rect(4, 7.4, 1.2, 3, `rgb(${r},${g},${b})`);         // 左臂
  rect(10.8, 7.4, 1.2, 3, `rgb(${r},${g},${b})`);      // 右臂
  rect(5.8, 11, 1.6, 3, `rgb(${Math.max(0, r - 40)},${Math.max(0, g - 35)},${Math.max(0, b - 35)})`);
  rect(8.6, 11, 1.6, 3, `rgb(${Math.max(0, r - 40)},${Math.max(0, g - 35)},${Math.max(0, b - 35)})`);
  return cv;
}

// 在线 UUID：多个接口尝试，失败回退本地 v4
async function makeUuid() {
  const urls = ['https://www.uuidgenerator.net/api/version4', 'https://api.uuid4.org/v4', 'https://uuidgen.org/api/v4'];
  for (const u of urls) {
    try {
      const res = await fetch(u, { method: 'GET' });
      if (!res.ok) continue;
      const txt = (await res.text()).trim();
      const m = txt.match(/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i);
      if (m) return { uuid: m[0].toLowerCase(), online: true };
    } catch (e) { /* 下一个 */ }
  }
  if (crypto && crypto.randomUUID) return { uuid: crypto.randomUUID(), online: false };
  let out = '';
  const hex = '0123456789abcdef';
  for (let i = 0; i < 36; i++) out += i === 8 || i === 13 || i === 18 || i === 23 ? '-' : (i === 14 ? '4' : hex[Math.floor(Math.random() * 16)]);
  return { uuid: out, online: false };
}

function openPackStudio() {
  const body = $('modalBody');
  body.innerHTML = `<h3>附加包生成器</h3>
    <label>包名称</label><input id="crName" value="我的附加包">
    <label>描述</label><input id="crDesc" value="由 MCBE 工具箱生成">
    <label>包类型</label><select id="crType"><option value="both">行为包 + 资源包</option><option value="bp">仅行为包</option><option value="rp">仅资源包</option></select>
    <label>脚本语言</label><select id="crLang"><option value="js">JavaScript（游戏原生 ScriptAPI）</option><option value="ts">TypeScript</option><option value="py">Python（配套工具脚本）</option><option value="lua">Lua（配套工具脚本）</option><option value="mcfunction">mcfunction</option></select>
    <label>主题色</label><input id="crColor" type="color" value="#3b82f6">
    <div class="edbar"><button id="crGo">生成并打开</button><button id="crGoExport">生成并导出 .mcaddon</button><button id="crCancel" class="ghost">取消</button></div>
    <p class="muted">UUID 优先调用在线接口，网络不通时自动用本机随机 v4，生成结果不受影响。</p>`;
  $('modal').style.display = 'flex';
  document.getElementById('crCancel').onclick = () => { $('modal').style.display = 'none'; };
  const build = async () => {
    const name = document.getElementById('crName').value.trim() || '我的附加包';
    const desc = document.getElementById('crDesc').value.trim();
    const type = document.getElementById('crType').value;
    const lang = document.getElementById('crLang').value;
    const color = document.getElementById('crColor').value;
    const slug = (name.replace(/[^A-Za-z0-9_\u4e00-\u9fa5]+/g, '_').slice(0, 20) || 'pack') + '_' + Math.random().toString(36).slice(2, 6);
    log('生成附加包：' + name + '（' + lang + '）');
    const ids = [];
    for (let i = 0; i < 5; i++) ids.push(await makeUuid());
    log('UUID：' + ids.map(x => x.uuid.slice(0, 8) + '…').join(' / ') + (ids[0].online ? '（在线接口）' : '（离线随机）'));
    const entries = [];
    const bp = 'behavior_packs/' + slug, rp = 'resource_packs/' + slug;
    const files = { bp: [], rp: [] };
    const icon = document.createElement('canvas');
    drawTexture(icon, 64, '发光', color);
    const iconU8 = canvasBytes(icon);
    const scriptName = { js: 'scripts/main.js', ts: 'scripts/main.ts', py: 'tools/generate.py', lua: 'tools/generate.lua', mcfunction: 'functions/main.mcfunction' }[lang];
    if (type !== 'rp') {
      const manifest = {
        format_version: 2,
        header: { name, description: desc, uuid: ids[0].uuid, version: [1, 0, 0], min_engine_version: [1, 21, 0] },
        modules: [],
      };
      if (lang === 'js' || lang === 'ts') {
        manifest.modules.push({ type: 'data', uuid: ids[1].uuid, version: [1, 0, 0] });
        manifest.modules.push({ type: 'script', language: lang === 'ts' ? 'javascript' : 'javascript', entry: 'scripts/main.js', uuid: ids[2].uuid, version: [1, 0, 0] });
        manifest.dependencies = [{ module_name: '@minecraft/server', version: '1.17.0' }];
      } else {
        manifest.modules.push({ type: 'data', uuid: ids[1].uuid, version: [1, 0, 0] });
      }
      files.bp.push({ path: bp + '/manifest.json', data: new TextEncoder().encode(JSON.stringify(manifest, null, 2)) });
      files.bp.push({ path: bp + '/pack_icon.png', data: iconU8 });
      files.bp.push({ path: bp + '/texts/zh_CN.lang', data: new TextEncoder().encode('pack.name=' + name + '\npack.description=' + desc + '\n') });
      files.bp.push({ path: bp + '/texts/en_US.lang', data: new TextEncoder().encode('pack.name=' + name + '\npack.description=' + desc + '\n') });
      if (lang === 'js') {
        files.bp.push({ path: bp + '/scripts/main.js', data: new TextEncoder().encode(
`import { world, system } from '@minecraft/server';

// 自动生成：玩家进服欢迎 + 每秒报时
world.afterEvents.playerSpawn.subscribe((ev) => {
  if (!ev.initialSpawn) return;
  ev.player.sendMessage('§a欢迎来到服务器！');
});

let ticks = 0;
system.runInterval(() => {
  ticks++;
  if (ticks % 20 !== 0) return;
  const players = world.getAllPlayers();
  for (const p of players) p.onScreenDisplay.setActionBar('§e在线 ' + players.length + ' 人');
}, 1);
`) });
      } else if (lang === 'ts') {
        files.bp.push({ path: bp + '/scripts/main.js', data: new TextEncoder().encode(`import { world } from '@minecraft/server';
world.afterEvents.playerSpawn.subscribe((ev) => { if (ev.initialSpawn) ev.player.sendMessage('你好'); });
`) });
        files.bp.push({ path: bp + '/scripts/main.ts', data: new TextEncoder().encode(`import { world, PlayerSpawnAfterEvent } from '@minecraft/server';
world.afterEvents.playerSpawn.subscribe((ev: PlayerSpawnAfterEvent): void => { if (ev.initialSpawn) ev.player.sendMessage('你好'); });
`) });
      } else if (lang === 'py') {
        files.bp.push({ path: bp + '/tools/generate.py', data: new TextEncoder().encode(`# 配套工具脚本（游戏不执行 Python，仅用于批量生成/检查）
import json, pathlib
root = pathlib.Path(__file__).resolve().parents[1]
print('包目录:', root)
# 示例：列出所有 JSON
for p in root.rglob('*.json'):
    print(p)
`) });
      } else if (lang === 'lua') {
        files.bp.push({ path: bp + '/tools/generate.lua', data: new TextEncoder().encode(`-- 配套工具脚本（游戏不执行 Lua）
local root = (...):match('(.-)[^/]+$') or './'
print('包目录: ' .. root)
`) });
      } else {
        files.bp.push({ path: bp + '/functions/main.mcfunction', data: new TextEncoder().encode('# 自动生成\nsay 欢迎来到服务器\ntime set day\n') });
      }
    }
    if (type !== 'bp') {
      const manifest = {
        format_version: 2,
        header: { name, description: desc, uuid: ids[type === 'rp' ? 0 : 3].uuid, version: [1, 0, 0], min_engine_version: [1, 21, 0] },
        modules: [{ type: 'resources', uuid: ids[type === 'rp' ? 1 : 4].uuid, version: [1, 0, 0] }],
      };
      files.rp.push({ path: rp + '/manifest.json', data: new TextEncoder().encode(JSON.stringify(manifest, null, 2)) });
      files.rp.push({ path: rp + '/pack_icon.png', data: iconU8 });
      files.rp.push({ path: rp + '/texts/zh_CN.lang', data: new TextEncoder().encode('pack.name=' + name + '\npack.description=' + desc + '\n') });
      const demo = document.createElement('canvas');
      drawTexture(demo, 32, '石头', '#8a8a8a');
      files.rp.push({ path: rp + '/textures/blocks/' + slug + '_stone.png', data: canvasBytes(demo) });
    }
    entries.push(...files.bp, ...files.rp);
    state.archive = new Archive('zip', entries);
    state.texIndex = null; state.texCache = new Map(); state.texPending = new Set(); state.texPacks = [];
    state.name = slug + '.mcaddon';
    $('fileName').textContent = name + '（' + slug + '.mcaddon）';
    setupArchive('', '');
    log('已生成 ' + entries.length + ' 个文件，可直接编辑或导出 .mcaddon');
    return slug;
  };
  document.getElementById('crGo').onclick = async () => {
    try { await build(); $('modal').style.display = 'none'; } catch (e) { showError('生成失败：' + e.message); }
  };
  document.getElementById('crGoExport').onclick = async () => {
    try {
      const slug = await build();
      $('modal').style.display = 'none';
      await saveBytes(slug + '.mcaddon', state.archive.toBytes());
    } catch (e) { showError('生成失败：' + e.message); }
  };
}

function openTextureStudio() {
  const body = $('modalBody');
  body.innerHTML = `<h3>贴图生成器</h3>
    <label>尺寸</label><select id="txSize"><option>16</option><option selected>32</option><option>64</option><option>128</option></select>
    <label>类型</label><select id="txKind"><option value="block">方块贴图</option><option value="item">物品图标</option><option value="entity">实体立绘（非官方 UV）</option></select>
    <label>风格</label><select id="txStyle"><option>石头</option><option>石砖</option><option>泥土</option><option>草方块</option><option>木头</option><option>木板</option><option>树叶</option><option>金属</option><option>羊毛</option><option>砖块</option><option>沙子</option><option>水</option><option>玻璃</option><option>发光</option></select>
    <label>主色</label><input id="txColor" type="color" value="#7d7d7d">
    <canvas id="txPreview" style="width:100%;max-width:220px;image-rendering:pixelated;border-radius:8px;border:1px solid #26313a;margin:8px auto;display:block"></canvas>
    <label>写入包内路径（可选）</label><input id="txPath" placeholder="resource_packs/xxx/textures/blocks/a.png">
    <div class="edbar"><button id="txExport">导出 PNG</button><button id="txWrite">写入当前包</button><button id="txClose" class="ghost">关闭</button></div>`;
  $('modal').style.display = 'flex';
  const cv = document.getElementById('txPreview');
  const render = () => {
    const size = Number(document.getElementById('txSize').value);
    const kind = document.getElementById('txKind').value;
    const style = document.getElementById('txStyle').value;
    const color = document.getElementById('txColor').value;
    if (kind === 'entity') drawEntityPortrait(cv, size, color); else drawTexture(cv, size, style, color);
  };
  ['txSize', 'txKind', 'txStyle', 'txColor'].forEach(id => document.getElementById(id).onchange = render);
  render();
  document.getElementById('txClose').onclick = () => { $('modal').style.display = 'none'; };
  document.getElementById('txExport').onclick = async () => {
    await saveBytes('texture_' + document.getElementById('txSize').value + '_' + Date.now() + '.png', canvasBytes(cv));
  };
  document.getElementById('txWrite').onclick = () => {
    if (!state.archive) return showError('先打开一个包或生成一个包');
    const p = document.getElementById('txPath').value.trim();
    if (!p) return showError('填一个包内路径');
    state.archive.setBytes(p, canvasBytes(cv));
    renderTree();
    log('已写入 ' + p + '（导出后生效）');
  };
}

// ---- 更多工具（2.4.0）----
function openTools() {
  const body = $('modalBody');
  const items = [
    ['搜索文件', '按文件名/路径过滤文件树', toolFileSearch],
    ['搜索内容', '在文本文件里搜关键字（最多 60 条）', toolContentSearch],
    ['复制文件/文件夹', '包内复制到新路径', toolCopy],
    ['批量导出', '按扩展名挑文件打包成 zip', toolBatchExport],
    ['完整性检查', 'manifest / UUID / 路径 / PNG / 贴图引用', toolIntegrity],
    ['一键打包', '自动判断 .mcpack / .mcaddon / .mcworld', toolRepack],
    ['内嵌包浏览', '列出包内 .mcpack/.mcaddon/.zip/.brarchive', toolNested],
    ['JSON 批量美化', '所有 JSON 统一两空格缩进', toolBeautify],
    ['全局文本替换', '跨文件替换并统计次数', toolReplace],
    ['导出全部结构', '把包里所有 .mcstructure 打成 zip', toolExportStructures],
    ['结构转 mcfunction', '当前结构输出 setblock 指令', toolStructMcfunction],
    ['玩家列表', '列出数据库里的玩家键与坐标', toolPlayers],
    ['书内容编辑', '读取玩家背包里的成书，改页面/书名/作者', openBooks],
    ['背包槽位调整', '改物品在背包里的槽位，自动交换不丢物品', openInventorySlots],
    ['新建附加包（制作器）', '从零生成行为包 + 资源包', openMaker],
    ['创作工坊', '按模板往当前包写内容', openStudio],
    ['附加包生成器', '自动生成 manifest / 脚本 / 贴图 / 语言文件', openPackStudio],
    ['贴图生成器', '16/32/64/128 方块、物品、实体立绘', openTextureStudio],
    ['语法模板库', 'JSON / JS / TS / Python 代码片段', toolSnippets],
    ['皮肤制作器', '64×64 手动像素绘制 / 代码生成 / 导出 PNG', () => openSkinStudio('skin')],
    ['披风制作器', '64×32 披风绘制 / 代码生成 / 导出 PNG', () => openSkinStudio('cape')],
    ['Java 存档', '读 .zip/.mca/.nbt，统计、地图、玩家、level.dat', openJavaTools],
    ['Java 模组制作器', '生成 Fabric / Forge / NeoForge 工程（源码+构建脚本）', openJavaModStudio],
    ['存档转换', '基岩版 ⇄ Java 双方向地形转换，不需要 mod', openConverter],
    ['模组转换', '基岩附加包 ⇄ Java 模组工程，贴图/物品/方块/配方', openModConverter],
    ['工具中心', '20 个离线小工具：UUID/清单/贴图/结构/报告', openToolbox],
  ];
  body.innerHTML = '<h3>更多工具</h3><p class="muted">全部离线执行，不改原文件，导出后才会生成新包。</p>' +
    items.map(([t, d], i) => `<button class="toolitem" data-i="${i}"><b>${t}</b><span>${d}</span></button>`).join('') +
    '<div class="modalbtns"><button id="toolsClose" class="ghost">关闭</button></div>';
  $('modal').style.display = 'flex';
  document.getElementById('toolsClose').onclick = () => { $('modal').style.display = 'none'; };
  body.querySelectorAll('.toolitem').forEach(el => {
    el.onclick = () => { $('modal').style.display = 'none'; items[+el.dataset.i][2](); };
  });
}

async function toolFileSearch() {
  const r = await ask('搜索文件', [{ key: 'q', label: '文件名或路径包含', placeholder: '例如 textures 或 stone' }]);
  if (!r || !r.q.trim()) { state.filterQ = null; renderTree(); return; }
  state.filterQ = r.q.trim();
  renderTree();
}

async function toolContentSearch() {
  const r = await ask('搜索内容', [{ key: 'q', label: '要查找的文本', placeholder: '例如 diamond' }]);
  if (!r || !r.q) return;
  const q = r.q, hits = [];
  for (const f of state.archive.files) {
    if (hits.length >= 60) break;
    if (f.data.length > 1024 * 1024) continue;
    if (!isTextFile(f.path, f.data)) continue;
    const text = new TextDecoder('utf-8').decode(f.data);
    const idx = text.indexOf(q);
    if (idx >= 0) {
      const line = text.slice(0, idx).split('\n').length;
      hits.push(f.path + ':' + line + '　' + text.slice(Math.max(0, idx - 30), idx + q.length + 30).replace(/\n/g, ' '));
    }
  }
  showError(hits.length ? '' : '没有找到包含该文本的文件');
  log('内容搜索“' + q + '”：' + hits.length + ' 个文件');
  hits.forEach(h => log('· ' + h));
  $('modalBody').innerHTML = '<h3>搜索结果</h3><pre class="dbpre">' + escapeHtml(hits.join('\n') || '无结果') + '</pre><div class="modalbtns"><button id="toolsClose2" class="ghost">关闭</button></div>';
  $('modal').style.display = 'flex';
  document.getElementById('toolsClose2').onclick = () => { $('modal').style.display = 'none'; };
}

async function toolCopy() {
  if (!state.selected) return showError('先在文件树里选一个文件或文件夹');
  const src = state.selected;
  const isDir = !state.archive.get(src);
  const r = await ask('复制', [{ key: 'to', label: '目标路径', value: src + (isDir ? '_copy' : '_copy' + extOf(src)) }]);
  if (!r || !r.to.trim()) return;
  const to = r.to.trim();
  if (isDir) {
    const pref = src + '/';
    const list = state.archive.files.filter(f => f.path.startsWith(pref));
    list.forEach(f => state.archive.setBytes(to + '/' + f.path.slice(pref.length), f.data));
    log('已复制文件夹 ' + src + ' → ' + to + '（' + list.length + ' 个文件）');
  } else {
    state.archive.setBytes(to, state.archive.getBytes(src));
    log('已复制 ' + src + ' → ' + to);
  }
  renderTree();
}

async function toolBatchExport() {
  const r = await ask('批量导出', [{ key: 'ext', label: '扩展名（空=全部带后缀的文件）', placeholder: '.json' }]);
  if (!r) return;
  const ext = r.ext.trim().toLowerCase();
  const list = state.archive.files.filter(f => !ext || f.path.toLowerCase().endsWith(ext));
  if (!list.length) return showError('没有匹配的文件');
  const bytes = new Archive('zip', list.map(f => ({ path: f.path, data: f.data }))).toBytes();
  await saveBytes('批量导出_' + (ext.replace('.', '') || 'all') + '.zip', bytes);
  log('已打包导出 ' + list.length + ' 个文件');
}

async function toolIntegrity() {
  const problems = [];
  const paths = state.archive.paths();
  const lower = new Map();
  for (const p of paths) {
    if (p.includes('\\')) problems.push('反斜杠路径：' + p);
    if (p.startsWith('/') || p.includes('../')) problems.push('非法路径：' + p);
    const k = p.toLowerCase();
    if (lower.has(k)) problems.push('大小写重复：' + p + ' ↔ ' + lower.get(k));
    else lower.set(k, p);
  }
  const uuids = new Map();
  for (const p of paths.filter(p => /manifest\.json$/i.test(p))) {
    try {
      const j = JSON.parse(state.archive.getText(p));
      const h = j.header || {};
      for (const key of ['uuid', 'name', 'version', 'description']) if (!h[key]) problems.push(p + ' 缺 header.' + key);
      if (h.uuid) { if (uuids.has(h.uuid)) problems.push('UUID 重复：' + p + ' ↔ ' + uuids.get(h.uuid)); else uuids.set(h.uuid, p); }
      (j.dependencies || []).forEach(d => { if (!d.uuid) problems.push(p + ' 依赖项缺 uuid'); });
    } catch (e) { problems.push(p + ' JSON 解析失败：' + e.message); }
  }
  for (const p of paths.filter(p => /\.png$/i.test(p))) {
    const b = state.archive.getBytes(p);
    if (b.length < 8 || b[0] !== 0x89 || b[1] !== 0x50) problems.push('PNG 头损坏：' + p);
  }
  for (const p of paths.filter(p => /terrain_texture\.json$/i.test(p))) {
    try {
      const j = parseJsonLoose(state.archive.getText(p));
      const base = p.slice(0, p.lastIndexOf('/')).replace(/\/textures$/, '');
      for (const [name, v] of Object.entries(j.texture_data || {})) {
        let t = Array.isArray(v.textures) ? v.textures[0] : v.textures;
        if (t && typeof t === 'object') t = t.path || t.texture;
        if (typeof t !== 'string') continue;
        const want = (base + '/textures/' + t.replace(/^textures\//, '') + '.png').toLowerCase();
        if (!paths.some(x => x.toLowerCase() === want)) problems.push('贴图缺失：' + name + ' → ' + want);
      }
    } catch (e) { problems.push(p + ' 材质清单解析失败：' + e.message); }
  }
  for (const f of state.archive.files) if (f.data.length === 0) problems.push('空文件：' + f.path);
  $('modalBody').innerHTML = '<h3>完整性检查</h3><p class="muted">文件 ' + paths.length + ' 个，问题 ' + problems.length + ' 条</p><pre class="dbpre">' + escapeHtml(problems.slice(0, 200).join('\n') || '没有发现问题') + '</pre><div class="modalbtns"><button id="toolsClose3" class="ghost">关闭</button></div>';
  $('modal').style.display = 'flex';
  document.getElementById('toolsClose3').onclick = () => { $('modal').style.display = 'none'; };
  log('完整性检查：' + problems.length + ' 个问题');
}

async function toolRepack() {
  const paths = state.archive.paths();
  const hasB = paths.some(p => /^behavior_packs\//.test(p)) || paths.some(p => p.includes('behavior_pack'));
  const hasR = paths.some(p => /^resource_packs\//.test(p)) || paths.some(p => p.includes('resource_pack'));
  const isWorld = paths.includes('level.dat');
  const ext = isWorld ? '.mcworld' : (hasB && hasR ? '.mcaddon' : '.mcpack');
  const base = (state.name || 'pack').replace(/\.(mcpack|mcaddon|mcworld|mctemplate|zip|brarchive)$/i, '');
  await saveBytes(base + '_repack' + ext, state.archive.toBytes());
  log('已按内容打包为 ' + ext);
}

async function toolNested() {
  const list = state.archive.files.filter(f => /\.(mcpack|mcaddon|mcworld|mctemplate|zip|brarchive)$/i.test(f.path));
  if (!list.length) return showError('包里没有内嵌的包文件');
  $('modalBody').innerHTML = '<h3>内嵌包</h3>' + list.map((f, i) => '<button class="toolitem" data-i="' + i + '"><b>' + escapeHtml(f.path) + '</b><span>' + sizeTag(f.data.length) + '</span></button>').join('') + '<div class="modalbtns"><button id="toolsClose4" class="ghost">关闭</button></div>';
  $('modal').style.display = 'flex';
  document.getElementById('toolsClose4').onclick = () => { $('modal').style.display = 'none'; };
  $('modalBody').querySelectorAll('.toolitem').forEach(el => {
    el.onclick = () => {
      $('modal').style.display = 'none';
      try {
        state.archive = Archive.fromBytes(list[+el.dataset.i].path, list[+el.dataset.i].data);
        state.texIndex = null; state.texCache = new Map(); state.texPending = new Set(); state.texPacks = [];
        setupArchive('', '');
        log('已打开内嵌包：' + list[+el.dataset.i].path);
      } catch (e) { showError(e.message); }
    };
  });
}

async function toolBeautify() {
  let n = 0, fail = 0;
  for (const f of state.archive.files.filter(f => /\.json$/i.test(f.path) && f.data.length < 2 * 1024 * 1024)) {
    try { f.data = new TextEncoder().encode(JSON.stringify(parseJsonLoose(new TextDecoder('utf-8').decode(f.data)), null, 2)); n++; }
    catch (e) { fail++; }
  }
  state.statsDirty = true;
  renderTree();
  log('JSON 美化：' + n + ' 个成功，' + fail + ' 个跳过');
}

async function toolReplace() {
  const r = await ask('全局文本替换', [
    { key: 'from', label: '查找' },
    { key: 'to', label: '替换为' },
    { key: 'ext', label: '限定扩展名（可空）', value: '.json' },
  ]);
  if (!r || !r.from) return;
  const ext = r.ext.trim().toLowerCase();
  let files = 0, count = 0;
  for (const f of state.archive.files) {
    if (ext && !f.path.toLowerCase().endsWith(ext)) continue;
    if (f.data.length > 2 * 1024 * 1024 || !isTextFile(f.path, f.data)) continue;
    const text = new TextDecoder('utf-8').decode(f.data);
    if (!text.includes(r.from)) continue;
    const parts = text.split(r.from);
    count += parts.length - 1; files++;
    f.data = new TextEncoder().encode(parts.join(r.to));
  }
  state.statsDirty = true;
  renderTree();
  log('替换完成：' + files + ' 个文件，共 ' + count + ' 处');
}

async function toolExportStructures() {
  const list = state.archive.files.filter(f => /\.mcstructure$/i.test(f.path));
  if (!list.length) return showError('包里没有 .mcstructure');
  const bytes = new Archive('zip', list.map(f => ({ path: f.path, data: f.data }))).toBytes();
  await saveBytes('structures_' + list.length + '.zip', bytes);
  log('已导出 ' + list.length + ' 个结构文件');
}

async function toolStructMcfunction() {
  if (!state.structure) return showError('先在文件树里打开一个 .mcstructure');
  const s = state.structure, [sx, sy, sz] = s.size;
  const lines = ['# 由 MCBE 工具箱按结构生成', '# 尺寸 ' + sx + '×' + sy + '×' + sz];
  for (let x = 0; x < sx; x++) for (let y = 0; y < sy; y++) for (let z = 0; z < sz; z++) {
    if (lines.length > 120000) break;
    const idx = (s.indices[0] || [])[(x * sz + z) * sy + y];
    if (idx < 0 || idx === undefined) continue;
    const b = s.palette[idx];
    if (!b) continue;
    lines.push('setblock ' + x + ' ' + y + ' ' + z + ' ' + b.name);
  }
  await saveBytes((state.name || 'structure').replace(/\.[^.]+$/, '') + '.mcfunction', new TextEncoder().encode(lines.join('\n')));
  log('已生成 mcfunction：' + lines.length + ' 行');
}

async function toolPlayers() {
  if (!state.db) state.db = await window.MCBE.readLevelDb(await dbFiles(), {});
  const rows = [];
  for (const [k, kv] of state.db) {
    if (!k.includes('player') && k[0] !== '~') continue;
    let pos = '-';
    try { const ps = playerSummary(kv.value); if (ps.pos) pos = ps.pos.map(v => v.toFixed(1)).join(', '); } catch (e) { }
    rows.push(k + '　坐标 ' + pos);
  }
  $('modalBody').innerHTML = '<h3>玩家数据</h3><pre class="dbpre">' + escapeHtml(rows.join('\n') || '没有找到玩家键') + '</pre><div class="modalbtns"><button id="toolsClose5" class="ghost">关闭</button></div>';
  $('modal').style.display = 'flex';
  document.getElementById('toolsClose5').onclick = () => { $('modal').style.display = 'none'; };
}

async function toolSnippets() {
  const list = SNIPPETS;
  $('modalBody').innerHTML = '<h3>语法模板库</h3><p class="muted">JSON / JS 是基岩版能执行的；TS 需自行编译；Python 游戏不执行，仅作参考。</p>' +
    list.map((s, i) => `<button class="toolitem" data-i="${i}"><b>[${s.lang}] ${s.title}</b><span>点击查看代码</span></button>`).join('') +
    '<div class="modalbtns"><button id="snClose" class="ghost">关闭</button></div>';
  $('modal').style.display = 'flex';
  document.getElementById('snClose').onclick = () => { $('modal').style.display = 'none'; };
  $('modalBody').querySelectorAll('.toolitem').forEach(el => {
    el.onclick = () => {
      const s = list[+el.dataset.i];
      $('modalBody').innerHTML = '<h3>' + s.title + '（' + s.lang + '）</h3><pre class="dbpre">' + escapeHtml(s.code) + '</pre><div class="modalbtns"><button id="snSave">保存为文件</button><button id="snBack" class="ghost">返回列表</button></div>';
      document.getElementById('snBack').onclick = toolSnippets;
      document.getElementById('snSave').onclick = async () => {
        const ext = { JSON: '.json', JS: '.js', TS: '.ts', PY: '.py' }[s.lang] || '.txt';
        await saveBytes('模板_' + s.title.replace(/[^0-9A-Za-z\u4e00-\u9fa5]+/g, '_') + ext, new TextEncoder().encode(s.code));
      };
    };
  });
}

function openStudio() {
  $('modalBody').innerHTML = `<h3>附加包制作器</h3><p class="muted">贴图、脚本、清单、语言文件一次生成，导出即 .mcaddon。</p>
    <button class="toolitem" id="stPack"><b>新建附加包</b><span>行为包/资源包、manifest、UUID、脚本骨架、包图标</span></button>
    <button class="toolitem" id="stTex"><b>贴图生成器</b><span>16/32/64/128，方块/物品/实体立绘</span></button>
    <button class="toolitem" id="stSnip"><b>语法模板库</b><span>JSON / JS / TS / Python / Lua / mcfunction 片段</span></button>
    <div class="modalbtns"><button id="stClose" class="ghost">关闭</button></div>`;
  $('modal').style.display = 'flex';
  document.getElementById('stClose').onclick = () => { $('modal').style.display = 'none'; };
      $('modalBody').querySelectorAll('.slotrow').forEach((el, idx) => {
        el.onclick = () => showStructurePreview(marks[idx]);
      });
  document.getElementById('stPack').onclick = openPackStudio;
  document.getElementById('stTex').onclick = openTextureStudio;
  document.getElementById('stSnip').onclick = toolSnippets;
}

// ---- 初始化 ----
function init() {
  initDisplay();
  initShortcuts();
  initSfx();
  window.onerror = (m) => showError('脚本错误：' + m);
  $('btnLocalize').addEventListener('click', runLocalize);
  $('btnNameFix').addEventListener('click', openNameFix);
  $('btnTools').addEventListener('click', openTools);
  window.addEventListener('mcShortcut', (e) => {
    if (e.detail === 'search') toolFileSearch();
    else if (e.detail === 'contentSearch') toolContentSearch();
  });
  $('btnMaker').addEventListener('click', openMaker);
  $('btnCreator').addEventListener('click', openStudio);
  syncNewButtons();
  $('btnMap').addEventListener('click', runMap);
  $('btnPlayer').addEventListener('click', runPlayer);
  $('fileInput').addEventListener('change', async () => {
    const input = $('fileInput');
    const fs = [...input.files];
    input.value = '';               // 允许再次选择同一个文件
    if (!fs.length) return;
    if (fs.length === 1) return openFile(fs[0]);
    await openMultiple(fs);
  });
  $('pickBtn').onclick = () => $('fileInput').click();
  $('btnRename').onclick = renameSelected;
  $('btnDelete').onclick = deleteSelected;
  $('btnNewFile').onclick = newFile;
  $('btnNewFolder').onclick = newFolder;
  $('btnExport').onclick = exportArchive;
  $('btnStats').onclick = runStats;
  $('modal').addEventListener('click', (e) => { if (e.target.id === 'modal') $('modal').style.display = 'none'; });
  log('就绪：选择 .mcpack / .mcaddon / .mcworld / .mctemplate / .brarchive / .mcstructure。');
}
init();
window.__openFile = openFile;
window.__state = state;
