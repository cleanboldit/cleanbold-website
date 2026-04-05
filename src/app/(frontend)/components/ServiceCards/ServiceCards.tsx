'use client'

import styles from './ServiceCards.module.css'
import { motion } from 'framer-motion'

interface ServiceCard {
  id?: string
  title?: string
  description?: string
  color?: string
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

const colorMap: Record<string, string> = {
  'dark-blue': 'linear-gradient(135deg, #0d1b3e 0%, #1a2f6e 100%)',
  'dark-gray': 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
  teal: 'linear-gradient(135deg, #0d3535 0%, #0e5454 100%)',
  purple: 'linear-gradient(135deg, #1a0a3d 0%, #3b1fa0 100%)',
}

export default function ServiceCards({ block }: ServiceCardsProps) {
  const { cards = [] } = block

  return (
    <section className={styles.section}>
      {cards.map((card, i) => (
        <motion.div
          key={card.id ?? i}
          className={styles.card}
          style={{ background: colorMap[card.color ?? 'dark-gray'] ?? colorMap['dark-gray'] }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className={styles.cardLeft}>
            <h2 className={styles.cardTitle}>{card.title}</h2>
            <p className={styles.cardDescription}>{card.description}</p>

            {(card.idealForTags?.length ?? 0) > 0 && (
              <div className={styles.idealFor}>
                <span className={styles.idealForLabel}>{card.idealForLabel ?? 'Ideal For:'}</span>
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

          <div className={styles.cardDivider} />

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
      ))}
    </section>
  )
}
