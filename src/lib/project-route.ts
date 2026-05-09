type GenericRecord = Record<string, unknown>

export function normalizeProjectRoute(input: string): string {
  const trimmed = input.trim()
  if (!trimmed) return ''
  const withoutQuery = trimmed.split('?')[0]?.split('#')[0] ?? ''
  const withLeadingSlash = withoutQuery.startsWith('/') ? withoutQuery : `/${withoutQuery}`
  return withLeadingSlash.replace(/\/+$/, '') || '/'
}

export function normalizeProjectSlugSegment(slug: string): string {
  return normalizeProjectRoute(slug).replace(/^\/+/, '')
}

export function getProjectRouteHref(project: GenericRecord): string | null {
  if (typeof project.route !== 'string') return null
  const route = normalizeProjectRoute(project.route)
  return route === '/' ? null : route
}
