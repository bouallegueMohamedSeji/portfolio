'use client';

import Reveal from './Reveal';
import SkillRadar from './SkillRadar';
import MorphText from './MorphText';

export default function Skills() {
  return (
    <section className="section skills" id="skills">
      <Reveal className="section-heading">
        <h2><span>02.</span> <MorphText text="Skill Matrix" /></h2>
        <div className="section-line"></div>
      </Reveal>

      <Reveal as="p" className="skills-intro">
        I&apos;m a generalist by nature, happy moving from the front end all
        the way down to the database. Here&apos;s what I reach for most — distance
        from the centre is how far I&apos;ve taken it, not a score.
      </Reveal>

      <Reveal className="skills-radar-wrap">
        <SkillRadar />
        <p className="skill-proof">
          Shipped in <span>SynergyGig</span> and the{' '}
          <span>Leave &amp; Absence System</span>.
        </p>
      </Reveal>
    </section>
  );
}
