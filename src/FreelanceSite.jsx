import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Fade-in on scroll ────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253" />
      </svg>
    ),
    name: 'Landing Page',
    desc: 'A clean, fast, single-page site that converts. Perfect for launches, events, or simple businesses.',
    price: '$150',
    time: '3–5 days',
    features: ['Responsive design', 'Contact form', 'SEO ready', 'Fast loading'],
    highlight: false,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
      </svg>
    ),
    name: 'Business Website',
    desc: 'Multi-page site for restaurants, shops, or services. Menu, gallery, contact — the whole thing.',
    price: '$300',
    time: '1–2 weeks',
    features: ['5+ pages', 'Gallery & menu', 'Google Maps', 'Mobile-first'],
    highlight: false,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    name: 'Portfolio Site',
    desc: 'A personal site that makes you look like a professional. For creatives, students, and freelancers.',
    price: '$200',
    time: '5–7 days',
    features: ['Custom design', 'Projects showcase', 'About & contact', 'Animations'],
    highlight: true,
    badge: 'Most Popular',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    name: 'React Web App',
    desc: 'A real interactive app — quizzes, dashboards, tools. Built in React, deployed and ready.',
    price: '$500',
    time: '2–4 weeks',
    features: ['React + hooks', 'Custom logic', 'API integration', 'Deployed live'],
    highlight: false,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    ),
    name: 'E-commerce Store',
    desc: 'A store people can actually buy from. Product pages, cart, checkout — built to sell.',
    price: '$450',
    time: '2–3 weeks',
    features: ['Product catalog', 'Cart & checkout', 'Payment ready', 'Inventory'],
    highlight: false,
  },
]

const STEPS = [
  {
    num: '01',
    title: 'We Chat',
    desc: "Tell me what you need. I'll ask a few questions, figure out the right fit, and send a clear quote — no fluff.",
  },
  {
    num: '02',
    title: 'I Build It',
    desc: "I get to work. You'll see progress updates. No disappearing acts — I'm reachable the whole time.",
  },
  {
    num: '03',
    title: 'Goes Live',
    desc: "I deploy it, set up the domain, and hand it off. You walk away with something real and working.",
  },
]

const PROJECTS = [
  {
    title: 'Zaffron Kitchen',
    desc: 'Full restaurant website — menu, branding, contact. Built for a real client. Actual people use it.',
    tags: ['React', 'Client Work'],
    link: null,
    accent: '#c8b896',
  },
  {
    title: 'U.S. Citizenship Quiz App',
    desc: 'React app helping people study for the citizenship test. Simple, functional, deployed.',
    tags: ['React', 'App'],
    link: 'https://stupendous-kashata-8764aa.netlify.app/',
    accent: '#6ee7b7',
  },
  {
    title: 'Eid Mubarak Card',
    desc: 'Animated greeting card in React. Made for family, put it online. My most shared project.',
    tags: ['React', 'Animation'],
    link: 'https://vocal-torte-894817.netlify.app/',
    accent: '#a78bfa',
  },
  {
    title: 'Car Design Showcase',
    desc: 'Design-focused car site to push my CSS skills. Dark aesthetic, clean layout.',
    tags: ['HTML', 'CSS'],
    link: 'https://eloquent-gumdrop-c5a60a.netlify.app/',
    accent: '#fb923c',
  },
]

const STATS = [
  { val: '8', label: 'Sites Shipped' },
  { val: '4×', label: 'Honor Roll' },
  { val: '3', label: 'Real Clients' },
  { val: '4', label: 'Languages' },
]

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  const scroll = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const links = [
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Work', id: 'work' },
    { label: 'Process', id: 'process' },
  ]

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(9,9,11,0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <a href="/" style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.5px', color: '#c8b896', textDecoration: 'none' }}>ASA</a>

        {/* Desktop links */}
        <div className="hidden-mobile" style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {links.map(l => (
            <button key={l.id} onClick={() => scroll(l.id)} style={{ background: 'none', border: 'none', color: '#a1a1aa', fontSize: 14, cursor: 'pointer', letterSpacing: '0.2px', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#fafafa'}
              onMouseLeave={e => e.target.style.color = '#a1a1aa'}
            >
              {l.label}
            </button>
          ))}
          <button onClick={() => scroll('contact')} style={{ background: '#c8b896', color: '#09090b', border: 'none', borderRadius: 8, padding: '9px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' }}
            onMouseEnter={e => e.target.style.background = '#a8936e'}
            onMouseLeave={e => e.target.style.background = '#c8b896'}
          >
            Let's Talk
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', color: '#a1a1aa', cursor: 'pointer', display: 'none' }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 22, height: 22 }}>
            {menuOpen
              ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" d="M3 12h18M3 6h18M3 18h18" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{ background: '#0f0f12', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '16px 32px 24px' }}>
          {links.map(l => (
            <button key={l.id} onClick={() => scroll(l.id)} style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', color: '#a1a1aa', fontSize: 16, padding: '12px 0', cursor: 'pointer' }}>
              {l.label}
            </button>
          ))}
          <button onClick={() => scroll('contact')} style={{ marginTop: 8, background: '#c8b896', color: '#09090b', border: 'none', borderRadius: 8, padding: '11px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer', width: '100%' }}>
            Let's Talk
          </button>
        </div>
      )}
    </nav>
  )
}

// ─── Service card ─────────────────────────────────────────────────────────────
function ServiceCard({ s }) {
  const [hovered, setHovered] = useState(false)

  const emailSubject = encodeURIComponent(`Website Inquiry — ${s.name}`)
  const emailBody = encodeURIComponent(`Hi Ahmad,\n\nI'm interested in your ${s.name} service (${ s.price }, ${s.time}).\n\n[Tell me a bit about your project here]\n\nThanks`)
  const mailto = `mailto:shahir42881@gmail.com?subject=${emailSubject}&body=${emailBody}`

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{ y: hovered ? -4 : 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{
        position: 'relative',
        background: hovered ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.025)',
        border: hovered
          ? `1px solid rgba(200,184,150,${s.highlight ? 0.5 : 0.25})`
          : `1px solid rgba(255,255,255,${s.highlight ? 0.12 : 0.07})`,
        borderRadius: 16,
        padding: '28px',
        backdropFilter: 'blur(12px)',
        boxShadow: hovered
          ? `0 0 40px rgba(200,184,150,0.08), 0 20px 40px rgba(0,0,0,0.3)`
          : '0 4px 24px rgba(0,0,0,0.2)',
        transition: 'background 0.25s, border 0.25s, box-shadow 0.25s',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        outline: s.highlight ? '1px solid rgba(200,184,150,0.15)' : 'none',
        outlineOffset: s.highlight ? 1 : 0,
      }}
    >
      {/* Badge */}
      {s.badge && (
        <div style={{ position: 'absolute', top: -12, left: 24, background: '#c8b896', color: '#09090b', fontSize: 11, fontWeight: 700, letterSpacing: '0.5px', padding: '3px 12px', borderRadius: 100 }}>
          {s.badge}
        </div>
      )}

      {/* Icon */}
      <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(200,184,150,0.1)', border: '1px solid rgba(200,184,150,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c8b896', marginBottom: 20 }}>
        {s.icon}
      </div>

      {/* Name + desc */}
      <h3 style={{ fontSize: 18, fontWeight: 600, color: '#fafafa', marginBottom: 8, letterSpacing: '-0.3px' }}>{s.name}</h3>
      <p style={{ fontSize: 14, color: '#71717a', lineHeight: 1.65, marginBottom: 24 }}>{s.desc}</p>

      {/* Features */}
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
        {s.features.map(f => (
          <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#a1a1aa' }}>
            <span style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(200,184,150,0.12)', border: '1px solid rgba(200,184,150,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg viewBox="0 0 12 12" fill="none" stroke="#c8b896" strokeWidth="1.8" style={{ width: 8, height: 8 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M1 6l3 3 7-6" />
              </svg>
            </span>
            {f}
          </li>
        ))}
      </ul>

      {/* Price + CTA */}
      <div style={{ marginTop: 'auto', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 32, fontWeight: 700, color: '#c8b896', letterSpacing: '-1.5px', lineHeight: 1 }}>{s.price}</div>
            <div style={{ fontSize: 12, color: '#52525b', marginTop: 4 }}>{s.time} turnaround</div>
          </div>
        </div>
        <a
          href={mailto}
          style={{
            display: 'block',
            textAlign: 'center',
            padding: '11px 0',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'background 0.2s, color 0.2s',
            background: s.highlight ? '#c8b896' : 'transparent',
            color: s.highlight ? '#09090b' : '#c8b896',
            border: s.highlight ? 'none' : '1px solid rgba(200,184,150,0.3)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = s.highlight ? '#a8936e' : 'rgba(200,184,150,0.1)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = s.highlight ? '#c8b896' : 'transparent'
          }}
        >
          Get Started →
        </a>
      </div>
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function FreelanceSite() {
  return (
    <div style={{ minHeight: '100vh', background: '#09090b', color: '#fafafa', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 32px; }
        .section { padding: 96px 0; }
        .section-label { font-size: 11px; color: #c8b896; letter-spacing: 3px; text-transform: uppercase; font-weight: 500; margin-bottom: 16px; display: block; }
        .section-title { font-size: clamp(28px, 4vw, 40px); font-weight: 700; letter-spacing: -1.5px; color: #fafafa; line-height: 1.1; margin-bottom: 16px; }
        .section-sub { font-size: 16px; color: #71717a; line-height: 1.65; max-width: 520px; }
        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .work-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .stats-row { display: flex; gap: 0; }
        .steps-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }
        @media (max-width: 1024px) { .services-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) {
          .services-grid { grid-template-columns: 1fr; }
          .work-grid { grid-template-columns: 1fr; }
          .steps-row { grid-template-columns: 1fr; gap: 24px; }
          .stats-row { flex-wrap: wrap; }
          .container { padding: 0 20px; }
          .section { padding: 72px 0; }
          .hidden-mobile { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>

      <Nav />

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section style={{ padding: '120px 0 96px', position: 'relative', overflow: 'hidden' }}>
        {/* Background glow */}
        <div style={{ position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)', width: 800, height: 600, background: 'radial-gradient(ellipse, rgba(200,184,150,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative' }}>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(200,184,150,0.08)', border: '1px solid rgba(200,184,150,0.2)', borderRadius: 100, padding: '6px 16px', marginBottom: 32 }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#c8b896', boxShadow: '0 0 8px rgba(200,184,150,0.6)' }} />
            <span style={{ fontSize: 12, color: '#c8b896', fontWeight: 500, letterSpacing: '0.5px' }}>Available for new projects</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: 'clamp(44px, 7vw, 88px)', fontWeight: 800, letterSpacing: '-3px', lineHeight: 1.0, marginBottom: 24, maxWidth: 780 }}
          >
            I build websites{' '}
            <span style={{ color: '#c8b896' }}>people</span>
            <br />actually use.
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: 18, color: '#71717a', lineHeight: 1.7, marginBottom: 40, maxWidth: 480 }}
          >
            Ahmad Shahir Ahmadi — developer from Minneapolis. I've shipped 8 real sites for real people. Pick your project below.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
          >
            <a
              href="#services"
              onClick={e => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }) }}
              style={{ background: '#c8b896', color: '#09090b', border: 'none', borderRadius: 10, padding: '14px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', textDecoration: 'none', transition: 'background 0.2s, transform 0.15s', display: 'inline-block' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#a8936e'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#c8b896'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              See Services & Pricing
            </a>
            <a
              href="mailto:shahir42881@gmail.com"
              style={{ background: 'transparent', color: '#a1a1aa', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '14px 28px', fontSize: 15, fontWeight: 500, cursor: 'pointer', textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s', display: 'inline-block' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(200,184,150,0.3)'; e.currentTarget.style.color = '#fafafa' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#a1a1aa' }}
            >
              Email Me Directly
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}>
        <div className="container">
          <div className="stats-row">
            {STATS.map((s, i) => (
              <FadeUp key={s.label} delay={i * 0.07} className="" style={{ flex: 1, minWidth: 120 }}>
                <div style={{ padding: '32px 0', borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', paddingRight: 40, marginRight: 40 }}>
                  <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-2px', color: '#c8b896', lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: 13, color: '#52525b', marginTop: 6 }}>{s.label}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      {/* ── SERVICES ──────────────────────────────────────────────────────────── */}
      <section className="section" id="services">
        <div className="container">
          <FadeUp>
            <span className="section-label">Services & Pricing</span>
            <h2 className="section-title">Pick your project.</h2>
            <p className="section-sub" style={{ marginBottom: 60 }}>
              Every price includes design, development, and deployment. No hidden fees, no surprises. Just tell me what you need.
            </p>
          </FadeUp>

          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <FadeUp key={s.name} delay={i * 0.07}>
                <ServiceCard s={s} />
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.3}>
            <div style={{ marginTop: 32, padding: '20px 24px', background: 'rgba(200,184,150,0.04)', border: '1px solid rgba(200,184,150,0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
              <svg viewBox="0 0 20 20" fill="#c8b896" style={{ width: 16, height: 16, flexShrink: 0 }}>
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
              </svg>
              <p style={{ fontSize: 13, color: '#71717a', lineHeight: 1.5 }}>
                Not sure which one fits? Email me at <a href="mailto:shahir42881@gmail.com" style={{ color: '#c8b896', textDecoration: 'none' }}>shahir42881@gmail.com</a> and we'll figure it out together. Custom quotes available for unique projects.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────────── */}
      <section className="section" id="process" style={{ background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <FadeUp>
            <span className="section-label">The Process</span>
            <h2 className="section-title">Simple. Fast. Real.</h2>
            <p className="section-sub" style={{ marginBottom: 64 }}>
              No overcomplicated workflows. Here's exactly what happens when you hire me.
            </p>
          </FadeUp>

          <div className="steps-row">
            {STEPS.map((step, i) => (
              <FadeUp key={step.num} delay={i * 0.1}>
                <div style={{ position: 'relative' }}>
                  <div style={{ fontSize: 56, fontWeight: 800, letterSpacing: '-3px', color: 'rgba(200,184,150,0.12)', lineHeight: 1, marginBottom: 16 }}>{step.num}</div>
                  <h3 style={{ fontSize: 20, fontWeight: 600, color: '#fafafa', marginBottom: 12, letterSpacing: '-0.4px' }}>{step.title}</h3>
                  <p style={{ fontSize: 14, color: '#71717a', lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAST WORK ─────────────────────────────────────────────────────────── */}
      <section className="section" id="work">
        <div className="container">
          <FadeUp>
            <span className="section-label">Past Work</span>
            <h2 className="section-title">Stuff I've shipped.</h2>
            <p className="section-sub" style={{ marginBottom: 56 }}>
              Not mockups. Not demos. Real projects that are live.
            </p>
          </FadeUp>

          <div className="work-grid">
            {PROJECTS.map((p, i) => (
              <FadeUp key={p.title} delay={i * 0.08}>
                <div
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 14,
                    padding: '28px',
                    transition: 'border-color 0.2s, background 0.2s',
                    height: '100%',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `rgba(200,184,150,0.2)`; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.025)' }}
                >
                  <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                    {p.tags.map(t => (
                      <span key={t} style={{ fontSize: 11, fontWeight: 500, padding: '3px 10px', borderRadius: 4, background: 'rgba(255,255,255,0.05)', color: '#71717a', border: '1px solid rgba(255,255,255,0.06)' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: '#fafafa', marginBottom: 10, letterSpacing: '-0.3px' }}>{p.title}</h3>
                  <p style={{ fontSize: 14, color: '#71717a', lineHeight: 1.65, marginBottom: 24 }}>{p.desc}</p>
                  {p.link ? (
                    <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#c8b896', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, transition: 'opacity 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >
                      View Live
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 12, height: 12 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13L13 3m0 0H6m7 0v7" />
                      </svg>
                    </a>
                  ) : (
                    <span style={{ fontSize: 13, color: '#3f3f46' }}>Private client project</span>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────────────────── */}
      <section className="section" id="about" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <FadeUp>
              <span className="section-label">About Me</span>
              <h2 className="section-title">The person building your site.</h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontSize: 15, color: '#71717a', lineHeight: 1.75 }}>
                <p>
                  I'm <strong style={{ color: '#fafafa', fontWeight: 500 }}>Ahmad Shahir Ahmadi</strong> — 16, from Minneapolis, originally Afghanistan. I started building websites because I wanted to make real things, not just learn theory.
                </p>
                <p>
                  I've shipped 8 real sites — for clients, for competitions, for fun. I've been on the <strong style={{ color: '#fafafa', fontWeight: 500 }}>Honor Roll 4 times</strong>, got named a <strong style={{ color: '#fafafa', fontWeight: 500 }}>Borlaug Scholar 2026</strong> for food security research, and I'm heading to <strong style={{ color: '#fafafa', fontWeight: 500 }}>Harvard Summer School</strong> this summer.
                </p>
                <p>
                  When you hire me, you're not getting an agency or a freelancer who disappears. You're getting someone who cares about whether the thing actually works.
                </p>
                <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                  <a href="mailto:shahir42881@gmail.com" style={{ fontSize: 13, color: '#c8b896', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    shahir42881@gmail.com
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 11, height: 11 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13L13 3m0 0H6m7 0v7" />
                    </svg>
                  </a>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── CTA / CONTACT ─────────────────────────────────────────────────────── */}
      <section id="contact" style={{ padding: '96px 0', background: 'rgba(200,184,150,0.03)', borderTop: '1px solid rgba(200,184,150,0.08)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <FadeUp>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(200,184,150,0.08)', border: '1px solid rgba(200,184,150,0.2)', borderRadius: 100, padding: '6px 16px', marginBottom: 32 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#c8b896', boxShadow: '0 0 8px rgba(200,184,150,0.6)' }} />
              <span style={{ fontSize: 12, color: '#c8b896', fontWeight: 500 }}>Open to new work</span>
            </div>
            <h2 style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 800, letterSpacing: '-2.5px', color: '#fafafa', lineHeight: 1.05, marginBottom: 20 }}>
              Ready to build something?
            </h2>
            <p style={{ fontSize: 17, color: '#71717a', lineHeight: 1.65, marginBottom: 40, maxWidth: 440, margin: '0 auto 40px' }}>
              Pick a service above, or email me directly and we'll figure out the right plan for you.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="mailto:shahir42881@gmail.com"
                style={{ background: '#c8b896', color: '#09090b', borderRadius: 10, padding: '14px 32px', fontSize: 15, fontWeight: 700, textDecoration: 'none', transition: 'background 0.2s, transform 0.15s', display: 'inline-block' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#a8936e'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#c8b896'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                Email Me
              </a>
              <a
                href="#services"
                onClick={e => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }) }}
                style={{ background: 'transparent', color: '#a1a1aa', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '14px 32px', fontSize: 15, fontWeight: 500, textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s', display: 'inline-block' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(200,184,150,0.3)'; e.currentTarget.style.color = '#fafafa' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#a1a1aa' }}
              >
                Browse Services
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '28px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 13, color: '#3f3f46' }}>© 2026 Ahmad Shahir Ahmadi · Minneapolis, MN</span>
          <a href="mailto:shahir42881@gmail.com" style={{ fontSize: 13, color: '#52525b', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#c8b896'}
            onMouseLeave={e => e.currentTarget.style.color = '#52525b'}
          >
            shahir42881@gmail.com
          </a>
        </div>
      </footer>
    </div>
  )
}
