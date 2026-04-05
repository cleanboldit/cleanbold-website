import { redirect, notFound } from 'next/navigation'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import BlockRenderer from '../components/BlockRenderer/BlockRenderer'
import { getPageBySlug, getGlobal } from '@/lib/payload'
import type { Header as HeaderGlobal, Footer as FooterGlobal } from '@/payload-types'

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  if (slug === 'home') redirect('/')

  const [page, header, footer] = await Promise.all([
    getPageBySlug(slug),
    getGlobal('header') as Promise<HeaderGlobal>,
    getGlobal('footer') as Promise<FooterGlobal>,
  ])

  const p = page
  if (p == null) notFound()

  return (
    <div className="home-page">
      <Header data={header} />
      <BlockRenderer blocks={p.layout ?? []} />
      <div id="contact">
        <Footer data={footer} />
      </div>
    </div>
  )
}
