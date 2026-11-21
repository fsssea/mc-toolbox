# 更新日志

三个版本共用一条时间线；BUILD 号全局递增，界面级改动按版本标注。

## 6.3.3 · BUILD 80 · 2026-11-22

### 修复 · 经典版三端（安卓 / Windows / Linux）

- **英文代码视图补上自动换行**：上一版是「一行一字段、不换行」，世界名一长、byte 数组一长，手机上就得左右划着看，
  看着像一屏空白。现在按窗口宽度折行（`pre-wrap`），超长单词与数字也能断开，打开时从第一行看起，
  不再停在横向滚动的位置。
- 保存逻辑不变：仍按「类型 路径 = 值」解析，折行只影响显示，保存时按原文本重新编码成二进制 NBT 写回。

### 变更

- 经典版三端版本号 6.3.3 / BUILD 80（安卓 `versionCode 80`，Windows / Linux / deb 同步）。
- 三份发行包内 `assets/assets_app.js` 仍是同一个文件（md5 `c8997f90d8cb62fdef0c3e0d9b8e0a0e`）。

## 6.3.2 · BUILD 79 · 2026-11-22

### 新增 · 经典版三端（安卓 / Windows / Linux）

- **英文代码视图**：`level.dat` 这类存档核心数据不再只有十进制字节。新增视图把二进制里的 NBT 摊成
  `类型 路径 = 值` 的英文代码，`LevelName`、`GameType`、`Difficulty`、`GeneratorType`、`BiomeOverride`、
  `CenterMapsToOrigin`、`ConfirmedPlatformLockedContent`、`lastOpenedWithVersion`、`RandomSeed`、`Time`、出生点等
  全部明文可读可改。
- **保存即编码回二进制**：点「保存到存档」把改完的文本重新序列化成 NBT，`level.dat` 保留原有 8 字节头与长度字段；
  再「导出存档」生成新包。桌面端保存前照旧自动备份整包。
- **写错不闷头写坏**：报了哪一行、错在哪都直接说清 —— 数值超范围（byte 只能 0–255 等）、字符串没带双引号、
  路径或类型被改、数组写成非数字，都会拦下来。
- **db 下非 NBT 文件**：`.ldb / .log` 改为按 `0x` 偏移列出文件里的英文串，引号内的文字可就地改，保存时按偏移拼回字节。
- 入口两处：`level.dat` 表单里的「英文代码（可改后保存）」、字节编辑器里的「英文代码（可改）」；两种视图可来回切。

### 变更

- 经典版三端版本号统一 6.3.2 / BUILD 79（安卓 `versionCode 79`，Windows / Linux / deb 的 `resources/app` 同步）。
- 三份发行包内的 `assets/assets_app.js` 是同一个文件，md5 一致。

## 6.3.1 · BUILD 78 · 2026-11-22

### 修复 · 经典版 Windows / Linux（与安卓同源的两个 bug）

- **db 文件夹点哪个文件都显示 .log 的内容**：桌面两端此前没有同步安卓 BUILD 77 的修复（Windows 包与 Linux 包里的
  `assets_app.js` 与安卓 77 前版本同 md5），点 db 下任意文件照样进「LevelDB 合并查看器」。现改为按文件自身字节打开。
- **更严重：导出提示「已导出」，文件却没落盘**。Electron 里既没有 `will-download` 处理，页面 blob 下载也被丢弃，
  所以整包导出、单文件下载全部静默丢失。改为 preload + 主进程异步 IPC：走系统「另存为」对话框写盘，成功回报真实路径，
  取消/失败都明确报错；另加 `will-download` 兜底，避免任何下载再次静默消失。

### 新增 · 桌面端

- db 下所有文件（含 `level.dat`）支持十进制字节查看与编辑（0–255 / `0x` 均可，大文件 4KB 分页），改完「保存到存档」再「导出存档」。
- **保存前自动备份整包**：写到用户数据目录 `backups/`，保留最近 12 份，备份路径直接出现在日志里。
- **拖拽打开**：把 `.mcworld` / `.mcaddon` / `.mctemplate` 拖进窗口即打开，省掉「选择文件」。
- db 文件夹与字节编辑器两处都带谨慎提示：db 是存档最重要的数据文件夹，别随便改。

### 变更

- 经典版桌面端版本号 6.3.0 → 6.3.1（Windows `resources/app`、Linux `resources/app`、deb `opt/mctoolbox` 三处同步）。
- 安卓端维持 6.3.0 / BUILD 77（db 修复此前已发布），本次不改 APK。

## 6.3.0 · BUILD 77 · 2026-11-22

### 修复 · 经典版（安卓 / 网页同源界面）

- **db 文件夹里点任何文件，看到的都是同一份 ".log 的内容"。** 根因在文件打开的分发逻辑：只要路径命中
  `db/CURRENT`、`MANIFEST-*`、`*.ldb / *.log / *.sst`，就一律转给「LevelDB 查看器」；那个查看器先把 db 里所有文件
  合并成一个库再列键，所以点哪个文件都是同一团合并数据，看起来就像永远只有 `.log`。
  改为按**该文件自己的字节**打开，各文件内容不再串。

### 新增 · db / level.dat 字节级查看与编辑

- db 下所有文件（含 `level.dat`）支持原始字节查看：按十进制逐字节列出，可直接编辑（接受 0–255 与 `0x` 十六进制），
  点「保存到存档」写回包内，需再「导出存档」生成新包。
- 大文件按 4KB 分页编辑，改完逐页合并写回；每页附十六进制预览。
- `level.dat` 保留原 NBT 表单，另加「原始数据（十进制编辑）」入口。
- 原「LevelDB 查看器」保留为独立入口（db 文件夹与字节编辑器内均可进入），用于合并视角查看。
- 谨慎提示：db 文件夹与字节编辑器两处均标注「db 文件夹是存档最重要的数据文件夹，请勿随便修改，随便修改可能导致存档报废」，
  并提示先「导出存档」备份。

### 变更

- 经典版 APK：`versionCode` 76 → 77（同签名可覆盖升级）。

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
