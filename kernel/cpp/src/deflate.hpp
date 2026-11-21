#pragma once
// 自写 deflate 编码器（RFC 1951，固定 Huffman + 贪心 LZ77）。
// 目的：让输出的 mcpack / mcaddon 体积保持在合理范围，不依赖 zlib。
#include "bytes.hpp"

namespace mct {

// 压缩 raw deflate；返回是否压缩（false 表示不建议使用，调用方可退回 STORE）
bool deflateRaw(const uint8_t* src, size_t len, Bytes& out);

} // namespace mct
