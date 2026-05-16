import type { NextConfig } from 'next'
import type { RemotePattern } from 'next/dist/shared/lib/image-config'

/**
 * Allow next/image optimization for Payload media URLs (e.g. R2 public hostname).
 * Set NEXT_PUBLIC_IMAGE_REMOTE_HOSTS to a comma-separated list of hostnames (no protocol).
 * Example: pub-xxxxx.r2.dev,cleanbold.netlify.app
 */
function imageRemotePatterns(): RemotePattern[] {
  const raw = process.env.NEXT_PUBLIC_IMAGE_REMOTE_HOSTS || process.env.NEXT_PUBLIC_MEDIA_HOSTNAME
  if (!raw?.trim()) return []

  return raw
    .split(',')
    .map((h) => h.trim().replace(/^https?:\/\//, '').split('/')[0])
    .filter(Boolean)
    .map((hostname) => ({
      protocol: 'https' as const,
      hostname,
      pathname: '/**',
    }))
}

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: imageRemotePatterns(),
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
