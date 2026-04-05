'use client'

import styles from './PageHero.module.css'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface PageHeroProps {
  readonly block: {
    mainTitle?: string
    description?: string
    images?: { image: { url: string } | string | null; id?: string }[]
  }
}

export default function PageHero({ block }: PageHeroProps) {
  const { mainTitle, description, images = [] } = block

  return (
    <section className={styles.pageHero}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h1 className={styles.title}>{mainTitle}</h1>
        <p className={styles.description}>{description}</p>
      </motion.div>

      {images.length > 0 && (
        <div className={styles.grid}>
          {images.map((item, i) => {
            let url: string | null = null
            if (typeof item.image === 'object' && item.image !== null) {
              url = (item.image as { url: string }).url ?? null
            } else if (typeof item.image === 'string') {
              url = item.image
            }
            if (!url) return null
            return (
              <motion.div
                key={item.id ?? i}
                className={styles.imageWrapper}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Image src={url} alt={mainTitle ?? ''} fill className={styles.image} />
              </motion.div>
            )
          })}
        </div>
      )}
    </section>
  )
}
