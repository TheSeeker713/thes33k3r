import React from 'react';

const CRTOverlay = () => {
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
            <div className="relative w-64 h-48 md:w-96 md:h-72 lg:w-[500px] lg:h-[375px] bg-stone-950 rounded-sm overflow-hidden scanlines crt-flicker">
              {/* Screen content - placeholder */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {/* Static noise effect */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  }}
                ></div>
                
                {/* Amber/sepia tint overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-transparent to-red-900/10"></div>
                
                {/* Placeholder content */}
                <div className="text-amber-500 font-mono text-center z-10 p-4">
                  <div className="text-2xl md:text-4xl font-bold mb-4 text-glow">
                    THE S33K3R
                  </div>
                  <div className="text-lg md:text-xl mb-2 text-orange-400">TRANSMISSION</div>
                  <div className="text-xs md:text-sm opacity-70 mt-4 text-stone-400">
                    [CRT DISPLAY PLACEHOLDER]
                  </div>
                  <div className="text-xs opacity-50 mt-2 animate-pulse text-amber-600">
                    ▮ AWAITING SIGNAL ▮
                  </div>
                </div>
                
                {/* Scan line moving effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent h-8 animate-[scanline_4s_linear_infinite]"></div>
              </div>
              
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
            <div className="text-amber-700/60 text-xs font-mono">CH: ???</div>
            <div className="flex space-x-2">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-stone-500 to-stone-700 border-2 border-amber-900/50 shadow-lg"></div>
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-stone-500 to-stone-700 border-2 border-amber-900/50 shadow-lg"></div>
            </div>
          </div>
        </div>
        
        {/* TV Stand - weathered wood */}
        <div className="flex justify-center mt-2">
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
