const { app, BrowserWindow, Menu, shell, screen, globalShortcut } = require('electron');
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

process.on('uncaughtException', (err) => {
  logCrash('UNCAUGHT ' + (err && err.stack || err));
});
process.on('unhandledRejection', (r) => {
  logCrash('UNHANDLED ' + (r && r.stack || r));
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
      contextIsolation: true,
      nodeIntegration: false,
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

app.whenReady().then(() => {
  createWindow();
  globalShortcut.register('F11', () => { if (win) win.setFullScreen(!win.isFullScreen()); });
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});

app.on('will-quit', () => globalShortcut.unregisterAll());
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
