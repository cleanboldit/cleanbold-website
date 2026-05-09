// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
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

export default buildConfig({
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
        media: true,
      },
      bucket: process.env.S3_BUCKET_NAME || '',
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
