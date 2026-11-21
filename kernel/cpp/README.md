# MC工具箱 · C++ 内核与原生界面

自写实现，不依赖 zlib、不加载网页、不需要 JVM/Electron。同一份源码编出两个目标：

- `mctool`：静态命令行（任何 Linux 发行版直接跑；Windows 交叉编译为 mctool.exe）
- `mctool-gui`：原生 GTK3 图形界面（`-DMCT_GTK`）

## 构建

```bash
# Linux 图形界面（需要 libgtk-3-dev）
g++ -std=c++17 -O2 -DMCT_GTK $(pkg-config --cflags gtk+-3.0) \
    -o mctool-gui src/*.cpp $(pkg-config --libs gtk+-3.0) -pthread

# Linux 静态命令行
g++ -std=c++17 -O2 -static -o mctool src/*.cpp

# Windows x64（静态，无运行库依赖）
x86_64-w64-mingw32-g++ -std=c++17 -O2 -static -o mctool.exe src/*.cpp
```

## 相对另两版的增强

- 批量队列 + 多线程并行（线程数可调）
- 逐包报表：条目数 / 归档数 / 体积变化 / 耗时
- 打包规则界面可改（扩展名、排除目录、图片、保留源条目、跳过空条目、UTF-8 校验）
- 同一二进制双模：无参数进图形界面，带参数走命令行

## 命令行

```
mctool pack   <包> [输出目录]
mctool unpack <包> [输出目录]
mctool batch  <pack|unpack> <输出目录> <文件...>
mctool info   <包>
mctool selftest
```

## 已知限制

Windows 侧目前只构建命令行版（mingw 的 win32 线程模型没有 std::thread，批量为顺序处理）；原生 Win32 图形界面仍在开发。
