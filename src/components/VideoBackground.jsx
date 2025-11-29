import React from 'react';

const VideoBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Placeholder for background video - replace src with your actual video */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900">
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
        
        {/* Animated placeholder gradient while video loads */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-black to-purple-900/20 animate-pulse"></div>
        
        {/* Static noise overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>
      
      {/* Transparency overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Video placeholder text */}
      <div className="absolute bottom-4 left-4 text-green-500/30 text-xs font-mono">
        [VIDEO BACKGROUND PLACEHOLDER]
      </div>
    </div>
  );
};

export default VideoBackground;
