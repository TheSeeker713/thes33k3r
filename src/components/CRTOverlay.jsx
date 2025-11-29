import React, { useState, useRef } from 'react';

const CRTOverlay = () => {
  const [isOn, setIsOn] = useState(false);
  const videoRef = useRef(null);

  const toggleTV = () => {
    if (isOn) {
      // Turn off
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      setIsOn(false);
    } else {
      // Turn on
      setIsOn(true);
      if (videoRef.current) {
        videoRef.current.play();
      }
    }
  };

  return (
    <div className="relative z-10 flex justify-center items-start pt-8 md:pt-16">
      {/* CRT TV Frame */}
      <div className="relative">
        {/* Outer TV Body - weathered wood/metal look */}
        <div className="bg-gradient-to-b from-stone-700 via-stone-800 to-stone-900 rounded-lg p-4 md:p-8 shadow-2xl border-4 border-stone-600" style={{boxShadow: '0 0 40px rgba(139, 69, 19, 0.3), inset 0 0 20px rgba(0,0,0,0.5)'}}>
          {/* TV Brand Label */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-amber-600/70 text-xs font-bold tracking-widest">
            S33K3R-VISION
          </div>
          
          {/* Screen Bezel */}
          <div className="bg-stone-950 rounded-md p-2 md:p-4 border-8 border-stone-900 shadow-inner">
            {/* CRT Screen */}
            <div className="relative w-64 h-48 md:w-96 md:h-72 lg:w-[500px] lg:h-[375px] bg-stone-950 rounded-sm overflow-hidden">
              {/* TV Off State - Static/noise */}
              {!isOn && (
                <div className="absolute inset-0 flex flex-col items-center justify-center scanlines">
                  {/* Static noise effect */}
                  <div 
                    className="absolute inset-0 opacity-30 animate-pulse"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    }}
                  ></div>
                  
                  {/* Off state message */}
                  <div className="text-amber-500/50 font-mono text-center z-10 p-4">
                    <div className="text-xs md:text-sm opacity-70 animate-pulse">
                      ▮ NO SIGNAL ▮
                    </div>
                    <div className="text-xs mt-2 text-stone-500">
                      CLICK POWER KNOB TO TUNE IN
                    </div>
                  </div>
                </div>
              )}
              
              {/* TV On State - Video playing */}
              {isOn && (
                <div className="absolute inset-0 scanlines crt-flicker">
                  <video
                    ref={videoRef}
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src="/crtvideo.webm" type="video/webm" />
                    <source src="/crtvideo.mp4" type="video/mp4" />
                  </video>
                  
                  {/* CRT overlay effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-900/5 via-transparent to-red-900/5 pointer-events-none"></div>
                  
                  {/* Scan line moving effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent h-8 animate-[scanline_4s_linear_infinite] pointer-events-none"></div>
                </div>
              )}
              
              {/* Screen curvature effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-100/5 via-transparent to-black/20 rounded-sm pointer-events-none"></div>
              
              {/* Screen glare */}
              <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-amber-100/5 to-transparent pointer-events-none"></div>
            </div>
          </div>
          
          {/* TV Controls - rusted metal look */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-2">
              <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-amber-800 to-stone-700 border-2 border-stone-600 shadow-inner"></div>
              <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-amber-800 to-stone-700 border-2 border-stone-600 shadow-inner"></div>
            </div>
            <div className="text-amber-700/60 text-xs font-mono">
              {isOn ? 'CH: S33K' : 'CH: ---'}
            </div>
            <div className="flex items-center space-x-2">
              {/* Volume knob (decorative) */}
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-stone-500 to-stone-700 border-2 border-amber-900/50 shadow-lg"></div>
              
              {/* POWER KNOB - Clickable */}
              <button
                onClick={toggleTV}
                className={`relative w-10 h-10 md:w-14 md:h-14 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 group
                  ${isOn 
                    ? 'bg-gradient-to-br from-amber-600 to-red-800 border-2 border-amber-500' 
                    : 'bg-gradient-to-br from-stone-500 to-stone-700 border-2 border-amber-900/50 hover:from-stone-400 hover:to-stone-600'
                  }`}
                style={{
                  boxShadow: isOn 
                    ? '0 0 20px rgba(217, 119, 6, 0.6), inset 0 2px 4px rgba(255,255,255,0.2)' 
                    : 'inset 0 2px 4px rgba(255,255,255,0.1), 0 4px 8px rgba(0,0,0,0.3)'
                }}
                title="Power - Click to turn TV on/off"
              >
                {/* Knob ridge lines */}
                <div className="absolute inset-2 rounded-full border border-stone-400/30"></div>
                <div className="absolute inset-3 rounded-full border border-stone-400/20"></div>
                
                {/* Power indicator dot */}
                <div className={`absolute top-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300
                  ${isOn ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]' : 'bg-stone-600'}`}
                ></div>
                
                {/* Knob center point */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${isOn ? 'bg-amber-400' : 'bg-stone-400'}`}></div>
                </div>
              </button>
            </div>
          </div>
          
          {/* Click instruction - pulses to draw attention */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-amber-500/80 text-xs font-mono animate-pulse whitespace-nowrap">
            ▶ CLICK POWER KNOB TO {isOn ? 'TURN OFF' : 'TUNE IN'} ◀
          </div>
        </div>
        
        {/* TV Stand - weathered wood */}
        <div className="flex justify-center mt-10">
          <div className="w-32 h-4 bg-gradient-to-b from-stone-700 to-stone-800 rounded-b-lg"></div>
        </div>
        <div className="flex justify-center">
          <div className="w-48 h-2 bg-gradient-to-b from-stone-600 to-stone-800 rounded-b-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default CRTOverlay;
