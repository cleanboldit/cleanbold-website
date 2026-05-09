import { unstable_cache } from 'next/cache'
import { getCollection } from '@/lib/payload'
import { normalizeProjectRoute, normalizeProjectSlugSegment } from '@/lib/project-route'
import type { Media, Page } from '@/payload-types'

export type ProjectDetail = {
  category: string | null
  description: unknown | null
  id?: string | null
  image: string | Media | null
  parentPageSlug: string
  route: string
  size: string | null
  title: string
  video: string | Media | null
}

type ProjectsBlock = Extract<NonNullable<Page['layout']>[number], { blockType: 'projects' }>
type ProjectEntry = NonNullable<ProjectsBlock['projects']>[number]

function extractProjectEntries(page: Page): ProjectDetail[] {
  const layout = Array.isArray(page.layout) ? page.layout : []

  return layout.flatMap((block): ProjectDetail[] => {
    if (block.blockType !== 'projects' || !Array.isArray(block.projects)) {
      return []
    }

    return (block.projects as ProjectEntry[]).reduce<ProjectDetail[]>((acc, project) => {
        const route =
          typeof project.route === 'string' ? normalizeProjectRoute(project.route) : ''
        if (!route) return acc

        const category = typeof project.category === 'string' ? project.category : null
        const title =
          (typeof project.title === 'string' && project.title.trim()) ||
          (category && category.trim()) ||
          'Project'

        acc.push({
          category,
          description: project.projectDescription ?? null,
          id: project.id ?? null,
          image: project.image ?? null,
          parentPageSlug: page.slug,
          route,
          size: project.size ?? null,
          title,
          video: project.video ?? null,
        })

        return acc
      }, [])
  })
}

export async function getProjectByRouteSlug(slug: string) {
  const slugSegment = normalizeProjectSlugSegment(slug)

  return unstable_cache(
    async () => {
      const result = await getCollection('pages', {
        depth: 2,
        limit: 100,
      })

      const pages = result.docs as Page[]

      for (const page of pages) {
        const match = extractProjectEntries(page).find(
          (project) => normalizeProjectSlugSegment(project.route) === slugSegment,
        )

        if (match) {
          return match
        }
      }

      return null
    },
    ['project-route', slugSegment],
    { tags: ['cms:pages', 'cms:collection:pages'] },
  )()
}
