const f = "0.12.9", R = `https://unpkg.com/@ffmpeg/core@${f}/dist/umd/ffmpeg-core.js`;
var E;
(function(t) {
  t.LOAD = "LOAD", t.EXEC = "EXEC", t.FFPROBE = "FFPROBE", t.WRITE_FILE = "WRITE_FILE", t.READ_FILE = "READ_FILE", t.DELETE_FILE = "DELETE_FILE", t.RENAME = "RENAME", t.CREATE_DIR = "CREATE_DIR", t.LIST_DIR = "LIST_DIR", t.DELETE_DIR = "DELETE_DIR", t.ERROR = "ERROR", t.DOWNLOAD = "DOWNLOAD", t.PROGRESS = "PROGRESS", t.LOG = "LOG", t.MOUNT = "MOUNT", t.UNMOUNT = "UNMOUNT";
})(E || (E = {}));
const u = new Error("unknown message type"), O = new Error("ffmpeg is not loaded, call `await ffmpeg.load()` first"), m = new Error("failed to import ffmpeg-core.js");
let r;
const l = async ({ coreURL: t, wasmURL: n, workerURL: e }) => {
  const o = !r;
  try {
    t || (t = R), importScripts(t);
  } catch {
    if ((!t || t === R) && (t = R.replace("/umd/", "/esm/")), self.createFFmpegCore = (await import(
      /* @vite-ignore */
      t
    )).default, !self.createFFmpegCore)
      throw m;
  }
  const s = t, c = n || t.replace(/.js$/g, ".wasm"), a = e || t.replace(/.js$/g, ".worker.js");
  return r = await self.createFFmpegCore({
    // Fix `Overload resolution failed.` when using multi-threaded ffmpeg-core.
    // Encoded wasmURL and workerURL in the URL as a hack to fix locateFile issue.
    mainScriptUrlOrBlob: `${s}#${btoa(JSON.stringify({ wasmURL: c, workerURL: a }))}`
  }), r.setLogger((i) => self.postMessage({ type: E.LOG, data: i })), r.setProgress((i) => self.postMessage({
    type: E.PROGRESS,
    data: i
  })), o;
}, D = ({ args: t, timeout: n = -1 }) => {
  r.setTimeout(n), r.exec(...t);
  const e = r.ret;
  return r.reset(), e;
}, S = ({ args: t, timeout: n = -1 }) => {
  r.setTimeout(n), r.ffprobe(...t);
  const e = r.ret;
  return r.reset(), e;
}, I = ({ path: t, data: n }) => (r.FS.writeFile(t, n), !0), L = ({ path: t, encoding: n }) => r.FS.readFile(t, { encoding: n }), N = ({ path: t }) => (r.FS.unlink(t), !0), A = ({ oldPath: t, newPath: n }) => (r.FS.rename(t, n), !0), k = ({ path: t }) => (r.FS.mkdir(t), !0), w = ({ path: t }) => {
  const n = r.FS.readdir(t), e = [];
  for (const o of n) {
    const s = r.FS.stat(`${t}/${o}`), c = r.FS.isDir(s.mode);
    e.push({ name: o, isDir: c });
  }
  return e;
}, b = ({ path: t }) => (r.FS.rmdir(t), !0), p = ({ fsType: t, options: n, mountPoint: e }) => {
  const o = t, s = r.FS.filesystems[o];
  return s ? (r.FS.mount(s, n, e), !0) : !1;
}, d = ({ mountPoint: t }) => (r.FS.unmount(t), !0);
self.onmessage = async ({ data: { id: t, type: n, data: e } }) => {
  const o = [];
  let s;
  try {
    if (n !== E.LOAD && !r)
      throw O;
    switch (n) {
      case E.LOAD:
        s = await l(e);
        break;
      case E.EXEC:
        s = D(e);
        break;
      case E.FFPROBE:
        s = S(e);
        break;
      case E.WRITE_FILE:
        s = I(e);
        break;
      case E.READ_FILE:
        s = L(e);
        break;
      case E.DELETE_FILE:
        s = N(e);
        break;
      case E.RENAME:
        s = A(e);
        break;
      case E.CREATE_DIR:
        s = k(e);
        break;
      case E.LIST_DIR:
        s = w(e);
        break;
      case E.DELETE_DIR:
        s = b(e);
        break;
      case E.MOUNT:
        s = p(e);
        break;
      case E.UNMOUNT:
        s = d(e);
        break;
      default:
        throw u;
    }
  } catch (c) {
    self.postMessage({
      id: t,
      type: E.ERROR,
      data: c.toString()
    });
    return;
  }
  s instanceof Uint8Array && o.push(s.buffer), self.postMessage({ id: t, type: n, data: s }, o);
};
