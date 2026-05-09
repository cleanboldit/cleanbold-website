import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import Image from 'next/image'
import type { SerializedEditorState } from 'lexical'
import Link from 'next/link'
import styles from './ProjectDetail.module.css'
import type { ProjectDetail as ProjectDetailData } from '@/lib/project-details'

type Props = {
  project: ProjectDetailData
}

function getMediaUrl(media: ProjectDetailData['image'] | ProjectDetailData['video']) {
  if (!media) return null
  if (typeof media === 'string') return media
  return media.url ?? null
}

export default function ProjectDetail({ project }: Props) {
  const imageUrl = getMediaUrl(project.image)
  const videoUrl = getMediaUrl(project.video)
  const richTextHTML =
    project.description && typeof project.description === 'object'
      ? convertLexicalToHTML({ data: project.description as SerializedEditorState })
      : ''

  return (
    <article className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroTop}>
          <Link href="/#work" className={styles.backLink}>
            Back to work
          </Link>
          <div className={styles.copy}>
            {project.category ? <p className={styles.eyebrow}>{project.category}</p> : null}
            <h1 className={styles.title}>{project.title}</h1>
          </div>
        </div>

        <div className={styles.mediaFrame}>
          {videoUrl ? (
            <video
              src={videoUrl}
              className={styles.media}
              controls
              playsInline
              preload="metadata"
            />
          ) : imageUrl ? (
            <Image
              src={imageUrl}
              alt={project.title}
              fill
              className={styles.media}
              sizes="(max-width: 900px) 100vw, 60vw"
              priority
            />
          ) : (
            <div className={styles.mediaFallback} />
          )}
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.contentInner}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>Project Details</p>
            <h2 className={styles.contentTitle}>Overview</h2>
          </div>
          {richTextHTML ? (
            <div
              className={styles.richText}
              dangerouslySetInnerHTML={{ __html: richTextHTML }}
            />
          ) : (
            <p className={styles.emptyState}>Project details are coming soon.</p>
          )}
        </div>
      </section>
    </article>
  )
}
