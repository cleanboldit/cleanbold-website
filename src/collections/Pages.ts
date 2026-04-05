import type { Block, CollectionConfig } from 'payload'

// ─── Blocks ──────────────────────────────────────────────────────────────────

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Hero Blocks' },
  fields: [
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Hero Video',
      admin: {
        description: 'Upload an MP4 video file for the hero background.',
      },
    },
  ],
}

export const CoreOfferingsBlock: Block = {
  slug: 'core-offerings',
  labels: { singular: 'Core Offerings', plural: 'Core Offerings Blocks' },
  fields: [
    {
      name: 'sectionLabel',
      type: 'text',
      label: 'Section Label',
    },
    {
      name: 'mainTitle',
      type: 'text',
      label: 'Main Title',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'exploreButtonText',
      type: 'text',
      label: 'Button Text',
    },
    {
      name: 'offerings',
      type: 'array',
      label: 'Offerings',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Description',
        },
        {
          name: 'color',
          type: 'select',
          label: 'Card Background Color',
          options: [
            { label: 'Dark Blue', value: 'dark-blue' },
            { label: 'Dark Gray', value: 'dark-gray' },
            { label: 'Teal', value: 'teal' },
            { label: 'Purple', value: 'purple' },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Card Image',
        },
        {
          name: 'imagePosition',
          type: 'select',
          label: 'Image Position',
          options: [
            { label: 'Top', value: 'top' },
            { label: 'Bottom', value: 'bottom' },
          ],
        },
      ],
    },
  ],
}

export const ProjectsBlock: Block = {
  slug: 'projects',
  labels: { singular: 'Projects', plural: 'Projects Blocks' },
  fields: [
    {
      name: 'sectionLabel',
      type: 'text',
      label: 'Section Label',
    },
    {
      name: 'mainTitle',
      type: 'text',
      label: 'Main Title',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'exploreButtonText',
      type: 'text',
      label: 'Button Text',
    },
    {
      name: 'projects',
      type: 'array',
      label: 'Projects',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
        },
        {
          name: 'category',
          type: 'text',
          label: 'Category',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Project Image',
        },
        {
          name: 'size',
          type: 'select',
          label: 'Card Size',
          options: [
            { label: 'Large', value: 'large' },
            { label: 'Small', value: 'small' },
          ],
        },
      ],
    },
  ],
}

export const FeaturedClientsBlock: Block = {
  slug: 'featured-clients',
  labels: { singular: 'Featured Clients', plural: 'Featured Clients Blocks' },
  fields: [
    {
      name: 'sectionLabel',
      type: 'text',
      label: 'Section Label',
    },
    {
      name: 'mainTitle',
      type: 'text',
      label: 'Main Title',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'ctaButtonText',
      type: 'text',
      label: 'CTA Button Text',
    },
    {
      name: 'clients',
      type: 'array',
      label: 'Clients',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Client Name',
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Client Logo',
        },
        {
          name: 'row',
          type: 'select',
          label: 'Marquee Row',
          options: [
            { label: 'Row 1', value: '1' },
            { label: 'Row 2', value: '2' },
            { label: 'Row 3', value: '3' },
            { label: 'Row 4', value: '4' },
          ],
        },
        {
          name: 'order',
          type: 'number',
          label: 'Order within row',
        },
      ],
    },
  ],
}

export const WhyBrandsChooseBlock: Block = {
  slug: 'why-brands-choose',
  labels: { singular: 'Why Brands Choose', plural: 'Why Brands Choose Blocks' },
  fields: [
    {
      name: 'sections',
      type: 'array',
      label: 'Sections',
      minRows: 3,
      maxRows: 3,
      fields: [
        {
          name: 'sectionLabel',
          type: 'text',
          label: 'Section Label',
        },
        {
          name: 'mainHeading',
          type: 'text',
          label: 'Main Heading',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
        },
        {
          name: 'featuresTitle',
          type: 'text',
          label: 'Features Title',
        },
        {
          name: 'features',
          type: 'array',
          label: 'Features',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
              label: 'Feature Text',
            },
          ],
        },
        {
          name: 'approachSteps',
          type: 'array',
          label: 'Approach Steps',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Step Title',
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              label: 'Step Description',
            },
          ],
        },
      ],
    },
  ],
}

export const StudioSectionBlock: Block = {
  slug: 'studio-section',
  labels: { singular: 'Studio Section', plural: 'Studio Section Blocks' },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'studioImages',
      type: 'array',
      label: 'Studio Images',
      minRows: 3,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Image',
        },
      ],
    },
    {
      name: 'perfectFor',
      type: 'array',
      label: 'Perfect For (Marquee items)',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
          label: 'Item',
        },
      ],
    },
    {
      name: 'detailsSection',
      type: 'group',
      label: 'Details Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
        },
        {
          name: 'locationTitle',
          type: 'text',
          label: 'Location Title',
        },
        {
          name: 'locationAddress',
          type: 'textarea',
          label: 'Location Address',
        },
        {
          name: 'bookButtonText',
          type: 'text',
          label: 'Book Button Text',
        },
      ],
    },
  ],
}

// ─── Pages Collection ─────────────────────────────────────────────────────────

export const PageHeroBlock: Block = {
  slug: 'page-hero',
  labels: { singular: 'Page Hero', plural: 'Page Hero Blocks' },
  fields: [
    { name: 'mainTitle', type: 'text', label: 'Main Title' },
    { name: 'description', type: 'textarea', label: 'Description' },
    {
      name: 'images',
      type: 'array',
      label: 'Images',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true, label: 'Image' },
      ],
    },
  ],
}

export const ServiceCardsBlock: Block = {
  slug: 'service-cards',
  labels: { singular: 'Service Cards', plural: 'Service Cards Blocks' },
  fields: [
    {
      name: 'cards',
      type: 'array',
      label: 'Service Cards',
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Title' },
        { name: 'description', type: 'textarea', label: 'Description' },
        {
          name: 'color',
          type: 'select',
          label: 'Card Background Color',
          options: [
            { label: 'Dark Blue', value: 'dark-blue' },
            { label: 'Dark Gray', value: 'dark-gray' },
            { label: 'Teal', value: 'teal' },
            { label: 'Purple', value: 'purple' },
          ],
        },
        { name: 'servicesTitle', type: 'text', label: 'Services Column Title' },
        {
          name: 'services',
          type: 'array',
          label: 'Services Included',
          fields: [{ name: 'text', type: 'text', required: true, label: 'Service' }],
        },
        { name: 'idealForLabel', type: 'text', label: 'Ideal For Label' },
        {
          name: 'idealForTags',
          type: 'array',
          label: 'Ideal For Tags',
          fields: [{ name: 'tag', type: 'text', required: true, label: 'Tag' }],
        },
      ],
    },
  ],
}

export const IndustriesBlock: Block = {
  slug: 'industries',
  labels: { singular: 'Industries', plural: 'Industries Blocks' },
  fields: [
    { name: 'mainTitle', type: 'text', label: 'Main Title' },
    {
      name: 'industries',
      type: 'array',
      label: 'Industries',
      minRows: 2,
      fields: [
        { name: 'name', type: 'text', required: true, label: 'Industry Name' },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Industry Image' },
      ],
    },
  ],
}

export const HighlightCardBlock: Block = {
  slug: 'highlight-card',
  labels: { singular: 'Highlight Card', plural: 'Highlight Card Blocks' },
  fields: [
    { name: 'title', type: 'text', label: 'Title' },
    { name: 'description', type: 'textarea', label: 'Description' },
    {
      name: 'bulletPoints',
      type: 'array',
      label: 'Bullet Points',
      fields: [{ name: 'text', type: 'text', required: true, label: 'Point' }],
    },
  ],
}

export const CTASectionBlock: Block = {
  slug: 'cta-section',
  labels: { singular: 'CTA Section', plural: 'CTA Section Blocks' },
  fields: [
    { name: 'sectionLabel', type: 'text', label: 'Section Label' },
    { name: 'mainTitle', type: 'text', label: 'Main Title' },
    { name: 'description', type: 'textarea', label: 'Description' },
    { name: 'buttonText', type: 'text', label: 'Button Text' },
    { name: 'buttonUrl', type: 'text', label: 'Button URL' },
  ],
}

// ─── Pages Collection ─────────────────────────────────────────────────────────

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: {
      autosave: false,
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Page Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: {
        description:
          'URL path for this page. Use "home" for the homepage (served at /). All other slugs are served at /slug.',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      label: 'Page Layout',
      blocks: [
        HeroBlock,
        CoreOfferingsBlock,
        ProjectsBlock,
        FeaturedClientsBlock,
        WhyBrandsChooseBlock,
        StudioSectionBlock,
        PageHeroBlock,
        ServiceCardsBlock,
        IndustriesBlock,
        HighlightCardBlock,
        CTASectionBlock,
      ],
    },
  ],
}
