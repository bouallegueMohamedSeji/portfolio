'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

// Self-contained SVG radar — no chart lib, no WebGL. Rings are qualitative
// (Familiar / Working / Strong), never numbers: these are self-assessed skills,
// so distance-from-centre reads as confidence, not a fake decimal score.
const LEVELS = [null, 'Familiar', 'Working', 'Strong'];

// Ordered so the two Strong peaks sit apart and the lone Familiar dips the shape
// — a flat regular octagon would read as "everything's a 7/10" (fake precision).
const SKILLS = [
  { label: 'Java · Spring', level: 3 },
  { label: 'Python · FastAPI', level: 2 },
  { label: 'REST APIs', level: 3 },
  { label: 'MySQL · SQL', level: 2 },
  { label: 'TypeScript', level: 2 },
  { label: 'React · Next.js', level: 2 },
  { label: 'Angular', level: 2 },
  { label: 'PHP', level: 1 },
];

const N = SKILLS.length;
const VBW = 480;
const VBH = 380;
const CX = 240;
const CY = 190;
const R = 120;            // radius of the outer (Strong) ring
const LABEL_R = 138;      // axis labels sit just outside the rings
const RINGS = [R / 3, (2 * R) / 3, R]; // Familiar, Working, Strong

// Spokes straddle the top so the vertical axis stays free for ring labels.
const angle = (i) => ((-90 + (360 / N) * i + 180 / N) * Math.PI) / 180;
const point = (i, r) => [CX + r * Math.cos(angle(i)), CY + r * Math.sin(angle(i))];

export default function SkillRadar() {
  const ref = useRef(null);
  const [played, setPlayed] = useState(false);
  const [active, setActive] = useState(null);

  // Kick the draw-in only when scrolled into view (section is below the fold).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setPlayed(true);
          obs.disconnect();
        }
      },
      { rootMargin: '-10% 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const vertices = useMemo(
    () => SKILLS.map((s, i) => point(i, (R * s.level) / 3)),
    []
  );
  const polygon = vertices.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

  const label = SKILLS.map((s) => `${s.label} — ${LEVELS[s.level]}`).join(', ');

  return (
    <figure
      className={`skill-radar${played ? ' is-played' : ''}`}
      ref={ref}
      role="img"
      aria-label={`Skill radar. ${label}.`}
    >
      <svg viewBox={`0 0 ${VBW} ${VBH}`} aria-hidden="true">
        <defs>
          <radialGradient id="radarSweepFade" cx={CX} cy={CY} r={R} gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="rgba(0, 255, 157, 0.35)" />
            <stop offset="1" stopColor="rgba(0, 255, 157, 0)" />
          </radialGradient>
        </defs>
        {/* rings */}
        {RINGS.map((r) => (
          <circle key={r} className="radar-ring" cx={CX} cy={CY} r={r} />
        ))}
        {/* ring labels on the free vertical axis */}
        {RINGS.map((r, i) => (
          <text key={r} className="radar-ring-label" x={CX} y={CY - r} dy="-4">
            {LEVELS[i + 1]}
          </text>
        ))}
        {/* spokes + axis labels */}
        {SKILLS.map((s, i) => {
          const [ax, ay] = point(i, R);
          const [lx, ly] = point(i, LABEL_R);
          const cos = Math.cos(angle(i));
          const sin = Math.sin(angle(i));
          const anchor = cos > 0.25 ? 'start' : cos < -0.25 ? 'end' : 'middle';
          const dy = sin > 0.25 ? 10 : sin < -0.25 ? -2 : 4;
          const on = active === i;
          return (
            <g key={s.label}>
              <line className="radar-spoke" x1={CX} y1={CY} x2={ax} y2={ay} />
              <text
                className={`radar-axis-label${on ? ' on' : ''}`}
                x={lx}
                y={ly}
                dy={dy}
                textAnchor={anchor}
              >
                {s.label}
              </text>
            </g>
          );
        })}
        {/* sweep beam — one 360° pass on reveal, "acquires" the data */}
        <g className="radar-sweep-group">
          <path className="radar-sweep-wedge" d={`M${CX},${CY} L${CX},${CY - R} A${R},${R} 0 0 0 180,86.1 Z`} />
          <line className="radar-sweep" x1={CX} y1={CY} x2={CX} y2={CY - R} />
        </g>
        {/* data — scales in from centre on reveal */}
        <g className="radar-data">
          <polygon className="radar-shape" points={polygon} />
          {vertices.map(([x, y], i) => (
            <circle
              key={SKILLS[i].label}
              className={`radar-node${active === i ? ' on' : ''}`}
              cx={x}
              cy={y}
              r={active === i ? 6 : 4}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            />
          ))}
        </g>
      </svg>

      {/* hover tooltip, positioned over the active node */}
      {active !== null && (
        <div
          className="radar-tip"
          style={{
            left: `${(vertices[active][0] / VBW) * 100}%`,
            top: `${(vertices[active][1] / VBH) * 100}%`,
          }}
        >
          <strong>{SKILLS[active].label}</strong>
          <span>{LEVELS[SKILLS[active].level]}</span>
        </div>
      )}

      <figcaption className="sr-only">
        <ul>
          {SKILLS.map((s) => (
            <li key={s.label}>
              {s.label}: {LEVELS[s.level]}
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}
