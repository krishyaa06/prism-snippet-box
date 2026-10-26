(() => {
  const { $, $$, copy, download, store, debounce, esc, toast } = Prism;
  const id = () => Math.random().toString(36).slice(2, 10);
  const SEED = [
    { title: "Debounce", lang: "js", prefix: "debounce", tags: ["utils"], fav: true, code: "export function debounce(fn, ms = 200) {\n  let t;\n  return (...args) => {\n    clearTimeout(t);\n    t = setTimeout(() => fn(...args), ms);\n  };\n}" },
    { title: "Fetch with timeout", lang: "ts", prefix: "fetcht", tags: ["http"], code: "export async function fetchWithTimeout(url: string, ms = 8000): Promise<Response> {\n  const ctrl = new AbortController();\n  const id = setTimeout(() => ctrl.abort(), ms);\n  try {\n    return await fetch(url, { signal: ctrl.signal });\n  } finally {\n    clearTimeout(id);\n  }\n}" },
    { title: "Read JSON file", lang: "py", prefix: "rjson", tags: ["io"], code: "import json\nfrom pathlib import Path\n\ndef read_json(path: str) -> dict:\n    # Returns {} when the file is missing\n    p = Path(path)\n    return json.loads(p.read_text()) if p.exists() else {}" },
    { title: "Center with grid", lang: "css", prefix: "center", tags: ["layout"], code: ".center {\n  display: grid;\n  place-items: center;\n  min-height: 100dvh;\n}" },
    { title: "Undo last commit", lang: "sh", prefix: "undo", tags: ["git"], code: "# keep the changes, drop the commit\ngit reset --soft HEAD~1" },
    { title: "Top users", lang: "sql", prefix: "topu", tags: ["db"], code: "SELECT u.name, COUNT(p.id) AS posts\nFROM users u\nLEFT JOIN posts p ON p.user_id = u.id\nGROUP BY u.id\nORDER BY posts DESC\nLIMIT 10;" },
  ].map((s, i) => ({ id: id(), updated: Date.now() - i * 1000, ...s }));
  let L = store.get("sb:list", SEED), cur = L[0]?.id, lang = "";
  const save = () => store.set("sb:list", L);
  const get = () => L.find((s) => s.id === cur);
  $("#lang").innerHTML = Core.LANGS.map((l) => `<option>${l}</option>`).join("");
  function list() {
    const used = [...new Set(L.map((s) => s.lang))];
    $("#langs").innerHTML = used.map((l) => `<button data-l="${l}" class="${l === lang ? "on" : ""}">${l}</button>`).join("");
    $$("#langs button").forEach((b) => (b.onclick = () => { lang = lang === b.dataset.l ? "" : b.dataset.l; list(); }));
    const r = Core.search(L, $("#q").value, lang);
    $("#list").innerHTML = r.map((s) => `<button class="item ${s.id === cur ? "on" : ""}" data-id="${s.id}"><b>${s.fav ? "★ " : ""}${esc(s.title)}</b><small>${s.lang}</small></button>`).join("") || `<p class="muted">Nothing found.</p>`;
    $$("#list .item").forEach((b) => (b.onclick = () => { cur = b.dataset.id; list(); edit(); }));
  }
  function edit() { const s = get(); if (!s) return; $("#title").value = s.title; $("#lang").value = s.lang; $("#prefix").value = s.prefix || ""; $("#tags").value = s.tags.join(", "); $("#code").value = s.code; $("#fav").textContent = s.fav ? "★" : "☆"; prev(); }
  function prev() { const s = get(); $("#hl").innerHTML = Core.highlight(s.code, s.lang); $("#lines").textContent = `${s.code.split("\n").length} lines · ${s.lang}`; }
  const upd = debounce(() => { const s = get(); const wasEmpty = !s.code.trim(); s.title = $("#title").value; s.prefix = $("#prefix").value; s.tags = $("#tags").value.split(",").map((t) => t.trim()).filter(Boolean); s.code = $("#code").value; if (wasEmpty && s.code.trim()) { s.lang = Core.detect(s.code); $("#lang").value = s.lang; } s.updated = Date.now(); save(); list(); prev(); }, 150);
  ["#title", "#prefix", "#tags", "#code"].forEach((x) => $(x).addEventListener("input", upd));
  $("#lang").onchange = () => { get().lang = $("#lang").value; save(); list(); prev(); };
  $("#code").addEventListener("keydown", (e) => { if (e.key === "Tab") { e.preventDefault(); const t = e.target, a = t.selectionStart; t.setRangeText("  ", a, t.selectionEnd, "end"); upd(); } });
  $("#q").addEventListener("input", debounce(list, 100));
  $("#new").onclick = () => { const s = { id: id(), title: "New snippet", lang: "js", prefix: "", tags: [], code: "", updated: Date.now() }; L.unshift(s); cur = s.id; save(); list(); edit(); $("#code").focus(); };
  $("#del").onclick = () => { if (!confirm("Delete this snippet?")) return; L = L.filter((s) => s.id !== cur); if (!L.length) L = [{ id: id(), title: "New snippet", lang: "js", tags: [], code: "", updated: Date.now() }]; cur = L[0].id; save(); list(); edit(); };
  $("#fav").onclick = () => { const s = get(); s.fav = !s.fav; save(); list(); edit(); };
  $("#copy").onclick = () => copy(get().code);
  $("#vsc").onclick = () => download("prism.code-snippets", Core.toVSCode(L), "application/json");
  $("#exp").onclick = () => download("prism-snippets-backup.json", JSON.stringify(L, null, 2), "application/json");
  $("#imp").onchange = async (e) => { const f = e.target.files[0]; if (!f) return; try { const d = JSON.parse(await f.text()); if (!Array.isArray(d)) throw new Error("Expected a backup array"); const ok = d.filter((s) => s && typeof s.code === "string").map((s) => ({ ...s, id: id(), tags: s.tags || [], lang: s.lang || Core.detect(s.code), title: s.title || "Imported" })); L = [...ok, ...L]; save(); list(); toast(`Restored ${ok.length} snippets`); } catch (err) { toast(err.message); } };
  list(); edit();
})();
