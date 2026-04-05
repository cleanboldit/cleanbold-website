import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import BlockRenderer from './components/BlockRenderer/BlockRenderer'
import { getPageBySlug, getGlobal } from '@/lib/payload'

export default async function HomePage() {
  const [page, header, footer] = await Promise.all([
    getPageBySlug('home'),
    getGlobal('header'),
    getGlobal('footer'),
  ])

  return (
    <div className="home-page">
      <Header data={header} />
      <BlockRenderer blocks={page?.layout ?? []} />
      <div id="contact">
        <Footer data={footer} />
      </div>
    </div>
  )
}
