#include <jni.h>
#include <chrono>
#include <string>
#include "converter.hpp"

// 返回格式（换行分段）：
//   ok=1|0
//   out=<输出路径>
//   archives=<归档数>
//   ms=<耗时>
//   err=<错误>
//   log=<每条一行，前缀 log=>
extern "C" JNIEXPORT jstring JNICALL
Java_com_mctoolbox_cpp_MainActivity_process(JNIEnv* env, jobject /*thiz*/, jstring inPath, jstring outDir,
                                            jboolean pack, jboolean images, jboolean keepOrigin,
                                            jboolean skipEmpty) {
    const char* inC = env->GetStringUTFChars(inPath, nullptr);
    const char* outC = env->GetStringUTFChars(outDir, nullptr);
    std::string in(inC ? inC : ""), outDirS(outC ? outC : "");
    env->ReleaseStringUTFChars(inPath, inC);
    env->ReleaseStringUTFChars(outDir, outC);

    mct::ConvertOptions opt;
    opt.packImages = images == JNI_TRUE;
    opt.removeProcessedFiles = keepOrigin != JNI_TRUE;
    opt.skipEmptyEntries = skipEmpty == JNI_TRUE;

    auto t0 = std::chrono::steady_clock::now();
    mct::ConvertResult r = pack == JNI_TRUE ? mct::packArchive(in, outDirS, opt) : mct::unpackArchive(in, outDirS, opt);
    auto ms = std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::steady_clock::now() - t0).count();

    std::string s;
    s += r.ok ? "ok=1\n" : "ok=0\n";
    s += "out=" + r.outputPath + "\n";
    s += "archives=" + std::to_string(r.archives) + "\n";
    s += "files=" + std::to_string(r.filesIn) + "->" + std::to_string(r.filesOut) + "\n";
    s += "ms=" + std::to_string((long long)ms) + "\n";
    if (!r.error.empty()) s += "err=" + r.error + "\n";
    for (const auto& l : r.logs) s += "log=" + l + "\n";
    return env->NewStringUTF(s.c_str());
}
