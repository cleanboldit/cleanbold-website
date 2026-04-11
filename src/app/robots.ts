import type { MetadataRoute } from 'next'

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

export default function robots(): MetadataRoute.Robots {
  const base = siteOrigin()
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: `${base}/sitemap.xml`,
  }
}
