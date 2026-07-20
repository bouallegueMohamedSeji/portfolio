'use client';

import Reveal from './Reveal';

// A section-3 project card. Combines four things without letting them fight:
//  - deal-in entrance (Reveal variant, transform on the card itself)
//  - animated neon gradient border (CSS ::before)
//  - a cursor-tracking neon spotlight (--mx/--my drive a radial gradient)
//  - a 3D tilt toward the pointer + lift on hover (transform on the INNER
//    element, so it never collides with the card's entrance transform)
export default function ProjectCard({ variant, children }) {
  const onMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
    el.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
    el.style.setProperty('--rx', `${((0.5 - py) * 8).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${((px - 0.5) * 8).toFixed(2)}deg`);
  };
  const onLeave = (e) => {
    const el = e.currentTarget;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <Reveal
      as="article"
      variant={variant}
      className="project-card"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <span className="project-card-spot" aria-hidden="true" />
      <div className="project-card-inner">{children}</div>
    </Reveal>
  );
}
