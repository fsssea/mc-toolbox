// 把根目录的 Web 前端同步到 Electron 的 assets/
const fs = require('fs');
const path = require('path');
const src = path.join(__dirname, '..', 'assets');
const dst = path.join(__dirname, 'assets');
fs.rmSync(dst, { recursive: true, force: true });
fs.cpSync(src, dst, { recursive: true });
console.log('已同步 assets:', dst);
