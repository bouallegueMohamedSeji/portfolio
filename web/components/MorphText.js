'use client';

import { useEffect, useRef, useState } from 'react';

// One-time "morph-in": the title blurs + scales out of a soft blob and resolves
// into crisp text. The gooey/liquid edge comes from an SVG threshold filter
// (#morphThreshold, injected once in the page) applied over a CSS blur that
// animates to zero. Plays once on scroll into view; reduced motion shows it at
// once. Full string is exposed to assistive tech via aria-label.
export default function MorphText({ text, className = '' }) {
  const ref = useRef(null);
  const [played, setPlayed] = useState(false);

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

  return (
    <span
      ref={ref}
      className={`morph-text${played ? ' is-played' : ''} ${className}`.trim()}
      aria-label={text}
    >
      <span className="morph-text-inner" aria-hidden="true">
        {text}
      </span>
    </span>
  );
}
