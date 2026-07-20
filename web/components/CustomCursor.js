'use client';

import { useEffect, useRef } from 'react';

// Custom neon cursor: a dot with a concentric halo ring. Both track the pointer
// 1:1 (no trailing lag) so they never separate into what looks like a second
// cursor. Scale is baked into the transform string — NOT the CSS `scale`
// property — because a transitioned/composited `scale` makes Chrome pin the
// layer to a stale transform and the two elements drift apart visually.
// Skipped on touch/coarse-pointer devices.
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;

    // Dot collapses to nothing over interactive elements: it would sit inside
    // the ring's difference-blended disc and invert to a visible black speck.
    const DOT_SCALE = 0;
    const RING_SCALE = 2.2; // ring grows into the full glowing disc

    let x = 0;
    let y = 0;
    let dotScale = 1;
    let ringScale = 1;

    function render() {
      dot.style.transform = `translate(${x}px, ${y}px) scale(${dotScale})`;
      ring.style.transform = `translate(${x}px, ${y}px) scale(${ringScale})`;
    }

    document.body.classList.add('has-custom-cursor');

    function onMove(event) {
      x = event.clientX;
      y = event.clientY;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
      render();
    }

    function onLeave() {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    }

    function activate() {
      dotScale = DOT_SCALE;
      ringScale = RING_SCALE;
      dot.classList.add('active');
      ring.classList.add('active');
      render();
    }

    function deactivate() {
      dotScale = 1;
      ringScale = 1;
      dot.classList.remove('active');
      ring.classList.remove('active');
      render();
    }

    // Delegated hover state with boundary checks: mouseover/mouseout bubble up
    // from every descendant, so only toggle when the pointer actually crosses
    // into or out of an interactive element (compared via relatedTarget).
    // Works for elements added after mount, too.
    const isInteractive = (el) => el?.closest?.('a, button, input, .terminal-toggle');
    function onOver(event) {
      if (isInteractive(event.target) && !isInteractive(event.relatedTarget)) activate();
    }
    function onOut(event) {
      if (isInteractive(event.target) && !isInteractive(event.relatedTarget)) deactivate();
    }

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.body.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
