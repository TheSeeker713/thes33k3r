'use client'

import { useState, useEffect } from 'react'
import VideoBackground from '@/components/VideoBackground'
import CRTOverlay from '@/components/CRTOverlay'
import MovieScreen from '@/components/MovieScreen'
import Message from '@/components/Message'
import PuzzleGame from '@/components/PuzzleGame'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export default function Home() {
  // Target date: December 12, 2025, 10:00 AM PST (ISO: 2025-12-12T10:00:00-08:00)
  const targetDate = new Date('2025-12-12T10:00:00-08:00')
  
  const [isAfterTargetTime, setIsAfterTargetTime] = useState(false)
  const [showGlitch, setShowGlitch] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Check time on mount and every second
  useEffect(() => {
    const checkTime = () => {
      const now = new Date()
      const wasAfter = isAfterTargetTime
      const isNowAfter = now >= targetDate
      
      // If we just crossed the threshold while page is open, trigger glitch
      if (isInitialized && !wasAfter && isNowAfter) {
        setShowGlitch(true)
        setTimeout(() => {
          setShowGlitch(false)
          setIsAfterTargetTime(true)
        }, 3000) // 3 second glitch effect
      } else if (!isInitialized) {
        // Initial load - set state without glitch
        setIsAfterTargetTime(isNowAfter)
        setIsInitialized(true)
      }
    }

    // Check immediately
    checkTime()

    // Check every second
    const interval = setInterval(checkTime, 1000)

    return () => clearInterval(interval)
  }, [isAfterTargetTime, isInitialized, targetDate])

  return (
    <div className="relative min-h-screen flex flex-col bg-[#0d0a08] text-stone-200 overflow-x-hidden">
      {/* Background Video Layer */}
      <VideoBackground />
      
      {/* Glitch Overlay Effect - Only shows during transition */}
      {showGlitch && (
        <div className="fixed inset-0 z-[100] pointer-events-none animate-pulse">
          <div className="absolute inset-0 bg-red-500/20 mix-blend-overlay animate-[glitch_0.3s_infinite]"></div>
          <div className="absolute inset-0 bg-cyan-500/20 mix-blend-overlay animate-[glitch_0.2s_infinite_reverse]"></div>
          <div 
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              animation: 'static 0.1s steps(5) infinite',
            }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl font-mono text-amber-500 animate-pulse text-glow">
              ▮ SIGNAL SHIFT ▮
            </div>
          </div>
        </div>
      )}
      
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
        
        {/* Conditional Display: CRT TV (Before) or Movie Screen (After) */}
        <section id="transmissions" className="scroll-mt-24">
          {isAfterTargetTime ? <MovieScreen /> : <CRTOverlay />}
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
