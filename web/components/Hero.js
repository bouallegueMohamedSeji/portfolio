'use client';

import Reveal from './Reveal';
import { useScramble } from './hooks/useScramble';

const FINAL_NAME = 'Med Seji Bouallegue.';

export default function Hero() {
  const { text: name, replay } = useScramble(FINAL_NAME, { delay: 400 });

  return (
    <section className="hero section" id="hero">
      <Reveal className="hero-copy">
        <p className="eyebrow">Hi, my name is</p>
        <h1 style={{ minHeight: '1.05em' }} onMouseEnter={replay} title="hover to re-decrypt">
          {name || ' '}
          <span className="caret" aria-hidden="true"></span>
        </h1>
        <h2>I like building things end to end.</h2>
        <p className="hero-text">
          I&apos;m a software engineering student at ESPRIT in Tunis who&apos;s happiest
          when there&apos;s something to build. Most of what I know came from
          shipping real projects end to end, and figuring out the parts I
          didn&apos;t understand yet along the way.
        </p>

        <div className="hero-actions">
          <a href="#work" className="button-primary">View my work</a>
          <a href="/resume.pdf" className="button-ghost" download>Download Resume</a>
        </div>

        <div className="status-chip">
          <span className="status-dot" aria-hidden="true"></span>
          Open to opportunities
        </div>
      </Reveal>

      <Reveal className="hero-photo">
        <div className="photo-frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/photo.png" alt="Med Seji Bouallegue" className="photo-img" />
        </div>
      </Reveal>
    </section>
  );
}
