package mct;

import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.util.zip.*;

/**
 * zip(.mcpack/.mcaddon) ⇄ __brarchive 转换器。
 * 规则与 C++ 版 / 格式参考实现保持一致：
 *  - 只打包 .json/.json5/.ui（可选图片）
 *  - 跳过 textures / materials / texts / sounds 目录
 *  - 跳过根目录文件与 ui/_global_variables.json
 *  - subpacks 下的目录，__brarchive 放在子包根
 *  - .brarchive 文件名 = 源目录名，__brarchive 内路径镜像源目录父路径
 */
public final class Converter {

    public static final class Options {
        public List<String> includeExts = Arrays.asList(".json", ".json5", ".ui");
        public List<String> excludeDirs = Arrays.asList("textures", "materials", "texts", "sounds");
        public List<String> specialFolders = Arrays.asList("subpacks");
        public List<String> excludeFiles = Arrays.asList("ui/_global_variables.json");
        public String outputDir = "__brarchive";
        public boolean packImages = false;
        public boolean removeProcessedFiles = true;
        public boolean skipEmptyEntries = true;
        public boolean utf8Only = true;
    }

    public static final class Result {
        public boolean ok;
        public String outputPath;
        public String error;
        public final List<String> logs = new ArrayList<>();
        public int archives;
    }

    private final Options opt;

    public Converter(Options opt) { this.opt = opt; }

    // ---------------- 打包 ----------------
    public Result pack(String inputPath, String outDir) {
        Result r = new Result();
        try {
            ensureDir(outDir);
            Map<String, byte[]> files = readZip(inputPath);
            r.logs.add("解压归档，共 " + files.size() + " 个条目");

            Map<String, Map<String, byte[]>> byDir = new TreeMap<>();
            for (Map.Entry<String, byte[]> e : files.entrySet()) {
                String path = norm(e.getKey());
                if (isExcludedFile(path)) continue;
                if (isInsideExcludedDir(path)) continue;
                String ext = ext(path);
                boolean target = opt.includeExts.contains(ext);
                if (!target && !(opt.packImages && isImage(ext))) continue;
                String dir = dirName(path);
                if (dir.isEmpty()) continue;
                if (opt.utf8Only && !isImage(ext) && !isValidUtf8(e.getValue())) {
                    r.logs.add("跳过非 UTF-8 文件: " + path);
                    continue;
                }
                byDir.computeIfAbsent(dir, k -> new TreeMap<>()).put(baseName(path), e.getValue());
            }

            if (byDir.isEmpty()) {
                r.logs.add("没有可打包的目标目录，原样复制");
                r.outputPath = copyAsIs(inputPath, outDir, "_packed");
                r.ok = true;
                return r;
            }

            Map<String, byte[]> out = new LinkedHashMap<>(files);
            if (opt.removeProcessedFiles) {
                for (Map.Entry<String, Map<String, byte[]>> de : byDir.entrySet())
                    for (String n : de.getValue().keySet()) out.remove(de.getKey() + "/" + n);
                r.logs.add("已移除原始目标文件");
            }

            for (Map.Entry<String, Map<String, byte[]>> de : byDir.entrySet()) {
                String dir = de.getKey();
                String dirName = baseName(dir);
                String base = brarchiveBase(dir);
                String relParent = relativeParent(base, dir);
                String brPath = base + opt.outputDir + "/" + (relParent.isEmpty() ? "" : relParent + "/") + dirName
                        + ".brarchive";
                byte[] blob = Brarchive.serialize(de.getValue());
                r.logs.add("序列化 " + de.getValue().size() + " 个文件到 " + brPath);
                out.put(brPath, blob);
                r.archives++;
            }

            r.outputPath = uniqueOut(inputPath, outDir, "_packed");
            writeZip(r.outputPath, out);
            r.ok = true;
            r.logs.add("输出: " + r.outputPath);
        } catch (Exception ex) {
            r.error = ex.getMessage();
        }
        return r;
    }

    // ---------------- 解包 ----------------
    public Result unpack(String inputPath, String outDir) {
        Result r = new Result();
        try {
            ensureDir(outDir);
            Map<String, byte[]> files = readZip(inputPath);
            r.logs.add("解压归档，共 " + files.size() + " 个条目");

            Map<String, byte[]> out = new LinkedHashMap<>(files);
            List<String> brPaths = new ArrayList<>();
            for (String p : files.keySet()) {
                List<String> parts = split(p);
                boolean inBr = false;
                for (String s : parts) if (s.equalsIgnoreCase(opt.outputDir)) inBr = true;
                if (inBr && ext(p).equals(".brarchive")) brPaths.add(p);
            }

            if (brPaths.isEmpty()) {
                r.logs.add("未找到 __brarchive 目录，原样复制");
                r.outputPath = copyAsIs(inputPath, outDir, "_unpacked");
                r.ok = true;
                return r;
            }
            r.logs.add("找到 " + brPaths.size() + " 个 .brarchive 文件");

            for (String bp : brPaths) {
                List<String> parts = split(bp);
                int idx = -1;
                for (int i = 0; i < parts.size(); i++)
                    if (parts.get(i).equalsIgnoreCase(opt.outputDir)) idx = i;
                if (idx < 0) continue;
                String folder = join(parts.subList(0, idx + 1));
                String rest = bp.substring(folder.length());
                while (rest.startsWith("/")) rest = rest.substring(1);
                String targetRel = stripExt(rest);
                String parentOf = dirName(folder);

                String targetDir;
                if (parentOf.isEmpty() && targetRel.isEmpty()) targetDir = "";
                else if (parentOf.isEmpty()) targetDir = targetRel;
                else if (targetRel.isEmpty()) targetDir = parentOf;
                else targetDir = parentOf + "/" + targetRel;

                LinkedHashMap<String, byte[]> restored = Brarchive.deserialize(files.get(bp));
                r.logs.add("还原 " + baseName(bp) + " 的 " + restored.size() + " 个文件");
                for (Map.Entry<String, byte[]> e : restored.entrySet()) {
                    String path = targetDir.isEmpty() ? e.getKey() : targetDir + "/" + e.getKey();
                    if (opt.skipEmptyEntries && e.getValue().length == 0) {
                        r.logs.add("跳过空条目: " + path);
                        continue;
                    }
                    out.put(path, e.getValue());
                }
            }

            // 清除所有 __brarchive 条目
            List<String> drop = new ArrayList<>();
            for (String p : out.keySet())
                for (String s : split(p))
                    if (s.equalsIgnoreCase(opt.outputDir)) { drop.add(p); break; }
            for (String d : drop) out.remove(d);

            r.outputPath = uniqueOut(inputPath, outDir, "_unpacked");
            writeZip(r.outputPath, out);
            r.ok = true;
            r.logs.add("输出: " + r.outputPath);
        } catch (Exception ex) {
            r.error = ex.getMessage();
        }
        return r;
    }

    // ---------------- zip ----------------
    public static Map<String, byte[]> readZip(String path) throws IOException {
        Map<String, byte[]> out = new LinkedHashMap<>();
        try (ZipFile zf = new ZipFile(new File(path))) {
            Enumeration<? extends ZipEntry> en = zf.entries();
            while (en.hasMoreElements()) {
                ZipEntry e = en.nextElement();
                if (e.isDirectory()) continue;
                ByteArrayOutputStream bo = new ByteArrayOutputStream();
                try (InputStream in = zf.getInputStream(e)) {
                    byte[] buf = new byte[8192];
                    int n;
                    while ((n = in.read(buf)) > 0) bo.write(buf, 0, n);
                }
                out.put(norm(e.getName()), bo.toByteArray());
            }
        }
        return out;
    }

    public static void writeZip(String path, Map<String, byte[]> files) throws IOException {
        File f = new File(path);
        if (f.getParentFile() != null) f.getParentFile().mkdirs();
        try (ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(f))) {
            zos.setLevel(Deflater.BEST_COMPRESSION);
            for (String name : new TreeSet<>(files.keySet())) {
                byte[] d = files.get(name);
                ZipEntry e = new ZipEntry(name);
                e.setTime(0);
                zos.putNextEntry(e);
                zos.write(d);
                zos.closeEntry();
            }
        }
    }

    private String copyAsIs(String inputPath, String outDir, String suffix) throws IOException {
        String p = uniqueOut(inputPath, outDir, suffix);
        Files.copy(Paths.get(inputPath), Paths.get(p), StandardCopyOption.REPLACE_EXISTING);
        return p;
    }

    // ---------------- 路径/校验 ----------------
    static String norm(String p) {
        p = p.replace('\\', '/');
        List<String> parts = split(p);
        return join(parts);
    }

    static List<String> split(String p) {
        List<String> r = new ArrayList<>();
        for (String s : p.split("/")) if (!s.isEmpty() && !s.equals(".")) r.add(s);
        return r;
    }

    static String join(List<String> parts) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < parts.size(); i++) {
            if (i > 0) sb.append('/');
            sb.append(parts.get(i));
        }
        return sb.toString();
    }

    static String dirName(String p) {
        int k = p.lastIndexOf('/');
        return k < 0 ? "" : p.substring(0, k);
    }

    static String baseName(String p) {
        int k = p.lastIndexOf('/');
        return k < 0 ? p : p.substring(k + 1);
    }

    static String ext(String p) {
        String b = baseName(p);
        int d = b.lastIndexOf('.');
        return d <= 0 ? "" : b.substring(d).toLowerCase(Locale.ROOT);
    }

    static String stripExt(String p) {
        int slash = p.lastIndexOf('/');
        int dot = p.lastIndexOf('.');
        return (dot > slash && dot >= 0) ? p.substring(0, dot) : p;
    }

    static boolean isImage(String ext) {
        return ext.equals(".png") || ext.equals(".jpg") || ext.equals(".jpeg") || ext.equals(".tga");
    }

    private boolean isExcludedFile(String path) {
        String lower = path.toLowerCase(Locale.ROOT);
        String base = baseName(lower);
        for (String f : opt.excludeFiles) {
            String lf = f.toLowerCase(Locale.ROOT);
            if (lower.equals(lf) || base.equals(lf)) return true;
        }
        return false;
    }

    private boolean isInsideExcludedDir(String path) {
        for (String part : split(path))
            for (String d : opt.excludeDirs)
                if (part.equalsIgnoreCase(d)) return true;
        return false;
    }

    /** subpacks/x 内部 -> 子包根，否则归档根 */
    private String brarchiveBase(String dir) {
        if (dir.isEmpty()) return "";
        List<String> parts = split(dir);
        for (String special : opt.specialFolders) {
            for (int i = 0; i < parts.size(); i++) {
                if (parts.get(i).equalsIgnoreCase(special) && i + 1 < parts.size()) {
                    StringBuilder sb = new StringBuilder();
                    for (int k = 0; k <= i + 1; k++) {
                        if (k > 0) sb.append('/');
                        sb.append(parts.get(k));
                    }
                    return sb.append('/').toString();
                }
            }
        }
        return "";
    }

    private static String relativeParent(String base, String dir) {
        if (dir.isEmpty()) return "";
        if (base.isEmpty()) return dirName(dir);
        String b = base.endsWith("/") ? base.substring(0, base.length() - 1) : base;
        if (dir.length() <= b.length()) return "";
        String rel = dir.substring(b.length());
        while (rel.startsWith("/")) rel = rel.substring(1);
        return dirName(rel);
    }

    /** 输出目录不存在时自动创建，避免“失败: 路径”这种莫名报错。 */
    private static void ensureDir(String outDir) throws IOException {
        if (outDir == null || outDir.isEmpty()) return;
        java.nio.file.Path dir = java.nio.file.Paths.get(outDir);
        if (!java.nio.file.Files.isDirectory(dir)) {
            java.nio.file.Files.createDirectories(dir);
        }
    }

    private static String uniqueOut(String inputPath, String outDir, String suffix) {
        String base = baseName(inputPath);
        int dot = base.lastIndexOf('.');
        String stem = dot > 0 ? base.substring(0, dot) : base;
        String inExt = ext(inputPath);
        String ext = (inExt.equals(".mcpack") || inExt.equals(".mcaddon")) ? inExt : ".zip";
        String candidate = (outDir.isEmpty() ? "" : outDir + "/") + stem + suffix + ext;
        int i = 1;
        while (new File(candidate).exists())
            candidate = (outDir.isEmpty() ? "" : outDir + "/") + stem + suffix + " (" + i++ + ")" + ext;
        return candidate;
    }

    static boolean isValidUtf8(byte[] b) {
        int i = 0, n = b.length;
        while (i < n) {
            int c = b[i] & 0xFF;
            if (c < 0x80) { i++; continue; }
            int need;
            if (c >= 0xC2 && c <= 0xDF) need = 1;
            else if (c >= 0xE0 && c <= 0xEF) need = 2;
            else if (c >= 0xF0 && c <= 0xF4) need = 3;
            else return false;
            if (i + need >= n) return false;
            for (int k = 1; k <= need; k++)
                if ((b[i + k] & 0xC0) != 0x80) return false;
            if (c == 0xE0 && (b[i + 1] & 0xFF) < 0xA0) return false;
            if (c == 0xED && (b[i + 1] & 0xFF) > 0x9F) return false;
            if (c == 0xF0 && (b[i + 1] & 0xFF) < 0x90) return false;
            if (c == 0xF4 && (b[i + 1] & 0xFF) > 0x8F) return false;
            i += need + 1;
        }
        return true;
    }
}
