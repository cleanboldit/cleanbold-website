'use client'

import { useCallback, useState } from 'react'
import styles from './Hero.module.css'
import Link from 'next/link'

type HeroProps = Readonly<{
  video: { url: string } | null
  posterUrl?: string | null
  fallbackBackgroundColor?: string | null
  primaryButtonText?: string | null
  primaryButtonUrl?: string | null
  secondaryButtonText?: string | null
  secondaryButtonUrl?: string | null
}>

export default function Hero({
  video,
  posterUrl,
  fallbackBackgroundColor,
  primaryButtonText,
  primaryButtonUrl,
  secondaryButtonText,
  secondaryButtonUrl,
}: HeroProps) {
  const [videoReady, setVideoReady] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)

  const revealVideo = useCallback(() => {
    setVideoReady(true)
  }, [])

  const videoUrl = video?.url ?? ''
  const hasVideo = videoUrl.length > 0
  const showVideoLayer = hasVideo && videoReady && !videoFailed

  return (
    <section className={styles.hero} id="hero">
      <div
        className={styles['hero-backdrop']}
        style={fallbackBackgroundColor ? { background: fallbackBackgroundColor } : undefined}
        aria-hidden
      />

      {hasVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={posterUrl || undefined}
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          className={`${styles['hero-video-bg']} ${showVideoLayer ? styles['hero-video-visible'] : ''}`}
          onContextMenu={(e) => e.preventDefault()}
          onCanPlay={revealVideo}
          onLoadedData={revealVideo}
          onError={() => setVideoFailed(true)}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}

      <div className={styles['hero-video-overlay']} />

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
