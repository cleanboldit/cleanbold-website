'use client'

import styles from './Hero.module.css'
import Link from 'next/link'

interface HeroProps {
  video: { url: string } | null
  primaryButtonText?: string | null
  primaryButtonUrl?: string | null
  secondaryButtonText?: string | null
  secondaryButtonUrl?: string | null
}

export default function Hero({
  video,
  primaryButtonText,
  primaryButtonUrl,
  secondaryButtonText,
  secondaryButtonUrl,
}: HeroProps) {
  return (
    <section className={styles.hero} id="hero">
      {/* Full-section video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        className={styles['hero-video-bg']}
        onContextMenu={(e) => e.preventDefault()}
      >
        {video?.url && <source src={video.url} type="video/mp4" />}
      </video>

      {/* 20% black overlay on top of video */}
      <div className={styles['hero-video-overlay']} />

      {/* CTA bar — same bg image with fixed attachment to align with hero */}
      <div className={styles['hero-cta-bar']}>
        <Link href={primaryButtonUrl || '#contact'} className={styles['cta-btn-primary']}>
          {primaryButtonText || 'Start My Brand Journey'}
        </Link>
        <Link href={secondaryButtonUrl || '#work'} className={styles['cta-btn-secondary']}>
          {secondaryButtonText || 'See Our Work'}
        </Link>
      </div>
    </section>
  )
}
