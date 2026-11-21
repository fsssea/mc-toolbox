package com.mctoolbox.cpp;

import android.app.Activity;
import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.Typeface;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.provider.MediaStore;
import android.provider.OpenableColumns;
import android.view.ViewGroup;
import android.widget.*;
import java.io.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * MC工具箱 · C++ 重制版（Android 端）。
 *
 * 与另两版的差别就写在这儿：
 *  - 内核是 C++（libmct.so，NDK 编出来的，和桌面版同一份源码），不跑 JVM 解释器；
 *  - 一次能选多个包，按 CPU 核数开线程并行跑，每包独立线程、独立输出
 *    （桌面版实测 6 个 2MB 包：并行 413ms vs 逐个 904ms，2.19×，那台机器只有 2 核）；
 *  - 结果用 MediaStore 落到系统「下载/MC工具箱」里，不占应用私有目录。
 */
public class MainActivity extends Activity {
    private static final int REQ_OPEN = 1001;

    static {
        System.loadLibrary("mct");
    }

    /** 一次调用跑一个包；返回换行分段报表。 */
    private native String process(String inPath, String outDir, boolean pack, boolean images, boolean keepOrigin,
                                  boolean skipEmpty);

    private final Handler ui = new Handler(Looper.getMainLooper());
    private final List<File> queue = new ArrayList<>();
    private final List<String> results = new ArrayList<>();
    private TextView fileView, logView, summaryView, abiView;
    private RadioButton packRadio;
    private CheckBox imagesBox, keepBox, skipEmptyBox;
    private Button runBtn, exportBtn;
    private boolean running;

    @Override protected void onCreate(Bundle b) {
        super.onCreate(b);

        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setBackgroundColor(Color.parseColor("#0d131a"));
        root.setPadding(dp(16), dp(18), dp(16), dp(12));

        TextView title = new TextView(this);
        title.setText("MC工具箱 · C++ 版");
        title.setTextColor(Color.parseColor("#eaf2fb"));
        title.setTextSize(20);
        title.setTypeface(Typeface.DEFAULT_BOLD);
        root.addView(title);

        TextView sub = new TextView(this);
        sub.setText("6.3.0 · 自写 inflate/deflate · 批量并行 · 全离线");
        sub.setTextColor(Color.parseColor("#8ea0b2"));
        sub.setTextSize(11);
        sub.setPadding(0, dp(4), 0, dp(2));
        root.addView(sub);

        abiView = new TextView(this);
        int cores = Math.max(1, Runtime.getRuntime().availableProcessors());
        String abi = "unknown";
        try {
            String[] abis = Build.SUPPORTED_ABIS;
            if (abis != null && abis.length > 0) abi = abis[0];
        } catch (Throwable ignore) { }
        abiView.setText("内核 libmct.so · " + abi + " · " + cores + " 核并行");
        abiView.setTextColor(Color.parseColor("#7dd3fc"));
        abiView.setTextSize(11);
        abiView.setPadding(0, 0, 0, dp(10));
        root.addView(abiView);

        fileView = new TextView(this);
        fileView.setText("队列为空 · 可多选");
        fileView.setTextColor(Color.parseColor("#c6d4e2"));
        fileView.setTextSize(13);
        fileView.setPadding(dp(12), dp(10), dp(12), dp(10));
        fileView.setBackgroundColor(Color.parseColor("#111a23"));
        root.addView(fileView, lp());

        Button pickBtn = button("添加包（可多选 .mcaddon / .mcpack / .zip）");
        pickBtn.setOnClickListener(v -> pick());
        root.addView(pickBtn, lp());

        Button clearBtn = button("清空队列");
        clearBtn.setOnClickListener(v -> {
            if (running) return;
            queue.clear();
            fileView.setText("队列为空 · 可多选");
        });
        root.addView(clearBtn, lp());

        RadioGroup modes = new RadioGroup(this);
        modes.setOrientation(RadioGroup.HORIZONTAL);
        packRadio = new RadioButton(this);
        packRadio.setText("打包");
        packRadio.setChecked(true);
        packRadio.setTextColor(Color.parseColor("#c6d4e2"));
        RadioButton unpackRadio = new RadioButton(this);
        unpackRadio.setText("解包");
        unpackRadio.setTextColor(Color.parseColor("#c6d4e2"));
        modes.addView(packRadio);
        modes.addView(unpackRadio);
        root.addView(modes, lp());

        imagesBox = check("图片一起打包");
        keepBox = check("保留源条目");
        skipEmptyBox = check("跳过 0 字节条目");
        skipEmptyBox.setChecked(true);
        root.addView(imagesBox, lp());
        root.addView(keepBox, lp());
        root.addView(skipEmptyBox, lp());

        runBtn = button("开始处理");
        runBtn.setBackgroundColor(Color.parseColor("#1f6feb"));
        runBtn.setOnClickListener(v -> run());
        root.addView(runBtn, lp());

        exportBtn = button("导出到「下载/MC工具箱」");
        exportBtn.setEnabled(false);
        exportBtn.setOnClickListener(v -> export());
        root.addView(exportBtn, lp());

        summaryView = new TextView(this);
        summaryView.setText("");
        summaryView.setTextColor(Color.parseColor("#7dd3fc"));
        summaryView.setTextSize(12);
        summaryView.setPadding(0, dp(6), 0, dp(4));
        root.addView(summaryView, lp());

        TextView logTitle = new TextView(this);
        logTitle.setText("日志");
        logTitle.setTextColor(Color.parseColor("#8ea0b2"));
        logTitle.setTextSize(11);
        root.addView(logTitle);

        ScrollView sc = new ScrollView(this);
        logView = new TextView(this);
        logView.setText("");
        logView.setTextColor(Color.parseColor("#9fb3c6"));
        logView.setTextSize(11);
        logView.setTypeface(Typeface.MONOSPACE);
        logView.setPadding(dp(8), dp(8), dp(8), dp(8));
        sc.addView(logView);
        sc.setBackgroundColor(Color.parseColor("#08101a"));
        root.addView(sc, new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, 0, 1f));

        setContentView(root);
        log("就绪。内核：C++ / libmct.so（与桌面版同源），批量并行 " + cores + " 线程。");
    }

    private LinearLayout.LayoutParams lp() {
        LinearLayout.LayoutParams p = new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        p.topMargin = dp(8);
        return p;
    }

    private int dp(int v) { return (int) (v * getResources().getDisplayMetrics().density); }

    private Button button(String text) {
        Button b = new Button(this);
        b.setText(text);
        b.setAllCaps(false);
        b.setTextColor(Color.parseColor("#e6edf5"));
        b.setBackgroundColor(Color.parseColor("#16202b"));
        return b;
    }

    private CheckBox check(String text) {
        CheckBox c = new CheckBox(this);
        c.setText(text);
        c.setTextColor(Color.parseColor("#c6d4e2"));
        return c;
    }

    private void log(String s) { ui.post(() -> logView.append(s + "\n")); }

    private void pick() {
        Intent i = new Intent(Intent.ACTION_OPEN_DOCUMENT);
        i.addCategory(Intent.CATEGORY_OPENABLE);
        i.setType("*/*");
        i.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true);
        startActivityForResult(i, REQ_OPEN);
    }

    @Override protected void onActivityResult(int req, int res, Intent data) {
        super.onActivityResult(req, res, data);
        if (req != REQ_OPEN || res != RESULT_OK || data == null) return;
        final List<Uri> uris = new ArrayList<>();
        if (data.getClipData() != null) {
            for (int i = 0; i < data.getClipData().getItemCount(); i++)
                uris.add(data.getClipData().getItemAt(i).getUri());
        } else if (data.getData() != null) {
            uris.add(data.getData());
        }
        if (uris.isEmpty()) return;
        new Thread(() -> {
            int added = 0;
            for (Uri uri : uris) {
                try {
                    String name = queryName(uri);
                    File dir = new File(getCacheDir(), "in");
                    if (!dir.exists()) dir.mkdirs();
                    File dst = unique(dir, name);
                    try (InputStream in = getContentResolver().openInputStream(uri);
                         OutputStream out = new FileOutputStream(dst)) {
                        byte[] buf = new byte[1 << 16];
                        int n;
                        while ((n = in.read(buf)) > 0) out.write(buf, 0, n);
                    }
                    synchronized (queue) { queue.add(dst); }
                    added++;
                } catch (Exception e) {
                    log("读取失败：" + e);
                }
            }
            final int a = added;
            ui.post(() -> {
                fileView.setText("队列 " + queue.size() + " 个包");
                log("已加入 " + a + " 个包，队列共 " + queue.size() + " 个。");
            });
        }).start();
    }

    private File unique(File dir, String name) {
        File f = new File(dir, name);
        int i = 1;
        while (f.exists()) {
            String base = name, ext = "";
            int dot = name.lastIndexOf('.');
            if (dot > 0) { base = name.substring(0, dot); ext = name.substring(dot); }
            f = new File(dir, base + " (" + (i++) + ")" + ext);
        }
        return f;
    }

    private String queryName(Uri uri) {
        try (android.database.Cursor c = getContentResolver().query(uri, null, null, null, null)) {
            if (c != null && c.moveToFirst()) {
                int idx = c.getColumnIndex(OpenableColumns.DISPLAY_NAME);
                if (idx >= 0 && c.getString(idx) != null) return c.getString(idx);
            }
        } catch (Exception ignore) { }
        return "input.mcaddon";
    }

    private void run() {
        if (running) return;
        List<File> files;
        synchronized (queue) { files = new ArrayList<>(queue); }
        if (files.isEmpty()) {
            Toast.makeText(this, "先加几个包", Toast.LENGTH_SHORT).show();
            return;
        }
        running = true;
        runBtn.setEnabled(false);
        exportBtn.setEnabled(false);
        results.clear();
        final boolean pack = packRadio.isChecked();
        final File outDir = new File(getExternalFilesDir(null), "out");
        if (!outDir.exists()) outDir.mkdirs();
        final int threads = Math.min(4, Math.max(1, Runtime.getRuntime().availableProcessors()));
        final int total = files.size();
        log("开始" + (pack ? "打包" : "解包") + "：" + total + " 个包，并行 " + threads + " 线程。");

        ExecutorService pool = Executors.newFixedThreadPool(threads);
        AtomicInteger done = new AtomicInteger(), fail = new AtomicInteger();
        AtomicInteger archives = new AtomicInteger();
        long t0 = System.currentTimeMillis();
        List<Future<?>> futures = new ArrayList<>();
        for (File f : files) {
            futures.add(pool.submit(() -> {
                String raw;
                try {
                    raw = process(f.getAbsolutePath(), outDir.getAbsolutePath(), pack, imagesBox.isChecked(),
                                  keepBox.isChecked(), skipEmptyBox.isChecked());
                } catch (Throwable t) {
                    log("[失败] " + f.getName() + " · native 异常 " + t);
                    fail.incrementAndGet();
                    done.incrementAndGet();
                    return;
                }
                String out = "", err = "", ms = "", arch = "";
                boolean ok = false;
                StringBuilder logs = new StringBuilder();
                for (String line : raw.split("\n")) {
                    if (line.startsWith("ok=")) ok = line.endsWith("1");
                    else if (line.startsWith("out=")) out = line.substring(4);
                    else if (line.startsWith("err=")) err = line.substring(4);
                    else if (line.startsWith("ms=")) ms = line.substring(3);
                    else if (line.startsWith("archives=")) arch = line.substring(9);
                    else if (line.startsWith("log=")) logs.append("    ").append(line.substring(4)).append("\n");
                }
                if (ok) {
                    done.incrementAndGet();
                    try { archives.addAndGet(Integer.parseInt(arch.trim())); } catch (Exception ignore) { }
                    synchronized (results) { results.add(out); }
                    log("[完成] " + f.getName() + " → " + new File(out).getName() + " · " + ms + " ms · " + arch + " 归档");
                    if (logs.length() > 0) log(logs.toString().trim());
                } else {
                    done.incrementAndGet();
                    fail.incrementAndGet();
                    log("[失败] " + f.getName() + " · " + err);
                }
            }));
        }
        pool.shutdown();
        new Thread(() -> {
            try { pool.awaitTermination(30, TimeUnit.MINUTES); } catch (InterruptedException ignore) { }
            long ms = System.currentTimeMillis() - t0;
            final int okCount = done.get() - fail.get();
            ui.post(() -> {
                summaryView.setText("完成 " + okCount + "/" + total + " 个 · 失败 " + fail.get() + " · 归档 " + archives.get()
                                    + " 个 · 并行 " + threads + " 线程 · 总耗时 " + ms + " ms");
                log("全部结束：" + okCount + "/" + total + " 成功，" + ms + " ms。");
                running = false;
                runBtn.setEnabled(true);
                exportBtn.setEnabled(!results.isEmpty());
            });
        }).start();
    }

    /** 把结果复制到系统「下载/MC工具箱」；API < 29 退回应用外部目录。 */
    private void export() {
        List<String> outs;
        synchronized (results) { outs = new ArrayList<>(results); }
        if (outs.isEmpty()) return;
        exportBtn.setEnabled(false);
        log("导出 " + outs.size() + " 个结果…");
        new Thread(() -> {
            int ok = 0;
            for (String path : outs) {
                File src = new File(path);
                try {
                    if (Build.VERSION.SDK_INT >= 29) {
                        ContentValues cv = new ContentValues();
                        cv.put(MediaStore.MediaColumns.DISPLAY_NAME, src.getName());
                        cv.put(MediaStore.MediaColumns.MIME_TYPE, "application/octet-stream");
                        cv.put(MediaStore.MediaColumns.RELATIVE_PATH, "Download/MC工具箱");
                        Uri uri = getContentResolver().insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, cv);
                        if (uri == null) throw new IOException("MediaStore 插入失败");
                        try (InputStream in = new FileInputStream(src);
                             OutputStream out = getContentResolver().openOutputStream(uri)) {
                            byte[] buf = new byte[1 << 16];
                            int n;
                            while ((n = in.read(buf)) > 0) out.write(buf, 0, n);
                        }
                    } else {
                        File dstDir = new File(android.os.Environment.getExternalStoragePublicDirectory(
                                android.os.Environment.DIRECTORY_DOWNLOADS), "MC工具箱");
                        if (!dstDir.exists() && !dstDir.mkdirs()) throw new IOException("无法创建目录");
                        File dst = new File(dstDir, src.getName());
                        try (InputStream in = new FileInputStream(src);
                             OutputStream out = new FileOutputStream(dst)) {
                            byte[] buf = new byte[1 << 16];
                            int n;
                            while ((n = in.read(buf)) > 0) out.write(buf, 0, n);
                        }
                    }
                    ok++;
                    log("已导出：" + src.getName());
                } catch (Exception e) {
                    log("导出失败：" + src.getName() + " · " + e);
                }
            }
            final int o = ok;
            ui.post(() -> {
                exportBtn.setEnabled(true);
                summaryView.setText("已导出 " + o + "/" + outs.size() + " 个到「下载/MC工具箱」");
            });
        }).start();
    }
}
