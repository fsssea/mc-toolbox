# 更新日志

对外公开版本统一从 **1.0.0** 起算。此前的编号只用于内部迭代，没有公开下载、没有对外测试，
也不再作为发布版本对外使用；如需追溯内部改动，可查看仓库的 git 历史。

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
- 三份发行包内 `assets/assets_app.js` 是同一个文件（md5 `c8997f90d8cb62fdef0c3e0d9b8e0a0e`）。
- JAVA 重制版与 C++ 重制版仍在内部开发，本次不对外发布。

### 下载

- 官网：https://fsssea.github.io/mc-toolbox/
- Android：`MC-Toolbox-Classic-1.0.0-android.apk`
- Windows：`MC-Toolbox-Windows-1.0.0.zip`
- Linux：`MC-Toolbox-Linux-1.0.0.tar.gz` / `MC-Toolbox-Linux-1.0.0.deb`
