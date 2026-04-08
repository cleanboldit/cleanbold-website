'use client'

import { useState, useEffect, useRef, memo, useMemo } from 'react'
import styles from './FeaturedClients.module.css'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface Client {
  id?: string
  name?: string
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
  name: string
}

interface LogoCardProps {
  logoPool: LogoEntry[]
  initialIndex: number
  direction: 'up' | 'down'
  phase: 'idle' | 'exiting' | 'entering'
  tick: number
}

const GRID_COUNT = 24 // 4 rows × 6 columns

const LogoCard = memo(function LogoCard({
  logoPool,
  initialIndex,
  direction,
  phase,
  tick,
}: LogoCardProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex)

  useEffect(() => {
    if (logoPool.length <= 1) return
    setActiveIndex((prev) => {
      let next: number
      do {
        next = Math.floor(Math.random() * logoPool.length)
      } while (next === prev && logoPool.length > 1)
      return next
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick])

  const logo = logoPool[activeIndex]
  if (!logo) return null

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
          alt={logo.name}
          width={200}
          height={100}
          className={styles['client-brand-logo']}
        />
      </div>
    </div>
  )
})

export default function FeaturedClients({ block }: FeaturedClientsProps) {
  const { clients = [], sectionLabel, mainTitle, description, ctaButtonText } = block

  const logoPool: LogoEntry[] = useMemo(
    () =>
      clients
        .map((client) => ({
          url: typeof client.logo === 'object' ? (client.logo?.url ?? '') : (client.logo ?? ''),
          name: client.name ?? 'Brand',
        }))
        .filter((l) => l.url !== ''),
    [clients],
  )

  const [phase, setPhase] = useState<'idle' | 'exiting' | 'entering'>('idle')
  const [tick, setTick] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
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
  }, [logoPool.length])

  if (logoPool.length === 0) return null

  const initialIndices = Array.from({ length: GRID_COUNT }, (_, i) => i % logoPool.length)

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
          <h2 style={{ fontSize: '45px', fontStyle: 'Biennale', fontWeight: '600' }}>
            {mainTitle || 'Brands That Trusted The Bold'}
            <span className={styles['dot-accent']}>.</span>
          </h2>
          <p className={styles['section-description']}>
            {description ||
              'From real estate giants to fashion disruptors, our work powers growth for ambitious brands across industries.'}
          </p>
        </motion.div>

        <div className={styles['clients-grid-wrapper']}>
          {initialIndices.map((logoIndex, cardIndex) => (
            <LogoCard
              key={cardIndex}
              logoPool={logoPool}
              initialIndex={logoIndex}
              direction={cardIndex % 2 === 0 ? 'up' : 'down'}
              phase={phase}
              tick={tick}
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
          <button className={styles['see-work-btn']}>{ctaButtonText || 'See Our Work'}</button>
        </motion.div>
      </div>
    </section>
  )
}
