import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import React, { Suspense } from 'react'
import AsyncHeader from '../AsyncHeader'
import AsyncFooter from '../AsyncFooter'
import PageBlocksFromSlug from '../PageBlocksFromSlug'
import ProjectDetail from '../components/ProjectDetail/ProjectDetail'
import {
  FooterSkeleton,
  HeaderSkeleton,
  MainContentSkeleton,
} from '../components/PageLoadSkeletons/PageLoadSkeletons'
import { buildPageMetadata } from '@/lib/metadata'
import { getAllProjectSlugs, getProjectByRouteSlug } from '@/lib/project-details'
import { getCollection, getPageBySlug } from '@/lib/payload'

export async function generateStaticParams() {
  const [pagesResult, projectSlugs] = await Promise.all([
    getCollection('pages', { limit: 100 }),
    getAllProjectSlugs(),
  ])

  const pageSlugs = (pagesResult.docs as { slug: string }[])
    .map((p) => p.slug)
    .filter((s) => s !== 'home')

  return [...new Set([...pageSlugs, ...projectSlugs])].map((slug) => ({ slug }))
}

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
  if (page) {
    return buildPageMetadata(page ?? undefined, { path: `/${slug}` })
  }

  const project = await getProjectByRouteSlug(slug)
  if (project) {
    return {
      title: `${project.title} | Cleanbold Advertising`,
      description: project.category || project.title,
    }
  }
  return buildPageMetadata(undefined, { path: `/${slug}` })
}

export default async function SlugPage({
  params,
}: Readonly<{ params: Promise<{ slug: string }> }>) {
  const { slug } = await params

  if (slug === 'home') redirect('/')

  const page = await getPageBySlug(slug)
  const project = page ? null : await getProjectByRouteSlug(slug)

  return (
    <div className="home-page">
      <Suspense fallback={<HeaderSkeleton />}>
        <AsyncHeader />
      </Suspense>
      <Suspense fallback={<MainContentSkeleton />}>
        {page ? <PageBlocksFromSlug slug={slug} enforceFound /> : project ? <ProjectDetail project={project} /> : <PageBlocksFromSlug slug={slug} enforceFound />}
      </Suspense>
      <Suspense fallback={<FooterSkeleton />}>
        <AsyncFooter />
      </Suspense>
    </div>
  )
}
