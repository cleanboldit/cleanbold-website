'use client'

import './OurWork.css'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

interface CoreOfferingsProps {
  data: any[]
  settings: any
}

export default function CoreOfferings({ data, settings }: CoreOfferingsProps) {
  const ref = useRef(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const handlePrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -380, behavior: 'smooth' })
    }
  }

  const handleNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 380, behavior: 'smooth' })
    }
  }

  // Debug: log imagePosition of each offering
  data.forEach((offering) => {
    const normalized = offering.imagePosition?.toString().toLowerCase().trim() || 'top'
    console.log('Original:', offering.imagePosition, 'Normalized:', normalized)
  })

  return (
    <section className="core-offerings" ref={ref}>
      <div className="offerings-container">
        <motion.div
          className="offerings-header"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="offerings-header-content">
            <p className="section-label">{settings?.sectionLabel}</p>
            <h2>{settings?.mainTitle}</h2>
            <p className="section-description">{settings?.description}</p>
          </div>

          <div className="offerings-header-controls">
            <button className="carousel-btn prev" onClick={handlePrev} aria-label="Previous">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <button className="carousel-btn next" onClick={handleNext} aria-label="Next">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </motion.div>

        <div className="offerings-carousel">
          <div className="offerings-scroll" ref={scrollRef}>
            {data?.map((offering: any, index: number) => {
              const imageUrl =
                typeof offering.image === 'object' ? offering.image?.url : offering.image
              const backgroundImage = `/coreoffering/Image-${(index % 4) + 1}.png`
              // Normalize imagePosition to handle case sensitivity and whitespace
              const imagePosition = offering.imagePosition?.toString().toLowerCase().trim() || 'top'
              const isTop = imagePosition === 'top'
              const isBottom = imagePosition === 'bottom'

              return (
                <motion.div
                  key={offering.id || index}
                  className={`offering-card ${isTop ? 'image-top' : 'image-bottom'}`}
                  style={{
                    backgroundImage: `url('${backgroundImage}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  {isTop && (
                    <div className="card-image-top">
                      <Image
                        src={imageUrl || '/hero-image.png'}
                        alt={offering.title}
                        width={280}
                        height={200}
                        className="offering-img"
                      />
                    </div>
                  )}

                  {isBottom && (
                    <div className="card-image-bottom">
                      <Image
                        src={imageUrl || '/hero-image.png'}
                        alt={offering.title}
                        width={280}
                        height={200}
                        className="offering-img"
                      />
                    </div>
                  )}

                  <div className="card-content">
                    <h2>{offering.title}</h2>
                    <p>{offering.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
        <motion.div
          className="offerings-cta-container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <button className="offerings-cta">
            {settings?.exploreButtonText || ' Explore All Services'}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
