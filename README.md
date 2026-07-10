# Portfolio

Mohamed Seji Bouallegue's personal portfolio - software engineering student at
ESPRIT (Tunisia). Dark terminal-themed one-pager: plain HTML/CSS/JS for the main
site (no build step, fast, good SEO), with one genuine interactive piece built in
React.

## Structure

- `index.html`, `style.css`, `script.js` - the site itself (hero, about, skills,
  work, contact, terminal easter egg, cursor/hover effects).
- `resume/` - editable HTML/CSS source for the resume; `resume.pdf` is rendered
  from it via headless Chrome print (`resume/index.html` → `resume.pdf`).
- `ascii-hero/` - small Vite + React app rendering an ASCII-art mascot (React
  Three Fiber + a custom shader) that tracks the cursor. Built once, its output
  (`ascii-hero/dist/ascii-hero.js`) is referenced directly by the main page - see
  `ascii-hero/README.md` for how to rebuild it.
- `models/`, `assets/` - the 3D model and photo the site actually loads.

## Running locally

Static files, so any local server works - the ASCII mascot fetches its `.glb`
model via `fetch()`, which `file://` blocks, so don't just double-click
`index.html`:

```bash
python -m http.server 5500
# then open http://localhost:5500/
```
