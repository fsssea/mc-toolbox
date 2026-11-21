# 版本矩阵与包名规划

## 一、三个版本

| 版本 | 代号 | 显示名 | Android `applicationId` | Windows | Linux | 内核 |
| --- | --- | --- | --- | --- | --- | --- |
| 经典版 | `CL` | MC工具箱 | `com.mctoolbox.classic` | `MC工具箱.exe` | `mctoolbox` | JS（内置，同源） |
| JAVA 重制版 | `JV` | MC工具箱·JAVA | `com.mctoolbox.java` | `MC工具箱-JAVA.exe` | `mctoolbox-java` | Java（`kernels/java`） |
| C++ 重制版 | `CP` | MC工具箱·C++ | `com.mctoolbox.cpp` | `MC工具箱-C++.exe` | `mctoolbox-cpp` | C++（`kernels/cpp`） |

> 上表 `applicationId` 为建议值，用于满足「包名不同、可共存」。如果你已有既存包名或商店后台记录，
> **以既有值为准**，改这一列 + `build.gradle` 的 `applicationId` + 各端快捷方式名即可，其余不用动。

## 二、平台 × 版本

| | Android | Windows | Linux | Web/PWA |
| --- | --- | --- | --- | --- |
| 经典版 | APK（arm64 + armv7，通用包） | ZIP（exe + 资源） | TAR.GZ / DEB | 单文件 HTML |
| JAVA 重制版 | APK（通用包，arm64 + armv7 + x86_64；内核编进 dex，不依赖外部 JRE） | ZIP（jar + 启动.bat，需 JRE 17+） | TAR.GZ（jar + start.sh） | 由网页版承担 |
| C++ 重制版 | APK（NDK，arm64 + armv7 + x86_64；内核编成 libmct.so 走 JNI；批量队列 + 并行） | ZIP（Windows 原生深色界面 `mctool-gui.exe` + 静态 CLI `mctool.exe`） | TAR.GZ（原生 GTK 界面 + 静态 CLI） | 由网页版承担 |

说明：JAVA / C++ 两版的网页形态不做第二套壳，网页端统一由 JS 内核提供，保证「同一件事在哪都能做」。

## 三、版本号口径

* 主版本（6.x）三版共享：同一批内核修复、同一份格式规范、同一天发版。
* 子版本各自独立：`6.3.0-CL` / `6.3.0-JV` / `6.3.0-CP`，允许某版本单独发补丁（如 `6.3.1-CP`）。
* BUILD 号全局递增，便于对日志。当前 **BUILD 77**。

## 四、停更承诺

* 任一版本不因新版本出现而停更。
* 内核级问题（格式、规则、安全、CRC 校验）**三版同步修复**，同日发版。
* 界面级更新按定位各自推进：经典版求稳、JAVA 版求逻辑统一、C++ 版求性能与高级功能。

## 五、共存注意事项

* 包名不同 → 系统允许同时安装，桌面图标可用后缀区分（`·JAVA` / `·C++`）。
* 配置与缓存目录带版本后缀：`~/.mctoolbox/classic`、`~/.mctoolbox/java`、`~/.mctoolbox/cpp`。
* 三者可互相打开对方产出的 `.mcpack/.mcaddon`（同一内核规范）。
* 签名：同一 keystore 可为三者签名，但 `applicationId` 不同即视为不同应用，互不覆盖升级。

## 六、安卓端现状（6.3.0 / BUILD 77）

| 版本 | 产物 | `applicationId` | 签名 | 校验 |
| --- | --- | --- | --- | --- |
| 经典版 | `MC-Toolbox-Classic-6.3.0-android.apk`（959 KB，versionCode 75） | `com.doubao.mctoolbox` | `MC工具箱签名/mctoolbox-android.keystore`（旧密钥已丢失，需卸载重装） | 带自动换行开关；汉化工具下载已修复，落盘到「下载/MC工具箱」 |
| JAVA 重制版 | `MC-Toolbox-Java-6.3.0-android.apk`（128 KB） | `com.mctoolbox.java` | `MC工具箱签名/mctoolbox-android.keystore` | 内核类与桌面 JAR 同源，371/371 往返 0 差异 |
| C++ 重制版 | `MC-Toolbox-Cpp-6.3.0-android.apk`（3.3 MB，三 ABI） | `com.mctoolbox.cpp` | 同上 | JNI 桥实跑 208→371，371/371 往返 0 差异；4 线程并发 4 包全成功 |

三者 `applicationId` 互不相同，可同机共存；`minSdk 26`、`targetSdk 34`，启动入口都是 `MainActivity`（无第三方依赖，不引 AndroidX）。
