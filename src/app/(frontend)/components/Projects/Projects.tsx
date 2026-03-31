'use client'

import './Projects.css'
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
    <section className="projects-section">
      <div className="projects-container">
        <motion.div
          className="projects-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="section-label-projects">{settings?.sectionLabel}</p>
          <h2 className="projects-main-title">{settings?.mainTitle}</h2>
          <p className="projects-description">{settings?.description}</p>
        </motion.div>

        <motion.div
          className="category-filters"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {[...(categories || [])].reverse().map((category: any, index: number) => (
            <motion.button
              key={category.id || index}
              className={`filter-btn ${selectedCategory === category.name ? 'active' : ''}`}
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

        <div className="projects-grid-layout">
          {filteredProjects?.map((project: any, index: number) => {
            const imageUrl = typeof project.image === 'object' ? project.image?.url : project.image
            const categoryName =
              typeof project.category === 'object' ? project.category?.name : project.category

            return (
              <motion.div
                key={project.id || index}
                className={`project-card-item ${project.size === 'large' ? 'project-large' : 'project-small'}`}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
              >
                <div className="project-card-inner">
                  <div className="project-image-container">
                    <Image
                      src={imageUrl || '/project/project-1.png'}
                      alt={project.title}
                      width={800}
                      height={600}
                      className="project-image"
                    />
                    <span
                      className={`project-category-badge ${index % 2 === 1 ? 'badge-right' : ''}`}
                    >
                      {categoryName}
                    </span>
                  </div>
                  <div className="project-content">
                    <h3 className="project-title">{project.title}</h3>
                    {project.description && <p className="project-desc">{project.description}</p>}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="projects-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button className="explore-more-btn">
            {settings?.exploreButtonText || 'Explore More'}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
