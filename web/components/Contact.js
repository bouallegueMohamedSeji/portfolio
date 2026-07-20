import Reveal from './Reveal';
import MorphText from './MorphText';

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <Reveal variant="boot" className="contact-wrap">
        <p className="eyebrow"><span>04.</span> What&apos;s Next?</p>
        <h2><MorphText text="Get In Touch" /></h2>
        <p className="contact-copy">
          I am currently open to new opportunities, collaborations, and
          interesting technical conversations.
        </p>

        <a href="mailto:MohamedSeji.Bouallegue@esprit.tn" className="button-primary">Say Hello</a>

        <div className="contact-grid">
          <div className="contact-card">
            <span>Location</span>
            <strong>Tunis, Tunisia</strong>
          </div>
          <div className="contact-card">
            <span>Email</span>
            <strong><a href="mailto:MohamedSeji.Bouallegue@esprit.tn">MohamedSeji.Bouallegue@esprit.tn</a></strong>
          </div>
        </div>

        <div className="socials">
          <a href="https://github.com/bouallegueMohamedSeji" className="social-icon" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
              <path fill="currentColor" d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.575.106.785-.25.785-.556 0-.274-.01-1-.015-1.965-3.196.695-3.87-1.54-3.87-1.54-.523-1.328-1.277-1.682-1.277-1.682-1.043-.713.08-.699.08-.699 1.153.081 1.76 1.184 1.76 1.184 1.026 1.758 2.692 1.25 3.348.956.104-.743.401-1.25.73-1.538-2.552-.29-5.235-1.276-5.235-5.68 0-1.255.448-2.281 1.183-3.086-.119-.29-.513-1.46.112-3.044 0 0 .965-.309 3.163 1.18a10.98 10.98 0 0 1 2.88-.388c.977.004 1.96.132 2.88.388 2.196-1.489 3.16-1.18 3.16-1.18.626 1.584.232 2.754.114 3.044.737.805 1.182 1.831 1.182 3.086 0 4.415-2.687 5.386-5.246 5.67.412.355.78 1.056.78 2.13 0 1.538-.014 2.778-.014 3.157 0 .308.207.667.79.554A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z"/>
            </svg>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
