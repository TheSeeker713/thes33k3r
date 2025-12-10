'use client'

import VideoBackground from '@/components/VideoBackground'
import CRTOverlay from '@/components/CRTOverlay'
import Message from '@/components/Message'
import PuzzleGame from '@/components/PuzzleGame'
import Footer from '@/components/Footer'
import FartBubble from '@/components/FartBubble'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#0d0a08] text-stone-200 overflow-x-hidden">
      {/* Background Video Layer */}
      <VideoBackground />
      
      {/* Hidden Easter Egg */}
      <FartBubble />
      
      {/* Navigation Bar - Fixed */}
      <Navbar />

      {/* Main Content Container */}
      <main className="relative z-10 flex flex-col min-h-screen pt-20 md:pt-24 pb-24">
        {/* Header - Sticky below navbar */}
        <header className="sticky top-16 md:top-20 z-40 text-center py-4 md:py-6 bg-[#0d0a08]/95 backdrop-blur-sm">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-mono text-amber-500 text-glow tracking-widest">
            THE S33K3R TRANSMISSION
          </h1>
          <div className="w-48 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mt-2"></div>
        </header>
        
        {/* CRT TV Display */}
        <section id="transmissions" className="scroll-mt-24">
          <CRTOverlay />
        </section>
        
        {/* Message Section */}
        <section className="scroll-mt-24">
          <Message />
        </section>
        
        {/* Puzzle Game */}
        <section id="puzzle" className="scroll-mt-24">
          <PuzzleGame />
        </section>
      </main>

      {/* Footer - Fixed */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0d0a08]/95 backdrop-blur-sm">
        <Footer />
      </div>
    </div>
  )
}
