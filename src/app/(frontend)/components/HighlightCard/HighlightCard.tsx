'use client'

import styles from './HighlightCard.module.css'
import { motion } from 'framer-motion'

interface HighlightCardProps {
  readonly block: {
    title?: string
    description?: string
    bulletPoints?: { text: string; id?: string }[]
  }
}

export default function HighlightCard({ block }: HighlightCardProps) {
  const { title, description, bulletPoints = [] } = block

  return (
    <section className={styles.section}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
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
      </motion.div>
    </section>
  )
}
