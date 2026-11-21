#pragma once
// 基础字节工具：小端读写、CRC32、UTF-8 校验。无任何第三方依赖。
#include <cstdint>
#include <cstring>
#include <string>
#include <vector>

namespace mct {

using Bytes = std::vector<uint8_t>;

inline uint32_t rdU32(const uint8_t* p) {
    return uint32_t(p[0]) | (uint32_t(p[1]) << 8) | (uint32_t(p[2]) << 16) | (uint32_t(p[3]) << 24);
}

inline uint64_t rdU64(const uint8_t* p) { return uint64_t(rdU32(p)) | (uint64_t(rdU32(p + 4)) << 32); }

inline void putU32(Bytes& b, uint32_t v) {
    b.push_back(uint8_t(v & 0xFF));
    b.push_back(uint8_t((v >> 8) & 0xFF));
    b.push_back(uint8_t((v >> 16) & 0xFF));
    b.push_back(uint8_t((v >> 24) & 0xFF));
}

inline void putU64(Bytes& b, uint64_t v) {
    putU32(b, uint32_t(v & 0xFFFFFFFFu));
    putU32(b, uint32_t((v >> 32) & 0xFFFFFFFFu));
}

inline uint32_t crc32(const uint8_t* data, size_t len, uint32_t crc = 0) {
    static uint32_t table[256];
    static bool init = false;
    if (!init) {
        for (uint32_t i = 0; i < 256; ++i) {
            uint32_t c = i;
            for (int k = 0; k < 8; ++k) c = (c & 1) ? 0xEDB88320u ^ (c >> 1) : (c >> 1);
            table[i] = c;
        }
        init = true;
    }
    crc = ~crc;
    for (size_t i = 0; i < len; ++i) crc = table[(crc ^ data[i]) & 0xFF] ^ (crc >> 8);
    return ~crc;
}

// 严格 UTF-8 校验：拒绝过长编码、代理区、越界码点。
inline bool isValidUtf8(const uint8_t* s, size_t n) {
    size_t i = 0;
    while (i < n) {
        uint8_t c = s[i];
        if (c < 0x80) { ++i; continue; }
        if (c >= 0xC2 && c <= 0xDF) {
            if (i + 1 >= n) return false;
            if ((s[i + 1] & 0xC0) != 0x80) return false;
            i += 2; continue;
        }
        if (c == 0xE0) {
            if (i + 2 >= n) return false;
            if (s[i + 1] < 0xA0 || s[i + 1] > 0xBF) return false;
            if ((s[i + 2] & 0xC0) != 0x80) return false;
            i += 3; continue;
        }
        if (c >= 0xE1 && c <= 0xEC) {
            if (i + 2 >= n) return false;
            if ((s[i + 1] & 0xC0) != 0x80 || (s[i + 2] & 0xC0) != 0x80) return false;
            i += 3; continue;
        }
        if (c == 0xED) {
            if (i + 2 >= n) return false;
            if (s[i + 1] < 0x80 || s[i + 1] > 0x9F) return false;   // 代理区
            if ((s[i + 2] & 0xC0) != 0x80) return false;
            i += 3; continue;
        }
        if (c >= 0xEE && c <= 0xEF) {
            if (i + 2 >= n) return false;
            if ((s[i + 1] & 0xC0) != 0x80 || (s[i + 2] & 0xC0) != 0x80) return false;
            i += 3; continue;
        }
        if (c == 0xF0) {
            if (i + 3 >= n) return false;
            if (s[i + 1] < 0x90 || s[i + 1] > 0xBF) return false;
            if ((s[i + 2] & 0xC0) != 0x80 || (s[i + 3] & 0xC0) != 0x80) return false;
            i += 4; continue;
        }
        if (c >= 0xF1 && c <= 0xF3) {
            if (i + 3 >= n) return false;
            if ((s[i + 1] & 0xC0) != 0x80 || (s[i + 2] & 0xC0) != 0x80 || (s[i + 3] & 0xC0) != 0x80) return false;
            i += 4; continue;
        }
        if (c == 0xF4) {
            if (i + 3 >= n) return false;
            if (s[i + 1] < 0x80 || s[i + 1] > 0x8F) return false;
            if ((s[i + 2] & 0xC0) != 0x80 || (s[i + 3] & 0xC0) != 0x80) return false;
            i += 4; continue;
        }
        return false;
    }
    return true;
}

inline bool isValidUtf8(const std::string& s) {
    return isValidUtf8(reinterpret_cast<const uint8_t*>(s.data()), s.size());
}

} // namespace mct
