'use client'

import styles from './StudioSection.module.css'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface StudioSectionProps {
  data: any
}

export default function StudioSection({ data }: StudioSectionProps) {
  const studioImages = ['/before-footer-1.png', '/before-footer-2.png', '/before-footer-3.png']

  // Duplicate images multiple times for seamless infinite loop
  const allImages = [...studioImages, ...studioImages, ...studioImages, ...studioImages]

  return (
    <section className={styles['studio-section']}>
      {/* First Part - Studio Images with White Background */}
      <div className={styles['studio-header-section']}>
        <div className={styles['studio-header-content']}>
          <motion.div
            className={styles['studio-text-content']}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className={styles['studio-title']}>
              Studio Cleanbold
              <br />
              Where Stories Are Shot.
            </h2>
          </motion.div>

          <motion.div
            className={styles['studio-description']}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p>
              Fashion and product shoot studio Ahmedabad with
              <br />
              professional lighting and modular sets.
            </p>
          </motion.div>
        </div>

        {/* Auto-scrolling Images - Infinite Loop */}
        <div className={styles['studio-images-wrapper']}>
          <div className={styles['studio-images-scroll']}>
            <div className={styles['studio-images-track']}>
              {allImages.map((image, index) => (
                <div key={index} className={styles['studio-image-item']}>
                  <Image
                    src={image}
                    alt={`Studio ${(index % studioImages.length) + 1}`}
                    width={600}
                    height={400}
                    className={styles['studio-image']}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Second Part - Marquee Section with Background */}
      <div className={styles['studio-marquee-section']}>
        <div className={styles['studio-marquee-wrapper']}>
          <div className={styles['studio-marquee-content']}>
            <span className={styles['studio-marquee-label']}>Perfect For:</span>
            <div className={styles['studio-marquee-track']}>
              <div className={styles['studio-marquee-items']}>
                <span className={styles['studio-marquee-item']}>● Fashion</span>
                <span className={styles['studio-marquee-item']}>● Jewellery</span>
                <span className={styles['studio-marquee-item']}>● Real Estate</span>
                <span className={styles['studio-marquee-item']}>● Product</span>
                <span className={styles['studio-marquee-item']}>● Campaign Shoots</span>
                {/* Duplicate for seamless loop */}
                <span className={styles['studio-marquee-item']}>● Fashion</span>
                <span className={styles['studio-marquee-item']}>● Jewellery</span>
                <span className={styles['studio-marquee-item']}>● Real Estate</span>
                <span className={styles['studio-marquee-item']}>● Product</span>
                <span className={styles['studio-marquee-item']}>● Campaign Shoots</span>
              </div>
            </div>
          </div>
        </div>

        {/* Third Part - Studio Details with Mixed Background */}
        <div className={styles['studio-details-section']}>
          <div className={styles['studio-details-container']}>
            <motion.div
              className={styles['studio-details-left']}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className={styles['studio-details-title']}>
                Ahmedabad&apos;s Creative Space Designed For
                <br />
                Brands, Creators, And Production Teams.
              </h3>
              <p className={styles['studio-details-description']}>
                Minimal yet versatile. With professional lighting, textured backdrops,
                <br />
                and modular setups, Studio Cleanbold adapts to every idea from
                <br />
                high-fashion to high-conversion.
              </p>
            </motion.div>

            <motion.div
              className={styles['studio-details-right']}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h4 className={styles['studio-location-title']}>Location:</h4>
              <p className={styles['studio-location-address']}>
                617, Money Plant High Street, Jagatpur Road, SG Highway,
                <br />
                Ahmedabad 382481.
              </p>
              <button className={styles['studio-book-btn']}>Book Studio</button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
