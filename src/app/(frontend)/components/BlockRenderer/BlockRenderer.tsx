import Hero from '../Hero/Hero'
import CoreOfferings from '../OurWork/OurWork'
import Projects from '../Projects/Projects'
import FeaturedClients from '../FeaturedClients/FeaturedClients'
import WhyBrandsChoose from '../WhyBrandsChoose/WhyBrandsChoose'
import StudioSection from '../StudioSection/StudioSection'
import PageHero from '../PageHero/PageHero'
import ServiceCards from '../ServiceCards/ServiceCards'
import Industries from '../Industries/Industries'
import HighlightCard from '../HighlightCard/HighlightCard'
import CTASection from '../CTASection/CTASection'

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
            const posterField = block.posterImage as { url?: string } | string | null | undefined
            const posterUrl =
              typeof posterField === 'object' && posterField?.url
                ? posterField.url
                : typeof posterField === 'string'
                  ? posterField
                  : null
            return (
              <div key={key} id="hero">
                <Hero
                  video={block.video as { url: string } | null}
                  posterUrl={posterUrl}
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
                <CoreOfferings block={block as Parameters<typeof CoreOfferings>[0]['block']} />
              </div>
            )

          case 'projects':
            return (
              <div key={key} id="work">
                <Projects block={block as Parameters<typeof Projects>[0]['block']} />
              </div>
            )

          case 'featured-clients':
            return (
              <FeaturedClients
                key={key}
                block={block as Parameters<typeof FeaturedClients>[0]['block']}
              />
            )

          case 'why-brands-choose':
            return (
              <div key={key} id="about">
                <WhyBrandsChoose block={block as Parameters<typeof WhyBrandsChoose>[0]['block']} />
              </div>
            )

          case 'studio-section':
            return (
              <div key={key} id="studio">
                <StudioSection block={block as Parameters<typeof StudioSection>[0]['block']} />
              </div>
            )

          case 'cta-section':
            return (
              <CTASection key={key} block={block as Parameters<typeof CTASection>[0]['block']} />
            )

          case 'page-hero':
            return <PageHero key={key} block={block as Parameters<typeof PageHero>[0]['block']} />

          case 'service-cards':
            return (
              <ServiceCards
                key={key}
                block={block as Parameters<typeof ServiceCards>[0]['block']}
              />
            )

          case 'industries':
            return (
              <Industries key={key} block={block as Parameters<typeof Industries>[0]['block']} />
            )

          case 'highlight-card':
            return (
              <HighlightCard
                key={key}
                block={block as Parameters<typeof HighlightCard>[0]['block']}
              />
            )

          default:
            return null
        }
      })}
    </>
  )
}
