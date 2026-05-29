'use client'

import { useState } from 'react'
import styles from './Hero.module.css'

type MediaSource = {
  url: string
  mimeType?: string | null
}

type HeroProps = Readonly<{
  video: MediaSource | null
  mobileVideo?: MediaSource | null
  posterUrl?: string | null
  mobilePosterUrl?: string | null
  fallbackBackgroundColor?: string | null
  primaryButtonText?: string | null
  primaryButtonUrl?: string | null
  secondaryButtonText?: string | null
  secondaryButtonUrl?: string | null
}>

const preventContextMenu = (e: React.MouseEvent) => e.preventDefault()

export default function Hero({
  video,
  mobileVideo,
  posterUrl,
  mobilePosterUrl,
  fallbackBackgroundColor,
  primaryButtonText,
  primaryButtonUrl,
  secondaryButtonText,
  secondaryButtonUrl,
}: HeroProps) {
  const [videoFailed, setVideoFailed] = useState(false)

  const desktopVideoUrl = video?.url
  const mobileVideoUrl = mobileVideo?.url || desktopVideoUrl

  const desktopMime = video?.mimeType || 'video/mp4'
  const mobileMime = mobileVideo?.mimeType || desktopMime || 'video/mp4'

  const hasVideo = Boolean(desktopVideoUrl)
  const isDifferentVideo = Boolean(mobileVideo?.url && mobileVideo.url !== desktopVideoUrl)

  const finalMobilePoster = mobilePosterUrl || posterUrl
  const finalDesktopPoster = posterUrl || mobilePosterUrl

  const hasCta = primaryButtonText || secondaryButtonText

  // Construct inline styles for responsive poster images using CSS variables
  const backdropStyle: React.CSSProperties = {
    backgroundColor: fallbackBackgroundColor ?? undefined,
    ...(finalDesktopPoster ? { '--desktop-poster': `url("${finalDesktopPoster}")` } : {}),
    ...(finalMobilePoster ? { '--mobile-poster': `url("${finalMobilePoster}")` } : {}),
  } as React.CSSProperties

  return (
    <section className={styles.scrollWrapper} id="hero" aria-label="Hero">
      <div className={styles.sticky}>
        <div
          className={styles.backdrop}
          style={backdropStyle}
          aria-hidden="true"
        />

        {hasVideo && !videoFailed && desktopVideoUrl && (
          <video
            key={`${desktopVideoUrl}-${mobileVideoUrl}`}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            className={styles.videoBg}
            onContextMenu={preventContextMenu}
            onError={() => setVideoFailed(true)}
            aria-hidden="true"
          >
            {isDifferentVideo ? (
              <>
                <source src={mobileVideoUrl} media="(max-width: 768px)" type={mobileMime} />
                <source src={desktopVideoUrl} media="(min-width: 769px)" type={desktopMime} />
                <source src={desktopVideoUrl} type={desktopMime} />
              </>
            ) : (
              <source src={desktopVideoUrl} type={desktopMime} />
            )}
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
