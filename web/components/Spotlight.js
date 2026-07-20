'use client';

import { useEffect, useRef } from 'react';

// Cursor-following radial glow.
export default function Spotlight() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function onMove(event) {
      el.style.setProperty('--x', `${event.clientX}px`);
      el.style.setProperty('--y', `${event.clientY}px`);
    }
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return <div ref={ref} className="spotlight" aria-hidden="true" />;
}
