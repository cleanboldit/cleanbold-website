import Footer from './components/Footer/Footer'
import { getGlobal } from '@/lib/payload'
import type { Footer as FooterGlobal } from '@/payload-types'

export default async function AsyncFooter() {
  const footer = (await getGlobal('footer')) as FooterGlobal
  return (
    <div id="contact">
      <Footer data={footer} />
    </div>
  )
}
