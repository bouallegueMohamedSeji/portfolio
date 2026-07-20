'use client';

import { useEffect, useRef } from 'react';

// Matrix rain background. Pauses while the tab is hidden and is skipped
// entirely under reduced motion.
export default function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""\'#&_(),.;:?!\\|{}<>[]^~';
    const fontSize = 14;
    let columns = [];
    let intervalId = null;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const totalColumns = Math.floor(canvas.width / fontSize);
      columns = Array.from({ length: totalColumns }, () => 1);
    }

    function draw() {
      // Fade the previous frame slightly so streams leave a decaying trail.
      ctx.fillStyle = 'rgba(5, 5, 5, 0.07)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < columns.length; i += 1) {
        const char = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = i * fontSize;
        const y = columns[i] * fontSize;

        // The char just above the head is mid-green — reinforces the trail's hue.
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(0, 255, 157, 0.45)';
        ctx.fillText(
          chars.charAt(Math.floor(Math.random() * chars.length)),
          x,
          y - fontSize
        );

        // Bright, glowing leading glyph — the signature Matrix "head".
        ctx.fillStyle = '#d7fff0';
        ctx.shadowColor = '#00ff9d';
        ctx.shadowBlur = 10;
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          columns[i] = 0;
        }
        columns[i] += 1;
      }
      ctx.shadowBlur = 0;
    }

    function start() {
      if (intervalId === null) intervalId = window.setInterval(draw, 33);
    }
    function stop() {
      if (intervalId !== null) {
        window.clearInterval(intervalId);
        intervalId = null;
      }
    }

    function onVisibility() {
      if (document.hidden) stop();
      else start();
    }

    resize();
    start();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-bg" aria-hidden="true" />;
}
