# MC工具箱 6.2.0

一个完全离线的 Minecraft 工具箱：安卓 APK（WebView + Java 桥）、Windows / Linux Electron 桌面版、网页 PWA，同一套前端。

## 功能

- 附加包 / 地图 / 皮肤 / 披风 / 结构 / 存档浏览与编辑
- 基岩版存档互转、Java NBT / region 读写、附加包 ⇄ 模组转换
- 附加包汉化（内核来自 tianji-turn-addon，MIT）
- `@minecraft/server` 与 `@minecraft/server-ui` 脚本模拟器
- 离线 Script API 文档与脚本体检器
- 代码编辑器：行号、当前行、行列状态、语法高亮
- 主题、语言跟随系统；投屏全屏；键鼠快捷键；按钮音效
- 安卓应用专属目录 `/storage/emulated/0/Android/data/com.doubao.mctoolbox/`
- 网页版支持安装到桌面与离线缓存（HTTPS 或 localhost）

## 目录

```
index.html / style.css / assets_app.js   主界面（打包后位于 assets/）
assets/                                  Web 前端、汉化子应用、离线依赖
src/                                     前端模块源码
android/                                 AndroidManifest、Java 桥、资源
build.sh                                 Android 构建
windows/                                 Electron 主进程与打包脚本
linux/                                   Linux Electron 打包脚本
```

## 构建 Android

```bash
export JAVA_HOME=/path/to/jdk-17
export ANDROID_SDK=/path/to/android-sdk
export MCBE_KEYSTORE=/path/to/your.keystore   # 可选；不填则生成临时调试签名
bash build.sh
```

要求 build-tools 34.0.0、platforms/android-35。产物为 `MCBE工具箱.apk`。

## 构建 Linux

```bash
cd linux
npm install
npm start     # 开发运行
npm run dist  # 生成 dist/ 下的 Linux 包
```

## 构建 Windows

```bash
cd windows
npm install
npm start     # 开发运行
npm run dist  # 生成 dist/ 下的 Windows 包
```

`npm run sync` 会把根目录 `assets/` 同步进 `windows/assets/` 或 `linux/assets/`。

## 网页版 / PWA

把 `assets/` 作为静态站点根目录部署即可；`assets/sw.js` 是构建时生成的离线缓存清单。PWA 安装与 Service Worker 需要 HTTPS 或 localhost。

## 汉化子应用的移植方式

1. 阅读上游源码与测试，确认依赖为 JSZip、JSON5、acorn 与经典脚本。
2. 复制到 `assets/i18n/`，先把 CDN 依赖换成本地 `vendor/`，去掉统计脚本。
3. 修复 WebView 不兼容：用 `bridge.js` 覆写下载逻辑，安卓走 `AndroidBridge.saveBinary`，浏览器保留 Blob 下载；另加 base64 回退。
4. 父页面用全屏 iframe 浮层接入，保留原按钮 id 以兼容压缩 bundle 的硬绑定，并拦截旧点击。
5. 补移动端样式、返回键关闭、保存结果 toast，并跑上游测试与离线加载测试。

## 许可

MIT，见 `LICENSE`。第三方组件与署名见 `THIRD_PARTY_NOTICES.md`。

注意：仓库不包含正式签名密钥。发布版签名请使用你自己的 keystore，并妥善保管。
