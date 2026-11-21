# 更新日志

三个版本共用一条时间线；BUILD 号全局递增，界面级改动按版本标注。

## 6.3.0 · BUILD 76 · 2026-11-21

### 修复 · 网页版（与安卓同源问题）

- **网页版「附加包汉化」的下载按钮同样点了没反应。** 网页版的汉化页是在 `app/i18n/` 里以 iframe 打开的，
  上一轮只修了 APK 内的 `assets/`，站点侧两处病灶都在：`app/i18n/index.html` 仍是那行写坏的 `<script>` 标签，
  站点上压根没有 `bridge.js`（404）。且 `app/js/addon-i18n.js` 的 `message` 监听只在存在 `AndroidBridge` 时才处理，
  浏览器里收到 `mc-i18n-save-b64` 直接丢弃，iframe 里的下载也常被浏览器拦住。
- 修法：`app/i18n/index.html` 标签修正 + 补 `bridge.js`；`addon-i18n.js` 增加浏览器落盘路径
  （base64 → Blob → 顶层文档 `<a download>`，兼容 `msSaveOrOpenBlob`，iOS 额外给出「去『文件』App 找」提示），
  且消息只接受本 iframe 来源。
- 实测（Playwright，同一份 `Baku投掷飞盘-1.2-伤害调整.mcaddon`）：桌面 Chromium 1440×900、Android Pixel 5、iPhone 13 三种环境，
  点 `Download converted file` 均触发真实下载，得到 `..._i18n.mcaddon` 33,101 B / 55 个条目 / 含 `zh_CN.lang`，页面无报错。

### 变更

- 经典版 APK 资源随网页端修复同步，`versionCode` 75 → 76（同签名可直接覆盖升级）。

## 6.3.0 · BUILD 75 · 2026-11-21

### 修复 · 安卓（经典版）

- **「附加包汉化」里点「下载转换后文件」没有任何反应。** 根因是 `assets/i18n/index.html` 一行 `<script>` 标签被写坏
  （`<script src="app.js"` 换行后紧跟 `<script src="bridge.js"></script>>`），HTML 解析后 `bridge.js` 从未加载，
  按钮只剩 WebView 不支持的 `blob:` 下载路径，于是点了像没点。
  修法：标签修正为两行；重写 `bridge.js`（幂等安装 + 三级兜底：原生桥 `AndroidBridge.saveBinary` → iframe `postMessage` 转发 → 桌面回落 `downloadBlob`）；
  `MainActivity` 增加 `DownloadListener`，`Bridge.saveBinary` 改写进 `MediaStore` 的 `Download/MC工具箱` 并弹提示；同时清掉第三方代码残留的推广按钮与访问计数。

### 新增 · C++ 版

- **Windows 原生界面 `mctool-gui.exe`**（纯 Win32 自绘深色主题，非 GTK 移植）：批量队列、2/4/8 线程并行、6 个勾选项、
  进度条与中文日志；支持「右键 → 用 MC工具箱 打开」带包自动启动。与静态 CLI 一起打进 Windows ZIP。
  Wine 实测三个真实包（371 / 208 / 2 条目）253 ms 完成，解包再打包 `sha256` 与原包一致。

### 变更

- 经典版 `versionCode` 74 → 75；签名沿用 `mctoolbox-android.keystore`（旧密钥已丢失，装过旧版需先卸载）。

## 6.3.0 · BUILD 74 · 2026-11-21

- 经典版 APK 用同一套 `build.sh` 重打，代码编辑器加「自动换行」开关（仅显示层折行，保存内容不变）。
- 官网与网页版同步上线换行开关；经典版内嵌的 `assets/index.html` 与网页版共用 `editor-wrap.js`。

## 6.3.0 · BUILD 73 · 2026-11-21

- JAVA 重制版、C++ 重制版安卓端补齐：`com.mctoolbox.java`（内核类进 dex）、`com.mctoolbox.cpp`（三 ABI `libmct.so` + JNI）。
- C++ 内核换成自写 `inflate`/`deflate`/`zip`/`brarchive`，与 Java、JS 三套独立实现跨语言比对 18/18 一致。
