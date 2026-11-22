package com.doubao.mctoolbox;

import android.app.Activity;
import android.app.DownloadManager;
import android.content.ContentValues;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.os.SystemClock;
import android.provider.MediaStore;
import android.view.KeyEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowInsets;
import android.view.WindowInsetsController;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.Toast;

import java.io.OutputStream;
import java.io.InputStreamReader;
import java.io.BufferedReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;
import android.util.Base64;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.BufferedWriter;
import java.io.InputStream;
import java.io.OutputStream;

public class MainActivity extends Activity {

    private static final int REQ_PICK_FILE = 1001;
    private WebView web;
    private ValueCallback<Uri[]> filePathCallback;
    private long lastBackTime = 0;
    private boolean pageLoaded = false;

    // Chunker 转换任务表放在 Activity 层，Bridge 是内部类不能声明 static 成员
    private static final Map<String, ChunkerTask> CHUNKER_TASKS = new ConcurrentHashMap<>();
    private static final AtomicInteger CHUNKER_SEQ = new AtomicInteger();

    private static class ChunkerTask {
        volatile String state = "queued";
        volatile String log = "";
        volatile String output = "";
        volatile String error = "";
        volatile Process process;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        FrameLayout root = new FrameLayout(this);
        root.setBackgroundColor(0xFF12151B);
        web = new WebView(this);
        web.setBackgroundColor(0xFF12151B);
        root.addView(web, new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        setContentView(root);

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setAllowFileAccess(true);
        s.setAllowContentAccess(true);
        s.setAllowFileAccessFromFileURLs(true);
        s.setAllowUniversalAccessFromFileURLs(true);
        s.setDatabaseEnabled(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setSupportZoom(false);
        s.setUseWideViewPort(true);
        s.setLoadWithOverviewMode(true);
        s.setTextZoom(100);
        s.setMinimumFontSize(0);
        s.setMinimumLogicalFontSize(0);
        s.setBuiltInZoomControls(false);
        s.setDisplayZoomControls(false);

        web.addJavascriptInterface(new Bridge(), "AndroidBridge");
        // 兜底：http(s) 链接交给系统下载器（blob/data 由 Bridge.saveBinary 处理）
        web.setDownloadListener(new android.webkit.DownloadListener() {
            @Override
            public void onDownloadStart(String url, String userAgent, String contentDisposition,
                                        String mimeType, long contentLength) {
                try {
                    if (url == null || url.startsWith("blob:") || url.startsWith("data:")) {
                        toast("该下载走页面桥接，请重试一次");
                        return;
                    }
                    DownloadManager dm = (DownloadManager) getSystemService(DOWNLOAD_SERVICE);
                    DownloadManager.Request req = new DownloadManager.Request(Uri.parse(url));
                    req.setMimeType(mimeType);
                    req.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
                    String name = android.webkit.URLUtil.guessFileName(url, contentDisposition, mimeType);
                    req.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, "MC工具箱/" + name);
                    dm.enqueue(req);
                    toast("已交给系统下载：" + name);
                } catch (Throwable e) {
                    toast("下载失败：" + e.getMessage());
                }
            }
        });
        web.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                pageLoaded = true;
                // 防止系统字号/概览模式把页面放大成“比例失衡”
                try {
                    view.getSettings().setTextZoom(100);
                } catch (Throwable e) { }
            }

            @Override
            public boolean onRenderProcessGone(WebView view, android.webkit.RenderProcessGoneDetail detail) {
                // 渲染进程被系统回收：直接重建 Activity，避免留一块黑屏
                pageLoaded = false;
                recreate();
                return true;
            }
        });
        web.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onShowFileChooser(WebView view, ValueCallback<Uri[]> callback,
                                             FileChooserParams params) {
                if (filePathCallback != null) {
                    filePathCallback.onReceiveValue(null);
                }
                filePathCallback = callback;
                Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);
                intent.addCategory(Intent.CATEGORY_OPENABLE);
                intent.setType("*/*");
                String[] types = new String[]{
                        "application/zip", "application/octet-stream", "*/*"
                };
                intent.putExtra(Intent.EXTRA_MIME_TYPES, types);
                try {
                    startActivityForResult(Intent.createChooser(intent, "选择世界文件"), REQ_PICK_FILE);
                } catch (Exception e) {
                    filePathCallback = null;
                    Toast.makeText(MainActivity.this, "无法打开文件选择器", Toast.LENGTH_SHORT).show();
                    return false;
                }
                return true;
            }
        });

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            WebView.setWebContentsDebuggingEnabled(true);
        }
        web.loadUrl("file:///android_asset/index.html");
    }

    /** 回到前台时检查页面是否还在：WebView 渲染进程被系统回收后会变成白屏/黑屏，这里自动重载 */
    @Override
    protected void onResume() {
        super.onResume();
        if (web == null) return;
        web.resumeTimers();
        web.onResume();
        web.invalidate();
        if (!pageLoaded) {
            web.loadUrl("file:///android_asset/index.html");
            return;
        }
        // 页面被回收/白屏时自动重载；正常返回则完全保留上一次的界面和已打开的文件
        web.evaluateJavascript("(document.getElementById('pickBtn')?1:0)", value -> {
            if (!"1".equals(value) && web != null) {
                pageLoaded = false;
                web.loadUrl("file:///android_asset/index.html");
            }
        });
    }

    @Override
    protected void onPause() {
        if (web != null) web.onPause();
        super.onPause();
    }

    @Override
    protected void onDestroy() {
        if (web != null) {
            web.destroy();
            web = null;
        }
        super.onDestroy();
    }

    /** 返回键：两秒内按两次才退出，单次只提示，避免误触直接关掉 */
    @Override
    public void onBackPressed() {
        // 先关弹窗 / 右键菜单，再考虑退出；外接键盘的 Esc 也走同一逻辑
        if (web != null) {
            web.evaluateJavascript(
                "(function(){var m=document.getElementById('modal');if(m&&getComputedStyle(m).display!=='none'){m.style.display='none';return '1';}var o=document.getElementById('i18nOverlay');if(o&&getComputedStyle(o).display!=='none'){o.style.display='none';document.body.classList.remove('mci-lock');return '1';}var c=document.getElementById('ctxMenu');if(c){c.remove();return '1';}return '0';})()",
                value -> {
                    if (value != null && value.contains("1")) return;
                    finishBack();
                });
            return;
        }
        finishBack();
    }

    private void finishBack() {
        long now = SystemClock.uptimeMillis();
        if (now - lastBackTime < 2000) {
            super.onBackPressed();
        } else {
            lastBackTime = now;
            Toast.makeText(this, "再按一次返回键退出", Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == REQ_PICK_FILE) {
            Uri[] results = null;
            if (resultCode == Activity.RESULT_OK && data != null && data.getData() != null) {
                results = new Uri[]{data.getData()};
            }
            if (filePathCallback != null) {
                filePathCallback.onReceiveValue(results);
                filePathCallback = null;
            }
            return;
        }
        super.onActivityResult(requestCode, resultCode, data);
    }

    private void toast(final String msg) {
        runOnUiThread(new Runnable() {
            @Override public void run() {
                Toast.makeText(MainActivity.this, msg, Toast.LENGTH_LONG).show();
            }
        });
    }

    public class Bridge {
        /** 把文本写入系统“下载”目录下的 MCBE解析 文件夹 */
        @JavascriptInterface
        public String saveFile(String name, String content) {
            try {
                ContentValues values = new ContentValues();
                values.put(MediaStore.Downloads.DISPLAY_NAME, name);
                values.put(MediaStore.Downloads.MIME_TYPE,
                        name.endsWith(".json") ? "application/json" : "text/plain");
                values.put(MediaStore.Downloads.RELATIVE_PATH,
                        "Download/MCBE解析");
                values.put(MediaStore.Downloads.IS_PENDING, 1);
                Uri uri = getContentResolver().insert(
                        MediaStore.Downloads.EXTERNAL_CONTENT_URI, values);
                if (uri == null) return "ERR:insert failed";
                OutputStream os = getContentResolver().openOutputStream(uri);
                os.write(content.getBytes("UTF-8"));
                os.flush();
                os.close();
                values.clear();
                values.put(MediaStore.Downloads.IS_PENDING, 0);
                getContentResolver().update(uri, values, null, null);
                return uri.toString();
            } catch (Exception e) {
                return "ERR:" + e.getMessage();
            }
        }

        /** 保存二进制（base64）到系统「下载/MC工具箱」，装不上再退回应用目录 */
        @JavascriptInterface
        public String saveBinary(String name, String base64) {
            try {
                byte[] data = Base64.decode(base64, Base64.DEFAULT);
                String safeName = name == null ? "download.bin" : name.replace('\\', '/');
                int slash = safeName.lastIndexOf('/');
                if (slash >= 0) safeName = safeName.substring(slash + 1);
                if (safeName.isEmpty()) safeName = "download.bin";
                String mime = guessMime(safeName);

                if (Build.VERSION.SDK_INT >= 29) {
                    ContentValues v = new ContentValues();
                    v.put(MediaStore.Downloads.DISPLAY_NAME, safeName);
                    v.put(MediaStore.Downloads.MIME_TYPE, mime);
                    v.put(MediaStore.Downloads.RELATIVE_PATH, "Download/MC工具箱");
                    v.put(MediaStore.Downloads.IS_PENDING, 1);
                    Uri uri = getContentResolver().insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, v);
                    if (uri != null) {
                        OutputStream os = getContentResolver().openOutputStream(uri);
                        os.write(data);
                        os.flush();
                        os.close();
                        v.clear();
                        v.put(MediaStore.Downloads.IS_PENDING, 0);
                        getContentResolver().update(uri, v, null, null);
                        String shown = "下载/MC工具箱/" + safeName;
                        toast("已保存到 " + shown);
                        return shown;
                    }
                }

                File dir = new File(getExternalFilesDir(null), "Download");
                if (!dir.exists()) dir.mkdirs();
                File out = new File(dir, safeName);
                FileOutputStream fos = new FileOutputStream(out);
                fos.write(data);
                fos.flush();
                fos.close();
                toast("已保存到 " + out.getAbsolutePath());
                return out.getAbsolutePath();
            } catch (Throwable e) {
                toast("保存失败：" + e.getMessage());
                return "ERR:" + e.getMessage();
            }
        }

        private String guessMime(String n) {
            String l = n.toLowerCase();
            if (l.endsWith(".mcaddon") || l.endsWith(".mcpack")) return "application/zip";
            if (l.endsWith(".zip")) return "application/zip";
            if (l.endsWith(".json") || l.endsWith(".json5")) return "application/json";
            if (l.endsWith(".csv")) return "text/csv";
            if (l.endsWith(".log") || l.endsWith(".txt")) return "text/plain";
            if (l.endsWith(".png")) return "image/png";
            if (l.endsWith(".jpg") || l.endsWith(".jpeg")) return "image/jpeg";
            return "application/octet-stream";
        }

        @JavascriptInterface
        public String appDirPath() {
            File d = getExternalFilesDir(null);
            return d == null ? "" : d.getAbsolutePath();
        }

        private File safeFile(String name) {
            try {
                File root = getExternalFilesDir(null);
                if (root == null) return null;
                String n = name == null ? "" : name.replace('\\', '/');
                while (n.startsWith("/")) n = n.substring(1);
                File f = new File(root, n);
                String rootPath = root.getCanonicalPath();
                if (!f.getCanonicalPath().startsWith(rootPath + File.separator)) return null;
                return f;
            } catch (Exception e) { return null; }
        }

        @JavascriptInterface
        public String listAppFiles() {
            try {
                File root = getExternalFilesDir(null);
                if (root == null) return "[]";
                StringBuilder sb = new StringBuilder("[");
                collectFiles(root, root, sb, 0);
                if (sb.length() > 1) sb.setLength(sb.length() - 1);
                sb.append("]");
                return sb.toString();
            } catch (Throwable e) { return "[]"; }
        }

        private void collectFiles(File root, File dir, StringBuilder sb, int depth) {
            if (depth > 3 || dir == null || !dir.isDirectory()) return;
            File[] fs = dir.listFiles();
            if (fs == null) return;
            java.util.Arrays.sort(fs, (a, b) -> a.getName().compareToIgnoreCase(b.getName()));
            for (File f : fs) {
                String rel = f.getAbsolutePath().substring(root.getAbsolutePath().length() + 1).replace('\\', '/');
                if (f.isDirectory()) {
                    sb.append("{\"name\":\"").append(escapeJson(rel)).append("\",\"dir\":true,\"size\":0},");
                    collectFiles(root, f, sb, depth + 1);
                } else {
                    sb.append("{\"name\":\"").append(escapeJson(rel)).append("\",\"dir\":false,\"size\":").append(f.length()).append("},");
                }
            }
        }

        private String escapeJson(String s) {
            return s.replace("\\", "\\\\").replace("\"", "\\\"").replace("\n", "\\n");
        }

        @JavascriptInterface
        public String readAppFile(String name) {
            try {
                File f = safeFile(name);
                if (f == null || !f.isFile()) return "ERR:not found";
                if (f.length() > 64L * 1024 * 1024) return "ERR:too large";
                byte[] buf = new byte[(int) f.length()];
                FileInputStream in = new FileInputStream(f);
                int off = 0;
                while (off < buf.length) {
                    int n = in.read(buf, off, buf.length - off);
                    if (n <= 0) break;
                    off += n;
                }
                in.close();
                return Base64.encodeToString(buf, Base64.NO_WRAP);
            } catch (Throwable e) { return "ERR:" + e.getMessage(); }
        }

        @JavascriptInterface
        public String writeAppFile(String name, String base64) {
            try {
                File f = safeFile(name);
                if (f == null) return "ERR:bad path";
                File parent = f.getParentFile();
                if (parent != null && !parent.exists()) parent.mkdirs();
                byte[] data = Base64.decode(base64, Base64.DEFAULT);
                FileOutputStream out = new FileOutputStream(f);
                out.write(data);
                out.flush();
                out.close();
                return "OK";
            } catch (Throwable e) { return "ERR:" + e.getMessage(); }
        }

        // ===== Chunker 1.21.0 完整存档转换（Android，32/64 位自适应） =====
        private File chunkerRoot() { return new File(getFilesDir(), "chunker"); }

        private boolean chunkerAbi64() {
            try {
                if (android.os.Process.is64Bit()) {
                    for (String abi : Build.SUPPORTED_64_BIT_ABIS) {
                        if ("arm64-v8a".equals(abi)) return true;
                    }
                }
                for (String abi : Build.SUPPORTED_ABIS) {
                    if ("armeabi-v7a".equals(abi) || "armeabi".equals(abi)) return false;
                    if ("arm64-v8a".equals(abi) && android.os.Process.is64Bit()) return true;
                }
            } catch (Throwable e) { }
            return false;
        }

        private boolean chunkerIsArm() {
            try {
                for (String abi : Build.SUPPORTED_ABIS) {
                    if ("arm64-v8a".equals(abi) || "armeabi-v7a".equals(abi) || "armeabi".equals(abi)) return true;
                }
            } catch (Throwable e) { }
            return false;
        }

        @JavascriptInterface
        public String chunkerInfo() {
            try {
                boolean arm = chunkerIsArm();
                boolean arm64 = arm && chunkerAbi64();
                File root = chunkerRoot();
                boolean ready = new File(root, ".ready").isFile();
                return "{\"supported\":" + (arm ? "true" : "false") +
                        ",\"abi\":\"" + (arm64 ? "arm64-v8a" : (arm ? "armeabi-v7a" : "unsupported")) + "\"" +
                        ",\"version\":\"1.21.0\",\"ready\":" + (ready ? "true" : "false") +
                        ",\"engine\":\"Chunker CLI (MIT)\"}";
            } catch (Throwable e) {
                return "{\"supported\":false,\"error\":\"" + escapeJson(String.valueOf(e.getMessage())) + "\"}";
            }
        }

        private synchronized void ensureChunkerEngine() throws Exception {
            File root = chunkerRoot();
            File ready = new File(root, ".ready");
            File jar = new File(root, "cli.jar");
            File jre = new File(root, "jre");
            if (ready.isFile() && jar.isFile() && new File(jre, "lib/jvm/java-17-openjdk/bin/java").isFile()) return;
            root.mkdirs();
            if (ready.exists()) ready.delete();
            // 清理可能残留的半解压目录
            if (jre.exists()) deleteRec(jre);
            copyAsset("chunker/cli.jar", jar);
            String zipName = chunkerAbi64() ? "chunker/arm64.zip" : "chunker/arm32.zip";
            unzipAsset(zipName, jre);
            // 给 java 与 jspawnhelper 等可执行文件补权限
            chmodTree(jre);
            java.io.FileWriter w = new java.io.FileWriter(ready);
            w.write("ok\n");
            w.close();
        }

        private void copyAsset(String asset, File dst) throws Exception {
            File parent = dst.getParentFile();
            if (parent != null) parent.mkdirs();
            InputStream in = getAssets().open(asset);
            FileOutputStream out = new FileOutputStream(dst);
            byte[] buf = new byte[65536];
            int n;
            while ((n = in.read(buf)) > 0) out.write(buf, 0, n);
            in.close();
            out.flush();
            out.close();
        }

        private void unzipAsset(String asset, File dest) throws Exception {
            dest.mkdirs();
            String destPath = dest.getCanonicalPath();
            ZipInputStream zin = new ZipInputStream(getAssets().open(asset));
            ZipEntry ze;
            byte[] buf = new byte[65536];
            while ((ze = zin.getNextEntry()) != null) {
                String name = ze.getName().replace('\\', '/');
                if (name.startsWith("/") || name.contains("../")) continue;
                File out = new File(dest, name);
                String outPath = out.getCanonicalPath();
                if (!outPath.equals(destPath) && !outPath.startsWith(destPath + File.separator)) continue;
                if (ze.isDirectory()) {
                    out.mkdirs();
                } else {
                    File parent = out.getParentFile();
                    if (parent != null) parent.mkdirs();
                    FileOutputStream fos = new FileOutputStream(out);
                    int n;
                    while ((n = zin.read(buf)) > 0) fos.write(buf, 0, n);
                    fos.flush();
                    fos.close();
                }
                zin.closeEntry();
            }
            zin.close();
        }

        private void chmodTree(File f) {
            if (f == null) return;
            if (f.isDirectory()) {
                File[] fs = f.listFiles();
                if (fs != null) for (File c : fs) chmodTree(c);
            } else {
                String n = f.getName();
                if (n.equals("java") || n.equals("keytool") || n.equals("jspawnhelper")
                        || n.equals("jfr") || n.equals("jrunscript") || n.equals("rmiregistry")
                        || n.endsWith(".so")) {
                    f.setExecutable(true, false);
                    f.setReadable(true, false);
                }
            }
        }

        @JavascriptInterface
        public String chunkerStart(String inputPath, String targetFormat, String outName) {
            try {
                if (!chunkerIsArm()) return "{\"ok\":false,\"error\":\"当前设备不是 ARM，Chunker 引擎暂不支持\"}";
                File in = safeFile(inputPath);
                if (in == null || !in.isFile()) return "{\"ok\":false,\"error\":\"输入文件不存在\"}";
                String target = (targetFormat == null || targetFormat.trim().isEmpty()) ? "INPUT" : targetFormat.trim();
                String id = "c" + System.currentTimeMillis() + "_" + CHUNKER_SEQ.incrementAndGet();
                ChunkerTask task = new ChunkerTask();
                CHUNKER_TASKS.put(id, task);
                final String fid = id, fout = outName == null ? "转换结果.zip" : outName;
                new Thread(() -> runChunker(fid, task, in, target, fout), "chunker-" + id).start();
                return "{\"ok\":true,\"id\":\"" + id + "\"}";
            } catch (Throwable e) {
                return "{\"ok\":false,\"error\":\"" + escapeJson(String.valueOf(e.getMessage())) + "\"}";
            }
        }

        @JavascriptInterface
        public String chunkerStatus(String id) {
            ChunkerTask t = CHUNKER_TASKS.get(id);
            if (t == null) return "{\"state\":\"missing\",\"error\":\"任务不存在\"}";
            return "{\"state\":\"" + escapeJson(t.state) + "\",\"log\":\"" + escapeJson(t.log) +
                    "\",\"output\":\"" + escapeJson(t.output) + "\",\"error\":\"" + escapeJson(t.error) + "\"}";
        }

        @JavascriptInterface
        public String chunkerCancel(String id) {
            ChunkerTask t = CHUNKER_TASKS.get(id);
            if (t != null && t.process != null) {
                try { t.process.destroy(); } catch (Throwable e) { }
                t.state = "cancelled";
                return "OK";
            }
            return "ERR:not running";
        }

        private void runChunker(String id, ChunkerTask task, File input, String target, String outName) {
            File root = chunkerRoot();
            File work = new File(root, "work/" + id);
            try {
                task.state = "preparing";
                ensureChunkerEngine();
                deleteRec(work);
                File inDir = new File(work, "in");
                File outDir = new File(work, "out");
                File tmp = new File(work, "tmp");
                inDir.mkdirs(); outDir.mkdirs(); tmp.mkdirs();
                unzipFile(input, inDir);
                File world = normalizeWorld(inDir);
                task.log = "输入：" + input.getName() + "\n目标格式：" + target + "\n";
                File jre = new File(root, "jre");
                File javaBin = new File(jre, "lib/jvm/java-17-openjdk/bin/java");
                if (!javaBin.isFile()) throw new Exception("内置 Java 运行时缺失");
                javaBin.setExecutable(true, false);

                List<String> cmd = new ArrayList<>();
                // Android 10+ 禁止直接 exec 应用私有目录的可执行文件；用系统 linker 载入，
                // 这与 ChunkoidNG 的 JavaProcessManager 做法一致。
                if (Build.VERSION.SDK_INT >= 29) {
                    cmd.add(chunkerAbi64() ? "/system/bin/linker64" : "/system/bin/linker");
                }
                cmd.add(javaBin.getAbsolutePath());
                cmd.add("-Xmx384m");
                cmd.add("-Xss1m");
                cmd.add("-Djava.io.tmpdir=" + tmp.getAbsolutePath());
                cmd.add("-jar");
                cmd.add(new File(root, "cli.jar").getAbsolutePath());
                cmd.add("-i"); cmd.add(world.getAbsolutePath());
                cmd.add("-o"); cmd.add(outDir.getAbsolutePath());
                cmd.add("-f"); cmd.add(target);

                ProcessBuilder pb = new ProcessBuilder(cmd);
                pb.directory(root);
                pb.redirectErrorStream(true);
                Map<String, String> env = pb.environment();
                String lib1 = new File(jre, "lib/jvm/java-17-openjdk/lib").getAbsolutePath();
                String lib2 = new File(jre, "lib/jvm/java-17-openjdk/lib/server").getAbsolutePath();
                String lib3 = new File(jre, "lib").getAbsolutePath();
                env.put("LD_LIBRARY_PATH", lib3 + ":" + lib1 + ":" + lib2);
                env.put("JAVA_HOME", new File(jre, "lib/jvm/java-17-openjdk").getAbsolutePath());
                env.put("PATH", new File(jre, "bin").getAbsolutePath() + ":/system/bin:/vendor/bin");
                env.put("HOME", work.getAbsolutePath());
                env.put("TMPDIR", tmp.getAbsolutePath());
                env.put("LANG", "C.UTF-8");

                task.state = "running";
                Process p = pb.start();
                task.process = p;
                BufferedReader r = new BufferedReader(new InputStreamReader(p.getInputStream(), "UTF-8"));
                String line;
                StringBuilder log = new StringBuilder(task.log);
                while ((line = r.readLine()) != null) {
                    log.append(line).append('\n');
                    if (log.length() > 8000) log.delete(0, log.length() - 8000);
                    task.log = log.toString();
                }
                int code = p.waitFor();
                task.process = null;
                if (code != 0) throw new Exception("Chunker 退出码 " + code);
                File zipOut = safeFile("chunker/out/" + id + "-" + safeOutName(outName));
                if (zipOut == null) throw new Exception("输出路径无效");
                File parent = zipOut.getParentFile();
                if (parent != null) parent.mkdirs();
                zipDir(outDir, zipOut);
                task.output = "chunker/out/" + zipOut.getName();
                task.state = "success";
                task.log = log.append("完成：输出 ").append(zipOut.getName()).toString();
            } catch (Throwable e) {
                task.state = "error";
                task.error = String.valueOf(e.getMessage());
                task.log = task.log + "\n失败：" + task.error;
            } finally {
                try { deleteRec(work); } catch (Throwable e) { }
            }
        }

        private String safeOutName(String n) {
            String s = n == null ? "转换结果.zip" : n.replace('\\', '/');
            int i = s.lastIndexOf('/');
            if (i >= 0) s = s.substring(i + 1);
            s = s.replaceAll("[\\\\/:*?\"<>|\\x00-\\x1f]", "_");
            return s.isEmpty() ? "转换结果.zip" : s;
        }

        private void unzipFile(File zip, File dest) throws Exception {
            String destPath = dest.getCanonicalPath();
            ZipInputStream zin = new ZipInputStream(new java.io.BufferedInputStream(new FileInputStream(zip)));
            ZipEntry ze;
            byte[] buf = new byte[65536];
            while ((ze = zin.getNextEntry()) != null) {
                String name = ze.getName().replace('\\', '/');
                if (name.startsWith("/") || name.contains("../") || name.startsWith("__MACOSX/")) continue;
                File out = new File(dest, name);
                String outPath = out.getCanonicalPath();
                if (!outPath.equals(destPath) && !outPath.startsWith(destPath + File.separator)) continue;
                if (ze.isDirectory()) out.mkdirs();
                else {
                    File parent = out.getParentFile();
                    if (parent != null) parent.mkdirs();
                    FileOutputStream fos = new FileOutputStream(out);
                    int n;
                    while ((n = zin.read(buf)) > 0) fos.write(buf, 0, n);
                    fos.flush(); fos.close();
                }
                zin.closeEntry();
            }
            zin.close();
        }

        private File normalizeWorld(File dir) {
            if (new File(dir, "level.dat").isFile() || new File(dir, "db").isDirectory()) return dir;
            File[] fs = dir.listFiles();
            if (fs != null) {
                int dirs = 0;
                for (File f : fs) if (f.isDirectory()) dirs++;
                if (dirs == 1) {
                    for (File f : fs) {
                        if (f.isDirectory() && (new File(f, "level.dat").isFile() || new File(f, "db").isDirectory())) return f;
                    }
                }
            }
            return dir;
        }

        private void zipDir(File dir, File out) throws Exception {
            ZipOutputStream zos = new ZipOutputStream(new java.io.BufferedOutputStream(new FileOutputStream(out)));
            zipDirRec(dir, dir, zos);
            zos.finish();
            zos.close();
        }

        private void zipDirRec(File base, File dir, ZipOutputStream zos) throws Exception {
            File[] fs = dir.listFiles();
            if (fs == null) return;
            java.util.Arrays.sort(fs, (a, b) -> a.getName().compareToIgnoreCase(b.getName()));
            for (File f : fs) {
                String rel = base.toURI().relativize(f.toURI()).getPath();
                if (f.isDirectory()) {
                    zipDirRec(base, f, zos);
                } else {
                    ZipEntry ze = new ZipEntry(rel);
                    zos.putNextEntry(ze);
                    FileInputStream in = new FileInputStream(f);
                    byte[] buf = new byte[65536];
                    int n;
                    while ((n = in.read(buf)) > 0) zos.write(buf, 0, n);
                    in.close();
                    zos.closeEntry();
                }
            }
        }

        @JavascriptInterface
        public String deleteAppFile(String name) {
            try {
                File f = safeFile(name);
                if (f == null) return "ERR:bad path";
                return deleteRec(f) ? "OK" : "ERR:delete failed";
            } catch (Throwable e) { return "ERR:" + e.getMessage(); }
        }

        private boolean deleteRec(File f) {
            if (f.isDirectory()) {
                File[] fs = f.listFiles();
                if (fs != null) for (File c : fs) deleteRec(c);
            }
            return f.delete();
        }

        @JavascriptInterface
        public String exportAppFile(String name) {
            try {
                File f = safeFile(name);
                if (f == null || !f.isFile()) return "ERR:not found";
                ContentValues values = new ContentValues();
                values.put(MediaStore.Downloads.DISPLAY_NAME, f.getName());
                values.put(MediaStore.Downloads.MIME_TYPE, "application/octet-stream");
                values.put(MediaStore.Downloads.RELATIVE_PATH, "Download/MCBE解析");
                values.put(MediaStore.Downloads.IS_PENDING, 1);
                Uri uri = getContentResolver().insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, values);
                if (uri == null) return "ERR:insert failed";
                InputStream in = new FileInputStream(f);
                OutputStream os = getContentResolver().openOutputStream(uri);
                byte[] buf = new byte[8192];
                int n;
                while ((n = in.read(buf)) > 0) os.write(buf, 0, n);
                in.close();
                os.flush();
                os.close();
                values.clear();
                values.put(MediaStore.Downloads.IS_PENDING, 0);
                getContentResolver().update(uri, values, null, null);
                return "OK";
            } catch (Throwable e) { return "ERR:" + e.getMessage(); }
        }

        @JavascriptInterface
        public void appendLog(String text) {
            try {
                File dir = new File(getExternalFilesDir(null), "logs");
                if (!dir.exists()) dir.mkdirs();
                File log = new File(dir, "crash.log");
                if (log.length() > 1024 * 1024) log.delete();
                BufferedWriter w = new BufferedWriter(new FileWriter(log, true));
                w.write(text == null ? "" : text);
                w.write("\n");
                w.close();
            } catch (Throwable e) { }
        }

        /** 重置系统字号缩放，保持页面按视口宽度排版 */
        @JavascriptInterface
        public void resetZoom() {
            runOnUiThread(() -> {
                try {
                    web.getSettings().setTextZoom(100);
                } catch (Throwable e) { }
            });
        }

        /** 大屏 / 投屏全屏：隐藏状态栏与导航栏，保持屏幕常亮 */
        @JavascriptInterface
        public void setFullscreen(final boolean on) {
            runOnUiThread(() -> {
                try {
                    Window w = getWindow();
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                        WindowInsetsController c = w.getInsetsController();
                        if (c != null) {
                            if (on) {
                                c.hide(WindowInsets.Type.systemBars());
                                c.setSystemBarsBehavior(WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
                            } else {
                                c.show(WindowInsets.Type.systemBars());
                            }
                        }
                    } else {
                        View d = w.getDecorView();
                        if (on) {
                            d.setSystemUiVisibility(View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                                    | View.SYSTEM_UI_FLAG_FULLSCREEN
                                    | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                                    | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                                    | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                                    | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION);
                        } else {
                            d.setSystemUiVisibility(View.SYSTEM_UI_FLAG_VISIBLE);
                        }
                    }
                    if (on) w.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
                    else w.clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
                } catch (Throwable e) { }
            });
        }

        @JavascriptInterface
        public int sdkInt() {
            return Build.VERSION.SDK_INT;
        }
    }
}
