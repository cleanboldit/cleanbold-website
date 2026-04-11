import type { Metadata } from 'next'
import React, { Suspense } from 'react'
import AsyncHeader from './AsyncHeader'
import AsyncFooter from './AsyncFooter'
import PageBlocksFromSlug from './PageBlocksFromSlug'
import {
  FooterSkeleton,
  HeaderSkeleton,
  MainContentSkeleton,
} from './components/PageLoadSkeletons/PageLoadSkeletons'
import { buildPageMetadata } from '@/lib/metadata'
import { getPageBySlug } from '@/lib/payload'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('home')
  return buildPageMetadata(page ?? undefined, { path: '/' })
}

export default function HomePage() {
  return (
    <div className="home-page">
      <Suspense fallback={<HeaderSkeleton />}>
        <AsyncHeader />
      </Suspense>
      <Suspense fallback={<MainContentSkeleton />}>
        <PageBlocksFromSlug slug="home" />
      </Suspense>
      <Suspense fallback={<FooterSkeleton />}>
        <AsyncFooter />
      </Suspense>
    </div>
  )
}
