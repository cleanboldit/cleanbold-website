'use client'

import styles from './OurWork.module.css'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState, useCallback } from 'react'

const offeringColorMap: Record<string, string> = {
  'dark-blue': 'linear-gradient(135deg, #0d1b3e 0%, #1a2f6e 100%)',
  'dark-gray': 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
  teal: 'linear-gradient(135deg, #0d3535 0%, #0e5454 100%)',
  purple: 'linear-gradient(135deg, #1a0a3d 0%, #3b1fa0 100%)',
}

interface Offering {
  id?: string
  title?: string
  description?: string
  color?: string
  image?: { url?: string } | string | null
  imagePosition?: string
  backgroundImage?: { url?: string } | string | null
}

interface CoreOfferingsProps {
  block: {
    sectionLabel?: string
    mainTitle?: string
    description?: string
    exploreButtonText?: string
    offerings?: Offering[]
  }
}

export default function CoreOfferings({ block }: CoreOfferingsProps) {
  const { offerings = [], sectionLabel, mainTitle, description, exploreButtonText } = block
  const ref = useRef(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeIndex, setActiveIndex] = useState(0)

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return
    const { scrollLeft } = scrollRef.current
    const cardWidth = 320 // card width + gap
    const index = Math.round(scrollLeft / cardWidth)
    setActiveIndex(index)
  }, [])

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
            <button className={styles['carousel-btn']} onClick={handlePrev} aria-label="Previous">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <button className={styles['carousel-btn']} onClick={handleNext} aria-label="Next">
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
          <div className={styles['offerings-scroll']} ref={scrollRef} onScroll={handleScroll}>
            {offerings?.map((offering: Offering, index: number) => {
              const imageUrl =
                typeof offering.image === 'object' ? offering.image?.url : offering.image
              const bgImageUrl =
                typeof offering.backgroundImage === 'object'
                  ? offering.backgroundImage?.url
                  : offering.backgroundImage
              // Normalize imagePosition to handle case sensitivity and whitespace
              const imagePosition = offering.imagePosition?.toString().toLowerCase().trim() || 'top'
              const isTop = imagePosition === 'top'
              const isBottom = imagePosition === 'bottom'
              const colorKey = offering.color?.toString().toLowerCase().trim() || 'dark-blue'
              const contentBackground = offeringColorMap[colorKey] ?? offeringColorMap['dark-blue']

              return (
                <motion.div
                  key={offering.id || index}
                  className={`${styles['offering-card']} ${isTop ? styles['image-top'] : styles['image-bottom']} ${bgImageUrl ? styles['has-bg-image'] : ''}`}
                  style={
                    bgImageUrl
                      ? {
                          backgroundImage: `url('${bgImageUrl}')`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }
                      : undefined
                  }
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  {isTop && imageUrl && (
                    <div className={styles['card-image-top']}>
                      <Image
                        src={imageUrl}
                        alt={offering.title ?? ''}
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
                        alt={offering.title ?? ''}
                        width={280}
                        height={200}
                        className={styles['offering-img']}
                      />
                    </div>
                  )}

                  <div
                    className={styles['card-content']}
                    style={bgImageUrl ? undefined : { background: contentBackground }}
                  >
                    <h2>{offering.title}</h2>
                    <p>{offering.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile dot indicators */}
        <div className={styles['carousel-dots']}>
          {offerings?.map((_, i) => (
            <button
              key={i}
              className={`${styles['carousel-dot']} ${i === activeIndex ? styles['carousel-dot-active'] : ''}`}
              onClick={() => {
                if (!scrollRef.current) return
                scrollRef.current.scrollTo({ left: i * 320, behavior: 'smooth' })
                setActiveIndex(i)
              }}
              aria-label={`Go to card ${i + 1}`}
            />
          ))}
        </div>
        <motion.div
          className={styles['offerings-cta-container']}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Link href="/services" className={styles['offerings-cta']}>
            {exploreButtonText || 'Explore All Services'}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
