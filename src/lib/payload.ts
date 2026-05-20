import { unstable_cache } from 'next/cache'
import { getPayload, type Payload, type GlobalSlug, type CollectionSlug } from 'payload'
import config from '@/payload.config'
import { TAG_CMS_GLOBALS, TAG_CMS_PAGES, tagForCollection } from '@/lib/cache-tags'

const globalCache = globalThis as typeof globalThis & { payload: Payload | null }

export async function getPayloadClient() {
  if (globalCache.payload) {
    try {
      await globalCache.payload.db.connect?.()
    } catch {
      globalCache.payload = null
    }
  }

  globalCache.payload ??= await getPayload({ config })

  return globalCache.payload
}

// Fetch a page by its slug (depth 2 populates images inside block arrays)
export async function getPageBySlug(slug: string) {
  return unstable_cache(
    async () => {
      const payload = await getPayloadClient()
      const result = await payload.find({
        collection: 'pages',
        where: { slug: { equals: slug } },
        depth: 2,
        limit: 1,
      })
      return result.docs[0] ?? null
    },
    ['cms-page', slug],
    { tags: [TAG_CMS_PAGES, tagForCollection('pages')], revalidate: 3600 },
  )()
}

// Fetch specific global
export async function getGlobal(slug: GlobalSlug) {
  return unstable_cache(
    async () => {
      const payload = await getPayloadClient()
      return await payload.findGlobal({ slug })
    },
    ['cms-global', slug],
    { tags: [TAG_CMS_GLOBALS, `cms:global:${slug}`], revalidate: 3600 },
  )()
}

// Fetch collection items
export async function getCollection(
  collection: CollectionSlug,
  options: Record<string, unknown> = {},
) {
  const tag = tagForCollection(collection)
  return unstable_cache(
    async () => {
      const payload = await getPayloadClient()
      return await payload.find({
        collection,
        ...options,
      })
    },
    ['cms-collection', collection, JSON.stringify(options)],
    { tags: [tag], revalidate: 3600 },
  )()
}
