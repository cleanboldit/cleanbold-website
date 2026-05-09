import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'
import {
  getCanonicalIndianMobile,
  validateFooterInquiry,
  type FooterInquiryValues,
} from '@/lib/footer-inquiry'

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

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[footer-contact] submission failed', error)
    return NextResponse.json(
      { ok: false, message: 'Unable to submit your inquiry right now.' },
      { status: 500 },
    )
  }
}
