'use client'

import './FeaturedClients.css'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface FeaturedClientsProps {
  data: any[]
  settings: any
}

export default function FeaturedClients({ data, settings }: FeaturedClientsProps) {
  return (
    <section className="featured-clients-section">
      <div className="clients-container">
        <motion.div
          className="clients-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="section-label">{settings?.sectionLabel || 'Featured Clients/Impact'}</p>
          <h2 style={{ fontSize: '45px', fontStyle: 'Biennale', fontWeight: '600' }}>
            {settings?.mainTitle || 'Brands That Trusted The Bold'}
            <span className="dot-accent">.</span>
          </h2>
          <p className="section-description">
            {settings?.description ||
              'From real estate giants to fashion disruptors, our work powers growth for ambitious brands across industries.'}
          </p>
        </motion.div>

        <div className="clients-grid-wrapper">
          {data?.map((client: any, index: number) => {
            const logoUrl = typeof client.logo === 'object' ? client.logo?.url : client.logo
            return (
              <div key={index} className="client-brand-card">
                <Image
                  src={logoUrl || '/brand/brand-1.png'}
                  alt={client.name || `Brand ${index + 1}`}
                  width={200}
                  height={100}
                  className="client-brand-logo"
                />
              </div>
            )
          })}
        </div>

        <motion.div
          className="clients-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <button className="see-work-btn">{settings?.ctaButtonText || 'See Our Work'}</button>
        </motion.div>
      </div>
    </section>
  )
}
