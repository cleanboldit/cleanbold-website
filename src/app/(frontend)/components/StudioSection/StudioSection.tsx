'use client'

import Image from 'next/image'
import styles from './StudioSection.module.css'
import { motion } from 'framer-motion'

interface StudioSectionProps {
  block: {
    title?: string
    subtitle?: string
    studioImages?: { image: { url?: string } | string | null }[]
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

const EASE = [0.22, 1, 0.36, 1] as const

export default function StudioSection({ block }: StudioSectionProps) {
  const { title, subtitle, studioImages = [], perfectFor = [], detailsSection } = block

  const imageUrls = studioImages
    .map((s) => (typeof s.image === 'object' ? s.image?.url : s.image))
    .filter((u): u is string => Boolean(u))

  const marqueeItems = perfectFor.map((p) => p.item)
  const displayMarquee = [...marqueeItems, ...marqueeItems]
  const looped = [...imageUrls, ...imageUrls, ...imageUrls]

  return (
    <section className={styles.studioSection}>
      <div className={styles.headerSection}>
        <div className={styles.headerContent}>
          <motion.div
            className={styles.textContent}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {title && (
              <h2 className={styles.studioTitle}>
                {title.split('|').map((line, i, arr) => (
                  <span key={i}>
                    {line.trim()}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </h2>
            )}
            {subtitle && <p className={styles.studioSubtitle}>{subtitle}</p>}
          </motion.div>
        </div>
      </div>

      {imageUrls.length > 0 && (
        <motion.div
          className={styles.lensOuter}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
        >
          <svg
            width="0"
            height="0"
            aria-hidden="true"
            style={{ position: 'absolute', pointerEvents: 'none' }}
          >
            <defs>
              <clipPath id="lensClip" clipPathUnits="objectBoundingBox">
                <path d="M0,0 Q0.5,0.15 1,0 L1,1 Q0.5,0.85 0,1 Z" />
              </clipPath>
            </defs>
          </svg>

          <div className={styles.lensClip}>
            {/* aria-hidden: decorative looping strip, not meaningful content */}
            <div className={styles.lensTrack} aria-hidden="true">
              {looped.map((url, idx) => (
                <div key={idx} className={styles.lensImgWrap}>
                  <Image
                    src={url}
                    alt=""
                    width={350}
                    height={520}
                    draggable={false}
                    className={styles.lensImg}
                    sizes="350px"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      <div className={styles.marqueeSection}>
        {displayMarquee.length > 0 && (
          /* aria-hidden: purely decorative marquee, content duplicated for CSS loop */
          <div className={styles.marqueeWrapper} aria-hidden="true">
            <div className={styles.marqueeContent}>
              <span className={styles.marqueeLabel}>Perfect For:</span>
              <div className={styles.marqueeTrack}>
                <div className={styles.marqueeItems}>
                  {displayMarquee.map((item, index) => (
                    <span key={index} className={styles.marqueeItem}>
                      • {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {detailsSection && (
          <div className={styles.detailsSection}>
            <div className={styles.detailsContainer}>
              <motion.div
                className={styles.detailsLeft}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                {detailsSection.title && (
                  <h3 className={styles.detailsTitle}>{detailsSection.title}</h3>
                )}
                {detailsSection.description && (
                  <p className={styles.detailsDescription}>{detailsSection.description}</p>
                )}
              </motion.div>

              <motion.div
                className={styles.detailsRight}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                {detailsSection.locationTitle && (
                  <h4 className={styles.locationTitle}>{detailsSection.locationTitle}</h4>
                )}
                {detailsSection.locationAddress && (
                  <p className={styles.locationAddress}>{detailsSection.locationAddress}</p>
                )}
                <a href="#contact" className={styles.bookBtn}>
                  {detailsSection.bookButtonText || 'Book Studio'}
                </a>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
