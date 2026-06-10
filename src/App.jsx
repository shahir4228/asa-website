import './index.css'
import { useState, useRef, useEffect } from 'react'
import { BackgroundPaths, AnimatedHeroName } from './components/BackgroundPaths'

const projects = [
  {
    icon: '🚗',
    title: 'Car Design Showcase',
    desc: 'A sleek, visual website showcasing car designs with a modern aesthetic — built to demonstrate UI design and frontend skills.',
    tags: ['HTML', 'CSS', 'Design'],
    link: 'https://eloquent-gumdrop-c5a60a.netlify.app/',
  },
  {
    icon: '🍽️',
    title: 'Zaffron Kitchen',
    desc: 'Full restaurant website built for a real client. Includes menu, branding, and a clean user experience for diners.',
    tags: ['React', 'Netlify', 'Client Work'],
    link: null,
  },
  {
    icon: '✈️',
    title: 'Tourist Travel Website',
    desc: 'A travel and tourism website with destination pages and modern layout — built to practice UX design and responsive layouts.',
    tags: ['HTML', 'CSS', 'UX'],
    link: null,
  },
  {
    icon: '🌙',
    title: 'Eid Mubarak Card',
    desc: 'Interactive animated greeting card deployed live on Netlify. Built with love for Eid — shareable and mobile-friendly.',
    tags: ['React', 'Netlify'],
    link: 'https://vocal-torte-894817.netlify.app/',
  },
  {
    icon: '🇺🇸',
    title: 'U.S. Citizenship Quiz App',
    desc: 'React-based study tool for the U.S. citizenship test — helps new Americans prepare with confidence, question by question.',
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
  {
    icon: '📖',
    title: 'Educational Book Project',
    desc: 'Currently writing an educational book on learning and student development — combining research, structured writing, and real experience.',
    tags: ['Writing', 'Research', 'In Progress'],
    link: null,
  },
]

const experience = [
  {
    role: 'Harvard Summer School Student',
    org: 'Harvard University — Cambridge, MA',
    period: 'Jun – Aug 2026',
    points: [
      'Competitively selected to attend Harvard Summer School as a high school student',
      'Studying alongside students from around the world in an intensive academic environment',
    ],
  },
  {
    role: 'Borlaug Scholar',
    org: 'World Food Prize Foundation — University of Minnesota',
    period: '2026',
    points: [
      'Awarded Borlaug Scholar 2026 for independent research on food insecurity in Afghanistan',
      'Presented research findings at a program hosted by the University of Minnesota',
    ],
  },
  {
    role: 'Marketing Chair',
    org: 'Asian Club — Brooklyn Center High School',
    period: '2025 – 2026',
    points: [
      'Led marketing and outreach for club events, growing student awareness and participation',
      'Managed club communications and collaborated on planning and organization',
    ],
  },
  {
    role: 'Independent Researcher & Writer',
    org: 'Self-directed',
    period: '2024 – Present',
    points: [
      'Researched global issues, world affairs, and AI including machine learning and neural networks',
      'Authored a Youth Institute paper on malnutrition in Afghanistan',
      'Currently writing an educational book on learning and student development',
    ],
  },
  {
    role: 'Soccer Team Member',
    org: 'Brooklyn Center High School',
    period: '2023 – Present',
    points: [
      'Competed on the school soccer team, developing discipline, teamwork, and strategy',
    ],
  },
]

const skills = [
  'React', 'JavaScript', 'Python', 'Java (beginner)', 'HTML & CSS',
  'GitHub', 'Netlify', 'Canva', 'Claude / AI tools',
  'Photography', 'Video Editing', 'UX/UI Design', 'Grammarly',
]

const languages = [
  { lang: 'English', level: 'Fluent' },
  { lang: 'Pashto', level: 'Native' },
  { lang: 'Dari', level: 'Native' },
  { lang: 'Persian', level: 'Fluent' },
]

const botQA = [
  {
    triggers: ['hello', 'hi', 'hey', 'sup', 'start'],
    answer: "Hey! I'm Ahmad's assistant. Ask me about his projects, skills, background, or how to reach him.",
  },
  {
    triggers: ['who', 'about', 'ahmad', 'yourself', 'person'],
    answer: "Ahmad Shahir Ahmadi is a 10th grader from Minneapolis, originally from Afghanistan. He's a builder, researcher, and 4× Honor Roll student heading to Harvard Summer School in 2026.",
  },
  {
    triggers: ['project', 'build', 'ship', 'website', 'work', 'portfolio'],
    answer: "Ahmad has shipped 8 websites — including a restaurant site for Zaffron Kitchen, a car design showcase, a U.S. citizenship quiz app, and an interactive Eid card. He also earned the Borlaug Scholar award for research on food insecurity in Afghanistan.",
  },
  {
    triggers: ['skill', 'tech', 'code', 'language', 'program'],
    answer: "Ahmad codes in React, JavaScript, Python, and HTML/CSS. He also speaks 4 languages: English, Pashto, Dari, and Persian.",
  },
  {
    triggers: ['harvard', 'summer', 'school'],
    answer: "Ahmad was competitively selected to attend Harvard Summer School starting June 20, 2026 — a 7-week academic program at Harvard University.",
  },
  {
    triggers: ['borlaug', 'research', 'food', 'afghanistan', 'scholar'],
    answer: "Ahmad was named a Borlaug Scholar 2026 by the World Food Prize Foundation for his research on food insecurity in Afghanistan, hosted at the University of Minnesota.",
  },
  {
    triggers: ['contact', 'reach', 'hire', 'email', 'collab', 'work with'],
    answer: "You can reach Ahmad at shahir42881@gmail.com — he's open to collabs, client work, and good conversations.",
  },
  {
    triggers: ['where', 'location', 'from', 'live', 'minneapolis'],
    answer: "Ahmad is based in Minneapolis, Minnesota. He originally came from Afghanistan about 5 years ago.",
  },
  {
    triggers: ['goal', 'future', 'plan', 'dream', 'university', 'college'],
    answer: "Ahmad's goal is to attend Harvard University and pursue finance and software engineering. His theme for the next two years: build things, help people.",
  },
  {
    triggers: ['book', 'writing', 'educational'],
    answer: "Ahmad is currently writing an educational book focused on learning and student development — combining research, structured writing, and real experience.",
  },
]

const suggestions = [
  'Who is Ahmad?',
  'What projects has he built?',
  'What are his skills?',
  'How do I contact him?',
  'Tell me about Harvard',
]

function getResponse(input) {
  const lower = input.toLowerCase()
  for (const qa of botQA) {
    if (qa.triggers.some(t => lower.includes(t))) return qa.answer
  }
  return "Good question! I don't have that answer, but you can email Ahmad directly at shahir42881@gmail.com."
}

function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! I'm Ahmad's assistant. What would you like to know?" }
  ])
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  function send(text) {
    const userMsg = text || input.trim()
    if (!userMsg) return
    setMessages(prev => [...prev, { from: 'user', text: userMsg }])
    setInput('')
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'bot', text: getResponse(userMsg) }])
    }, 400)
  }

  return (
    <div className="chat-widget">
      {open && (
        <div className="chat-box">
          <div className="chat-header">
            <div>
              <div className="chat-title">Ask about Ahmad</div>
              <div className="chat-sub">Usually answers instantly</div>
            </div>
            <button className="chat-close" onClick={() => setOpen(false)}>✕</button>
          </div>
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.from}`}>{m.text}</div>
            ))}
            <div ref={bottomRef} />
          </div>
          {messages.length === 1 && (
            <div className="chat-suggestions">
              {suggestions.map(s => (
                <button key={s} className="chat-suggestion" onClick={() => send(s)}>{s}</button>
              ))}
            </div>
          )}
          <div className="chat-input-row">
            <input
              className="chat-input"
              placeholder="Ask a question..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
            />
            <button className="chat-send" onClick={() => send()}>→</button>
          </div>
        </div>
      )}
      <button className="chat-bubble" onClick={() => setOpen(o => !o)}>
        {open ? '✕' : '💬'}
      </button>
    </div>
  )
}

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
          <a href="#experience" onClick={e => { e.preventDefault(); goTo('experience') }}>Experience</a>
          <a href="#projects" onClick={e => { e.preventDefault(); goTo('projects') }}>Projects</a>
          <a href="#skills" onClick={e => { e.preventDefault(); goTo('skills') }}>Skills</a>
          <a href="#contact" onClick={e => { e.preventDefault(); goTo('contact') }}>Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <BackgroundPaths />
        <p className="hero-eyebrow fade-up delay-1">Builder · Student · Creator · Researcher</p>
        <AnimatedHeroName firstName="Ahmad Shahir" lastName="Ahmadi" />
        <p className="hero-sub fade-up delay-3">
          10th grader from Minneapolis. Originally from Afghanistan.
          I ship real websites, research hard problems, and build things that help people.
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

      {/* ABOUT */}
      <section className="section" id="about">
        <p className="section-label">About me</p>
        <div className="about-grid">
          <div className="about-text">
            I was born in <strong>Afghanistan</strong> and moved to Minneapolis five years ago.
            My roots shaped who I am — my discipline, my values, and my drive to make something
            meaningful out of every opportunity I get.
            <br /><br />
            I approach every project with <strong>intention and honesty</strong>. I do not rush.
            I do not cut corners. I care about the work and the people it is built for.
            <br /><br />
            Academically, I am a four-time <strong>Honor Roll</strong> recipient at Brooklyn Center
            High School, selected to attend <strong>Harvard Summer School</strong> in 2026.
            I speak <strong>four languages</strong>, play soccer, research global issues,
            and write about what I find.
            <br /><br />
            But most of all, I build. I have shipped <strong>8 real websites</strong> — live,
            deployed, solving actual problems for actual people. I believe the best way to learn
            is to create, and the best way to create is to care deeply about who you are building for.
            <br /><br />
            My theme for the next two years: <strong>build things, help people.</strong>
          </div>
          <div className="about-stats">
            <div className="stat-card"><div className="stat-num">8</div><div className="stat-label">Websites shipped</div></div>
            <div className="stat-card"><div className="stat-num">4×</div><div className="stat-label">Honor Roll</div></div>
            <div className="stat-card"><div className="stat-num">4</div><div className="stat-label">Languages spoken</div></div>
            <div className="stat-card"><div className="stat-num">2026</div><div className="stat-label">Borlaug Scholar</div></div>
            <div className="stat-card"><div className="stat-num">MN</div><div className="stat-label">Minneapolis, USA</div></div>
            <div className="stat-card"><div className="stat-num">∞</div><div className="stat-label">Things to build</div></div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="section" id="experience">
        <p className="section-label">Experience &amp; Activities</p>
        <div className="experience-list">
          {experience.map((e) => (
            <div className="exp-card" key={e.role}>
              <div className="exp-header">
                <div>
                  <div className="exp-role">{e.role}</div>
                  <div className="exp-org">{e.org}</div>
                </div>
                <div className="exp-period">{e.period}</div>
              </div>
              <ul className="exp-points">
                {e.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
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

      {/* SKILLS */}
      <section className="section" id="skills">
        <p className="section-label">Skills &amp; Tools</p>
        <div className="skills-row">
          {skills.map(s => <div className="skill-pill" key={s}>{s}</div>)}
        </div>
        <p className="section-sublabel">Languages</p>
        <div className="languages-row">
          {languages.map(l => (
            <div className="lang-card" key={l.lang}>
              <div className="lang-name">{l.lang}</div>
              <div className="lang-level">{l.level}</div>
            </div>
          ))}
        </div>
        <p className="section-sublabel">Education</p>
        <div className="edu-card">
          <div className="edu-left">
            <div className="edu-school">Brooklyn Center High School</div>
            <div className="edu-detail">Brooklyn Center, Minnesota · 10th Grade</div>
            <div className="edu-highlights">
              <span className="tag">Honor Roll × 4</span>
              <span className="tag">Harvard Summer School 2026</span>
              <span className="tag">Math · CS · Economics · English</span>
            </div>
          </div>
          <div className="edu-right">Expected Graduation: 2028</div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section" id="contact">
        <div className="contact-inner">
          <div>
            <h2 className="contact-heading">Let's build<br />something.</h2>
            <p className="contact-sub">Open to collabs, client work, feedback, and good conversations.</p>
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
              Minneapolis, MN · Available for remote work
            </div>
          </div>
        </div>
      </section>

      <footer>
        <span className="footer-left">© 2026 Ahmad Shahir Ahmadi</span>
        <span className="footer-right">Built with intention. Deployed on Netlify.</span>
      </footer>

      <Chatbot />
    </>
  )
}
