#include "brarchive.hpp"
#include <stdexcept>
#include <algorithm>

namespace mct {

bool Brarchive::looksLike(const Bytes& d) {
    return d.size() >= 16 && rdU64(d.data()) == kBrMagic;
}

Bytes Brarchive::serialize(const std::vector<ZipEntry>& in) {
    if (in.empty()) throw std::runtime_error("no entries to encode");

    std::vector<const ZipEntry*> list;
    list.reserve(in.size());
    for (auto& e : in) list.push_back(&e);
    // 按名字排序，保证同一输入永远得到同一字节流（可复现构建）
    std::sort(list.begin(), list.end(), [](const ZipEntry* a, const ZipEntry* b) { return a->name < b->name; });

    for (auto* e : list) {
        if (e->name.size() > kBrNameMax)
            throw std::runtime_error("filename exceeds max length of 247 bytes: " + e->name);
    }

    Bytes out;
    out.reserve(16 + list.size() * kBrEntryHeader + 32);
    putU64(out, kBrMagic);
    putU32(out, uint32_t(list.size()));
    putU32(out, kBrVersion);

    uint32_t offset = 0;
    for (auto* e : list) {
        out.push_back(uint8_t(e->name.size()));
        size_t at = out.size();
        out.resize(at + kBrNameMax, 0);
        std::copy(e->name.begin(), e->name.end(), out.begin() + std::streamoff(at));
        putU32(out, offset);
        putU32(out, uint32_t(e->data.size()));
        offset += uint32_t(e->data.size());
    }
    for (auto* e : list) out.insert(out.end(), e->data.begin(), e->data.end());
    return out;
}

std::vector<ZipEntry> Brarchive::deserialize(const Bytes& data) {
    if (data.size() < 16) throw std::runtime_error("data too short for header");
    if (rdU64(data.data()) != kBrMagic) throw std::runtime_error("invalid magic");
    uint32_t count = rdU32(&data[8]);
    uint32_t version = rdU32(&data[12]);
    if (version != kBrVersion) throw std::runtime_error("unsupported version: " + std::to_string(version));

    size_t pos = 16;
    struct Desc {
        std::string name;
        uint32_t off, len;
    };
    std::vector<Desc> descs;
    descs.reserve(count);
    for (uint32_t i = 0; i < count; ++i) {
        if (pos + kBrEntryHeader > data.size()) throw std::runtime_error("truncated data reading entry header");
        uint8_t nameLen = data[pos];
        if (nameLen > kBrNameMax) throw std::runtime_error("entry name length exceeds max");
        std::string name(reinterpret_cast<const char*>(&data[pos + 1]), nameLen);
        uint32_t off = rdU32(&data[pos + 1 + kBrNameMax]);
        uint32_t len = rdU32(&data[pos + 1 + kBrNameMax + 4]);
        descs.push_back(Desc{name, off, len});
        pos += kBrEntryHeader;
    }
    size_t contentStart = pos;
    std::vector<ZipEntry> out;
    out.reserve(descs.size());
    for (auto& d : descs) {
        size_t start = contentStart + d.off;
        size_t end = start + d.len;
        if (end > data.size()) throw std::runtime_error("truncated content for " + d.name);
        ZipEntry e;
        e.name = d.name;
        e.data.assign(data.begin() + std::streamoff(start), data.begin() + std::streamoff(end));
        out.push_back(std::move(e));
    }
    return out;
}

} // namespace mct
