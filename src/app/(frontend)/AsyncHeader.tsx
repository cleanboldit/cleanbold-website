import Header from './components/Header/Header'
import { getGlobal } from '@/lib/payload'
import type { Header as HeaderGlobal } from '@/payload-types'

export default async function AsyncHeader() {
  const header = (await getGlobal('header')) as HeaderGlobal
  return <Header data={header} />
}
