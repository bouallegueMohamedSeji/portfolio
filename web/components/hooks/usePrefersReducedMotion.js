'use client';

import { useEffect, useState } from 'react';

// Tracks the OS "reduce motion" setting. Starts false on the server/first paint
// and updates once mounted, so SSR output stays deterministic.
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
