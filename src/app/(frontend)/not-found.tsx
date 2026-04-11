import { Suspense } from 'react'
import Link from 'next/link'
import AsyncHeader from './AsyncHeader'
import AsyncFooter from './AsyncFooter'
import {
  FooterSkeleton,
  HeaderSkeleton,
} from './components/PageLoadSkeletons/PageLoadSkeletons'
import styles from './NotFound404.module.css'

export const metadata = {
  title: 'Page not found | Clean Bold Studio',
  description: 'The page you are looking for does not exist or has been moved.',
}

export default function NotFound() {
  return (
    <div className="home-page">
      <Suspense fallback={<HeaderSkeleton />}>
        <AsyncHeader />
      </Suspense>

      <section className={styles.wrap} aria-labelledby="not-found-title">
        <div className={styles.inner}>
          <p className={styles.code} aria-hidden>
            404<span className={styles.codeDot}>.</span>
          </p>
          <p className={styles.label}>Page not found</p>
          <h1 id="not-found-title" className={styles.title}>
            This page took a different path
          </h1>
          <p className={styles.description}>
            The link may be broken or the page may have been removed. Head back home or get in touch
            from the footer.
          </p>
          <div className={styles.actions}>
            <Link href="/" className={styles.buttonPrimary}>
              Back to home
            </Link>
            <Link href="/#contact" className={styles.buttonSecondary}>
              Contact
            </Link>
          </div>
        </div>
      </section>

      <Suspense fallback={<FooterSkeleton />}>
        <AsyncFooter />
      </Suspense>
    </div>
  )
}
