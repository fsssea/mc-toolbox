#!/usr/bin/env bash
# 构建 MC工具箱 JAVA / C++ 两版安卓 APK。不使用 Gradle，流程与经典版 build.sh 一致。
#   bash android/build-android.sh java|cpp|all
# 依赖：JDK 17、Android build-tools 34.0.0 + platform android-34；C++ 版另需 NDK。
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SDK="${ANDROID_HOME:-/opt/android-sdk}"
BT="$SDK/build-tools/34.0.0"
AJ="$SDK/platforms/android-34/android.jar"
KS="${MCT_KEYSTORE:-$ROOT/../MC工具箱签名/mctoolbox-android.keystore}"
KS_PASS="${MCT_KEYSTORE_PASS:-mctoolbox2026}"
KS_ALIAS="${MCT_KEYSTORE_ALIAS:-mctoolbox}"
NDK="${ANDROID_NDK_HOME:-$SDK/ndk/26.1.10909125}"

die() { echo "错误：$*" >&2; exit 1; }
[ -x "$BT/aapt2" ] || die "找不到 $BT/aapt2（设 ANDROID_HOME，或装 build-tools;34.0.0）"
[ -f "$AJ" ] || die "找不到 $AJ（装 platforms;android-34）"
[ -f "$KS" ] || die "找不到签名库 $KS（设 MCT_KEYSTORE 指到你的 keystore）"

sign_and_align() { # $1=未签名 apk  $2=输出 apk
  "$BT/zipalign" -f -p 4 "$1" "${1%.apk}-aligned.apk"
  "$BT/apksigner" sign --ks "$KS" --ks-pass "pass:$KS_PASS" --key-pass "pass:$KS_PASS" --ks-key-alias "$KS_ALIAS" \
    --min-sdk-version 26 --out "$2" "${1%.apk}-aligned.apk"
  "$BT/apksigner" verify "$2" >/dev/null && echo "  签名校验通过"
}

build_common() { # $1=工程目录  $2=输出 apk 名
  local dir="$1" name="$2"
  rm -rf "$dir/build/classes" "$dir/build/res"
  mkdir -p "$dir/build/classes" "$dir/build/res"
  "$BT/aapt2" compile --dir "$dir/res" -o "$dir/build/res"
  javac --release 11 -encoding UTF-8 -nowarn -classpath "$AJ" -d "$dir/build/classes" \
    $(find "$dir/src" -name '*.java')
  "$BT/d8" --min-api 26 --lib "$AJ" --output "$dir/build" $(find "$dir/build/classes" -name '*.class')
  "$BT/aapt2" link -o "$dir/build/base.apk" --manifest "$dir/AndroidManifest.xml" -I "$AJ" \
    --min-sdk-version 26 --target-sdk-version 34 -R "$dir"/build/res/*.flat --auto-add-overlay
}

build_java() {
  echo "[JAVA] 编译"
  build_common "$ROOT/android/java" "MC-Toolbox-Java-6.3.0-android.apk"
  cd "$ROOT/android/java"
  python3 - <<'EOF'
import zipfile, shutil
shutil.copy('build/base.apk', 'build/unsigned.apk')
z = zipfile.ZipFile('build/unsigned.apk', 'a', zipfile.ZIP_DEFLATED)
z.write('build/classes.dex', 'classes.dex')
z.close()
EOF
  sign_and_align "$ROOT/android/java/build/unsigned.apk" "$ROOT/android/java/build/MC-Toolbox-Java-6.3.0-android.apk"
  echo "[JAVA] 完成：$(stat -c%s "$ROOT/android/java/build/MC-Toolbox-Java-6.3.0-android.apk") 字节"
}

build_cpp() {
  echo "[C++] 编译原生库"
  [ -x "$NDK/toolchains/llvm/prebuilt/linux-x86_64/bin/clang++" ] || die "找不到 NDK（设 ANDROID_NDK_HOME）"
  local CL="$NDK/toolchains/llvm/prebuilt/linux-x86_64/bin"
  local K="${MCT_KERNEL_CPP:-$ROOT/cpp/src}"
  [ -f "$K/converter.cpp" ] || K="$ROOT/kernel/cpp/src"   # 仓库里的布局
  [ -f "$K/converter.cpp" ] || die "找不到 C++ 内核源码（设 MCT_KERNEL_CPP）"
  local SRCS="$K/inflate.cpp $K/deflate.cpp $K/zip.cpp $K/brarchive.cpp $K/converter.cpp $ROOT/android/cpp/jni/jni_mct.cpp"
  for abi in arm64-v8a:aarch64-linux-android26 armeabi-v7a:armv7a-linux-androideabi26 x86_64:x86_64-linux-android26; do
    local a="${abi%%:*}" t="${abi##*:}"
    mkdir -p "$ROOT/android/cpp/build/libs/$a"
    "$CL/${t}-clang++" -std=c++17 -O2 -fPIC -shared -static-libstdc++ -Wl,-z,max-page-size=16384 \
      -I"$K" $SRCS -o "$ROOT/android/cpp/build/libs/$a/libmct.so"
    "$CL/llvm-strip" --strip-unneeded "$ROOT/android/cpp/build/libs/$a/libmct.so"
    echo "  $a: $(stat -c%s "$ROOT/android/cpp/build/libs/$a/libmct.so") 字节"
  done
  echo "[C++] 打包"
  build_common "$ROOT/android/cpp" "MC-Toolbox-Cpp-6.3.0-android.apk"
  cd "$ROOT/android/cpp"
  python3 - <<'EOF'
import zipfile, shutil
shutil.copy('build/base.apk', 'build/unsigned.apk')
z = zipfile.ZipFile('build/unsigned.apk', 'a', zipfile.ZIP_STORED)
z.write('build/classes.dex', 'classes.dex')
for abi in ['arm64-v8a', 'armeabi-v7a', 'x86_64']:
    z.write(f'build/libs/{abi}/libmct.so', f'lib/{abi}/libmct.so')
z.close()
EOF
  sign_and_align "$ROOT/android/cpp/build/unsigned.apk" "$ROOT/android/cpp/build/MC-Toolbox-Cpp-6.3.0-android.apk"
  echo "[C++] 完成：$(stat -c%s "$ROOT/android/cpp/build/MC-Toolbox-Cpp-6.3.0-android.apk") 字节"
}

case "${1:-all}" in
  java) build_java ;;
  cpp)  build_cpp ;;
  all)  build_java; build_cpp ;;
  *)    die "用法：bash android/build-android.sh java|cpp|all" ;;
esac
