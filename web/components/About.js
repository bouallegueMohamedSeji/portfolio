import Reveal from './Reveal';
import MorphText from './MorphText';

export default function About() {
  return (
    <section className="section about" id="about">
      <Reveal className="section-heading">
        <h2><span>01.</span> <MorphText text="About Me" /></h2>
        <div className="section-line"></div>
      </Reveal>

      <div className="about-grid">
        <Reveal className="about-copy">
          <p>
            Hey, I&apos;m Seji. I like understanding how a whole system fits
            together, not just one slice of it. That&apos;s why I built{' '}
            <strong>SynergyGig</strong>, a 26-module HR platform, entirely on
            my own: the JavaFX client, the FastAPI backend, the database,
            and all the wiring in between. Doing it solo taught me more than
            any single course could.
          </p>
          <p>
            Since then I&apos;ve worked with Spring Boot, Angular, and React,
            and self-hosted projects for fun. I care less about any one
            framework and more about building things that actually work for
            the people using them.
          </p>
          <p>
            Right now I&apos;m looking for a team where I can learn from people
            better than me and help ship products that real users depend on.
          </p>
        </Reveal>

        <Reveal className="about-panel">
          <h3>Education</h3>
          <ol className="timeline">
            <li>
              <div className="timeline-role">Software Engineering Student</div>
              <div className="timeline-org">ESPRIT &middot; Tunis, Tunisia</div>
              <p>Full-stack development, systems, and networking: theory backed by real project work.</p>
            </li>
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
