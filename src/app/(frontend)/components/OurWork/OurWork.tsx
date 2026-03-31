'use client'

import styles from './OurWork.module.css'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

interface CoreOfferingsProps {
  data: any[]
  settings: any
}

export default function CoreOfferings({ data, settings }: CoreOfferingsProps) {
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

  // Debug: log imagePosition of each offering
  data.forEach((offering) => {
    const normalized = offering.imagePosition?.toString().toLowerCase().trim() || 'top'
    console.log('Original:', offering.imagePosition, 'Normalized:', normalized)
  })

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
            <p className={styles['section-label']}>{settings?.sectionLabel}</p>
            <h2>{settings?.mainTitle}</h2>
            <p className={styles['section-description']}>{settings?.description}</p>
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
            {data?.map((offering: any, index: number) => {
              const imageUrl =
                typeof offering.image === 'object' ? offering.image?.url : offering.image
              const backgroundImage = `/coreoffering/Image-${(index % 4) + 1}.png`
              // Normalize imagePosition to handle case sensitivity and whitespace
              const imagePosition = offering.imagePosition?.toString().toLowerCase().trim() || 'top'
              const isTop = imagePosition === 'top'
              const isBottom = imagePosition === 'bottom'

              return (
                <motion.div
                  key={offering.id || index}
                  className={`${styles['offering-card']} ${isTop ? styles['image-top'] : styles['image-bottom']}`}
                  style={{
                    backgroundImage: `url('${backgroundImage}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  {isTop && (
                    <div className={styles['card-image-top']}>
                      <Image
                        src={imageUrl || '/hero-image.png'}
                        alt={offering.title}
                        width={280}
                        height={200}
                        className={styles['offering-img']}
                      />
                    </div>
                  )}

                  {isBottom && (
                    <div className={styles['card-image-bottom']}>
                      <Image
                        src={imageUrl || '/hero-image.png'}
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
            {settings?.exploreButtonText || ' Explore All Services'}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
