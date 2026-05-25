'use client'

import styles from './Projects.module.css'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState, useEffect, useRef, memo } from 'react'
import { getProjectRouteHref } from '@/lib/project-route'

const IO_ROOT_MARGIN = '200px'
const MIN_MARQUEE_DURATION_SECONDS = 12
const SECONDS_PER_PROJECT = 4

const observerCallbacks = new Map<Element, (entry: IntersectionObserverEntry) => void>()
let sharedObserver: IntersectionObserver | null = null

function getSharedObserver(): IntersectionObserver | null {
  if (typeof window === 'undefined') return null
  if (sharedObserver) return sharedObserver
  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const cb = observerCallbacks.get(entry.target)
        if (cb) cb(entry)
      }
    },
    { rootMargin: IO_ROOT_MARGIN },
  )
  return sharedObserver
}

function observeUntilVisible(
  element: Element,
  onVisible: (entry: IntersectionObserverEntry) => void,
): () => void {
  const observer = getSharedObserver()
  if (!observer) return () => {}
  const wrapped = (entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) {
      onVisible(entry)
      observer.unobserve(element)
      observerCallbacks.delete(element)
    }
  }
  observerCallbacks.set(element, wrapped)
  observer.observe(element)
  return () => {
    observer.unobserve(element)
    observerCallbacks.delete(element)
  }
}

function logPlayError(err: unknown) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn('[LazyVideo] play() failed:', err)
  }
}

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

const LazyVideo = memo(function LazyVideo({
  src,
  className,
  title,
  isVisible,
}: {
  src: string
  className: string
  title: string
  isVisible: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const isVisibleRef = useRef(isVisible)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    isVisibleRef.current = isVisible
  }, [isVisible])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const currentSrc = video.getAttribute('src')
    if (currentSrc === src) return

    if (currentSrc) {
      video.src = src
      video.load()
      setReady(false)
      if (isVisibleRef.current) video.play().catch(logPlayError)
      return
    }

    return observeUntilVisible(video, () => {
      video.src = src
      video.load()
      if (isVisibleRef.current) video.play().catch(logPlayError)
    })
  }, [src])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !video.getAttribute('src')) return
    if (isVisible) {
      video.play().catch(logPlayError)
    } else {
      video.pause()
    }
  }, [isVisible])

  return (
    <video
      ref={videoRef}
      className={className}
      muted
      loop
      playsInline
      preload="none"
      draggable={false}
      aria-label={title}
      onCanPlay={() => setReady(true)}
      style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.3s ease' }}
    />
  )
})

function getCategoryName(category: Project['category']): string | undefined {
  return typeof category === 'string' ? category : category?.name
}

const ProjectCard = memo(function ProjectCard({
  project,
  isVisible,
  isSecondHalf,
}: {
  project: Project
  isVisible: boolean
  isSecondHalf: boolean
}) {
  const imageUrl = typeof project.image === 'object' ? project.image?.url : project.image
  const videoUrl = typeof project.video === 'object' ? project.video?.url : project.video
  const categoryName = getCategoryName(project.category)
  const projectHref = getProjectRouteHref(project as Record<string, unknown>)
  const title = project.title || categoryName || 'Project'

  const cardFrame = (
    <div className={styles['film-card-frame']}>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt=""
          fill
          className={styles['film-card-img']}
          sizes="(max-width: 768px) 72vw, 340px"
          loading="lazy"
          draggable={false}
        />
      )}
      {videoUrl && (
        <LazyVideo
          src={videoUrl}
          className={styles['film-card-video']}
          title={title}
          isVisible={isVisible}
        />
      )}
      {(categoryName || project.title) && (
        <div className={styles['film-card-overlay']} aria-hidden="true">
          {categoryName && <span className={styles['film-card-category']}>{categoryName}</span>}
          {project.title && <p className={styles['film-card-title']}>{project.title}</p>}
        </div>
      )}
    </div>
  )

  return (
    <div
      className={`${styles['film-card']} ${projectHref ? styles['film-card-clickable'] : ''} ${!isVisible ? styles['film-card-hidden'] : ''}`}
      aria-hidden={!isVisible || isSecondHalf ? true : undefined}
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
})

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

  const marqueeItems = useMemo(() => [...projects, ...projects], [projects])

  const visibleCount = useMemo(() => {
    if (selectedCategory === 'All') return projects.length
    return projects.filter((p) => getCategoryName(p.category) === selectedCategory).length
  }, [projects, selectedCategory])

  const duration = useMemo(
    () => Math.max(MIN_MARQUEE_DURATION_SECONDS, visibleCount * SECONDS_PER_PROJECT),
    [visibleCount],
  )

  const marqueeInnerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const inner = marqueeInnerRef.current
    if (!inner) return
    inner.style.animation = 'none'
    void inner.offsetWidth // force reflow so the animation restarts from 0 instead of continuing mid-keyframe
    inner.style.animation = ''
  }, [selectedCategory])

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
        {visibleCount === 0 ? (
          <p className={styles['empty-state']}>No projects in this category yet.</p>
        ) : (
          <div
            ref={marqueeInnerRef}
            className={styles['marquee-inner']}
            style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
          >
            {marqueeItems.map((project, index) => {
              const categoryName = getCategoryName(project.category)
              const isVisible = selectedCategory === 'All' || categoryName === selectedCategory
              const isSecondHalf = index >= projects.length
              return (
                <ProjectCard
                  key={`${project.id ?? index}-${isSecondHalf ? 'b' : 'a'}`}
                  project={project}
                  isVisible={isVisible}
                  isSecondHalf={isSecondHalf}
                />
              )
            })}
          </div>
        )}
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
