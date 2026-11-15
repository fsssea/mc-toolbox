#!/usr/bin/env bash
# MC工具箱 Android 构建脚本
# 依赖：JDK 17、Android SDK（build-tools 34.0.0 + platforms/android-35）
# 用法：
#   export JAVA_HOME=/path/to/jdk-17
#   export ANDROID_SDK=/path/to/android-sdk
#   export MCBE_KEYSTORE=/path/to/your.keystore   # 可选，不填则生成临时调试签名
#   bash build.sh
set -e
: "${JAVA_HOME:?请先 export JAVA_HOME}"
: "${ANDROID_SDK:?请先 export ANDROID_SDK}"

BT="$ANDROID_SDK/build-tools/34.0.0"
AJ="$ANDROID_SDK/platforms/android-35/android.jar"
APK="MCBE工具箱.apk"
KS="${MCBE_KEYSTORE:-build/debug.keystore}"
ALIAS="${MCBE_KEY_ALIAS:-mcbe}"
SPASS="${MCBE_STORE_PASS:-mcbe123456}"
KPASS="${MCBE_KEY_PASS:-$SPASS}"

rm -rf build && mkdir -p build/classes build/dex

echo "[1/6] 编译 Java"
"$JAVA_HOME/bin/javac" --release 11 -classpath "$AJ" -d build/classes \
  android/java/com/doubao/mctoolbox/MainActivity.java

echo "[2/6] d8 转 dex"
"$BT/d8" --release --lib "$AJ" --min-api 29 --output build/dex \
  $(find build/classes -name "*.class")

echo "[3/6] aapt2 编译资源"
"$BT/aapt2" compile --dir android/res -o build/res.zip

echo "[4/6] aapt2 链接（含 assets、manifest）"
"$BT/aapt2" link -o build/base.apk -I "$AJ" \
  --manifest android/AndroidManifest.xml -A assets \
  --min-sdk-version 29 --target-sdk-version 34 build/res.zip

echo "[5/6] 加入 classes.dex"
cp build/base.apk build/unsigned.apk
( cd build/dex && zip -q -j ../unsigned.apk classes.dex )

echo "[6/6] 对齐 + 签名"
if [ ! -f "$KS" ]; then
  echo "未找到签名库，生成临时调试签名：$KS"
  "$JAVA_HOME/bin/keytool" -genkeypair -keystore "$KS" -alias "$ALIAS" \
    -keyalg RSA -keysize 2048 -validity 3650 \
    -storepass "$SPASS" -keypass "$KPASS" \
    -dname "CN=MC Toolbox Debug, OU=Dev, O=MC Toolbox, L=Unknown, ST=Unknown, C=CN"
fi
"$BT/zipalign" -f -p 4 build/unsigned.apk build/aligned.apk
"$BT/apksigner" sign --ks "$KS" --ks-key-alias "$ALIAS" \
  --ks-pass "pass:$SPASS" --key-pass "pass:$KPASS" \
  --out "$APK" build/aligned.apk
"$BT/apksigner" verify "$APK"
echo "完成：$APK"
