'use client'

import styles from './OurWork.module.css'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

interface CoreOfferingsProps {
  block: {
    sectionLabel?: string
    mainTitle?: string
    description?: string
    exploreButtonText?: string
    offerings?: any[]
  }
}

export default function CoreOfferings({ block }: CoreOfferingsProps) {
  const { offerings = [], sectionLabel, mainTitle, description, exploreButtonText } = block
  const ref = useRef(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const handlePrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -380, behavior: 'smooth' })
    }
  }

  const handleNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 380, behavior: 'smooth' })
    }
  }

  return (
    <section className={styles['core-offerings']} ref={ref}>
      <div className={styles['offerings-container']}>
        <motion.div
          className={styles['offerings-header']}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className={styles['offerings-header-content']}>
            <p className={styles['section-label']}>{sectionLabel}</p>
            <h2>{mainTitle}</h2>
            <p className={styles['section-description']}>{description}</p>
          </div>

          <div className={styles['offerings-header-controls']}>
            <button
              className={`${styles['carousel-btn']} ${styles.prev}`}
              onClick={handlePrev}
              aria-label="Previous"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <button
              className={`${styles['carousel-btn']} ${styles.next}`}
              onClick={handleNext}
              aria-label="Next"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </motion.div>

        <div className={styles['offerings-carousel']}>
          <div className={styles['offerings-scroll']} ref={scrollRef}>
            {offerings?.map((offering: any, index: number) => {
              const imageUrl =
                typeof offering.image === 'object' ? offering.image?.url : offering.image
              // Normalize imagePosition to handle case sensitivity and whitespace
              const imagePosition = offering.imagePosition?.toString().toLowerCase().trim() || 'top'
              const isTop = imagePosition === 'top'
              const isBottom = imagePosition === 'bottom'

              return (
                <motion.div
                  key={offering.id || index}
                  className={`${styles['offering-card']} ${isTop ? styles['image-top'] : styles['image-bottom']}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  {isTop && imageUrl && (
                    <div className={styles['card-image-top']}>
                      <Image
                        src={imageUrl}
                        alt={offering.title}
                        width={280}
                        height={200}
                        className={styles['offering-img']}
                      />
                    </div>
                  )}

                  {isBottom && imageUrl && (
                    <div className={styles['card-image-bottom']}>
                      <Image
                        src={imageUrl}
                        alt={offering.title}
                        width={280}
                        height={200}
                        className={styles['offering-img']}
                      />
                    </div>
                  )}

                  <div className={styles['card-content']}>
                    <h2>{offering.title}</h2>
                    <p>{offering.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
        <motion.div
          className={styles['offerings-cta-container']}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <button className={styles['offerings-cta']}>
            {exploreButtonText || 'Explore All Services'}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
