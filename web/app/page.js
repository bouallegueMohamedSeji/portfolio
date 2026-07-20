import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Work from '@/components/Work';
import Contact from '@/components/Contact';
import MatrixRain from '@/components/MatrixRain';
import CustomCursor from '@/components/CustomCursor';
import Spotlight from '@/components/Spotlight';
import ScrollProgress from '@/components/ScrollProgress';
import Loader from '@/components/Loader';
import Terminal from '@/components/Terminal';

export default function Home() {
  return (
    <>
      {/* Gooey threshold filter for the MorphText headings (see MorphText.js). */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <filter id="morphThreshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            />
          </filter>
        </defs>
      </svg>

      <div className="website-content">
        <CustomCursor />
        <MatrixRain />
        <Spotlight />
        <div className="grid-overlay" aria-hidden="true" />
        <ScrollProgress />

        <Header />

        <main>
          <Hero />
          <About />
          <Skills />
          <Work />
          <Contact />
        </main>

        <footer className="site-footer">
          <p>Designed &amp; Built by Med Seji Bouallegue</p>
        </footer>

        <Terminal />
      </div>

      <Loader />
    </>
  );
}
