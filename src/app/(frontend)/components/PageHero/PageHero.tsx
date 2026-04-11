'use client'

import styles from './PageHero.module.css'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface PageHeroProps {
  readonly block: {
    mainTitle?: string
    description?: string
    backgroundImage?: { url: string } | string | null
    images?: { image: { url: string } | string | null; id?: string }[]
  }
}

export default function PageHero({ block }: PageHeroProps) {
  const { mainTitle, description, backgroundImage, images = [] } = block

  let bgUrl: string | null = null
  if (typeof backgroundImage === 'object' && backgroundImage !== null) {
    bgUrl = (backgroundImage as { url: string }).url ?? null
  } else if (typeof backgroundImage === 'string') {
    bgUrl = backgroundImage
  }

  return (
    <section
      className={styles.pageHero}
      style={
        bgUrl
          ? {
              backgroundImage: `url('${bgUrl}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      <motion.div
        className={styles.intro}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h1 className={styles.title}>{mainTitle}</h1>
        <p className={styles.description}>{description}</p>
      </motion.div>

      {/*
        Bento layout expects this order in Payload: 1) left top 2) center (tall) 3) right top 4) left bottom 5) right bottom
      */}
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
                <Image
                  src={url}
                  alt={mainTitle ?? ''}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, (max-width: 900px) 28vw, 26vw"
                  loading="lazy"
                />
              </motion.div>
            )
          })}
        </div>
      )}
    </section>
  )
}
