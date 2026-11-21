#pragma once
// ZIP 读写：读取支持 STORE 与 DEFLATE，写入固定 STORE + CRC32。
// 只处理 mcpack/mcaddon 这类普通 zip，不处理 zip64 / 加密。
#include "bytes.hpp"
#include <map>
#include <string>

namespace mct {

struct ZipEntry {
    std::string name;   // 内部路径，统一为 '/'
    Bytes data;
};

struct ZipArchive {
    // 保持顺序（写入时按名字排序，读取时按中央目录顺序）
    std::vector<ZipEntry> entries;

    bool has(const std::string& name) const;
    const ZipEntry* find(const std::string& name) const;
    void add(const std::string& name, Bytes data);
    void remove(const std::string& name);
    size_t totalBytes() const;
};

// 读 zip；失败返回 false 并写 err
bool readZip(const Bytes& file, ZipArchive& out, std::string* err = nullptr);
bool readZipFile(const std::string& path, ZipArchive& out, std::string* err = nullptr);

// 写 zip（STORE，全部条目按名字排序，保证可复现）
Bytes writeZip(const ZipArchive& ar);
bool writeZipFile(const std::string& path, const ZipArchive& ar, std::string* err = nullptr);

// 路径工具（仅 '/')
std::string zipDirName(const std::string& p);
std::string zipBaseName(const std::string& p);
std::string zipExt(const std::string& p);       // 含点，小写
std::string zipStem(const std::string& p);      // 不含目录与扩展名
std::string zipNormalize(const std::string& p); // 反斜杠转 '/'，去重复斜杠与 ./ 前缀
std::vector<std::string> zipSplit(const std::string& p);

} // namespace mct
