'use client'

import styles from './WhyBrandsChoose.module.css'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface WhyBrandsChooseProps {
  block: {
    sections?: any[]
  }
}

export default function WhyBrandsChoose({ block }: WhyBrandsChooseProps) {
  const data = block.sections ?? []
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  return (
    <section className={styles['why-brands-scroll-section']} ref={containerRef}>
      {/* Section 1: Why Brands Choose */}
      <div
        className={`${styles['why-brands-section-1']} ${styles['sticky-section']}`}
        style={{ top: 0 }}
      >
        <div className={styles['timeline-container']}>
          <div className={styles['timeline-line-progress']}></div>
          <motion.div
            className={`${styles['timeline-dot']} ${styles['active']}`}
            style={{
              scale: useTransform(scrollYProgress, [0, 0.2], [0, 1]),
            }}
          ></motion.div>
        </div>

        <div className={styles['why-brands-content-wrapper']}>
          {data?.[0] && (
            <motion.div
              className={styles['why-brands-content']}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className={styles['section-label-white']}>{data[0].sectionLabel}</p>
              <h2 className={styles['main-heading-white']}>{data[0].mainHeading}</h2>
              <p className={styles['description-white']}>{data[0].description}</p>

              <div className={styles['divider-line-white']}></div>

              {data[0].features && data[0].features.length > 0 && (
                <div className={styles['features-section']}>
                  <h3 className={styles['features-title-white']}>{data[0].featuresTitle}</h3>
                  <div className={styles['features-grid-two-col']}>
                    <div className={styles['features-column']}>
                      {data[0].features
                        .slice(0, Math.ceil(data[0].features.length / 2))
                        .map((feature: any, index: number) => (
                          <div key={index} className={styles['feature-item-white']}>
                            <span className={styles['feature-bullet-white']}></span>
                            <p>{feature.text}</p>
                          </div>
                        ))}
                    </div>
                    <div className={styles['features-column']}>
                      {data[0].features
                        .slice(Math.ceil(data[0].features.length / 2))
                        .map((feature: any, index: number) => (
                          <div key={index} className={styles['feature-item-white']}>
                            <span className={styles['feature-bullet-white']}></span>
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
      <div
        className={`${styles['why-brands-section-2']} ${styles['sticky-section']}`}
        style={{ top: 0 }}
      >
        <div className={styles['timeline-container']}>
          <div className={styles['timeline-line-progress']}></div>
          <motion.div
            className={`${styles['timeline-dot']} ${styles['active']}`}
            style={{
              scale: useTransform(scrollYProgress, [0.3, 0.5], [0, 1]),
            }}
          ></motion.div>
        </div>

        <div className={styles['why-brands-content-wrapper']}>
          <motion.div
            className={styles['why-brands-content']}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className={styles['section-label-white']}>Our Approach</p>
            <h2 className={styles['main-heading-white']}>Clarity. Creativity. Impact.</h2>
            <p className={styles['description-white']}>
              Most agencies separate creativity from performance; we fuse them. At Cleanbold,
              strategy, storytelling, and scaling work together in one cohesive system.
            </p>

            <div className={styles['divider-line-white']}></div>

            {data[1]?.approachSteps && data[1].approachSteps.length > 0 && (
              <div className={styles['approach-grid']}>
                {data[1].approachSteps.map((step: any, index: number) => (
                  <motion.div
                    key={index}
                    className={styles['approach-item']}
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
      <div
        className={`${styles['why-brands-section-3']} ${styles['sticky-section']}`}
        style={{ top: 0 }}
      >
        <div className={styles['timeline-container']}>
          <div className={styles['timeline-line-progress']}></div>
          <motion.div
            className={`${styles['timeline-dot']} ${styles['active']}`}
            style={{
              scale: useTransform(scrollYProgress, [0.6, 0.8], [0, 1]),
            }}
          ></motion.div>
        </div>

        <div className={styles['why-brands-content-wrapper']}>
          {data?.[2] && (
            <motion.div
              className={styles['why-brands-content']}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className={styles['section-label-white']}>{data[2].sectionLabel}</p>
              <h2 className={styles['main-heading-white']}>{data[2].mainHeading}</h2>
              <p className={styles['description-white']}>{data[2].description}</p>

              <div className={styles['divider-line-white']}></div>

              {data[2].features && data[2].features.length > 0 && (
                <div className={styles['features-grid-two-col']}>
                  <div className={styles['features-column']}>
                    {data[2].features
                      .slice(0, Math.ceil(data[2].features.length / 2))
                      .map((feature: any, index: number) => (
                        <div key={index} className={styles['feature-item-white']}>
                          <span className={styles['feature-bullet-white']}></span>
                          <p>{feature.text}</p>
                        </div>
                      ))}
                  </div>
                  <div className={styles['features-column']}>
                    {data[2].features
                      .slice(Math.ceil(data[2].features.length / 2))
                      .map((feature: any, index: number) => (
                        <div key={index} className={styles['feature-item-white']}>
                          <span className={styles['feature-bullet-white']}></span>
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
