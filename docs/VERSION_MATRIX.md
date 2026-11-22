# 版本矩阵与包名规划

## 一、对外版本口径

- **对外公开版本从 1.0.0 起算**。此前所有编号只用于内部迭代，未对外发布、未公开测试，不作为下载版本出现。
- 本次只发布 **经典版三端**（Android / Windows / Linux）。
- JAVA 重制版（`com.mctoolbox.java`）与 C++ 重制版（`com.mctoolbox.cpp`）仍在内部开发，暂不对外发布；
  包名规划保留，日后正式发布时与经典版同机共存。

## 二、当前发布版本

| 项目 | 值 |
| --- | --- |
| 对外版本 | **1.1.0（测试构建，非正式版）** |
| BUILD | 2 |
| 发布日期 | 2026-11-22 |
| Android `applicationId` | `com.doubao.mctoolbox` |
| Android `versionCode` | 81（覆盖安装可升级；versionName 1.1.0） |
| 三端 `assets/assets_app.js` | 同一份文件，md5 `592e9693cd799abd2ac9c40e4998ecfa`（536,720 B，含 `.mcstructure` 四视图 + Chunker 完整转换入口） |
| 内嵌汉化子应用 | `tianji-turn-addon` `f2c3165`（2026-11-21，`v2026.11.21-90`），MIT，位于 `assets/i18n/` |
| 许可 | MIT，全离线运行 |
| `.mcstructure` 编辑 | 切片可视化 + 原二进制 / 十进制 / 十六进制 / 纯英文代码四视图，4KB 分页 |

## 三、平台 × 版本

| | Android | Windows | Linux |
| --- | --- | --- | --- |
| 经典版 1.1.0 | `MC-Toolbox-Classic-1.1.0-android.apk` | `MC-Toolbox-Windows-1.1.0.zip` | `MC-Toolbox-Linux-1.1.0.tar.gz` / `.deb` |
| JAVA 重制版 | 内部开发中，不发布 | 内部开发中，不发布 | 内部开发中，不发布 |
| C++ 重制版 | 内部开发中，不发布 | 内部开发中，不发布 | 内部开发中，不发布 |

## 四、共存与升级

- 三端包内 `assets/assets_app.js` 与 `assets/i18n/` 逐字节一致，Windows / Linux / Android 行为一致。
- 桌面端解压即用，配置保存在用户目录，升级只替换程序目录。
- 安卓端 `versionCode` 只增不减，覆盖安装即可升级；包名不变，数据不清空。

## 五、安卓端说明

安卓包的对外文件名与安装器显示的 `versionName` 均为 1.1.0；APK 已用原签名库重建并重签，`versionCode` 81。

## 六、Chunker 运行时

- Android：`assets/chunker/arm64.zip`（64 位，约 28 MB）与 `assets/chunker/arm32.zip`（32 位，约 41 MB），按 `Build.SUPPORTED_ABIS` 选择；首次转换解压到应用私有目录。
- Windows / Linux：包内 `resources/app/chunker/chunker-cli/` 为 Chunker 1.21.0 原生 CLI 与运行时，不依赖系统 Java。
- 许可：Chunker MIT，OpenJDK GPLv2 + Classpath Exception；许可文本见 `chunker/legal/`。

## 六、未来版本规划

- 对外补丁版本按 `1.0.x` 递增；功能版本按 `1.x.0` 递增。
- JAVA / C++ 两版完成内部验收后再单独公布版本号，不占用经典版的编号。
