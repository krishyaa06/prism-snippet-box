const test = require("node:test");
const assert = require("node:assert/strict");
const C = require("../js/core.js");
test("highlight js", () => {
  const h = C.highlight('const x = "a<b"; // hi\nfoo(42)', "js");
  assert.equal(h, '<span class="t-k">const</span> x = <span class="t-s">"a&lt;b"</span>; <span class="t-c">// hi</span>\n<span class="t-f">foo</span>(<span class="t-n">42</span>)');
});
test("highlight python comments + sql case-insensitive keywords", () => {
  assert.match(C.highlight("# c\ndef f(): pass", "py"), /^<span class="t-c"># c<\/span>\n<span class="t-k">def<\/span>/);
  assert.match(C.highlight("SELECT 1", "sql"), /<span class="t-k">SELECT<\/span>/);
});
test("detect", () => {
  assert.equal(C.detect("<div></div>"), "html");
  assert.equal(C.detect('{"a":1}'), "json");
  assert.equal(C.detect("def f(x):\n    return x"), "py");
  assert.equal(C.detect("fn main() { let mut x = 1; }"), "rust");
  assert.equal(C.detect("SELECT * FROM t"), "sql");
  assert.equal(C.detect(".a { color: red; }"), "css");
  assert.equal(C.detect("const a = (x: string) => x"), "ts");
  assert.equal(C.detect("const a = 1"), "js");
});
test("vscode export + search", () => {
  const L = [{ title: "Log", lang: "js", prefix: "lg", tags: ["dbg"], code: "console.log($1)\n" }, { title: "Py", lang: "py", tags: [], code: "print()" }];
  const v = JSON.parse(C.toVSCode(L));
  assert.deepEqual(v.Log, { scope: "javascript,javascriptreact", prefix: "lg", body: ["console.log($1)", ""], description: "dbg" });
  assert.equal(v.Py.prefix, "py");
  assert.deepEqual(C.search(L, "", "py").map((s) => s.title), ["Py"]);
  assert.equal(C.toGist(L[1]).filename, "py.py");
});
