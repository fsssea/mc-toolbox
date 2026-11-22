# 版本矩阵与包名规划

## 一、对外版本口径

- **对外公开版本从 1.0.0 起算**。此前所有编号只用于内部迭代，未对外发布、未公开测试，不作为下载版本出现。
- 本次只发布 **经典版三端**（Android / Windows / Linux）。
- JAVA 重制版（`com.mctoolbox.java`）与 C++ 重制版（`com.mctoolbox.cpp`）仍在内部开发，暂不对外发布；
  包名规划保留，日后正式发布时与经典版同机共存。

## 二、当前发布版本

| 项目 | 值 |
| --- | --- |
| 对外版本 | **1.0.0** |
| BUILD | 1 |
| 发布日期 | 2026-11-22 |
| Android `applicationId` | `com.doubao.mctoolbox` |
| Android `versionCode` | 80（沿用既有值，保证覆盖安装可升级） |
| 三端 `assets/assets_app.js` | 同一份文件，md5 `c8997f90d8cb62fdef0c3e0d9b8e0a0e` |
| 许可 | MIT，全离线运行 |

## 三、平台 × 版本

| | Android | Windows | Linux |
| --- | --- | --- | --- |
| 经典版 1.0.0 | `MC-Toolbox-Classic-1.0.0-android.apk` | `MC-Toolbox-Windows-1.0.0.zip` | `MC-Toolbox-Linux-1.0.0.tar.gz` / `.deb` |
| JAVA 重制版 | 内部开发中，不发布 | 内部开发中，不发布 | 内部开发中，不发布 |
| C++ 重制版 | 内部开发中，不发布 | 内部开发中，不发布 | 内部开发中，不发布 |

## 四、共存与升级

- 三端包内 `assets/assets_app.js` 逐字节一致，Windows / Linux / Android 行为一致。
- 桌面端解压即用，配置保存在用户目录，升级只替换程序目录。
- 安卓端 `versionCode` 只增不减，覆盖安装即可升级；包名不变，数据不清空。

## 五、安卓端说明

安卓包的对外文件名是 1.0.0；安装器里显示的 `versionName` 仍是内部迭代时写入的编号，
本次未重建 APK（环境没有 build-tools，改它需要重新签名）。对外一律以 1.0.0 为准，
下一轮打包会把 `versionName` 一起改成 1.0.0，`versionCode` 继续递增。

## 六、未来版本规划

- 对外补丁版本按 `1.0.x` 递增；功能版本按 `1.x.0` 递增。
- JAVA / C++ 两版完成内部验收后再单独公布版本号，不占用经典版的编号。
