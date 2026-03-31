'use client'

import styles from './Header.module.css'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

interface HeaderProps {
  data: any
}

export default function Header({ data }: HeaderProps) {
  const [isServicesOpen, setIsServicesOpen] = useState(false)

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const element = document.getElementById(targetId.replace('#', ''))
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  const logoUrl = typeof data.logo === 'object' ? data.logo?.url : data.logo

  return (
    <motion.header
      className={styles.header}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles['header-container']}>
        <a
          href="#hero"
          className={styles['logo-link']}
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <motion.div
            className={styles['logo-image-wrapper']}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src={logoUrl || '/logo-1.png'}
              alt="Logo"
              width={150}
              height={40}
              className={styles['logo-image']}
              priority
            />
          </motion.div>
        </a>

        <nav className={styles['nav-left']}>
          {data.navigation?.map((item: any, index: number) => (
            <motion.div
              key={index}
              className={
                item.hasDropdown
                  ? `${styles['nav-item']} ${styles['services-dropdown']}`
                  : styles['nav-item']
              }
              onMouseEnter={item.hasDropdown ? () => setIsServicesOpen(true) : undefined}
              onMouseLeave={item.hasDropdown ? () => setIsServicesOpen(false) : undefined}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <a href={item.url} onClick={(e) => handleSmoothScroll(e, item.url)}>
                {item.label}
                {item.hasDropdown && (
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={
                      isServicesOpen
                        ? `${styles['dropdown-arrow']} ${styles.open}`
                        : styles['dropdown-arrow']
                    }
                  >
                    <path
                      d="M1 1.5L6 6.5L11 1.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </a>
            </motion.div>
          ))}
        </nav>

        <motion.div
          className={styles['header-cta']}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          <a
            href={data.ctaButton?.url || '#contact'}
            className={styles['lets-work-btn']}
            onClick={(e) => handleSmoothScroll(e, data.ctaButton?.url || '#contact')}
          >
            {data.ctaButton?.text || "Let's Work Together"}
          </a>
        </motion.div>
      </div>
    </motion.header>
  )
}
