'use client'

import styles from './Studio.module.css'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef, useState } from 'react'

interface StudioImage {
  id?: string
  image?: { url?: string } | string | null
}

interface StudioData {
  title?: string
  subtitle?: string
  description?: string
  studioImages?: StudioImage[]
}

interface StudioSectionProps {
  data: StudioData
}

const MAX_ROTATE = 38

function HoverCard({ rotateY, children }: { rotateY: number; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className={styles['studio-image-card']}
      style={{
        transform: hovered
          ? `perspective(900px) rotateY(${rotateY}deg) scale(1.03)`
          : `perspective(900px) rotateY(${rotateY}deg)`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </div>
  )
}

export default function StudioSection({ data }: StudioSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const images = (data.studioImages ?? []).filter((img) => {
    const url = typeof img.image === 'object' ? img.image?.url : img.image
    return !!url
  })
  const total = images.length
  const center = (total - 1) / 2

  return (
    <section className={styles['studio-section']} ref={ref}>
      <div className={styles['studio-container']}>
        <motion.div
          className={styles['studio-header']}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className={styles['studio-title-area']}>
            <h2>{data.title || 'Studio Cleanbold'}</h2>
            <h3>
              {data.subtitle || 'Where Stories Are Shot.'}
              <span className={styles['dot-accent']}>.</span>
            </h3>
          </div>
          <p className={styles['studio-info']}>{data.description || ''}</p>
        </motion.div>
      </div>

      <div className={styles['studio-carousel']}>
        <div className={styles['studio-images-wrapper']}>
          {images.map((image: StudioImage, index: number) => {
            const imageUrl = typeof image.image === 'object' ? image.image?.url : image.image
            if (!imageUrl) return null
            const rotateY = total > 1 ? ((index - center) / Math.max(center, 1)) * MAX_ROTATE : 0
            return (
              <HoverCard key={index} rotateY={rotateY}>
                <motion.div
                  className={styles['studio-img-opacity']}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.9, delay: index * 0.12 }}
                >
                  <Image
                    src={imageUrl}
                    alt={`Studio space ${index + 1}`}
                    fill
                    className={styles['studio-img']}
                  />
                </motion.div>
              </HoverCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
