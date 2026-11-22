
## 官网与下载

- 官网：https://fsssea.github.io/mc-toolbox/
- **哔哩哔哩唯一官方账号**：[@一只想飞的巨型大嘴花](https://space.bilibili.com/3546753368329112/)（space id `3546753368329112`，唯一发布渠道，同名账号均非官方）
- **基岩版好友**：`PopTurtle539570`（创始人一号，好友申请默认接受）
- 网页版：https://fsssea.github.io/mc-toolbox/app/
- **反馈中心（报 bug / 提建议的唯一官方入口）**：https://fsssea.github.io/mc-toolbox/feedback/
- 漏洞看板：https://fsssea.github.io/mc-toolbox/feedback/#board
- 漏洞档案：`https://fsssea.github.io/mc-toolbox/feedback/bug-N/`（第一条反馈为 BUG-1，编号固定不变；每条记录标注六种状态之一 ——「重要 · 待修 / 病又复发了 / 正在修复 / 已修复 / 设计的特性 / 不存在的漏洞」——以及受影响版本区间与修复版本）

- **管理台（管理员定级 / 席位名册）**：https://fsssea.github.io/mc-toolbox/feedback/admin/

漏洞数据在 `feedback/bugs.json`，页面由 `feedback/tools/gen_bugs.py` 生成：登记一条新漏洞 → 改 JSON → 跑脚本 → 提交 `feedback/bug-N/index.html`。

新提交的漏洞先处于「待定 · 等待定级」这一预状态，由管理员从六种正式状态里定级后才进入看板排序。

### 管理员体系（席位制 · 提案制）

- 名册与规则写在 `feedback/admins.json`：`seats: 10`、`wrong_call_limit: 10`、两位创始人为最高管理员（不占席位）。两位创始人目前共用同一个 GitHub 账号 `@fsssea`（没有多余的第二个账号），提案正文以 `F1` / `F2` 署名区分身份。
- 反馈站开放注册后**前 10 位通过审核的申请者**获得管理员权限；申请与定级都通过 GitHub Issue 提案（`admin-request` / `status-vote` / `admin-strike` / `admin-revoke`），由创始人复核后改写 `admins.json` 生效。
- 管理员唯一的权力是把「待定」漏洞定级为六种状态之一，并写明依据；不能下架、不能改标题、不能封人。
- 定级被创始人驳回一次记 1 次误判，**超过 10 次（第 11 次起）永久取消管理员权限**，不可重新申请；席位撤销后不回收、不补位，名册公开可复核。
- 站点是纯静态页，没有后端与登录，页面只负责登记与生成提案，**不会伪造登录或权限**。
- 下载：https://github.com/fsssea/mc-toolbox/releases

> **语言 / Language**：官网与反馈站支持 简体中文 · 繁體中文 · English · 日本語 · 한국어，默认跟随系统语言，页面右上角可手动切换（也可用 `?lang=en` 这类参数固定语言）。
> [简体中文](https://fsssea.github.io/mc-toolbox/?lang=zh-Hans) · [繁體中文](https://fsssea.github.io/mc-toolbox/?lang=zh-Hant) · [English](https://fsssea.github.io/mc-toolbox/?lang=en) · [日本語](https://fsssea.github.io/mc-toolbox/?lang=ja) · [한국어](https://fsssea.github.io/mc-toolbox/?lang=ko)

![Verify](https://github.com/fsssea/mc-toolbox/actions/workflows/verify.yml/badge.svg)

# MC工具箱 1.1.0（测试构建）

## 经典版 × 三端（1.1.0 / BUILD 2）

| 版本 | Android | Windows | Linux | 内核源码 |
| --- | --- | --- | --- | --- |
| 经典版 · `com.doubao.mctoolbox` | [APK](https://aka.doubaocdn.com/s/u7M8FHhv6p) | [ZIP](https://aka.doubaocdn.com/s/GABLGwit3r) | [TAR.GZ](https://aka.doubaocdn.com/s/SylSCWfppc) · [DEB](https://aka.doubaocdn.com/s/EHjZY8JEms) | `assets_app.js`（JS） |

1.1.0 是**本周的测试构建**，不对外宣布“正式版”；版本号从 1.0.0 正式向上递增。
三端新增 Chunker 1.21.0 完整存档转换（基岩 ⇄ Java），Android 同时支持 32 / 64 位。

CDN 直链失效时，使用 [GitHub Pages 长期分卷镜像](https://fsssea.github.io/mc-toolbox/dl/1.1.0/)；Windows / Linux 需下载两个分卷并运行合并脚本，校验值见该页。

JAVA 重制版（`com.mctoolbox.java`）与 C++ 重制版（`com.mctoolbox.cpp`）仍在内部开发，
**暂不对外发布**，因此不在下载表中提供链接。三个 `applicationId` 互不相同，日后正式发布时可同机共存。


一个完全离线的 Minecraft 工具箱：安卓 APK（WebView + Java 桥）、Windows / Linux Electron 桌面版、网页 PWA，同一套前端。

## 功能

- 附加包 / 地图 / 皮肤 / 披风 / 结构 / 存档浏览与编辑
- 基岩版存档互转、Java NBT / region 读写、附加包 ⇄ 模组转换
- 附加包汉化（内嵌 `tianji-turn-addon` 最新版：`.lang`、JSON UI、脚本硬编码、运行时翻译与世界存档，离线运行）
- `@minecraft/server` 与 `@minecraft/server-ui` 脚本模拟器
- 离线 Script API 文档与脚本体检器
- 英文代码视图：`level.dat` 的 NBT 摊成「类型 路径 = 值」明文，保存自动编码回二进制
- `.mcstructure` 四视图：切片可视化、原二进制位、十进制字节、十六进制字节、纯英文代码；字节视图 4KB 分页，写入只改当前页，支持保存回包与导出
- 长字段自动换行：超长世界名与 byte 数组按窗口宽度折行，手机端无需横向拖动
- db 文件级编辑：非 NBT 文件按 0x 偏移列出英文串，支持十进制字节就地编辑与 4KB 分页
- 代码编辑器：行号、当前行、行列状态、语法高亮、自动换行开关（只影响显示）
- 主题、语言跟随系统；投屏全屏；键鼠快捷键；按钮音效
- 安卓应用专属目录 `/storage/emulated/0/Android/data/com.doubao.mctoolbox/`
- 网页版支持安装到桌面与离线缓存（HTTPS 或 localhost）

## 更新日志

见 [CHANGELOG.md](CHANGELOG.md)：1.0.0 是首个公开发布版本，把存档 `level.dat` 的 NBT 摊成「类型 路径 = 值」的英文代码（保存自动编码回二进制）、给英文代码视图加上长字段自动换行（手机上不用横拖）、并让 db 里的非 NBT 文件按 0x 偏移看英文串、按十进制字节就地编辑，改前自动备份整包。2026-11-22 修订为 `.mcstructure` 增加原二进制、十进制、十六进制、纯英文代码四种编辑模式；1.1.0 再接入 Chunker 完整转换。

## 目录

```
index.html / style.css / assets_app.js   主界面（打包后位于 assets/）
assets/                                  Web 前端、离线依赖
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

## 汉化实现方式

「附加包汉化」由上游开源项目 **tianji-turn-addon** 提供，本项目只做嵌入与离线适配，不声称自研：

- 上游：https://github.com/zanesu154-rgb/tianji-turn-addon
- 作者：B 站「天际译栈_栈主」（GitHub `zanesu154-rgb`）
- 固定版本：`f2c3165`（2026-11-21，页面版本 `v2026.11.21-90`）
- 许可：MIT，完整文本见 `assets/i18n/LICENSE`

代码位置与入口：

1. `assets/i18n/` 是上游的完整副本，保留其 `README.md`、`CHANGELOG.md`、`LICENSE` 与源码结构。
2. 主界面「附加包汉化」按钮由 `assets/js/addon-i18n.js` 接管，以全屏 iframe 打开 `assets/i18n/index.html`。
3. 上游能力原样保留：`.lang` 提取与补全、JSON UI、脚本硬编码、运行时翻译、世界存档 NBT / LevelDB、人工翻译编辑器等。

本项目对上游做的运行环境适配（均不改变汉化逻辑）：

- 把 JSON5 从 CDN 改成本地 `vendor/json5.min.js`，去掉访问计数与赞助图联网请求，保证离线可用；
- 增加 `loader.js`：按上游顺序并发取回并重试脚本（躲开 GitHub Pages 偶发 503），内置安卓 `AndroidBridge.saveBinary` / iframe 父页转发 / 浏览器 `<a download>` 下载适配；
- 增加 `override.css`：隐藏推广/计数元素，适配 iframe 与手机窄屏；
- `app.js` 的 `downloadBlob` 增加 `window.__mctSave` 分支，接入上面的下载适配。

上游更新时，直接用它覆盖 `assets/i18n/`，再把上述四处适配重新打上即可。不要把上游代码说成本项目自研。

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
