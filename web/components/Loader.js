'use client';

import { useEffect, useState } from 'react';

// Brief intro loader (~2s), then fades out and unmounts. Skipped under
// reduced motion (returns null immediately).
export default function Loader() {
  const [phase, setPhase] = useState('loading'); // loading -> done -> gone

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('gone');
      return;
    }
    const fade = setTimeout(() => setPhase('done'), 1900);
    const remove = setTimeout(() => setPhase('gone'), 2450);
    return () => {
      clearTimeout(fade);
      clearTimeout(remove);
    };
  }, []);

  if (phase === 'gone') return null;

  return (
    <div className={`loading-screen ${phase === 'done' ? 'done' : ''}`} aria-hidden="true">
      <div className="loader-track">
        <div className="loader-fill" />
      </div>
    </div>
  );
}
