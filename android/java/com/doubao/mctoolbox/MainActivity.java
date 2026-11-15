package com.doubao.mctoolbox;

import android.app.Activity;
import android.content.ContentValues;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
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
        s.setLoadWithOverviewMode(false);
        s.setTextZoom(100);
        s.setMinimumFontSize(0);
        s.setMinimumLogicalFontSize(0);
        s.setBuiltInZoomControls(false);
        s.setDisplayZoomControls(false);

        web.addJavascriptInterface(new Bridge(), "AndroidBridge");
        web.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                pageLoaded = true;
                // 防止系统字号/概览模式把页面放大成“比例失衡”
                try {
                    view.getSettings().setTextZoom(100);
                    view.setInitialScale(100);
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

        /** 保存二进制文件（base64）到应用专属目录，返回绝对路径 */
        @JavascriptInterface
        public String saveBinary(String name, String base64) {
            try {
                byte[] data = Base64.decode(base64, Base64.DEFAULT);
                File dir = getExternalFilesDir(null);
                if (dir == null) return "ERR:no app dir";
                if (!dir.exists()) dir.mkdirs();
                File out = safeFile(name);
                if (out == null) return "ERR:bad path";
                File parent = out.getParentFile();
                if (parent != null && !parent.exists()) parent.mkdirs();
                FileOutputStream fos = new FileOutputStream(out);
                fos.write(data);
                fos.flush();
                fos.close();
                return out.getAbsolutePath();
            } catch (Throwable e) {
                return "ERR:" + e.getMessage();
            }
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

        /** 重置页面缩放，修复系统字号变化导致的比例失衡 */
        @JavascriptInterface
        public void resetZoom() {
            runOnUiThread(() -> {
                try {
                    web.getSettings().setTextZoom(100);
                    web.setInitialScale(100);
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
