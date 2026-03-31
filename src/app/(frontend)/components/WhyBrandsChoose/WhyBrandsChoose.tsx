'use client'

import './WhyBrandsChoose.css'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface WhyBrandsChooseProps {
  data: any[]
}

export default function WhyBrandsChoose({ data }: WhyBrandsChooseProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  return (
    <section className="why-brands-scroll-section" ref={containerRef}>
      {/* Section 1: Why Brands Choose */}
      <div className="why-brands-section-1 sticky-section" style={{ top: 0 }}>
        <div className="timeline-container">
          <div className="timeline-line-progress"></div>
          <motion.div
            className="timeline-dot active"
            style={{
              scale: useTransform(scrollYProgress, [0, 0.2], [0, 1]),
            }}
          ></motion.div>
        </div>

        <div className="why-brands-content-wrapper">
          {data?.[0] && (
            <motion.div
              className="why-brands-content"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="section-label-white">{data[0].sectionLabel}</p>
              <h2 className="main-heading-white">{data[0].mainHeading}</h2>
              <p className="description-white">{data[0].description}</p>

              <div className="divider-line-white"></div>

              {data[0].features && data[0].features.length > 0 && (
                <div className="features-section">
                  <h3 className="features-title-white">{data[0].featuresTitle}</h3>
                  <div className="features-grid-two-col">
                    <div className="features-column">
                      {data[0].features
                        .slice(0, Math.ceil(data[0].features.length / 2))
                        .map((feature: any, index: number) => (
                          <div key={index} className="feature-item-white">
                            <span className="feature-bullet-white"></span>
                            <p>{feature.text}</p>
                          </div>
                        ))}
                    </div>
                    <div className="features-column">
                      {data[0].features
                        .slice(Math.ceil(data[0].features.length / 2))
                        .map((feature: any, index: number) => (
                          <div key={index} className="feature-item-white">
                            <span className="feature-bullet-white"></span>
                            <p>{feature.text}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Section 2: Our Approach */}
      <div className="why-brands-section-2 sticky-section" style={{ top: 0 }}>
        <div className="timeline-container">
          <div className="timeline-line-progress"></div>
          <motion.div
            className="timeline-dot active"
            style={{
              scale: useTransform(scrollYProgress, [0.3, 0.5], [0, 1]),
            }}
          ></motion.div>
        </div>

        <div className="why-brands-content-wrapper">
          <motion.div
            className="why-brands-content"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="section-label-white">Our Approach</p>
            <h2 className="main-heading-white">Clarity. Creativity. Impact.</h2>
            <p className="description-white">
              Most agencies separate creativity from performance; we fuse them. At Cleanbold,
              strategy, storytelling, and scaling work together in one cohesive system.
            </p>

            <div className="divider-line-white"></div>

            {data[1]?.approachSteps && data[1].approachSteps.length > 0 && (
              <div className="approach-grid">
                {data[1].approachSteps.map((step: any, index: number) => (
                  <motion.div
                    key={index}
                    className="approach-item"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Section 3: Where Creativity Meets Conversion */}
      <div className="why-brands-section-3 sticky-section" style={{ top: 0 }}>
        <div className="timeline-container">
          <div className="timeline-line-progress"></div>
          <motion.div
            className="timeline-dot active"
            style={{
              scale: useTransform(scrollYProgress, [0.6, 0.8], [0, 1]),
            }}
          ></motion.div>
        </div>

        <div className="why-brands-content-wrapper">
          {data?.[2] && (
            <motion.div
              className="why-brands-content"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="section-label-white">{data[2].sectionLabel}</p>
              <h2 className="main-heading-white">{data[2].mainHeading}</h2>
              <p className="description-white">{data[2].description}</p>

              <div className="divider-line-white"></div>

              {data[2].features && data[2].features.length > 0 && (
                <div className="features-grid-two-col">
                  <div className="features-column">
                    {data[2].features
                      .slice(0, Math.ceil(data[2].features.length / 2))
                      .map((feature: any, index: number) => (
                        <div key={index} className="feature-item-white">
                          <span className="feature-bullet-white"></span>
                          <p>{feature.text}</p>
                        </div>
                      ))}
                  </div>
                  <div className="features-column">
                    {data[2].features
                      .slice(Math.ceil(data[2].features.length / 2))
                      .map((feature: any, index: number) => (
                        <div key={index} className="feature-item-white">
                          <span className="feature-bullet-white"></span>
                          <p>{feature.text}</p>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
