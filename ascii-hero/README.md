# ascii-hero

Small React + Vite app rendering `friendly_robot_assistant.glb` as a live ASCII-art
mascot (React Three Fiber + a custom GLSL postprocessing shader). Mounted into the
parent static site's page (`../index.html`) via the built `dist/ascii-hero.js` -
the rest of the site has no build step, only this piece does.

Core rendering logic (`src/AsciiEffect.jsx`, `src/EffectScene.jsx`) is ported from
[egorshest/webgl-ascii-hero](https://github.com/egorshest/webgl-ascii-hero) (MIT,
see `LICENSE` and `NOTICE.md`).

## Rebuilding

```bash
npm install
npm run build
```

Output lands at fixed filenames (`dist/ascii-hero.js`) so the parent `index.html`
never needs to change its `<script>` reference across rebuilds.
