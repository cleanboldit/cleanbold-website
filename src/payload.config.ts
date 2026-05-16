// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { resendAdapter } from '@payloadcms/email-resend'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { seoPlugin } from '@payloadcms/plugin-seo'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'

import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const { RESEND_API_KEY } = process.env

if (
  process.env.NODE_ENV === 'production' &&
  process.env.NEXT_PHASE !== 'phase-production-build'
) {
  const required = ['PAYLOAD_SECRET', 'DATABASE_URI', 'RESEND_API_KEY', 'S3_ACCESS_KEY_TOKEN', 'S3_SECRET_KEY', 'S3_BUCKET_NAME', 'S3_ENDPOINT']
  const missing = required.filter((k) => !process.env[k])
  if (missing.length) throw new Error(`Missing required env vars: ${missing.join(', ')}`)
}

export default buildConfig({
  email: resendAdapter({
    defaultFromAddress: 'cleanboldit@gmail.com',
    defaultFromName: 'Cleanbold',
    apiKey: RESEND_API_KEY || '',
  }),
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Pages],
  globals: [Header, Footer, SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: mongooseAdapter({
    url: process.env.DATABASE_URI || process.env.MONGODB_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    formBuilderPlugin({
      fields: {
        text: true,
        email: true,
        textarea: true,
        select: false,
        radio: false,
        state: false,
        country: false,
        checkbox: false,
        number: false,
        message: false,
        date: false,
        payment: false,
      },
      redirectRelationships: ['pages'],
      beforeEmail: (emails, { data }) => {
        const sub: { field: string; value: string }[] = (data as any)?.submissionData ?? []
        const get = (field: string) => sub.find((s) => s.field === field)?.value ?? '—'

        const esc = (s: string) =>
          s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))

        const name = esc(get('name'))
        const companyName = esc(get('companyName'))
        const email = esc(get('email'))
        const phone = esc(get('phone'))
        const message = esc(get('message'))

        const html = `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1a1a1a">
  <h2 style="margin:0 0 20px">New Inquiry — Cleanbold</h2>

  <p style="margin:0 0 8px"><strong>Name:</strong> ${name}</p>
  <p style="margin:0 0 8px"><strong>Company:</strong> ${companyName}</p>
  <p style="margin:0 0 8px"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
  <p style="margin:0 0 20px"><strong>Mobile:</strong> <a href="tel:+91${phone}">+91 ${phone}</a></p>

  <p style="margin:0 0 8px"><strong>Message:</strong></p>
  <p style="margin:0;white-space:pre-wrap;background:#f5f5f5;padding:12px 16px;border-radius:6px">${message}</p>
</div>`

        return emails.map((e) => ({
          ...e,
          subject: `New Inquiry from ${name} — ${companyName}`,
          html,
        }))
      },
    }),
    // SEO Plugin - adds SEO fields to all collections and globals in a separate tab
    seoPlugin({
      collections: ['pages'],
      globals: ['header', 'footer', 'site-settings'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }: { doc: Record<string, string> }) =>
        doc?.title || 'Cleanbold Advertising',
      generateDescription: ({ doc }: { doc: Record<string, string> }) =>
        doc?.description || doc?.tagline || 'Where Creativity Converts',
      tabbedUI: true,
    }),
    // S3 Storage Plugin - stores media files in Cloudflare R2 (S3-compatible)
    s3Storage({
      collections: {
        media: process.env.NODE_ENV === 'production'
          ? {
              disablePayloadAccessControl: true,
              generateFileURL: ({ filename, prefix }) =>
                `${process.env.S3_PUBLIC_URL}/${process.env.S3_BUCKET_NAME}${prefix ? `/${prefix}` : ''}/${filename}`,
            }
          : true,
      },
      bucket: process.env.S3_BUCKET_NAME || '',
      disableLocalStorage: process.env.NODE_ENV === 'production',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_TOKEN || '',
          secretAccessKey: process.env.S3_SECRET_KEY || '',
        },
        endpoint: process.env.S3_ENDPOINT || '',
        region: process.env.S3_REGION || '',
        forcePathStyle: true,
      },
    }),
  ],
})
