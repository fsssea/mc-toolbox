package mct;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.*;

/**
 * __brarchive 二进制容器编解码（Little-Endian）
 *
 * Header : magic u64(0x267052A0B125277D) + entries u32 + version u32     = 16 字节
 * Entry  : nameLen u8 + name[247] + offset u32 + length u32              = 256 字节
 * Content: 按描述符顺序拼接
 *
 * 格式规范来自 wisebreeze/brarchive-flutter 的公开文档（Apache-2.0），
 * Java 版为独立重写，不复制其 Dart 代码。
 */
public final class Brarchive {

    public static final long MAGIC = 0x267052A0B125277DL;
    public static final int VERSION = 1;
    public static final int NAME_MAX = 247;
    public static final int ENTRY_HEADER = 1 + NAME_MAX + 4 + 4;

    private Brarchive() {}

    /** 文件名 -> 内容（按名字排序序列化） */
    public static byte[] serialize(Map<String, byte[]> files) {
        if (files.isEmpty()) throw new IllegalArgumentException("no entries to encode");
        List<String> names = new ArrayList<>(files.keySet());
        Collections.sort(names);
        for (String n : names) {
            if (n.getBytes(StandardCharsets.UTF_8).length > NAME_MAX)
                throw new IllegalArgumentException("filename exceeds max length of 247 bytes: " + n);
        }
        int total = 16 + names.size() * ENTRY_HEADER;
        for (String n : names) total += files.get(n).length;

        ByteArrayOutputStream out = new ByteArrayOutputStream(total);
        writeU64(out, MAGIC);
        writeU32(out, names.size());
        writeU32(out, VERSION);

        int offset = 0;
        for (String n : names) {
            byte[] nb = n.getBytes(StandardCharsets.UTF_8);
            out.write(nb.length);
            byte[] slot = new byte[NAME_MAX];
            System.arraycopy(nb, 0, slot, 0, nb.length);
            out.write(bytes(slot), 0, NAME_MAX);
            writeU32(out, offset);
            writeU32(out, files.get(n).length);
            offset += files.get(n).length;
        }
        for (String n : names) {
            byte[] d = files.get(n);
            out.write(bytes(d), 0, d.length);
        }
        return out.toByteArray();
    }

    /** 解码为 有序 Map（保持描述符顺序） */
    public static LinkedHashMap<String, byte[]> deserialize(byte[] data) {
        if (data.length < 16) throw new IllegalArgumentException("data too short for header");
        if (readU64(data, 0) != MAGIC) throw new IllegalArgumentException("invalid magic");
        int count = (int) readU32(data, 8);
        int version = (int) readU32(data, 12);
        if (version != VERSION) throw new IllegalArgumentException("unsupported version: " + version);

        int pos = 16;
        LinkedHashMap<String, byte[]> out = new LinkedHashMap<>();
        int[] offs = new int[count], lens = new int[count];
        String[] names = new String[count];
        for (int i = 0; i < count; i++) {
            if (pos + ENTRY_HEADER > data.length)
                throw new IllegalArgumentException("truncated data reading entry header");
            int nameLen = data[pos] & 0xFF;
            if (nameLen > NAME_MAX) throw new IllegalArgumentException("entry name length exceeds max");
            names[i] = new String(data, pos + 1, nameLen, StandardCharsets.UTF_8);
            offs[i] = (int) readU32(data, pos + 1 + NAME_MAX);
            lens[i] = (int) readU32(data, pos + 1 + NAME_MAX + 4);
            pos += ENTRY_HEADER;
        }
        int contentStart = pos;
        for (int i = 0; i < count; i++) {
            int start = contentStart + offs[i];
            int end = start + lens[i];
            if (end > data.length) throw new IllegalArgumentException("truncated content for " + names[i]);
            out.put(names[i], Arrays.copyOfRange(data, start, end));
        }
        return out;
    }

    public static boolean looksLike(byte[] d) {
        return d.length >= 16 && readU64(d, 0) == MAGIC;
    }

    private static byte[] bytes(byte[] b) { return b; }

    private static void writeU32(ByteArrayOutputStream o, int v) {
        o.write(v & 0xFF);
        o.write((v >>> 8) & 0xFF);
        o.write((v >>> 16) & 0xFF);
        o.write((v >>> 24) & 0xFF);
    }

    private static void writeU64(ByteArrayOutputStream o, long v) {
        writeU32(o, (int) (v & 0xFFFFFFFFL));
        writeU32(o, (int) ((v >>> 32) & 0xFFFFFFFFL));
    }

    static long readU32(byte[] d, int p) {
        return (d[p] & 0xFFL) | ((d[p + 1] & 0xFFL) << 8) | ((d[p + 2] & 0xFFL) << 16) | ((d[p + 3] & 0xFFL) << 24);
    }

    static long readU64(byte[] d, int p) {
        return readU32(d, p) | (readU32(d, p + 4) << 32);
    }
}
