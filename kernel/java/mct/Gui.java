package mct;

import javax.swing.*;
import javax.swing.border.*;
import java.awt.*;
import java.awt.datatransfer.DataFlavor;
import java.awt.dnd.*;
import java.io.File;
import java.util.List;
import java.util.concurrent.ExecutionException;

/**
 * MC工具箱 · Java 重制版 图形界面。
 * 只做一件事：把 .mcpack/.mcaddon/.mcworld 与 __brarchive 互转，全程本地。
 */
public final class Gui {

    private static final String VER = "6.3.0";
    private static final Color BG = new Color(0x12171F);
    private static final Color PANEL = new Color(0x1B222D);
    private static final Color LINE = new Color(0x2A3441);
    private static final Color FG = new Color(0xE9EFF6);
    private static final Color MUTED = new Color(0x93A3B8);
    private static final Color ACCENT = new Color(0x3B82F6);
    private static final Color GREEN = new Color(0x22C55E);

    private final JFrame frame = new JFrame("MC工具箱 · Java 重制版 " + VER);
    private final JTextField fileField = new JTextField();
    private final JTextField outField = new JTextField();
    private final JRadioButton packRadio = new JRadioButton("打包  zip → __brarchive", true);
    private final JRadioButton unpackRadio = new JRadioButton("解包  __brarchive → zip");
    private final JCheckBox cbImages = new JCheckBox("图片一起打包 (.png/.jpg/.tga)");
    private final JCheckBox cbRemove = new JCheckBox("打包后移除源文件", true);
    private final JCheckBox cbSkipEmpty = new JCheckBox("跳过 0 字节条目", true);
    private final JCheckBox cbUtf8 = new JCheckBox("只处理 UTF-8 文本", true);
    private final JTextArea log = new JTextArea();
    private final JLabel status = new JLabel("待开始");
    private final JProgressBar bar = new JProgressBar();
    private final JButton runBtn = new JButton("开始处理");

    public Gui() {
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setMinimumSize(new Dimension(880, 620));
        frame.setLocationRelativeTo(null);

        JPanel root = new JPanel(new BorderLayout());
        root.setBackground(BG);
        root.setBorder(new EmptyBorder(18, 20, 14, 20));
        root.add(header(), BorderLayout.NORTH);
        root.add(body(), BorderLayout.CENTER);
        root.add(footer(), BorderLayout.SOUTH);
        frame.setContentPane(root);

        enableDrop();
        frame.pack();
        frame.setSize(920, 660);
    }

    private JComponent header() {
        JPanel p = new JPanel(new BorderLayout());
        p.setOpaque(false);
        p.setBorder(new EmptyBorder(0, 0, 14, 0));

        JLabel title = new JLabel("MC工具箱");
        title.setForeground(FG);
        title.setFont(new Font("SansSerif", Font.BOLD, 22));

        JLabel sub = new JLabel("JAVA 重制版 · v" + VER + "  ·  brarchive 内核 ·  全离线");
        sub.setForeground(MUTED);
        sub.setFont(new Font("Monospaced", Font.PLAIN, 12));

        JPanel left = new JPanel();
        left.setOpaque(false);
        left.setLayout(new BoxLayout(left, BoxLayout.Y_AXIS));
        left.add(title);
        left.add(Box.createVerticalStrut(4));
        left.add(sub);

        p.add(left, BorderLayout.WEST);
        return p;
    }

    private JComponent body() {
        JPanel col = new JPanel();
        col.setOpaque(false);
        col.setLayout(new BoxLayout(col, BoxLayout.Y_AXIS));

        // 输入文件
        JPanel fileRow = card(new GridBagLayout());
        GridBagConstraints c = gbc();
        c.gridy = 0;
        c.weightx = 0;
        fileRow.add(label("输入文件"), c);
        c.weightx = 1;
        c.fill = GridBagConstraints.HORIZONTAL;
        fileField.setEditable(false);
        fileField.setBackground(PANEL);
        fileField.setForeground(FG);
        fileField.setBorder(new EmptyBorder(6, 8, 6, 8));
        fileField.setToolTipText("把 .mcpack / .mcaddon / .mcworld / .zip 拖进窗口，或点右侧按钮选择");
        fileRow.add(fileField, c);
        c.weightx = 0;
        c.fill = GridBagConstraints.NONE;
        fileRow.add(button("选择文件", e -> chooseFile()), c);
        col.add(fileRow);
        col.add(Box.createVerticalStrut(10));

        // 输出目录
        JPanel outRow = card(new GridBagLayout());
        GridBagConstraints c2 = gbc();
        c2.weightx = 0;
        outRow.add(label("输出目录"), c2);
        c2.weightx = 1;
        c2.fill = GridBagConstraints.HORIZONTAL;
        outField.setEditable(false);
        outField.setBackground(PANEL);
        outField.setForeground(FG);
        outField.setBorder(new EmptyBorder(6, 8, 6, 8));
        outField.setText(new File(System.getProperty("user.home"), "MC工具箱输出").getAbsolutePath());
        outRow.add(outField, c2);
        c2.weightx = 0;
        c2.fill = GridBagConstraints.NONE;
        outRow.add(button("选择目录", e -> chooseOut()), c2);
        col.add(outRow);
        col.add(Box.createVerticalStrut(10));

        // 模式与选项
        JPanel opt = card(new BorderLayout());
        JPanel modes = new JPanel(new FlowLayout(FlowLayout.LEFT, 16, 0));
        modes.setOpaque(false);
        ButtonGroup g = new ButtonGroup();
        g.add(packRadio);
        g.add(unpackRadio);
        styleRadio(packRadio);
        styleRadio(unpackRadio);
        modes.add(packRadio);
        modes.add(unpackRadio);

        JPanel checks = new JPanel(new FlowLayout(FlowLayout.LEFT, 16, 4));
        checks.setOpaque(false);
        for (JCheckBox cb : new JCheckBox[]{cbImages, cbRemove, cbSkipEmpty, cbUtf8}) {
            cb.setOpaque(false);
            cb.setForeground(MUTED);
            cb.setFocusPainted(false);
            checks.add(cb);
        }

        opt.add(modes, BorderLayout.NORTH);
        opt.add(checks, BorderLayout.CENTER);
        col.add(opt);
        col.add(Box.createVerticalStrut(10));

        // 日志
        log.setEditable(false);
        log.setBackground(new Color(0x0D1218));
        log.setForeground(new Color(0xC9D6E5));
        log.setFont(new Font("Monospaced", Font.PLAIN, 12));
        log.setBorder(new EmptyBorder(10, 12, 10, 12));
        JScrollPane sp = new JScrollPane(log);
        sp.setBorder(new LineBorder(LINE, 1));
        sp.setPreferredSize(new Dimension(860, 260));
        col.add(sp);

        return col;
    }

    private JComponent footer() {
        JPanel p = new JPanel(new BorderLayout());
        p.setOpaque(false);
        p.setBorder(new EmptyBorder(12, 0, 0, 0));

        status.setForeground(MUTED);
        status.setFont(new Font("SansSerif", Font.PLAIN, 13));

        bar.setIndeterminate(false);
        bar.setVisible(false);
        bar.setPreferredSize(new Dimension(200, 6));
        bar.setBorderPainted(false);

        runBtn.setBackground(ACCENT);
        runBtn.setForeground(Color.WHITE);
        runBtn.setFocusPainted(false);
        runBtn.setBorder(new EmptyBorder(10, 22, 10, 22));
        runBtn.setFont(new Font("SansSerif", Font.BOLD, 14));
        runBtn.addActionListener(e -> run());

        JPanel right = new JPanel(new FlowLayout(FlowLayout.RIGHT, 12, 0));
        right.setOpaque(false);
        right.add(bar);
        right.add(runBtn);

        p.add(status, BorderLayout.WEST);
        p.add(right, BorderLayout.EAST);
        return p;
    }

    // ---------------- 行为 ----------------

    private void chooseFile() {
        JFileChooser fc = new JFileChooser();
        fc.setDialogTitle("选择要处理的包");
        fc.setFileFilter(new javax.swing.filechooser.FileNameExtensionFilter(
                "Minecraft 包 (*.mcpack, *.mcaddon, *.mcworld, *.mctemplate, *.zip)",
                "mcpack", "mcaddon", "mcworld", "mctemplate", "zip"));
        if (fc.showOpenDialog(frame) == JFileChooser.APPROVE_OPTION) setFile(fc.getSelectedFile());
    }

    private void chooseOut() {
        JFileChooser fc = new JFileChooser();
        fc.setDialogTitle("选择输出目录");
        fc.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY);
        File cur = new File(outField.getText());
        if (cur.exists()) fc.setCurrentDirectory(cur);
        if (fc.showOpenDialog(frame) == JFileChooser.APPROVE_OPTION) outField.setText(fc.getSelectedFile().getAbsolutePath());
    }

    private void setFile(File f) {
        fileField.setText(f.getAbsolutePath());
        setStatus("已选择：" + f.getName() + "  (" + human(f.length()) + ")", MUTED);
    }

    private void run() {
        String in = fileField.getText().trim();
        if (in.isEmpty()) { setStatus("先选择一个包", new Color(0xF59E0B)); return; }
        File fin = new File(in);
        if (!fin.exists()) { setStatus("文件不存在：" + in, new Color(0xEF4444)); return; }

        File outDir = new File(outField.getText().trim());
        if (!outDir.exists() && !outDir.mkdirs()) { setStatus("无法创建输出目录：" + outDir, new Color(0xEF4444)); return; }

        boolean pack = packRadio.isSelected();
        log.setText("");
        runBtn.setEnabled(false);
        bar.setVisible(true);
        bar.setIndeterminate(true);
        setStatus(pack ? "正在打包…" : "正在解包…", MUTED);

        new SwingWorker<Converter.Result, String>() {
            @Override protected Converter.Result doInBackground() {
                Converter.Options o = new Converter.Options();
                o.packImages = cbImages.isSelected();
                o.removeProcessedFiles = cbRemove.isSelected();
                o.skipEmptyEntries = cbSkipEmpty.isSelected();
                o.utf8Only = cbUtf8.isSelected();
                Converter cv = new Converter(o);
                return pack ? cv.pack(in, outDir.getAbsolutePath())
                            : cv.unpack(in, outDir.getAbsolutePath());
            }
            @Override protected void process(List<String> chunks) {
                for (String s : chunks) log.append(s + "\n");
            }
            @Override protected void done() {
                bar.setVisible(false);
                runBtn.setEnabled(true);
                try {
                    Converter.Result r = get();
                    for (String s : r.logs) log.append(s + "\n");
                    if (r.ok) {
                        log.append("\n完成。产出：" + r.outputPath + "\n");
                        log.append("brarchive 归档数：" + r.archives + "\n");
                        setStatus("完成 · " + (pack ? "已打包" : "已解包") + " · " + r.archives + " 个归档", GREEN);
                    } else {
                        log.append("\n失败：" + r.error + "\n");
                        setStatus("失败：" + r.error, new Color(0xEF4444));
                    }
                    log.setCaretPosition(log.getDocument().getLength());
                } catch (InterruptedException | ExecutionException ex) {
                    Throwable t = ex.getCause() != null ? ex.getCause() : ex;
                    log.append("\n异常：" + t + "\n");
                    setStatus("异常：" + t.getMessage(), new Color(0xEF4444));
                }
            }
        }.execute();
    }

    private void enableDrop() {
        frame.setTransferHandler(new TransferHandler() {
            @Override public boolean canImport(TransferSupport s) {
                return s.isDataFlavorSupported(DataFlavor.javaFileListFlavor);
            }
            @SuppressWarnings("unchecked")
            @Override public boolean importData(TransferSupport s) {
                try {
                    List<File> files = (List<File>) s.getTransferable().getTransferData(DataFlavor.javaFileListFlavor);
                    if (!files.isEmpty()) { setFile(files.get(0)); return true; }
                } catch (Exception ignored) { }
                return false;
            }
        });
    }

    // ---------------- 样式小工具 ----------------

    private static JPanel card(LayoutManager lm) {
        JPanel p = new JPanel(lm);
        p.setBackground(PANEL);
        p.setBorder(new CompoundBorder(new LineBorder(LINE, 1), new EmptyBorder(10, 12, 10, 12)));
        return p;
    }

    private static JLabel label(String t) {
        JLabel l = new JLabel(t);
        l.setForeground(MUTED);
        l.setFont(new Font("SansSerif", Font.PLAIN, 13));
        l.setBorder(new EmptyBorder(0, 0, 0, 12));
        return l;
    }

    private static GridBagConstraints gbc() {
        GridBagConstraints c = new GridBagConstraints();
        c.gridx = GridBagConstraints.RELATIVE;
        c.insets = new Insets(0, 0, 0, 10);
        c.anchor = GridBagConstraints.CENTER;
        return c;
    }

    private JButton button(String text, java.awt.event.ActionListener al) {
        JButton b = new JButton(text);
        b.setBackground(new Color(0x27313F));
        b.setForeground(FG);
        b.setFocusPainted(false);
        b.setBorder(new CompoundBorder(new LineBorder(LINE, 1), new EmptyBorder(7, 14, 7, 14)));
        b.addActionListener(al);
        return b;
    }

    private static void styleRadio(JRadioButton r) {
        r.setOpaque(false);
        r.setForeground(FG);
        r.setFont(new Font("SansSerif", Font.PLAIN, 13));
        r.setFocusPainted(false);
    }

    private void setStatus(String t, Color c) {
        status.setText(t);
        status.setForeground(c);
    }

    private static String human(long n) {
        if (n < 1024) return n + " B";
        if (n < 1024 * 1024) return String.format("%.1f KB", n / 1024.0);
        return String.format("%.1f MB", n / 1048576.0);
    }

    public static void main(String[] args) {
        try { UIManager.setLookAndFeel(UIManager.getCrossPlatformLookAndFeelClassName()); } catch (Exception ignored) { }
        SwingUtilities.invokeLater(() -> {
            Gui g = new Gui();
            g.frame.setVisible(true);
            if (args.length > 0) g.setFile(new File(args[0]));
        });
    }
}
