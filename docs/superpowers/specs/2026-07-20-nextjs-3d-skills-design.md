# Next.js migration + 3D skill modules — design

## Context
Med Seji Bouallegue's portfolio is currently a plain static site (`index.html` +
`style.css` + `script.js`, no build step) deployed to GitHub Pages on a custom domain
(`CNAME` + `.nojekyll`). The owner wants the three skill cards (Languages / Backend /
Frontend) to become real, rotatable 3D modules, and explicitly asked to rebuild the site
on **Next.js** — a legitimate resume signal for a job-seeking engineer.

Because the repo *is* the live site, the migration must not break deployment. Decision:
build a **new Next.js app in `web/`**, leave the existing root files serving live, and swap
the deploy over only once the new site is verified.

## Stack
- **Next.js (App Router) + static export** (`output: 'export'`, `images.unoptimized`). No
  `basePath` — the custom domain serves from root. `CNAME` and `.nojekyll` copied via
  `public/` into the export.
- **React Three Fiber + drei + three** — real WebGL 3D for the skill modules.
- **No GSAP / Framer Motion.** Scroll reveals use a small `useReveal` IntersectionObserver
  hook + CSS keyframes. Matrix rain, custom cursor, and terminal easter egg are ported into
  plain `useEffect` client components. Keeps the dependency surface minimal and predictable.
- **Plain JS/JSX** (no TypeScript) to avoid type-config friction. `next/font/google` for
  Inter + JetBrains Mono, exposed as the existing `--font-sans` / `--font-mono` variables.

## Structure
```
web/
  package.json, next.config.mjs, jsconfig.json
  app/layout.js, app/page.js, app/globals.css   (globals.css ported from style.css)
  components/
    Loader, MatrixRain, CustomCursor, ScrollProgress, Header, Hero,
    About, Skills, SkillCanvas (dynamic, ssr:false), Work, Contact, Terminal, Reveal
    hooks/useReveal.js, usePrefersReducedMotion.js
  public/ CNAME, .nojekyll, photo.png, resume.pdf
```

## 3D skill modules
Three separate `<Canvas>` instances (one per card), each lazy-mounted via IntersectionObserver
so no WebGL context spins up until scrolled near. Each: `<OrbitControls enableZoom={false}
enablePan={false} autoRotate>` for auto-spin + drag; neon-green emissive accents on the dark
panel background; drei `<Text>` for labels. Under `prefers-reduced-motion`, `autoRotate` off
(still draggable), reducing motion without removing the feature.

- **Languages** — rotating cube, one language name per face (Java, Python, PHP, TypeScript,
  JavaScript + accent face).
- **Backend** — vertical stack of labeled slabs (Spring Boot / FastAPI, MySQL, REST APIs)
  rotating on Y, reading as a layered server stack.
- **Frontend** — Angular + React nodes orbiting a central core node.

Content stays the same as the current Proof Grid (no self-rated numbers): each card keeps its
`Proven in: <project>` line beneath the 3D module. Work section keeps the two current
projects (SynergyGig, Leave & Absence System); Discord bot stays removed.

## Ported behaviors (parity with current site)
Intro loader (~2s, skipped under reduced-motion), matrix rain background (paused when tab
hidden), custom cursor (skipped on coarse pointers), spotlight + grid overlay, scroll-progress
bar, section reveals, hero name decrypt-in, "Open to opportunities" status chip, section
number labels, terminal easter egg (`whoami/skills/contact/resume/clear/sudo`).

## Out of scope
- Changing the live deploy now (separate swap step, owner-controlled).
- Content rewrites beyond what already exists.
- SEO/meta overhaul (can follow later).

## Verification
- `npm install` then `npm run dev` in `web/`; load in a real browser (not the sandbox, which
  forces reduced-motion) — confirm three 3D modules render, auto-rotate, and drag.
- `npm run build` succeeds and emits `web/out/` with `index.html`, `CNAME`, `.nojekyll`.
- No console errors; reduced-motion path shows static (non-rotating) but interactive modules
  and skips loader/matrix.
- Deploy swap steps documented for the owner; live site untouched until then.
