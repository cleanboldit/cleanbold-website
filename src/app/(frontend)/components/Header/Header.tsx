'use client'

import styles from './Header.module.css'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import type { Header as HeaderGlobal } from '@/payload-types'

interface HeaderProps {
  data: HeaderGlobal
}

function isAppRoute(url: string): boolean {
  return url.startsWith('/') && url.length > 1 && !url.startsWith('/#')
}

export default function Header({ data }: HeaderProps) {
  const pathname = usePathname()
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const isHome = pathname === '/'

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const id = targetId.replace(/^#/, '')
    const element = document.getElementById(id)
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

  const renderNavAnchor = (item: {
    label: string
    url?: string | null
    hasDropdown?: boolean | null
  }) => {
    const url = (item.url || '#').trim()

    if (isAppRoute(url)) {
      return (
        <Link href={url}>
          {item.label}
          {item.hasDropdown && (
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles['dropdown-arrow']}
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
        </Link>
      )
    }

    const isHash = url.startsWith('#')
    const homeSectionHref = isHash ? `/${url}` : url

    if (isHash && !isHome) {
      return (
        <Link href={homeSectionHref}>
          {item.label}
          {item.hasDropdown && (
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles['dropdown-arrow']}
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
        </Link>
      )
    }

    const onClick =
      isHash && isHome
        ? (e: React.MouseEvent<HTMLAnchorElement>) => handleSmoothScroll(e, url)
        : undefined

    return (
      <a href={url} onClick={onClick}>
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
    )
  }

  const ctaUrl = (data.ctaButton?.url || '#contact').trim()
  const ctaIsRoute = isAppRoute(ctaUrl)
  const ctaIsHash = ctaUrl.startsWith('#')
  const ctaOnClick =
    ctaIsHash && isHome
      ? (e: React.MouseEvent<HTMLAnchorElement>) => handleSmoothScroll(e, ctaUrl)
      : undefined

  return (
    <motion.header
      className={styles.header}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles['header-container']}>
        <Link
          href="/"
          className={styles['logo-link']}
          onClick={(e) => {
            if (isHome) {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
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
        </Link>

        <nav className={styles['nav-left']}>
          {data.navigation?.map((item, index: number) => (
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
              {renderNavAnchor(item)}
            </motion.div>
          ))}
        </nav>

        <motion.div
          className={styles['header-cta']}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          {ctaIsRoute ? (
            <Link href={ctaUrl} className={styles['lets-work-btn']}>
              {data.ctaButton?.text || "Let's Work Together"}
            </Link>
          ) : ctaIsHash && !isHome ? (
            <Link href={`/${ctaUrl}`} className={styles['lets-work-btn']}>
              {data.ctaButton?.text || "Let's Work Together"}
            </Link>
          ) : (
            <a href={ctaUrl} className={styles['lets-work-btn']} onClick={ctaOnClick}>
              {data.ctaButton?.text || "Let's Work Together"}
            </a>
          )}
        </motion.div>
      </div>
    </motion.header>
  )
}
