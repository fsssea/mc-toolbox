#pragma once
// 打包 / 解包：zip(或 .mcpack) ⇄ __brarchive
#include "zip.hpp"
#include <string>
#include <vector>

namespace mct {

struct ConvertOptions {
    std::vector<std::string> includeExts{".json", ".json5", ".ui"};
    std::vector<std::string> excludeDirs{"textures", "materials", "texts", "sounds"};
    std::vector<std::string> specialFolders{"subpacks"};
    std::vector<std::string> excludeFiles{"ui/_global_variables.json"};
    std::string outputDir = "__brarchive";
    bool packImages = false;
    bool removeProcessedFiles = true;
    bool skipEmptyEntries = true;
    bool utf8Only = true;
};

struct ConvertResult {
    bool ok = false;
    std::string outputPath;
    std::string error;
    std::vector<std::string> logs;
    size_t filesIn = 0, filesOut = 0, archives = 0;
};

ConvertResult packArchive(const std::string& inputPath, const std::string& outDir, const ConvertOptions& opt = {});
ConvertResult unpackArchive(const std::string& inputPath, const std::string& outDir, const ConvertOptions& opt = {});

// 供界面直接使用：输入字节 → 输出字节
bool packBytes(const Bytes& zipIn, Bytes& zipOut, const ConvertOptions& opt, std::vector<std::string>* logs,
               std::string* err);
bool unpackBytes(const Bytes& zipIn, Bytes& zipOut, const ConvertOptions& opt, std::vector<std::string>* logs,
                 std::string* err);

} // namespace mct
