'use client'

import { useRef, useEffect, useMemo, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion'
import Image from 'next/image'
import styles from './OurWork.module.css'

interface ServiceItem {
  item?: string
  id?: string
}

interface Offering {
  id?: string
  title?: string
  image?: { url?: string } | string | null
  backgroundImage?: { url?: string } | string | null
  servicesList?: ServiceItem[]
}

interface CoreOfferingsProps {
  block: {
    mainTitle?: string
    backgroundColor?: string
    offerings?: Offering[]
  }
}

interface ScrollCardProps {
  offering: Offering
  scrollYProgress: MotionValue<number>
  animStart: number
  animEnd: number
  isDesktop: boolean
  reduceMotion: boolean
}

interface BgLayerProps {
  scrollYProgress: MotionValue<number>
  bgUrl: string
  inputRange: number[]
  outputRange: number[]
}

/** Resolves Payload image field (object or string URL) to a plain URL string */
function resolveImageUrl(
  img: { url?: string } | string | null | undefined,
): string | undefined {
  return typeof img === 'object' ? img?.url : img ?? undefined
}

/** ≥1024px = desktop scroll experience; below = simple grid with whileInView */
function useIsNarrow(): boolean {
  const [isNarrow, setIsNarrow] = useState(true) // safe SSR default: mobile-first
  useEffect(() => {
    setIsNarrow(window.matchMedia('(max-width: 1279px)').matches)
  }, [])
  return isNarrow
}

function BgLayer({ scrollYProgress, bgUrl, inputRange, outputRange }: BgLayerProps) {
  const opacity = useTransform(scrollYProgress, inputRange, outputRange)
  return (
    <motion.div
      className={styles.background}
      style={{
        opacity,
        backgroundImage: `url('${bgUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  )
}

function ScrollCard({
  offering,
  scrollYProgress,
  animStart,
  animEnd,
  isDesktop,
  reduceMotion,
}: ScrollCardProps) {
  // Always compute — hooks must be unconditional
  const scrollOpacity = useTransform(scrollYProgress, [animStart, animEnd], [0, 1])
  const scrollY = useTransform(scrollYProgress, [animStart, animEnd], ['100vh', '0vh'])
  const scrollScale = useTransform(scrollYProgress, [animStart, animEnd], [0.93, 1])

  const imageUrl = resolveImageUrl(offering.image)

  const motionProps =
    isDesktop && !reduceMotion
      ? { style: { opacity: scrollOpacity, y: scrollY, scale: scrollScale } }
      : !reduceMotion
        ? {
            initial: { opacity: 0, y: 48 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: '-60px' },
            transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const },
          }
        : {}

  return (
    <motion.article className={styles.card} {...motionProps}>
      {imageUrl && (
        <div className={styles.cardImage}>
          <Image
            src={imageUrl}
            alt={offering.title ?? ''}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, (max-width: 1440px) 30vw, 420px"
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}

      <h3 className={styles.cardTitle}>{offering.title}</h3>

      <ul className={styles.servicesList}>
        {offering.servicesList?.map((s, i) => (
          <li key={s.id ?? i} className={styles.serviceItem}>
            <span className={styles.serviceDot} aria-hidden="true" />
            {s.item}
          </li>
        ))}
      </ul>
    </motion.article>
  )
}

export default function CoreOfferings({ block }: CoreOfferingsProps) {
  const { offerings = [], mainTitle, backgroundColor } = block
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isNarrow = useIsNarrow()
  const isDesktop = !isNarrow
  const reduceMotion = !!prefersReducedMotion
  const n = Math.max(offerings.length, 1)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const rawX = useMotionValue(65)
  const rawY = useMotionValue(62)
  const springX = useSpring(rawX, { stiffness: 60, damping: 18 })
  const springY = useSpring(rawY, { stiffness: 60, damping: 18 })

  useEffect(() => {
    if (!isDesktop || reduceMotion) return
    const onMove = (e: MouseEvent) => {
      rawX.set((e.clientX / window.innerWidth) * 100)
      rawY.set((e.clientY / window.innerHeight) * 100)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [rawX, rawY, isDesktop, reduceMotion])

  const cursorOverlay = useMotionTemplate`radial-gradient(ellipse 80% 80% at ${springX}% ${springY}%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)`

  // Hooks must run unconditionally — values not applied on narrow/reduced-motion
  const titleScale = useTransform(scrollYProgress, [0, 0.12], [1, 0.4])
  const titleOpacity = useTransform(scrollYProgress, [0.08, 0.15], [1, 0])

  const animRanges = useMemo(() => {
    const fraction = 0.75 / n
    return offerings.map((_, i) => {
      const start = 0.15 + i * fraction
      return { start, end: start + fraction * 0.65 }
    })
  }, [offerings, n])

  return (
    <section
      ref={containerRef}
      className={styles.container}
      style={{
        // CSS owns height on narrow — don't set inline or it will override
        height: isDesktop ? `${(n + 2.5) * 100}vh` : undefined,
        ...(backgroundColor ? { background: backgroundColor } : {}),
      }}
      aria-label="Our services"
    >
      <div className={styles.stickyPane}>
        <motion.div
          className={styles.introTitle}
          style={isDesktop && !reduceMotion ? { scale: titleScale, opacity: titleOpacity } : undefined}
          aria-hidden="true"
        >
          {mainTitle ?? 'OUR SERVICES'}
          <span className={styles.introDot}>.</span>
        </motion.div>

        <h2 className={styles.srOnly}>{mainTitle ?? 'Our Services'}</h2>

        {isDesktop && !reduceMotion && offerings.map((offering, index) => {
          const bgUrl = resolveImageUrl(offering.backgroundImage)
          if (!bgUrl) return null

          const { start, end } = animRanges[index]!
          const next = animRanges[index + 1]
          const inputRange = next ? [start, end, next.start, next.end] : [start, end]
          const outputRange = next ? [0, 1, 1, 0] : [0, 1]

          return (
            <BgLayer
              key={offering.id ?? index}
              scrollYProgress={scrollYProgress}
              bgUrl={bgUrl}
              inputRange={inputRange}
              outputRange={outputRange}
            />
          )
        })}

        {isDesktop && !reduceMotion && (
          <motion.div className={styles.background} style={{ background: cursorOverlay }} />
        )}

        <div className={styles.inner}>
          <div
            className={styles.grid}
            // CSS handles columns on narrow; desktop needs dynamic repeat(n) for variable offering count
            style={isDesktop ? { gridTemplateColumns: `repeat(${n}, 1fr)` } : undefined}
          >
            {offerings.map((offering, index) => {
              const { start, end } = animRanges[index]!
              return (
                <ScrollCard
                  key={offering.id ?? index}
                  offering={offering}
                  scrollYProgress={scrollYProgress}
                  animStart={start}
                  animEnd={end}
                  isDesktop={isDesktop}
                  reduceMotion={reduceMotion}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
