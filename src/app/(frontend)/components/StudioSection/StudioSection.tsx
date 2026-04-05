'use client'

import styles from './StudioSection.module.css'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface StudioSectionProps {
  block: {
    title?: string
    subtitle?: string
    description?: string
    studioImages?: { image: any }[]
    perfectFor?: { item: string }[]
    detailsSection?: {
      title?: string
      description?: string
      locationTitle?: string
      locationAddress?: string
      bookButtonText?: string
    }
  }
}

export default function StudioSection({ block }: StudioSectionProps) {
  const { title, subtitle, description, studioImages = [], perfectFor = [], detailsSection } = block

  const imageUrls = studioImages.map((s) => (typeof s.image === 'object' ? s.image?.url : s.image))
  // Duplicate images multiple times for seamless infinite loop
  const allImages = [...imageUrls, ...imageUrls, ...imageUrls, ...imageUrls]

  const marqueeItems = perfectFor.length > 0 ? perfectFor.map((p) => p.item) : []
  const displayMarquee = [...marqueeItems, ...marqueeItems]

  return (
    <section className={styles['studio-section']}>
      {/* First Part - Studio Images with White Background */}
      <div className={styles['studio-header-section']}>
        <div className={styles['studio-header-content']}>
          <motion.div
            className={styles['studio-text-content']}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className={styles['studio-title']}>
              {title}
              {subtitle && (
                <>
                  <br />
                  {subtitle}
                </>
              )}
            </h2>
          </motion.div>

          {description && (
            <motion.div
              className={styles['studio-description']}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <p>{description}</p>
            </motion.div>
          )}
        </div>

        {/* Auto-scrolling Images - Infinite Loop */}
        {allImages.length > 0 && (
          <div className={styles['studio-images-wrapper']}>
            <div className={styles['studio-images-scroll']}>
              <div className={styles['studio-images-track']}>
                {allImages.map((url, index) => (
                  <div key={index} className={styles['studio-image-item']}>
                    <Image
                      src={url}
                      alt={`Studio ${(index % studioImages.length) + 1}`}
                      width={600}
                      height={400}
                      className={styles['studio-image']}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Second Part - Marquee Section with Background */}
      <div className={styles['studio-marquee-section']}>
        {displayMarquee.length > 0 && (
          <div className={styles['studio-marquee-wrapper']}>
            <div className={styles['studio-marquee-content']}>
              <span className={styles['studio-marquee-label']}>Perfect For:</span>
              <div className={styles['studio-marquee-track']}>
                <div className={styles['studio-marquee-items']}>
                  {displayMarquee.map((item, index) => (
                    <span key={index} className={styles['studio-marquee-item']}>
                      ● {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Third Part - Studio Details with Mixed Background */}
        {detailsSection && (
          <div className={styles['studio-details-section']}>
            <div className={styles['studio-details-container']}>
              <motion.div
                className={styles['studio-details-left']}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {detailsSection.title && (
                  <h3 className={styles['studio-details-title']}>{detailsSection.title}</h3>
                )}
                {detailsSection.description && (
                  <p className={styles['studio-details-description']}>
                    {detailsSection.description}
                  </p>
                )}
              </motion.div>

              <motion.div
                className={styles['studio-details-right']}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {detailsSection.locationTitle && (
                  <h4 className={styles['studio-location-title']}>
                    {detailsSection.locationTitle}
                  </h4>
                )}
                {detailsSection.locationAddress && (
                  <p className={styles['studio-location-address']}>
                    {detailsSection.locationAddress}
                  </p>
                )}
                <button className={styles['studio-book-btn']}>
                  {detailsSection.bookButtonText || 'Book Studio'}
                </button>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
