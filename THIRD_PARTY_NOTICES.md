# 第三方组件与许可

本项目以 MIT 许可开源。当前发布物内嵌第三方汉化子应用 **tianji-turn-addon**，其许可为 MIT，允许复制、修改、再发布，前提是保留版权声明与许可文本。

## tianji-turn-addon（附加包汉化子应用）

- 上游：https://github.com/zanesu154-rgb/tianji-turn-addon
- 作者：zanesu154-rgb（B 站「天际译栈_栈主」，UID 3546733697043003）
- 固定版本：`f2c3165`，2026-11-21（页面版本 `v2026.11.21-90`）
- 许可：MIT，完整文本见 `assets/i18n/LICENSE`
- 位置：`assets/i18n/`；入口 `assets/js/addon-i18n.js` 以 iframe 打开 `assets/i18n/index.html`

本项目对上游的改动仅限运行环境适配：

- `vendor/json5.min.js` 本地化，移除 CDN 的 JSON5 与访问计数脚本，保证纯离线；
- `loader.js`：按上游顺序加载脚本并自动重试（应对静态托管偶发 503），内置安卓 WebView 原生保存、iframe 父页转发、桌面浏览器下载兜底；
- `override.css`：隐藏推广/计数元素，适配 iframe 与移动端；
- `app.js` 的 `downloadBlob` 增加 `window.__mctSave` 分支，用于接入上述下载桥。

汉化提取、脚本处理、世界存档、JSON UI 等逻辑均来自上游，未改写为核心算法。上游的 `README.md`、`CHANGELOG.md`、`LICENSE` 随代码一并保留。

## 前端依赖（随 tianji-turn-addon 提供）

- **JSZip** — MIT，`assets/i18n/vendor/jszip.min.js`，许可见 `vendor/jszip.LICENSE.markdown`
- **JSON5** — MIT，`assets/i18n/vendor/json5.min.js`
- **Acorn** — MIT，`assets/i18n/vendor/acorn.js`，许可见 `vendor/acorn.LICENSE`



## Chunker（存档转换 CLI）

- 上游：https://github.com/HiveGamesOSS/Chunker
- 固定版本：`1.21.0`，许可 **MIT**
- 位置：Android `assets/chunker/cli.jar`；桌面端 `resources/app/chunker/chunker-cli/`
- 用途：基岩版 ⇄ Java 版完整存档转换；不包含实体/玩家背包转换
- 许可文本：`chunker/legal/CHUNKER_MIT.txt`

## OpenJDK 17 运行时

- Android 64 位：来自 ChunkoidNG `assets/rootfs.zip` 内的 OpenJDK 17（aarch64）
- Android 32 位：来自 `ArtRuntime/openjdk-android-hostcraft` release `openjdk-2026.11.01-0456` 的 `jre-17-arm.tar.xz`
- 许可：GPLv2 + Classpath Exception
- 位置：Android `assets/chunker/arm64.zip` / `arm32.zip`
- 许可文本：`chunker/legal/OPENJDK_*.txt`

## ChunkoidNG

- 上游：https://github.com/Dicecan/ChunkoidNG
- 只参考其 Android 运行时启动方式（`/system/bin/linker(64)` + 内置 CLI）；**未复制其 GPLv3 Kotlin/Compose 源码**

## 字体与图标

应用图标为本项目自制。界面使用系统字体，不内嵌第三方字体。

## 历史说明

1.0.0 早期构建曾内嵌同一上游项目，后因许可文件缺失、文档表述不准确而短暂移除。本次重新接入已补齐 `LICENSE`，并在 README 与本文件中明确标注来源、版本与改动范围。
