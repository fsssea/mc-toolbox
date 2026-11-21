# 安卓端（JAVA / C++ 两版）

```
android/
├── build-android.sh          # 一键出两个 APK（java|cpp|all）
├── java/                     # JAVA 重制版，applicationId com.mctoolbox.java
│   ├── AndroidManifest.xml
│   ├── res/mipmap-*/         # 图标（各密度）
│   └── src/com/mctoolbox/java/MainActivity.java
└── cpp/                      # C++ 重制版，applicationId com.mctoolbox.cpp
    ├── AndroidManifest.xml
    ├── jni/jni_mct.cpp       # JNI 桥：Java_com_mctoolbox_cpp_MainActivity_process
    ├── res/mipmap-*/
    └── src/com/mctoolbox/cpp/MainActivity.java
```

两版都不引 AndroidX、不用 Gradle，流程与经典版 `build.sh` 同一条路子：
`javac → d8 → aapt2 compile/link → 塞 dex（C++ 版再塞 lib/<abi>/libmct.so）→ zipalign -p 4 → apksigner`。

## 构建

```bash
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export ANDROID_HOME=/opt/android-sdk            # build-tools;34.0.0 + platforms;android-34
export ANDROID_NDK_HOME=$ANDROID_HOME/ndk/26.1.10909125   # 仅 C++ 版需要
bash kernel/android/build-android.sh all
```

签名库用 `MCT_KEYSTORE` 指定（默认找 `../MC工具箱签名/mctoolbox-android.keystore`），
密码走 `MCT_KEYSTORE_PASS` / `MCT_KEYSTORE_ALIAS`。

## 与另两版的差别

* 内核来源：JAVA 版编译 `kernel/java/mct/*.java` 直接进 dex；C++ 版把 `kernel/cpp/src` 编成
  `libmct.so`（arm64-v8a / armeabi-v7a / x86_64），通过 JNI 调用，不跑 JVM 解释器。
* `minSdk 26`：JAVA 内核用 `java.nio.file`；`targetSdk 34`。
* C++ 版安卓端带**批量队列 + 并行**：多选文件 → 按核数开线程（上限 4）→ 结果统一导出到
  「下载/MC工具箱」（Android 10+ 走 MediaStore，无需存储权限）。
