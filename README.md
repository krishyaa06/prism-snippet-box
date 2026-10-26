<!-- ═════════════ HEADER ═════════════ -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:07060f,50:82AAFF,100:C792EA&height=200&section=header&text=Prism%20Snippet%20Box&fontSize=48&fontColor=ffffff&animation=fadeIn&fontAlignY=36&desc=Snippet%20manager%20%E2%86%92%20VS%20Code%20snippets&descAlignY=58&descSize=16" width="100%" alt="Prism Snippet Box" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=19&duration=2600&pause=800&color=82AAFF&center=true&vCenter=true&width=680&lines=debounce%28%29+%E2%80%94+found+it;Export+to+.code-snippets;10+languages+highlighted;Auto-detects+the+language" alt="Typing SVG" />
</p>

<p align="center">
  <a href="https://github.com/krishyaa06/prism-snippet-box/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/krishyaa06/prism-snippet-box/ci.yml?branch=main&style=for-the-badge&label=CI&logo=githubactions&logoColor=white" alt="CI" /></a>
  <a href="https://krishyaa06.github.io/prism-snippet-box/"><img src="https://img.shields.io/badge/Live_Demo-Open-82AAFF?style=for-the-badge&logo=githubpages&logoColor=black" alt="Live demo" /></a>
  <img src="https://img.shields.io/badge/Vanilla-HTML%20%7C%20CSS%20%7C%20JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="Vanilla JS" />
  <img src="https://img.shields.io/badge/dependencies-0-82AAFF?style=for-the-badge" alt="Zero dependencies" />
  <a href="LICENSE"><img src="https://img.shields.io/github/license/krishyaa06/prism-snippet-box?style=for-the-badge&color=C792EA" alt="License" /></a>
</p>

<p align="center">
  <img src="assets/screenshots/desktop.png" width="90%" alt="Prism Snippet Box screenshot" />
</p>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%" />

## ⚡ Overview

**Prism Snippet Box** is a home for the snippets you keep re-googling. Save code with a title, tags and a VS Code prefix; it auto-detects the language on first paste and highlights JavaScript, TypeScript, Python, Go, Rust, shell, CSS, HTML, JSON and SQL. Search across titles, tags and code, star favourites, then export your whole library as a VS Code `.code-snippets` file so the prefixes work in your editor.

## ✨ Features

- **Zero-dependency highlighter** for 10 languages
- **Language auto-detection** on first paste
- **Search** across title, code, tags and prefix; filter by language
- **Favourites** pinned to the top; Tab inserts spaces in the editor
- **Export** to VS Code `.code-snippets` (scope + prefix + body)
- **Backup / restore** as JSON; everything stays in your browser

## 📸 Screenshots

<table>
  <tr>
    <td width="68%"><img src="assets/screenshots/desktop.png" width="100%" alt="Prism Snippet Box on desktop" /></td>
    <td width="32%"><img src="assets/screenshots/mobile.png" width="100%" alt="Prism Snippet Box on mobile" /></td>
  </tr>
</table>

## 🚀 Quick Start

**Use it online:** [https://krishyaa06.github.io/prism-snippet-box/](https://krishyaa06.github.io/prism-snippet-box/)

**Run locally:**

```bash
git clone https://github.com/krishyaa06/prism-snippet-box.git
cd prism-snippet-box
# open index.html in your browser, or serve it:
npx serve .
```

## 🛠️ Usage

1. Click **+ New**, paste code and give it a title, prefix and tags.
2. Search or filter by language; ★ to favourite.
3. **VS Code JSON** downloads `prism.code-snippets` — put it in `.vscode/` (project) or your user snippets folder.

## 📁 Project Structure

```
prism-snippet-box/
├── assets/
│   ├── logo.png
│   └── logo.svg
├── css/
│   ├── app.css
│   └── prism.css
├── js/
│   ├── app.js   # library UI
│   ├── core.js   # highlighter, detector, search, exporters — tested in Node
│   └── prism.js
├── test/
│   └── core.test.js
├── .gitignore
├── LICENSE
├── index.html
└── package.json
```

## 🧪 Tests

```bash
npm test
```

Tests use the built-in `node:test` runner, so there is nothing to install. CI runs them on Node 20 and 22.

## 🤝 Contributing

1. Fork the repo and create a branch: `git checkout -b feature/my-idea`
2. Make your change and add a test in `test/`
3. Run `npm test` and open a Pull Request

## 🔷 Part of Prism Protocol

Prism Snippet Box is one of the open-source tools built by [Prism Protocol](https://dc.gg/prismprotocol), a tech community where young builders learn, ship and compete together.

## 👤 Author

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/krishyaa06"><img src="https://github.com/krishyaa06.png" width="90" style="border-radius:50%" /><br><b>Soumya Bhandare</b></a><br>
      <sub>Founder @ Prism Protocol</sub>
    </td>
    <td>
      <a href="https://dc.gg/prismprotocol"><img src="https://img.shields.io/badge/Discord-Prism%20Protocol-5865F2?style=for-the-badge&logo=discord&logoColor=white" /></a><br>
      <a href="https://instagram.com/prism_protocol_"><img src="https://img.shields.io/badge/Instagram-@prism__protocol__-E4405F?style=for-the-badge&logo=instagram&logoColor=white" /></a><br>
      <a href="https://x.com/krishyaa06"><img src="https://img.shields.io/badge/X-@krishyaa06-000000?style=for-the-badge&logo=x&logoColor=white" /></a>
    </td>
  </tr>
</table>

## 📄 License

Released under the [MIT License](LICENSE).

<p align="center">
  <b>If you like this project, consider giving it a ⭐</b><br>
  <sub>"Build. Create. Compete." · Made with ⚡ by Prism Protocol</sub>
</p>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:C792EA,50:82AAFF,100:07060f&height=110&section=footer" width="100%" />
