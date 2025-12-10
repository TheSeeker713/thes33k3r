'use client'

import { useState } from 'react'
import VideoBackground from '@/components/VideoBackground'
import CRTOverlay from '@/components/CRTOverlay'
import CinematicEngine from '@/components/CinematicEngine'
import Footer from '@/components/Footer'
import FartBubble from '@/components/FartBubble'
import Navbar from '@/components/Navbar'
import { worldConfig } from '@/types/game'

export default function Home() {
  const [currentRoomId, setCurrentRoomId] = useState('bank')
  const [headerNavigationTarget, setHeaderNavigationTarget] = useState(null)

  // Main room IDs accessible from header
  const mainRooms = {
    bank: 'bank',
    saloon: 'saloon',
    sheriff: 'sheriff',
    hotel: 'hotel',
  }

  const handleHeaderNavigation = (roomId) => {
    setHeaderNavigationTarget(roomId)
    // Reset after trigger to allow re-navigation to same room
    setTimeout(() => setHeaderNavigationTarget(null), 100)
  }

  const handleRoomChange = (roomId) => {
    setCurrentRoomId(roomId)
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-[#0d0a08] text-stone-200 overflow-hidden">
      {/* Background Video Layer (subtle ambient effect) */}
      <div className="fixed inset-0 z-0 opacity-20">
        <VideoBackground />
      </div>
      
      {/* CRT Overlay Effect */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        <CRTOverlay />
      </div>

      {/* Hidden Easter Egg */}
      <FartBubble />
      
      {/* Navigation Bar - Fixed */}
      <Navbar onNavigate={handleHeaderNavigation} mainRooms={mainRooms} />

      {/* Main Cinematic Engine Container */}
      <main className="relative z-10 min-h-screen">
        {/* Coming Soon Message */}
        <div className="fixed top-16 md:top-20 left-0 right-0 z-30 bg-black/90 backdrop-blur-sm border-b border-amber-900/30">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <div className="text-center md:text-left">
                <p className="font-mono text-lg text-amber-500 tracking-wider animate-pulse">
                  COMING SOON: DECEMBER 12TH
                </p>
                <p className="font-mono text-xs text-stone-400 mt-1">
                  Cinematic Narrative Engine Currently Locked
                </p>
              </div>
              <div className="flex items-center gap-2">
                <svg 
                  className="w-5 h-5 text-red-500 animate-pulse" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
                    clipRule="evenodd" 
                  />
                </svg>
                <button
                  disabled
                  className="px-4 py-2 font-mono text-sm tracking-wider rounded border border-red-500/50 text-red-400 bg-red-900/20 cursor-not-allowed opacity-60"
                >
                  ROOMS [LOCKED]
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cinematic Narrative Engine - DISABLED */}
        <div className="pt-32 md:pt-36 relative">
          {/* Lock Overlay */}
          <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center px-6 py-8 bg-black/80 border-2 border-amber-900/50 rounded-lg max-w-md">
              <svg 
                className="w-16 h-16 text-amber-500 mx-auto mb-4 opacity-50" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                />
              </svg>
              <h2 className="font-mono text-2xl text-amber-500 mb-2 tracking-wider">
                ACCESS RESTRICTED
              </h2>
              <p className="font-mono text-sm text-stone-400 mb-4">
                The Cinematic Narrative Engine is currently in lockdown.
              </p>
              <div className="bg-amber-900/20 border border-amber-600/30 rounded px-4 py-3">
                <p className="font-mono text-xs text-amber-400">
                  UNLOCK DATE: DECEMBER 12TH, 2025
                </p>
              </div>
            </div>
          </div>
          
          {/* Engine Preview (visible but non-interactive) */}
          <div className="pointer-events-none opacity-30 blur-sm">
            <CinematicEngine
              initialRoomId={worldConfig.initialRoomId}
              worldConfig={worldConfig}
              onRoomChange={handleRoomChange}
              externalRoomId={headerNavigationTarget}
              disabled={true}
            />
          </div>
        </div>
      </main>

      {/* Footer - Fixed */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0d0a08]/95 backdrop-blur-sm">
        <Footer />
      </div>
    </div>
  )
}
