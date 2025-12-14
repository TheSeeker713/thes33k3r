'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

interface DevlogReaderProps {
  content: string
  title: string
  timestamps: string[]
}

export default function DevlogReader({ content, title, timestamps }: DevlogReaderProps) {
  const [activeTimestamp, setActiveTimestamp] = useState<string | null>(null)

  const scrollToTimestamp = (timestamp: string) => {
    setActiveTimestamp(timestamp)
    
    // Find the element containing this timestamp
    const elements = document.querySelectorAll('h3')
    for (const el of elements) {
      if (el.textContent?.includes(timestamp)) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        break
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-slate-900 to-zinc-950 text-slate-100">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent_50%)] pointer-events-none" />
      
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-700/30 backdrop-blur-xl bg-zinc-950/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            href="/devlog" 
            className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors text-sm font-mono"
          >
            <span>←</span> BACK TO LOGS
          </Link>
          <div className="text-xs text-slate-500 font-mono">
            SYSTEM: ONLINE • DIR: /SRC/CONTENT/DEVLOG
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex gap-8">
          {/* Timeline Sidebar */}
          {timestamps.length > 0 && (
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden lg:block w-64 flex-shrink-0"
            >
              <div className="sticky top-24">
                <h3 className="text-sm font-mono text-slate-500 mb-4 uppercase tracking-wider">
                  Timeline Index
                </h3>
                <nav className="space-y-2">
                  {timestamps.map((timestamp, index) => (
                    <motion.button
                      key={index}
                      onClick={() => scrollToTimestamp(timestamp)}
                      whileHover={{ x: 4, color: '#fbbf24' }}
                      className={`block w-full text-left px-3 py-2 text-sm font-mono rounded transition-colors ${
                        activeTimestamp === timestamp
                          ? 'bg-amber-500/20 text-amber-400 border-l-2 border-amber-500'
                          : 'text-slate-400 hover:bg-slate-800/50 border-l-2 border-transparent'
                      }`}
                    >
                      [{timestamp}]
                    </motion.button>
                  ))}
                </nav>
              </div>
            </motion.aside>
          )}

          {/* Main Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 max-w-4xl"
          >
            {/* Article Header */}
            <div className="mb-12">
              <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 mb-4">
                {title}
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full"></div>
            </div>

            {/* Markdown Content with CRT Terminal Styling */}
            <div className="prose prose-invert prose-amber max-w-none
              prose-headings:text-amber-400 prose-headings:font-bold
              prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8 prose-h1:font-serif
              prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-6 prose-h2:border-b prose-h2:border-slate-700/50 prose-h2:pb-3 prose-h2:font-serif
              prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-5 prose-h3:text-slate-200
              prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-4 prose-p:text-lg
              prose-strong:text-amber-300 prose-strong:font-semibold
              prose-em:text-slate-400 prose-em:italic
              prose-ul:text-slate-300 prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-4
              prose-ol:text-slate-300 prose-ol:list-decimal prose-ol:ml-6 prose-ol:mb-4
              prose-li:mb-2
              prose-a:text-amber-400 prose-a:underline prose-a:decoration-amber-500/30 hover:prose-a:text-amber-300 hover:prose-a:decoration-amber-400/50
              prose-blockquote:border-l-4 prose-blockquote:border-amber-600 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-slate-400 prose-blockquote:bg-slate-900/30 prose-blockquote:py-2
              prose-hr:border-slate-700/50 prose-hr:my-8
              prose-table:text-slate-300">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  // CRT Terminal styling for code blocks
                  pre: ({ node, ...props }) => (
                    <div className="relative my-6 group">
                      {/* Scanlines effect */}
                      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,0,0.1)_2px,rgba(0,255,0,0.1)_4px)] rounded-lg"></div>
                      
                      <pre
                        className="relative bg-black/90 border-2 border-emerald-500/50 rounded-lg p-6 overflow-x-auto shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-shadow duration-300"
                        {...props}
                      />
                      
                      {/* Terminal header */}
                      <div className="absolute top-2 right-2 flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-500/60"></div>
                      </div>
                    </div>
                  ),
                  code: ({ node, className, ...props }) => {
                    const isInline = !className?.includes('language-')
                    if (isInline) {
                      return (
                        <code
                          className="px-2 py-0.5 bg-emerald-950/50 text-emerald-400 border border-emerald-500/30 rounded font-mono text-sm"
                          {...props}
                        />
                      )
                    }
                    return (
                      <code
                        className="text-emerald-400 font-mono text-sm leading-relaxed"
                        {...props}
                      />
                    )
                  }
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </motion.article>
        </div>
      </div>
    </div>
  )
}
