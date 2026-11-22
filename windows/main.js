const { app, BrowserWindow, Menu, shell, screen, globalShortcut, ipcMain, dialog, session } = require('electron');
const path = require('path');
const fs = require('fs');

let win = null;
let reloadedAfterCrash = false;

function logCrash(text) {
  try {
    const f = path.join(app.getPath('userData'), 'crash.log');
    const stamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
    const line = stamp + '  ' + text + '\n';
    try {
      if (fs.existsSync(f) && fs.statSync(f).size > 1024 * 1024) fs.truncateSync(f, 0);
    } catch (e) { }
    fs.appendFileSync(f, line, 'utf8');
  } catch (e) { }
}

// 文件名里去掉系统不允许的字符，避免写盘失败
function safeName(name, fallback) {
  const s = String(name || '').split(/[\\/]/).pop().replace(/[\\/:*?"<>|\u0000-\u001f]/g, '_').trim();
  return s || fallback;
}

const DL_DIR = () => process.env.MCBOX_SAVE_DIR || app.getPath('downloads');

// 「导出 / 下载」→ 系统另存为对话框（异步，不阻塞界面），直接写盘
ipcMain.handle('mc:save-binary', async (ev, name, b64) => {
  try {
    const buf = Buffer.from(String(b64 || ''), 'base64');
    const fname = safeName(name, 'MC工具箱导出.bin');
    const dir = DL_DIR();
    let target;
    if (process.env.MCBOX_SAVE_DIR) {
      fs.mkdirSync(dir, { recursive: true });
      target = path.join(dir, fname);
    } else {
      const r = await dialog.showSaveDialog(win, {
        title: '保存文件',
        defaultPath: path.join(dir, fname),
        buttonLabel: '保存',
      });
      if (!r || r.canceled || !r.filePath) return { ok: false, error: '已取消保存' };
      target = r.filePath;
    }
    fs.writeFileSync(target, buf);
    return { ok: true, path: target };
  } catch (err) {
    return { ok: false, error: String(err && err.message || err) };
  }
});

// 改动 db / level.dat 前的静默备份，落在 用户数据目录/backups，只留最近 12 份
ipcMain.handle('mc:backup', async (ev, name, b64) => {
  try {
    const dir = path.join(app.getPath('userData'), 'backups');
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, safeName(name, '存档-备份.mcworld'));
    fs.writeFileSync(file, Buffer.from(String(b64 || ''), 'base64'));
    const olds = fs.readdirSync(dir)
      .map(n => ({ n, t: fs.statSync(path.join(dir, n)).mtimeMs }))
      .sort((a, b) => b.t - a.t)
      .slice(12);
    for (const o of olds) { try { fs.unlinkSync(path.join(dir, o.n)); } catch (e) { } }
    return { ok: true, path: file };
  } catch (err) {
    return { ok: false, error: String(err && err.message || err) };
  }
});

// ===== Chunker 1.21.0 完整存档转换（桌面端，内置原生 CLI） =====
const { spawn } = require('child_process');
const zlib = require('zlib');

function chunkerEnginePath() {
  const base = path.join(__dirname, 'chunker', 'chunker-cli');
  return process.platform === 'win32'
    ? path.join(base, 'chunker-cli.exe')
    : path.join(base, 'bin', 'chunker-cli');
}

function chunkerAvailable() {
  try { return fs.statSync(chunkerEnginePath()).isFile(); } catch (e) { return false; }
}

function crc32(buf) {
  let c, crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = (crc ^ buf[i]) & 0xff;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    crc = (crc >>> 8) ^ c;
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function zipDirToFile(srcDir, outFile) {
  const entries = [];
  const walk = (dir) => {
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      const st = fs.statSync(full);
      if (st.isDirectory()) walk(full);
      else if (st.isFile()) {
        const rel = path.relative(srcDir, full).split(path.sep).join('/');
        const data = fs.readFileSync(full);
        const def = zlib.deflateRawSync(data, { level: 6 });
        entries.push({ name: rel, data, def, crc: crc32(data), time: st.mtime });
      }
    }
  };
  walk(srcDir);
  const chunks = [];
  const central = [];
  let offset = 0;
  for (const e of entries) {
    const useDef = e.def.length < e.data.length;
    const body = useDef ? e.def : e.data;
    const nameBuf = Buffer.from(e.name, 'utf8');
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x0800, 6);
    local.writeUInt16LE(useDef ? 8 : 0, 8);
    local.writeUInt16LE(0, 10);
    local.writeUInt16LE(0, 12);
    local.writeUInt32LE(e.crc, 14);
    local.writeUInt32LE(body.length, 18);
    local.writeUInt32LE(e.data.length, 22);
    local.writeUInt16LE(nameBuf.length, 26);
    local.writeUInt16LE(0, 28);
    chunks.push(local, nameBuf, body);
    const cen = Buffer.alloc(46);
    cen.writeUInt32LE(0x02014b50, 0);
    cen.writeUInt16LE(20, 4);
    cen.writeUInt16LE(20, 6);
    cen.writeUInt16LE(0x0800, 8);
    cen.writeUInt16LE(useDef ? 8 : 0, 10);
    cen.writeUInt16LE(0, 12);
    cen.writeUInt16LE(0, 14);
    cen.writeUInt32LE(e.crc, 16);
    cen.writeUInt32LE(body.length, 20);
    cen.writeUInt32LE(e.data.length, 24);
    cen.writeUInt16LE(nameBuf.length, 28);
    cen.writeUInt16LE(0, 30);
    cen.writeUInt16LE(0, 32);
    cen.writeUInt16LE(0, 34);
    cen.writeUInt16LE(0, 36);
    cen.writeUInt32LE(0, 38);
    cen.writeUInt32LE(offset, 42);
    central.push(cen, nameBuf);
    offset += local.length + nameBuf.length + body.length;
  }
  const cenSize = central.reduce((n, b) => n + b.length, 0);
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(0, 4);
  eocd.writeUInt16LE(0, 6);
  eocd.writeUInt16LE(entries.length, 8);
  eocd.writeUInt16LE(entries.length, 10);
  eocd.writeUInt32LE(cenSize, 12);
  eocd.writeUInt32LE(offset, 16);
  eocd.writeUInt16LE(0, 20);
  fs.writeFileSync(outFile, Buffer.concat(chunks.concat(central, [eocd])));
}

function unzipToDir(zipFile, destDir) {
  const buf = fs.readFileSync(zipFile);
  let eocd = -1;
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 65558); i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error('不是有效的 zip');
  const count = buf.readUInt16LE(eocd + 10);
  let ptr = buf.readUInt32LE(eocd + 16);
  const destRoot = path.resolve(destDir);
  for (let i = 0; i < count; i++) {
    if (buf.readUInt32LE(ptr) !== 0x02014b50) break;
    const method = buf.readUInt16LE(ptr + 10);
    const crc = buf.readUInt32LE(ptr + 16);
    const compSize = buf.readUInt32LE(ptr + 20);
    const nameLen = buf.readUInt16LE(ptr + 28);
    const extraLen = buf.readUInt16LE(ptr + 30);
    const commentLen = buf.readUInt16LE(ptr + 32);
    const localOff = buf.readUInt32LE(ptr + 42);
    const name = buf.toString('utf8', ptr + 46, ptr + 46 + nameLen).replace(/\\/g, '/');
    ptr += 46 + nameLen + extraLen + commentLen;
    if (!name || name.endsWith('/') || name.startsWith('__MACOSX/')) continue;
    if (name.startsWith('/') || name.includes('../')) continue;
    const out = path.resolve(destRoot, name);
    if (!out.startsWith(destRoot + path.sep)) continue;
    const loNameLen = buf.readUInt16LE(localOff + 26);
    const loExtraLen = buf.readUInt16LE(localOff + 28);
    const dataStart = localOff + 30 + loNameLen + loExtraLen;
    const raw = buf.subarray(dataStart, dataStart + compSize);
    let data;
    if (method === 0) data = Buffer.from(raw);
    else if (method === 8) data = zlib.inflateRawSync(raw);
    else throw new Error('不支持的 zip 压缩方式: ' + method);
    if (crc32(data) !== crc) throw new Error('zip 校验失败: ' + name);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, data);
  }
}

function normalizeWorldDir(dir) {
  if (fs.existsSync(path.join(dir, 'level.dat')) || fs.existsSync(path.join(dir, 'db'))) return dir;
  const children = fs.readdirSync(dir).filter(n => fs.statSync(path.join(dir, n)).isDirectory());
  if (children.length === 1) {
    const c = path.join(dir, children[0]);
    if (fs.existsSync(path.join(c, 'level.dat')) || fs.existsSync(path.join(c, 'db'))) return c;
  }
  return dir;
}

ipcMain.handle('mc:chunker-info', async () => {
  return { ok: true, supported: chunkerAvailable(), version: '1.21.0', engine: 'Chunker CLI (MIT)' };
});

ipcMain.handle('mc:chunker-convert', async (ev, payload) => {
  const p = payload || {};
  const target = String(p.target || 'INPUT');
  const outName = safeName(p.outName || (target.startsWith('JAVA') ? '转换-Java版.zip' : '转换-基岩版.mcworld'), '转换结果.zip');
  const tmp = fs.mkdtempSync(path.join(app.getPath('temp'), 'mcbox-chunker-'));
  try {
    if (!chunkerAvailable()) return { ok: false, error: '未找到内置 Chunker 引擎，请使用完整安装包' };
    const input = path.join(tmp, 'input.zip');
    if (p.inputBase64) fs.writeFileSync(input, Buffer.from(String(p.inputBase64), 'base64'));
    else if (p.inputPath && fs.existsSync(p.inputPath)) fs.copyFileSync(p.inputPath, input);
    else return { ok: false, error: '没有收到输入文件' };
    const inDir = path.join(tmp, 'in');
    const outDir = path.join(tmp, 'out');
    fs.mkdirSync(inDir, { recursive: true });
    fs.mkdirSync(outDir, { recursive: true });
    unzipToDir(input, inDir);
    const world = normalizeWorldDir(inDir);
    const engine = chunkerEnginePath();
    const result = await new Promise((resolve) => {
      const child = spawn(engine, ['-i', world, '-o', outDir, '-f', target], {
        cwd: path.dirname(engine), windowsHide: true, env: process.env,
      });
      let log = '';
      const onData = (d) => { log += d.toString(); if (log.length > 12000) log = log.slice(-12000); };
      child.stdout.on('data', onData);
      child.stderr.on('data', onData);
      child.on('error', err => resolve({ code: -1, log: log + '\n' + err.message }));
      child.on('close', code => resolve({ code, log }));
    });
    if (result.code !== 0) return { ok: false, error: 'Chunker 退出码 ' + result.code, log: result.log };
    const tmpZip = path.join(tmp, outName);
    zipDirToFile(outDir, tmpZip);
    let targetPath;
    if (process.env.MCBOX_SAVE_DIR) {
      fs.mkdirSync(DL_DIR(), { recursive: true });
      targetPath = path.join(DL_DIR(), outName);
      fs.copyFileSync(tmpZip, targetPath);
    } else {
      const r = await dialog.showSaveDialog(win, {
        title: '保存转换结果', defaultPath: path.join(DL_DIR(), outName), buttonLabel: '保存',
      });
      if (!r || r.canceled || !r.filePath) return { ok: false, error: '已取消保存' };
      targetPath = r.filePath;
      fs.copyFileSync(tmpZip, targetPath);
    }
    shell.openPath(path.dirname(targetPath)).catch(() => {});
    return { ok: true, path: targetPath, log: result.log };
  } catch (err) {
    return { ok: false, error: String(err && err.message || err) };
  } finally {
    try { fs.rmSync(tmp, { recursive: true, force: true }); } catch (e) { }
  }
});

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 820,
    minWidth: 760,
    minHeight: 560,
    backgroundColor: '#0b0f15',
    title: 'MC工具箱',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      spellcheck: false,
      backgroundThrottling: false
    }
  });
  Menu.setApplicationMenu(null);
  win.loadFile(path.join(__dirname, 'assets', 'index.html'), { query: { syslocale: app.getLocale() } });
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http')) shell.openExternal(url);
    return { action: 'deny' };
  });
  // F11 全屏切换，适合投屏到电视/投影仪
  win.webContents.on('before-input-event', (e, input) => {
    if (input.type === 'keyDown' && (input.key === 'F11' || (input.key === 'Enter' && input.alt))) {
      win.setFullScreen(!win.isFullScreen());
      e.preventDefault();
    }
  });
  win.webContents.on('render-process-gone', (e, details) => {
    logCrash('RENDERER_GONE reason=' + details.reason + ' exitCode=' + details.exitCode);
    // 只在非主动关闭时自动重载一次，避免崩溃后一直白屏
    if (!win.isDestroyed() && details.reason !== 'clean-exit' && !reloadedAfterCrash) {
      reloadedAfterCrash = true;
      setTimeout(() => { try { win.reload(); } catch (err) { logCrash('RELOAD_FAIL ' + err); } }, 600);
    }
  });
  win.webContents.on('did-fail-load', (e, code, desc, url) => {
    logCrash('LOAD_FAIL ' + code + ' ' + desc + ' ' + url);
  });
  win.on('closed', () => { win = null; });
}

// 兜底：任何没走 IPC 的下载也要弹出另存为，别再静默丢文件
function installDownloadGuard() {
  session.defaultSession.on('will-download', async (e, item) => {
    if (item.getSavePath()) return;
    const fname = safeName(item.getFilename(), 'MC工具箱导出.bin');
    if (process.env.MCBOX_SAVE_DIR) {
      try {
        fs.mkdirSync(DL_DIR(), { recursive: true });
        item.setSavePath(path.join(DL_DIR(), fname));
      } catch (err) { logCrash('DL_DIR_FAIL ' + err); item.cancel(); }
      return;
    }
    try {
      const r = await dialog.showSaveDialog(win, {
        title: '保存文件',
        defaultPath: path.join(DL_DIR(), fname),
        buttonLabel: '保存',
      });
      if (!r || r.canceled || !r.filePath) { item.cancel(); return; }
      item.setSavePath(r.filePath);
    } catch (err) { item.cancel(); }
  });
}

app.whenReady().then(() => {
  installDownloadGuard();
  createWindow();
  globalShortcut.register('F11', () => { if (win) win.setFullScreen(!win.isFullScreen()); });
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});

app.on('will-quit', () => globalShortcut.unregisterAll());
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
