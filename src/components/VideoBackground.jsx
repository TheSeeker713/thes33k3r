import React from 'react';

const VideoBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Background video layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-[#0d0a08] to-stone-950">
        {/* Looping background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover opacity-60"
        >
          <source src="/background.webm" type="video/webm" />
          <source src="/background.mp4" type="video/mp4" />
        </video>
        
        {/* Desert heat haze gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/30 via-transparent to-red-950/20"></div>
        
        {/* Dust particles overlay */}
        <div 
          className="absolute inset-0 opacity-10 dust-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>
      
      {/* Vignette overlay */}
      <div className="absolute inset-0 vignette"></div>
      
      {/* Dark gritty overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
    </div>
  );
};

export default VideoBackground;
