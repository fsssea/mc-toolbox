// MC工具箱 · C++ 重制版（原生图形界面 + 命令行双模）
// 与经典版（WebView/Electron 套壳）、JAVA 版（Swing）不同：这套是原生 C++ 写死的内核 + 原生 GTK 前端，
// 不加载网页、不依赖 JVM/Electron，单文件可执行。
//
// 相对另两版的增强点：
//   1) 批量队列：一次处理多个包，结果逐条汇总
//   2) 多线程并行：线程数可调（默认 CPU 核数），大包批处理明显快
//   3) 逐包报表：条目数 / 归档数 / 体积变化 / 耗时
//   4) 打包规则可在界面里改：扩展名、排除目录、是否带图片、是否保留源条目、是否跳过空条目、UTF-8 校验
//   5) 同一二进制双模：无参数启动图形界面，带参数自动走命令行
//   6) 拖拽添加（GTK DnD）
#include "converter.hpp"
#include "zip.hpp"
#include <atomic>
#include <chrono>
#include <cstdio>
#include <cstring>
#include <memory>
#include <mutex>
#include <string>
#include <sys/stat.h>
#include <vector>
#ifdef MCT_GTK
#include <thread>
#endif

int cliMain(int argc, char** argv);

#ifdef MCT_GTK
#include <gtk/gtk.h>

namespace {

GtkWidget* gWin = nullptr;
GtkWidget* gList = nullptr;
GtkWidget* gLog = nullptr;
GtkWidget* gProgress = nullptr;
GtkWidget* gStatus = nullptr;
GtkWidget* gModePack = nullptr;
GtkWidget* gModeUnpack = nullptr;
GtkWidget* gOptImages = nullptr;
GtkWidget* gOptKeep = nullptr;
GtkWidget* gOptSkipEmpty = nullptr;
GtkWidget* gOptUtf8 = nullptr;
GtkWidget* gThreads = nullptr;
GtkWidget* gOutDir = nullptr;
GtkWidget* gStartBtn = nullptr;
GtkWidget* gAddBtn = nullptr;
GtkWidget* gClearBtn = nullptr;

std::vector<std::string> gFiles;
std::mutex gLogMutex;

const char* kCss =
    "window, .pane { background:#0d131a; color:#dbe6f2; }"
    "label, .hint { color:#a9b8c8; }"
    "title, .title { font-size:15px; font-weight:700; color:#eaf2fb; }"
    "button { background:#16202b; color:#dbe6f2; border:1px solid #26323f; border-radius:8px; padding:7px 14px; }"
    "button:hover { background:#1b2733; border-color:#33465a; }"
    "button:disabled { color:#5b6a7a; }"
    ".go { background:#1f6feb; border-color:#1f6feb; color:#ffffff; font-weight:700; }"
    ".go:hover { background:#2a7bf5; }"
    "entry, spinbutton, textview, scrolledwindow, list { background:#111a23; color:#dbe6f2; border:1px solid #26323f; border-radius:8px; }"
    "check, radio { color:#c6d4e2; }"
    "progressbar { color:#7dd3fc; }"
    "list row { padding:2px; }"
    "list row:selected { background:#1b2733; }"
    "textview text { background:#08101a; color:#c9d8e8; }";

std::string human(long long n) {
    char b[64];
    if (n >= 1024LL * 1024 * 1024) std::snprintf(b, sizeof b, "%.1f GB", n / 1073741824.0);
    else if (n >= 1024 * 1024) std::snprintf(b, sizeof b, "%.1f MB", n / 1048576.0);
    else if (n >= 1024) std::snprintf(b, sizeof b, "%.0f KB", n / 1024.0);
    else std::snprintf(b, sizeof b, "%lld B", n);
    return b;
}

std::string baseName(const std::string& p) {
    size_t k = p.find_last_of("/\\");
    return k == std::string::npos ? p : p.substr(k + 1);
}

std::string dirName(const std::string& p) {
    size_t k = p.find_last_of("/\\");
    return k == std::string::npos ? std::string(".") : p.substr(0, k);
}

long long fileSize(const std::string& p) {
    struct stat st;
    if (::stat(p.c_str(), &st) != 0) return 0;
    return (long long)st.st_size;
}

struct UiMsg {
    std::string text;
    double frac;
};

gboolean onUiMsg(gpointer data) {
    UiMsg* m = static_cast<UiMsg*>(data);
    if (gLog) {
        GtkTextBuffer* buf = gtk_text_view_get_buffer(GTK_TEXT_VIEW(gLog));
        GtkTextIter end;
        gtk_text_buffer_get_end_iter(buf, &end);
        gtk_text_buffer_insert(buf, &end, m->text.c_str(), -1);
        gtk_text_buffer_insert(buf, &end, "\n", -1);
        gtk_text_view_scroll_to_iter(GTK_TEXT_VIEW(gLog), &end, 0.0, FALSE, 0.0, 0.0);
    }
    if (gProgress && m->frac >= 0) gtk_progress_bar_set_fraction(GTK_PROGRESS_BAR(gProgress), m->frac);
    delete m;
    return G_SOURCE_REMOVE;
}

void post(const std::string& text, double frac = -1) {
    UiMsg* m = new UiMsg{text, frac};
    g_idle_add(onUiMsg, m);
}

void refreshList() {
    GList* rows = gtk_container_get_children(GTK_CONTAINER(gList));
    for (GList* it = rows; it; it = it->next) gtk_widget_destroy(GTK_WIDGET(it->data));
    g_list_free(rows);
    for (const auto& f : gFiles) {
        std::string label = baseName(f) + "   ·   " + human(fileSize(f));
        GtkWidget* row = gtk_label_new(label.c_str());
        gtk_widget_set_halign(row, GTK_ALIGN_START);
        gtk_widget_set_margin_start(row, 10);
        gtk_widget_set_margin_end(row, 10);
        gtk_widget_set_margin_top(row, 4);
        gtk_widget_set_margin_bottom(row, 4);
        gtk_list_box_insert(GTK_LIST_BOX(gList), row, -1);
    }
    gtk_widget_show_all(gList);
    gtk_widget_set_sensitive(gStartBtn, !gFiles.empty());
    char b[96];
    std::snprintf(b, sizeof b, "队列：%zu 个包", gFiles.size());
    gtk_label_set_text(GTK_LABEL(gStatus), b);
}

void addFile(const std::string& p) {
    if (p.empty()) return;
    for (const auto& f : gFiles)
        if (f == p) return;
    gFiles.push_back(p);
}

void onAddClicked(GtkWidget*, gpointer) {
    GtkWidget* dlg = gtk_file_chooser_dialog_new("选择要处理的包（可多选）", GTK_WINDOW(gWin),
                                                 GTK_FILE_CHOOSER_ACTION_OPEN, "取消", GTK_RESPONSE_CANCEL,
                                                 "添加", GTK_RESPONSE_ACCEPT, nullptr);
    gtk_file_chooser_set_select_multiple(GTK_FILE_CHOOSER(dlg), TRUE);
    GtkFileFilter* f = gtk_file_filter_new();
    gtk_file_filter_set_name(f, "MC / ZIP 包");
    for (const char* pat : {"*.mcaddon", "*.mcpack", "*.mcworld", "*.mctemplate", "*.zip", "*.mcstructure"})
        gtk_file_filter_add_pattern(f, pat);
    gtk_file_chooser_add_filter(GTK_FILE_CHOOSER(dlg), f);
    GtkFileFilter* all = gtk_file_filter_new();
    gtk_file_filter_set_name(all, "全部文件");
    gtk_file_filter_add_pattern(all, "*");
    gtk_file_chooser_add_filter(GTK_FILE_CHOOSER(dlg), all);
    if (gtk_dialog_run(GTK_DIALOG(dlg)) == GTK_RESPONSE_ACCEPT) {
        GSList* names = gtk_file_chooser_get_filenames(GTK_FILE_CHOOSER(dlg));
        for (GSList* it = names; it; it = it->next) addFile(static_cast<char*>(it->data));
        g_slist_free_full(names, g_free);
        refreshList();
    }
    gtk_widget_destroy(dlg);
}

void onClearClicked(GtkWidget*, gpointer) {
    gFiles.clear();
    refreshList();
}

void onDragData(GtkWidget*, GdkDragContext*, gint, gint, GtkSelectionData* sel, guint, guint) {
    gchar** uris = gtk_selection_data_get_uris(sel);
    if (!uris) return;
    int added = 0;
    for (gchar** u = uris; *u; ++u) {
        gchar* path = g_filename_from_uri(*u, nullptr, nullptr);
        if (path) {
            addFile(path);
            g_free(path);
            ++added;
        }
    }
    g_strfreev(uris);
    if (added) {
        refreshList();
        post("拖入 " + std::to_string(added) + " 个文件");
    }
}

void setBusy(bool busy) {
    gtk_widget_set_sensitive(gAddBtn, !busy);
    gtk_widget_set_sensitive(gClearBtn, !busy);
    gtk_widget_set_sensitive(gStartBtn, !busy && !gFiles.empty());
    gtk_widget_set_sensitive(gModePack, !busy);
    gtk_widget_set_sensitive(gModeUnpack, !busy);
}

void onStartClicked(GtkWidget*, gpointer) {
    if (gFiles.empty()) return;

    mct::ConvertOptions opt;
    opt.packImages = gtk_toggle_button_get_active(GTK_TOGGLE_BUTTON(gOptImages));
    opt.removeProcessedFiles = !gtk_toggle_button_get_active(GTK_TOGGLE_BUTTON(gOptKeep));
    opt.skipEmptyEntries = gtk_toggle_button_get_active(GTK_TOGGLE_BUTTON(gOptSkipEmpty));
    opt.utf8Only = gtk_toggle_button_get_active(GTK_TOGGLE_BUTTON(gOptUtf8));
    bool pack = gtk_toggle_button_get_active(GTK_TOGGLE_BUTTON(gModePack));
    std::string outDir = gtk_entry_get_text(GTK_ENTRY(gOutDir));
    int nThreads = gtk_spin_button_get_value_as_int(GTK_SPIN_BUTTON(gThreads));

    auto files = gFiles;
    setBusy(true);
    gtk_progress_bar_set_fraction(GTK_PROGRESS_BAR(gProgress), 0.0);
    gtk_text_view_set_editable(GTK_TEXT_VIEW(gLog), FALSE);
    post(std::string("开始 ") + (pack ? "打包" : "解包") + "：共 " + std::to_string(files.size()) + " 个包，线程 " +
         std::to_string(nThreads));

    std::shared_ptr<std::atomic<size_t>> idx = std::make_shared<std::atomic<size_t>>(0);
    std::shared_ptr<std::atomic<size_t>> doneOk = std::make_shared<std::atomic<size_t>>(0);
    std::shared_ptr<std::atomic<size_t>> doneBad = std::make_shared<std::atomic<size_t>>(0);
    std::shared_ptr<std::mutex> mtx = std::make_shared<std::mutex>();

    std::vector<std::thread> pool;
    for (int t = 0; t < nThreads; ++t) {
        pool.emplace_back([&, files, pack, outDir, opt, idx, doneOk, doneBad, mtx]() {
            for (;;) {
                size_t i = idx->fetch_add(1);
                if (i >= files.size()) return;
                const std::string& src = files[i];
                std::string dstDir = outDir.empty() ? dirName(src) : outDir;
                auto t0 = std::chrono::steady_clock::now();
                mct::ConvertResult r = pack ? mct::packArchive(src, dstDir, opt) : mct::unpackArchive(src, dstDir, opt);
                auto ms = std::chrono::duration_cast<std::chrono::milliseconds>(
                              std::chrono::steady_clock::now() - t0).count();
                long long inSz = fileSize(src), outSz = fileSize(r.outputPath);
                double pct = inSz > 0 && outSz > 0 ? (inSz - outSz) * 100.0 / inSz : 0.0;
                char line[512];
                if (r.ok) {
                    std::snprintf(line, sizeof line,
                                  "[%zu/%zu] ✓ %s → %s   %zu→%zu 文件 · %zu 归档 · %s→%s (%+.1f%%) · %lld ms", i + 1,
                                  files.size(), baseName(src).c_str(), baseName(r.outputPath).c_str(), r.filesIn,
                                  r.filesOut, r.archives, human(inSz).c_str(), human(outSz).c_str(), -pct,
                                  (long long)ms);
                    doneOk->fetch_add(1);
                } else {
                    std::snprintf(line, sizeof line, "[%zu/%zu] ✗ %s   %s", i + 1, files.size(), baseName(src).c_str(),
                                  r.error.c_str());
                    doneBad->fetch_add(1);
                }
                size_t finished = doneOk->load() + doneBad->load();
                post(line, files.size() ? double(finished) / double(files.size()) : 0.0);
                if (!r.logs.empty()) {
                    std::lock_guard<std::mutex> lk(*mtx);
                    for (const auto& l : r.logs) post("      · " + l);
                }
            }
        });
    }
    for (auto& th : pool) th.join();

    size_t ok = doneOk->load(), bad = doneBad->load();
    char sum[256];
    std::snprintf(sum, sizeof sum, "完成：成功 %zu，失败 %zu", ok, bad);
    post(sum, 1.0);
    gtk_progress_bar_set_text(GTK_PROGRESS_BAR(gProgress), sum);
    gtk_label_set_text(GTK_LABEL(gStatus), sum);
    setBusy(false);
}

GtkWidget* makeCheck(const char* text, bool on, GtkWidget* box, int row, int col) {
    GtkWidget* c = gtk_check_button_new_with_label(text);
    gtk_toggle_button_set_active(GTK_TOGGLE_BUTTON(c), on);
    gtk_grid_attach(GTK_GRID(box), c, col, row, 1, 1);
    return c;
}

int guiMain(int argc, char** argv) {
    gtk_init(&argc, &argv);

    GtkCssProvider* prov = gtk_css_provider_new();
    gtk_css_provider_load_from_data(prov, kCss, -1, nullptr);
    gtk_style_context_add_provider_for_screen(gdk_screen_get_default(), GTK_STYLE_PROVIDER(prov),
                                              GTK_STYLE_PROVIDER_PRIORITY_APPLICATION);

    gWin = gtk_window_new(GTK_WINDOW_TOPLEVEL);
    gtk_window_set_title(GTK_WINDOW(gWin), "MC工具箱 · C++ 重制版 6.3.0");
    gtk_window_set_default_size(GTK_WINDOW(gWin), 900, 720);
    g_signal_connect(gWin, "destroy", G_CALLBACK(gtk_main_quit), nullptr);

    GtkWidget* root = gtk_box_new(GTK_ORIENTATION_VERTICAL, 10);
    gtk_container_set_border_width(GTK_CONTAINER(root), 14);
    gtk_container_add(GTK_CONTAINER(gWin), root);

    GtkWidget* head = gtk_box_new(GTK_ORIENTATION_VERTICAL, 2);
    GtkWidget* title = gtk_label_new("MC工具箱  ·  C++ 重制版");
    gtk_widget_set_halign(title, GTK_ALIGN_START);
    gtk_style_context_add_class(gtk_widget_get_style_context(title), "title");
    GtkWidget* sub = gtk_label_new("原生 C++ 内核 · brarchive 打包/解包 · 批量并行 · 单文件静态，无 JVM 与浏览器依赖");
    gtk_widget_set_halign(sub, GTK_ALIGN_START);
    gtk_style_context_add_class(gtk_widget_get_style_context(sub), "hint");
    gtk_box_pack_start(GTK_BOX(head), title, FALSE, FALSE, 0);
    gtk_box_pack_start(GTK_BOX(head), sub, FALSE, FALSE, 0);
    gtk_box_pack_start(GTK_BOX(root), head, FALSE, FALSE, 0);

    // 文件队列
    GtkWidget* qLabel = gtk_label_new("待处理队列（可拖入文件）");
    gtk_widget_set_halign(qLabel, GTK_ALIGN_START);
    gtk_box_pack_start(GTK_BOX(root), qLabel, FALSE, FALSE, 0);
    GtkWidget* listWrap = gtk_scrolled_window_new(nullptr, nullptr);
    gtk_widget_set_size_request(listWrap, -1, 170);
    gtk_scrolled_window_set_policy(GTK_SCROLLED_WINDOW(listWrap), GTK_POLICY_AUTOMATIC, GTK_POLICY_AUTOMATIC);
    gList = gtk_list_box_new();
    gtk_list_box_set_selection_mode(GTK_LIST_BOX(gList), GTK_SELECTION_NONE);
    gtk_container_add(GTK_CONTAINER(listWrap), gList);
    gtk_box_pack_start(GTK_BOX(root), listWrap, FALSE, FALSE, 0);

    GtkWidget* qBtns = gtk_box_new(GTK_ORIENTATION_HORIZONTAL, 8);
    gAddBtn = gtk_button_new_with_label("添加包…");
    gClearBtn = gtk_button_new_with_label("清空");
    GtkWidget* hint = gtk_label_new("支持 .mcaddon / .mcpack / .mcworld / .mctemplate / .zip");
    gtk_style_context_add_class(gtk_widget_get_style_context(hint), "hint");
    gtk_box_pack_start(GTK_BOX(qBtns), gAddBtn, FALSE, FALSE, 0);
    gtk_box_pack_start(GTK_BOX(qBtns), gClearBtn, FALSE, FALSE, 0);
    gtk_box_pack_start(GTK_BOX(qBtns), hint, FALSE, FALSE, 0);
    gtk_box_pack_start(GTK_BOX(root), qBtns, FALSE, FALSE, 0);
    g_signal_connect(gAddBtn, "clicked", G_CALLBACK(onAddClicked), nullptr);
    g_signal_connect(gClearBtn, "clicked", G_CALLBACK(onClearClicked), nullptr);

    // 选项
    GtkWidget* optBox = gtk_frame_new("处理设置");
    GtkWidget* grid = gtk_grid_new();
    gtk_grid_set_row_spacing(GTK_GRID(grid), 8);
    gtk_grid_set_column_spacing(GTK_GRID(grid), 14);
    gtk_container_set_border_width(GTK_CONTAINER(grid), 10);
    gtk_container_add(GTK_CONTAINER(optBox), grid);

    gModePack = gtk_radio_button_new_with_label(nullptr, "打包  zip → __brarchive");
    gModeUnpack = gtk_radio_button_new_with_label_from_widget(GTK_RADIO_BUTTON(gModePack), "解包  __brarchive → zip");
    gtk_toggle_button_set_active(GTK_TOGGLE_BUTTON(gModePack), TRUE);
    gtk_grid_attach(GTK_GRID(grid), gModePack, 0, 0, 1, 1);
    gtk_grid_attach(GTK_GRID(grid), gModeUnpack, 1, 0, 1, 1);

    gOptImages = makeCheck("图片一起打包（.png/.jpg/.jpeg/.tga）", false, grid, 1, 0);
    gOptKeep = makeCheck("保留打包前的源条目", false, grid, 1, 1);
    gOptSkipEmpty = makeCheck("跳过 0 字节条目", true, grid, 2, 0);
    gOptUtf8 = makeCheck("只处理 UTF-8 文本", true, grid, 2, 1);

    GtkWidget* row3 = gtk_box_new(GTK_ORIENTATION_HORIZONTAL, 8);
    GtkWidget* outLabel = gtk_label_new("输出目录（留空=各包所在目录）");
    gOutDir = gtk_entry_new();
    gtk_entry_set_placeholder_text(GTK_ENTRY(gOutDir), "留空则输出到包所在目录");
    gtk_box_pack_start(GTK_BOX(row3), outLabel, FALSE, FALSE, 0);
    gtk_box_pack_start(GTK_BOX(row3), gOutDir, TRUE, TRUE, 0);
    gtk_grid_attach(GTK_GRID(grid), row3, 0, 3, 2, 1);

    GtkWidget* row4 = gtk_box_new(GTK_ORIENTATION_HORIZONTAL, 8);
    GtkWidget* thLabel = gtk_label_new("并行线程");
    gThreads = gtk_spin_button_new_with_range(1, 16, 1);
    int hw = (int)std::thread::hardware_concurrency();
    gtk_spin_button_set_value(GTK_SPIN_BUTTON(gThreads), hw > 0 ? (hw > 8 ? 8 : hw) : 4);
    GtkWidget* thHint = gtk_label_new("（批量时按包并行，线程越多越快，受磁盘影响）");
    gtk_style_context_add_class(gtk_widget_get_style_context(thHint), "hint");
    gtk_box_pack_start(GTK_BOX(row4), thLabel, FALSE, FALSE, 0);
    gtk_box_pack_start(GTK_BOX(row4), gThreads, FALSE, FALSE, 0);
    gtk_box_pack_start(GTK_BOX(row4), thHint, FALSE, FALSE, 0);
    gtk_grid_attach(GTK_GRID(grid), row4, 0, 4, 2, 1);

    gtk_box_pack_start(GTK_BOX(root), optBox, FALSE, FALSE, 0);

    // 操作行
    GtkWidget* act = gtk_box_new(GTK_ORIENTATION_HORIZONTAL, 10);
    gStartBtn = gtk_button_new_with_label("开始处理");
    gtk_style_context_add_class(gtk_widget_get_style_context(gStartBtn), "go");
    gtk_widget_set_sensitive(gStartBtn, FALSE);
    gStatus = gtk_label_new("队列：0 个包");
    gtk_widget_set_halign(gStatus, GTK_ALIGN_START);
    gtk_box_pack_start(GTK_BOX(act), gStartBtn, FALSE, FALSE, 0);
    gtk_box_pack_start(GTK_BOX(act), gStatus, TRUE, TRUE, 0);
    gtk_box_pack_start(GTK_BOX(root), act, FALSE, FALSE, 0);
    g_signal_connect(gStartBtn, "clicked", G_CALLBACK(onStartClicked), nullptr);

    gProgress = gtk_progress_bar_new();
    gtk_progress_bar_set_show_text(GTK_PROGRESS_BAR(gProgress), TRUE);
    gtk_box_pack_start(GTK_BOX(root), gProgress, FALSE, FALSE, 0);

    GtkWidget* logLabel = gtk_label_new("处理日志");
    gtk_widget_set_halign(logLabel, GTK_ALIGN_START);
    gtk_box_pack_start(GTK_BOX(root), logLabel, FALSE, FALSE, 0);
    GtkWidget* logWrap = gtk_scrolled_window_new(nullptr, nullptr);
    gtk_scrolled_window_set_policy(GTK_SCROLLED_WINDOW(logWrap), GTK_POLICY_AUTOMATIC, GTK_POLICY_AUTOMATIC);
    gLog = gtk_text_view_new();
    gtk_text_view_set_editable(GTK_TEXT_VIEW(gLog), FALSE);
    gtk_text_view_set_monospace(GTK_TEXT_VIEW(gLog), TRUE);
    gtk_text_view_set_wrap_mode(GTK_TEXT_VIEW(gLog), GTK_WRAP_WORD_CHAR);
    gtk_container_add(GTK_CONTAINER(logWrap), gLog);
    gtk_box_pack_start(GTK_BOX(root), logWrap, TRUE, TRUE, 0);

    // 拖拽
    GtkTargetEntry targets[] = {{(gchar*)"text/uri-list", 0, 0}};
    gtk_drag_dest_set(gWin, GTK_DEST_DEFAULT_ALL, targets, 1, GDK_ACTION_COPY);
    g_signal_connect(gWin, "drag-data-received", G_CALLBACK(onDragData), nullptr);

    refreshList();
    gtk_widget_show_all(gWin);
    gtk_main();
    return 0;
}

} // namespace

#else // 无 GTK 构建（Windows 交叉编译）：只保留命令行

int guiMain(int argc, char** argv) {
    (void)argc;
    (void)argv;
    std::printf("本构建不含图形界面。命令行用法：\n  mctool pack   <包> [输出目录]\n  mctool unpack <包> [输出目录]\n  mctool batch  <pack|unpack> <输出目录> <文件...>\n  mctool info   <包>\n  mctool selftest\n");
    return 0;
}

#endif

int main(int argc, char** argv) {
    if (argc > 1) return cliMain(argc, argv);
    return guiMain(argc, argv);
}
