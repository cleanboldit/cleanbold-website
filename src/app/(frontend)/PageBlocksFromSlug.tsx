import { notFound } from 'next/navigation'
import BlockRenderer from './components/BlockRenderer/BlockRenderer'
import { getPageBySlug } from '@/lib/payload'

type Props = {
  slug: string
  /** When true, missing page triggers notFound() (dynamic slug routes). */
  enforceFound?: boolean
}

export default async function PageBlocksFromSlug({ slug, enforceFound }: Props) {
  const page = await getPageBySlug(slug)
  if (enforceFound && page == null) {
    notFound()
  }
  return <BlockRenderer blocks={page?.layout ?? []} />
}
