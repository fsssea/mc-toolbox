#include "deflate.hpp"
#include <algorithm>
#include <cstring>
#include <vector>

namespace mct {
namespace {

struct BitWriter {
    Bytes out;
    uint32_t buf = 0;
    int cnt = 0;
    void put(uint32_t bits, int n) {   // 写入 n 个低位比特（LSB 优先）
        buf |= (bits & ((1u << n) - 1)) << cnt;
        cnt += n;
        while (cnt >= 8) {
            out.push_back(uint8_t(buf & 0xFF));
            buf >>= 8;
            cnt -= 8;
        }
    }
    void flush() {
        if (cnt > 0) {
            out.push_back(uint8_t(buf & 0xFF));
            buf = 0;
            cnt = 0;
        }
    }
};

inline uint32_t reverseBits(uint32_t code, int len) {
    uint32_t r = 0;
    for (int i = 0; i < len; ++i) {
        r = (r << 1) | (code & 1);
        code >>= 1;
    }
    return r;
}

// 固定 Huffman 字面/长度码：码长与码字（RFC 1951 §3.2.6）
struct FixedTable {
    uint16_t len[288];
    uint32_t code[288];
    FixedTable() {
        for (int i = 0; i < 288; ++i) {
            if (i <= 143) len[i] = 8;
            else if (i <= 255) len[i] = 9;
            else if (i <= 279) len[i] = 7;
            else len[i] = 8;
        }
        // canonical 分配
        uint32_t next[16] = {0};
        uint32_t c = 0;
        for (int l = 1; l <= 15; ++l) {
            c = (c + (l > 1 ? countPrev(l) : 0)) << 1;
            next[l] = c;
        }
        for (int i = 0; i < 288; ++i) code[i] = reverseBits(next[len[i]]++, len[i]);
    }
    int countPrev(int l) const {
        int n = 0;
        for (int i = 0; i < 288; ++i)
            if (len[i] == l - 1) ++n;
        return n;
    }
};

const int kLenBase[29] = {3,  4,  5,  6,  7,  8,  9,  10, 11,  13,  15,  17,  19,  23, 27,
                          31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258};
const int kLenExtra[29] = {0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2,
                           2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0};
const int kDistBase[30] = {1,    2,    3,    4,    5,    7,     9,     13,    17,  25,
                           33,   49,   65,   97,   129,  193,   257,   385,   513, 769,
                           1025, 1537, 2049, 3073, 4097, 6145,  8193,  12289, 16385, 24577};
const int kDistExtra[30] = {0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6,
                            6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13};

int lengthCode(int len) {
    for (int i = 28; i >= 0; --i)
        if (len >= kLenBase[i]) return i;
    return 0;
}

int distCode(int dist) {
    for (int i = 29; i >= 0; --i)
        if (dist >= kDistBase[i]) return i;
    return 0;
}

const FixedTable& fixed() {
    static FixedTable t;
    return t;
}

} // namespace

bool deflateRaw(const uint8_t* src, size_t len, Bytes& out) {
    if (len > (1u << 31)) return false;
    const FixedTable& t = fixed();
    BitWriter bw;
    bw.put(1, 1);   // BFINAL
    bw.put(1, 2);   // BTYPE = 01 固定 Huffman

    const size_t kWindow = 32768;
    const int kMaxMatch = 258;
    const size_t kHashSize = 1u << 15;
    static thread_local std::vector<int32_t> head;
    head.assign(kHashSize, -1);

    auto hash3 = [&](size_t i) -> uint32_t {
        uint32_t a = src[i], b = (i + 1 < len ? src[i + 1] : 0), c = (i + 2 < len ? src[i + 2] : 0);
        return ((a * 2654435761u) ^ (b * 40503u) ^ (c * 8191u)) & (kHashSize - 1);
    };

    auto emitLit = [&](uint8_t v) { bw.put(t.code[v], t.len[v]); };
    auto emitMatch = [&](int length, int dist) {
        int li = lengthCode(length);
        int sym = 257 + li;
        bw.put(t.code[sym], t.len[sym]);
        int extra = kLenExtra[li];
        if (extra) bw.put(uint32_t(length - kLenBase[li]), extra);
        int di = distCode(dist);
        bw.put(reverseBits(uint32_t(di), 5), 5);
        int dextra = kDistExtra[di];
        if (dextra) bw.put(uint32_t(dist - kDistBase[di]), dextra);
    };

    size_t i = 0;
    while (i < len) {
        int bestLen = 0, bestDist = 0;
        if (i + 2 < len) {
            uint32_t h = hash3(i);
            int32_t prev = head[h];
            if (prev >= 0 && size_t(i - size_t(prev)) <= kWindow) {
                size_t j = size_t(prev);
                size_t maxLen = std::min(size_t(kMaxMatch), len - i);
                size_t l = 0;
                while (l < maxLen && src[j + l] == src[i + l]) ++l;
                if (l >= 3) {
                    bestLen = int(l);
                    bestDist = int(i - j);
                }
            }
            head[h] = int32_t(i);
        }
        if (bestLen >= 3) {
            emitMatch(bestLen, bestDist);
            // 把匹配区间内的位置也登记进哈希，提升后续命中率
            size_t end = i + size_t(bestLen);
            for (size_t k = i + 1; k < end && k + 2 < len; ++k) {
                head[hash3(k)] = int32_t(k);
            }
            i = end;
        } else {
            emitLit(src[i]);
            ++i;
        }
    }
    bw.put(t.code[256], t.len[256]);   // 结束块符号 256
    bw.flush();
    out.insert(out.end(), bw.out.begin(), bw.out.end());
    return true;
}

} // namespace mct
