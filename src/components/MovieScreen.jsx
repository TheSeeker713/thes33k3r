'use client'

import React, { useState, useRef } from 'react';

const MovieScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(e => console.log('Play error:', e));
      }
      setIsPlaying(!isPlaying);
    }
  };

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
            {/* Video Element (Future) */}
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            >
              {/* Video source will be added when ready */}
              <source src="/video/transmission.mp4" type="video/mp4" />
              <source src="/video/transmission.webm" type="video/webm" />
            </video>
            
            {/* Placeholder - No Video Loaded State */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-stone-950 via-stone-900 to-black">
              {/* Film grain effect */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
              ></div>
              
              {/* Placeholder message */}
              <div className="relative z-10 text-center px-4">
                <div className="text-6xl md:text-8xl mb-4 animate-pulse">🎬</div>
                <h2 className="text-2xl md:text-4xl font-bold font-mono text-amber-500 mb-4 text-glow">
                  TRANSMISSION READY
                </h2>
                <p className="text-sm md:text-base text-stone-400 font-mono">
                  The feature presentation will begin shortly...
                </p>
                <div className="mt-4 text-xs text-stone-600">
                  [Video content pending upload to /video/ directory]
                </div>
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
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={handlePlayClick}
            className="group relative bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 hover:from-amber-500 hover:via-amber-600 hover:to-amber-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-amber-500"
          >
            {/* Popcorn Icon */}
            <div className="flex items-center gap-3">
              <span className="text-4xl animate-bounce">🍿</span>
              <div className="text-left">
                <div className="text-lg font-mono tracking-wider">
                  {isPlaying ? 'PAUSE' : 'PLAY'} TRANSMISSION
                </div>
                <div className="text-xs text-amber-200 font-mono">
                  Click to {isPlaying ? 'pause' : 'watch'} the video
                </div>
              </div>
            </div>
            
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-amber-400/20 via-amber-500/20 to-amber-600/20 blur-xl"></div>
          </button>
        </div>
        
        {/* Theater Info */}
        <div className="mt-6 text-center">
          <p className="text-amber-500/70 font-mono text-sm">
            ▮ NOW SHOWING: THE S33K3R TRANSMISSION ▮
          </p>
          <p className="text-stone-600 font-mono text-xs mt-2">
            DECEMBER 12, 2025 • 10:00 AM PST
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieScreen;
