'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import styles from './IntroAnimation.module.css'

const CHARS = ['C', 'l', 'e', 'a', 'n', 'b', 'o', 'l', 'd'] as const
const DOT = '.'
const DUST_COUNT = 30
const ERASE_INTERVAL_BASE = 80
const SCATTER_RADIUS_BASE = 35
const SCATTER_RADIUS_STEP = 15
const SCATTER_ANGLE_OFFSET = 0.7
const SCATTER_SCALE_BASE = 0.3
const SCATTER_SCALE_STEP = 0.25

/** Deterministic per-character scatter positions — stable across renders */
function buildScatterPositions(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 + SCATTER_ANGLE_OFFSET
    const radius = SCATTER_RADIUS_BASE + (i % 3) * SCATTER_RADIUS_STEP
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      r: ((i * 137) % 360) - 180,
      s: SCATTER_SCALE_BASE + (i % 4) * SCATTER_SCALE_STEP,
    }
  })
}

type Phase = 'scatter' | 'assemble' | 'hold' | 'erasing' | 'exploding' | 'done'

export default function IntroAnimation() {
  const [phase, setPhase] = useState<Phase>('scatter')
  const [visibleCount, setVisibleCount] = useState(CHARS.length)
  const dotRef = useRef<HTMLSpanElement>(null)
  const [dotCenter, setDotCenter] = useState('50% 50%')
  const scatterPositions = useMemo(() => buildScatterPositions(CHARS.length), [])

  /* Lock scroll; restore on unmount in case phase never reaches 'done' */
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  /* Phase sequencer */
  useEffect(() => {
    const delays: Partial<Record<Phase, number>> = {
      scatter: 400,
      assemble: 1100,
      hold: 700,
    }
    const next: Partial<Record<Phase, Phase>> = {
      scatter: 'assemble',
      assemble: 'hold',
      hold: 'erasing',
    }
    const delay = delays[phase]
    if (delay === undefined) return
    const t = setTimeout(() => setPhase(next[phase]!), delay)
    return () => clearTimeout(t)
  }, [phase])

  /* Erase letters one by one (backwards) */
  useEffect(() => {
    if (phase !== 'erasing') return
    if (visibleCount === 0) {
      if (dotRef.current) {
        const { left, top, width, height } = dotRef.current.getBoundingClientRect()
        setDotCenter(`${left + width / 2}px ${top + height / 2}px`)
      }
      const t = setTimeout(() => setPhase('exploding'), 200)
      return () => clearTimeout(t)
    }
    const t = setTimeout(
      () => setVisibleCount((n) => n - 1),
      ERASE_INTERVAL_BASE - visibleCount * 3,
    )
    return () => clearTimeout(t)
  }, [visibleCount, phase])

  if (phase === 'done') return null

  const isAssembled = phase !== 'scatter'
  const isErasing = phase === 'erasing' || phase === 'exploding'
  const charIndices = isErasing
    ? Array.from({ length: visibleCount }, (_, i) => i)
    : CHARS.map((_, i) => i)

  return (
    <div className={styles.intro} aria-hidden="true">
      <div className={styles.base} />

      {(phase === 'scatter' || phase === 'assemble') && (
        <div className={styles.dustField}>
          {Array.from({ length: DUST_COUNT }, (_, i) => (
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

      {phase !== 'exploding' && (
        <motion.div
          className={styles.letterStage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {isAssembled && !isErasing && <div className={styles.glowRing} />}

          <div className={styles.logoWrap}>
            <LayoutGroup>
              <AnimatePresence initial={false}>
                {charIndices.map((i) => {
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
                          ? { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, filter: 'blur(0px)' }
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
