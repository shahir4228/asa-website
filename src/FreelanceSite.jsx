import { useState, useRef, useEffect } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'

// ─── CSS keyframes & globals ──────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800;0,14..32,900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #09090b; color: #fafafa; font-family: 'Inter', -apple-system, sans-serif; overflow-x: hidden; }

  @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
  @keyframes pulse-ring { 0%,100% { opacity:.4; transform:scale(1) } 50% { opacity:.1; transform:scale(1.15) } }
  @keyframes float { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-10px) } }
  @keyframes border-spin { to { --border-angle: 360deg } }
  @keyframes shimmer { 0% { background-position: -200% center } 100% { background-position: 200% center } }
  @property --border-angle { syntax: '<angle>'; inherits: false; initial-value: 0deg; }

  .hire-container { max-width: 1160px; margin: 0 auto; padding: 0 40px; }
  .hire-section { padding: 100px 0; }
  .hire-label { display:block; font-size:11px; color:#c8b896; letter-spacing:3px; text-transform:uppercase; font-weight:600; margin-bottom:14px; }
  .hire-h2 { font-size:clamp(30px,4vw,44px); font-weight:800; letter-spacing:-1.8px; line-height:1.08; color:#fafafa; margin-bottom:14px; }
  .hire-sub { font-size:16px; color:#71717a; line-height:1.7; max-width:500px; }

  .services-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
  .work-grid     { display:grid; grid-template-columns:repeat(2,1fr); gap:16px; }
  .steps-grid    { display:grid; grid-template-columns:repeat(3,1fr); gap:48px; }
  .about-grid    { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; }
  .stats-row     { display:flex; }

  @media(max-width:1024px) { .services-grid{grid-template-columns:repeat(2,1fr)} }
  @media(max-width:768px) {
    .hire-container { padding:0 20px }
    .hire-section   { padding:72px 0 }
    .services-grid,.work-grid,.steps-grid,.about-grid { grid-template-columns:1fr; gap:24px }
    .stats-row { flex-wrap:wrap }
    .nav-links-desktop { display:none !important }
    .nav-mobile-toggle { display:flex !important }
  }
`

// ─── Tokens ───────────────────────────────────────────────────────────────────
const T = {
  gold:    '#c8b896',
  goldDim: 'rgba(200,184,150,0.12)',
  goldBorder: 'rgba(200,184,150,0.2)',
  bg:      '#09090b',
  surface: 'rgba(255,255,255,0.03)',
  surface2:'rgba(255,255,255,0.06)',
  border:  'rgba(255,255,255,0.07)',
  text:    '#fafafa',
  text2:   '#a1a1aa',
  text3:   '#52525b',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1]

function FadeUp({ children, delay = 0, className, style }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} className={className} style={style}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease }}
    >{children}</motion.div>
  )
}

function Counter({ to, suffix = '', prefix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const val = useMotionValue(0)
  const rounded = useTransform(val, v => Math.round(v))
  const [display, setDisplay] = useState('0')
  useEffect(() => {
    if (!inView) return
    const ctrl = animate(val, to, { duration: 1.6, ease: 'easeOut' })
    const unsub = rounded.on('change', v => setDisplay(String(v)))
    return () => { ctrl.stop(); unsub() }
  }, [inView])
  return <span ref={ref}>{prefix}{display}{suffix}</span>
}

// ─── Marquee strip ────────────────────────────────────────────────────────────
const MARQUEE_ITEMS = [
  'React','JavaScript','HTML & CSS','Netlify','Framer Motion','GSAP',
  'Fast Delivery','Real Clients','8 Sites Shipped','Harvard Summer School',
  'Borlaug Scholar','Responsive Design','SEO Ready','Clean Code',
]

function MarqueeStrip() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  return (
    <div style={{ overflow:'hidden', borderTop:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}`, background: T.surface, padding:'14px 0', position:'relative' }}>
      <div style={{ display:'flex', gap:0, animation:'marquee 28s linear infinite', width:'max-content' }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ display:'inline-flex', alignItems:'center', gap:24, padding:'0 24px', whiteSpace:'nowrap', fontSize:13, color:T.text3, fontWeight:500, letterSpacing:'0.3px' }}>
            {item}
            <span style={{ width:4, height:4, borderRadius:'50%', background:T.gold, opacity:0.4, flexShrink:0 }} />
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Service card ─────────────────────────────────────────────────────────────
function ServiceCard({ s, index }) {
  const [hov, setHov] = useState(false)
  const mail = `mailto:shahir42881@gmail.com?subject=${encodeURIComponent(`Website Inquiry — ${s.name}`)}&body=${encodeURIComponent(`Hi Ahmad,\n\nI'm interested in the ${s.name} (${s.price}, ${s.time}).\n\nHere's a bit about my project:\n\n`)}`

  return (
    <FadeUp delay={index * 0.07}>
      <motion.div
        onHoverStart={() => setHov(true)}
        onHoverEnd={() => setHov(false)}
        animate={{ y: hov ? -5 : 0, scale: hov ? 1.01 : 1 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        style={{
          position:'relative', borderRadius:18,
          background: s.featured ? 'linear-gradient(135deg, rgba(200,184,150,0.07) 0%, rgba(255,255,255,0.03) 100%)' : T.surface,
          border: `1px solid ${hov ? (s.featured ? 'rgba(200,184,150,0.45)' : 'rgba(200,184,150,0.22)') : (s.featured ? 'rgba(200,184,150,0.22)' : T.border)}`,
          backdropFilter:'blur(16px)',
          boxShadow: hov ? `0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px ${T.goldBorder}, inset 0 1px 0 rgba(255,255,255,0.06)` : '0 2px 16px rgba(0,0,0,0.2)',
          padding:'28px',
          transition:'border 0.25s, box-shadow 0.25s, background 0.25s',
          height:'100%', display:'flex', flexDirection:'column',
        }}
      >
        {/* Featured glow blob */}
        {s.featured && (
          <div style={{ position:'absolute', top:-40, right:-40, width:200, height:200, borderRadius:'50%', background:'radial-gradient(circle, rgba(200,184,150,0.08) 0%, transparent 70%)', pointerEvents:'none', transition:'opacity 0.3s', opacity: hov ? 1 : 0.5 }} />
        )}

        {/* Badge */}
        {s.badge && (
          <div style={{ position:'absolute', top:-11, left:20, background:'linear-gradient(90deg,#c8b896,#a8936e)', color:'#09090b', fontSize:10, fontWeight:800, letterSpacing:'1px', textTransform:'uppercase', padding:'4px 14px', borderRadius:100 }}>
            {s.badge}
          </div>
        )}

        {/* Icon */}
        <div style={{ width:42, height:42, borderRadius:10, background: hov ? T.goldDim : 'rgba(255,255,255,0.04)', border:`1px solid ${hov ? T.goldBorder : T.border}`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:20, transition:'all 0.25s', color: hov ? T.gold : T.text3 }}>
          {s.icon}
        </div>

        <h3 style={{ fontSize:17, fontWeight:700, color:T.text, marginBottom:8, letterSpacing:'-0.3px' }}>{s.name}</h3>
        <p style={{ fontSize:13, color:T.text3, lineHeight:1.7, marginBottom:22, flex:1 }}>{s.desc}</p>

        {/* Features */}
        <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:7, marginBottom:26 }}>
          {s.features.map(f => (
            <li key={f} style={{ display:'flex', alignItems:'center', gap:9, fontSize:13, color:T.text2 }}>
              <svg viewBox="0 0 12 12" fill="none" stroke={T.gold} strokeWidth="1.8" style={{ width:12, height:12, flexShrink:0 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M1.5 6.5l2.5 2.5 6-6" />
              </svg>
              {f}
            </li>
          ))}
        </ul>

        {/* Price + CTA */}
        <div style={{ paddingTop:22, borderTop:`1px solid ${T.border}` }}>
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:38, fontWeight:800, letterSpacing:'-2px', color:T.gold, lineHeight:1 }}>{s.price}</div>
            <div style={{ fontSize:12, color:T.text3, marginTop:5 }}>{s.time} turnaround</div>
          </div>
          <motion.a
            href={mail}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              display:'flex', alignItems:'center', justifyContent:'center', gap:6,
              padding:'12px 0', borderRadius:10, fontSize:14, fontWeight:600, textDecoration:'none',
              background: s.featured ? T.gold : 'transparent',
              color: s.featured ? '#09090b' : T.gold,
              border: s.featured ? 'none' : `1px solid ${T.goldBorder}`,
              transition:'background 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = s.featured ? '#a8936e' : T.goldDim }}
            onMouseLeave={e => { e.currentTarget.style.background = s.featured ? T.gold : 'transparent' }}
          >
            Get Started
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width:13, height:13 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10m-4-4l4 4-4 4" />
            </svg>
          </motion.a>
        </div>
      </motion.div>
    </FadeUp>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const iconStroke = { fill:'none', stroke:'currentColor', strokeWidth:'1.5', viewBox:'0 0 24 24' }

const SERVICES = [
  {
    icon: <svg {...iconStroke} className="w-5 h-5" style={{width:20,height:20}}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253"/></svg>,
    name:'Landing Page', price:'$150', time:'3–5 days', featured:false,
    desc:'A clean, fast one-pager built to convert. Perfect for launches, events, or simple businesses.',
    features:['Responsive design','Contact form','SEO ready','Deployed live'],
  },
  {
    icon: <svg {...iconStroke} style={{width:20,height:20}}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"/></svg>,
    name:'Business Website', price:'$300', time:'1–2 weeks', featured:false,
    desc:'Full multi-page site for restaurants, shops, or service businesses. Menu, gallery, contact.',
    features:['5+ pages','Gallery & menu','Google Maps','Mobile-first'],
  },
  {
    icon: <svg {...iconStroke} style={{width:20,height:20}}><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
    name:'Portfolio Site', price:'$200', time:'5–7 days', featured:true, badge:'Most Popular',
    desc:'A personal site that makes you look like a pro. For creatives, students, and freelancers.',
    features:['Custom design','Projects showcase','About & contact','Animations'],
  },
  {
    icon: <svg {...iconStroke} style={{width:20,height:20}}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"/></svg>,
    name:'React Web App', price:'$500', time:'2–4 weeks', featured:false,
    desc:'A real interactive app — dashboards, tools, quizzes. Built in React and deployed live.',
    features:['React + hooks','Custom logic','API integration','Deployed'],
  },
  {
    icon: <svg {...iconStroke} style={{width:20,height:20}}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/></svg>,
    name:'E-commerce Store', price:'$450', time:'2–3 weeks', featured:false,
    desc:'A store people can actually buy from. Product pages, cart, checkout — built to sell.',
    features:['Product catalog','Cart & checkout','Payment ready','Admin panel'],
  },
]

const STEPS = [
  { num:'01', title:'We Chat', desc:"Tell me what you need. I'll ask a few questions, figure out the right fit, and send you a clear quote. No fluff." },
  { num:'02', title:'I Build', desc:"I get to work. You'll get progress updates. No disappearing — I'm reachable the whole time." },
  { num:'03', title:'Goes Live', desc:"I deploy it, set up the domain, hand it off. You walk away with something real and working." },
]

const PROJECTS = [
  { title:'Zaffron Kitchen', desc:'Full restaurant website — menu, branding, contact. Built for a real client. Actual people use it daily.', tags:['React','Client Work'], link:null, accent:'#c8b896' },
  { title:'U.S. Citizenship Quiz', desc:'React app helping people study for the citizenship test. Simple, clean, deployed.', tags:['React','App'], link:'https://stupendous-kashata-8764aa.netlify.app/', accent:'#6ee7b7' },
  { title:'Eid Mubarak Card', desc:'Animated greeting card in React. Made for family, published online. Most shared project I have.', tags:['React','Animation'], link:'https://vocal-torte-894817.netlify.app/', accent:'#a78bfa' },
  { title:'Car Design Showcase', desc:'Design-focused site built to push CSS limits. Dark aesthetic, clean layout, zero frameworks.', tags:['HTML','CSS','Design'], link:'https://eloquent-gumdrop-c5a60a.netlify.app/', accent:'#fb923c' },
]

const STATS = [
  { to:8,  suffix:'',  label:'Sites Shipped' },
  { to:4,  suffix:'×', label:'Honor Roll' },
  { to:3,  suffix:'',  label:'Real Clients' },
  { to:4,  suffix:'',  label:'Languages Spoken' },
]

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false)
  const go = id => { setOpen(false); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' }), 80) }
  const links = [['About','about'],['Services','services'],['Work','work'],['Process','process']]
  return (
    <nav style={{ position:'sticky', top:0, zIndex:200, background:'rgba(9,9,11,0.8)', backdropFilter:'blur(20px) saturate(180%)', borderBottom:`1px solid ${T.border}` }}>
      <div className="hire-container" style={{ height:60, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span style={{ fontSize:17, fontWeight:800, letterSpacing:'-0.5px', color:T.gold }}>ASA</span>
        <div className="nav-links-desktop" style={{ display:'flex', gap:28, alignItems:'center' }}>
          {links.map(([l,id]) => (
            <button key={id} onClick={() => go(id)} style={{ background:'none', border:'none', color:T.text3, fontSize:13, fontWeight:500, cursor:'pointer', letterSpacing:'0.2px', transition:'color .2s' }}
              onMouseEnter={e=>e.target.style.color=T.text} onMouseLeave={e=>e.target.style.color=T.text3}>{l}</button>
          ))}
          <motion.button onClick={() => go('contact')} whileHover={{ scale:1.03 }} whileTap={{ scale:.97 }}
            style={{ background:T.gold, color:'#09090b', border:'none', borderRadius:8, padding:'8px 18px', fontSize:13, fontWeight:700, cursor:'pointer' }}>
            Let's Talk
          </motion.button>
        </div>
        <button className="nav-mobile-toggle" onClick={() => setOpen(!open)} style={{ display:'none', background:'none', border:'none', color:T.text2, cursor:'pointer' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width:22, height:22 }}>
            {open ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/> : <path strokeLinecap="round" d="M3 12h18M3 6h18M3 18h18"/>}
          </svg>
        </button>
      </div>
      {open && (
        <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} style={{ borderTop:`1px solid ${T.border}`, background:'rgba(9,9,11,0.97)', padding:'16px 20px 24px' }}>
          {links.map(([l,id]) => <button key={id} onClick={() => go(id)} style={{ display:'block', width:'100%', textAlign:'left', background:'none', border:'none', color:T.text2, fontSize:16, padding:'12px 0', cursor:'pointer', borderBottom:`1px solid ${T.border}` }}>{l}</button>)}
          <button onClick={() => go('contact')} style={{ marginTop:16, background:T.gold, color:'#09090b', border:'none', borderRadius:8, padding:'12px 0', fontSize:14, fontWeight:700, cursor:'pointer', width:'100%' }}>Let's Talk</button>
        </motion.div>
      )}
    </nav>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function FreelanceSite() {
  return (
    <div style={{ minHeight:'100vh', background:T.bg }}>
      <style>{GLOBAL_CSS}</style>
      <Nav />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section style={{ minHeight:'92vh', display:'flex', alignItems:'center', position:'relative', overflow:'hidden', padding:'80px 0 60px' }}>

        {/* Dot grid background */}
        <div style={{ position:'absolute', inset:0, backgroundImage:`radial-gradient(circle, rgba(200,184,150,0.12) 1px, transparent 1px)`, backgroundSize:'32px 32px', opacity:.6, pointerEvents:'none' }} />

        {/* Gradient orbs */}
        <div style={{ position:'absolute', top:-200, left:'15%', width:700, height:700, borderRadius:'50%', background:'radial-gradient(circle, rgba(200,184,150,0.055) 0%, transparent 65%)', filter:'blur(40px)', pointerEvents:'none', animation:'float 8s ease-in-out infinite' }} />
        <div style={{ position:'absolute', bottom:-100, right:'5%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 65%)', filter:'blur(50px)', pointerEvents:'none', animation:'float 11s ease-in-out infinite reverse' }} />

        {/* Edge fade */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:120, background:`linear-gradient(to bottom, transparent, ${T.bg})`, pointerEvents:'none' }} />

        <div className="hire-container" style={{ position:'relative', width:'100%' }}>
          {/* Availability badge */}
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:.6, ease }}
            style={{ display:'inline-flex', alignItems:'center', gap:8, background:T.goldDim, border:`1px solid ${T.goldBorder}`, borderRadius:100, padding:'7px 18px', marginBottom:36 }}>
            <span style={{ width:7, height:7, borderRadius:'50%', background:T.gold, boxShadow:`0 0 10px ${T.gold}`, animation:'pulse-ring 2s ease-in-out infinite' }} />
            <span style={{ fontSize:12, color:T.gold, fontWeight:600, letterSpacing:'0.4px' }}>Available for new projects</span>
          </motion.div>

          {/* Headline — word-by-word reveal */}
          <div style={{ overflow:'hidden', marginBottom:8 }}>
            {['I build websites', 'people', 'actually use.'].map((word, wi) => (
              <motion.div key={wi}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: .75, delay: .1 + wi * .12, ease }}
                style={{ display:'block', fontSize:'clamp(52px, 8vw, 104px)', fontWeight:900, letterSpacing:'-4px', lineHeight:1.0, color: wi === 1 ? T.gold : T.text }}
              >{word}</motion.div>
            ))}
          </div>

          {/* Sub */}
          <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:.65, delay:.45, ease }}
            style={{ fontSize:18, color:T.text3, lineHeight:1.7, maxWidth:460, marginBottom:44, marginTop:20 }}>
            Ahmad Shahir — developer from Minneapolis. I've shipped real sites for real clients. Pick your project below and let's build something.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:.6, delay:.55, ease }}
            style={{ display:'flex', gap:12, flexWrap:'wrap', alignItems:'center' }}>
            <motion.a whileHover={{ scale:1.03, y:-2 }} whileTap={{ scale:.97 }}
              href="#services" onClick={e=>{ e.preventDefault(); document.getElementById('services')?.scrollIntoView({behavior:'smooth'}) }}
              style={{ background:T.gold, color:'#09090b', borderRadius:10, padding:'15px 32px', fontSize:15, fontWeight:800, textDecoration:'none', display:'inline-flex', alignItems:'center', gap:8, letterSpacing:'-0.2px' }}>
              See Pricing
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" style={{ width:14, height:14 }}>
                <path strokeLinecap="round" d="M3 8h10m-4-4l4 4-4 4"/>
              </svg>
            </motion.a>
            <motion.a whileHover={{ scale:1.02 }} whileTap={{ scale:.97 }}
              href="mailto:shahir42881@gmail.com"
              style={{ background:'transparent', color:T.text2, border:`1px solid ${T.border}`, borderRadius:10, padding:'15px 32px', fontSize:15, fontWeight:500, textDecoration:'none', transition:'border-color .2s, color .2s', display:'inline-block' }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor=T.goldBorder; e.currentTarget.style.color=T.text }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor=T.border; e.currentTarget.style.color=T.text2 }}>
              Email Me
            </motion.a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.2, duration:.8 }}
            style={{ position:'absolute', bottom:-40, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
            <div style={{ width:1, height:40, background:`linear-gradient(to bottom, ${T.goldBorder}, transparent)`, animation:'float 2s ease-in-out infinite' }} />
          </motion.div>
        </div>
      </section>

      {/* ── MARQUEE ─────────────────────────────────────────────────────────── */}
      <MarqueeStrip />

      {/* ── STATS ───────────────────────────────────────────────────────────── */}
      <div style={{ background:T.surface, borderBottom:`1px solid ${T.border}` }}>
        <div className="hire-container">
          <div className="stats-row">
            {STATS.map((s, i) => (
              <FadeUp key={s.label} delay={i * .08}
                style={{ flex:1, minWidth:120, padding:'36px 0', borderRight: i < STATS.length-1 ? `1px solid ${T.border}` : 'none', paddingRight:40, marginRight:40 }}>
                <div style={{ fontSize:44, fontWeight:900, letterSpacing:'-3px', color:T.gold, lineHeight:1, fontVariantNumeric:'tabular-nums' }}>
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <div style={{ fontSize:13, color:T.text3, marginTop:6, fontWeight:500 }}>{s.label}</div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      {/* ── SERVICES ────────────────────────────────────────────────────────── */}
      <section className="hire-section" id="services">
        <div className="hire-container">
          <FadeUp>
            <span className="hire-label">Services & Pricing</span>
            <h2 className="hire-h2">Pick your project.</h2>
            <p className="hire-sub" style={{ marginBottom:56 }}>
              Every price includes design, development, and deployment. No hidden fees. No surprises.
            </p>
          </FadeUp>

          <div className="services-grid">
            {SERVICES.map((s, i) => <ServiceCard key={s.name} s={s} index={i} />)}
          </div>

          {/* Custom note */}
          <FadeUp delay={.3}>
            <div style={{ marginTop:24, padding:'18px 22px', background:T.goldDim, border:`1px solid ${T.goldBorder}`, borderRadius:12, display:'flex', alignItems:'center', gap:12 }}>
              <svg viewBox="0 0 20 20" fill={T.gold} style={{ width:16, height:16, flexShrink:0 }}>
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd"/>
              </svg>
              <p style={{ fontSize:13, color:T.text2, lineHeight:1.6 }}>
                Not sure which fits? Email <a href="mailto:shahir42881@gmail.com" style={{ color:T.gold, textDecoration:'none' }}>shahir42881@gmail.com</a> and we'll figure it out. Custom quotes available.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── PROCESS ─────────────────────────────────────────────────────────── */}
      <section className="hire-section" id="process" style={{ background:T.surface, borderTop:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}` }}>
        <div className="hire-container">
          <FadeUp>
            <span className="hire-label">How It Works</span>
            <h2 className="hire-h2">Simple. Fast. Real.</h2>
            <p className="hire-sub" style={{ marginBottom:60 }}>No overcomplicated workflows. Here's exactly what happens.</p>
          </FadeUp>
          <div className="steps-grid">
            {STEPS.map((step, i) => (
              <FadeUp key={step.num} delay={i * .1}>
                <div style={{ position:'relative' }}>
                  {/* Connector line (desktop only) */}
                  {i < STEPS.length - 1 && (
                    <div style={{ position:'absolute', top:28, left:'calc(100% + 24px)', width:'calc(100% - 48px)', height:1, background:`linear-gradient(to right, ${T.goldBorder}, transparent)` }} />
                  )}
                  <div style={{ fontSize:64, fontWeight:900, letterSpacing:'-4px', color:'rgba(200,184,150,0.1)', lineHeight:1, marginBottom:16, fontVariantNumeric:'tabular-nums' }}>{step.num}</div>
                  <h3 style={{ fontSize:19, fontWeight:700, color:T.text, marginBottom:10, letterSpacing:'-0.3px' }}>{step.title}</h3>
                  <p style={{ fontSize:14, color:T.text3, lineHeight:1.75 }}>{step.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORK ────────────────────────────────────────────────────────────── */}
      <section className="hire-section" id="work">
        <div className="hire-container">
          <FadeUp>
            <span className="hire-label">Past Work</span>
            <h2 className="hire-h2">Stuff I've shipped.</h2>
            <p className="hire-sub" style={{ marginBottom:52 }}>Not mockups. Not demos. Real projects that are live right now.</p>
          </FadeUp>
          <div className="work-grid">
            {PROJECTS.map((p, i) => (
              <FadeUp key={p.title} delay={i * .08}>
                <motion.div
                  whileHover={{ y:-4, scale:1.01 }}
                  transition={{ duration:.25, ease:'easeOut' }}
                  style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:16, padding:'28px', height:'100%', display:'flex', flexDirection:'column', cursor: p.link ? 'pointer' : 'default', transition:'border-color .2s, background .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=`${p.accent}33`; e.currentTarget.style.background=T.surface2 }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor=T.border; e.currentTarget.style.background=T.surface }}
                >
                  {/* Accent bar */}
                  <div style={{ width:32, height:3, borderRadius:2, background:p.accent, marginBottom:20, opacity:.7 }} />

                  <div style={{ display:'flex', gap:7, marginBottom:16, flexWrap:'wrap' }}>
                    {p.tags.map(t => (
                      <span key={t} style={{ fontSize:11, fontWeight:600, padding:'3px 9px', borderRadius:5, background:'rgba(255,255,255,0.04)', color:T.text3, border:`1px solid ${T.border}`, letterSpacing:'0.3px' }}>{t}</span>
                    ))}
                  </div>
                  <h3 style={{ fontSize:18, fontWeight:700, color:T.text, marginBottom:10, letterSpacing:'-0.4px' }}>{p.title}</h3>
                  <p style={{ fontSize:14, color:T.text3, lineHeight:1.7, flex:1, marginBottom:22 }}>{p.desc}</p>
                  {p.link ? (
                    <a href={p.link} target="_blank" rel="noopener noreferrer"
                      style={{ fontSize:13, color:p.accent, textDecoration:'none', display:'inline-flex', alignItems:'center', gap:6, fontWeight:600, opacity:.85, transition:'opacity .2s' }}
                      onMouseEnter={e=>e.currentTarget.style.opacity='1'} onMouseLeave={e=>e.currentTarget.style.opacity='.85'}>
                      View Live
                      <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width:11, height:11 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2 12L12 2m0 0H5m7 0v7"/>
                      </svg>
                    </a>
                  ) : (
                    <span style={{ fontSize:12, color:T.text3 }}>Private client project</span>
                  )}
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────────────────────────── */}
      <section className="hire-section" id="about" style={{ borderTop:`1px solid ${T.border}` }}>
        <div className="hire-container">
          <div className="about-grid">
            <FadeUp>
              <span className="hire-label">About Me</span>
              <h2 className="hire-h2">The person building your site.</h2>
              <p style={{ fontSize:14, color:T.text3, marginTop:12, lineHeight:1.8 }}>
                <strong style={{ color:T.gold, fontWeight:600 }}>Ahmad Shahir Ahmadi</strong> — 16, Minneapolis, originally Afghanistan. I build websites because I like making real things, not just studying them.
              </p>
            </FadeUp>
            <FadeUp delay={.12}>
              <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
                {[
                  ['8 real sites shipped','Not demos — deployed, live, and used by actual people.'],
                  ['Harvard Summer School 2026','Competitively selected. Heading to campus this summer.'],
                  ['Borlaug Scholar 2026','Named by the World Food Prize Foundation for research on food insecurity in Afghanistan.'],
                  ['Honor Roll × 4','Brooklyn Center High School. Consistent. Reliable. The same way I build.'],
                ].map(([title, desc]) => (
                  <div key={title} style={{ display:'flex', gap:16, alignItems:'flex-start' }}>
                    <div style={{ width:7, height:7, borderRadius:'50%', background:T.gold, marginTop:7, flexShrink:0, opacity:.7 }} />
                    <div>
                      <div style={{ fontSize:14, fontWeight:600, color:T.text, marginBottom:3 }}>{title}</div>
                      <div style={{ fontSize:13, color:T.text3, lineHeight:1.65 }}>{desc}</div>
                    </div>
                  </div>
                ))}
                <a href="mailto:shahir42881@gmail.com" style={{ marginTop:8, display:'inline-flex', alignItems:'center', gap:7, fontSize:14, color:T.gold, textDecoration:'none', fontWeight:600, opacity:.85, transition:'opacity .2s' }}
                  onMouseEnter={e=>e.currentTarget.style.opacity='1'} onMouseLeave={e=>e.currentTarget.style.opacity='.85'}>
                  shahir42881@gmail.com
                  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width:12, height:12 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 12L12 2m0 0H5m7 0v7"/>
                  </svg>
                </a>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section id="contact" style={{ position:'relative', overflow:'hidden', padding:'100px 0', borderTop:`1px solid ${T.goldBorder}`, background:'radial-gradient(ellipse at 50% 100%, rgba(200,184,150,0.06) 0%, transparent 70%)' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:`radial-gradient(circle, rgba(200,184,150,0.08) 1px, transparent 1px)`, backgroundSize:'32px 32px', opacity:.4, pointerEvents:'none' }} />
        <div className="hire-container" style={{ textAlign:'center', position:'relative' }}>
          <FadeUp>
            <motion.div whileHover={{ scale:1.02 }} style={{ display:'inline-flex', alignItems:'center', gap:8, background:T.goldDim, border:`1px solid ${T.goldBorder}`, borderRadius:100, padding:'7px 18px', marginBottom:28 }}>
              <span style={{ width:7, height:7, borderRadius:'50%', background:T.gold, boxShadow:`0 0 10px ${T.gold}`, animation:'pulse-ring 2s ease-in-out infinite' }} />
              <span style={{ fontSize:12, color:T.gold, fontWeight:600 }}>Open to new work right now</span>
            </motion.div>
            <h2 style={{ fontSize:'clamp(38px,6vw,68px)', fontWeight:900, letterSpacing:'-3px', color:T.text, lineHeight:1.05, marginBottom:20 }}>
              Ready to build<br />
              <span style={{ color:T.gold }}>something real?</span>
            </h2>
            <p style={{ fontSize:17, color:T.text3, maxWidth:420, margin:'0 auto 44px', lineHeight:1.7 }}>
              Pick a service above, or email me directly. I'll get back to you same day.
            </p>
            <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
              <motion.a whileHover={{ scale:1.04, y:-2 }} whileTap={{ scale:.97 }}
                href="mailto:shahir42881@gmail.com"
                style={{ background:T.gold, color:'#09090b', borderRadius:10, padding:'15px 36px', fontSize:16, fontWeight:800, textDecoration:'none', display:'inline-flex', alignItems:'center', gap:8, letterSpacing:'-0.2px' }}>
                Email Me
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" style={{ width:14, height:14 }}>
                  <path strokeLinecap="round" d="M3 8h10m-4-4l4 4-4 4"/>
                </svg>
              </motion.a>
              <motion.a whileHover={{ scale:1.02 }} whileTap={{ scale:.97 }}
                href="#services" onClick={e=>{ e.preventDefault(); document.getElementById('services')?.scrollIntoView({behavior:'smooth'}) }}
                style={{ background:'transparent', color:T.text2, border:`1px solid ${T.border}`, borderRadius:10, padding:'15px 36px', fontSize:16, fontWeight:500, textDecoration:'none', transition:'border-color .2s, color .2s', display:'inline-block' }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor=T.goldBorder; e.currentTarget.style.color=T.text }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor=T.border; e.currentTarget.style.color=T.text2 }}>
                Browse Services
              </motion.a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer style={{ borderTop:`1px solid ${T.border}`, padding:'26px 0' }}>
        <div className="hire-container" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
          <span style={{ fontSize:13, color:T.text3 }}>© 2026 Ahmad Shahir Ahmadi · Minneapolis, MN</span>
          <a href="mailto:shahir42881@gmail.com" style={{ fontSize:13, color:T.text3, textDecoration:'none', transition:'color .2s' }}
            onMouseEnter={e=>e.currentTarget.style.color=T.gold} onMouseLeave={e=>e.currentTarget.style.color=T.text3}>
            shahir42881@gmail.com
          </a>
        </div>
      </footer>
    </div>
  )
}
