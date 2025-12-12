'use client'

import VideoBackground from '@/components/VideoBackground'
import MovieScreen from '@/components/MovieScreen'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#0d0a08] text-stone-200 overflow-x-hidden">
      {/* Background Video Layer */}
      <VideoBackground />
      
      {/* Navigation Bar - Fixed */}
      <Navbar />

      {/* Main Content Container */}
      <main className="relative z-10 flex flex-col min-h-screen pt-20 md:pt-24 pb-24">
        {/* Header - Sticky below navbar */}
        <header className="sticky top-16 md:top-20 z-40 text-center py-4 md:py-6 bg-[#0d0a08]/60 backdrop-blur-sm">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-mono text-amber-500 text-glow tracking-widest">
            THE S33K3R TRANSMISSION
          </h1>
          <div className="w-48 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mt-2"></div>
        </header>
        
        {/* Movie Theater Screen - Permanent Display */}
        <section id="transmissions" className="scroll-mt-24">
          <MovieScreen />
        </section>

        {/* Phase II Text */}
        <section className="scroll-mt-24 mt-8 px-4">
          <div className="max-w-4xl mx-auto text-center bg-[#11100f]/70 border border-amber-600/40 rounded-lg p-6 md:p-8 shadow-lg backdrop-blur-sm">
            <p className="text-amber-500 text-lg md:text-xl font-mono leading-relaxed text-glow">
              PROJECT S33K3R: PHASE II INITIATED. The simulation evolves in 2026. A Full-Motion Video Cinematic Experience is currently in development. You are invited to test the prototype... soon.
            </p>
          </div>
        </section>
      </main>

      {/* Footer - Fixed */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0d0a08]/95 backdrop-blur-sm">
        <Footer />
      </div>
    </div>
  )
}
