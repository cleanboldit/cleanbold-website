'use client'

import styles from './CTASection.module.css'
import { motion } from 'framer-motion'

interface CTASectionProps {
  readonly block: {
    sectionLabel?: string
    mainTitle?: string
    description?: string
    buttonText?: string
    buttonUrl?: string
  }
}

export default function CTASection({ block }: CTASectionProps) {
  const { sectionLabel, mainTitle, description, buttonText, buttonUrl } = block

  return (
    <section className={styles.section}>
      <motion.div
        className={styles.inner}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {sectionLabel && <p className={styles.label}>{sectionLabel}</p>}
        <h2 className={styles.title}>{mainTitle}</h2>
        {description && <p className={styles.description}>{description}</p>}
        {buttonText && (
          <a href={buttonUrl ?? '#'} className={styles.button}>
            {buttonText}
          </a>
        )}
      </motion.div>
    </section>
  )
}
