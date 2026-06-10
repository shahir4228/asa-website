import { useState, useCallback, useRef } from 'react'
import { AnimatedText } from './components/ui/animated-underline-text-one'
import { ElegantShape } from './components/ui/shape-landing-hero'

// ─── ID helper ────────────────────────────────────────────────────────────────
let _n = 0
const uid = () => `b${++_n}`

// ─── Block registry ───────────────────────────────────────────────────────────
const BLOCKS = [
  // ── Layout ──────────────────────────────────────────────────────────────────
  {
    type: 'section',
    label: 'Section',
    cat: 'Layout',
    icon: '▭',
    defaults: { bg: '#09090b', py: 'py-24', align: 'items-center', px: 'px-8' },
    controls: [
      { key: 'bg',    label: 'Background', type: 'color' },
      { key: 'py',    label: 'Padding Y',  type: 'select', opts: ['py-8','py-16','py-24','py-32','py-40','py-48','min-h-screen'] },
      { key: 'px',    label: 'Padding X',  type: 'select', opts: ['px-4','px-8','px-12','px-16','px-24'] },
      { key: 'align', label: 'Align',      type: 'select', opts: ['items-start','items-center','items-end'] },
    ],
    render: (p) => (
      <section className={`w-full flex flex-col ${p.align} justify-center text-center ${p.py} ${p.px}`} style={{ background: p.bg }}>
        <span className="text-zinc-600 text-xs tracking-widest uppercase pointer-events-none">Section Container</span>
      </section>
    ),
    code: (p) => `<section className="w-full flex flex-col ${p.align} justify-center text-center ${p.py} ${p.px}" style={{ background: '${p.bg}' }}>`,
  },
  {
    type: 'spacer',
    label: 'Spacer',
    cat: 'Layout',
    icon: '↕',
    defaults: { h: 'h-16' },
    controls: [
      { key: 'h', label: 'Height', type: 'select', opts: ['h-4','h-8','h-12','h-16','h-24','h-32','h-40','h-48','h-64'] },
    ],
    render: (p) => (
      <div className={`${p.h} w-full flex items-center justify-center`}>
        <span className="text-zinc-700 text-xs">{p.h}</span>
      </div>
    ),
    code: (p) => `<div className="${p.h} w-full" />`,
  },
  {
    type: 'divider',
    label: 'Divider',
    cat: 'Layout',
    icon: '—',
    defaults: { color: '#27272a', my: 'my-8', w: 'w-full' },
    controls: [
      { key: 'color', label: 'Color',    type: 'color' },
      { key: 'my',    label: 'Margin Y', type: 'select', opts: ['my-2','my-4','my-8','my-12','my-16'] },
      { key: 'w',     label: 'Width',    type: 'select', opts: ['w-16','w-32','w-48','w-64','w-full'] },
    ],
    render: (p) => <hr className={`${p.my} ${p.w} mx-auto border-0 h-px`} style={{ background: p.color }} />,
    code:   (p) => `<hr className="${p.my} ${p.w} mx-auto border-0 h-px" style={{ background: '${p.color}' }} />`,
  },

  // ── Typography ───────────────────────────────────────────────────────────────
  {
    type: 'heading',
    label: 'Heading',
    cat: 'Text',
    icon: 'H',
    defaults: { text: 'Your Heading', tag: 'h1', size: 'text-5xl', weight: 'font-bold', color: '#ffffff', align: 'text-center', mt: 'mt-0' },
    controls: [
      { key: 'text',   label: 'Text',   type: 'text' },
      { key: 'tag',    label: 'Tag',    type: 'select', opts: ['h1','h2','h3','h4','h5','h6'] },
      { key: 'size',   label: 'Size',   type: 'select', opts: ['text-lg','text-xl','text-2xl','text-3xl','text-4xl','text-5xl','text-6xl','text-7xl','text-8xl','text-9xl'] },
      { key: 'weight', label: 'Weight', type: 'select', opts: ['font-light','font-normal','font-medium','font-semibold','font-bold','font-extrabold','font-black'] },
      { key: 'color',  label: 'Color',  type: 'color' },
      { key: 'align',  label: 'Align',  type: 'select', opts: ['text-left','text-center','text-right'] },
      { key: 'mt',     label: 'Margin Top', type: 'select', opts: ['mt-0','mt-2','mt-4','mt-6','mt-8','mt-12','mt-16','mt-20'] },
    ],
    render: ({ text, tag: Tag, size, weight, color, align, mt }) => (
      <Tag className={`${size} ${weight} ${align} ${mt} leading-tight`} style={{ color }}>{text}</Tag>
    ),
    code: ({ text, tag, size, weight, color, align, mt }) =>
      `<${tag} className="${[size, weight, align, mt, 'leading-tight'].join(' ')}" style={{ color: '${color}' }}>${text}</${tag}>`,
  },
  {
    type: 'paragraph',
    label: 'Paragraph',
    cat: 'Text',
    icon: 'P',
    defaults: { text: 'Your paragraph text goes here. Describe your idea, product, or story.', size: 'text-lg', color: '#a1a1aa', align: 'text-center', maxW: 'max-w-2xl', mt: 'mt-4' },
    controls: [
      { key: 'text',  label: 'Text',      type: 'textarea' },
      { key: 'size',  label: 'Size',      type: 'select', opts: ['text-sm','text-base','text-lg','text-xl','text-2xl'] },
      { key: 'color', label: 'Color',     type: 'color' },
      { key: 'align', label: 'Align',     type: 'select', opts: ['text-left','text-center','text-right'] },
      { key: 'maxW',  label: 'Max Width', type: 'select', opts: ['max-w-xs','max-w-sm','max-w-md','max-w-lg','max-w-xl','max-w-2xl','max-w-3xl','max-w-4xl','max-w-full'] },
      { key: 'mt',    label: 'Margin Top',type: 'select', opts: ['mt-0','mt-2','mt-4','mt-6','mt-8','mt-12'] },
    ],
    render: ({ text, size, color, align, maxW, mt }) => (
      <p className={`${size} ${align} ${maxW} ${mt} mx-auto leading-relaxed`} style={{ color }}>{text}</p>
    ),
    code: ({ text, size, color, align, maxW, mt }) =>
      `<p className="${[size, align, maxW, mt, 'mx-auto leading-relaxed'].join(' ')}" style={{ color: '${color}' }}>${text}</p>`,
  },
  {
    type: 'badge',
    label: 'Badge',
    cat: 'Text',
    icon: '⬡',
    defaults: { text: 'New', bg: '#18181b', color: '#a1a1aa', border: '#3f3f46', size: 'text-xs', mt: 'mt-0' },
    controls: [
      { key: 'text',   label: 'Text',         type: 'text' },
      { key: 'bg',     label: 'Background',   type: 'color' },
      { key: 'color',  label: 'Text Color',   type: 'color' },
      { key: 'border', label: 'Border Color', type: 'color' },
      { key: 'size',   label: 'Size',         type: 'select', opts: ['text-xs','text-sm','text-base'] },
      { key: 'mt',     label: 'Margin Top',   type: 'select', opts: ['mt-0','mt-2','mt-4','mt-6','mt-8'] },
    ],
    render: ({ text, bg, color, border, size, mt }) => (
      <span className={`inline-flex items-center px-3 py-1 rounded-full ${size} font-medium border ${mt}`} style={{ background: bg, color, borderColor: border }}>{text}</span>
    ),
    code: ({ text, bg, color, border, size, mt }) =>
      `<span className="inline-flex items-center px-3 py-1 rounded-full ${size} font-medium border ${mt}" style={{ background: '${bg}', color: '${color}', borderColor: '${border}' }}>${text}</span>`,
  },

  // ── Interactive ──────────────────────────────────────────────────────────────
  {
    type: 'button',
    label: 'Button',
    cat: 'Interactive',
    icon: '⬜',
    defaults: { text: 'Get Started', variant: 'filled', bg: '#ffffff', color: '#000000', pad: 'px-6 py-3', radius: 'rounded-lg', mt: 'mt-8' },
    controls: [
      { key: 'text',    label: 'Text',      type: 'text' },
      { key: 'variant', label: 'Variant',   type: 'select', opts: ['filled','outlined','ghost'] },
      { key: 'bg',      label: 'Color',     type: 'color' },
      { key: 'color',   label: 'Text',      type: 'color' },
      { key: 'pad',     label: 'Padding',   type: 'select', opts: ['px-4 py-2','px-6 py-3','px-8 py-4','px-10 py-5'] },
      { key: 'radius',  label: 'Radius',    type: 'select', opts: ['rounded','rounded-md','rounded-lg','rounded-xl','rounded-2xl','rounded-full'] },
      { key: 'mt',      label: 'Margin Top',type: 'select', opts: ['mt-0','mt-4','mt-6','mt-8','mt-12'] },
    ],
    render: ({ text, variant, bg, color, pad, radius, mt }) => {
      const s = variant === 'filled'
        ? { background: bg, color }
        : variant === 'outlined'
        ? { background: 'transparent', color: bg, border: `1.5px solid ${bg}` }
        : { background: 'transparent', color: bg }
      return <button className={`font-semibold cursor-pointer ${pad} ${radius} ${mt}`} style={s}>{text}</button>
    },
    code: ({ text, variant, bg, color, pad, radius, mt }) => {
      const s = variant === 'filled' ? `background:'${bg}',color:'${color}'`
        : variant === 'outlined' ? `background:'transparent',color:'${bg}',border:'1.5px solid ${bg}'`
        : `background:'transparent',color:'${bg}'`
      return `<button className="font-semibold ${pad} ${radius} ${mt}" style={{ ${s} }}>${text}</button>`
    },
  },
  {
    type: 'button-row',
    label: 'Button Row',
    cat: 'Interactive',
    icon: '⬜⬜',
    defaults: { primary: 'Get Started', secondary: 'Learn More', bg: '#ffffff', color: '#000000', gap: 'gap-4', mt: 'mt-8' },
    controls: [
      { key: 'primary',   label: 'Primary Text',   type: 'text' },
      { key: 'secondary', label: 'Secondary Text',  type: 'text' },
      { key: 'bg',        label: 'Primary Color',   type: 'color' },
      { key: 'color',     label: 'Primary Text',    type: 'color' },
      { key: 'gap',       label: 'Gap',             type: 'select', opts: ['gap-2','gap-4','gap-6','gap-8'] },
      { key: 'mt',        label: 'Margin Top',      type: 'select', opts: ['mt-0','mt-4','mt-6','mt-8','mt-12'] },
    ],
    render: ({ primary, secondary, bg, color, gap, mt }) => (
      <div className={`flex flex-wrap items-center justify-center ${gap} ${mt}`}>
        <button className="font-semibold px-6 py-3 rounded-lg cursor-pointer" style={{ background: bg, color }}>{primary}</button>
        <button className="font-semibold px-6 py-3 rounded-lg cursor-pointer" style={{ background: 'transparent', color: bg, border: `1.5px solid ${bg}` }}>{secondary}</button>
      </div>
    ),
    code: ({ primary, secondary, bg, color, gap, mt }) =>
      `<div className="flex flex-wrap items-center justify-center ${gap} ${mt}">
  <button className="font-semibold px-6 py-3 rounded-lg" style={{ background: '${bg}', color: '${color}' }}>${primary}</button>
  <button className="font-semibold px-6 py-3 rounded-lg" style={{ background: 'transparent', color: '${bg}', border: '1.5px solid ${bg}' }}>${secondary}</button>
</div>`,
  },

  // ── Media ────────────────────────────────────────────────────────────────────
  {
    type: 'image',
    label: 'Image',
    cat: 'Media',
    icon: '🖼',
    defaults: { src: '/favicon.svg', alt: 'Image', w: 'w-48', h: 'h-48', radius: 'rounded-2xl', fit: 'object-cover', mt: 'mt-0' },
    controls: [
      { key: 'src',    label: 'Source URL', type: 'text' },
      { key: 'alt',    label: 'Alt Text',   type: 'text' },
      { key: 'w',      label: 'Width',      type: 'select', opts: ['w-16','w-24','w-32','w-48','w-64','w-80','w-96','w-full'] },
      { key: 'h',      label: 'Height',     type: 'select', opts: ['h-16','h-24','h-32','h-48','h-64','h-80','h-96','h-auto'] },
      { key: 'radius', label: 'Radius',     type: 'select', opts: ['rounded-none','rounded','rounded-lg','rounded-2xl','rounded-full'] },
      { key: 'mt',     label: 'Margin Top', type: 'select', opts: ['mt-0','mt-4','mt-6','mt-8','mt-12'] },
    ],
    render: ({ src, alt, w, h, radius, fit, mt }) => (
      <img src={src} alt={alt} className={`${w} ${h} ${radius} ${fit} ${mt}`} />
    ),
    code: ({ src, alt, w, h, radius, fit, mt }) =>
      `<img src="${src}" alt="${alt}" className="${[w, h, radius, fit, mt].join(' ')}" />`,
  },

  // ── Custom ───────────────────────────────────────────────────────────────────
  {
    type: 'animated-text',
    label: 'AnimatedText',
    cat: 'Custom',
    icon: '✦',
    defaults: { text: 'Animated Heading', cls: 'text-4xl font-bold text-white', mt: 'mt-0' },
    controls: [
      { key: 'text', label: 'Text',        type: 'text' },
      { key: 'cls',  label: 'Classes',     type: 'text' },
      { key: 'mt',   label: 'Margin Top',  type: 'select', opts: ['mt-0','mt-4','mt-6','mt-8','mt-12'] },
    ],
    render: ({ text, cls, mt }) => (
      <div className={mt}>
        <AnimatedText text={text} className={cls} />
      </div>
    ),
    code: ({ text, cls, mt }) =>
      `<div className="${mt}">\n  <AnimatedText text="${text}" className="${cls}" />\n</div>`,
  },
  {
    type: 'elegant-shape',
    label: 'ElegantShape',
    cat: 'Custom',
    icon: '◆',
    defaults: { delay: 0.3, width: 400, height: 100, rotate: 12, gradient: 'from-indigo-500/[0.15]' },
    controls: [
      { key: 'delay',    label: 'Delay (s)',  type: 'number' },
      { key: 'width',    label: 'Width',      type: 'number' },
      { key: 'height',   label: 'Height',     type: 'number' },
      { key: 'rotate',   label: 'Rotate',     type: 'number' },
      { key: 'gradient', label: 'Gradient',   type: 'text' },
    ],
    render: (p) => (
      <div className="relative w-full h-32 overflow-hidden pointer-events-none">
        <ElegantShape {...p} className="absolute" />
      </div>
    ),
    code: ({ delay, width, height, rotate, gradient }) =>
      `<ElegantShape className="absolute" delay={${delay}} width={${width}} height={${height}} rotate={${rotate}} gradient="${gradient}" />`,
  },
]

const BY_TYPE = Object.fromEntries(BLOCKS.map(b => [b.type, b]))
const CATS    = [...new Set(BLOCKS.map(b => b.cat))]

// ─── Viewport presets ─────────────────────────────────────────────────────────
const VIEWPORTS = [
  { key: 'mobile',  label: 'Mobile',  w: 375 },
  { key: 'tablet',  label: 'Tablet',  w: 768 },
  { key: 'desktop', label: 'Desktop', w: '100%' },
]

// ─── Code generator ───────────────────────────────────────────────────────────
function generateCode(blocks, viewport) {
  const needsAnimatedText  = blocks.some(b => b.type === 'animated-text')
  const needsElegantShape  = blocks.some(b => b.type === 'elegant-shape')

  const imports = [
    needsAnimatedText && `import { AnimatedText } from './components/ui/animated-underline-text-one'`,
    needsElegantShape && `import { ElegantShape } from './components/ui/shape-landing-hero'`,
  ].filter(Boolean).join('\n')

  const body = blocks.map(b => {
    const def = BY_TYPE[b.type]
    if (!def) return ''
    return `  ${def.code(b.props)}`
  }).join('\n')

  return [
    `// Design Lab export — viewport: ${viewport}`,
    `// ${blocks.length} block${blocks.length !== 1 ? 's' : ''}`,
    '',
    imports,
    '',
    `export default function DesignedSection() {`,
    `  return (`,
    `    <div className="flex flex-col items-center w-full">`,
    body,
    `    </div>`,
    `  )`,
    `}`,
  ].filter(l => l !== null).join('\n')
}

// ─── Palette item ─────────────────────────────────────────────────────────────
function PaletteItem({ def, onAdd }) {
  const onDragStart = (e) => {
    e.dataTransfer.setData('blockType', def.type)
    e.dataTransfer.effectAllowed = 'copy'
  }
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={() => onAdd(def.type)}
      className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-grab active:cursor-grabbing select-none border border-zinc-800 bg-zinc-900 hover:border-zinc-600 hover:bg-zinc-800 transition-colors"
      title="Drag or click to add"
    >
      <span className="text-zinc-400 font-mono text-sm w-6 text-center shrink-0">{def.icon}</span>
      <span className="text-zinc-300 text-sm">{def.label}</span>
    </div>
  )
}

// ─── Canvas block row ─────────────────────────────────────────────────────────
function CanvasBlock({ block, selected, onSelect, onMoveUp, onMoveDown, onDelete, canUp, canDown }) {
  const def = BY_TYPE[block.type]
  if (!def) return null
  const isSelected = selected === block.id

  return (
    <div
      className={`relative group cursor-pointer transition-all ${isSelected ? 'ring-2 ring-indigo-500 ring-offset-1 ring-offset-zinc-950 rounded-sm' : 'hover:ring-1 hover:ring-zinc-600 hover:ring-offset-1 hover:ring-offset-zinc-950 rounded-sm'}`}
      onClick={(e) => { e.stopPropagation(); onSelect(block.id) }}
    >
      {/* Block label */}
      <div className={`absolute -top-6 left-0 flex items-center gap-1 transition-opacity z-10 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-600 text-white">{def.label}</span>
      </div>

      {/* Controls */}
      <div className={`absolute -top-6 right-0 flex items-center gap-1 transition-opacity z-10 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
        <button onClick={(e) => { e.stopPropagation(); onMoveUp() }}   disabled={!canUp}   className="w-5 h-5 text-xs bg-zinc-800 text-zinc-400 rounded hover:bg-zinc-700 disabled:opacity-20">↑</button>
        <button onClick={(e) => { e.stopPropagation(); onMoveDown() }} disabled={!canDown} className="w-5 h-5 text-xs bg-zinc-800 text-zinc-400 rounded hover:bg-zinc-700 disabled:opacity-20">↓</button>
        <button onClick={(e) => { e.stopPropagation(); onDelete() }}                       className="w-5 h-5 text-xs bg-red-900/60 text-red-400 rounded hover:bg-red-800">✕</button>
      </div>

      {/* Rendered preview */}
      <div className="pointer-events-none">
        {def.render(block.props)}
      </div>
    </div>
  )
}

// ─── Control renderer ─────────────────────────────────────────────────────────
function Control({ ctrl, value, onChange }) {
  const base = 'w-full bg-zinc-800 border border-zinc-700 rounded-md text-zinc-200 text-sm focus:outline-none focus:border-indigo-500'

  if (ctrl.type === 'text')
    return <input type="text" value={value} onChange={e => onChange(e.target.value)} className={`${base} px-2.5 py-1.5`} />

  if (ctrl.type === 'textarea')
    return <textarea value={value} onChange={e => onChange(e.target.value)} rows={3} className={`${base} px-2.5 py-1.5 resize-none`} />

  if (ctrl.type === 'number')
    return <input type="number" value={value} onChange={e => onChange(Number(e.target.value))} className={`${base} px-2.5 py-1.5`} />

  if (ctrl.type === 'color')
    return (
      <div className="flex items-center gap-2">
        <input type="color" value={value} onChange={e => onChange(e.target.value)} className="w-8 h-8 rounded cursor-pointer border border-zinc-700 bg-transparent" />
        <input type="text"  value={value} onChange={e => onChange(e.target.value)} className={`${base} px-2.5 py-1.5 flex-1 font-mono text-xs`} />
      </div>
    )

  if (ctrl.type === 'select')
    return (
      <select value={value} onChange={e => onChange(e.target.value)} className={`${base} px-2.5 py-1.5`}>
        {ctrl.opts.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    )

  return null
}

// ─── Export modal ─────────────────────────────────────────────────────────────
function ExportModal({ code, onClose }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-3xl max-h-[80vh] flex flex-col overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
          <div>
            <h2 className="text-white font-semibold">Export Code</h2>
            <p className="text-zinc-500 text-xs mt-0.5">Copy this and paste it into the chat — I'll implement it directly.</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={copy} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${copied ? 'bg-green-600 text-white' : 'bg-indigo-600 hover:bg-indigo-500 text-white'}`}>
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
            <button onClick={onClose} className="px-3 py-2 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">✕</button>
          </div>
        </div>
        <pre className="flex-1 overflow-auto p-5 text-sm text-zinc-300 font-mono leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}

// ─── Empty canvas placeholder ─────────────────────────────────────────────────
function EmptyCanvas() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 border-2 border-dashed border-zinc-800 rounded-2xl text-center">
      <div className="text-4xl opacity-30">⬛</div>
      <p className="text-zinc-500 text-sm">Drag blocks from the left panel, or click them to add.</p>
      <p className="text-zinc-700 text-xs">Your design will render live here.</p>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function DesignLab() {
  const [blocks,   setBlocks]   = useState([])
  const [selected, setSelected] = useState(null)
  const [viewport, setViewport] = useState('desktop')
  const [showExport, setShowExport] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const canvasRef = useRef(null)

  // ── block mutations ──────────────────────────────────────────────────────────
  const addBlock = useCallback((type) => {
    const def = BY_TYPE[type]
    if (!def) return
    const block = { id: uid(), type, props: { ...def.defaults } }
    setBlocks(prev => [...prev, block])
    setSelected(block.id)
  }, [])

  const updateProp = useCallback((id, key, val) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, props: { ...b.props, [key]: val } } : b))
  }, [])

  const deleteBlock = useCallback((id) => {
    setBlocks(prev => prev.filter(b => b.id !== id))
    setSelected(prev => prev === id ? null : prev)
  }, [])

  const moveBlock = useCallback((id, dir) => {
    setBlocks(prev => {
      const idx = prev.findIndex(b => b.id === id)
      const next = [...prev]
      const target = idx + dir
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]]
      return next
    })
  }, [])

  // ── drag/drop ────────────────────────────────────────────────────────────────
  const onDragOver  = (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; setIsDragOver(true) }
  const onDragLeave = ()  => setIsDragOver(false)
  const onDrop      = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    const type = e.dataTransfer.getData('blockType')
    if (type) addBlock(type)
  }

  // ── selected block data ──────────────────────────────────────────────────────
  const selectedBlock = blocks.find(b => b.id === selected)
  const selectedDef   = selectedBlock ? BY_TYPE[selectedBlock.type] : null

  // ── canvas width ─────────────────────────────────────────────────────────────
  const vp = VIEWPORTS.find(v => v.key === viewport)

  const code = generateCode(blocks, viewport)

  return (
    <div className="h-screen bg-zinc-950 text-white flex flex-col overflow-hidden font-sans">

      {/* ── Top bar ────────────────────────────────────────────────────────────── */}
      <header className="flex items-center gap-4 px-5 py-3 border-b border-zinc-800 shrink-0">
        <a href="/" className="text-zinc-500 hover:text-white text-sm transition-colors">← Back to site</a>
        <div className="w-px h-4 bg-zinc-800" />
        <span className="text-white font-semibold tracking-tight">Design Lab</span>
        <div className="flex-1" />

        {/* Viewport toggle */}
        <div className="flex items-center gap-1 bg-zinc-900 rounded-lg p-1 border border-zinc-800">
          {VIEWPORTS.map(v => (
            <button
              key={v.key}
              onClick={() => setViewport(v.key)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${viewport === v.key ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              {v.label}
            </button>
          ))}
        </div>

        {/* Export */}
        <button
          onClick={() => blocks.length > 0 && setShowExport(true)}
          disabled={blocks.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors"
        >
          Export Code
        </button>
      </header>

      {/* ── Three-column body ──────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* LEFT — palette ───────────────────────────────────────────────────── */}
        <aside className="w-52 shrink-0 border-r border-zinc-800 overflow-y-auto p-3 flex flex-col gap-4">
          {CATS.map(cat => (
            <div key={cat}>
              <p className="text-zinc-600 text-[10px] uppercase tracking-widest font-semibold mb-2 px-1">{cat}</p>
              <div className="flex flex-col gap-1.5">
                {BLOCKS.filter(b => b.cat === cat).map(def => (
                  <PaletteItem key={def.type} def={def} onAdd={addBlock} />
                ))}
              </div>
            </div>
          ))}
        </aside>

        {/* CENTER — canvas ──────────────────────────────────────────────────── */}
        <main
          className="flex-1 overflow-auto bg-zinc-950 p-8 flex flex-col items-center"
          onClick={() => setSelected(null)}
        >
          <div
            ref={canvasRef}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`flex flex-col gap-8 min-h-full transition-all duration-200 ${isDragOver ? 'ring-2 ring-indigo-500/50 bg-indigo-950/10 rounded-2xl' : ''}`}
            style={{ width: typeof vp.w === 'number' ? `${vp.w}px` : '100%' }}
          >
            {blocks.length === 0 ? <EmptyCanvas /> : blocks.map((block, i) => (
              <CanvasBlock
                key={block.id}
                block={block}
                selected={selected}
                onSelect={setSelected}
                onMoveUp={()    => moveBlock(block.id, -1)}
                onMoveDown={()  => moveBlock(block.id,  1)}
                onDelete={()    => deleteBlock(block.id)}
                canUp={i > 0}
                canDown={i < blocks.length - 1}
              />
            ))}

            {/* Drop hint when blocks exist */}
            {blocks.length > 0 && (
              <div className="flex items-center justify-center py-6 border border-dashed border-zinc-800 rounded-xl opacity-40 hover:opacity-60 transition-opacity">
                <span className="text-zinc-600 text-xs">+ Drop here</span>
              </div>
            )}
          </div>
        </main>

        {/* RIGHT — properties ───────────────────────────────────────────────── */}
        <aside className="w-64 shrink-0 border-l border-zinc-800 overflow-y-auto flex flex-col">
          {selectedBlock && selectedDef ? (
            <>
              <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-semibold">{selectedDef.label}</p>
                  <p className="text-zinc-600 text-xs font-mono">{selectedBlock.type}</p>
                </div>
                <button onClick={() => deleteBlock(selectedBlock.id)} className="text-red-500 hover:text-red-400 text-xs px-2 py-1 rounded hover:bg-red-950/30 transition-colors">Delete</button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                {selectedDef.controls.map(ctrl => (
                  <div key={ctrl.key}>
                    <label className="block text-zinc-500 text-xs mb-1.5">{ctrl.label}</label>
                    <Control
                      ctrl={ctrl}
                      value={selectedBlock.props[ctrl.key]}
                      onChange={val => updateProp(selectedBlock.id, ctrl.key, val)}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center flex-1 gap-2 text-center px-6">
              <div className="text-3xl opacity-20">⚙</div>
              <p className="text-zinc-600 text-sm">Select a block on the canvas to edit its properties.</p>
            </div>
          )}
        </aside>
      </div>

      {/* Export modal */}
      {showExport && <ExportModal code={code} onClose={() => setShowExport(false)} />}
    </div>
  )
}
