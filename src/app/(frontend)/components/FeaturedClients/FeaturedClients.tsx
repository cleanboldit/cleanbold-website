'use client'

import { useState, useEffect, useRef, memo, useMemo } from 'react'
import styles from './FeaturedClients.module.css'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface Client {
  id?: string
  logo?: { url?: string } | string | null
}

interface FeaturedClientsProps {
  block: {
    sectionLabel?: string
    mainTitle?: string
    description?: string
    ctaButtonText?: string
    clients?: Client[]
  }
}

interface LogoEntry {
  url: string
}

interface LogoCardProps {
  logo: LogoEntry
  direction: 'up' | 'down'
  phase: 'idle' | 'exiting' | 'entering'
}

const GRID_COUNTS = { mobile: 12, tablet: 16, desktop: 24 } as const

function useGridCount() {
  const [count, setCount] = useState<number>(GRID_COUNTS.desktop)

  useEffect(() => {
    const mqMobile = window.matchMedia('(max-width: 767px)')
    const mqTablet = window.matchMedia('(min-width: 768px) and (max-width: 1023px)')

    const update = () => {
      if (mqMobile.matches) setCount(GRID_COUNTS.mobile)
      else if (mqTablet.matches) setCount(GRID_COUNTS.tablet)
      else setCount(GRID_COUNTS.desktop)
    }

    update()
    mqMobile.addEventListener('change', update)
    mqTablet.addEventListener('change', update)
    return () => {
      mqMobile.removeEventListener('change', update)
      mqTablet.removeEventListener('change', update)
    }
  }, [])

  return count
}

function createRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

const LogoCard = memo(function LogoCard({ logo, direction, phase }: LogoCardProps) {
  const exitClass = direction === 'up' ? styles['logo-exit-up'] : styles['logo-exit-down']
  const enterClass = direction === 'up' ? styles['logo-enter-up'] : styles['logo-enter-down']

  return (
    <div className={styles['client-brand-card']}>
      <div
        className={`${styles['logo-inner']} ${
          phase === 'exiting' ? exitClass : phase === 'entering' ? enterClass : ''
        }`}
      >
        <Image
          src={logo.url}
          alt="Client logo"
          width={200}
          height={100}
          className={styles['client-brand-logo']}
          sizes="(max-width: 768px) 28vw, 160px"
          loading="lazy"
        />
      </div>
    </div>
  )
})

export default function FeaturedClients({ block }: FeaturedClientsProps) {
  const { clients = [], sectionLabel, mainTitle, description, ctaButtonText } = block

  const logoPool: LogoEntry[] = useMemo(() => {
    const seen = new Set<string>()
    const out: LogoEntry[] = []
    for (const client of clients) {
      const url =
        typeof client.logo === 'object' ? (client.logo?.url ?? '') : (client.logo ?? '')
      if (!url || seen.has(url)) continue
      seen.add(url)
      out.push({ url })
    }
    return out
  }, [clients])

  const gridCount = useGridCount()

  const [phase, setPhase] = useState<'idle' | 'exiting' | 'entering'>('idle')
  const [tick, setTick] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const logoPoolKey = useMemo(() => {
    return logoPool.map((l) => l.url).join(',')
  }, [logoPool])

  const visibleLogos = useMemo(() => {
    if (logoPool.length === 0) return []

    if (logoPool.length < gridCount) {
      const offset = (tick * gridCount) % logoPool.length
      return Array.from({ length: gridCount }, (_, i) => logoPool[(offset + i) % logoPool.length])
    }

    const random = createRandom(0.158239)
    const shuffle = (array: LogoEntry[]) => {
      const arr = [...array]
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
      }
      return arr
    }

    let remainingPool = shuffle(logoPool)
    let currentPage: LogoEntry[] = []

    for (let t = 0; t <= tick; t++) {
      if (remainingPool.length >= gridCount) {
        currentPage = remainingPool.slice(0, gridCount)
        remainingPool = remainingPool.slice(gridCount)
      } else {
        const R = remainingPool.length
        const taken = [...remainingPool]
        const newShuffle = shuffle(logoPool)
        const takenSet = new Set(taken.map((l) => l.url))
        const filtered = newShuffle.filter((l) => !takenSet.has(l.url))

        const needed = gridCount - R
        const filler = filtered.slice(0, needed)
        currentPage = [...taken, ...filler]

        const fillerSet = new Set(filler.map((l) => l.url))
        const unused = newShuffle.filter((l) => !fillerSet.has(l.url))
        remainingPool = unused
      }
    }

    return currentPage
  }, [logoPool, gridCount, tick])

  useEffect(() => {
    setTick(0)
    setPhase('idle')

    if (logoPool.length <= 1) return

    const schedule = () => {
      timerRef.current = setTimeout(() => {
        setPhase('exiting')
        timerRef.current = setTimeout(() => {
          setTick((t) => t + 1)
          setPhase('entering')
          timerRef.current = setTimeout(() => {
            setPhase('idle')
            schedule()
          }, 420)
        }, 300)
      }, 3000)
    }

    schedule()
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [logoPoolKey, logoPool.length])

  if (logoPool.length === 0) return null

  return (
    <section className={styles['featured-clients-section']}>
      <div className={styles['clients-container']}>
        <motion.div
          className={styles['clients-header']}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className={styles['section-label']}>{sectionLabel || 'Featured Clients/Impact'}</p>
          <h2 className={styles['clients-heading']}>
            {mainTitle || 'Brands That Trusted The Bold'}
            <span className={styles['dot-accent']} aria-hidden="true" />
          </h2>
          <p className={styles['section-description']}>
            {description ||
              'From real estate giants to fashion disruptors, our work powers growth for ambitious brands across industries.'}
          </p>
        </motion.div>

        <div className={styles['clients-grid-wrapper']}>
          {visibleLogos.map((logo, cardIndex) => (
            <LogoCard
              key={`${logo.url}-${cardIndex}`}
              logo={logo}
              direction={cardIndex % 2 === 0 ? 'up' : 'down'}
              phase={phase}
            />
          ))}
        </div>

        <motion.div
          className={styles['clients-cta']}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <a href="#contact" className={styles['see-work-btn']}>
            {ctaButtonText || 'See Our Work'}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
