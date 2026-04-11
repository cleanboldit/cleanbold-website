'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import styles from './NotFound404.module.css'

export default function FrontendError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string }
  reset: () => void
}>) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="home-page">
      <section className={styles.wrap} aria-labelledby="error-title">
        <div className={styles.inner}>
          <p className={styles.code} aria-hidden>
            !<span className={styles.codeDot}>.</span>
          </p>
          <p className={styles.label}>Something went wrong</p>
          <h1 id="error-title" className={styles.title}>
            We hit a snag loading this page
          </h1>
          <p className={styles.description}>
            Please try again. If the problem continues, go back home or reach us from the contact
            section.
          </p>
          <div className={styles.actions}>
            <button type="button" className={styles.buttonSecondary} onClick={() => reset()}>
              Try again
            </button>
            <Link href="/" className={styles.buttonPrimary}>
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
