import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import React, { Suspense } from 'react'
import AsyncHeader from '../AsyncHeader'
import AsyncFooter from '../AsyncFooter'
import PageBlocksFromSlug from '../PageBlocksFromSlug'
import {
  FooterSkeleton,
  HeaderSkeleton,
  MainContentSkeleton,
} from '../components/PageLoadSkeletons/PageLoadSkeletons'
import { buildPageMetadata } from '@/lib/metadata'
import { getPageBySlug } from '@/lib/payload'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  if (slug === 'home') {
    return buildPageMetadata(undefined, { path: '/' })
  }
  const page = await getPageBySlug(slug)
  return buildPageMetadata(page ?? undefined, { path: `/${slug}` })
}

export default async function SlugPage({
  params,
}: Readonly<{ params: Promise<{ slug: string }> }>) {
  const { slug } = await params

  if (slug === 'home') redirect('/')

  return (
    <div className="home-page">
      <Suspense fallback={<HeaderSkeleton />}>
        <AsyncHeader />
      </Suspense>
      <Suspense fallback={<MainContentSkeleton />}>
        <PageBlocksFromSlug slug={slug} enforceFound />
      </Suspense>
      <Suspense fallback={<FooterSkeleton />}>
        <AsyncFooter />
      </Suspense>
    </div>
  )
}
