// 占位：mcbe-leveldb-reader 的 index 会 import @zip.js/zip.js 用于解压缩包，
// 我们自己实现了 ZIP 读取，所以这里全部替换成抛错桩，避免把 zip.js 的
// Worker / TransformStream / CompressionStream 依赖带进 WebView。
function disabled() { throw new Error('内部错误：zip.js 路径不应被调用'); }
export class ZipReader { constructor() { disabled(); } }
export class BlobReader {}
export class Uint8ArrayWriter {}
export class Uint8ArrayReader {}
export class TextWriter {}
export class TextReader {}
export class BlobWriter {}
export class Writer {}
export class Reader {}
export default {};
