import { getDevlogBySlug, getDevlogs } from '@/lib/devlogs'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { ArticleGrid } from '@/components/mdx/MagazineComponents'
import mdxComponents from '@/components/mdx/mdxComponents'

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
    <div className="min-h-screen bg-black text-zinc-100">
      {/* Background effects */}
      <div className="fixed inset-0 bg-black pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-700/30 backdrop-blur-xl bg-zinc-950/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            href="/devlog" 
            className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors text-sm font-mono"
          >
            <span>←</span> BACK TO LOGS
          </Link>
          <div className="flex items-center gap-3 text-xs text-emerald-400 font-mono">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span>SYSTEM: ONLINE</span>
          </div>
        </div>
      </header>

      {/* Magazine Layout */}
      <main className="relative">
        <ArticleGrid>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={mdxComponents}
          >
            {devlog.content}
          </ReactMarkdown>
        </ArticleGrid>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-zinc-800 backdrop-blur-xl bg-black/60 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <p className="text-zinc-500 text-sm font-mono">
            DEVELOPER MAGAZINE — Chronicling{' '}
            <Link href="/" className="text-[#CC5500] hover:text-[#8B4513] transition-colors">
              THE S33K3R TRANSMISSION
            </Link>
          </p>
          <p className="mt-2 text-xs text-slate-600 font-mono">
            All entries authenticated by J.W. — December 2025
          </p>
        </div>
      </footer>
    </div>
  )
}
