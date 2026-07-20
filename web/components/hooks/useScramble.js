'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

// Terminal-style decrypt: `finalText` resolves out of scrambled glyphs.
// Returns the current string plus `replay()` to re-run it (hover, on-scroll…).
// Honours reduced motion by snapping straight to the final text.
export function useScramble(finalText, { auto = true, delay = 0, duration = 900 } = {}) {
  const [text, setText] = useState(finalText);
  const timers = useRef([]);

  const clear = useCallback(() => {
    timers.current.forEach((t) => {
      clearInterval(t);
      clearTimeout(t);
    });
    timers.current = [];
  }, []);

  const replay = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(finalText);
      return;
    }
    clear();
    setText(''); // avoids a flash of final text before the scramble starts
    const totalFrames = Math.max(1, Math.round(duration / (1000 / 30)));

    const startTimer = setTimeout(() => {
      let frame = 0;
      const id = setInterval(() => {
        frame += 1;
        const revealCount = Math.floor((frame / totalFrames) * finalText.length);
        let out = '';
        for (let i = 0; i < finalText.length; i += 1) {
          out +=
            i < revealCount || finalText[i] === ' '
              ? finalText[i]
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setText(out);
        if (frame >= totalFrames) {
          setText(finalText);
          clearInterval(id);
        }
      }, 1000 / 30);
      timers.current.push(id);
    }, delay);
    timers.current.push(startTimer);
  }, [finalText, delay, duration, clear]);

  useEffect(() => {
    if (auto) replay();
    return clear;
  }, [auto, replay, clear]);

  return { text, replay };
}
