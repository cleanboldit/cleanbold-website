'use client'

import styles from './Projects.module.css'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

interface ProjectsProps {
  data: any[]
  categories: any[]
  settings: any
}

export default function Projects({ data, categories, settings }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredProjects =
    selectedCategory === 'All'
      ? data
      : data.filter((project: any) => {
          const category =
            typeof project.category === 'object' ? project.category?.name : project.category
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
          <p className={styles['section-label-projects']}>{settings?.sectionLabel}</p>
          <h2 className={styles['projects-main-title']}>{settings?.mainTitle}</h2>
          <p className={styles['projects-description']}>{settings?.description}</p>
        </motion.div>

        <motion.div
          className={styles['category-filters']}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {[...(categories || [])].reverse().map((category: any, index: number) => (
            <motion.button
              key={category.id || index}
              className={`${styles['filter-btn']} ${selectedCategory === category.name ? styles.active : ''}`}
              onClick={() => setSelectedCategory(category.name)}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        <div className={styles['projects-grid-layout']}>
          {filteredProjects?.map((project: any, index: number) => {
            const imageUrl = typeof project.image === 'object' ? project.image?.url : project.image
            const categoryName =
              typeof project.category === 'object' ? project.category?.name : project.category

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
                    <Image
                      src={imageUrl || '/project/project-1.png'}
                      alt={project.title}
                      width={800}
                      height={600}
                      className={styles['project-image']}
                    />
                    <span
                      className={`${styles['project-category-badge']} ${index % 2 === 1 ? styles['badge-right'] : ''}`}
                    >
                      {categoryName}
                    </span>
                  </div>
                  <div className={styles['project-content']}>
                    <h3 className={styles['project-title']}>{project.title}</h3>
                    {project.description && (
                      <p className={styles['project-desc']}>{project.description}</p>
                    )}
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
            {settings?.exploreButtonText || 'Explore More'}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
