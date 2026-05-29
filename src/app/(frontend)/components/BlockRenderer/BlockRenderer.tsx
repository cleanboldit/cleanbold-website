import dynamic from 'next/dynamic'

const Hero = dynamic(() => import('../Hero/Hero'))
const CoreOfferings = dynamic(() => import('../OurWork/OurWork'))
const Projects = dynamic(() => import('../Projects/Projects'))
const FeaturedClients = dynamic(() => import('../FeaturedClients/FeaturedClients'))
const WhyBrandsChoose = dynamic(() => import('../WhyBrandsChoose/WhyBrandsChoose'))
const StudioSection = dynamic(() => import('../StudioSection/StudioSection'))
const PageHero = dynamic(() => import('../PageHero/PageHero'))
const ServiceCards = dynamic(() => import('../ServiceCards/ServiceCards'))
const Industries = dynamic(() => import('../Industries/Industries'))
const HighlightCard = dynamic(() => import('../HighlightCard/HighlightCard'))
const CTASection = dynamic(() => import('../CTASection/CTASection'))

type Block = { blockType: string; id?: string | null } & Record<string, unknown>

interface BlockRendererProps {
  readonly blocks: Block[]
}

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks?.length) return null

  return (
    <>
      {blocks.map((block: Block) => {
        const key = block.id ?? block.blockType

        switch (block.blockType) {
          case 'hero': {
            const getMedia = (field: unknown): { url: string; mimeType?: string | null } | null => {
              if (typeof field === 'object' && field !== null && 'url' in field) {
                const mediaObj = field as { url: string; mimeType?: string | null }
                if (typeof mediaObj.url === 'string') {
                  return { url: mediaObj.url, mimeType: mediaObj.mimeType }
                }
              }
              if (typeof field === 'string' && (field.startsWith('/') || field.startsWith('http') || field.includes('.'))) {
                return { url: field, mimeType: null }
              }
              return null
            }

            const videoMedia = getMedia(block.video)
            const mobileVideoMedia = getMedia(block.mobileVideo)
            const posterMedia = getMedia(block.posterImage)
            const mobilePosterMedia = getMedia(block.mobilePosterImage)

            return (
              <div key={key} id="hero">
                <Hero
                  video={videoMedia}
                  mobileVideo={mobileVideoMedia}
                  posterUrl={posterMedia?.url ?? null}
                  mobilePosterUrl={mobilePosterMedia?.url ?? null}
                  fallbackBackgroundColor={
                    typeof block.fallbackBackgroundColor === 'string'
                      ? block.fallbackBackgroundColor
                      : null
                  }
                  primaryButtonText={block.primaryButtonText as string | null}
                  primaryButtonUrl={block.primaryButtonUrl as string | null}
                  secondaryButtonText={block.secondaryButtonText as string | null}
                  secondaryButtonUrl={block.secondaryButtonUrl as string | null}
                />
              </div>
            )
          }

          case 'core-offerings':
            return (
              <div key={key} id="services">
                <CoreOfferings block={block as any} />
              </div>
            )

          case 'projects':
            return (
              <div key={key} id="work">
                <Projects block={block as any} />
              </div>
            )

          case 'featured-clients':
            return (
              <FeaturedClients
                key={key}
                block={block as any}
              />
            )

          case 'why-brands-choose':
            return (
              <div key={key} id="about">
                <WhyBrandsChoose block={block as any} />
              </div>
            )

          case 'studio-section':
            return (
              <div key={key} id="studio">
                <StudioSection block={block as any} />
              </div>
            )

          case 'cta-section':
            return (
              <CTASection key={key} block={block as any} />
            )

          case 'page-hero':
            return <PageHero key={key} block={block as any} />

          case 'service-cards':
            return (
              <ServiceCards
                key={key}
                block={block as any}
              />
            )

          case 'industries':
            return (
              <Industries key={key} block={block as any} />
            )

          case 'highlight-card':
            return (
              <HighlightCard
                key={key}
                block={block as any}
              />
            )

          default:
            return null
        }
      })}
    </>
  )
}
