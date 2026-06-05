import './index.css'

const projects = [
  {
    icon: '🌙',
    title: 'Eid Mubarak Card',
    desc: 'Interactive greeting card deployed live on Netlify. Animated, shareable, and built with love for Eid.',
    tags: ['React', 'Netlify'],
    link: 'https://vocal-torte-894817.netlify.app/',
  },
  {
    icon: '🇺🇸',
    title: 'Citizenship Quiz App',
    desc: 'React-based study tool for the U.S. citizenship test — helps new Americans prepare with confidence.',
    tags: ['React', 'Quiz App'],
    link: 'https://stupendous-kashata-8764aa.netlify.app/',
  },
  {
    icon: '🌾',
    title: 'Borlaug Scholar — Food Security Research',
    desc: 'Awarded Borlaug Scholar 2026 by the World Food Prize Foundation for research on food insecurity in Afghanistan. Hosted at the University of Minnesota.',
    tags: ['Borlaug Scholar', 'Research', 'World Food Prize'],
    link: 'https://docs.google.com/document/d/1iPoukuzXuaDVe4DxNG3TIu0KD755J1xLycpINRqyp0w/edit',
  },
]

const skills = [
  'React', 'JavaScript', 'Python', 'HTML & CSS',
  'GitHub', 'Netlify', 'Canva', 'Claude / AI tools',
]

function goTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function App() {
  return (
    <>
      <nav>
        <div className="nav-logo">ASA</div>
        <div className="nav-links">
          <a href="#about" onClick={e => { e.preventDefault(); goTo('about') }}>About</a>
          <a href="#projects" onClick={e => { e.preventDefault(); goTo('projects') }}>Projects</a>
          <a href="#contact" onClick={e => { e.preventDefault(); goTo('contact') }}>Contact</a>
        </div>
      </nav>

      <section className="hero">
        <p className="hero-eyebrow fade-up delay-1">Builder · Student · Creator</p>
        <h1 className="hero-name fade-up delay-2">
          I build things<br />that <em>matter.</em>
        </h1>
        <p className="hero-sub fade-up delay-3">
          10th grader from Minneapolis. Originally from Afghanistan.
          I create apps, design experiences, and learn in public.
        </p>
        <div className="hero-btns fade-up delay-4">
          <button className="btn-primary" onClick={() => goTo('projects')}>See my work</button>
          <button className="btn-secondary" onClick={() => goTo('contact')}>Get in touch</button>
        </div>
        <div className="hero-badge fade-up delay-5">
          <span>Currently</span>
          Harvard Summer School<br />
          Jun 20 – Aug 2026
        </div>
      </section>

      <section className="section" id="about">
        <p className="section-label">About me</p>
        <div className="about-grid">
          <div className="about-text">
            I moved from <strong>Afghanistan</strong> to Minneapolis about five
            years ago. Since then I have been obsessed with building — apps, tools,
            and ideas that solve real problems for real people.
            <br /><br />
            My faith guides everything I do. I approach work with intention,
            honesty, and a long-term view. The next two years are about one
            thing: <strong>build things, help people.</strong>
          </div>
          <div className="about-stats">
            <div className="stat-card"><div className="stat-num">3</div><div className="stat-label">Projects shipped</div></div>
            <div className="stat-card"><div className="stat-num">2026</div><div className="stat-label">Borlaug Scholar</div></div>
            <div className="stat-card"><div className="stat-num">MN</div><div className="stat-label">Minneapolis, USA</div></div>
            <div className="stat-card"><div className="stat-num">∞</div><div className="stat-label">Things to build</div></div>
          </div>
        </div>
      </section>

      <section className="section" id="projects">
        <p className="section-label">Projects</p>
        <div className="projects-grid">
          {projects.map((p) => (
            <div className="project-card" key={p.title}>
              <div className="project-icon">{p.icon}</div>
              <div className="project-title">{p.title}</div>
              <div className="project-desc">{p.desc}</div>
              <div className="project-tags">
                {p.tags.map(t => <span className="tag" key={t}>{t}</span>)}
              </div>
              {p.link && (
                <a className="project-link" href={p.link} target="_blank" rel="noreferrer">
                  View project →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="section-label">Tools &amp; skills</p>
        <div className="skills-row">
          {skills.map(s => <div className="skill-pill" key={s}>{s}</div>)}
        </div>
      </section>

      <section className="section" id="contact">
        <div className="contact-inner">
          <div>
            <h2 className="contact-heading">Let's build<br />something.</h2>
            <p className="contact-sub">Open to collabs, feedback, and good conversations.</p>
          </div>
          <div className="contact-links">
            <a className="contact-item" href="mailto:shahir42881@gmail.com">
              <span className="contact-icon">✉</span>
              shahir42881@gmail.com
            </a>
            <a className="contact-item" href="https://github.com/my-first-repo" target="_blank" rel="noreferrer">
              <span className="contact-icon">⌥</span>
              github.com/ahmad
            </a>
            <div className="contact-item">
              <span className="contact-icon">◎</span>
              asa.dev — coming soon
            </div>
          </div>
        </div>
      </section>

      <footer>
        <span className="footer-left">© 2026 ASA — Ahmad Shahir</span>
        <span className="footer-right">Built with intention.</span>
      </footer>
    </>
  )
}
