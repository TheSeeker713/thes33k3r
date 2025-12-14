'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

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
          {devlogs.map((devlog) => (
            <motion.article
              key={devlog.id}
              layout
              className="group relative overflow-hidden rounded-2xl border border-slate-700/40 backdrop-blur-md bg-gradient-to-br from-slate-900/80 to-zinc-900/80 shadow-2xl hover:shadow-amber-900/20 transition-shadow"
            >
              {/* Glassmorphism edge glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/5 via-transparent to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="relative p-6 sm:p-8">
                {/* Metadata header */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-4">
                  <time className="flex items-center gap-1.5 font-mono">
                    <span className="text-amber-500">📅</span>
                    {devlog.date}
                  </time>
                  <span className="text-slate-600">•</span>
                  <time className="flex items-center gap-1.5 font-mono">
                    <span className="text-amber-500">🕐</span>
                    {devlog.time} {devlog.timezone}
                  </time>
                  <span className="text-slate-600">•</span>
                  <span className="flex items-center gap-1.5 font-mono">
                    <span className="text-amber-500">✍️</span>
                    {devlog.author}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4 group-hover:text-amber-400 transition-colors">
                  {devlog.title}
                </h2>

                {/* Excerpt */}
                <p className="text-slate-300 leading-relaxed mb-6">{devlog.excerpt}</p>

                {/* Read More button */}
                <button
                  onClick={() => setExpandedId(expandedId === devlog.id ? null : devlog.id)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold shadow-lg hover:shadow-amber-600/50 hover:scale-105 transition-all"
                >
                  {expandedId === devlog.id ? (
                    <>
                      <span>Collapse</span>
                      <span className="text-sm">▲</span>
                    </>
                  ) : (
                    <>
                      <span>Read Full Entry</span>
                      <span className="text-sm">▼</span>
                    </>
                  )}
                </button>

                {/* Expanded content */}
                <AnimatePresence>
                  {expandedId === devlog.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 pt-6 border-t border-slate-700/40">
                        <div className="prose prose-invert prose-amber max-w-none">
                          {devlogContents[devlog.id] ? (
                            <pre className="whitespace-pre-wrap text-sm text-slate-300 font-mono leading-relaxed bg-zinc-950/50 p-4 rounded-lg border border-slate-800/50 overflow-x-auto">
                              {devlogContents[devlog.id]}
                            </pre>
                          ) : (
                            <div className="flex items-center justify-center py-8 text-slate-500">
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                                <span>Loading content...</span>
                              </div>
                            </div>
                          )}
                        </div>
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
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-700/40 text-slate-400 hover:text-amber-400 hover:border-amber-600/40 transition-colors backdrop-blur-md bg-zinc-900/60"
          >
            <span>↑</span>
            <span>Back to Top</span>
          </button>
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
