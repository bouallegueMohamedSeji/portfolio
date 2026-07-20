# Handoff — Portfolio Site

## 1) Goal
Med Seji Bouallegue's job-hunting portfolio (dark "terminal / matrix" theme, neon green
`--primary: #00ff9d`). Two things happened this round:
- **Skills redesign**: the skill display was reworked (topology canvas → proof grid → 3D
  modules → **SVG radar**), the Discord bot project was dropped, and dead skills (Infra &
  Tools, GLPI) removed.
- **Next.js migration**: the owner asked to rebuild the site on **Next.js** with the three
  skill categories (Languages / Backend / Frontend) as **rotatable 3D modules**. Built as a
  **separate app in `web/`** so the live site is never at risk until a deliberate swap.

## 2) Current State
Two parallel versions exist in the repo:

**A) Live static site (repo root)** — the currently-deployed GitHub Pages site
(`index.html` + `style.css` + `script.js`, no build). Still works. This round it got the
Skills "proof grid" + Discord-bot removal (see Changes). **Untouched by the Next.js work.**

**B) New Next.js app (`web/`)** — full rebuild, verified working:
- `npm install` ✓, `npm run dev` ✓, `npm run build` ✓ (static export → `web/out/`).
- Static export served (`npx serve out`) and verified in a real browser (non-reduced-motion):
  all three 3D modules render, auto-rotate, and respond to drag. **Zero console errors**
  (favicon 404 fixed via `app/icon.svg`).
- `web/out/` contains `index.html`, `CNAME` (`mohamedsejibouallegue.tech`), `.nojekyll`,
  `photo.png`, `resume.pdf`, `icon.svg`, `_next/`. Ready to deploy.
- **Not yet deployed / not committed.** Live site still serves version A.

## 3) Active Files
**Live static site (root):** `index.html`, `style.css`, `script.js`, `assets/photo.png`,
`resume.pdf`, `CNAME`, `.nojekyll`.

**Next.js app (`web/`):**
- `package.json` — next 15.5, react 19.2, three 0.172, @react-three/fiber 9.6, @react-three/drei 10.7.
- `next.config.mjs` — `output: 'export'`, `trailingSlash: true`, `images.unoptimized`. No
  basePath (apex custom domain serves from root).
- `app/layout.js` — next/font (Inter + JetBrains Mono, self-hosted → no runtime gstatic),
  metadata. `app/page.js` — composition. `app/globals.css` — ported from root `style.css`
  + 3D skill styles + `.sr-only`. `app/icon.svg` — neon `>_` favicon.
- `components/` — `Hero` (name decrypt + status chip), `About`, `Work` (2 projects),
  `Contact`, `Header`, `MatrixRain` (pauses on tab-hidden), `CustomCursor`, `Spotlight`,
  `ScrollProgress`, `Loader`, `Terminal` (easter egg), `Reveal` (IntersectionObserver +
  CSS, replaces GSAP ScrollTrigger).
- `components/Skills.js` — heading + intro + one `<SkillRadar>`, centered, with a
  "Shipped in…" proof caption. (No more per-card canvases.)
- `components/SkillRadar.js` — **the radar** (replaced the 3D). Self-contained SVG, no
  chart lib, no WebGL: 8 spokes, 3 **qualitative** rings (Familiar / Working / Strong — no
  numbers, deliberately, see §5), neon fill + glow, per-spoke hover tooltip, scroll-
  triggered draw-in (scales up from centre), `role="img"` + sr-only list for a11y.
  ~~`components/SkillCanvas.js`~~ (R3F 3D modules) — **deleted**; three/@react-three/fiber/
  @react-three/drei removed from `package.json` (63 packages, no more lazy three.js chunk).
- `components/hooks/useScramble.js` — shared terminal-decrypt hook `{ text, replay }`
  (reduced-motion aware). Used by Hero (name) and `ScrambleText`.
- `components/ScrambleText.js` — scrambles a string into place the first time it scrolls
  into view; applied to the About/Skills/Work/Contact section headings.
- `components/hooks/` — `usePrefersReducedMotion`, `useScramble`; reveal logic in `Reveal.js`.

**Spec:** `docs/superpowers/specs/2026-07-20-nextjs-3d-skills-design.md`.

## 4) Changes Made
**Live static site (this round):**
- Replaced the skill-topology canvas with a **proof grid** (Languages/Backend/Frontend
  cards, each with a `Proven in: <project>` line). Removed Infra & Tools card + GLPI tag.
- Removed the **Discord Music Bot** project card (down to SynergyGig + Leave & Absence).
- Deleted the topology canvas JS (~170 lines) and dead CSS; fixed the terminal `skills`
  command (was listing dropped GLPI/Cisco + a stray "Symfony").

**Skills radar (this round, `web/` only):**
- Replaced the rotatable 3D skill modules with a single SVG **radar** (qualitative rings
  Familiar/Working/Strong — no numeric ratings). Deleted `SkillCanvas.js`; removed the
  three.js / R3F / drei deps (bundle: page ~4.9 kB, first-load JS 107 kB).

**Hacker-theme animation pass (this round, `web/` only):**
- Nothing had actually been lost — matrix rain, name decrypt, and terminal all still live
  in `web/`; they're just gated behind `prefers-reduced-motion: reduce` (which the sandbox
  preview forces, so they *looked* absent). Amplified + spread the theme:
  - **MatrixRain**: bright glowing "head" glyph + green trail char per column (was a flat
    dim wash); canvas opacity 0.1 → 0.16.
  - **Hero name**: blinking terminal caret after it; hover to re-decrypt.
  - **Section headings** (About/Skills/Work/Contact): scramble-in on scroll via
    `ScrambleText` + `useScramble`.
  - Refactor: the old inline Hero decrypt was extracted into the shared `useScramble` hook
    (one implementation, reused).
- All of the above stay **off** under real reduced-motion (by design). If a user has
  reduce-motion on, they see the static site.

**New Next.js app (`web/`):**
- Full port of every section + effect to React components (no GSAP/Framer — scroll reveals
  are a small IntersectionObserver + CSS hook).
- 3D skill modules via React Three Fiber + drei (code-split: initial JS ~108 kB; three.js
  loads lazily only when the skills section scrolls near).
- Reduced-motion: loader/matrix skipped, modules render static (no autoRotate) but still
  draggable; `.sr-only` skill lists per card for screen readers (WebGL text is invisible to
  assistive tech).
- Static-export config for GitHub Pages; favicon added.

## 5) Failed Attempts / Rejected Directions
- **Radar chart** was rejected **twice earlier** as "fake precision" — but that objection
  was to *numeric* radars. The current radar (this round) is deliberately **qualitative**
  (Familiar/Working/Strong rings, no numbers), which is why it was accepted. **Still: do not
  reintroduce numeric skill ratings** on it. Stat-bar / typewriter terminal readouts remain
  rejected for the same reason.
- **Skill-topology node graph** — replaced this round; its code is fully removed.
- **drei `<Text>` default font** — pulls Roboto from gstatic at runtime, re-introducing an
  external dependency next/font avoids. Switched to `CanvasTexture` labels (self-contained).
- **Sandbox/preview browser forces `prefers-reduced-motion: reduce`** — to test the animated
  path you must override `matchMedia` via an init script, or use a real browser.

## 6) Next Steps
1. **Decide which version ships.** If going with Next.js (version B), the deploy swap:
   set GitHub Pages/Actions to build `web/` and publish `web/out/` (which already includes
   `CNAME` + `.nojekyll`). Until then, the root static site stays live — nothing is at risk.
2. **Commit** — nothing from either round is committed yet (branch `main`). Consider
   committing the static-site skill changes and the `web/` app separately.
3. **About-copy vs Skills mismatch** — About still mentions "Cisco and GNS3" but Skills no
   longer lists any infra/networking (Infra & Tools was dropped). Reconcile the copy or
   re-add a networking mention.
4. **Content gaps needing the owner** — LinkedIn URL (2nd social icon), real internship
   details if experience should be shown.
5. **Optional polish (web/)**: SEO (Open Graph / Twitter / JSON-LD Person), and decide
   whether to keep the custom cursor (flagged elsewhere as an AI-tell / a11y-hostile).
6. **Cleanup**: the unused `ascii-hero/` directory (dead React ASCII mascot) can be deleted.

## 7) Known Issues (do NOT fix yet — revisit later)
- **Custom cursor duplicates** (`web/components/CustomCursor.js`): hovering a clickable
  item **on the left side** spawns a second/duplicate cursor. Owner asked to leave it for
  now and come back to it. (Related: the custom cursor is already flagged as an AI-tell /
  a11y concern in §6.5 — may end up being removed rather than fixed.)
