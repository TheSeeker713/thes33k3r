import { getDevlogBySlug, getDevlogs } from '@/lib/devlogs'
import DevlogReader from '@/components/DevlogReader'
import { notFound } from 'next/navigation'

interface DevlogDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const devlogs = await getDevlogs()
  return devlogs.map((devlog) => ({
    slug: devlog.slug
  }))
}

export default async function DevlogDetailPage({ params }: DevlogDetailPageProps) {
  const { slug } = await params
  const devlog = await getDevlogBySlug(slug)

  if (!devlog) {
    notFound()
  }

  return (
    <DevlogReader 
      content={devlog.content}
      title={devlog.title}
      timestamps={devlog.timestamps}
    />
  )
}
