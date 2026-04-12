'use client'

import styles from './Projects.module.css'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useCallback, useEffect, useRef } from 'react'

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
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const dragState = useRef({ startX: 0, scrollLeft: 0 })

  const categories: string[] = Array.from(
    new Set(
      projects
        .map((p: Project) => (typeof p.category === 'string' ? p.category : p.category?.name))
        .filter((c): c is string => Boolean(c)),
    ),
  ).reverse()

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((project: Project) => {
          const category =
            typeof project.category === 'string' ? project.category : project.category?.name
          return category === selectedCategory
        })

  // Update scroll progress
  const updateProgress = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setScrollProgress(max > 0 ? el.scrollLeft / max : 0)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    el.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()
    return () => el.removeEventListener('scroll', updateProgress)
  }, [updateProgress, filteredProjects])

  // Drag to scroll
  const handlePointerDown = (e: React.PointerEvent) => {
    const el = trackRef.current
    if (!el) return
    setIsDragging(true)
    dragState.current = { startX: e.clientX, scrollLeft: el.scrollLeft }
    el.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return
    const el = trackRef.current
    if (!el) return
    const dx = e.clientX - dragState.current.startX
    el.scrollLeft = dragState.current.scrollLeft - dx
  }

  const handlePointerUp = () => {
    setIsDragging(false)
  }

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

        {/* Top bar: filters + arrows */}
        <div className={styles['top-bar']}>
          <motion.div
            className={styles['category-filters']}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {['All', ...categories].map((cat: string, i: number) => (
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

      {/* ═══ Filmstrip Gallery — full bleed ═══ */}
      <div
        className={`${styles['film-track']} ${isDragging ? styles['film-track-grabbing'] : ''}`}
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {filteredProjects.map((project, index) => {
          const imageUrl = typeof project.image === 'object' ? project.image?.url : project.image
          const videoUrl = typeof project.video === 'object' ? project.video?.url : project.video
          const categoryName =
            typeof project.category === 'string' ? project.category : project.category?.name
          const isOdd = index % 2 === 1

          return (
            <motion.div
              key={project.id || `project-${index}`}
              className={`${styles['film-card']} ${isOdd ? styles['film-card-offset'] : ''}`}
              initial={{ opacity: 0, y: 60, scale: 0.92, rotate: isOdd ? 2 : -2 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
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
                    sizes="(max-width: 768px) 72vw, 380px"
                    loading="lazy"
                    draggable={false}
                  />
                ) : null}
                {/* Category reveal on hover */}
                {categoryName && (
                  <div className={styles['film-card-overlay']}>
                    <span className={styles['film-card-category']}>{categoryName}</span>
                  </div>
                )}
              </div>
              {/* Card number below */}
              <span className={styles['film-card-index']}>
                {String(index + 1).padStart(2, '0')}
              </span>
            </motion.div>
          )
        })}
      </div>

      {/* Progress bar + CTA */}
      <div className={styles['projects-inner']}>
        <div className={styles['bottom-bar']}>
          <div className={styles['progress-track']}>
            <motion.div
              className={styles['progress-fill']}
              animate={{ scaleX: scrollProgress || 0.02 }}
              transition={{ type: 'tween', duration: 0.15, ease: 'easeOut' }}
            />
          </div>
          <span className={styles['scroll-hint']}>Drag to explore</span>
        </div>

        <motion.div
          className={styles['projects-cta']}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button className={styles['explore-more-btn']}>
            {exploreButtonText || 'Explore More'}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
