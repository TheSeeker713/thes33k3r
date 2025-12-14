'use client'

import React from 'react';

const VideoBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Background video layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-[#0d0a08] to-stone-950">
        {/* Looping background video - optimized with preload and decoding hints */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          decoding="async"
          className="absolute w-full h-full object-cover opacity-60"
          style={{ willChange: 'auto' }}
        >
          <source src="/background.webm" type="video/webm" />
        </video>
        
        {/* Desert heat haze gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/30 via-transparent to-red-950/20"></div>
        
        {/* Dust particles overlay - using optimized SVG filter */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='dustNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23dustNoise)'/%3E%3C/svg%3E")`,
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
          }}
        ></div>
      </div>
      
      {/* Vignette overlay - using CSS */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none"></div>
      
      {/* Dark gritty overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
    </div>
  );
};

export default VideoBackground;
