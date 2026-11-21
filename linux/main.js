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
