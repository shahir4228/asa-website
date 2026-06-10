import './index.css'
import { useState, useRef, useEffect } from 'react'
import { BackgroundPaths, AnimatedHeroName } from './components/BackgroundPaths'
import { CinematicFooter } from './components/ui/motion-footer'
import { AnimatedText } from './components/ui/animated-underline-text-one'
import { ElegantShape } from './components/ui/shape-landing-hero'

const projects = [
  {
    icon: '🚗',
    title: 'Car Design Showcase',
    desc: 'Design-focused car website I built to push my CSS skills. Dark aesthetic, clean layout — mostly just me trying things and seeing what sticks.',
    tags: ['HTML', 'CSS', 'Design'],
    link: 'https://eloquent-gumdrop-c5a60a.netlify.app/',
  },
  {
    icon: '🍽️',
    title: 'Zaffron Kitchen',
    desc: 'Real client work. Built a full restaurant website for Zaffron Kitchen — menu, branding, the whole thing. Actual people use it.',
    tags: ['React', 'Netlify', 'Client Work'],
    link: null,
  },
  {
    icon: '✈️',
    title: 'Tourist Travel Website',
    desc: 'Travel site with destination pages and responsive layouts. Built this to get better at UX — figuring out what makes a layout feel good to use.',
    tags: ['HTML', 'CSS', 'UX'],
    link: null,
  },
  {
    icon: '🌙',
    title: 'Eid Mubarak Card',
    desc: 'Animated greeting card for Eid, deployed on Netlify. Made it for family first, then put it online. Still my most shared project.',
    tags: ['React', 'Netlify'],
    link: 'https://vocal-torte-894817.netlify.app/',
  },
  {
    icon: '🇺🇸',
    title: 'U.S. Citizenship Quiz App',
    desc: 'React quiz app to help people study for the citizenship test. Practical, nothing fancy — just a tool that actually works.',
    tags: ['React', 'Quiz App'],
    link: 'https://stupendous-kashata-8764aa.netlify.app/',
  },
  {
    icon: '🌾',
    title: 'Borlaug Scholar — Food Security Research',
    desc: 'Named Borlaug Scholar 2026 by the World Food Prize Foundation for research I did on food insecurity in Afghanistan. Presented at the University of Minnesota.',
    tags: ['Borlaug Scholar', 'Research', 'World Food Prize'],
    link: 'https://docs.google.com/document/d/1iPoukuzXuaDVe4DxNG3TIu0KD755J1xLycpINRqyp0w/edit',
  },
  {
    icon: '📖',
    title: 'Educational Book Project',
    desc: 'Writing a book on learning and student development. Been going slower than I expected — turns out writing is harder than coding.',
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
      'Got selected for Harvard Summer School — still kind of surreal honestly',
      'Spending 7 weeks on campus studying alongside students from all over the world',
    ],
  },
  {
    role: 'Borlaug Scholar',
    org: 'World Food Prize Foundation — University of Minnesota',
    period: '2026',
    points: [
      'Named Borlaug Scholar 2026 for research on food insecurity in Afghanistan',
      'Presented my findings at a University of Minnesota program through the World Food Prize Foundation',
    ],
  },
  {
    role: 'Marketing Chair',
    org: 'Asian Club — Brooklyn Center High School',
    period: '2025 – 2026',
    points: [
      'Ran marketing for the Asian Club — flyers, social posts, getting people to actually show up',
      'Handled communications and helped plan events throughout the school year',
    ],
  },
  {
    role: 'Independent Researcher & Writer',
    org: 'Self-directed',
    period: '2024 – Present',
    points: [
      'Spent a lot of time reading and writing about AI, food systems, and global issues on my own',
      'Wrote a paper on malnutrition in Afghanistan for a Youth Institute program',
      'Working on an educational book about learning — in progress, slower than I hoped',
    ],
  },
  {
    role: 'Soccer Team Member',
    org: 'Brooklyn Center High School',
    period: '2023 – Present',
    points: [
      'On the school soccer team — one of the few things that gets me off the computer',
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
    answer: "Hey! I'm Ahmad's little assistant bot. Ask me anything about him — projects, background, how to reach him.",
  },
  {
    triggers: ['who', 'about', 'ahmad', 'yourself', 'person'],
    answer: "Ahmad Shahir Ahmadi — 10th grader from Minneapolis, originally from Afghanistan. Builds websites, does research, 4× Honor Roll. Heading to Harvard Summer School this summer.",
  },
  {
    triggers: ['project', 'build', 'ship', 'website', 'work', 'portfolio'],
    answer: "He's shipped 8 real sites: a restaurant site for Zaffron Kitchen, a citizenship quiz app, a car showcase, an Eid card, and more. Also earned the Borlaug Scholar award for research on food security in Afghanistan.",
  },
  {
    triggers: ['skill', 'tech', 'code', 'language', 'program'],
    answer: "Codes in React, JavaScript, Python, and HTML/CSS. Speaks 4 languages too: English, Pashto, Dari, and Persian.",
  },
  {
    triggers: ['harvard', 'summer', 'school'],
    answer: "He got into Harvard Summer School — 7 weeks on campus starting June 20, 2026. Pretty wild for a 10th grader.",
  },
  {
    triggers: ['borlaug', 'research', 'food', 'afghanistan', 'scholar'],
    answer: "Named Borlaug Scholar 2026 by the World Food Prize Foundation for research on food insecurity in Afghanistan. Presented at the University of Minnesota.",
  },
  {
    triggers: ['contact', 'reach', 'hire', 'email', 'collab', 'work with'],
    answer: "Email him at shahir42881@gmail.com. He's open to collabs, client work, whatever — just reach out.",
  },
  {
    triggers: ['where', 'location', 'from', 'live', 'minneapolis'],
    answer: "Based in Minneapolis. Moved there from Afghanistan about 5 years ago. Still getting used to the cold apparently.",
  },
  {
    triggers: ['goal', 'future', 'plan', 'dream', 'university', 'college'],
    answer: "Wants to go to Harvard and study finance and software engineering. For now: build things, help people.",
  },
  {
    triggers: ['book', 'writing', 'educational'],
    answer: "He's writing a book on learning and student development. Says it's going slower than coding. Still at it though.",
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
  return "Not sure about that one. You can always just email Ahmad directly — shahir42881@gmail.com."
}

function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hey! Ask me anything about Ahmad." }
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

        {/* floating geometric shapes */}
        <ElegantShape
          delay={0.3} width={520} height={130} rotate={12}
          gradient="from-amber-500/[0.10]"
          className="left-[-8%] top-[18%]"
        />
        <ElegantShape
          delay={0.5} width={420} height={100} rotate={-14}
          gradient="from-rose-500/[0.10]"
          className="right-[-4%] top-[65%]"
        />
        <ElegantShape
          delay={0.4} width={260} height={70} rotate={-7}
          gradient="from-violet-500/[0.12]"
          className="left-[8%] bottom-[12%]"
        />
        <ElegantShape
          delay={0.6} width={180} height={52} rotate={22}
          gradient="from-yellow-400/[0.12]"
          className="right-[18%] top-[12%]"
        />
        <ElegantShape
          delay={0.7} width={130} height={38} rotate={-26}
          gradient="from-cyan-500/[0.10]"
          className="left-[24%] top-[8%]"
        />

        <p className="hero-eyebrow fade-up delay-1">Builder · Student · Creator · Researcher</p>
        <AnimatedHeroName firstName="Ahmad Shahir" lastName="Ahmadi" />
        <p className="hero-sub fade-up delay-3">
          10th grade, Minneapolis. Came from Afghanistan five years ago.
          I build stuff, research things I care about, and try to make it count.
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
        <AnimatedText text="About me" className="section-label" />
        <div className="about-grid">
          <div className="about-text">
            I grew up in <strong>Afghanistan</strong> and moved to Minneapolis about five years ago.
            Still getting used to the winters, honestly.
            <br /><br />
            School's been going well — <strong>Honor Roll four times</strong>, and this summer
            I'm heading to <strong>Harvard Summer School</strong>, which still doesn't feel real.
            But most of what I actually learn comes from just building things.
            <br /><br />
            I've shipped <strong>8 real websites</strong>. Not demos. Actual sites — for clients,
            for competitions, for fun. I find a problem, figure it out, put something live.
            That's how I work.
            <br /><br />
            I also write and research on the side — got named a <strong>Borlaug Scholar</strong>
            in 2026 for work on food insecurity in Afghanistan. Working on a book too,
            though it's going slower than coding does.
            <br /><br />
            Four languages. Play soccer. Drink too much tea. That's pretty much me.
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
        <AnimatedText text="Experience & Activities" className="section-label" />
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
        <AnimatedText text="Projects" className="section-label" />
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
        <AnimatedText text="Skills & Tools" className="section-label" />
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

      <CinematicFooter />

      <Chatbot />
    </>
  )
}
