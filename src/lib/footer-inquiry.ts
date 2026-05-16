export type FooterInquiryValues = {
  name: string
  companyName: string
  email: string
  phone: string
  message: string
}

export type FooterInquiryErrors = Partial<Record<keyof FooterInquiryValues, string>>

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function cleanString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function normalizePhone(rawPhone: string): string {
  return rawPhone.replace(/[\s()-]/g, '')
}

function isValidIndianMobile(rawPhone: string): boolean {
  const normalized = normalizePhone(rawPhone)
  const match = normalized.match(/^(?:\+91|91)?([6-9]\d{9})$/)
  return match != null
}

export function getFooterInquiryDefaults(): FooterInquiryValues {
  return {
    name: '',
    companyName: '',
    email: '',
    phone: '',
    message: '',
  }
}

export function validateFooterInquiry(input: Partial<FooterInquiryValues>): {
  values: FooterInquiryValues
  errors: FooterInquiryErrors
  isValid: boolean
} {
  const values: FooterInquiryValues = {
    name: cleanString(input.name),
    companyName: cleanString(input.companyName),
    email: cleanString(input.email).toLowerCase(),
    phone: cleanString(input.phone),
    message: cleanString(input.message),
  }

  const errors: FooterInquiryErrors = {}

  if (!values.name) errors.name = 'Please enter your name.'
  else if (values.name.length > 100) errors.name = 'Name must be 100 characters or less.'

  if (!values.companyName) errors.companyName = 'Please enter your company name.'
  else if (values.companyName.length > 100) errors.companyName = 'Company name must be 100 characters or less.'

  if (!values.email) {
    errors.email = 'Please enter your email address.'
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = 'Please enter a valid email address.'
  } else if (values.email.length > 254) {
    errors.email = 'Email address is too long.'
  }

  if (!values.phone) {
    errors.phone = 'Please enter your mobile number.'
  } else if (!isValidIndianMobile(values.phone)) {
    errors.phone = 'Please enter a valid Indian mobile number.'
  }

  if (!values.message) errors.message = 'Please enter your message.'
  else if (values.message.length > 2000) errors.message = 'Message must be 2000 characters or less.'

  return {
    values,
    errors,
    isValid: Object.keys(errors).length === 0,
  }
}

export function getCanonicalIndianMobile(rawPhone: string): string {
  const normalized = normalizePhone(rawPhone)
  const match = normalized.match(/^(?:\+91|91)?([6-9]\d{9})$/)
  return match?.[1] ?? normalized
}
