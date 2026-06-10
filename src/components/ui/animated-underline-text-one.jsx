import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const AnimatedText = React.forwardRef(
  (
    {
      className,
      text,
      textClassName,
      underlineClassName,
      underlinePath = 'M 0 0.5 Q 25 0 50 0.5 Q 75 1 100 0.5',
      underlineHoverPath = 'M 0 0.5 Q 25 1.8 50 0.5 Q 75 -0.8 100 0.5',
      underlineDuration = 0.4,
      ...props
    },
    ref
  ) => {
    const [hovered, setHovered] = React.useState(false)

    return (
      <div
        ref={ref}
        className={cn('block', className)}
        {...props}
      >
        {/* inner span is inline-flex so SVG sizes to match text width */}
        <span
          style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start', cursor: 'default' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <span className={cn('', textClassName)}>{text}</span>
          <svg
            viewBox="0 0 100 4"
            className={cn('w-full', underlineClassName)}
            style={{ height: '5px', overflow: 'visible' }}
            preserveAspectRatio="none"
          >
            <motion.path
              d={underlinePath}
              stroke="currentColor"
              strokeWidth={1.5}
              fill="transparent"
              animate={{ d: hovered ? underlineHoverPath : underlinePath }}
              transition={{ duration: underlineDuration, ease: 'easeInOut' }}
            />
          </svg>
        </span>
      </div>
    )
  }
)

AnimatedText.displayName = 'AnimatedText'
export { AnimatedText }
