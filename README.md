
## 官网与下载

- 官网：https://fsssea.github.io/mc-toolbox/
- 网页版：https://fsssea.github.io/mc-toolbox/app/
- 下载：https://github.com/fsssea/mc-toolbox/releases

![Verify](https://github.com/fsssea/mc-toolbox/actions/workflows/verify.yml/badge.svg)

# MC工具箱 6.3.2

## 三版本 × 三端（6.3.2 / BUILD 79）

| 版本 | Android | Windows | Linux | 内核源码 |
| --- | --- | --- | --- | --- |
| 经典版 · `com.doubao.mctoolbox` | [APK](https://fsssea.github.io/mc-toolbox/dl/MC-Toolbox-Classic-6.3.2-android.apk) | [ZIP](https://fsssea.github.io/mc-toolbox/dl/MC-Toolbox-Windows-6.3.2.zip) | [TAR.GZ](https://fsssea.github.io/mc-toolbox/dl/MC-Toolbox-Linux-6.3.2.tar.gz) · [DEB](https://fsssea.github.io/mc-toolbox/dl/MC-Toolbox-Linux-6.3.2.deb) | `assets_app.js`（JS） |
| JAVA 重制版 · `com.mctoolbox.java` | [APK](https://fsssea.github.io/mc-toolbox/dl/MC-Toolbox-Java-6.3.0-android.apk) | [ZIP](https://fsssea.github.io/mc-toolbox/dl/MC-Toolbox-Java-Windows-6.3.0.zip) | [TAR.GZ](https://fsssea.github.io/mc-toolbox/dl/MC-Toolbox-Java-Linux-6.3.0.tar.gz) · [JAR](https://fsssea.github.io/mc-toolbox/dl/MC-Toolbox-Java-6.3.0.jar) | `kernel/java` |
| C++ 重制版 · `com.mctoolbox.cpp` | [APK](https://fsssea.github.io/mc-toolbox/dl/MC-Toolbox-Cpp-6.3.0-android.apk) | [ZIP](https://fsssea.github.io/mc-toolbox/dl/MC-Toolbox-Cpp-Windows-6.3.0.zip) | [TAR.GZ](https://fsssea.github.io/mc-toolbox/dl/MC-Toolbox-Cpp-Linux-6.3.0.tar.gz) | `kernel/cpp` |

三个 `applicationId` 互不相同，可同机共存；三套内核是各自独立重写的实现（格式规范参照公开的 brarchive 说明，未复制任何第三方应用源码），
产出的 `.brarchive` / `.mcaddon` 逐字节一致，互相都能解开。C++ 版最强：自写 inflate/deflate、Windows 原生深色界面 + Linux GTK 界面、批量并行；安卓端同样带批量并行。


一个完全离线的 Minecraft 工具箱：安卓 APK（WebView + Java 桥）、Windows / Linux Electron 桌面版、网页 PWA，同一套前端。

## 功能

- 附加包 / 地图 / 皮肤 / 披风 / 结构 / 存档浏览与编辑
- 基岩版存档互转、Java NBT / region 读写、附加包 ⇄ 模组转换
- 附加包汉化（内核来自 tianji-turn-addon，MIT；下载走系统「下载/MC工具箱」，WebView 内由 Java 桥落盘）
- `@minecraft/server` 与 `@minecraft/server-ui` 脚本模拟器
- 离线 Script API 文档与脚本体检器
- 代码编辑器：行号、当前行、行列状态、语法高亮、自动换行开关（只影响显示）
- 主题、语言跟随系统；投屏全屏；键鼠快捷键；按钮音效
- 安卓应用专属目录 `/storage/emulated/0/Android/data/com.doubao.mctoolbox/`
- 网页版支持安装到桌面与离线缓存（HTTPS 或 localhost）

## 更新日志

见 [CHANGELOG.md](CHANGELOG.md)：`6.3.2 · BUILD 79` 给经典版三端加上「英文代码视图」（把 level.dat 的 NBT 翻成英文代码改，保存自动编码回二进制）；`6.3.1 · BUILD 78` 修好经典版 Windows / Linux 两端「db 点哪个文件都显示 .log」和「导出提示成功但文件没落盘」两个同源 bug，并给桌面端补上十进制字节编辑、保存前自动备份、拖拽打开；`6.3.0 · BUILD 77` 修好了汉化工具「下载」点了没反应（安卓与网页端同源问题），补上 C++ 版 Windows 原生界面；并修好 db 文件夹「点哪个文件都显示 .log」的问题，db / level.dat 现在能按十进制字节查看与编辑。

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
