'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { DevlogMetadata } from '@/lib/devlogs'

interface DevlogCardProps {
  devlog: DevlogMetadata
}

export default function DevlogCard({ devlog }: DevlogCardProps) {
  const statusColors = {
    DECRYPTED: 'border-emerald-500/50 text-emerald-400',
    ARCHIVED: 'border-slate-500/50 text-slate-400',
    CLASSIFIED: 'border-red-500/50 text-red-400'
  }

  return (
    <Link href={`/devlog/${devlog.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ 
          scale: 1.02,
          borderColor: 'rgba(251, 191, 36, 0.8)',
          boxShadow: '0 0 30px rgba(251, 191, 36, 0.3)'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative group h-full cursor-pointer"
      >
        <div className="h-full border border-zinc-800 bg-black/40 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300">
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#8B4513]/10 via-transparent to-[#CC5500]/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          
          <div className="relative p-6 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="font-mono text-[#CC5500] text-lg tracking-wider">
                LOG // {devlog.number}
              </div>
              <div className={`px-2 py-1 text-xs font-mono border rounded ${statusColors[devlog.status]}`}>
                {devlog.status}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-zinc-100 mb-2 group-hover:text-[#CC5500] transition-colors">
              {devlog.title}
            </h3>

            {/* Subtitle */}
            {devlog.subtitle && (
              <p className="text-zinc-400 text-sm mb-4 font-light">
                {devlog.subtitle}
              </p>
            )}

            {/* Excerpt */}
            <p className="text-zinc-300 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
              {devlog.excerpt}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
              <time className="text-xs text-zinc-600 font-mono">
                {devlog.dateRange}
              </time>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-[#CC5500] text-white text-sm font-mono rounded hover:bg-[#8B4513] transition-all shadow-lg"
              >
                READ PROTOCOL_
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
