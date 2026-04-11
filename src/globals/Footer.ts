import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  versions: {
    drafts: {
      autosave: false,
    },
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async () => {
        try {
          const { revalidateGlobalsCache } = await import('@/lib/revalidate')
          revalidateGlobalsCache()
        } catch (e) {
          console.error('[revalidate] footer afterChange', e)
        }
      },
    ],
  },
  fields: [
    {
      name: 'contactSection',
      type: 'group',
      label: 'Contact Form Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: "Let's Build\nSomething Bold\nAnd Better",
          label: 'Title',
        },
        {
          name: 'subtitle',
          type: 'textarea',
          required: true,
          label: 'Subtitle',
        },
        {
          name: 'formTitle',
          type: 'text',
          required: true,
          defaultValue: 'Start The Conversation',
          label: 'Form Title',
        },
      ],
    },
    {
      name: 'companyInfo',
      type: 'group',
      label: 'Company Information',
      fields: [
        {
          name: 'brandName',
          type: 'text',
          required: true,
          defaultValue: 'Cleanbold',
          label: 'Brand Name',
        },
        {
          name: 'advertising',
          type: 'text',
          required: true,
          defaultValue: 'Advertising',
          label: 'Advertising',
        },
        {
          name: 'tagline',
          type: 'text',
          required: true,
          defaultValue: 'Where Creativity Converts.',
          label: 'Tagline',
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
          label: 'Phone Number',
        },
        {
          name: 'email',
          type: 'email',
          required: true,
          label: 'Email Address',
        },
        {
          name: 'location',
          type: 'text',
          required: true,
          label: 'Location',
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Media Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Twitter/X', value: 'twitter' },
          ],
          label: 'Platform',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'Profile URL',
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      required: true,
      defaultValue: '© 2025 Cleanbold Advertising. All Rights Reserved.',
      label: 'Copyright Text',
    },
  ],
}
