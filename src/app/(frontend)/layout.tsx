import React from 'react'
import './styles.css'
import './components-styles.css'

export const metadata = {
  description:
    'Clean Bold - A creative digital studio crafting innovative solutions for brands that dare to be different',
  title: 'Clean Bold Studio | Creative Digital Agency',
  icons: {
    icon: '/logo-1.png',
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
