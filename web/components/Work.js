import Reveal from './Reveal';
import MorphText from './MorphText';
import ProjectCard from './ProjectCard';

export default function Work() {
  return (
    <section className="section work" id="work">
      <Reveal className="section-heading">
        <h2><span>03.</span> <MorphText text="Some Things I've Built" /></h2>
        <div className="section-line"></div>
      </Reveal>

      <div className="project-grid">
        <ProjectCard variant="deal-left">
          <div className="project-top">
            <div className="folder-icon"></div>
            <div className="nda-pill">Live</div>
          </div>
          <h3>SynergyGig</h3>
          <p>
            An HR &amp; workforce management platform spanning 26 modules:
            HR management, Kanban project tracking, contract e-signing, video
            calls, live transcription, and n8n-driven workflow automation.
            Built solo end to end.
          </p>
          <ul>
            <li>JavaFX 21</li>
            <li>FastAPI</li>
            <li>MySQL</li>
          </ul>
          <a href="https://synergygig.work.gd" className="project-link">synergygig.work.gd &rarr;</a>
        </ProjectCard>

        <ProjectCard variant="deal-right">
          <div className="project-top">
            <div className="folder-icon"></div>
            <div className="nda-pill">Open Source</div>
          </div>
          <h3>Leave &amp; Absence Management System</h3>
          <p>
            A full-stack HR tool for requesting, approving, and tracking
            employee leave and absences: a Java backend paired with a
            TypeScript/Angular front end.
          </p>
          <ul>
            <li>Java</li>
            <li>TypeScript</li>
            <li>Angular</li>
          </ul>
          <a href="https://github.com/bouallegueMohamedSeji/Leave-Absence-Management-System" className="project-link">View on GitHub &rarr;</a>
        </ProjectCard>
      </div>
    </section>
  );
}
