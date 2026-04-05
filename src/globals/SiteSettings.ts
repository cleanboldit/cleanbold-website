import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  versions: {
    drafts: {
      autosave: false,
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteTitle',
      type: 'text',
      required: true,
      defaultValue: 'Cleanbold Advertising',
      label: 'Site Title',
    },
    {
      name: 'siteDescription',
      type: 'textarea',
      required: true,
      label: 'Site Description (SEO)',
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Open Graph Image (Social Sharing)',
    },
  ],
}
