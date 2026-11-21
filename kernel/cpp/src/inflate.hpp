#pragma once
// 自写 raw inflate（RFC 1951）：stored / fixed / dynamic Huffman 三种块。
// mcpack / zip 里的 deflate 本体就是这个，不需要 zlib。
#include "bytes.hpp"

namespace mct {

// 解压 raw deflate 流。成功返回 true，输出写入 out（out 内已有内容不会被清空，追加在尾部）。
bool inflateRaw(const uint8_t* src, size_t srcLen, Bytes& out, std::string* err = nullptr);

} // namespace mct
