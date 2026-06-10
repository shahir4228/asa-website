import { motion } from 'framer-motion'

// Animated SVG path lines — renders behind hero content
function FloatingPaths({ position }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }))

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <svg
        viewBox="0 0 696 316"
        fill="none"
        style={{ width: '100%', height: '100%' }}
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="rgba(200,184,150,1)"
            strokeWidth={path.width}
            strokeOpacity={0.06 + path.id * 0.018}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </svg>
    </div>
  )
}

// Drop this inside any section with position:relative to get the animated paths
export function BackgroundPaths() {
  return (
    <>
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </>
  )
}

// Spring letter-by-letter animation for the hero name
export function AnimatedHeroName({ firstName = 'Ahmad Shahir', lastName = 'Ahmadi' }) {
  return (
    <h1 className="hero-name">
      <span style={{ display: 'block' }}>
        {firstName.split('').map((char, i) => (
          <motion.span
            key={i}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.22 + i * 0.03,
              type: 'spring',
              stiffness: 150,
              damping: 25,
            }}
            style={{ display: 'inline-block' }}
          >
            {char === ' ' ? ' ' : char}
          </motion.span>
        ))}
      </span>
      <em>
        {lastName.split('').map((char, i) => (
          <motion.span
            key={i}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.22 + firstName.length * 0.03 + 0.12 + i * 0.03,
              type: 'spring',
              stiffness: 150,
              damping: 25,
            }}
            style={{ display: 'inline-block', fontStyle: 'normal', color: 'var(--gold)' }}
          >
            {char}
          </motion.span>
        ))}
      </em>
    </h1>
  )
}
