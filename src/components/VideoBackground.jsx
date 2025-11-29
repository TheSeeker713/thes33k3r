import React from 'react';

const VideoBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Placeholder for background video - replace src with your actual video */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-[#0d0a08] to-stone-950">
        {/* Video placeholder - uncomment and add your video source */}
        {/* 
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover opacity-50"
        >
          <source src="/your-video.mp4" type="video/mp4" />
        </video>
        */}
        
        {/* Desert heat haze gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/40 via-[#0d0a08] to-red-950/30"></div>
        
        {/* Dust particles overlay */}
        <div 
          className="absolute inset-0 opacity-15 dust-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        ></div>
        
        {/* Horizontal dust streaks */}
        <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-transparent via-amber-900/20 to-transparent"></div>
      </div>
      
      {/* Vignette overlay */}
      <div className="absolute inset-0 vignette"></div>
      
      {/* Dark gritty overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40"></div>
      
      {/* Video placeholder text */}
      <div className="absolute bottom-4 left-4 text-amber-700/30 text-xs font-mono">
        [VIDEO BACKGROUND PLACEHOLDER]
      </div>
    </div>
  );
};

export default VideoBackground;
