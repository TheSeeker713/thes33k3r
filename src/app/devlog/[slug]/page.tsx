import { getDevlogBySlug, getDevlogs } from '@/lib/devlogs'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import SiteShell from '@/components/SiteShell'
export async function generateStaticParams() { return (await getDevlogs()).map(log => ({ slug: log.slug })) }
export async function generateMetadata({params}: {params: Promise<{slug:string}>}) { const {slug} = await params; const log = await getDevlogBySlug(slug); return {title: log?.subtitle || 'Archive entry'} }
export default async function DevlogPage({params}: {params: Promise<{slug:string}>}) {
 const {slug} = await params
 const log = await getDevlogBySlug(slug)
 if (!log) notFound()
 return <SiteShell><div className="article-header"><Link className="text-link" href="/devlog">← Development archive</Link><p className="eyebrow">HISTORICAL ENTRY / {log.number} / 2025</p></div><article className="prose"><ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeSanitize]}>{log.content}</ReactMarkdown></article></SiteShell>
}
