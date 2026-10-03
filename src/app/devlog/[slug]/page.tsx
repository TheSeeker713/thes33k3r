import { getDevlogBySlug, getDevlogs } from '@/lib/devlogs'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import SiteShell from '@/components/SiteShell'

type PageProps = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getDevlogs()).map(log => ({ slug: log.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const log = await getDevlogBySlug(slug)
  return { title: log?.title || 'Archive entry', description: log?.excerpt, authors: log ? [{ name: log.author }] : undefined }
}

export default async function DevlogPage({ params }: PageProps) {
  const { slug } = await params
  const log = await getDevlogBySlug(slug)
  if (!log) notFound()
  const entries = await getDevlogs()
  const index = entries.findIndex(entry => entry.slug === slug)
  const previous = entries[index - 1]
  const next = entries[index + 1]

  return <SiteShell>
    <header className="article-header">
      <Link className="text-link" href="/devlog">← Development archive</Link>
      <p className="eyebrow">ENTRY {log.number} / {log.phase} / <time dateTime={log.startDate}>{log.dateRange}</time></p>
      <p className="article-byline">By {log.author}, {log.authorRole}</p>
    </header>
    <article className="prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeSanitize]}>{log.content}</ReactMarkdown>
    </article>
    <nav className="article-navigation" aria-label="Continue through the development archive">
      {previous ? <Link href={`/devlog/${previous.slug}`}><span className="eyebrow">← Previous entry / {previous.number}</span><span>{previous.title}</span></Link> : <Link href="/devlog"><span className="eyebrow">The archive begins here</span><span>Browse all entries</span></Link>}
      {next ? <Link href={`/devlog/${next.slug}`}><span className="eyebrow">Next entry / {next.number} →</span><span>{next.title}</span></Link> : <Link href="/devlog"><span className="eyebrow">You're up to date</span><span>Return to the archive</span></Link>}
    </nav>
  </SiteShell>
}
