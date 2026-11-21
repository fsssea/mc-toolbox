package mct;

import java.util.*;

/** 命令行入口：java -cp . mct.Tool pack|unpack|info|selftest */
public final class Tool {

    public static void main(String[] args) throws Exception {
        if (args.length < 1) {
            usage();
            return;
        }
        String cmd = args[0];
        if ("selftest".equals(cmd)) {
            selftest();
            return;
        }
        Converter.Options opt = new Converter.Options();
        String in = null, outDir = ".";
        for (int i = 1; i < args.length; i++) {
            String a = args[i];
            if ("--keep-origin".equals(a)) opt.removeProcessedFiles = false;
            else if ("--images".equals(a)) opt.packImages = true;
            else if ("--no-utf8-check".equals(a)) opt.utf8Only = false;
            else if (in == null) in = a;
            else outDir = a;
        }
        if (in == null) { usage(); return; }
        Converter c = new Converter(opt);
        Converter.Result r = "pack".equals(cmd) ? c.pack(in, outDir) : c.unpack(in, outDir);
        for (String l : r.logs) System.out.println("  " + l);
        if (!r.ok) {
            System.out.println("失败: " + r.error);
            System.exit(2);
        }
        System.out.println("完成: " + r.outputPath);
    }

    private static void usage() {
        System.out.println("mctool-java\n  pack <包> [输出目录]\n  unpack <包> [输出目录]\n  selftest");
    }

    private static void selftest() {
        Map<String, byte[]> src = new LinkedHashMap<>();
        src.put("a.json", new byte[]{'j', 's', 'o', 'n'});
        src.put("b.ui", new byte[]{1, 2, 3, 4, 5});
        src.put("中文.json", new byte[]{'x'});
        byte[] blob = Brarchive.serialize(src);
        check(blob.length == 16 + 3 * 256 + 4 + 5 + 1, "serialize 长度");
        LinkedHashMap<String, byte[]> back = Brarchive.deserialize(blob);
        check(back.size() == 3, "条目数");
        check(new ArrayList<>(back.keySet()).get(0).equals("a.json"), "排序");
        check(back.get("中文.json") != null && back.get("中文.json").length == 1, "中文名");
        boolean threw = false;
        try { Brarchive.serialize(new HashMap<>()); } catch (Exception e) { threw = true; }
        check(threw, "空条目报错");
        threw = false;
        try {
            byte[] bad = blob.clone();
            bad[0] = 0;
            Brarchive.deserialize(bad);
        } catch (Exception e) { threw = true; }
        check(threw, "magic 校验");
        System.out.println(fails == 0 ? "全部通过" : "失败 " + fails + " 项");
        if (fails != 0) System.exit(1);
    }

    private static int fails = 0;

    private static void check(boolean ok, String what) {
        System.out.println((ok ? "[ok] " : "[FAIL] ") + what);
        if (!ok) fails++;
    }
}
