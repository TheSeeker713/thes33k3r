'use client'

import React, { useRef, useState, useEffect } from 'react'
import YouTube from 'react-youtube'

const MovieScreen = ({ isUnlocked = false }) => {
  const playerRef = useRef(null)
  const [isCoverHidden, setIsCoverHidden] = useState(false)
  const [playerReady, setPlayerReady] = useState(false)
  const [showUnlockHighlight, setShowUnlockHighlight] = useState(false)

  // Reset cover when isUnlocked prop changes
  useEffect(() => {
    setIsCoverHidden(false)
  }, [isUnlocked])

  // Show unlock highlight when player becomes unlocked
  useEffect(() => {
    if (isUnlocked && playerReady && !showUnlockHighlight) {
      setShowUnlockHighlight(true)
      const timer = setTimeout(() => setShowUnlockHighlight(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [isUnlocked, playerReady, showUnlockHighlight])

  const youtubeOpts = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 0,
      controls: 1,
      modestbranding: 1,
      rel: 0,
      iv_load_policy: 3,
    },
  }

  const handlePlayerReady = (event) => {
    playerRef.current = event.target
    setPlayerReady(true)
  }

  const handlePlayClick = () => {
    if (!isUnlocked || !playerReady) return
    setIsCoverHidden(true)
    const player = playerRef.current?.internalPlayer
    if (player && player.playVideo) {
      player.playVideo().catch((e) => console.log('Play error:', e))
    }
  }

  return (
    <div className="relative z-10 text-center px-4 py-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Movie Theater Frame */}
        <div className="relative bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 p-4 md:p-8 rounded-lg shadow-2xl border-4 border-stone-800">
          {/* Theater Curtains - Top */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-red-950/40 to-transparent"></div>
          
          {/* Theater Curtains - Sides */}
          <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-red-950/40 to-transparent"></div>
          <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-red-950/40 to-transparent"></div>
          
          {/* 16:9 Widescreen Container */}
          <div className="relative w-full aspect-video bg-black rounded shadow-2xl overflow-hidden border-2 border-stone-700">
            <YouTube
              videoId="yJN0NaqxzyA"
              opts={youtubeOpts}
              onReady={handlePlayerReady}
              className="absolute inset-0 w-full h-full"
              iframeClassName="absolute inset-0 w-full h-full"
            />

            {/* Cover Image Layer (reused overlay) */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-stone-950 via-stone-900 to-black transition-opacity duration-700 ${
                isCoverHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              {/* Film grain effect */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
              ></div>

              <div className="relative z-10 text-center px-4">
                <div className="text-6xl md:text-8xl mb-4 animate-pulse">🎬</div>
                <h2 className="text-2xl md:text-4xl font-bold font-mono text-amber-500 mb-4 text-glow">
                  TRANSMISSION READY
                </h2>
                <p className="text-sm md:text-base text-stone-400 font-mono">
                  Cover layer will fade when you trigger the signal.
                </p>
              </div>

              {/* Subtle scanlines for cinematic feel */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-full scanlines opacity-30"></div>
              </div>
            </div>
          </div>
          
          {/* Theater Curtains - Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-red-950/40 to-transparent"></div>
        </div>
        
        {/* Popcorn Button - Control Panel */}
        <div className="flex items-center justify-center gap-4 mt-6 relative">
          {/* Unlock highlight effect */}
          {showUnlockHighlight && isUnlocked && (
            <div className="absolute -inset-6 border-4 border-amber-400 rounded-lg animate-[pulse_0.5s_ease-in-out] pointer-events-none shadow-xl shadow-amber-500/60"></div>
          )}
          
          <button
            onClick={handlePlayClick}
            disabled={!isUnlocked}
            className={`group relative font-bold py-4 px-8 rounded-lg shadow-lg transform transition-all duration-300 border-2 border-amber-500 text-white ${
              isUnlocked
                ? 'bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 hover:from-amber-500 hover:via-amber-600 hover:to-amber-700 hover:scale-105 active:scale-95 animate-pulse'
                : 'bg-stone-800 text-stone-400 cursor-not-allowed opacity-70'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`text-4xl ${isUnlocked ? 'animate-bounce' : ''}`}>🍿</span>
              <div className="text-left">
                <div className="text-lg font-mono tracking-wider">
                  {isUnlocked ? 'PLAY TRANSMISSION' : 'SIGNAL ENCRYPTED // DECRYPTION AT 11:11'}
                </div>
                <div className="text-xs font-mono text-amber-200">
                  {isUnlocked ? 'Click to watch and unmask the signal' : 'Awaiting unlock window'}
                </div>
              </div>
            </div>

            {/* Glow effect on hover */}
            {isUnlocked && (
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-amber-400/20 via-amber-500/20 to-amber-600/20 blur-xl"></div>
            )}
          </button>
        </div>
        
        {/* Theater Info */}
        <div className="mt-6 text-center">
          <p className="text-amber-500/70 font-mono text-sm">
            ▮ NOW SHOWING: THE S33K3R TRANSMISSION ▮
          </p>
          <p className="text-stone-500 font-mono text-xs mt-2">
            DECEMBER 12, 2025 • 10:10 AM MST • UNLOCK AT 11:11 AM MST
          </p>
        </div>
      </div>
    </div>
  )
}

export default MovieScreen
