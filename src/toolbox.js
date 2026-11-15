// 5.0.0 工具中心：20 个离线小工具
import { parseZip, buildZip } from './zip.js';
import { ungzip, gzip } from 'pako';
import { parseJavaNbt, writeJavaNbt, analyzeJavaZip, javaSurface } from './java.js';
import { B2J, J2B } from './converter.js';
import { writeNBT } from './nbt.js';
import { SHORTCUTS } from './shortcuts.js';
import { renderStructure3D } from './struct3d.js';

const $ = (id) => document.getElementById(id);
const enc = (s) => new TextEncoder().encode(s);
const dec = (u) => new TextDecoder().decode(u);
const J = (o) => JSON.stringify(o, null, 2);

function openPanel(title, html, setup) {
  const body = $('modalBody');
  body.innerHTML = `<h3>${title}</h3>${html}<div class="skbar"><button id="tbClose" class="ghost">关闭</button></div>`;
  $('modal').style.display = 'flex';
  const box = document.querySelector('.modalbox');
  if (box) { box.style.maxWidth = '760px'; box.style.width = '96vw'; }
  const close = () => { if (box) { box.style.maxWidth = ''; box.style.width = ''; } $('modal').style.display = 'none'; };
  $('tbClose').onclick = close;
  if (setup) setup(close);
  return close;
}

function saveBytes(name, bytes) {
  if (window.AndroidBridge && window.AndroidBridge.saveBinary) {
    let s = '';
    const CH = 0x8000;
    for (let i = 0; i < bytes.length; i += CH) s += String.fromCharCode.apply(null, bytes.subarray(i, i + CH));
    window.AndroidBridge.saveBinary(name, btoa(s));
  } else {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([bytes])); a.download = name; a.click();
  }
}
function pickBytes(accept) {
  return new Promise((res, rej) => {
    const inp = document.createElement('input');
    inp.type = 'file'; inp.accept = accept; inp.multiple = true;
    inp.onchange = async () => {
      const fs = [...inp.files]; if (!fs.length) return rej(new Error('未选择文件'));
      const out = []; for (const f of fs) out.push({ name: f.name, bytes: new Uint8Array(await f.arrayBuffer()) });
      res(out);
    };
    inp.click();
  });
}

function uuid4() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 3 | 8)).toString(16); });
}

// 1 UUID
export function toolUuid() {
  openPanel('UUID 生成器', `<div class="skbar"><button id="uNew" class="primary">生成</button><input id="uVal" style="flex:1;min-width:200px" value="${uuid4()}"></div>
    <p class="muted">离线生成 v4 UUID，用于 manifest 的 header/module/dependency。</p><div id="uList" class="code" style="padding:8px;max-height:30vh;overflow:auto"></div>`, () => {
    const add = () => { $('uList').textContent = [...($('uList').textContent || '').split('\n'), $('uVal').value].filter(Boolean).join('\n'); };
    $('uNew').onclick = () => { $('uVal').value = uuid4(); };
    add(); $('uVal').onclick = () => { $('uVal').select(); };
  });
}

// 2 manifest
export function toolManifest() {
  openPanel('manifest 生成器', `<div class="form2">
    <label>包名<input id="mName" value="My Addon"></label>
    <label>类型<select id="mType"><option value="both">行为+资源</option><option value="data">仅行为</option><option value="resources">仅资源</option></select></label>
    <label>版本<input id="mVer" value="1.0.0"></label>
    <label>最低引擎<input id="mMin" value="1.20.10"></label>
    <label>BP UUID<input id="mBp" value="${uuid4()}"></label>
    <label>RP UUID<input id="mRp" value="${uuid4()}"></label>
  </div><div class="skbar"><button id="mGen" class="primary">生成 ZIP</button></div><div id="mMsg" class="muted"></div>`, () => {
    $('mGen').onclick = () => {
      const type = $('mType').value, ver = $('mVer').value.split('.').map(Number), min = $('mMin').value.split('.').map(Number);
      const files = {};
      const mk = (tp, uuid, name) => ({ format_version: 2, header: { name, description: '', uuid, version: ver, min_engine_version: min }, modules: [{ type: tp, uuid: uuid4(), version: ver }] });
      if (type !== 'resources') files['behavior_pack/manifest.json'] = enc(J(mk('data', $('mBp').value, $('mName').value + ' BP')));
      if (type !== 'data') files['resource_pack/manifest.json'] = enc(J(mk('resources', $('mRp').value, $('mName').value + ' RP')));
      saveBytes('manifest.zip', buildZip(Object.entries(files).map(([name, data]) => ({ name, data }))));
      $('mMsg').textContent = '已导出 manifest.zip';
    };
  });
}

// 3 名称映射
export function toolLookup() {
  const rows = Object.entries(B2J).map(([b, j]) => ({ b, j }));
  openPanel('方块名称对照', `<input id="lkQ" placeholder="输入 BE 或 JE 名称，如 stone / 草" style="width:100%">
    <div id="lkOut" class="code" style="margin-top:8px;padding:8px;max-height:46vh;overflow:auto"></div>`, () => {
    const draw = () => {
      const q = $('lkQ').value.trim().toLowerCase();
      const list = rows.filter(r => !q || r.b.includes(q) || r.j.includes(q));
      $('lkOut').innerHTML = list.slice(0, 300).map(r => `<div class="nbtrow"><code>${r.b}</code><span>→</span><code>${r.j}</code></div>`).join('') || '<p class="muted">没有匹配项</p>';
    };
    $('lkQ').oninput = draw; draw();
  });
}

// 4 语言对比
export function toolLang() {
  openPanel('语言文件对比补键', `<p class="muted">选择基准语言与目标语言（.json 或 .lang），输出缺失键清单和补全后的目标文件。</p>
    <div class="skbar"><button id="lgBase" class="ghost">选基准</button><button id="lgTarget" class="ghost">选目标</button><button id="lgRun" class="primary">对比</button></div>
    <div id="lgOut"></div>`, () => {
    let base = null, target = null; const parse = (n, b) => { const t = dec(b); if (n.endsWith('.json')) { try { return JSON.parse(t); } catch { return {}; } } const o = {}; for (const l of t.split(/\r?\n/)) { const m = l.match(/^([^=]+)=(.*)$/); if (m) o[m[1].trim()] = m[2]; } return o; };
    $('lgBase').onclick = async () => { const r = await pickBytes('.json,.lang'); base = { name: r[0].name, data: parse(r[0].name, r[0].bytes) }; $('lgOut').textContent = '基准：' + base.name; };
    $('lgTarget').onclick = async () => { const r = await pickBytes('.json,.lang'); target = { name: r[0].name, data: parse(r[0].name, r[0].bytes) }; $('lgOut').textContent = '目标：' + target.name; };
    $('lgRun').onclick = () => {
      if (!base || !target) return $('lgOut').textContent = '先选两个文件';
      const missing = Object.keys(base.data).filter(k => !(k in target.data));
      const extra = Object.keys(target.data).filter(k => !(k in base.data));
      $('lgOut').innerHTML = `<p>缺失 ${missing.length} 条，多余 ${extra.length} 条</p><pre class="code" style="max-height:32vh;overflow:auto">${missing.join('\n')}</pre>
        <div class="skbar"><button id="lgSave" class="primary">导出补全文件</button></div>`;
      $('lgSave').onclick = () => {
        const merged = { ...target.data };
        for (const k of missing) merged[k] = base.data[k];
        const name = target.name.endsWith('.json') ? 'merged.json' : 'merged.lang';
        const text = name.endsWith('.json') ? J(merged) : Object.entries(merged).map(([k, v]) => `${k}=${v}`).join('\n');
        saveBytes(name, enc(text));
      };
    };
  });
}

// 5 PNG 检查
export function toolPngCheck() {
  openPanel('贴图尺寸检查', `<p class="muted">批量选 PNG，读 IHDR 检查尺寸/位深/颜色类型，标出非 2 的幂与超大图。</p>
    <div class="skbar"><button id="pcPick" class="primary">选择 PNG</button></div><div id="pcOut" class="code" style="max-height:46vh;overflow:auto;padding:8px"></div>`, () => {
    $('pcPick').onclick = async () => {
      const files = await pickBytes('.png');
      const rows = files.map(f => {
        const b = f.bytes; let w = 0, h = 0, depth = 0, ct = 0;
        if (b.length >= 29 && b[0] === 137 && b[1] === 80) { const dv = new DataView(b.buffer, b.byteOffset, b.byteLength); w = dv.getUint32(16); h = dv.getUint32(20); depth = b[24]; ct = b[25]; }
        const pow = (n) => n > 0 && (n & (n - 1)) === 0;
        return { name: f.name, w, h, depth, ct, bad: !pow(w) || !pow(h) || w > 1024 || h > 1024 };
      });
      $('pcOut').innerHTML = rows.map(r => `<div class="nbtrow"><code>${r.name}</code><span>${r.w}×${r.h} ${r.depth}bit ct=${r.ct}</span><b style="color:${r.bad ? '#ff8a8a' : '#7ddc9a'}">${r.bad ? '异常' : '正常'}</b></div>`).join('');
    };
  });
}

// 6 图片转 PNG / 缩放
export function toolImgConvert() {
  openPanel('图片转 PNG', `<div class="form2"><label>目标边长（像素）<input id="icSize" type="number" value="64"></label>
    <label>缩放算法<select id="icSmooth"><option value="false">最近邻（像素画）</option><option value="true">平滑</option></select></label></div>
    <div class="skbar"><button id="icPick" class="primary">选择图片</button></div><div id="icOut" class="muted"></div>`, () => {
    $('icPick').onclick = async () => {
      const files = await pickBytes('image/*');
      const size = Math.max(1, Math.min(2048, Number($('icSize').value) || 64));
      for (const f of files) {
        const bmp = await createImageBitmap(new Blob([f.bytes]));
        const cv = document.createElement('canvas');
        cv.width = size; cv.height = size;
        const g = cv.getContext('2d');
        g.imageSmoothingEnabled = $('icSmooth').value === 'true';
        g.drawImage(bmp, 0, 0, size, size);
        const blob = await new Promise(r => cv.toBlob(r, 'image/png'));
        saveBytes(f.name.replace(/\.\w+$/, '') + '_' + size + '.png', new Uint8Array(await blob.arrayBuffer()));
      }
      $('icOut').textContent = `已转换 ${files.length} 张`;
    };
  });
}

// 7 文本批量替换
export function toolReplace() {
  openPanel('包内文本批量替换', `<p class="muted">对 .json/.js/.lang/.txt/.mcfunction 等文本文件做批量替换，输出新 ZIP。</p>
    <div class="form2"><label>查找<input id="rpFind"></label><label>替换为<input id="rpRep"></label></div>
    <div class="skbar"><button id="rpPick" class="primary">选择 ZIP 并执行</button></div><div id="rpOut" class="muted"></div>`, () => {
    $('rpPick').onclick = async () => {
      const find = $('rpFind').value, rep = $('rpRep').value;
      if (!find) return $('rpOut').textContent = '请输入查找内容';
      const [f] = await pickBytes('.zip,.mcpack,.mcaddon,.mcworld,.mctemplate,.jar');
      const z = parseZip(f.bytes);
      let n = 0;
      const out = z.entries.map(e => {
        let data = z.read(e);
        if (/\.(json|js|lang|txt|mcfunction|md|yml|yaml|toml|properties)$/i.test(e.name)) {
          const t = dec(data); if (t.includes(find)) { n += t.split(find).length - 1; data = enc(t.split(find).join(rep)); }
        }
        return { name: e.name, data };
      });
      saveBytes(f.name.replace(/\.\w+$/, '') + '_替换.zip', buildZip(out));
      $('rpOut').textContent = `替换 ${n} 处，已导出`;
    };
  });
}

// 8 十六进制
export function toolHex() {
  openPanel('十六进制查看', `<div class="skbar"><button id="hxPick" class="primary">选择文件</button><label>偏移<input id="hxOff" type="number" value="0" style="width:110px"></label><button id="hxGo" class="ghost">跳转</button></div>
    <pre id="hxOut" class="code" style="max-height:48vh;overflow:auto;padding:8px"></pre>`, () => {
    let bytes = null;
    const draw = () => {
      if (!bytes) return;
      const off = Math.max(0, Math.min(bytes.length - 1, Number($('hxOff').value) || 0));
      const lines = [];
      for (let i = off; i < Math.min(bytes.length, off + 512); i += 16) {
        const row = bytes.subarray(i, i + 16);
        const hex = [...row].map(b => b.toString(16).padStart(2, '0')).join(' ');
        const asc = [...row].map(b => (b >= 32 && b < 127 ? String.fromCharCode(b) : '.')).join('');
        lines.push(`${i.toString(16).padStart(8, '0')}  ${hex.padEnd(48)}  ${asc}`);
      }
      $('hxOut').textContent = lines.join('\n');
    };
    $('hxPick').onclick = async () => { const [f] = await pickBytes('*/*'); bytes = f.bytes; $('hxOut').textContent = `${f.name}  ${bytes.length} 字节`; $('hxOff').value = 0; draw(); };
    $('hxGo').onclick = draw;
  });
}

// 9 Java 结构 → mcstructure
export function toolNbtToMcstructure() {
  openPanel('结构转 .mcstructure', `<p class="muted">Java .nbt 结构 → 基岩版 .mcstructure（无压缩 LE NBT），可在结构方块里导入。</p>
    <div class="skbar"><button id="msPick" class="primary">选择 .nbt</button></div><div id="msOut" class="muted"></div>`, () => {
    $('msPick').onclick = async () => {
      const [f] = await pickBytes('.nbt');
      let nbt; try { nbt = parseJavaNbt(ungzip(f.bytes)); } catch { nbt = parseJavaNbt(f.bytes); }
      const root = nbt.data;
      const size = root.size ? root.size.value : [1, 1, 1];
      const pal = root.palette ? root.palette.value.items.map(p => ({ Name: p.Name.value, Properties: p.Properties ? p.Properties.value : {} })) : [];
      const blocks = root.blocks ? root.blocks.value.items.map(b => ({ pos: b.pos.value, state: b.state.value })) : [];
      const [sx, sy, sz] = size;
      const total = sx * sy * sz;
      const idx = new Int32Array(total).fill(-1);
      for (const b of blocks) {
        const [x, y, z] = b.pos;
        idx[x + z * sx + y * sx * sz] = b.state;
      }
      const bedPal = pal.map(p => ({
        name: p.Name,
        states: Object.fromEntries(Object.entries(p.Properties).map(([k, v]) => [k, v.value ?? v])),
        version: 17959425,
      }));
      const bp = []; for (let i = 0; i < total; i++) bp.push(idx[i] < 0 ? 0 : idx[i] + 1);
      const structure = {
        format_version: { t: 3, v: 1 },
        size: { t: 9, et: 3, v: size.map(v => ({ t: 3, v })) },
        structure: { t: 10, v: {
          block_indices: { t: 9, et: 9, v: [
            { t: 9, et: 3, v: bp.map(v => ({ t: 3, v })) },
            { t: 9, et: 3, v: new Array(total).fill({ t: 3, v: -1 }) },
          ] },
          palette: { t: 10, v: { default: { t: 10, v: { block_palette: { t: 9, et: 10, v: bedPal.map(p => ({ t: 10, v: { name: { t: 8, v: p.name }, states: { t: 10, v: {} }, version: { t: 3, v: p.version } } })) }, block_position_data: { t: 10, v: {} } } } } },
        } },
      };
      const out = writeNBT({ root: { type: 10, name: '', value: structure } }, true);
      saveBytes(f.name.replace(/\.nbt$/, '.mcstructure'), out);
      $('msOut').textContent = `已转换 ${blocks.length} 方块，尺寸 ${size.join('×')}`;
    };
  });
}

// 10 region 裁剪
export function toolRegionCrop() {
  openPanel('Region 区块裁剪', `<p class="muted">只保留指定 X/Z 范围内的区块，输出新的 .mca。</p>
    <div class="form2"><label>最小 X<input id="rcX0" type="number" value="0"></label><label>最大 X<input id="rcX1" type="number" value="511"></label>
    <label>最小 Z<input id="rcZ0" type="number" value="0"></label><label>最大 Z<input id="rcZ1" type="number" value="511"></label></div>
    <div class="skbar"><button id="rcPick" class="primary">选择 .mca 并裁剪</button></div><div id="rcOut" class="muted"></div>`, () => {
    $('rcPick').onclick = async () => {
      const [f] = await pickBytes('.mca');
      const buf = f.bytes; const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
      const header = new Uint8Array(8192); const hdv = new DataView(header.buffer);
      const bodies = []; let sector = 2;
      const x0 = Number($('rcX0').value), x1 = Number($('rcX1').value), z0 = Number($('rcZ0').value), z1 = Number($('rcZ1').value);
      for (let i = 0; i < 1024; i++) {
        const off = (dv.getUint32(i * 4) >>> 8) * 4096; if (!off || off + 5 > buf.length) continue;
        const len = dv.getUint32(off); if (len < 5 || off + 4 + len > buf.length) continue;
        const wx = (i % 32), wz = Math.floor(i / 32);
        if (wx < x0 || wx > x1 || wz < z0 || wz > z1) continue;
        const data = buf.subarray(off + 5, off + 4 + len);
        const sectorCount = Math.ceil((data.length + 5) / 4096);
        if (sectorCount > 255) continue;
        const body = new Uint8Array(sectorCount * 4096);
        new DataView(body.buffer).setUint32(0, data.length + 1); body[4] = buf[off + 4]; body.set(data, 5);
        hdv.setUint32(i * 4, ((sector << 8) | sectorCount) >>> 0);
        hdv.setUint32(4096 + i * 4, dv.getUint32(4096 + i * 4));
        bodies.push({ sector, data: body }); sector += sectorCount;
      }
      let total = 8192; for (const b of bodies) total = Math.max(total, b.sector * 4096 + b.data.length);
      const out = new Uint8Array(total); out.set(header);
      for (const b of bodies) out.set(b.data, b.sector * 4096);
      saveBytes(f.name.replace(/\.mca$/, '_裁剪.mca'), out);
      $('rcOut').textContent = `保留 ${bodies.length} 个区块`;
    };
  });
}

// 11 Java 报告
export function toolJavaReport() {
  openPanel('Java 存档报告', `<p class="muted">读 Java 存档 ZIP，生成 Markdown 报告（种子/出生点/天数/区块/地表方块直方图）。</p>
    <div class="skbar"><button id="jrPick" class="primary">选择 ZIP</button></div><div id="jrOut" class="muted"></div>`, () => {
    $('jrPick').onclick = async () => {
      const [f] = await pickBytes('.zip');
      const st = analyzeJavaZip(f.bytes);
      const surf = javaSurface(st.zip, null);
      const hist = {};
      for (const [, v] of surf.cols) hist[v.block] = (hist[v.block] || 0) + 1;
      const top = Object.entries(hist).sort((a, b) => b[1] - a[1]).slice(0, 20);
      const md = `# Java 存档报告：${st.name || '未命名'}\n\n- 版本：${st.version}\n- 种子：${st.seed}\n- 出生点：${st.spawn.join(', ')}\n- 游戏天数：${st.days}\n- region：${st.regions} 个\n- 已解析区块：${surf.chunks}\n- 方块列：${surf.cols.size}\n- 范围：X ${surf.minX}~${surf.maxX}，Z ${surf.minZ}~${surf.maxZ}\n\n## 地表方块 Top 20\n\n| 方块 | 列数 |\n|---|---|\n${top.map(([b, c]) => `| ${b} | ${c} |`).join('\n')}\n`;
      saveBytes('java-存档报告.md', enc(md));
      $('jrOut').textContent = '已导出 java-存档报告.md';
    };
  });
}

// 12 最近文件
export function toolRecent() {
  let list = [];
  try { list = JSON.parse(localStorage.getItem('mcbeRecent') || '[]'); } catch { list = []; }
  openPanel('最近打开', `<p class="muted">记录最近打开的文件名（不保存文件内容）。</p><div id="rcList" class="code" style="padding:8px;max-height:44vh;overflow:auto">${list.map(x => `<div>${x.name} · ${new Date(x.at).toLocaleString()}</div>`).join('') || '<p class="muted">暂无记录</p>'}</div>
    <div class="skbar"><button id="rcClear" class="ghost">清空记录</button></div>`, () => {
    $('rcClear').onclick = () => { localStorage.removeItem('mcbeRecent'); $('rcList').textContent = '已清空'; };
  });
}

// 13 快捷键
export function toolShortcuts() {
  const rows = SHORTCUTS.map(x => [x.keys, x.label]).concat([
    ['右键文件', '重命名 / 删除'],
    ['滚轮 / 双指', '地图缩放 0.25~5×'],
    ['长按日志', '选中复制'],
  ]);
  openPanel('快捷键与手势', `<div class="legend">${rows.map(([k, d]) => `<div class="nbtrow"><code>${k}</code><span>${d}</span></div>`).join('')}</div>
    <p class="muted">外接键盘、蓝牙键鼠与 Windows 版共用同一套；输入框内只响应 Ctrl+S / Esc 等安全组合。</p>`, () => {});
}

// 14 附加包依赖诊断
export function toolAddonDiag() {
  openPanel('附加包依赖诊断', `<p class="muted">检查 manifest 的 UUID、版本、modules、dependencies 是否自洽。</p>
    <div class="skbar"><button id="adPick" class="primary">选择附加包</button></div><div id="adOut"></div>`, () => {
    $('adPick').onclick = async () => {
      const [f] = await pickBytes('.mcaddon,.mcpack,.zip');
      const z = parseZip(f.bytes);
      const mans = z.entries.filter(e => /manifest\.json$/.test(e.name)).map(e => ({ name: e.name, j: JSON.parse(dec(z.read(e))) }));
      if (!mans.length) return $('adOut').textContent = '没有 manifest.json';
      const uuids = new Set(mans.map(m => m.j.header && m.j.header.uuid));
      const rows = mans.map(m => {
        const h = m.j.header || {}; const mods = m.j.modules || [];
        const bad = [];
        if (!h.uuid) bad.push('缺 header.uuid');
        if (!Array.isArray(h.version)) bad.push('版本格式');
        if (!mods.length) bad.push('无 modules');
        const deps = m.j.dependencies || [];
        for (const d of deps) if (!uuids.has(d.uuid)) bad.push('依赖不存在 ' + d.uuid);
        return `<div class="nbtrow"><code>${m.name}</code><b style="color:${bad.length ? '#ff8a8a' : '#7ddc9a'}">${bad.length ? bad.join('；') : '通过'}</b></div>`;
      });
      $('adOut').innerHTML = rows.join('');
    };
  });
}

// 15 对比两个包
export function toolDiff() {
  openPanel('包内容对比', `<p class="muted">比两个 ZIP 的文件清单和大小，列出新增/删除/大小变化。</p>
    <div class="skbar"><button id="dfA" class="ghost">包 A</button><button id="dfB" class="ghost">包 B</button><button id="dfRun" class="primary">对比</button></div>
    <div id="dfOut" style="max-height:46vh;overflow:auto"></div>`, () => {
    let A = null, B = null;
    $('dfA').onclick = async () => { const [f] = await pickBytes('.zip,.mcpack,.mcaddon,.jar,.mcworld,.mctemplate'); A = { name: f.name, z: parseZip(f.bytes) }; $('dfOut').textContent = 'A=' + f.name; };
    $('dfB').onclick = async () => { const [f] = await pickBytes('.zip,.mcpack,.mcaddon,.jar,.mcworld,.mctemplate'); B = { name: f.name, z: parseZip(f.bytes) }; $('dfOut').textContent = 'B=' + f.name; };
    $('dfRun').onclick = () => {
      if (!A || !B) return;
      const ma = new Map(A.z.entries.map(e => [e.name, e.usize]));
      const mb = new Map(B.z.entries.map(e => [e.name, e.usize]));
      const added = [...mb.keys()].filter(k => !ma.has(k));
      const removed = [...ma.keys()].filter(k => !mb.has(k));
      const changed = [...ma.keys()].filter(k => mb.has(k) && ma.get(k) !== mb.get(k));
      $('dfOut').innerHTML = `<p>新增 ${added.length}，删除 ${removed.length}，大小变化 ${changed.length}</p>
        <pre class="code" style="max-height:30vh;overflow:auto">${['+ ' + added.join('\n+ '), '- ' + removed.join('\n- ')].join('\n').slice(0, 8000)}</pre>`;
    };
  });
}

// 16 存档健康检查
export function toolHealth() {
  openPanel('存档健康检查', `<p class="muted">检查基岩版/Java 存档的关键文件与结构完整性。</p>
    <div class="skbar"><button id="hlPick" class="primary">选择存档</button></div><div id="hlOut"></div>`, () => {
    $('hlPick').onclick = async () => {
      const [f] = await pickBytes('.zip,.mcworld,.mctemplate');
      const z = parseZip(f.bytes); const names = z.entries.map(e => e.name);
      const isJava = names.some(n => /level\.dat$/.test(n)) && names.some(n => /region\/.*\.mca$/.test(n));
      const isBedrock = names.some(n => /db\/CURRENT$/.test(n));
      const checks = [];
      if (isJava) {
        const st = analyzeJavaZip(f.bytes);
        checks.push(['level.dat', st.name], ['region 数', st.regions], ['区块', javaSurface(st.zip, null).chunks]);
      } else if (isBedrock) {
        checks.push(['level.dat', names.some(n => /level\.dat$/.test(n)) ? '存在' : '缺失']);
        checks.push(['db/CURRENT', '存在']);
        checks.push(['db 文件数', names.filter(n => /db\/[^/]+$/.test(n)).length]);
      } else checks.push(['识别', '未知格式']);
      $('hlOut').innerHTML = checks.map(([k, v]) => `<div class="nbtrow"><code>${k}</code><span>${v}</span></div>`).join('');
    };
  });
}

// 17 强调色
export function toolAccent() {
  const cur = localStorage.getItem('mcbeAccent') || '#2f7df6';
  openPanel('自定义强调色', `<div class="skbar"><input type="color" id="acColor" value="${cur}"><button id="acReset" class="ghost">恢复默认</button></div>
    <p class="muted">影响主按钮、选中态等强调元素。</p>`, () => {
    const apply = (c) => { document.documentElement.style.setProperty('--accent', c); localStorage.setItem('mcbeAccent', c); };
    $('acColor').oninput = () => apply($('acColor').value);
    $('acColor').onchange = () => apply($('acColor').value);
    $('acReset').onclick = () => { localStorage.removeItem('mcbeAccent'); document.documentElement.style.removeProperty('--accent'); };
    apply(cur);
  });
}

// 18 方块直方图 CSV
export function toolHistCsv() {
  openPanel('地表方块直方图', `<p class="muted">从 Java 存档统计地表方块列数，导出 CSV。</p>
    <div class="skbar"><button id="hsPick" class="primary">选择 ZIP</button></div><div id="hsOut" class="muted"></div>`, () => {
    $('hsPick').onclick = async () => {
      const [f] = await pickBytes('.zip');
      const st = analyzeJavaZip(f.bytes); const surf = javaSurface(st.zip, null);
      const hist = {}; for (const [, v] of surf.cols) hist[v.block] = (hist[v.block] || 0) + 1;
      const rows = Object.entries(hist).sort((a, b) => b[1] - a[1]);
      saveBytes('地表方块.csv', enc('方块,列数\n' + rows.map(([b, c]) => `${b},${c}`).join('\n')));
      $('hsOut').textContent = `共 ${rows.length} 种方块，已导出`;
    };
  });
}

// 19 结构 3D 导出 PNG
export function toolStructPng() {
  openPanel('结构 3D 导出 PNG', `<p class="muted">读 Java .nbt 结构，渲染 3D 图并导出 PNG。</p>
    <div class="skbar"><button id="spPick" class="primary">选择 .nbt</button></div><div id="spOut" class="muted"></div>`, () => {
    $('spPick').onclick = async () => {
      const [f] = await pickBytes('.nbt');
      let nbt; try { nbt = parseJavaNbt(ungzip(f.bytes)); } catch { nbt = parseJavaNbt(f.bytes); }
      const root = nbt.data;
      const size = root.size ? root.size.value : [1, 1, 1];
      const pal = root.palette ? root.palette.value.items.map(p => p.Name.value) : [];
      const blocks = root.blocks ? root.blocks.value.items.map(b => ({ pos: b.pos.value, state: b.state.value })) : [];
      const cv = document.createElement('canvas');
      renderStructure3D(cv, { size, palette: pal, blocks }, 0);
      const blob = await new Promise(r => cv.toBlob(r, 'image/png'));
      saveBytes(f.name.replace(/\.nbt$/, '_3d.png'), new Uint8Array(await blob.arrayBuffer()));
      $('spOut').textContent = '已导出 PNG';
    };
  });
}

// 20 NBT → JSON
export function toolNbtJson() {
  openPanel('NBT 转 JSON', `<p class="muted">读 Java .dat/.nbt（gzip 或未压缩），导出可读 JSON。</p>
    <div class="skbar"><button id="njPick" class="primary">选择文件</button></div><div id="njOut" class="muted"></div>`, () => {
    $('njPick').onclick = async () => {
      const [f] = await pickBytes('.dat,.nbt,.schematic');
      let nbt; try { nbt = parseJavaNbt(ungzip(f.bytes)); } catch { nbt = parseJavaNbt(f.bytes); }
      const strip = (v) => {
        if (v === null || v === undefined) return v;
        if (typeof v === 'bigint') return v.toString();
        if (v instanceof Uint8Array) return '<bytes ' + v.length + '>';
        if (Array.isArray(v)) return v.map(strip);
        if (typeof v === 'object') { const o = {}; for (const k of Object.keys(v)) o[k] = strip(v[k]); return o; }
        return v;
      };
      saveBytes(f.name.replace(/\.\w+$/, '') + '.json', enc(J(strip(nbt.data))));
      $('njOut').textContent = '已导出 JSON';
    };
  });
}

// 工具中心入口
const TOOLS = [
  ['UUID 生成器', '离线生成 v4 UUID', toolUuid],
  ['manifest 生成器', 'BP/RP 双清单 + UUID', toolManifest],
  ['方块名称对照', 'BE ⇄ JE 名称查询', toolLookup],
  ['语言补键', '对比与合并 lang/json', toolLang],
  ['贴图尺寸检查', '批量 PNG 尺寸/位深', toolPngCheck],
  ['图片转 PNG', '缩放 + 转为 PNG', toolImgConvert],
  ['文本批量替换', '包内 json/js/lang 替换', toolReplace],
  ['十六进制查看', '只读十六进制浏览', toolHex],
  ['结构转 mcstructure', 'Java .nbt → 基岩结构', toolNbtToMcstructure],
  ['Region 裁剪', '按 X/Z 范围裁剪 .mca', toolRegionCrop],
  ['Java 存档报告', '导出 Markdown 报告', toolJavaReport],
  ['最近打开', '最近文件名记录', toolRecent],
  ['快捷键与手势', '操作说明', toolShortcuts],
  ['附加包诊断', 'manifest 依赖检查', toolAddonDiag],
  ['包内容对比', '两个 ZIP 差异', toolDiff],
  ['存档健康检查', '关键文件完整性', toolHealth],
  ['自定义强调色', '主题主色', toolAccent],
  ['方块直方图', '导出 CSV', toolHistCsv],
  ['结构 3D 导出', '渲染 PNG', toolStructPng],
  ['NBT 转 JSON', '导出可读 JSON', toolNbtJson],
];

export function openToolbox() {
  const body = $('modalBody');
  body.innerHTML = `<h3>工具中心</h3><p class="muted">20 个离线工具，全部本地运行。</p>
    <div class="toolgrid">${TOOLS.map(([n, d], i) => `<button class="toolcard" data-i="${i}"><b>${n}</b><span>${d}</span></button>`).join('')}</div>
    <div class="skbar"><button id="tbClose" class="ghost">关闭</button></div>`;
  $('modal').style.display = 'flex';
  const box = document.querySelector('.modalbox');
  if (box) { box.style.maxWidth = '760px'; box.style.width = '96vw'; }
  $('tbClose').onclick = () => { if (box) { box.style.maxWidth = ''; box.style.width = ''; } $('modal').style.display = 'none'; };
  body.querySelectorAll('.toolcard').forEach(b => { b.onclick = () => TOOLS[Number(b.dataset.i)][2](); });
}
