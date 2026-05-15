import React from 'react'
import { Caveat, Lato } from 'next/font/google'
import './styles.css'
import IntroAnimation from './components/IntroAnimation/IntroAnimation'

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-caveat',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-lato',
  display: 'swap',
})

export const metadata = {
  title: 'Cleanbold Advertising | Sharp Shots. Bold Stories. Brands That Grow.',
  description: 'Where Creativity Converts.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default async function RootLayout(props: Readonly<{ children: React.ReactNode }>) {
  const { children } = props

  return (
    <html lang="en" className={`${caveat.variable} ${lato.variable}`}>
      <body>
        <IntroAnimation />
        <main>{children}</main>
      </body>
    </html>
  )
}
