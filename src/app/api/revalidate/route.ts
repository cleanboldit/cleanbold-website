import { NextResponse } from 'next/server'
import { revalidateGlobalsCache, revalidatePagesCache } from '@/lib/revalidate'

type Scope = 'all' | 'pages' | 'globals'

/**
 * On-demand revalidation for Netlify / external automations.
 * POST with header `x-revalidate-secret: <REVALIDATE_SECRET>` and optional JSON:
 * - `{ "scope": "all" }` (default) — pages + globals cache
 * - `{ "scope": "pages", "slug": "about" }` — optional slug for path hints
 * - `{ "scope": "globals" }` — header/footer/site-settings only
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET
  if (!secret) {
    return NextResponse.json({ ok: false, message: 'REVALIDATE_SECRET is not configured' }, { status: 503 })
  }
  if (request.headers.get('x-revalidate-secret') !== secret) {
    return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 })
  }

  let body: Record<string, unknown> = {}
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    /* empty body → full revalidation */
  }

  const rawScope = body.scope
  const scope: Scope =
    rawScope === 'pages' || rawScope === 'globals' || rawScope === 'all' ? rawScope : 'all'
  const slug = typeof body.slug === 'string' ? body.slug : undefined

  if (scope === 'globals' || scope === 'all') {
    revalidateGlobalsCache()
  }
  if (scope === 'pages' || scope === 'all') {
    revalidatePagesCache(slug)
  }

  return NextResponse.json({ ok: true, scope, slug: slug ?? null })
}
