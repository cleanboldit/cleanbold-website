'use client'

import styles from './Projects.module.css'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

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

        <div className={styles['projects-grid-layout']}>
          {filteredProjects?.map((project: Project, index: number) => {
            const imageUrl = typeof project.image === 'object' ? project.image?.url : project.image
            const categoryName =
              typeof project.category === 'string' ? project.category : project.category?.name

            return (
              <motion.div
                key={project.id || index}
                className={`${styles['project-card-item']} ${project.size === 'large' ? styles['project-large'] : styles['project-small']}`}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
              >
                <div className={styles['project-card-inner']}>
                  <div className={styles['project-image-container']}>
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={categoryName ?? ''}
                        width={800}
                        height={600}
                        className={styles['project-image']}
                      />
                    )}
                    <span className={styles['project-category-badge']}>{categoryName}</span>
                  </div>
                </div>
              </motion.div>
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
