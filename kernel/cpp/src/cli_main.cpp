// mctool —— MC工具箱 brarchive 内核命令行
//   mctool pack    <输入.zip|.mcpack> [输出目录]
//   mctool unpack  <输入.zip|.mcpack> [输出目录]
//   mctool info    <文件.brarchive>
//   mctool selftest
#include "brarchive.hpp"
#include "converter.hpp"
#include "zip.hpp"
#include <cstdio>
#include <cstring>
#include <chrono>
#include <fstream>
#include <sys/stat.h>
#include <vector>
#ifndef _WIN32
#include <atomic>
#include <thread>
#endif
#include <iostream>
#include <string>

using namespace mct;

static void usage() {
    std::printf(
        "mctool —— MC工具箱 brarchive 内核\n"
        "  mctool pack   <包.zip|.mcpack> [输出目录]   普通包 → __brarchive\n"
        "  mctool unpack <包.zip|.mcpack> [输出目录]   __brarchive → 普通包\n"
        "  mctool info   <文件.brarchive>              查看条目表\n"
        "  mctool selftest                            内置自测\n"
        "选项: --keep-origin 保留原始文件  --images 连图片一起打包  --no-utf8-check 关闭 UTF-8 校验\n");
}

static bool readFile(const std::string& p, Bytes& out) {
    std::ifstream f(p, std::ios::binary);
    if (!f) return false;
    f.seekg(0, std::ios::end);
    std::streamoff n = f.tellg();
    f.seekg(0, std::ios::beg);
    out.resize(size_t(n > 0 ? n : 0));
    if (n > 0) f.read(reinterpret_cast<char*>(out.data()), n);
    return true;
}

static int cmdInfo(const std::string& path) {
    Bytes b;
    if (!readFile(path, b)) {
        std::printf("读取失败: %s\n", path.c_str());
        return 2;
    }
    if (!Brarchive::looksLike(b)) {
        std::printf("不是 brarchive 文件（magic 不符）\n");
        return 2;
    }
    try {
        auto entries = Brarchive::deserialize(b);
        std::printf("条目 %zu，总字节 %zu\n", entries.size(), b.size());
        for (auto& e : entries) std::printf("  %-40s %8zu B\n", e.name.c_str(), e.data.size());
        return 0;
    } catch (const std::exception& ex) {
        std::printf("解析失败: %s\n", ex.what());
        return 2;
    }
}

static int cmdSelftest() {
    int fail = 0;
    auto check = [&](bool cond, const char* what) {
        std::printf("[%s] %s\n", cond ? "ok" : "FAIL", what);
        if (!cond) ++fail;
    };

    // 1) 编解码往返
    std::vector<ZipEntry> src;
    src.push_back(ZipEntry{"a.json", Bytes{'j', 's', 'o', 'n'}});
    src.push_back(ZipEntry{"b.ui", Bytes{1, 2, 3, 4, 5}});
    src.push_back(ZipEntry{"中文.json", Bytes{'x'}});
    Bytes blob = Brarchive::serialize(src);
    check(blob.size() == 16 + 3 * 256 + 4 + 5 + 1, "serialize 长度");
    auto back = Brarchive::deserialize(blob);
    check(back.size() == 3, "deserialize 条目数");
    check(back[0].name == "a.json" && back[1].name == "b.ui", "按名字排序");
    check(back[2].name == "中文.json" && back[2].data.size() == 1, "中文名");

    // 2) 错误输入
    bool threw = false;
    try {
        Bytes bad = blob;
        bad[0] = 0;
        Brarchive::deserialize(bad);
    } catch (...) {
        threw = true;
    }
    check(threw, "magic 错误应抛异常");
    threw = false;
    try { Brarchive::serialize({}); } catch (...) { threw = true; }
    check(threw, "空条目应报错");

    // 3) zip + deflate 往返（先用系统 zip 生成，再读）
    std::printf("(deflate 读取依赖外部样本，见 tests/run_tests.sh)\n");
    return fail == 0 ? 0 : 1;
}

int cliMain(int argc, char** argv) {
    if (argc < 2) {
        usage();
        return 0;
    }
    std::string cmd = argv[1];
    ConvertOptions opt;
    std::string in, outDir;
    for (int i = 2; i < argc; ++i) {
        std::string a = argv[i];
        if (a == "--keep-origin") opt.removeProcessedFiles = false;
        else if (a == "--images") opt.packImages = true;
        else if (a == "--no-utf8-check") opt.utf8Only = false;
        else if (a == "--help" || a == "-h") { usage(); return 0; }
        else if (in.empty()) in = a;
        else outDir = a;
    }

    if (cmd == "selftest") return cmdSelftest();
    if (cmd == "info") {
        if (in.empty()) { usage(); return 1; }
        return cmdInfo(in);
    }
    if (cmd == "batch") {
        // mctool batch <pack|unpack> <输出目录> <文件...>
        if (argc < 5 || (argv[2] != std::string("pack") && argv[2] != std::string("unpack"))) { usage(); return 1; }
        bool doPack = argv[2] == std::string("pack");
        std::string outRoot = argv[3];
        std::vector<std::string> files;
        for (int i = 4; i < argc; ++i) files.push_back(argv[i]);
        auto t0 = std::chrono::steady_clock::now();
        size_t ok = 0, bad = 0;
        unsigned nThreads = 1;
#ifdef _WIN32
        // mingw 的 win32 线程模型不支持 std::thread，Windows 走顺序处理
        for (size_t i = 0; i < files.size(); ++i) {
            ConvertResult r = doPack ? packArchive(files[i], outRoot, opt) : unpackArchive(files[i], outRoot, opt);
            if (r.ok) {
                std::printf("[%zu/%zu] ok  %s -> %s  (%zu->%zu files, %zu archives)\n", i + 1, files.size(),
                            files[i].c_str(), r.outputPath.c_str(), r.filesIn, r.filesOut, r.archives);
                ++ok;
            } else {
                std::printf("[%zu/%zu] FAIL %s  %s\n", i + 1, files.size(), files[i].c_str(), r.error.c_str());
                ++bad;
            }
        }
#else
        std::atomic<size_t> idx{0}, okc{0}, badc{0};
        nThreads = std::thread::hardware_concurrency();
        if (nThreads == 0) nThreads = 4;
        if (nThreads > files.size()) nThreads = files.size() ? (unsigned)files.size() : 1;
        std::vector<std::thread> pool;
        for (unsigned t = 0; t < nThreads; ++t) {
            pool.emplace_back([&]() {
                for (;;) {
                    size_t i = idx.fetch_add(1);
                    if (i >= files.size()) return;
                    ConvertResult r =
                        doPack ? packArchive(files[i], outRoot, opt) : unpackArchive(files[i], outRoot, opt);
                    if (r.ok) {
                        std::printf("[%zu/%zu] ok  %s -> %s  (%zu->%zu files, %zu archives)\n", i + 1, files.size(),
                                    files[i].c_str(), r.outputPath.c_str(), r.filesIn, r.filesOut, r.archives);
                        okc.fetch_add(1);
                    } else {
                        std::printf("[%zu/%zu] FAIL %s  %s\n", i + 1, files.size(), files[i].c_str(),
                                    r.error.c_str());
                        badc.fetch_add(1);
                    }
                }
            });
        }
        for (auto& th : pool) th.join();
        ok = okc.load();
        bad = badc.load();
#endif
        auto ms =
            std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::steady_clock::now() - t0).count();
        std::printf("批量完成：成功 %zu，失败 %zu，线程 %u，耗时 %lld ms\n", ok, bad, nThreads, (long long)ms);
        return bad ? 2 : 0;
    }

    if (cmd == "pack" || cmd == "unpack") {
        if (in.empty()) { usage(); return 1; }
        if (outDir.empty()) {
            size_t k = in.find_last_of("/\\");
            outDir = k == std::string::npos ? std::string(".") : in.substr(0, k);
        }
        ConvertResult r = cmd == "pack" ? packArchive(in, outDir, opt) : unpackArchive(in, outDir, opt);
        for (auto& l : r.logs) std::printf("  %s\n", l.c_str());
        if (!r.ok) {
            std::printf("失败: %s\n", r.error.c_str());
            return 2;
        }
        std::printf("完成: %s\n", r.outputPath.c_str());
        return 0;
    }
    usage();
    return 1;
}
