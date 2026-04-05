'use client'

import styles from './Hero.module.css'

interface HeroProps {
  video: { url: string } | null
}

export default function Hero({ video }: HeroProps) {
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

      {/* Content sits on top of the video */}
      <div className={styles['hero-wrapper']}></div>
    </section>
  )
}
