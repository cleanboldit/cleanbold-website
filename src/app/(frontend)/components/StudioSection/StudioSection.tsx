'use client'

import styles from './StudioSection.module.css'
import { motion } from 'framer-motion'

interface StudioSectionProps {
  block: {
    title?: string
    subtitle?: string
    description?: string
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

export default function StudioSection({ block }: StudioSectionProps) {
  const { title, subtitle, description, studioImages = [], perfectFor = [], detailsSection } = block

  const imageUrls: string[] = studioImages
    .map((s) => (typeof s.image === 'object' ? s.image?.url : s.image))
    .filter((u): u is string => Boolean(u))

  const marqueeItems = perfectFor.length > 0 ? perfectFor.map((p) => p.item) : []
  const displayMarquee = [...marqueeItems, ...marqueeItems]

  const looped = [...imageUrls, ...imageUrls]

  return (
    <section className={styles.studioSection}>
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className={styles.headerSection}>
        <div className={styles.headerContent}>
          <motion.div
            className={styles.textContent}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {title && <p className={styles.studioTitle}>{title}</p>}
            {subtitle && <p className={styles.studioSubtitle}>{subtitle}</p>}
          </motion.div>

          {/* {description && (
            <motion.div
              className={styles.studioDescription}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <p>{description}</p>
            </motion.div>
          )} */}
        </div>
      </div>

      {/* ── Lens-shaped image strip ─────────────────────────────── */}
      {imageUrls.length > 0 && (
        <motion.div
          className={styles.lensOuter}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/*
            Inline SVG defines the lens clip-path using objectBoundingBox
            coordinates (0–1). The shape:
              Top edge  — Q curve bowing DOWN  (concave inward from top)
              Bottom edge — Q curve bowing UP  (concave inward from bottom)
            Together they form the "two eggs facing each other" lens from
            the reference sketch.
          */}
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
            <div className={styles.lensTrack}>
              {looped.map((url, idx) => (
                <div key={idx} className={styles.lensImgWrap}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt={`Studio ${(idx % imageUrls.length) + 1}`}
                    draggable={false}
                    className={styles.lensImg}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Marquee + Details ──────────────────────────────────── */}
      <div className={styles.marqueeSection}>
        {displayMarquee.length > 0 && (
          <div className={styles.marqueeWrapper}>
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
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {detailsSection.locationTitle && (
                  <h4 className={styles.locationTitle}>{detailsSection.locationTitle}</h4>
                )}
                {detailsSection.locationAddress && (
                  <p className={styles.locationAddress}>{detailsSection.locationAddress}</p>
                )}
                <button className={styles.bookBtn}>
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
