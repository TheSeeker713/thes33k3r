import { getDevlogs } from '@/lib/devlogs'
import Link from 'next/link'
import DevlogGrid from '@/components/DevlogGrid'
import TextScramble from '@/components/TextScramble'

export default async function DevlogPage() {
  const devlogs = await getDevlogs()

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      {/* Background effects */}
      <div className="fixed inset-0 bg-black pointer-events-none" />

      {/* Header */}
      <header className="relative border-b border-zinc-800 backdrop-blur-xl bg-black/90">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-[#CC5500] transition-colors text-sm mb-8 font-mono"
          >
            <span>←</span> BACK TO TRANSMISSION
          </Link>
          
          {/* System Status */}
          <div className="flex items-center gap-3 text-xs text-emerald-500 font-mono mb-4">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span>SYSTEM: ONLINE</span>
          </div>

          {/* Main Title with Glitch Effect */}
          <h1 className="text-6xl sm:text-7xl font-bold mb-4 tracking-tight text-zinc-100">
            <TextScramble text="DEVELOPER LOGS" />
          </h1>
          
          {/* Metadata */}
          <div className="flex flex-wrap gap-4 text-xs text-zinc-600 font-mono">
            <div>DIR: /SRC/CONTENT/DEVLOGS</div>
            <div>•</div>
            <div>ACCESS_LEVEL: UNRESTRICTED</div>
          </div>
        </div>
      </header>

      {/* Card Grid */}
      <main className="relative max-w-7xl mx-auto px-6 py-12">
        <DevlogGrid devlogs={devlogs} />
      </main>

      {/* Footer */}
      <footer className="relative border-t border-slate-700/30 backdrop-blur-xl bg-zinc-950/60 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <p className="text-slate-500 text-sm font-mono">
            DEVELOPER LOGS — Chronicling{' '}
            <Link href="/" className="text-orange-500 hover:text-orange-400 transition-colors">
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
