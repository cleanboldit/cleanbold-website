/** Tags for `unstable_cache` — invalidate via `revalidateTag` / webhooks / Payload hooks. */
export const TAG_CMS_PAGES = 'cms:pages'
export const TAG_CMS_GLOBALS = 'cms:globals'
export const tagForCollection = (collection: string) => `cms:collection:${collection}`
