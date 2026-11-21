#include "zip.hpp"
#include "deflate.hpp"
#include "inflate.hpp"
#include <algorithm>
#include <cstdio>
#include <fstream>

namespace mct {
namespace {

bool readWholeFile(const std::string& path, Bytes& out) {
    std::ifstream f(path, std::ios::binary);
    if (!f) return false;
    f.seekg(0, std::ios::end);
    std::streamoff n = f.tellg();
    if (n < 0) return false;
    f.seekg(0, std::ios::beg);
    out.resize(size_t(n));
    if (n > 0) f.read(reinterpret_cast<char*>(out.data()), n);
    return bool(f) || f.eof();
}

bool writeWholeFile(const std::string& path, const Bytes& data) {
    std::ofstream f(path, std::ios::binary | std::ios::trunc);
    if (!f) return false;
    if (!data.empty()) f.write(reinterpret_cast<const char*>(data.data()), std::streamoff(data.size()));
    return bool(f);
}

} // namespace

std::string zipNormalize(const std::string& in) {
    std::string s;
    s.reserve(in.size());
    for (char c : in) s.push_back(c == '\\' ? '/' : c);
    std::vector<std::string> parts;
    std::string cur;
    for (char c : s) {
        if (c == '/') {
            if (!cur.empty() && cur != ".") parts.push_back(cur);
            cur.clear();
        } else {
            cur.push_back(c);
        }
    }
    if (!cur.empty() && cur != ".") parts.push_back(cur);
    std::string out;
    for (size_t i = 0; i < parts.size(); ++i) {
        if (i) out.push_back('/');
        out += parts[i];
    }
    return out;
}

std::vector<std::string> zipSplit(const std::string& p) {
    std::vector<std::string> parts;
    std::string cur;
    for (char c : p) {
        if (c == '/' || c == '\\') {
            if (!cur.empty()) parts.push_back(cur);
            cur.clear();
        } else {
            cur.push_back(c);
        }
    }
    if (!cur.empty()) parts.push_back(cur);
    return parts;
}

std::string zipDirName(const std::string& p) {
    size_t k = p.find_last_of("/\\");
    if (k == std::string::npos) return std::string();
    return p.substr(0, k);
}

std::string zipBaseName(const std::string& p) {
    size_t k = p.find_last_of("/\\");
    return k == std::string::npos ? p : p.substr(k + 1);
}

std::string zipExt(const std::string& p) {
    std::string base = zipBaseName(p);
    size_t dot = base.find_last_of('.');
    if (dot == std::string::npos || dot == 0) return std::string();
    std::string e = base.substr(dot);
    for (auto& c : e) c = char(std::tolower(uint8_t(c)));
    return e;
}

std::string zipStem(const std::string& p) {
    std::string base = zipBaseName(p);
    size_t dot = base.find_last_of('.');
    if (dot == std::string::npos || dot == 0) return base;
    return base.substr(0, dot);
}

bool ZipArchive::has(const std::string& name) const { return find(name) != nullptr; }

const ZipEntry* ZipArchive::find(const std::string& name) const {
    for (auto& e : entries)
        if (e.name == name) return &e;
    return nullptr;
}

void ZipArchive::add(const std::string& name, Bytes data) {
    for (auto& e : entries) {
        if (e.name == name) {
            e.data = std::move(data);
            return;
        }
    }
    entries.push_back(ZipEntry{name, std::move(data)});
}

void ZipArchive::remove(const std::string& name) {
    entries.erase(std::remove_if(entries.begin(), entries.end(),
                                 [&](const ZipEntry& e) { return e.name == name; }),
                  entries.end());
}

size_t ZipArchive::totalBytes() const {
    size_t n = 0;
    for (auto& e : entries) n += e.data.size();
    return n;
}

bool readZip(const Bytes& file, ZipArchive& out, std::string* err) {
    out.entries.clear();
    if (file.size() < 22) {
        if (err) *err = "文件太小，不是 zip";
        return false;
    }
    // 找 EOCD（可能带注释，从尾部最多回扫 65557 字节）
    size_t eocd = size_t(-1);
    size_t limit = file.size() > 65557 ? file.size() - 65557 : 0;
    for (size_t i = file.size() - 22;; --i) {
        if (rdU32(&file[i]) == 0x06054b50u) {
            eocd = i;
            break;
        }
        if (i <= limit) break;
        if (i == 0) break;
    }
    if (eocd == size_t(-1)) {
        if (err) *err = "找不到 zip 目录尾（EOCD）";
        return false;
    }
    uint16_t total = uint16_t(file[eocd + 10] | (file[eocd + 11] << 8));
    uint32_t cdSize = rdU32(&file[eocd + 12]);
    uint32_t cdOff = rdU32(&file[eocd + 16]);
    if (size_t(cdOff) + cdSize > file.size()) {
        if (err) *err = "中央目录越界";
        return false;
    }

    size_t p = cdOff;
    for (uint16_t i = 0; i < total; ++i) {
        if (p + 46 > file.size() || rdU32(&file[p]) != 0x02014b50u) {
            if (err) *err = "中央目录项损坏";
            return false;
        }
        uint16_t method = uint16_t(file[p + 10] | (file[p + 11] << 8));
        uint32_t crc = rdU32(&file[p + 16]);
        uint32_t compSize = rdU32(&file[p + 20]);
        uint32_t uncompSize = rdU32(&file[p + 24]);
        uint16_t nameLen = uint16_t(file[p + 28] | (file[p + 29] << 8));
        uint16_t extraLen = uint16_t(file[p + 30] | (file[p + 31] << 8));
        uint16_t commentLen = uint16_t(file[p + 32] | (file[p + 33] << 8));
        uint32_t localOff = rdU32(&file[p + 42]);
        uint32_t extAttr = rdU32(&file[p + 38]);
        if (p + 46 + nameLen > file.size()) {
            if (err) *err = "文件名越界";
            return false;
        }
        std::string name(reinterpret_cast<const char*>(&file[p + 46]), nameLen);
        name = zipNormalize(name);
        p += 46ull + nameLen + extraLen + commentLen;

        if (name.empty() || name.back() == '/') continue;   // 目录项
        if (extAttr & 0x10u) continue;                      // DOS 目录属性

        // 读本地头拿到真实数据起点
        if (size_t(localOff) + 30 > file.size() || rdU32(&file[localOff]) != 0x04034b50u) {
            if (err) *err = "本地文件头损坏: " + name;
            return false;
        }
        uint16_t lNameLen = uint16_t(file[localOff + 26] | (file[localOff + 27] << 8));
        uint16_t lExtraLen = uint16_t(file[localOff + 28] | (file[localOff + 29] << 8));
        size_t dataOff = size_t(localOff) + 30 + lNameLen + lExtraLen;
        if (dataOff + compSize > file.size()) {
            if (err) *err = "数据越界: " + name;
            return false;
        }

        ZipEntry e;
        e.name = name;
        if (method == 0) {
            e.data.assign(file.begin() + std::streamoff(dataOff), file.begin() + std::streamoff(dataOff + compSize));
        } else if (method == 8) {
            if (!inflateRaw(&file[dataOff], compSize, e.data, err)) {
                if (err) *err = "解压失败: " + name + " (" + *err + ")";
                return false;
            }
        } else {
            if (err) *err = "不支持的压缩方式 " + std::to_string(method) + ": " + name;
            return false;
        }
        if (e.data.size() != uncompSize) {
            if (err) *err = "解压长度不符: " + name;
            return false;
        }
        if (crc32(e.data.data(), e.data.size()) != crc) {
            if (err) *err = "CRC 校验失败: " + name;
            return false;
        }
        out.entries.push_back(std::move(e));
    }
    return true;
}

bool readZipFile(const std::string& path, ZipArchive& out, std::string* err) {
    Bytes file;
    if (!readWholeFile(path, file)) {
        if (err) *err = "无法读取文件: " + path;
        return false;
    }
    return readZip(file, out, err);
}

Bytes writeZip(const ZipArchive& ar) {
    std::vector<const ZipEntry*> list;
    list.reserve(ar.entries.size());
    for (auto& e : ar.entries)
        if (!e.name.empty() && e.name.back() != '/') list.push_back(&e);
    std::sort(list.begin(), list.end(), [](const ZipEntry* a, const ZipEntry* b) { return a->name < b->name; });

    Bytes out;
    struct Central {
        std::string name;
        uint32_t crc, size, compressed, off;
        uint16_t method;
    };
    std::vector<Central> central;
    central.reserve(list.size());

    auto putU16 = [](Bytes& b, uint16_t v) {
        b.push_back(uint8_t(v & 0xFF));
        b.push_back(uint8_t((v >> 8) & 0xFF));
    };
    const uint16_t kDate = 0x21;   // 1980-01-01

    for (auto* e : list) {
        uint32_t crc = crc32(e->data.data(), e->data.size());
        Bytes comp;
        uint16_t method = 0;
        const Bytes* body = &e->data;
        if (!e->data.empty()) {
            Bytes tmp;
            if (deflateRaw(e->data.data(), e->data.size(), tmp) && tmp.size() + 16 < e->data.size()) {
                comp = std::move(tmp);
                body = &comp;
                method = 8;
            }
        }
        uint32_t off = uint32_t(out.size());
        putU32(out, 0x04034b50u);
        putU16(out, 20);            // version needed
        putU16(out, 0);             // flags
        putU16(out, method);
        putU16(out, 0);             // time
        putU16(out, kDate);         // date
        putU32(out, crc);
        putU32(out, uint32_t(body->size()));
        putU32(out, uint32_t(e->data.size()));
        putU16(out, uint16_t(e->name.size()));
        putU16(out, 0);             // extra len
        out.insert(out.end(), e->name.begin(), e->name.end());
        out.insert(out.end(), body->begin(), body->end());
        central.push_back(Central{e->name, crc, uint32_t(e->data.size()), uint32_t(body->size()), off, method});
    }

    uint32_t cdOff = uint32_t(out.size());
    for (auto& c : central) {
        putU32(out, 0x02014b50u);
        putU16(out, 0x0014);   // version made by
        putU16(out, 20);       // version needed
        putU16(out, 0);        // flags
        putU16(out, c.method);
        putU16(out, 0);        // time
        putU16(out, kDate);    // date
        putU32(out, c.crc);
        putU32(out, c.compressed);
        putU32(out, c.size);
        putU16(out, uint16_t(c.name.size()));
        putU16(out, 0);        // extra
        putU16(out, 0);        // comment
        putU16(out, 0);        // disk
        putU16(out, 0);        // internal attr
        putU32(out, 0);        // external attr
        putU32(out, c.off);
        out.insert(out.end(), c.name.begin(), c.name.end());
    }
    uint32_t cdSize = uint32_t(out.size()) - cdOff;

    putU32(out, 0x06054b50u);
    putU16(out, 0);          // disk
    putU16(out, 0);          // cd disk
    putU16(out, uint16_t(central.size()));
    putU16(out, uint16_t(central.size()));
    putU32(out, cdSize);
    putU32(out, cdOff);
    putU16(out, 0);          // 注释长度
    return out;
}

bool writeZipFile(const std::string& path, const ZipArchive& ar, std::string* err) {
    Bytes b = writeZip(ar);
    if (!writeWholeFile(path, b)) {
        if (err) *err = "写入失败: " + path;
        return false;
    }
    return true;
}

} // namespace mct
