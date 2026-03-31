'use client'

import styles from './Studio.module.css'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef, useState } from 'react'

interface StudioSectionProps {
  data: any
}

export default function StudioSection({ data }: StudioSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [_currentIndex, setCurrentIndex] = useState(0)

  const _handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? (data.studioImages?.length || 1) - 1 : prev - 1))
  }

  const _handleNext = () => {
    setCurrentIndex((prev) => (prev === (data.studioImages?.length || 1) - 1 ? 0 : prev + 1))
  }

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
            <h3>{data.subtitle || 'Where Stories Are Shot.'}</h3>
          </div>
          <p className={styles['studio-info']}>{data.description || ''}</p>
        </motion.div>

        <div className={styles['studio-carousel']}>
          <div className={styles['studio-images-wrapper']}>
            {data.studioImages?.map((image: any, index: number) => {
              const imageUrl = typeof image.image === 'object' ? image.image?.url : image.image
              return (
                <motion.div
                  key={index}
                  className={styles['studio-image-card']}
                  initial={{ opacity: 0, x: 100 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Image
                    src={imageUrl || '/hero-image.png'}
                    alt={`Studio space ${index + 1}`}
                    width={600}
                    height={400}
                    className={styles['studio-img']}
                  />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
