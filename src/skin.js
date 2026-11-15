// 皮肤 / 披风制作器：手动画 + 代码生成
const SKIN_PARTS = [
  { name: '头', x: 0, y: 0, w: 32, h: 16 },
  { name: '身体', x: 16, y: 16, w: 24, h: 16 },
  { name: '右臂', x: 40, y: 16, w: 16, h: 16 },
  { name: '左臂', x: 32, y: 48, w: 16, h: 16 },
  { name: '右腿', x: 0, y: 16, w: 16, h: 16 },
  { name: '左腿', x: 16, y: 48, w: 16, h: 16 },
];

const PALETTE = ['#000000', '#ffffff', '#7f7f7f', '#c0c0c0', '#8b5a2b', '#a0642a', '#d9a066',
  '#3b5b2f', '#5a8c3a', '#7fbf4a', '#2b4a8b', '#3d6fd1', '#7aa7ff', '#8b1f2f',
  '#c0392b', '#e67e22', '#f1c40f', '#16a085', '#8e44ad', '#ecf0f1'];

function $(id) { return document.getElementById(id); }
function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return c;
}

export function openSkinStudio(kind) {
  const isCape = kind === 'cape';
  const W = 64, H = isCape ? 32 : 64;
  const px = new Uint8ClampedArray(W * H * 4); // 透明底
  let color = '#7fbf4a';
  let tool = 'brush';
  let mirror = false;
  let zoom = isCape ? 10 : 8;
  let undo = [];
  let painting = false;

  const cv = makeCanvas(W, H);
  const ctx = cv.getContext('2d');
  const img = ctx.createImageData(W, H);

  const commit = () => {
    for (let i = 0; i < px.length; i += 4) {
      img.data[i] = px[i]; img.data[i + 1] = px[i + 1]; img.data[i + 2] = px[i + 2]; img.data[i + 3] = px[i + 3];
    }
    ctx.putImageData(img, 0, 0);
  };

  const pushUndo = () => { undo.push(px.slice()); if (undo.length > 24) undo.shift(); };

  const setPx = (x, y, hex, alpha) => {
    if (x < 0 || y < 0 || x >= W || y >= H) return;
    const [r, g, b] = hexToRgb(hex);
    const a = alpha == null ? 255 : alpha;
    const i = (y * W + x) * 4;
    px[i] = r; px[i + 1] = g; px[i + 2] = b; px[i + 3] = a;
  };

  const getPx = (x, y) => {
    const i = (y * W + x) * 4;
    return [px[i], px[i + 1], px[i + 2], px[i + 3]];
  };

  function hexToRgb(hex) {
    const h = hex.replace('#', '');
    const n = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
    return [parseInt(n.slice(0, 2), 16) || 0, parseInt(n.slice(2, 4), 16) || 0, parseInt(n.slice(4, 6), 16) || 0];
  }

  const drawAt = (x, y) => {
    if (tool === 'eraser') {
      setPx(x, y, '#000000', 0);
      if (mirror) setPx(W - 1 - x, y, '#000000', 0);
    } else if (tool === 'picker') {
      const p = getPx(x, y);
      if (p[3] > 0) { color = rgbToHex(p[0], p[1], p[2]); const el = $('skColor'); if (el) el.value = color; }
    } else {
      setPx(x, y, color, 255);
      if (mirror) setPx(W - 1 - x, y, color, 255);
    }
    commit(); renderPreview();
  };

  function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
  }

  function floodFill(x, y, hex) {
    const target = getPx(x, y);
    const [r, g, b] = hexToRgb(hex);
    if (target[0] === r && target[1] === g && target[2] === b && target[3] === 255) return;
    const stack = [[x, y]];
    const seen = new Uint8Array(W * H);
    while (stack.length) {
      const [cx, cy] = stack.pop();
      if (cx < 0 || cy < 0 || cx >= W || cy >= H) continue;
      const idx = cy * W + cx;
      if (seen[idx]) continue;
      const p = getPx(cx, cy);
      if (!(p[0] === target[0] && p[1] === target[1] && p[2] === target[2] && p[3] === target[3])) continue;
      seen[idx] = 1;
      setPx(cx, cy, hex, 255);
      stack.push([cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]);
    }
    commit(); renderPreview();
  }

  function renderGuides() {
    const g = cv.getContext('2d');
    g.save();
    g.strokeStyle = 'rgba(120,180,255,.55)'; g.lineWidth = 1;
    if (!isCape) {
      for (const p of SKIN_PARTS) {
        g.strokeRect(p.x + 0.5, p.y + 0.5, p.w - 1, p.h - 1);
        g.fillStyle = 'rgba(10,20,35,.6)';
        g.font = '4px sans-serif';
        g.fillText(p.name, p.x + 1, p.y + 5);
      }
    } else {
      g.strokeStyle = 'rgba(255,255,255,.5)';
      g.strokeRect(0.5, 0.5, 10, 16);
      g.strokeRect(11.5, 0.5, 10, 16);
      g.fillStyle = 'rgba(10,20,35,.6)'; g.font = '4px sans-serif';
      g.fillText('正面', 1, 5); g.fillText('背面', 12, 5);
    }
    g.restore();
  }

  function renderAll() {
    commit(); renderGuides(); renderPreview();
  }

  // 拼一个 2D 纸娃娃预览
  function renderPreview() {
    const pv = $('skPreview'); if (!pv) return;
    const g = pv.getContext('2d');
    g.clearRect(0, 0, pv.width, pv.height);
    g.fillStyle = 'rgba(255,255,255,0.04)'; g.fillRect(0, 0, pv.width, pv.height);
    if (isCape) {
      g.imageSmoothingEnabled = false;
      g.drawImage(cv, 0, 0, 10, 16, 20, 10, 120, 192);
      return;
    }
    g.imageSmoothingEnabled = false;
    // 头正面、身体正面、左右手臂、左右腿
    g.drawImage(cv, 8, 8, 8, 8, 54, 10, 52, 52);
    g.drawImage(cv, 20, 20, 8, 12, 54, 66, 52, 78);
    g.drawImage(cv, 44, 20, 4, 12, 18, 66, 26, 78);
    g.drawImage(cv, 36, 52, 4, 12, 110, 66, 26, 78);
    g.drawImage(cv, 4, 20, 4, 12, 42, 148, 26, 78);
    g.drawImage(cv, 20, 52, 4, 12, 86, 148, 26, 78);
  }

  // 代码生成 API
  function api() {
    return {
      W, H,
      set: (x, y, c) => setPx(x, y, c, 255),
      get: (x, y) => getPx(x, y),
      fill: (c) => { for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) setPx(x, y, c, 255); },
      rect: (x, y, w, h, c) => { for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) setPx(i, j, c, 255); },
      line: (x1, y1, x2, y2, c) => {
        let dx = Math.abs(x2 - x1), dy = Math.abs(y2 - y1), sx = x1 < x2 ? 1 : -1, sy = y1 < y2 ? 1 : -1, err = dx - dy;
        while (true) {
          setPx(x1, y1, c, 255);
          if (x1 === x2 && y1 === y2) break;
          const e2 = 2 * err;
          if (e2 > -dy) { err -= dy; x1 += sx; }
          if (e2 < dx) { err += dx; y1 += sy; }
        }
      },
      clear: () => { px.fill(0); },
      noise: (colors) => { for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) setPx(x, y, colors[Math.floor(Math.random() * colors.length)], 255); },
      rand: (n) => Math.floor(Math.random() * n),
      done: () => { commit(); renderGuides(); renderPreview(); },
    };
  }

  const SNIPPETS = {
    stripes: `// 斜条纹
const c=['#2b4a8b','#7aa7ff','#ffffff'];
for(let y=0;y<api.H;y++)for(let x=0;x<api.W;x++){
  const k=(x+y)%9;
  api.set(x,y,c[k<3?0:k<6?1:2]);
}
api.done();`,
    camo: `// 迷彩噪点
const c=['#3b5b2f','#5a8c3a','#7fbf4a','#2b3b22'];
api.fill(c[0]);
for(let i=0;i<260;i++){
  const x=api.rand(api.W), y=api.rand(api.H), s=1+api.rand(4);
  api.rect(x,y,s,s,c[1+api.rand(3)]);
}
api.done();`,
    gradient: `// 上下渐变
for(let y=0;y<api.H;y++){
  const t=y/(api.H-1);
  const r=Math.round(40+t*180), g=Math.round(70+t*120), b=Math.round(120+t*60);
  const hex='#'+[r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('');
  api.line(0,y,api.W-1,y,hex);
}
api.done();`,
    checker: `// 棋盘格
for(let y=0;y<api.H;y++)for(let x=0;x<api.W;x++){
  api.set(x,y,((x>>2)+(y>>2))%2?'#1d2430':'#7aa7ff');
}
api.done();`,
    star: `// 披风星空
api.fill('#0b1230');
for(let i=0;i<90;i++){
  const x=api.rand(api.W),y=api.rand(api.H);
  api.set(x,y,Math.random()<0.8?'#ffffff':'#ffd479');
}
api.line(20,2,20,14,'#e74c3c');
api.done();`,
  };

  function applyBaseTemplate() {
    pushUndo(); px.fill(0);
    const skin = '#d9a066', hair = '#3a2a1a', shirt = '#3d6fd1', pants = '#2b3b5b', shoe = '#2b2b2b';
    // 头、身体、四肢的正面/侧面粗略铺色
    for (let y = 0; y < 32; y++) for (let x = 0; x < 32; x++) {
      if (y < 8) setPx(x, y, hair, 255);           // 头顶
      else if (y < 16) setPx(x, y, y < 11 ? hair : skin, 255); // 脸区
    }
    for (let y = 16; y < 32; y++) for (let x = 16; x < 40; x++) setPx(x, y, shirt, 255); // 身体
    for (let y = 16; y < 32; y++) for (let x = 40; x < 56; x++) setPx(x, y, shirt, 255); // 右臂
    for (let y = 16; y < 32; y++) for (let x = 0; x < 16; x++) setPx(x, y, pants, 255);   // 右腿
    setPx(8, 8, '#000000', 255); setPx(12, 8, '#000000', 255); // 眼睛
    commit(); renderGuides(); renderPreview();
  }

  const body = $('modalBody');
  body.innerHTML = `
    <div class="skhead"><h3>${isCape ? '披风制作器' : '皮肤制作器'}</h3>
      <span class="muted">尺寸 ${W}×${H}（基岩版标准）</span></div>
    <div class="skbar">
      <button id="skBrush" class="primary">画笔</button>
      <button id="skErase" class="ghost">橡皮</button>
      <button id="skFill" class="ghost">填充</button>
      <button id="skPick" class="ghost">吸管</button>
      <button id="skMirror" class="ghost">镜像关</button>
      <button id="skUndo" class="ghost">撤销</button>
      <button id="skClear" class="ghost">清空</button>
      <input type="color" id="skColor" value="${color}" title="颜色">
    </div>
    <div class="skpalette">${PALETTE.map(c => `<button class="skc" data-c="${c}" style="background:${c}"></button>`).join('')}</div>
    <div class="skmain">
      <div class="skcanvaswrap"><canvas id="skCanvas"></canvas></div>
      <div class="skpreviewwrap"><canvas id="skPreview" width="160" height="240"></canvas><p class="muted">预览（正面）</p></div>
    </div>
    <div class="skbar">
      <button id="skZoomOut" class="ghost">缩小</button>
      <button id="skZoomIn" class="ghost">放大</button>
      <button id="skTemplate" class="ghost">基础模板</button>
      <button id="skExport" class="primary">导出 PNG</button>
    </div>
    <h3>代码生成</h3>
    <p class="muted">写 JS 直接画像素：api.set(x,y,色) / api.rect / api.line / api.fill / api.noise。本地执行，只影响画布。</p>
    <select id="skSnippet" class="skselect">${Object.keys(SNIPPETS).map(k => `<option value="${k}">${({ stripes: '斜条纹', camo: '迷彩', gradient: '渐变', checker: '棋盘格', star: '披风星空' })[k]}</option>`).join('')}</select>
    <textarea id="skCode" class="code" style="height:22vh" spellcheck="false"></textarea>
    <div class="skbar"><button id="skRun" class="primary">运行代码</button><button id="skClose" class="ghost">关闭</button></div>
    <p id="skMsg" class="muted"></p>
  `;
  $('modal').style.display = 'flex';
  const box = document.querySelector('.modalbox');
  if (box) { box.style.maxWidth = '760px'; box.style.width = '96vw'; box.style.maxHeight = '92vh'; }

  // 显示画布
  const show = $('skCanvas');
  show.width = W; show.height = H;
  const sctx = show.getContext('2d');
  function repaint() {
    sctx.clearRect(0, 0, W, H);
    sctx.imageSmoothingEnabled = false;
    sctx.drawImage(cv, 0, 0);
    if (!isCape) {
      sctx.save(); sctx.strokeStyle = 'rgba(120,180,255,.55)'; sctx.lineWidth = 1;
      for (const p of SKIN_PARTS) {
        sctx.strokeRect(p.x + 0.5, p.y + 0.5, p.w - 1, p.h - 1);
        sctx.fillStyle = 'rgba(10,20,35,.55)'; sctx.font = '3px sans-serif';
        sctx.fillText(p.name, p.x + 1, p.y + 4);
      }
      sctx.restore();
    } else {
      sctx.save(); sctx.strokeStyle = 'rgba(255,255,255,.45)';
      sctx.strokeRect(0.5, 0.5, 10, 16); sctx.strokeRect(11.5, 0.5, 10, 16); sctx.restore();
    }
  }
  function setZoom(z) { zoom = Math.max(4, Math.min(20, z)); show.style.width = (W * zoom) + 'px'; show.style.height = (H * zoom) + 'px'; }
  setZoom(zoom);
  repaint(); renderPreview();

  const toPix = (ev) => {
    const r = show.getBoundingClientRect();
    return [Math.floor((ev.clientX - r.left) / r.width * W), Math.floor((ev.clientY - r.top) / r.height * H)];
  };

  show.addEventListener('pointerdown', (ev) => {
    ev.preventDefault(); pushUndo(); painting = true;
    const [x, y] = toPix(ev);
    if (tool === 'fill') floodFill(x, y, color); else drawAt(x, y);
    repaint();
  });
  show.addEventListener('pointermove', (ev) => {
    if (!painting) return;
    const [x, y] = toPix(ev);
    if (tool !== 'fill' && tool !== 'picker') drawAt(x, y);
  });
  const stop = () => { painting = false; };
  show.addEventListener('pointerup', stop);
  show.addEventListener('pointerleave', stop);
  show.addEventListener('pointercancel', stop);

  const setTool = (t, id) => {
    tool = t;
    ['skBrush', 'skErase', 'skFill', 'skPick'].forEach(k => { const el = $(k); if (el) el.className = k === id ? 'primary' : 'ghost'; });
  };
  $('skBrush').onclick = () => setTool('brush', 'skBrush');
  $('skErase').onclick = () => setTool('eraser', 'skErase');
  $('skFill').onclick = () => setTool('fill', 'skFill');
  $('skPick').onclick = () => setTool('picker', 'skPick');
  $('skMirror').onclick = () => { mirror = !mirror; $('skMirror').textContent = mirror ? '镜像开' : '镜像关'; };
  $('skUndo').onclick = () => { const p = undo.pop(); if (!p) return; px.set(p); commit(); repaint(); renderPreview(); };
  $('skClear').onclick = () => { pushUndo(); px.fill(0); commit(); repaint(); renderPreview(); };
  $('skColor').oninput = (e) => { color = e.target.value; };
  body.querySelectorAll('.skc').forEach(el => { el.onclick = () => { color = el.dataset.c; $('skColor').value = color; }; });
  $('skZoomIn').onclick = () => setZoom(zoom + 2);
  $('skZoomOut').onclick = () => setZoom(zoom - 2);
  $('skTemplate').onclick = () => { applyBaseTemplate(); repaint(); };
  $('skSnippet').onchange = () => { $('skCode').value = SNIPPETS[$('skSnippet').value]; };
  $('skSnippet').onchange();
  $('skRun').onclick = () => {
    pushUndo();
    try {
      const fn = new Function('api', $('skCode').value);
      fn(api());
      $('skMsg').textContent = '已生成，可继续用画笔修改';
      repaint(); renderPreview();
    } catch (e) { $('skMsg').textContent = '代码出错：' + e.message; }
  };
  $('skExport').onclick = () => {
    const out = makeCanvas(W, H);
    const g = out.getContext('2d');
    const data = g.createImageData(W, H);
    data.data.set(px);
    g.putImageData(data, 0, 0);
    const name = isCape ? 'cape_64x32.png' : 'skin_64x64.png';
    const dataUrl = out.toDataURL('image/png');
    if (window.AndroidBridge && window.AndroidBridge.saveBinary) {
      const r = window.AndroidBridge.saveBinary(name, dataUrl.split(',')[1]);
      $('skMsg').textContent = String(r) === 'ok' ? ('已保存到 下载/MCBE解析/' + name) : ('保存失败：' + r);
      return;
    }
    const a = document.createElement('a');
    a.download = name;
    a.href = dataUrl;
    document.body.appendChild(a); a.click(); a.remove();
    $('skMsg').textContent = '已导出 ' + name;
  };
  $('skClose').onclick = () => { if (box) { box.style.maxWidth = ''; box.style.width = ''; box.style.maxHeight = ''; } $('modal').style.display = 'none'; };
}
