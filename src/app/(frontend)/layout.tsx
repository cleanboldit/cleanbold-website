import React from 'react'
import './styles.css'
import './components-styles.css'

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
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
