# 更新日志

对外公开版本统一从 **1.0.0** 起算。此前的编号只用于内部迭代，没有公开下载、没有对外测试，
也不再作为发布版本对外使用；如需追溯内部改动，可查看仓库的 git 历史。

## 1.1.0 · Chunker 1.21.0 完整存档转换（测试构建，未发布正式版，2026-11-22）

### 变更

- 接入 **Chunker 1.21.0**（MIT，HiveGamesOSS）完整存档转换，基岩版 ⇄ Java 双方向；
  不再只是此前的“地形层”近似转换。目标格式可在界面选择 Java 1.21.11 / 1.21.4 / 1.20.6 /
  1.19.2 / 1.16.5，以及基岩 1.26.50 / 1.21.130 / 1.21.50。
- 转换器在本地执行，不上传存档。桌面端内置 Chunker 原生 CLI（Windows x86 / Linux x64），
  不依赖系统 Java；Android 端内置 **两套 OpenJDK 17**，按设备 ABI 自动选择：
  `arm64-v8a` 用 64 位，`armeabi-v7a` 用 32 位，**32 位 Android 也能跑**。
- Android 端按 Android 10+ 的限制，使用 `/system/bin/linker(64)` 载入应用私有目录内的
  `java`，与 ChunkoidNG 的启动方式一致；首次转换时解压内置运行时，之后复用。
- 网页端仍保留原有“地形层”转换，不强行加载 100 MB 级运行时；完整转换只在 Android /
  Windows / Linux 客户端提供。
- 版本号从 `1.0.0 / BUILD 1` 升到 **`1.1.0 / BUILD 2`**，Android `versionCode 81`；
  这是本周的测试构建，不对外宣布“正式版”。
- 新增 Chunker / OpenJDK 许可文本，随安装包分发；没有复制 ChunkoidNG 的 GPLv3 Compose 界面代码。

### 说明

- Chunker 本身不转换实体与玩家背包；界面里已明确标注。实体流水线在 ChunkoidNG 里是 GPLv3
  Kotlin 代码，本次为守住 MIT 许可没有复制，后续若要补需要自研重写或单独处理许可。
- 真实样本验证：Chunker 测试世界的 `JAVA_1_20_5.zip → BEDROCK_1_26_50` 与
  `BEDROCK_R20_80.zip → JAVA_1_21_11` 均在本机跑通；32 位 Android 只做了运行时/依赖静态核对，
  尚未在真实 32 位设备上执行，首次安装后请先用一个小存档试转。

## 未发布修订 · `.mcstructure` 四视图编辑（2026-11-22）

### 变更

- `.mcstructure` 编辑器保留原有的切片 / 调色板可视化编辑，并在顶部加入四种正式模式：
  **原二进制位、十进制字节、十六进制字节、纯英文代码**。
- 字节视图按 **4KB 分页**，只显示当前页；写入只合并当前页，未改动的其它字节原样保留。
  十六进制可写 `0a ff`，十进制可写 `10 255`，二进制可写 `00001010 11111111`。
- 英文代码视图把 NBT 摊成显式类型 JSON：键名与类型名全英文，Long 用字符串保存，
  Float / Double 支持 `NaN / Infinity`；点「写入代码」重新编码为 `.mcstructure` 并解析。
- 三种字节视图与英文代码视图都提供「写入 / 保存回当前包 / 导出结构」；写回当前包后仍可继续
  导出或另存，桌面端照旧先备份整包。
- 对外版本号保持 **1.0.0 / BUILD 1 不变**，本次只更新功能与安装包内容，不升版本号。
- 四端安装包与网页版按新资产重新打包；`assets_app.js` md5 更新为
  `c586978372c5b37924f905cb0b1e4bcd`（531,677 B）。

### 说明

- 英文代码视图是显式类型 JSON，不是 SNBT 简写；类型信息不会在编辑时丢失。
- 解析与写回以 `.mcstructure` 的 NBT 载荷为准，保留文件原有 8 字节头以外的结构内容。

## 未发布修订 · 重新接回 tianji-turn-addon 最新版（2026-11-22）

### 变更

- 「附加包汉化」重新接入上游 `zanesu154-rgb/tianji-turn-addon`，固定 `f2c3165`（2026-11-21，`v2026.11.21-90`），替换此前的自研小词库。
- 上游本次更新包含：脚本句式 ASCII 化再匹配、单行句式不跨行吞并、JSON 写回保留 `1.0` 这类小数、`property_bag` 变量文字、RawMessage 参数、HUD 标题/动作栏数据、`%键` 引用保护、manifest 末尾多余 `}` 宽松解析、包名以 manifest 为准、物品自定义名同步命令、`.mcfunction` 仅 `\r` 换行修复、下划线词提取等。
- 完整上游代码放入 `assets/i18n/`；`assets/js/addon-i18n.js` 恢复为 iframe 入口；`index.html` / `assets/index.html` 重新引入该脚本。
- 离线适配：JSON5 改本地 `vendor/json5.min.js`，移除 CDN 与访问计数；`loader.js` 顺序加载并重试上游脚本，内置安卓原生保存/父页转发/浏览器下载；`override.css` 适配 iframe 与手机。
- `assets/sw.js` 缓存清单重新加入 `i18n/` 全部文件，缓存键改为 `mctoolbox-1.0.0-i18n`，匹配时忽略查询参数。
- `README.md`、`THIRD_PARTY_NOTICES.md`、`docs/VERSION_MATRIX.md` 更正为“内嵌上游、MIT、已署名”，不再写“自研、已移除”。
- `assets/assets_app.js` 不变（md5 `5cd21621c6a4d358104703682bfc04c1`）；三端安装包需要重新打包以带入 `i18n/`。

### 说明

- 上游为 MIT，允许复制、修改、再发布；本次已附完整 `LICENSE` 与来源说明。
- 与作者的沟通属于礼貌确认与关系维护，不是 MIT 强制前置条件；在作者回复前，发布物保留完整署名与许可。

## 1.0.0 · BUILD 1 · 2026-11-22 · 首个公开发布版本

### 新增 · 经典版三端（Android / Windows / Linux）

- **英文代码视图**：`level.dat` 这类存档核心数据不再只有十进制字节。视图把二进制里的 NBT 摊成
  `类型 路径 = 值` 的英文代码，`LevelName`、`GameType`、`Difficulty`、`GeneratorType`、`BiomeOverride`、
  `CenterMapsToOrigin`、`ConfirmedPlatformLockedContent`、`lastOpenedWithVersion`、`RandomSeed`、`Time`、
  出生点与游戏规则等全部明文可读可改。
- **保存即编码回二进制**：点「保存到存档」把改完的文本重新序列化成 NBT，`level.dat` 保留原有 8 字节头与长度字段，
  再「导出存档」生成新包；桌面端保存前照旧自动备份整包。
- **长字段自动换行**：超长世界名、成串 byte 数组按窗口宽度折行（`pre-wrap`），横向滚动关掉，
  渲染后滚动位置归零，手机竖屏打开就是第一行，不用左右拖。
- **db 文件级编辑**：db 文件夹里的非 NBT 文件按 `0x` 偏移列出英文串，引号里的内容可就地替换；
  也能按十进制字节编辑，大文件 4KB 分页。保存前自动备份整包。
- **安全提示常驻**：db 是存档最重要的数据文件夹，请勿随便修改，随便修改可能导致存档报废；
  界面与说明文档均要求先「导出存档」备份再动手。

### 变更

- 对外版本号统一为 **1.0.0 / BUILD 1**；官网、README、本日志与安装包文件名同步改成 1.0.0。
- 三份发行包内 `assets/assets_app.js` 是同一个文件（md5 `c8997f90d8cb62fdef0c3e0d9b8e0a0e`（整改前）；整改后重打包为 `5cd21621c6a4d358104703682bfc04c1`）。
- JAVA 重制版与 C++ 重制版仍在内部开发，本次不对外发布。

### 下载

- 官网：https://fsssea.github.io/mc-toolbox/
- Android：`MC-Toolbox-Classic-1.0.0-android.apk`
- Windows：`MC-Toolbox-Windows-1.0.0.zip`
- Linux：`MC-Toolbox-Linux-1.0.0.tar.gz` / `MC-Toolbox-Linux-1.0.0.deb`
