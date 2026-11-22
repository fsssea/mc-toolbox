
## 官网与下载

- 官网：https://fsssea.github.io/mc-toolbox/
- 网页版：https://fsssea.github.io/mc-toolbox/app/
- **反馈中心（报 bug / 提建议的唯一官方入口）**：https://fsssea.github.io/mc-toolbox/feedback/
- 漏洞看板：https://fsssea.github.io/mc-toolbox/feedback/#board
- 漏洞档案：`https://fsssea.github.io/mc-toolbox/feedback/bug-N/`（第一条反馈为 BUG-1，编号固定不变；每条记录标注六种状态之一 ——「重要 · 待修 / 病又复发了 / 正在修复 / 已修复 / 设计的特性 / 不存在的漏洞」——以及受影响版本区间与修复版本）

漏洞数据在 `feedback/bugs.json`，页面由 `feedback/tools/gen_bugs.py` 生成：登记一条新漏洞 → 改 JSON → 跑脚本 → 提交 `feedback/bug-N/index.html`。
- 下载：https://github.com/fsssea/mc-toolbox/releases

> **语言 / Language**：官网与反馈站支持 简体中文 · 繁體中文 · English · 日本語 · 한국어，默认跟随系统语言，页面右上角可手动切换（也可用 `?lang=en` 这类参数固定语言）。
> [简体中文](https://fsssea.github.io/mc-toolbox/?lang=zh-Hans) · [繁體中文](https://fsssea.github.io/mc-toolbox/?lang=zh-Hant) · [English](https://fsssea.github.io/mc-toolbox/?lang=en) · [日本語](https://fsssea.github.io/mc-toolbox/?lang=ja) · [한국어](https://fsssea.github.io/mc-toolbox/?lang=ko)

![Verify](https://github.com/fsssea/mc-toolbox/actions/workflows/verify.yml/badge.svg)

# MC工具箱 1.0.0（正式版）

## 经典版 × 三端（1.0.0 / BUILD 1）

| 版本 | Android | Windows | Linux | 内核源码 |
| --- | --- | --- | --- | --- |
| 经典版 · `com.doubao.mctoolbox` | [APK](https://fsssea.github.io/mc-toolbox/dl/MC-Toolbox-Classic-1.0.0-android.apk) | [ZIP](https://fsssea.github.io/mc-toolbox/dl/MC-Toolbox-Windows-1.0.0.zip) | [TAR.GZ](https://fsssea.github.io/mc-toolbox/dl/MC-Toolbox-Linux-1.0.0.tar.gz) · [DEB](https://fsssea.github.io/mc-toolbox/dl/MC-Toolbox-Linux-1.0.0.deb) | `assets_app.js`（JS） |

1.0.0 是**第一个公开发布的版本**。此前的内部迭代没有对外发布、没有公开测试，仓库历史里保留为内部记录；
对外公开版本号从 1.0.0 起算，官网、本文档与安装包统一使用 1.0.0。

JAVA 重制版（`com.mctoolbox.java`）与 C++ 重制版（`com.mctoolbox.cpp`）仍在内部开发，
**暂不对外发布**，因此不在下载表中提供链接。三个 `applicationId` 互不相同，日后正式发布时可同机共存。


一个完全离线的 Minecraft 工具箱：安卓 APK（WebView + Java 桥）、Windows / Linux Electron 桌面版、网页 PWA，同一套前端。

## 功能

- 附加包 / 地图 / 皮肤 / 披风 / 结构 / 存档浏览与编辑
- 基岩版存档互转、Java NBT / region 读写、附加包 ⇄ 模组转换
- 附加包汉化（内核来自 tianji-turn-addon，MIT；下载走系统「下载/MC工具箱」，WebView 内由 Java 桥落盘）
- `@minecraft/server` 与 `@minecraft/server-ui` 脚本模拟器
- 离线 Script API 文档与脚本体检器
- 英文代码视图：`level.dat` 的 NBT 摊成「类型 路径 = 值」明文，保存自动编码回二进制
- 长字段自动换行：超长世界名与 byte 数组按窗口宽度折行，手机端无需横向拖动
- db 文件级编辑：非 NBT 文件按 0x 偏移列出英文串，支持十进制字节就地编辑与 4KB 分页
- 代码编辑器：行号、当前行、行列状态、语法高亮、自动换行开关（只影响显示）
- 主题、语言跟随系统；投屏全屏；键鼠快捷键；按钮音效
- 安卓应用专属目录 `/storage/emulated/0/Android/data/com.doubao.mctoolbox/`
- 网页版支持安装到桌面与离线缓存（HTTPS 或 localhost）

## 更新日志

见 [CHANGELOG.md](CHANGELOG.md)：1.0.0 是首个公开发布版本，把存档 `level.dat` 的 NBT 摊成「类型 路径 = 值」的英文代码（保存自动编码回二进制）、给英文代码视图加上长字段自动换行（手机上不用横拖）、并让 db 里的非 NBT 文件按 0x 偏移看英文串、按十进制字节就地编辑，改前自动备份整包。

## 目录

```
index.html / style.css / assets_app.js   主界面（打包后位于 assets/）
assets/                                  Web 前端、汉化子应用、离线依赖
src/                                     前端模块源码
android/                                 AndroidManifest、Java 桥、资源（经典版）
kernel/cpp/                              C++ 内核（自写 inflate/deflate、zip、brarchive、converter、CLI、GTK 界面）
kernel/java/mct/                         Java 内核（Brarchive / Converter / Tool / Gui）
kernel/android/                          JAVA / C++ 两版安卓端工程 + build-android.sh
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

## 回归测试

```bash
cd tests
npm install
npx playwright install chromium
npm test
```

覆盖 12 种视口、连续打开与旋转、弹窗边界和 viewport / WebView 静态规则。每个修过的布局问题都应补一条用例，详见 `tests/README.md`。

## 许可

MIT，见 `LICENSE`。第三方组件与署名见 `THIRD_PARTY_NOTICES.md`。

注意：仓库不包含正式签名密钥。发布版签名请使用你自己的 keystore，并妥善保管。
