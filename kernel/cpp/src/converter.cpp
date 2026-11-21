#include "converter.hpp"
#include "brarchive.hpp"
#include <algorithm>
#include <cctype>
#include <filesystem>
#include <fstream>
#include <map>

namespace mct {
namespace {

std::string lower(std::string s) {
    for (auto& c : s) c = char(std::tolower(uint8_t(c)));
    return s;
}

bool isImageExt(const std::string& ext) {
    return ext == ".png" || ext == ".jpg" || ext == ".jpeg" || ext == ".tga";
}

std::string joinPath(const std::string& a, const std::string& b) {
    if (a.empty()) return b;
    if (b.empty()) return a;
    std::string r = a;
    if (r.back() != '/') r.push_back('/');
    return r + b;
}

// 目录相对 base 的父路径（base 为空时相对根）
std::string relativeParent(const std::string& base, const std::string& dir) {
    if (dir.empty()) return std::string();
    if (base.empty()) return zipDirName(dir);
    std::string b = base;
    if (!b.empty() && b.back() == '/') b.pop_back();
    if (dir.size() <= b.size()) return std::string();
    std::string rel = dir.substr(b.size());
    while (!rel.empty() && (rel.front() == '/' || rel.front() == '\\')) rel.erase(rel.begin());
    return zipDirName(rel);
}

// subpacks/x 内部 -> base = "subpacks/x/"，否则根
std::string brarchiveBase(const std::string& dir, const ConvertOptions& opt) {
    if (dir.empty()) return std::string();
    auto parts = zipSplit(dir);
    for (auto& special : opt.specialFolders) {
        for (size_t i = 0; i < parts.size(); ++i) {
            if (lower(parts[i]) == lower(special) && i + 1 < parts.size()) {
                std::string base;
                for (size_t k = 0; k <= i + 1; ++k) {
                    if (k) base.push_back('/');
                    base += parts[k];
                }
                base.push_back('/');
                return base;
            }
        }
    }
    return std::string();
}

bool readWhole(const std::string& path, Bytes& out, std::string* err) {
    std::ifstream f(path, std::ios::binary);
    if (!f) {
        if (err) *err = "无法读取: " + path;
        return false;
    }
    f.seekg(0, std::ios::end);
    std::streamoff n = f.tellg();
    f.seekg(0, std::ios::beg);
    out.resize(size_t(n > 0 ? n : 0));
    if (n > 0) f.read(reinterpret_cast<char*>(out.data()), n);
    return true;
}

bool writeWhole(const std::string& path, const Bytes& data, std::string* err) {
    std::ofstream f(path, std::ios::binary | std::ios::trunc);
    if (!f) {
        if (err) *err = "无法写入: " + path;
        return false;
    }
    if (!data.empty()) f.write(reinterpret_cast<const char*>(data.data()), std::streamoff(data.size()));
    if (!f) {
        if (err) *err = "写入失败: " + path;
        return false;
    }
    return true;
}

bool ensureDir(const std::string& dir) {
    if (dir.empty()) return true;
    std::error_code ec;
    std::filesystem::create_directories(dir, ec);
    return !ec;
}

std::string uniqueOut(const std::string& inPath, const std::string& outDir, const std::string& suffix) {
    std::string stem = zipStem(inPath);
    std::string inExt = zipExt(inPath);
    std::string ext = (inExt == ".mcpack" || inExt == ".mcaddon") ? inExt : ".zip";
    std::string candidate = joinPath(outDir, stem + suffix + ext);
    int i = 1;
    while (true) {
        std::ifstream f(candidate);
        if (!f.good()) break;
        candidate = joinPath(outDir, stem + suffix + " (" + std::to_string(i) + ")" + ext);
        ++i;
    }
    return candidate;
}

} // namespace

bool packBytes(const Bytes& zipIn, Bytes& zipOut, const ConvertOptions& opt, std::vector<std::string>* logs,
               std::string* err) {
    ZipArchive ar;
    if (!readZip(zipIn, ar, err)) return false;
    if (logs) logs->push_back("解压归档，共 " + std::to_string(ar.entries.size()) + " 个条目");

    std::map<std::string, std::vector<ZipEntry>> byDir;
    for (auto& e : ar.entries) {
        std::string path = e.name;
        // 排除指定文件（ui/_global_variables.json）
        {
            std::string lpath = lower(path), lbase = lower(zipBaseName(path));
            bool excluded = false;
            for (auto& f : opt.excludeFiles) {
                std::string lf = lower(f);
                if (lpath == lf || lbase == lf) excluded = true;
            }
            if (excluded) continue;
        }
        // 排除目录
        {
            bool inside = false;
            for (auto& part : zipSplit(path)) {
                std::string lp = lower(part);
                for (auto& d : opt.excludeDirs) {
                    if (lower(d) == lp) inside = true;
                }
                if (inside) break;
            }
            if (inside) continue;
        }
        std::string ext = zipExt(path);
        bool target = false;
        for (auto& x : opt.includeExts)
            if (lower(x) == ext) target = true;
        if (!target) {
            if (!opt.packImages || !isImageExt(ext)) continue;
        }
        std::string dir = zipDirName(path);
        if (dir.empty()) continue;   // 根目录文件不打包
        if (opt.utf8Only && !isImageExt(ext)) {
            if (!isValidUtf8(e.data.empty() ? "" : std::string(reinterpret_cast<const char*>(e.data.data()),
                                                                 e.data.size()))) {
                if (logs) logs->push_back("跳过非 UTF-8 文件: " + path);
                continue;
            }
        }
        ZipEntry one;
        one.name = zipBaseName(path);
        one.data = e.data;
        byDir[dir].push_back(std::move(one));
    }

    if (byDir.empty()) {
        if (logs) logs->push_back("没有可打包的目标目录，原样复制");
        zipOut = zipIn;
        return true;
    }

    ZipArchive out;
    out.entries = ar.entries;
    if (opt.removeProcessedFiles) {
        for (auto& kv : byDir) {
            for (auto& f : kv.second) out.remove(joinPath(kv.first, f.name));
        }
        if (logs) logs->push_back("已移除原始目标文件");
    }

    for (auto& kv : byDir) {
        const std::string& dir = kv.first;
        std::string dirName = zipBaseName(dir);
        std::string brName = dirName + ".brarchive";
        std::string base = brarchiveBase(dir, opt);
        std::string relParent = relativeParent(base, dir);
        std::string brPath = joinPath(base, opt.outputDir + "/" + (relParent.empty() ? "" : relParent + "/") + brName);
        Bytes blob;
        try {
            blob = Brarchive::serialize(kv.second);
        } catch (const std::exception& ex) {
            if (err) *err = ex.what();
            return false;
        }
        if (logs) logs->push_back("序列化 " + std::to_string(kv.second.size()) + " 个文件到 " + brPath);
        out.add(brPath, std::move(blob));
    }

    zipOut = writeZip(out);
    return true;
}

bool unpackBytes(const Bytes& zipIn, Bytes& zipOut, const ConvertOptions& opt, std::vector<std::string>* logs,
                 std::string* err) {
    ZipArchive ar;
    if (!readZip(zipIn, ar, err)) return false;
    if (logs) logs->push_back("解压归档，共 " + std::to_string(ar.entries.size()) + " 个条目");

    struct Found {
        const ZipEntry* e;
        std::string folder;   // 到 __brarchive 为止的路径
    };
    std::vector<Found> found;
    for (auto& e : ar.entries) {
        auto parts = zipSplit(e.name);
        size_t idx = size_t(-1);
        for (size_t i = 0; i < parts.size(); ++i)
            if (lower(parts[i]) == lower(opt.outputDir)) idx = i;
        if (idx == size_t(-1)) continue;
        if (zipExt(e.name) != ".brarchive") continue;
        std::string folder;
        for (size_t i = 0; i <= idx; ++i) {
            if (i) folder.push_back('/');
            folder += parts[i];
        }
        found.push_back(Found{&e, folder});
    }

    if (found.empty()) {
        if (logs) logs->push_back("未找到 __brarchive 目录，原样复制");
        zipOut = zipIn;
        return true;
    }
    if (logs) logs->push_back("找到 " + std::to_string(found.size()) + " 个 .brarchive 文件");

    ZipArchive out;
    out.entries = ar.entries;

    for (auto& f : found) {
        if (logs) logs->push_back("还原 " + zipBaseName(f.e->name));
        std::vector<ZipEntry> restored;
        try {
            restored = Brarchive::deserialize(f.e->data);
        } catch (const std::exception& ex) {
            if (err) *err = std::string("解析 ") + f.e->name + " 失败: " + ex.what();
            return false;
        }
        std::string parentOf = zipDirName(f.folder);   // __brarchive 的父目录
        std::string relIn = f.e->name.substr(f.folder.size());
        while (!relIn.empty() && relIn.front() == '/') relIn.erase(relIn.begin());
        // 只去掉扩展名，保留目录层级（不能用 zipStem，它只留文件名）
        std::string targetRelDir = relIn;
        {
            size_t dot = targetRelDir.find_last_of('.');
            size_t slash = targetRelDir.find_last_of('/');
            if (dot != std::string::npos && (slash == std::string::npos || dot > slash))
                targetRelDir.erase(dot);
        }

        std::string targetDir;
        if (parentOf.empty() && targetRelDir.empty()) targetDir = "";
        else if (parentOf.empty()) targetDir = targetRelDir;
        else if (targetRelDir.empty()) targetDir = parentOf;
        else targetDir = parentOf + "/" + targetRelDir;

        for (auto& r : restored) {
            std::string restorePath = targetDir.empty() ? r.name : targetDir + "/" + r.name;
            if (opt.skipEmptyEntries && r.data.empty()) {
                if (logs) logs->push_back("跳过空条目: " + restorePath);
                continue;
            }
            out.add(restorePath, r.data);
        }
        if (logs) logs->push_back("还原 " + std::to_string(restored.size()) + " 个文件");
    }

    // 移除所有 __brarchive 相关条目
    std::vector<std::string> drop;
    for (auto& e : out.entries) {
        for (auto& part : zipSplit(e.name))
            if (lower(part) == lower(opt.outputDir)) {
                drop.push_back(e.name);
                break;
            }
    }
    for (auto& d : drop) out.remove(d);

    zipOut = writeZip(out);
    return true;
}


namespace {
// 统计：条目数（跳过目录条目）与 __brarchive 归档数
void countEntries(const Bytes& zipBytes, size_t* files, size_t* archives) {
    ZipArchive ar;
    std::string err;
    if (files) *files = 0;
    if (archives) *archives = 0;
    if (!readZip(zipBytes, ar, &err)) return;
    for (const auto& e : ar.entries) {
        if (!e.name.empty() && e.name.back() == '/') continue;
        if (files) ++*files;
        if (archives && e.name.find("__brarchive") != std::string::npos) ++*archives;
    }
}
} // namespace

ConvertResult packArchive(const std::string& inputPath, const std::string& outDir, const ConvertOptions& opt) {
    ConvertResult r;
    Bytes in, out;
    std::string err;
    if (!readWhole(inputPath, in, &err)) {
        r.error = err;
        return r;
    }
    if (!packBytes(in, out, opt, &r.logs, &err)) {
        r.error = err;
        return r;
    }
    ensureDir(outDir);
    r.outputPath = uniqueOut(inputPath, outDir, "_packed");
    if (!writeWhole(r.outputPath, out, &err)) {
        r.error = err;
        return r;
    }
    r.ok = true;
    countEntries(in, &r.filesIn, nullptr);
    countEntries(out, &r.filesOut, &r.archives);
    r.logs.push_back("输出: " + r.outputPath + " (" + std::to_string(out.size()) + " 字节)");
    return r;
}

ConvertResult unpackArchive(const std::string& inputPath, const std::string& outDir, const ConvertOptions& opt) {
    ConvertResult r;
    Bytes in, out;
    std::string err;
    if (!readWhole(inputPath, in, &err)) {
        r.error = err;
        return r;
    }
    if (!unpackBytes(in, out, opt, &r.logs, &err)) {
        r.error = err;
        return r;
    }
    ensureDir(outDir);
    r.outputPath = uniqueOut(inputPath, outDir, "_unpacked");
    if (!writeWhole(r.outputPath, out, &err)) {
        r.error = err;
        return r;
    }
    r.ok = true;
    countEntries(in, &r.filesIn, &r.archives);
    countEntries(out, &r.filesOut, nullptr);
    r.logs.push_back("输出: " + r.outputPath + " (" + std::to_string(out.size()) + " 字节)");
    return r;
}

} // namespace mct
