import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import BlockRenderer from './components/BlockRenderer/BlockRenderer'
import { getPageBySlug, getGlobal } from '@/lib/payload'
import type { Header as HeaderGlobal, Footer as FooterGlobal } from '@/payload-types'

export default async function HomePage() {
  const [page, header, footer] = await Promise.all([
    getPageBySlug('home'),
    getGlobal('header') as Promise<HeaderGlobal>,
    getGlobal('footer') as Promise<FooterGlobal>,
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
