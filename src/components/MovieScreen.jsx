'use client'

import React, { useRef, useState } from 'react'
import YouTube from 'react-youtube'

const MovieScreen = () => {
  const playerRef = useRef(null)
  const [isCoverHidden, setIsCoverHidden] = useState(false)
  const [playerReady, setPlayerReady] = useState(false)

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
    if (!playerReady) return
    setIsCoverHidden(true)
    const player = playerRef.current?.internalPlayer
    if (player && player.playVideo) {
      player.playVideo().catch((e) => console.log('Play error:', e))
    }
  }

  return (
    <div className="relative z-10 text-center px-4 py-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Movie Theater Frame - Cinematic Design */}
        <div className="relative bg-black p-6 md:p-12 lg:p-16 rounded-xl shadow-[0_0_100px_rgba(0,0,0,0.9)]">
          {/* Theater Velvet Curtains - Top with draped effect */}
          <div className="absolute -top-4 left-0 right-0 h-16 bg-gradient-to-b from-red-900/60 via-red-950/50 to-transparent rounded-t-xl"></div>
          
          {/* Theater Velvet Curtains - Left with folds */}
          <div className="absolute top-0 -left-4 bottom-0 w-12 bg-gradient-to-r from-red-900/60 via-red-950/50 to-transparent"></div>
          
          {/* Theater Velvet Curtains - Right with folds */}
          <div className="absolute top-0 -right-4 bottom-0 w-12 bg-gradient-to-l from-red-900/60 via-red-950/50 to-transparent"></div>
          
          {/* Cinema Screen Border - Silver/Chrome Frame */}
          <div className="relative p-2 bg-gradient-to-br from-stone-400 via-stone-500 to-stone-600 rounded-lg shadow-2xl">
            {/* Inner Screen Frame */}
            <div className="relative p-1 bg-gradient-to-tl from-stone-700 via-stone-800 to-stone-900 rounded-md">
              {/* 16:9 Widescreen Container - The Actual Screen */}
              <div className="relative w-full aspect-video bg-black rounded overflow-hidden shadow-inner">
                {/* Cover Layer - Theater Curtain Style with Background Image */}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${
                    isCoverHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                  style={{
                    backgroundImage: 'url(/moviescreen.webp)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* Dark overlay for better contrast on top of image */}
                  <div className="absolute inset-0 bg-black/10"></div>

                  {/* Film grain effect */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    }}
                  ></div>

                  <div className="relative z-10 text-center px-4">
                    <div className="text-7xl md:text-9xl mb-6">🎬</div>
                    <h2 className="text-3xl md:text-5xl font-bold font-mono text-amber-500 mb-4 text-glow tracking-wider">
                      THE S33K3R TRANSMISSION
                    </h2>
                    <p className="text-base md:text-lg text-amber-400/80 font-mono mb-2">
                      ▮ NOW SHOWING ▮
                    </p>
                    <p className="text-sm md:text-base text-stone-400 font-mono">
                      Click below to begin the transmission
                    </p>
                  </div>

                  {/* Subtle scanlines for cinematic feel */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="w-full h-full scanlines opacity-20"></div>
                  </div>
                </div>

                {/* YouTube Player - Positioned over the white screen area */}
                <YouTube
                  videoId="yJN0NaqxzyA"
                  opts={youtubeOpts}
                  onReady={handlePlayerReady}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                    isCoverHidden ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                  iframeClassName="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
          </div>
          
          {/* Theater Velvet Curtains - Bottom draped */}
          <div className="absolute -bottom-4 left-0 right-0 h-16 bg-gradient-to-t from-red-900/60 via-red-950/50 to-transparent rounded-b-xl"></div>
        </div>
        
        {/* Play Button - Cinematic Control */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={handlePlayClick}
            disabled={!playerReady}
            className="group relative font-bold py-5 px-10 rounded-lg shadow-2xl transform transition-all duration-300 border-2 border-amber-500 text-white bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 hover:from-amber-500 hover:via-amber-600 hover:to-amber-700 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-4">
              <span className="text-5xl">▶</span>
              <div className="text-left">
                <div className="text-xl font-mono tracking-wider">
                  PLAY TRANSMISSION
                </div>
                <div className="text-xs font-mono text-amber-200">
                  Click to watch the cinematic experience
                </div>
              </div>
            </div>

            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-amber-400/30 via-amber-500/30 to-amber-600/30 blur-xl -z-10"></div>
          </button>
        </div>
        
        {/* Theater Info */}
        <div className="mt-8 text-center">
          <p className="text-amber-500/80 font-mono text-sm tracking-wider">
            ▮ THE S33K3R CINEMATIC EXPERIENCE ▮
          </p>
          <p className="text-stone-500 font-mono text-xs mt-2">
            A MYCELIA INTERACTIVE PRODUCTION • DIGIARTIFACT 2025
          </p>
        </div>
      </div>
    </div>
  )
}

export default MovieScreen
