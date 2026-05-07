'use client'

import styles from './Projects.module.css'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

interface Project {
  id?: string
  category?: string | { name?: string }
  image?: { url?: string } | string | null
  video?: { url?: string; mimeType?: string } | string | null
  size?: string
}

interface ProjectsProps {
  block: {
    sectionLabel?: string
    mainTitle?: string
    description?: string
    exploreButtonText?: string
    projects?: Project[]
  }
}

export default function Projects({ block }: ProjectsProps) {
  const { projects = [], sectionLabel, mainTitle, description, exploreButtonText } = block
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories: string[] = Array.from(
    new Set(
      projects
        .map((p) => (typeof p.category === 'string' ? p.category : p.category?.name))
        .filter((c): c is string => Boolean(c)),
    ),
  ).reverse()

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => {
          const cat = typeof p.category === 'string' ? p.category : p.category?.name
          return cat === selectedCategory
        })

  // Double the array for seamless marquee loop
  const marqueeItems = [...filteredProjects, ...filteredProjects]
  const duration = Math.max(12, filteredProjects.length * 4)

  return (
    <section className={styles['projects-section']}>
      <div className={styles['projects-inner']}>
        {/* Header */}
        <div className={styles['projects-header']}>
          <motion.p
            className={styles['section-label-projects']}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {sectionLabel}
          </motion.p>
          <motion.h2
            className={styles['projects-main-title']}
            initial={{ opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)' }}
            whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            {mainTitle}
          </motion.h2>
          <motion.p
            className={styles['projects-description']}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            {description}
          </motion.p>
        </div>

        {/* Category filters */}
        <div className={styles['top-bar']}>
          <motion.div
            className={styles['category-filters']}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {['All', ...categories].map((cat, i) => (
              <motion.button
                key={cat}
                className={`${styles['filter-btn']} ${selectedCategory === cat ? styles.active : ''}`}
                onClick={() => setSelectedCategory(cat)}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Infinite marquee track */}
      <div className={styles['marquee-outer']}>
        <div
          className={styles['marquee-inner']}
          style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
        >
          {marqueeItems.map((project, index) => {
            const imageUrl = typeof project.image === 'object' ? project.image?.url : project.image
            const videoUrl = typeof project.video === 'object' ? project.video?.url : project.video
            const categoryName =
              typeof project.category === 'string' ? project.category : project.category?.name

            return (
              <div key={`${project.id ?? index}-${index}`} className={styles['film-card']}>
                <div className={styles['film-card-frame']}>
                  {videoUrl ? (
                    <video
                      src={videoUrl}
                      className={styles['film-card-video']}
                      autoPlay
                      muted
                      loop
                      playsInline
                      draggable={false}
                    />
                  ) : imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={categoryName ?? ''}
                      fill
                      className={styles['film-card-img']}
                      sizes="(max-width: 768px) 72vw, 340px"
                      loading="lazy"
                      draggable={false}
                    />
                  ) : null}
                  {categoryName && (
                    <div className={styles['film-card-overlay']}>
                      <span className={styles['film-card-category']}>{categoryName}</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* CTA */}
      <div className={styles['projects-inner']}>
        <motion.div
          className={styles['projects-cta']}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a href="#contact" className={styles['explore-more-btn']}>
            {exploreButtonText || 'Own The Spotlight'}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
