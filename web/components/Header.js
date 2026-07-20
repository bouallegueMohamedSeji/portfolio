export default function Header() {
  return (
    <header className="site-header">
      <a href="#hero" className="brand">Seji</a>

      <nav className="nav">
        <a href="#about"><span>01.</span> About</a>
        <a href="#skills"><span>02.</span> Skills</a>
        <a href="#work"><span>03.</span> Work</a>
        <a href="#contact"><span>04.</span> Contact</a>
        <a href="#contact" className="nav-cta">Get In Touch</a>
      </nav>
    </header>
  );
}
