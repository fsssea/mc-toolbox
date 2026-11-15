# MC工具箱 6.3.0

全端同步：Android、Windows、Linux、Web/PWA。

## 下载

- `MC-Toolbox-6.3.0.apk`：Android 10+，versionCode 73，已使用发布证书签名
- `MC-Toolbox-Windows-6.3.0.zip`：Windows 10/11 x64，解压即用
- `MC-Toolbox-Linux-6.3.0.tar.gz`：Linux x64 便携版
- `MC-Toolbox-Linux-6.3.0.deb`：Ubuntu / Debian 安装包
- `MC-Toolbox-Web-6.3.0.zip`：网页版离线包
- `MC-Toolbox-Source-6.3.0.zip`：完整源码（MIT）

## 6.3.0 更新

- 重做附加包制作器：方块、物品、生物、脚本按需生成，自动写行为包与资源包 manifest、贴图清单、语言文件和包图标。
- 生物包含行为 JSON、客户端实体 JSON、贴图、碰撞盒与 spawn egg；支持四足和人形两种基础模型。
- 脚本只生成游戏可执行的 JavaScript；选择脚本时自动补 `@minecraft/server` 依赖。
- UUID 与贴图全部本地生成，不依赖在线接口；生成前校验命名空间、ID、堆叠、生命值、颜色和空内容。
- 修复文件树跨根目录只显示第一层的问题，并合并重复的制作器入口。

## 说明

- 全部处理在本地完成，不上传存档。
- 源码以 MIT 许可发布，签名密钥不包含在仓库中。
- 非 Mojang 官方产品，与 Mojang / Microsoft 无隶属关系。
