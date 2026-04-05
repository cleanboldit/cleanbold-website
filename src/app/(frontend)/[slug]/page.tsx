import { redirect, notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import BlockRenderer from '../components/BlockRenderer/BlockRenderer'
import { getPageBySlug, getGlobal } from '@/lib/payload'
import type { Header as HeaderGlobal, Footer as FooterGlobal } from '@/payload-types'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageBySlug(slug)
  const title = page?.title
    ? `${page.title} | Clean Bold Studio`
    : 'Clean Bold Studio | Creative Digital Agency'
  return { title }
}

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
