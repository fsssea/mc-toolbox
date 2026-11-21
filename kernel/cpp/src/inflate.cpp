#include "inflate.hpp"
#include <cstdio>

namespace mct {
namespace {

struct BitReader {
    const uint8_t* p = nullptr;
    size_t len = 0;
    size_t pos = 0;      // 字节位置
    uint32_t buf = 0;    // 位缓冲
    int cnt = 0;         // 缓冲里还有多少位
    bool bad = false;

    bool refill() {
        while (cnt < 24 && pos < len) {
            buf |= uint32_t(p[pos++]) << cnt;
            cnt += 8;
        }
        return cnt > 0;
    }
    int bits(int n) {
        if (n == 0) return 0;
        if (cnt < n && !refill()) {
            if (cnt < n) { bad = true; return 0; }
        }
        int v = int(buf & ((1u << n) - 1));
        buf >>= n;
        cnt -= n;
        return v;
    }
    void align() {
        int drop = cnt & 7;
        buf >>= drop;
        cnt -= drop;
    }
};

struct Huffman {
    uint16_t count[16];
    uint16_t symbol[288];
};

// 由码长构建 canonical Huffman 表
bool build(Huffman& h, const uint8_t* lengths, int n) {
    std::memset(h.count, 0, sizeof(h.count));
    for (int i = 0; i < n; ++i) h.count[lengths[i]]++;
    if (h.count[0] == n) return true;   // 全为空表，合法
    int left = 1;
    for (int len = 1; len < 16; ++len) {
        left <<= 1;
        left -= int(h.count[len]);
        if (left < 0) return false;    // 码表过长
    }
    uint16_t offs[16];
    offs[1] = 0;
    for (int len = 1; len < 15; ++len) offs[len + 1] = uint16_t(offs[len] + h.count[len]);
    h.count[0] = 0;
    for (int i = 0; i < n; ++i) {
        if (lengths[i]) h.symbol[offs[lengths[i]]++] = uint16_t(i);
    }
    return true;
}

int decodeSym(BitReader& br, const Huffman& h) {
    int code = 0, first = 0, index = 0;
    for (int len = 1; len <= 15; ++len) {
        code |= br.bits(1);
        if (br.bad) return -1;
        int cnt = h.count[len];
        if (code - first < cnt) return h.symbol[index + (code - first)];
        index += cnt;
        first = (first + cnt) << 1;
        code <<= 1;
    }
    return -1;
}

const int kLenBase[29] = {3,  4,  5,  6,  7,  8,  9,  10, 11,  13,  15,  17,  19,  23, 27,
                          31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258};
const int kLenExtra[29] = {0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2,
                           2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0};
const int kDistBase[30] = {1,    2,    3,    4,    5,    7,     9,     13,    17,  25,
                           33,   49,   65,   97,   129,  193,   257,   385,   513, 769,
                           1025, 1537, 2049, 3073, 4097, 6145,  8193,  12289, 16385, 24577};
const int kDistExtra[30] = {0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6,
                            6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13};

} // namespace

bool inflateRaw(const uint8_t* src, size_t srcLen, Bytes& out, std::string* err) {
    BitReader br;
    br.p = src;
    br.len = srcLen;

    Huffman lit, dist;
    uint8_t lengths[320];

    while (true) {
        if (br.bad) { if (err) *err = "bitstream truncated"; return false; }
        int final_ = br.bits(1);
        int type = br.bits(2);
        if (br.bad) { if (err) *err = "block header truncated"; return false; }

        if (type == 0) {   // stored
            br.align();
            // 直接按字节读 LEN / NLEN（此时 cnt 应为 0 或 8 的整数倍）
            br.pos -= size_t(br.cnt / 8);
            br.cnt = 0;
            br.buf = 0;
            if (br.pos + 4 > br.len) { if (err) *err = "stored header truncated"; return false; }
            uint16_t len = uint16_t(src[br.pos] | (src[br.pos + 1] << 8));
            br.pos += 2;
            uint16_t nlen = uint16_t(src[br.pos] | (src[br.pos + 1] << 8));
            br.pos += 2;
            if (uint16_t(~len) != nlen) { if (err) *err = "stored LEN/NLEN mismatch"; return false; }
            if (br.pos + len > br.len) { if (err) *err = "stored data truncated"; return false; }
            out.insert(out.end(), src + br.pos, src + br.pos + len);
            br.pos += len;
        } else if (type == 1) {   // fixed
            for (int i = 0; i < 144; ++i) lengths[i] = 8;
            for (int i = 144; i < 256; ++i) lengths[i] = 9;
            for (int i = 256; i < 280; ++i) lengths[i] = 7;
            for (int i = 280; i < 288; ++i) lengths[i] = 8;
            if (!build(lit, lengths, 288)) { if (err) *err = "bad fixed lit table"; return false; }
            for (int i = 0; i < 30; ++i) lengths[i] = 5;
            if (!build(dist, lengths, 30)) { if (err) *err = "bad fixed dist table"; return false; }
        } else if (type == 2) {   // dynamic
            int hlit = br.bits(5) + 257;
            int hdist = br.bits(5) + 1;
            int hclen = br.bits(4) + 4;
            if (br.bad) { if (err) *err = "dynamic header truncated"; return false; }
            static const uint8_t order[19] = {16, 17, 18, 0, 8,  7, 9,  6, 10, 5,
                                              11, 4,  12, 3, 13, 2, 14, 1, 15};
            uint8_t clen[19] = {0};
            for (int i = 0; i < hclen; ++i) clen[order[i]] = uint8_t(br.bits(3));
            Huffman cl;
            if (!build(cl, clen, 19)) { if (err) *err = "bad code-length table"; return false; }

            int n = 0;
            while (n < hlit + hdist) {
                int sym = decodeSym(br, cl);
                if (sym < 0) { if (err) *err = "bad code-length symbol"; return false; }
                if (sym < 16) {
                    lengths[n++] = uint8_t(sym);
                } else if (sym == 16) {
                    if (n == 0) { if (err) *err = "repeat with no previous"; return false; }
                    int rep = 3 + br.bits(2);
                    uint8_t prev = lengths[n - 1];
                    for (int k = 0; k < rep && n < hlit + hdist; ++k) lengths[n++] = prev;
                } else if (sym == 17) {
                    int rep = 3 + br.bits(3);
                    for (int k = 0; k < rep && n < hlit + hdist; ++k) lengths[n++] = 0;
                } else {
                    int rep = 11 + br.bits(7);
                    for (int k = 0; k < rep && n < hlit + hdist; ++k) lengths[n++] = 0;
                }
                if (br.bad) { if (err) *err = "code-length data truncated"; return false; }
            }
            if (!build(lit, lengths, hlit)) { if (err) *err = "bad literal table"; return false; }
            if (!build(dist, lengths + hlit, hdist)) { if (err) *err = "bad distance table"; return false; }
        } else {
            if (err) *err = "invalid block type";
            return false;
        }

        // 解块内符号
        if (type != 0) {
            while (true) {
                int sym = decodeSym(br, lit);
                if (sym < 0) { if (err) *err = "bad literal symbol"; return false; }
                if (sym < 256) {
                    out.push_back(uint8_t(sym));
                } else if (sym == 256) {
                    break;
                } else {
                    int idx = sym - 257;
                    if (idx >= 29) { if (err) *err = "bad length code"; return false; }
                    int len = kLenBase[idx] + br.bits(kLenExtra[idx]);
                    int dsym = decodeSym(br, dist);
                    if (dsym < 0 || dsym >= 30) { if (err) *err = "bad distance code"; return false; }
                    int d = kDistBase[dsym] + br.bits(kDistExtra[dsym]);
                    if (br.bad) { if (err) *err = "length/distance truncated"; return false; }
                    if (size_t(d) > out.size()) { if (err) *err = "distance beyond output"; return false; }
                    size_t from = out.size() - size_t(d);
                    for (int k = 0; k < len; ++k) out.push_back(out[from + size_t(k)]);
                }
            }
        }
        if (final_) break;
    }
    return true;
}

} // namespace mct
