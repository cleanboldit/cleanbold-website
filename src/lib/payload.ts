import { getPayload } from 'payload'
import config from '@/payload.config'

const globalCache = global as typeof globalThis & { payload: any }

export async function getPayloadClient() {
  if (globalCache.payload) {
    return globalCache.payload
  }

  globalCache.payload = await getPayload({ config })
  return globalCache.payload
}

// Fetch a page by its slug (depth 2 populates images inside block arrays)
export async function getPageBySlug(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })
  return result.docs[0] ?? null
}

// Fetch specific global
export async function getGlobal(slug: string) {
  const payload = await getPayloadClient()
  return await payload.findGlobal({ slug })
}

// Fetch collection items
export async function getCollection(collection: string, options = {}) {
  const payload = await getPayloadClient()
  return await payload.find({
    collection,
    ...options,
  })
}
