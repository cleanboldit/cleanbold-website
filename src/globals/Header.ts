import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
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
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Logo Image',
    },
    {
      name: 'navigation',
      type: 'array',
      label: 'Navigation Links',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Link Label',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'URL / Section ID',
          admin: {
            description:
              'Use /services to link to the Services page route. Use #section-id for home-page scroll anchors (e.g. #about, #studio, #work, #contact).',
          },
        },
        {
          name: 'hasDropdown',
          type: 'checkbox',
          defaultValue: false,
          label: 'Has Dropdown',
        },
      ],
    },
    {
      name: 'ctaButton',
      type: 'group',
      label: 'CTA Button',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          defaultValue: "Let's Work Together",
          label: 'Button Text',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          defaultValue: '#contact',
          label: 'Button URL',
        },
      ],
    },
  ],
}
