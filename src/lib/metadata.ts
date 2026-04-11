import type { Metadata } from 'next'
import type { Media, Page } from '@/payload-types'

const BRAND = 'Clean Bold Studio'
const DEFAULT_TITLE = `${BRAND} | Creative Digital Agency`
const DEFAULT_DESCRIPTION =
  'Clean Bold - A creative digital studio crafting innovative solutions for brands that dare to be different'

function siteOrigin(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.URL ||
    process.env.DEPLOY_PRIME_URL ||
    process.env.VERCEL_URL ||
    ''
  const trimmed = raw.replace(/\/$/, '')
  if (!trimmed) return ''
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed
  return `https://${trimmed}`
}

function mediaAbsoluteUrl(image: string | Media | null | undefined): string | undefined {
  if (!image || typeof image === 'string') return undefined
  const url = image.url
  if (!url) return undefined
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  const base = siteOrigin()
  if (!base) return url
  return `${base}${url.startsWith('/') ? '' : '/'}${url}`
}

export type PageMetadataContext = {
  /** URL path for canonical, e.g. `/` or `/about` */
  path: string
}

/**
 * Build Next `Metadata` from a Payload `Page` (title + SEO plugin `meta` tab).
 */
export function buildPageMetadata(
  page: Page | null | undefined,
  ctx: PageMetadataContext,
): Metadata {
  const base = siteOrigin()
  const meta = page?.meta
  const pageTitle = page?.title?.trim()

  const seoTitle = meta?.title?.trim()
  const displayTitle = seoTitle || (pageTitle ? `${pageTitle} | ${BRAND}` : DEFAULT_TITLE)

  const description = (meta?.description?.trim() || DEFAULT_DESCRIPTION).slice(0, 320)
  const ogImage = mediaAbsoluteUrl(meta?.image ?? undefined)

  const path = ctx.path.startsWith('/') ? ctx.path : `/${ctx.path}`
  const canonical = base ? `${base}${path}` : undefined

  const md: Metadata = {
    title: displayTitle,
    description,
    openGraph: {
      type: 'website',
      title: displayTitle,
      description,
      ...(canonical ? { url: canonical } : {}),
      ...(ogImage ? { images: [{ url: ogImage, alt: pageTitle || BRAND }] } : {}),
    },
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      title: displayTitle,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  }

  if (canonical) {
    md.alternates = { canonical }
  }

  return md
}
