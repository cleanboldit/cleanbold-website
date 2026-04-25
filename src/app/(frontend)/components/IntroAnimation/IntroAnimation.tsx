'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import styles from './IntroAnimation.module.css'

const CHARS = ['C', 'l', 'e', 'a', 'n', 'b', 'o', 'l', 'd']
const DOT = '.'
const ERASE_INTERVAL = 80

/* deterministic scatter positions */
function getScatterPositions(count: number) {
  const positions: { x: number; y: number; r: number; s: number }[] = []
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + 0.7
    const radius = 35 + (i % 3) * 15
    positions.push({
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      r: ((i * 137) % 360) - 180,
      s: 0.3 + (i % 4) * 0.25,
    })
  }
  return positions
}

export default function IntroAnimation() {
  const [phase, setPhase] = useState<
    'scatter' | 'assemble' | 'hold' | 'erasing' | 'exploding' | 'done'
  >('scatter')
  const [visibleCount, setVisibleCount] = useState(CHARS.length)
  const dotRef = useRef<HTMLSpanElement>(null)
  const [dotCenter, setDotCenter] = useState('50% 50%')
  const scatterPositions = useMemo(() => getScatterPositions(CHARS.length), [])

  /* Lock scroll */
  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])

  /* Phase sequencer */
  useEffect(() => {
    if (phase === 'scatter') {
      const t = setTimeout(() => setPhase('assemble'), 400)
      return () => clearTimeout(t)
    }
    if (phase === 'assemble') {
      const t = setTimeout(() => setPhase('hold'), 1100)
      return () => clearTimeout(t)
    }
    if (phase === 'hold') {
      const t = setTimeout(() => setPhase('erasing'), 700)
      return () => clearTimeout(t)
    }
  }, [phase])

  /* Erase letters one by one (backwards) */
  useEffect(() => {
    if (phase !== 'erasing') return
    if (visibleCount === 0) {
      /* Capture dot position for the wipe origin */
      if (dotRef.current) {
        const r = dotRef.current.getBoundingClientRect()
        setDotCenter(`${r.left + r.width / 2}px ${r.top + r.height / 2}px`)
      }
      const t = setTimeout(() => setPhase('exploding'), 200)
      return () => clearTimeout(t)
    }
    const t = setTimeout(
      () => setVisibleCount((n) => n - 1),
      ERASE_INTERVAL - visibleCount * 3,
    )
    return () => clearTimeout(t)
  }, [visibleCount, phase])

  if (phase === 'done') return null

  const isAssembled = phase !== 'scatter'
  const isErasing = phase === 'erasing' || phase === 'exploding'

  return (
    <div className={styles.intro} aria-hidden>
      <div className={styles.base} />

      {/* Dust particles during scatter/assemble */}
      {(phase === 'scatter' || phase === 'assemble') && (
        <div className={styles.dustField}>
          {Array.from({ length: 30 }, (_, i) => (
            <span
              key={i}
              className={styles.dust}
              style={{
                left: `${(i * 31) % 100}%`,
                top: `${(i * 47) % 100}%`,
                animationDelay: `${(i * 0.2) % 3}s`,
                animationDuration: `${2 + (i % 3)}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Circle wipe reveal from the dot */}
      <AnimatePresence>
        {phase === 'exploding' && (
          <motion.div
            className={styles.explosion}
            initial={{ clipPath: `circle(0px at ${dotCenter})` }}
            animate={{ clipPath: `circle(200vmax at ${dotCenter})` }}
            transition={{ duration: 1.4, ease: [0.95, 0.05, 0.6, 1] }}
            onAnimationComplete={() => {
              document.body.style.overflow = ''
              setPhase('done')
            }}
          />
        )}
      </AnimatePresence>

      {/* Letters + dot */}
      {phase !== 'exploding' && (
        <motion.div
          className={styles.letterStage}
          /* fade-in the whole stage on first appear */
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Glow ring behind the assembled text */}
          {isAssembled && !isErasing && <div className={styles.glowRing} />}

          <div className={styles.logoWrap}>
            <LayoutGroup>
              <AnimatePresence initial={false}>
                {/* During scatter/assemble: all letters with scatter animation */}
                {/* During erasing: only visibleCount letters */}
                {(isErasing
                  ? Array.from({ length: visibleCount }, (_, i) => i)
                  : CHARS.map((_, i) => i)
                ).map((i) => {
                  const scatter = scatterPositions[i]
                  const isBold = i >= 5

                  return (
                    <motion.span
                      key={i}
                      layout
                      className={isBold ? styles.charBold : styles.charLight}
                      {...(!isErasing && {
                        initial: {
                          x: `${scatter.x}vw`,
                          y: `${scatter.y}vh`,
                          rotate: scatter.r,
                          scale: scatter.s,
                          opacity: 0,
                          filter: 'blur(8px)',
                        },
                        animate: isAssembled
                          ? {
                              x: 0,
                              y: 0,
                              rotate: 0,
                              scale: 1,
                              opacity: 1,
                              filter: 'blur(0px)',
                            }
                          : {
                              x: `${scatter.x}vw`,
                              y: `${scatter.y}vh`,
                              rotate: scatter.r,
                              scale: scatter.s,
                              opacity: 0.4,
                              filter: 'blur(4px)',
                            },
                        transition: {
                          duration: 0.7,
                          delay: i * 0.05,
                          type: 'spring',
                          stiffness: 120,
                          damping: 14,
                        },
                      })}
                      exit={{ opacity: 0, y: -8, transition: { duration: 0.06 } }}
                    >
                      {CHARS[i]}
                    </motion.span>
                  )
                })}
              </AnimatePresence>

              {/* The dot — persists, layout-animates to stay attached */}
              <motion.span
                ref={dotRef}
                className={styles.charDot}
                layout
                initial={{ scale: 0, opacity: 0 }}
                animate={
                  isAssembled
                    ? { scale: 1, opacity: 1, filter: 'blur(0px)' }
                    : { scale: 1.5, opacity: 0.6, filter: 'blur(2px)' }
                }
                transition={
                  isErasing
                    ? { layout: { type: 'spring', stiffness: 500, damping: 40 } }
                    : {
                        duration: 0.7,
                        delay: CHARS.length * 0.05,
                        type: 'spring',
                        stiffness: 200,
                        damping: 18,
                      }
                }
              >
                {DOT}
              </motion.span>
            </LayoutGroup>
          </div>

          {/* Light sweep shimmer after assembly */}
          {phase === 'hold' && (
            <motion.div
              className={styles.lightSweep}
              initial={{ x: '-100%' }}
              animate={{ x: '250%' }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
          )}
        </motion.div>
      )}
    </div>
  )
}
