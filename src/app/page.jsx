'use client'

import { useState, useEffect, useMemo } from 'react'
import VideoBackground from '@/components/VideoBackground'
import CRTOverlay from '@/components/CRTOverlay'
import MovieScreen from '@/components/MovieScreen'
import Message from '@/components/Message'
import PuzzleGame from '@/components/PuzzleGame'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export default function Home() {
  // Get current date and create phase times for today at 10:10 AM and 11:11 AM MST
  const phase1Time = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    // Create time at 10:10 AM in local time (system is set to MST)
    return new Date(year, month, date, 10, 10, 0, 0);
  }, [])
  
  const phase2Time = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    // Create time at 11:11 AM in local time (system is set to MST)
    return new Date(year, month, date, 11, 11, 0, 0);
  }, [])

  const [isAfterPhase1, setIsAfterPhase1] = useState(false)
  const [isAfterPhase2, setIsAfterPhase2] = useState(false)
  const [showGlitch, setShowGlitch] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Check time on mount and every second
  useEffect(() => {
    const checkTime = () => {
      const now = new Date()
      const nextAfterPhase1 = now >= phase1Time
      const nextAfterPhase2 = now >= phase2Time
      
      // If we just crossed the threshold while page is open, trigger glitch
      if (isInitialized && !isAfterPhase1 && nextAfterPhase1) {
        setShowGlitch(true)
        setTimeout(() => {
          setShowGlitch(false)
          setIsAfterPhase1(true)
          setIsAfterPhase2(nextAfterPhase2)
        }, 3000) // 3 second glitch effect before layout swap
      } else if (!isInitialized) {
        // Initial load - set state without glitch
        setIsAfterPhase1(nextAfterPhase1)
        setIsAfterPhase2(nextAfterPhase2)
        setIsInitialized(true)
      } else {
        setIsAfterPhase1(nextAfterPhase1)
        setIsAfterPhase2(nextAfterPhase2)
      }
    }

    // Check immediately
    checkTime()

    // Check every second
    const interval = setInterval(checkTime, 1000)

    return () => clearInterval(interval)
  }, [phase1Time, phase2Time])

  return (
    <div className="relative min-h-screen flex flex-col bg-[#0d0a08] text-stone-200 overflow-x-hidden">
      {/* Background Video Layer */}
      <VideoBackground />
      
      {/* Glitch Overlay Effect - Only shows during transition */}
      {showGlitch && !isAfterPhase1 && (
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
          {isAfterPhase1 ? <MovieScreen isUnlocked={isAfterPhase2} /> : <CRTOverlay />}
        </section>

        {/* Phase II Text after layout swap */}
        {isAfterPhase1 && (
          <section className="scroll-mt-24 mt-8 px-4">
            <div className="max-w-4xl mx-auto text-center bg-[#11100f]/70 border border-amber-600/40 rounded-lg p-6 md:p-8 shadow-lg backdrop-blur-sm">
              <p className="text-amber-500 text-lg md:text-xl font-mono leading-relaxed text-glow">
                PROJECT S33K3R: PHASE II INITIATED. The simulation evolves in 2026. A Full-Motion Video Cinematic Experience is currently in development. You are invited to test the prototype... soon.
              </p>
            </div>
          </section>
        )}

        {/* Message and Puzzle always available (game remains unlocked) */}
        <section className="scroll-mt-24">
          <Message />
        </section>
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
