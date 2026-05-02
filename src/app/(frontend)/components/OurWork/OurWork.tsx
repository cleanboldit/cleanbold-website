'use client'

import { useRef, useEffect } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
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
    sectionLabel?: string
    mainTitle?: string
    description?: string
    exploreButtonText?: string
    backgroundColor?: string
    offerings?: Offering[]
  }
}

interface ScrollCardProps {
  offering: Offering
  scrollYProgress: MotionValue<number>
  animStart: number
  animEnd: number
}

interface BgLayerProps {
  scrollYProgress: MotionValue<number>
  bgUrl: string
  inputRange: number[]
  outputRange: number[]
}

// Per-card section background — fades in when card enters, fades out when next card enters
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

function ScrollCard({ offering, scrollYProgress, animStart, animEnd }: ScrollCardProps) {
  const opacity = useTransform(scrollYProgress, [animStart, animEnd], [0, 1])
  const y = useTransform(scrollYProgress, [animStart, animEnd], ['100vh', '0vh'])
  const scale = useTransform(scrollYProgress, [animStart, animEnd], [0.93, 1])

  const imageUrl =
    typeof offering.image === 'object' ? offering.image?.url : offering.image

  return (
    <motion.div
      className={styles.card}
      style={{ opacity, y, scale, willChange: 'opacity, transform' }}
    >
      {imageUrl && (
        <div className={styles.cardImage}>
          <Image
            src={imageUrl}
            alt={offering.title ?? ''}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 1440px) 30vw, 420px"
          />
        </div>
      )}

      <h3 className={styles.cardTitle}>{offering.title}</h3>

      <ul className={styles.servicesList}>
        {offering.servicesList?.map((s, i) => (
          <li key={s.id ?? i} className={styles.serviceItem}>
            <span className={styles.serviceDot} />
            {s.item}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function CoreOfferings({ block }: CoreOfferingsProps) {
  const { offerings = [] } = block
  const containerRef = useRef<HTMLDivElement>(null)
  const n = Math.max(offerings.length, 1)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Cursor-tracking overlay — adds directional depth on top of card bg images
  const rawX = useMotionValue(65)
  const rawY = useMotionValue(62)
  const springX = useSpring(rawX, { stiffness: 60, damping: 18 })
  const springY = useSpring(rawY, { stiffness: 60, damping: 18 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set((e.clientX / window.innerWidth) * 100)
      rawY.set((e.clientY / window.innerHeight) * 100)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [rawX, rawY])

  // Soft dark vignette that follows cursor — sits over the bg images
  const cursorOverlay = useMotionTemplate`radial-gradient(ellipse 80% 80% at ${springX}% ${springY}%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)`

  const fraction = 0.85 / n

  return (
    <div
      ref={containerRef}
      className={styles.container}
      style={{ height: `${(n + 1.5) * 100}vh` }}
    >
      <div className={styles.stickyPane}>

        {/* Per-card background images — crossfade on scroll */}
        {offerings.map((offering, index) => {
          const bgUrl =
            typeof offering.backgroundImage === 'object'
              ? offering.backgroundImage?.url
              : offering.backgroundImage
          if (!bgUrl) return null

          const animStart = index * fraction
          const animEnd = animStart + fraction * 0.65
          const nextStart = (index + 1) * fraction
          const nextEnd = nextStart + fraction * 0.65

          const inputRange =
            index < n - 1
              ? [animStart, animEnd, nextStart, nextEnd]
              : [animStart, animEnd]
          const outputRange = index < n - 1 ? [0, 1, 1, 0] : [0, 1]

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

        {/* Cursor-tracking dark vignette overlay */}
        <motion.div
          className={styles.background}
          style={{ background: cursorOverlay }}
        />

        <div className={styles.inner}>
          <div
            className={styles.grid}
            style={{
              gridTemplateColumns: `repeat(${n}, 1fr)`,
              gap: 'clamp(24px, 3vw, 48px)',
            }}
          >
            {offerings.map((offering, index) => {
              const start = index * fraction
              const end = start + fraction * 0.65
              return (
                <ScrollCard
                  key={offering.id ?? index}
                  offering={offering}
                  scrollYProgress={scrollYProgress}
                  animStart={start}
                  animEnd={end}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
