import type { MetadataRoute } from 'next'
import { unstable_cache } from 'next/cache'
import { TAG_CMS_PAGES } from '@/lib/cache-tags'
import { getPayloadClient } from '@/lib/payload'

function siteOrigin(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.URL ||
    process.env.VERCEL_URL ||
    'http://localhost:3000'
  const trimmed = raw.replace(/\/$/, '')
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed
  return `https://${trimmed}`
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteOrigin()

  const docs = await unstable_cache(
    async () => {
      const payload = await getPayloadClient()
      const r = await payload.find({
        collection: 'pages',
        limit: 200,
        depth: 0,
      })
      return r.docs
    },
    ['sitemap-documents'],
    { tags: [TAG_CMS_PAGES] },
  )()

  return docs.map((p) => ({
    url: p.slug === 'home' ? base : `${base}/${p.slug}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : undefined,
  }))
}
