'use client'

import styles from './Industries.module.css'
import { useRef, useState } from 'react'
import { useScroll, useMotionValueEvent, AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'

interface IndustryItem {
  id?: string
  name: string
  image?: { url?: string } | string | null
}

interface IndustriesProps {
  readonly block: {
    mainTitle?: string
    industries?: IndustryItem[]
  }
}

export default function Industries({ block }: IndustriesProps) {
  const { mainTitle, industries = [] } = block
  const [activeIndex, setActiveIndex] = useState(0)
  const outerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const idx = Math.min(Math.floor(latest * industries.length), industries.length - 1)
    setActiveIndex(idx)
  })

  const activeIndustry = industries[activeIndex]
  let activeImageUrl: string | null = null
  if (activeIndustry?.image) {
    if (typeof activeIndustry.image === 'object' && activeIndustry.image !== null) {
      activeImageUrl = (activeIndustry.image as { url?: string }).url ?? null
    } else if (typeof activeIndustry.image === 'string') {
      activeImageUrl = activeIndustry.image
    }
  }

  return (
    <div
      ref={outerRef}
      className={styles.outer}
      style={{ height: `calc(100vh * ${Math.max(industries.length, 1)})` }}
    >
      <div className={styles.sticky}>
        <div className={styles.inner}>
          {/* Left — image */}
          <div className={styles.imageCol}>
            <AnimatePresence mode="wait">
              {activeImageUrl && (
                <motion.div
                  key={activeIndex}
                  className={styles.imageWrapper}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src={activeImageUrl}
                    alt={activeIndustry?.name ?? ''}
                    fill
                    className={styles.image}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right — list */}
          <div className={styles.listCol}>
            {mainTitle && <h2 className={styles.mainTitle}>{mainTitle}</h2>}

            <div className={styles.list}>
              {industries.map((industry, i) => {
                const isActive = i === activeIndex
                return (
                  <div key={industry.id ?? i} className={styles.listItem}>
                    {isActive && (
                      <motion.div
                        layoutId="industry-active-bg"
                        className={styles.activeBg}
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                    <span
                      className={[
                        styles.industryName,
                        isActive ? styles.industryNameActive : '',
                      ].join(' ')}
                    >
                      {isActive && <span className={styles.activeDot}>●</span>}
                      {industry.name}
                    </span>
                    {!isActive && i < industries.length - 1 && <div className={styles.separator} />}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
