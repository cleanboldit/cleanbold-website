import { getPayload, type Payload, type GlobalSlug, type CollectionSlug } from 'payload'
import config from '@/payload.config'

const globalCache = globalThis as typeof globalThis & { payload: Payload | null }

export async function getPayloadClient() {
  if (globalCache.payload) {
    try {
      // Verify the connection is alive before returning the cached instance
      await globalCache.payload.db.connect?.()
    } catch {
      // Connection is stale — clear cache so we reconnect below
      globalCache.payload = null
    }
  }

  globalCache.payload ??= await getPayload({ config })

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
export async function getGlobal(slug: GlobalSlug) {
  const payload = await getPayloadClient()
  return await payload.findGlobal({ slug })
}

// Fetch collection items
export async function getCollection(
  collection: CollectionSlug,
  options: Record<string, unknown> = {},
) {
  const payload = await getPayloadClient()
  return await payload.find({
    collection,
    ...options,
  })
}
