import { revalidatePath, revalidateTag } from 'next/cache'
import { TAG_CMS_GLOBALS, TAG_CMS_PAGES, tagForCollection } from './cache-tags'

/** Call after any `pages` document changes (Payload hook or POST /api/revalidate). */
export function revalidatePagesCache(slug?: string | null) {
  revalidateTag(TAG_CMS_PAGES)
  revalidateTag(tagForCollection('pages'))

  if (slug === 'home' || slug == null) {
    revalidatePath('/', 'page')
  }
  if (slug && slug !== 'home') {
    revalidatePath(`/${slug}`, 'page')
  }
  revalidatePath('/', 'layout')
}

/** Call after header/footer/site-settings globals change. */
export function revalidateGlobalsCache() {
  revalidateTag(TAG_CMS_GLOBALS)
  revalidatePath('/', 'layout')
}
