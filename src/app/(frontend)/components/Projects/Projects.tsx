'use client'

import styles from './Projects.module.css'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { getProjectRouteHref } from '@/lib/project-route'

interface Project {
  id?: string
  title?: string
  category?: string | { name?: string }
  route?: string | null
  image?: { url?: string } | string | null
  video?: { url?: string; mimeType?: string } | string | null
  projectDescription?: unknown
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

function getCategoryName(category: Project['category']): string | undefined {
  return typeof category === 'string' ? category : category?.name
}

export default function Projects({ block }: ProjectsProps) {
  const { projects = [], sectionLabel, mainTitle, description, exploreButtonText } = block
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = useMemo(
    () =>
      Array.from(
        new Set(
          projects.map((p) => getCategoryName(p.category)).filter((c): c is string => Boolean(c)),
        ),
      ).reverse(),
    [projects],
  )

  const filteredProjects = useMemo(
    () =>
      selectedCategory === 'All'
        ? projects
        : projects.filter((p) => getCategoryName(p.category) === selectedCategory),
    [projects, selectedCategory],
  )

  const marqueeItems = useMemo(
    () => [...filteredProjects, ...filteredProjects],
    [filteredProjects],
  )

  const duration = useMemo(() => Math.max(12, filteredProjects.length * 4), [filteredProjects])

  return (
    <section className={styles['projects-section']} aria-labelledby="projects-title">
      <div className={styles['projects-inner']}>
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
            id="projects-title"
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

        <motion.div
          className={styles['category-filters']}
          role="group"
          aria-label="Filter projects by category"
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
              aria-pressed={selectedCategory === cat}
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

      <div className={styles['marquee-outer']} aria-label="Project showcase" role="region">
        <div
          className={styles['marquee-inner']}
          style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
        >
          {marqueeItems.map((project, index) => {
            const imageUrl =
              typeof project.image === 'object' ? project.image?.url : project.image
            const videoUrl =
              typeof project.video === 'object' ? project.video?.url : project.video
            const categoryName = getCategoryName(project.category)
            const projectHref = getProjectRouteHref(project as Record<string, unknown>)
            const title = project.title || categoryName || 'Project'

            const cardFrame = (
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
                    aria-label={title}
                  />
                ) : imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className={styles['film-card-img']}
                    sizes="(max-width: 768px) 72vw, 340px"
                    loading="lazy"
                    draggable={false}
                  />
                ) : null}
                {(categoryName || project.title) && (
                  <div className={styles['film-card-overlay']} aria-hidden="true">
                    {categoryName && (
                      <span className={styles['film-card-category']}>{categoryName}</span>
                    )}
                    {project.title && (
                      <p className={styles['film-card-title']}>{project.title}</p>
                    )}
                  </div>
                )}
              </div>
            )

            return (
              <div
                key={`${project.id ?? index}-${index}`}
                className={`${styles['film-card']} ${projectHref ? styles['film-card-clickable'] : ''}`}
                aria-hidden={index >= filteredProjects.length ? true : undefined}
              >
                {projectHref ? (
                  <Link
                    href={projectHref}
                    className={styles['film-card-link']}
                    aria-label={`View project: ${title}`}
                  >
                    {cardFrame}
                  </Link>
                ) : (
                  cardFrame
                )}
              </div>
            )
          })}
        </div>
      </div>

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
