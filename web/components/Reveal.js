'use client';

import { useEffect, useRef, useState } from 'react';

// Wraps children in a scroll-reveal container. Adds `is-visible` the first time
// the element scrolls into view (IntersectionObserver), matching the old
// GSAP ScrollTrigger batch reveal without the dependency.
export default function Reveal({ as: Tag = 'div', variant = 'up', className = '', children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If reduced motion is on, the CSS shows content immediately; still mark
    // visible so state is consistent.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -12% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal-${variant} ${visible ? 'is-visible' : ''} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
