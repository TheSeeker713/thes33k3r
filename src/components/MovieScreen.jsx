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
      controls: 0,
      modestbranding: 1,
      rel: 0,
      iv_load_policy: 3,
      fs: 0,
      disablekb: 1,
      showinfo: 0,
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
          
          {/* Cinema Screen Border - Silver/Chrome Frame */}
          <div className="relative p-2 bg-gradient-to-br from-stone-400 via-stone-500 to-stone-600 rounded-lg shadow-2xl">
            {/* Inner Screen Frame */}
            <div className="relative p-1 bg-gradient-to-tl from-stone-700 via-stone-800 to-stone-900 rounded-md">
              {/* 16:9 Widescreen Container - The Actual Screen */}
              <div className="relative w-full aspect-video bg-black rounded overflow-hidden shadow-inner">
                {/* Cover Layer - Moviescreen Image Background */}
                <div
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    isCoverHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                  style={{
                    backgroundImage: 'url(/moviescreen.webp)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                ></div>

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
