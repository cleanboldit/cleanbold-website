'use client'

import styles from './ServiceCards.module.css'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'

interface ServiceCard {
  id?: string
  title?: string
  description?: string
  color?: string
  backgroundImage?: { url: string } | string | null
  servicesTitle?: string
  services?: { text: string; id?: string }[]
  idealForLabel?: string
  idealForTags?: { tag: string; id?: string }[]
}

interface ServiceCardsProps {
  readonly block: {
    cards?: ServiceCard[]
  }
}

interface CardItemProps {
  card: ServiceCard
  index: number
  total: number
  scrollYProgress: MotionValue<number>
}

const colorMap: Record<string, string> = {
  'dark-blue': 'linear-gradient(135deg, #060d24 0%, #0d1b4e 100%)',
  'dark-gray': 'linear-gradient(135deg, #0e0e0e 0%, #1e1e2e 100%)',
  teal: 'linear-gradient(135deg, #061a1a 0%, #0b3535 100%)',
  purple: 'linear-gradient(135deg, #0e0520 0%, #1e0a50 100%)',
}

function CardItem({ card, index, total, scrollYProgress }: Readonly<CardItemProps>) {
  let bgImageUrl: string | null = null
  if (typeof card.backgroundImage === 'object' && card.backgroundImage !== null) {
    bgImageUrl = (card.backgroundImage as { url: string }).url ?? null
  } else if (typeof card.backgroundImage === 'string') {
    bgImageUrl = card.backgroundImage
  }

  const fallbackBg = colorMap[card.color ?? 'dark-blue'] ?? colorMap['dark-blue']

  const dotStart = index / total
  const dotEnd = Math.min(dotStart + 0.25, 1)
  const dotScale = useTransform(scrollYProgress, [dotStart, dotEnd], [0, 1])

  return (
    <div
      className={styles.card}
      style={
        bgImageUrl
          ? {
              backgroundImage: `url('${bgImageUrl}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : { background: fallbackBg }
      }
    >
      {/* Timeline indicator — mirrors WhyBrandsChoose */}
      <div className={styles.timeline}>
        <div className={styles.timelineLine} />
        <motion.div className={styles.timelineDot} style={{ scale: dotScale }} />
      </div>

      <motion.div
        className={styles.cardInner}
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* LEFT COLUMN */}
        <div className={styles.cardLeft}>
          <h2 className={styles.cardTitle}>{card.title}</h2>
          <p className={styles.cardDescription}>{card.description}</p>

          {(card.idealForTags?.length ?? 0) > 0 && (
            <div className={styles.idealFor}>
              <p className={styles.idealForLabel}>{card.idealForLabel ?? 'Ideal For:'}</p>
              <div className={styles.tags}>
                {card.idealForTags?.map((t, ti) => (
                  <span key={t.id ?? ti} className={styles.tag}>
                    {t.tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* DIVIDER */}
        <div className={styles.cardDivider} />

        {/* RIGHT COLUMN */}
        <div className={styles.cardRight}>
          {card.servicesTitle && <p className={styles.servicesTitle}>{card.servicesTitle}</p>}
          <ul className={styles.servicesList}>
            {card.services?.map((s, si) => (
              <li key={s.id ?? si} className={styles.serviceItem}>
                <span className={styles.bullet} />
                {s.text}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  )
}

export default function ServiceCards({ block }: ServiceCardsProps) {
  const { cards = [] } = block
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const total = cards.length || 1

  return (
    <section className={styles.section} ref={containerRef}>
      {cards.map((card, i) => (
        <CardItem
          key={card.id ?? i}
          card={card}
          index={i}
          total={total}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </section>
  )
}
