# Per-Section Signature Animations — Design

**Date:** 2026-07-20
**Scope:** Give sections 02 (Skill Matrix), 03 (Some Things I've Built), 04 (Get In Touch)
each a distinct entrance animation, replacing the shared fade-up. Per-section (one
signature each), not per-item. Hero/About and all section headings keep the existing
fade-up + scramble as a consistent thread. Cursor is NOT touched.

## Signatures (Approach A — themed)

| Section | Signature | Mechanism |
|---|---|---|
| 02 Skills | **Radar sweep** — a beam does one 360° pass; the data polygon + nodes appear as it passes. | `SkillRadar` SVG: rotating sweep group (beam line + gradient trail wedge) on `.is-played`; data scales/fades in with a delay. |
| 03 Work | **Deal-in** — the two project cards slide in from opposite sides with a slight `rotateY` tilt that settles flat. | `Reveal` variant `deal-left` / `deal-right`; `perspective` on `.project-grid`. |
| 04 Contact | **Terminal boot** — the block wipes in bottom-to-top via `clip-path`, with a neon scanline riding up. | `Reveal` variant `boot`; `::after` scanline bar. |

## Implementation

- **`Reveal.js`**: add `variant = 'up'` prop → class `reveal-${variant}`. Default `up`
  keeps every current caller unchanged. Reduced-motion path already sets `visible`.
- **`Work.js`**: `variant="deal-left"` on card 1, `variant="deal-right"` on card 2.
- **`Contact.js`**: `variant="boot"` on `.contact-wrap`.
- **`SkillRadar.js`**: add `<defs>` radial gradient + a `.radar-sweep-group`
  (wedge path + beam line). No change to hover/tooltip/a11y.
- **`globals.css`**: keyframes `radar-sweep`, `reveal-deal-*`, `reveal-boot` + scanline
  `boot-scan`; `perspective` on `.project-grid`; extend the
  `prefers-reduced-motion` block to neutralise every new variant (content shown, no motion).

## Constraints

- No new dependencies (CSS + existing IntersectionObserver).
- All animations reduced-motion-guarded (content visible, motion off).
- One runnable check: not applicable (pure declarative CSS/markup); verified live in-browser.
