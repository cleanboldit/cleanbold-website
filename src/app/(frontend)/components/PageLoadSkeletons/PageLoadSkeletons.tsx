import styles from './PageLoadSkeletons.module.css'

export function HeaderSkeleton() {
  return <div className={styles.headerBar} aria-hidden />
}

export function MainContentSkeleton() {
  return (
    <div className={styles.page} aria-busy aria-label="Loading page content">
      <div className={styles.heroBlock} />
      <div className={styles.section}>
        <div className={styles.contentLine} />
        <div className={styles.contentLineShort} />
        <div className={styles.gridRow}>
          <div className={styles.card} />
          <div className={styles.card} />
          <div className={styles.card} />
        </div>
      </div>
    </div>
  )
}

export function FooterSkeleton() {
  return <div className={styles.footerArea} aria-hidden />
}

export default function FullPageSkeleton() {
  return (
    <div className="home-page" aria-busy aria-label="Loading">
      <HeaderSkeleton />
      <MainContentSkeleton />
      <FooterSkeleton />
    </div>
  )
}
