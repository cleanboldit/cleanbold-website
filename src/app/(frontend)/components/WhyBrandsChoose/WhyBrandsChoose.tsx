'use client'

import { motion, useReducedMotion } from 'framer-motion'
import styles from './WhyBrandsChoose.module.css'

interface Feature {
  id?: string
  text: string
}

interface ApproachStep {
  id?: string
  title: string
  description?: string
}

interface BrandSection {
  id?: string
  sectionLabel?: string
  mainHeading?: string
  description?: string
  featuresTitle?: string
  features?: Feature[]
  approachSteps?: ApproachStep[]
}

interface WhyBrandsChooseProps {
  block: {
    sections?: BrandSection[]
  }
}

const bgImages = ['/one-1.png', '/two-2.png', '/three-3.png']

function SectionCard({ section, index }: { section: BrandSection; index: number }) {
  const bg = bgImages[index] ?? bgImages[0]
  const hasFeatures = (section.features?.length ?? 0) > 0
  const hasSteps = (section.approachSteps?.length ?? 0) > 0
  const reduceMotion = useReducedMotion()

  return (
    <div
      className={styles.card}
      style={{ backgroundImage: `url('${bg}')`, zIndex: index + 1 }}
    >
      <motion.div
        className={styles.cardInner}
        initial={{ opacity: 0, y: reduceMotion ? 0 : 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.cardLeft}>
          {section.sectionLabel && (
            <p className={styles.sectionLabel}>{section.sectionLabel}</p>
          )}
          <h2 className={styles.cardTitle}>{section.mainHeading}</h2>
          <p className={styles.cardDescription}>{section.description}</p>
        </div>

        <div className={styles.cardDivider} aria-hidden="true" />

        <div className={styles.cardRight}>
          {hasFeatures && (
            <>
              {section.featuresTitle && (
                <p className={styles.listLabel}>{section.featuresTitle}</p>
              )}
              <ul className={styles.itemList}>
                {section.features!.map((f, i) => (
                  <li key={f.id ?? i} className={styles.listItem}>
                    <span className={styles.bullet} aria-hidden="true" />
                    {f.text}
                  </li>
                ))}
              </ul>
            </>
          )}

          {hasSteps && (
            <ul className={styles.itemList}>
              {section.approachSteps!.map((step, i) => (
                <li key={step.id ?? i} className={styles.stepItem}>
                  <span className={styles.stepTitle}>{step.title}</span>
                  {step.description && (
                    <span className={styles.stepDesc}>{step.description}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default function WhyBrandsChoose({ block }: WhyBrandsChooseProps) {
  const sections = block.sections ?? []

  return (
    <section className={styles.section}>
      {sections.map((s, i) => (
        <SectionCard key={s.id ?? i} section={s} index={i} />
      ))}
    </section>
  )
}
