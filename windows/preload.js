// MC工具箱 桌面端桥接：把网页里的「导出 / 另存为」「自动备份」接到主进程
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('McDesktop', {
  platform: process.platform,
  // 系统「另存为」对话框 + 写盘（异步，不阻塞界面）；返回 {ok, path} 或 {ok:false, error}
  saveBinary: (name, base64) => ipcRenderer.invoke('mc:save-binary', String(name || ''), String(base64 || '')),
  // 静默备份到 用户数据目录/backups（保留最近 12 份）；返回 {ok, path} 或 {ok:false, error}
  backup: (name, base64) => ipcRenderer.invoke('mc:backup', String(name || ''), String(base64 || '')),
  isDesktop: true,
});
