'use client'

import { useState } from 'react'
import styles from './Hero.module.css'

type HeroProps = Readonly<{
  video: { url: string } | null
  posterUrl?: string | null
  fallbackBackgroundColor?: string | null
  primaryButtonText?: string | null
  primaryButtonUrl?: string | null
  secondaryButtonText?: string | null
  secondaryButtonUrl?: string | null
}>

const preventContextMenu = (e: React.MouseEvent) => e.preventDefault()

export default function Hero({
  video,
  posterUrl,
  fallbackBackgroundColor,
  primaryButtonText,
  primaryButtonUrl,
  secondaryButtonText,
  secondaryButtonUrl,
}: HeroProps) {
  const [videoFailed, setVideoFailed] = useState(false)

  const videoUrl = video?.url
  const hasVideo = Boolean(videoUrl)
  const showVideo = hasVideo && !videoFailed

  const hasCta = primaryButtonText || secondaryButtonText

  return (
    <section className={styles.scrollWrapper} id="hero" aria-label="Hero">
      <div className={styles.sticky}>
        <div
          className={styles.backdrop}
          style={fallbackBackgroundColor ? { background: fallbackBackgroundColor } : undefined}
          aria-hidden="true"
        />

        {hasVideo && videoUrl && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            // @ts-expect-error — fetchpriority not yet in React types
            fetchpriority="high"
            poster={posterUrl ?? undefined}
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            className={styles.videoBg}
            onContextMenu={preventContextMenu}
            onError={() => setVideoFailed(true)}
            aria-hidden="true"
          >
            <source src={`${videoUrl}#t=0.1`} type="video/mp4" />
          </video>
        )}

        {hasCta && (
          <nav className={styles.cta} aria-label="Hero actions">
            {primaryButtonText && (
              <a href={primaryButtonUrl ?? '#'} className={styles.btnPrimary}>
                {primaryButtonText}
              </a>
            )}
            {secondaryButtonText && (
              <a href={secondaryButtonUrl ?? '#'} className={styles.btnSecondary}>
                {secondaryButtonText}
              </a>
            )}
          </nav>
        )}
      </div>
    </section>
  )
}
