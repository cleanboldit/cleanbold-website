'use client'

import styles from './HighlightCard.module.css'
import { motion } from 'framer-motion'

interface HighlightCardProps {
  readonly block: {
    title?: string
    description?: string
    color?: string
    backgroundImage?: { url?: string } | string | null
    bulletPoints?: { text: string; id?: string }[]
  }
}

const colorMap: Record<string, string> = {
  'dark-blue': 'linear-gradient(135deg, #060d24 0%, #0d1b4e 100%)',
  'dark-gray': 'linear-gradient(135deg, #0e0e0e 0%, #1e1e2e 100%)',
  teal: 'linear-gradient(135deg, #061a1a 0%, #0b3535 100%)',
  purple: 'linear-gradient(135deg, #0e0520 0%, #1e0a50 100%)',
}

export default function HighlightCard({ block }: HighlightCardProps) {
  const { title, description, color, backgroundImage, bulletPoints = [] } = block

  let bgImageUrl: string | null = null
  if (typeof backgroundImage === 'object' && backgroundImage !== null) {
    bgImageUrl = backgroundImage.url ?? null
  } else if (typeof backgroundImage === 'string') {
    bgImageUrl = backgroundImage
  }

  const fallbackBg = colorMap[color ?? 'dark-blue'] ?? colorMap['dark-blue']

  return (
    <section className={styles.section}>
      <motion.div
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
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.cardInner}>
          <div className={styles.left}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>
          </div>

          {bulletPoints.length > 0 && (
            <ul className={styles.list}>
              {bulletPoints.map((pt, i) => (
                <li key={pt.id ?? i} className={styles.item}>
                  <span className={styles.dot} />
                  {pt.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </section>
  )
}
