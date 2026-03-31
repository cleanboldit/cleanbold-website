'use client'

import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="hero">
      {/* Full-section video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        className="hero-video-bg"
        onContextMenu={(e) => e.preventDefault()}
      >
        <source src="/Cleanbold.mp4" type="video/mp4" />
      </video>

      {/* Content sits on top of the video */}
      <div className="hero-wrapper"></div>
    </section>
  )
}
