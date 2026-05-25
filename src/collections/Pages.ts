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
    {
      name: 'posterImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero poster (optional)',
      admin: {
        description:
          'Still image shown until the video can play. Export a JPEG/WebP frame from your video for best results.',
      },
    },
    {
      name: 'fallbackBackgroundColor',
      type: 'text',
      label: 'Fallback tint (optional)',
      admin: {
        description: 'Solid color behind the video while it loads (e.g. #1a237e).',
      },
    },
    {
      name: 'primaryButtonText',
      type: 'text',
      label: 'Primary Button Text',
      defaultValue: 'Start My Brand Journey',
    },
    {
      name: 'primaryButtonUrl',
      type: 'text',
      label: 'Primary Button URL',
      defaultValue: '#contact',
    },
    {
      name: 'secondaryButtonText',
      type: 'text',
      label: 'Secondary Button Text',
      defaultValue: 'See Our Work',
    },
    {
      name: 'secondaryButtonUrl',
      type: 'text',
      label: 'Secondary Button URL',
      defaultValue: '#work',
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
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Card Image',
        },
        {
          name: 'servicesList',
          type: 'array',
          label: 'Services List',
          fields: [
            {
              name: 'item',
              type: 'text',
              label: 'Service Item',
              required: true,
            },
          ],
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
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Card Background Image',
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
          label: 'Project Title',
        },
        {
          name: 'category',
          type: 'text',
          label: 'Category',
        },
        {
          name: 'route',
          type: 'text',
          label: 'Detail Route',
          admin: {
            description: 'Use a single route like /event or /brand-launch for the project detail page.',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Project Image',
        },
        {
          name: 'video',
          type: 'upload',
          relationTo: 'media',
          label: 'Project Video (optional — overrides image)',
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
        {
          name: 'projectDescription',
          type: 'richText',
          label: 'Project Description',
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
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Client Logo',
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
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Section Background Image',
    },
    {
      name: 'images',
      type: 'array',
      label: 'Bento Images',
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
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Card Full-Screen Background Image',
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
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Card Background Image',
    },
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
  hooks: {
    afterChange: [
      async ({ doc }) => {
        try {
          const slug = typeof doc.slug === 'string' ? doc.slug : null
          const { revalidatePagesCache } = await import('@/lib/revalidate')
          revalidatePagesCache(slug)
        } catch (e) {
          console.error('[revalidate] pages afterChange', e)
        }
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        try {
          const slug = typeof doc.slug === 'string' ? doc.slug : null
          const { revalidatePagesCache } = await import('@/lib/revalidate')
          revalidatePagesCache(slug)
        } catch (e) {
          console.error('[revalidate] pages afterDelete', e)
        }
      },
    ],
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
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
