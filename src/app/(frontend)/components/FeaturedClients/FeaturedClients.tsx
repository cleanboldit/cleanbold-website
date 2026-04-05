'use client'

import styles from './FeaturedClients.module.css'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface FeaturedClientsProps {
  block: {
    sectionLabel?: string
    mainTitle?: string
    description?: string
    ctaButtonText?: string
    clients?: any[]
  }
}

export default function FeaturedClients({ block }: FeaturedClientsProps) {
  const { clients = [], sectionLabel, mainTitle, description, ctaButtonText } = block
  return (
    <section className={styles['featured-clients-section']}>
      <div className={styles['clients-container']}>
        <motion.div
          className={styles['clients-header']}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className={styles['section-label']}>{sectionLabel || 'Featured Clients/Impact'}</p>
          <h2 style={{ fontSize: '45px', fontStyle: 'Biennale', fontWeight: '600' }}>
            {mainTitle || 'Brands That Trusted The Bold'}
            <span className={styles['dot-accent']}>.</span>
          </h2>
          <p className={styles['section-description']}>
            {description ||
              'From real estate giants to fashion disruptors, our work powers growth for ambitious brands across industries.'}
          </p>
        </motion.div>

        <div className={styles['clients-grid-wrapper']}>
          {clients?.map((client: any, index: number) => {
            const logoUrl = typeof client.logo === 'object' ? client.logo?.url : client.logo
            if (!logoUrl) return null
            return (
              <div key={index} className={styles['client-brand-card']}>
                <Image
                  src={logoUrl}
                  alt={client.name || `Brand ${index + 1}`}
                  width={200}
                  height={100}
                  className={styles['client-brand-logo']}
                />
              </div>
            )
          })}
        </div>

        <motion.div
          className={styles['clients-cta']}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <button className={styles['see-work-btn']}>{ctaButtonText || 'See Our Work'}</button>
        </motion.div>
      </div>
    </section>
  )
}
