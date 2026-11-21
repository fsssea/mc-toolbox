package com.mctoolbox.java;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.Typeface;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.provider.OpenableColumns;
import android.view.Gravity;
import android.view.ViewGroup;
import android.widget.*;
import java.io.*;
import java.util.List;
import mct.Converter;

/** MC工具箱 · JAVA 重制版（Android 端）：内核为 Java 实现，与桌面 JAR 同一套 mct.Converter。 */
public class MainActivity extends Activity {
    private static final int REQ_OPEN = 1001;
    private static final int REQ_SAVE = 1002;

    private final Handler ui = new Handler(Looper.getMainLooper());
    private TextView fileView, logView, summaryView;
    private RadioButton packRadio;
    private CheckBox imagesBox, keepBox, skipEmptyBox;
    private Button runBtn, pickBtn, saveBtn;
    private String currentPath, currentName, lastOutput;

    @Override protected void onCreate(Bundle b) {
        super.onCreate(b);

        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setBackgroundColor(Color.parseColor("#0d131a"));
        root.setPadding(dp(16), dp(20), dp(16), dp(12));

        TextView title = new TextView(this);
        title.setText("MC工具箱 · JAVA 版");
        title.setTextColor(Color.parseColor("#eaf2fb"));
        title.setTextSize(20);
        title.setTypeface(Typeface.DEFAULT_BOLD);
        root.addView(title);

        TextView sub = new TextView(this);
        sub.setText("JAVA 重制版 6.3.0 · brarchive 打包 / 解包 · 纯 Java 标准库 · 全离线");
        sub.setTextColor(Color.parseColor("#8ea0b2"));
        sub.setTextSize(11);
        sub.setPadding(0, dp(4), 0, dp(14));
        root.addView(sub);

        fileView = new TextView(this);
        fileView.setText("未选择文件");
        fileView.setTextColor(Color.parseColor("#c6d4e2"));
        fileView.setTextSize(13);
        fileView.setPadding(dp(12), dp(12), dp(12), dp(12));
        fileView.setBackgroundColor(Color.parseColor("#111a23"));
        root.addView(fileView, lp());

        pickBtn = button("选择包（.mcaddon / .mcpack / .zip）");
        pickBtn.setOnClickListener(v -> pick());
        root.addView(pickBtn, lp());

        RadioGroup modes = new RadioGroup(this);
        modes.setOrientation(RadioGroup.HORIZONTAL);
        packRadio = new RadioButton(this);
        packRadio.setText("打包 → __brarchive");
        packRadio.setChecked(true);
        packRadio.setTextColor(Color.parseColor("#c6d4e2"));
        RadioButton unpackRadio = new RadioButton(this);
        unpackRadio.setText("解包 → zip");
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

        saveBtn = button("另存到…");
        saveBtn.setEnabled(false);
        saveBtn.setOnClickListener(v -> save());
        root.addView(saveBtn, lp());

        summaryView = new TextView(this);
        summaryView.setText("");
        summaryView.setTextColor(Color.parseColor("#7dd3fc"));
        summaryView.setTextSize(12);
        summaryView.setPadding(0, dp(6), 0, dp(6));
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
        LinearLayout.LayoutParams slp = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, 0, 1f);
        root.addView(sc, slp);

        setContentView(root);
        log("就绪。内核：Java（mct.Converter），与桌面 JAR 同源。");
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

    private void log(String s) {
        ui.post(() -> {
            logView.append(s + "\n");
        });
    }

    private void pick() {
        Intent i = new Intent(Intent.ACTION_OPEN_DOCUMENT);
        i.addCategory(Intent.CATEGORY_OPENABLE);
        i.setType("*/*");
        startActivityForResult(i, REQ_OPEN);
    }

    private void save() {
        if (lastOutput == null) return;
        Intent i = new Intent(Intent.ACTION_CREATE_DOCUMENT);
        i.addCategory(Intent.CATEGORY_OPENABLE);
        i.setType("application/octet-stream");
        i.putExtra(Intent.EXTRA_TITLE, new File(lastOutput).getName());
        startActivityForResult(i, REQ_SAVE);
    }

    @Override protected void onActivityResult(int req, int res, Intent data) {
        super.onActivityResult(req, res, data);
        if (res != RESULT_OK || data == null || data.getData() == null) return;
        Uri uri = data.getData();
        if (req == REQ_OPEN) {
            new Thread(() -> {
                try {
                    String name = queryName(uri);
                    File dir = new File(getCacheDir(), "in");
                    if (!dir.exists()) dir.mkdirs();
                    File dst = new File(dir, name);
                    try (InputStream in = getContentResolver().openInputStream(uri);
                         OutputStream out = new FileOutputStream(dst)) {
                        byte[] buf = new byte[1 << 16];
                        int n;
                        while ((n = in.read(buf)) > 0) out.write(buf, 0, n);
                    }
                    currentPath = dst.getAbsolutePath();
                    currentName = name;
                    ui.post(() -> {
                        fileView.setText(name + "  ·  " + human(dst.length()));
                        saveBtn.setEnabled(false);
                        lastOutput = null;
                    });
                    log("已载入：" + name + "（" + human(dst.length()) + "）");
                } catch (Exception e) {
                    log("读取失败：" + e);
                }
            }).start();
        } else if (req == REQ_SAVE) {
            new Thread(() -> {
                try (InputStream in = new FileInputStream(lastOutput);
                     OutputStream out = getContentResolver().openOutputStream(uri)) {
                    byte[] buf = new byte[1 << 16];
                    int n;
                    while ((n = in.read(buf)) > 0) out.write(buf, 0, n);
                    log("已另存到：" + uri);
                } catch (Exception e) {
                    log("另存失败：" + e);
                }
            }).start();
        }
    }

    private String queryName(Uri uri) {
        try (android.database.Cursor c = getContentResolver().query(uri, null, null, null, null)) {
            if (c != null && c.moveToFirst()) {
                int idx = c.getColumnIndex(OpenableColumns.DISPLAY_NAME);
                if (idx >= 0) return c.getString(idx);
            }
        } catch (Exception ignore) { }
        return "input.mcaddon";
    }

    private void run() {
        if (currentPath == null) {
            Toast.makeText(this, "先选一个包", Toast.LENGTH_SHORT).show();
            return;
        }
        runBtn.setEnabled(false);
        final boolean pack = packRadio.isChecked();
        log("开始 " + (pack ? "打包" : "解包") + "：" + currentName);
        new Thread(() -> {
            long t0 = System.currentTimeMillis();
            Converter.Options opt = new Converter.Options();
            opt.packImages = imagesBox.isChecked();
            opt.removeProcessedFiles = !keepBox.isChecked();
            opt.skipEmptyEntries = skipEmptyBox.isChecked();
            File outDir = new File(getExternalFilesDir(null), "out");
            if (!outDir.exists()) outDir.mkdirs();
            Converter cv = new Converter(opt);
            Converter.Result r = pack ? cv.pack(currentPath, outDir.getAbsolutePath())
                                      : cv.unpack(currentPath, outDir.getAbsolutePath());
            long ms = System.currentTimeMillis() - t0;
            ui.post(() -> {
                for (String l : r.logs) logView.append("  · " + l + "\n");
                if (r.ok) {
                    lastOutput = r.outputPath;
                    saveBtn.setEnabled(true);
                    summaryView.setText("完成：" + new File(r.outputPath).getName() + "  ·  " + r.archives + " 个归档  ·  " + ms + " ms");
                    log("输出：" + r.outputPath);
                } else {
                    summaryView.setText("失败");
                    log("失败：" + r.error);
                }
                runBtn.setEnabled(true);
            });
        }).start();
    }

    private String human(long n) {
        if (n >= 1024 * 1024) return String.format("%.1f MB", n / 1048576.0);
        if (n >= 1024) return String.format("%.0f KB", n / 1024.0);
        return n + " B";
    }
}
