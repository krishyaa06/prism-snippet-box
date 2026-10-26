/* Prism Snippet Box · core logic */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Core = api;
})(typeof self !== "undefined" ? self : this, function () {
  const KW = {
    js: "const let var function return if else for while do switch case break continue new class extends import export from default async await try catch finally throw typeof instanceof in of this null undefined true false yield",
    ts: "const let var function return if else for while switch case break new class extends implements interface type enum import export from default async await try catch throw typeof keyof as readonly public private protected this null undefined true false",
    py: "def return if elif else for while in not and or is import from as class with try except finally raise lambda yield pass break continue None True False async await self global",
    go: "func return if else for range switch case break continue package import type struct interface map chan go defer var const nil true false select",
    rust: "fn let mut return if else for while loop match impl struct enum trait use mod pub crate self Self as where async await move ref true false Some None Ok Err",
    sh: "if then else elif fi for in do done while case esac function return export local echo exit",
    css: "", html: "", json: "true false null", sql: "select from where and or insert into values update set delete create table join left right inner on group by order limit as not null primary key",
  };
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  function highlight(code, lang = "js") {
    const kw = new Set((KW[lang] || KW.js).split(" ").filter(Boolean));
    const ci = lang === "sql";
    const comment = lang === "py" || lang === "sh" ? /#[^\n]*/y : lang === "sql" ? /--[^\n]*/y : lang === "html" ? /<!--[\s\S]*?-->/y : /\/\/[^\n]*|\/\*[\s\S]*?\*\//y;
    const rules = [["c", comment], ["s", /"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|`(?:\\.|[^`\\])*`/y], ["n", /\b\d[\d_.]*(?:e[-+]?\d+)?[a-z]*\b|\b0x[\da-f]+\b/iy]];
    if (lang === "html") rules.unshift(["k", /<\/?[a-zA-Z][\w-]*|\/?>/y], ["a", /\b[\w-]+(?==)/y]);
    if (lang === "css") rules.unshift(["k", /[.#]?[a-zA-Z-][\w-]*(?=\s*\{)|@[\w-]+/y], ["a", /[a-z-]+(?=\s*:)/y]);
    let out = "", i = 0;
    outer: while (i < code.length) {
      for (const [cls, re] of rules) { re.lastIndex = i; const m = re.exec(code); if (m && m[0]) { out += `<span class="t-${cls}">${esc(m[0])}</span>`; i += m[0].length; continue outer; } }
      const w = /[A-Za-z_$][\w$]*/y; w.lastIndex = i; const m = w.exec(code);
      if (m) { const word = m[0]; const isKw = kw.has(ci ? word.toLowerCase() : word); const fn = !isKw && code[i + word.length] === "("; out += isKw ? `<span class="t-k">${word}</span>` : fn ? `<span class="t-f">${word}</span>` : esc(word); i += word.length; continue; }
      out += esc(code[i]); i++;
    }
    return out;
  }
  function detect(code) {
    if (/^\s*</.test(code)) return "html";
    if (/^\s*[{[]/.test(code) && (() => { try { JSON.parse(code); return true; } catch { return false; } })()) return "json";
    if (/\bdef \w+\(|^\s*import \w+$|:\s*$/m.test(code) && !/[;{}]/.test(code)) return "py";
    if (/\bfn \w+|let mut\b|::/.test(code)) return "rust";
    if (/\bfunc \w+|package main|:=/.test(code)) return "go";
    if (/^\s*(select|insert|update|create)\b/i.test(code)) return "sql";
    if (/^#!\/bin\/(ba)?sh|^\s*(echo|export|cd|npm|git) /m.test(code)) return "sh";
    if (/[.#]?[\w-]+\s*\{[^}]*:[^}]*\}/.test(code) && !/function|=>|const /.test(code)) return "css";
    if (/:\s*(string|number|boolean)\b|interface \w+|<\w+>\(/.test(code)) return "ts";
    return "js";
  }
  function search(list, q = "", lang = "") {
    const t = q.toLowerCase().split(/\s+/).filter(Boolean);
    return list.filter((s) => (!lang || s.lang === lang) && t.every((x) => `${s.title} ${s.code} ${s.tags.join(" ")} ${s.prefix || ""}`.toLowerCase().includes(x)))
      .sort((a, b) => (b.fav ? 1 : 0) - (a.fav ? 1 : 0) || (b.updated || 0) - (a.updated || 0));
  }
  const SCOPE = { js: "javascript,javascriptreact", ts: "typescript,typescriptreact", py: "python", go: "go", rust: "rust", sh: "shellscript", css: "css,scss", html: "html", json: "json", sql: "sql" };
  function toVSCode(list) {
    const o = {};
    for (const s of list) o[s.title] = { scope: SCOPE[s.lang] || "", prefix: s.prefix || s.title.toLowerCase().replace(/\W+/g, "-"), body: s.code.split("\n"), description: s.tags.join(", ") };
    return JSON.stringify(o, null, 2);
  }
  function toGist(s) { const ext = { js: "js", ts: "ts", py: "py", go: "go", rust: "rs", sh: "sh", css: "css", html: "html", json: "json", sql: "sql" }[s.lang] || "txt"; return { filename: `${s.title.toLowerCase().replace(/\W+/g, "-")}.${ext}`, content: s.code }; }
  return { highlight, detect, search, toVSCode, toGist, LANGS: Object.keys(KW) };
});
