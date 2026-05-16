import { createHmac } from 'crypto'
import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'
import {
  getCanonicalIndianMobile,
  validateFooterInquiry,
  type FooterInquiryValues,
} from '@/lib/footer-inquiry'

const WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_REQUESTS = 5
const COOKIE_NAME = '__cb_rl'

interface RateLimitState {
  count: number
  resetAt: number
}

function hmac(data: string): string {
  const secret = process.env.PAYLOAD_SECRET ?? 'dev-secret'
  return createHmac('sha256', secret).update(data).digest('hex')
}

function parseCookie(value: string): RateLimitState | null {
  try {
    const dot = value.lastIndexOf('.')
    if (dot === -1) return null
    const encoded = value.slice(0, dot)
    const sig = value.slice(dot + 1)
    if (hmac(encoded) !== sig) return null
    return JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as RateLimitState
  } catch {
    return null
  }
}

function serializeCookie(state: RateLimitState): string {
  const encoded = Buffer.from(JSON.stringify(state)).toString('base64url')
  return `${encoded}.${hmac(encoded)}`
}

function checkRateLimit(cookieHeader: string | null): {
  limited: boolean
  newState: RateLimitState
} {
  const now = Date.now()

  let existing: RateLimitState | null = null
  if (cookieHeader) {
    const match = cookieHeader
      .split(';')
      .map((c) => c.trim())
      .find((c) => c.startsWith(`${COOKIE_NAME}=`))
    if (match) {
      existing = parseCookie(match.slice(COOKIE_NAME.length + 1))
    }
  }

  if (!existing || now > existing.resetAt) {
    return { limited: false, newState: { count: 1, resetAt: now + WINDOW_MS } }
  }
  if (existing.count >= MAX_REQUESTS) {
    return { limited: true, newState: existing }
  }
  return { limited: false, newState: { ...existing, count: existing.count + 1 } }
}

function applyRateLimitCookie(response: NextResponse, state: RateLimitState): NextResponse {
  const maxAge = Math.ceil((state.resetAt - Date.now()) / 1000)
  response.cookies.set(COOKIE_NAME, serializeCookie(state), {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: maxAge > 0 ? maxAge : 1,
    path: '/',
  })
  return response
}

type FooterGlobalWithContactForm = {
  contactForm?: string | { id?: string | null } | null
}

function getSelectedFormID(footer: FooterGlobalWithContactForm): string | null {
  const relation = footer.contactForm
  if (typeof relation === 'string') return relation
  if (relation && typeof relation === 'object' && typeof relation.id === 'string') {
    return relation.id
  }
  return null
}

function toSubmissionData(values: FooterInquiryValues) {
  return [
    { field: 'name', value: values.name },
    { field: 'companyName', value: values.companyName },
    { field: 'email', value: values.email },
    { field: 'phone', value: getCanonicalIndianMobile(values.phone) },
    { field: 'message', value: values.message },
  ]
}

async function resolveFooterFormID(payload: Awaited<ReturnType<typeof getPayloadClient>>) {
  const footer = (await payload.findGlobal({
    slug: 'footer',
    depth: 0,
  })) as FooterGlobalWithContactForm

  const configuredFormID = getSelectedFormID(footer)
  if (configuredFormID) {
    return { formID: configuredFormID, reason: 'footer-global' as const }
  }

  const forms = await payload.find({
    collection: 'forms',
    depth: 0,
    limit: 2,
    sort: '-createdAt',
  })

  if (forms.docs.length === 1) {
    return { formID: forms.docs[0].id, reason: 'single-form-fallback' as const }
  }

  if (forms.docs.length === 0) {
    return { formID: null, reason: 'no-forms' as const }
  }

  return { formID: null, reason: 'multiple-forms-unconfigured' as const }
}

export async function POST(request: Request) {
  const { limited, newState } = checkRateLimit(request.headers.get('cookie'))

  if (limited) {
    const res = NextResponse.json(
      { ok: false, message: 'Too many requests. Please try again later.' },
      { status: 429 },
    )
    return applyRateLimitCookie(res, newState)
  }

  let body: Partial<FooterInquiryValues> = {}

  try {
    body = (await request.json()) as Partial<FooterInquiryValues>
  } catch {
    return NextResponse.json(
      { ok: false, message: 'Invalid request body.' },
      { status: 400 },
    )
  }

  const validation = validateFooterInquiry(body)

  if (!validation.isValid) {
    return NextResponse.json(
      { ok: false, message: 'Validation failed.', errors: validation.errors },
      { status: 400 },
    )
  }

  try {
    const payload = await getPayloadClient()
    const { formID, reason } = await resolveFooterFormID(payload)

    if (!formID) {
      const message =
        reason === 'no-forms'
          ? 'No Payload form exists yet. Create one in Forms first.'
          : 'Footer contact form is not configured in Payload.'
      return NextResponse.json(
        { ok: false, message },
        { status: 503 },
      )
    }

    await payload.create({
      collection: 'form-submissions' as never,
      data: {
        form: formID,
        submissionData: toSubmissionData(validation.values),
      } as never,
    })

    const res = NextResponse.json({ ok: true })
    return applyRateLimitCookie(res, newState)
  } catch (error) {
    console.error('[footer-contact] submission failed', error)
    return NextResponse.json(
      { ok: false, message: 'Unable to submit your inquiry right now.' },
      { status: 500 },
    )
  }
}
