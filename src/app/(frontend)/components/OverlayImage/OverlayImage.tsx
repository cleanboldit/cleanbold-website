import Image from 'next/image'
import styles from './OverlayImage.module.css'
import { motion } from 'framer-motion'
import React from 'react'

const MotionImage = motion(Image)

type OverlappingHeroProps = {
  imageSrc: string
  topOverlay?: React.ReactNode
  bottomOverlay?: React.ReactNode
  leftOverlay?: React.ReactNode
  rightOverlay?: React.ReactNode
}

export default function OverlappingHero({
  imageSrc,
  topOverlay,
  bottomOverlay,
  leftOverlay,
  rightOverlay,
}: OverlappingHeroProps) {
  return (
    <div className={styles['hero-image-container']}>
      {/* Main Image */}
      <MotionImage
        src={imageSrc}
        width={1320}
        height={792}
        className={styles['hero-image']}
        alt="hero"
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* TOP */}
      {/* <motion.div
        initial={{ y: -40, opacity: 0, x: '-50%' }}
        animate={{ y: 0, opacity: 1, x: '-50%' }}
        transition={{ delay: 0.2 }}
        className={`overlay-pill top`}
        style={{ left: '50%' }}
      >
        {topOverlay}
      </motion.div> */}

      {/* BOTTOM */}
      {/* <motion.div
        initial={{ y: 40, opacity: 0, x: '-50%' }}
        animate={{ y: 0, opacity: 1, x: '-50%' }}
        transition={{ delay: 0.3 }}
        className={`overlay-pill bottom`}
        style={{ left: '50%' }}
      >
        {bottomOverlay}
      </motion.div> */}

      {/* LEFT */}
      {/* <motion.div
        initial={{ x: -40, opacity: 0, y: '-50%' }}
        animate={{ x: 0, opacity: 1, y: '-50%' }}
        transition={{ delay: 0.4 }}
        className={`overlay-pill left`}
        style={{ top: '50%' }}
      >
        {leftOverlay}
      </motion.div> */}

      {/* RIGHT */}
      {/* <motion.div
        initial={{ x: 40, opacity: 0, y: '-50%' }}
        animate={{ x: 0, opacity: 1, y: '-50%' }}
        transition={{ delay: 0.5 }}
        className={`overlay-pill right`}
        style={{ top: '50%' }}
      >
        {rightOverlay}
      </motion.div> */}
    </div>
  )
}
