#pragma once
// __brarchive 二进制容器编解码（Little-Endian）
//   Header: magic u64(0x267052A0B125277D) + entries u32 + version u32   = 16 字节
//   Descriptor × n: nameLen u8 + name[247] + offset u32 + length u32  = 256 字节
//   Content: 按描述符顺序拼接
// 说明：格式规范来自 wisebreeze/brarchive-flutter 的公开文档（Apache-2.0），
//       本实现为独立重写，不复制其代码。
#include "bytes.hpp"
#include "zip.hpp"

namespace mct {

constexpr uint64_t kBrMagic = 0x267052A0B125277DuLL;
constexpr uint32_t kBrVersion = 1;
constexpr size_t kBrNameMax = 247;
constexpr size_t kBrEntryHeader = 1 + kBrNameMax + 4 + 4;

struct Brarchive {
    static Bytes serialize(const std::vector<ZipEntry>& entries);
    static std::vector<ZipEntry> deserialize(const Bytes& data);
    static bool looksLike(const Bytes& data);
};

} // namespace mct
