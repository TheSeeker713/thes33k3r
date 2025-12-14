'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

// Import devlog JSON metadata
import devlog01 from './data/devlogs01.json'
import devlog02 from './data/devlogs02.json'
import devlog03 from './data/devlogs03.json'
import devlog04 from './data/devlogs04.json'
import devlog05 from './data/devlogs05.json'
import devlog06 from './data/devlogs06.json'
import devlog07 from './data/devlogs07.json'

const devlogs = [devlog07, devlog06, devlog05, devlog04, devlog03, devlog02, devlog01] // Reverse chronological order

export default function DevlogPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [devlogContents, setDevlogContents] = useState<Record<string, string>>({})

  useEffect(() => {
    // Fetch markdown content for expanded article
    if (expandedId) {
      const devlog = devlogs.find((d) => d.id === expandedId)
      if (devlog && !devlogContents[expandedId]) {
        fetch(devlog.contentPath.replace('../../../', '/'))
          .then((res) => res.text())
          .then((text) => {
            setDevlogContents((prev) => ({ ...prev, [expandedId]: text }))
          })
          .catch(() => {
            setDevlogContents((prev) => ({ ...prev, [expandedId]: 'Error loading content.' }))
          })
      }
    }
  }, [expandedId])

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-slate-900 to-zinc-950 text-slate-100">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.3)_100%)] pointer-events-none" />

      {/* Header */}
      <header className="relative border-b border-slate-700/30 backdrop-blur-xl bg-zinc-950/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors text-sm mb-4"
          >
            <span>←</span> Back to Transmission
          </Link>
          <h1 className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 mb-3">
            Developer Magazine
          </h1>
          <p className="text-slate-400 text-lg">
            Chronicles of building THE S33K3R TRANSMISSION — an evolving EARTIX experience
          </p>
        </div>
      </header>

      {/* Magazine grid */}
      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="space-y-6">
          {devlogs.map((devlog, index) => (
            <motion.article
              key={devlog.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              layout
              className="group relative overflow-hidden rounded-2xl border border-slate-700/40 backdrop-blur-md bg-gradient-to-br from-slate-900/80 to-zinc-900/80 shadow-2xl hover:shadow-amber-900/20 hover:scale-[1.01] hover:border-amber-500/30 transition-all duration-300"
            >
              {/* Glassmorphism edge glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/5 via-transparent to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="relative p-6 sm:p-8">
                {/* Metadata header */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-4">
                  <motion.time 
                    whileHover={{ scale: 1.05, color: '#fbbf24' }}
                    className="flex items-center gap-1.5 font-mono cursor-default"
                  >
                    <span className="text-amber-500">📅</span>
                    {devlog.date}
                  </motion.time>
                  <span className="text-slate-600">•</span>
                  <motion.time 
                    whileHover={{ scale: 1.05, color: '#fbbf24' }}
                    className="flex items-center gap-1.5 font-mono cursor-default"
                  >
                    <span className="text-amber-500">🕐</span>
                    {devlog.time} {devlog.timezone}
                  </motion.time>
                  <span className="text-slate-600">•</span>
                  <motion.span 
                    whileHover={{ scale: 1.05, color: '#fbbf24' }}
                    className="flex items-center gap-1.5 font-mono cursor-default"
                  >
                    <span className="text-amber-500">✍️</span>
                    {devlog.author}
                  </motion.span>
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4 group-hover:text-amber-400 transition-colors">
                  {devlog.title}
                </h2>

                {/* Excerpt */}
                <p className="text-slate-300 leading-relaxed mb-6">{devlog.excerpt}</p>

                {/* Read More button */}
                <motion.button
                  onClick={() => setExpandedId(expandedId === devlog.id ? null : devlog.id)}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(251, 191, 36, 0.6)' }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold shadow-lg"
                >
                  {expandedId === devlog.id ? (
                    <>
                      <span>Collapse</span>
                      <motion.span 
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 180 }}
                        className="text-sm"
                      >
                        ▲
                      </motion.span>
                    </>
                  ) : (
                    <>
                      <span>Read Full Entry</span>
                      <motion.span 
                        initial={{ rotate: 0 }}
                        className="text-sm"
                      >
                        ▼
                      </motion.span>
                    </>
                  )}
                </motion.button>

                {/* Expanded content */}
                <AnimatePresence>
                  {expandedId === devlog.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 pt-6 border-t border-slate-700/40">
                        {devlogContents[devlog.id] ? (
                          <div className="prose prose-invert prose-amber max-w-none
                            prose-headings:text-amber-400 prose-headings:font-bold
                            prose-h1:text-3xl prose-h1:mb-4 prose-h1:mt-6
                            prose-h2:text-2xl prose-h2:mb-3 prose-h2:mt-5 prose-h2:border-b prose-h2:border-slate-700/50 prose-h2:pb-2
                            prose-h3:text-xl prose-h3:mb-2 prose-h3:mt-4
                            prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-4
                            prose-strong:text-amber-300 prose-strong:font-semibold
                            prose-em:text-slate-400 prose-em:italic
                            prose-code:text-cyan-400 prose-code:bg-zinc-900/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                            prose-pre:bg-zinc-900/80 prose-pre:border prose-pre:border-slate-800/50 prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto
                            prose-ul:text-slate-300 prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-4
                            prose-ol:text-slate-300 prose-ol:list-decimal prose-ol:ml-6 prose-ol:mb-4
                            prose-li:mb-2
                            prose-a:text-amber-400 prose-a:underline prose-a:decoration-amber-500/30 hover:prose-a:text-amber-300 hover:prose-a:decoration-amber-400/50
                            prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-slate-400
                            prose-hr:border-slate-700/50 prose-hr:my-6
                            prose-table:text-slate-300">
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              rehypePlugins={[rehypeRaw]}
                            >
                              {devlogContents[devlog.id]}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center justify-center py-8 text-slate-500"
                          >
                            <div className="flex items-center gap-2">
                              <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full"
                              />
                              <span>Loading content...</span>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Back to top */}
        <div className="mt-12 text-center">
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.05, borderColor: 'rgba(251, 191, 36, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-700/40 text-slate-400 hover:text-amber-400 transition-colors backdrop-blur-md bg-zinc-900/60"
          >
            <motion.span
              initial={{ y: 0 }}
              animate={{ y: [-2, 0, -2] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ↑
            </motion.span>
            <span>Back to Top</span>
          </motion.button>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-slate-700/30 backdrop-blur-xl bg-zinc-950/60 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-center text-slate-500 text-sm">
          <p>
            Developer Magazine — chronicling the evolution of{' '}
            <Link href="/" className="text-amber-500 hover:text-amber-400 transition-colors">
              THE S33K3R TRANSMISSION
            </Link>
          </p>
          <p className="mt-2 text-xs">All entries signed by J.W. — December 2025</p>
        </div>
      </footer>
    </div>
  )
}
