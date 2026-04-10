'use client'

import styles from './Projects.module.css'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useRef, useCallback } from 'react'

interface Project {
  id?: string
  category?: string | { name?: string }
  image?: { url?: string } | string | null
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
  const scrollRef = useRef<HTMLDivElement>(null)
  const SEGMENTS = 5

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setScrollProgress(max > 0 ? el.scrollLeft / max : 0)
  }, [])

  // Derive unique category names from the inline project array
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

  return (
    <section className={styles['projects-section']}>
      <div className={styles['projects-container']}>
        <motion.div
          className={styles['projects-header']}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className={styles['section-label-projects']}>{sectionLabel}</p>
          <h2 className={styles['projects-main-title']}>{mainTitle}</h2>
          <p className={styles['projects-description']}>{description}</p>
        </motion.div>

        <motion.div
          className={styles['category-filters']}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {['All', ...categories].map((cat: string, index: number) => (
            <motion.button
              key={cat}
              className={`${styles['filter-btn']} ${selectedCategory === cat ? styles.active : ''}`}
              onClick={() => setSelectedCategory(cat)}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        <div className={styles['masonry-scroll-outer']} ref={scrollRef} onScroll={handleScroll}>
          <div className={styles['masonry-grid']}>
            {filteredProjects.map((project, index) => {
              const imageUrl =
                typeof project.image === 'object' ? project.image?.url : project.image
              const categoryName =
                typeof project.category === 'string' ? project.category : project.category?.name
              return (
                <motion.div
                  key={project.id || index}
                  className={styles['masonry-item']}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
                >
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={categoryName ?? ''}
                      width={800}
                      height={600}
                      className={styles['masonry-img']}
                    />
                  )}
                  {categoryName && (
                    <span className={styles['project-category-badge']}>{categoryName}</span>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Custom scroll indicator */}
        <div className={styles['scroll-indicator']}>
          {Array.from({ length: SEGMENTS }).map((_, i) => {
            const segStart = i / SEGMENTS
            const segEnd = (i + 1) / SEGMENTS
            const active = scrollProgress >= segStart && scrollProgress < segEnd
            return (
              <span
                key={i}
                className={`${styles['scroll-seg']} ${active ? styles['scroll-seg-active'] : ''}`}
              />
            )
          })}
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
