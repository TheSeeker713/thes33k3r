import React, { useState, useRef, useEffect } from 'react';

const CRTOverlay = () => {
  const [isOn, setIsOn] = useState(false);
  const [currentChannel, setCurrentChannel] = useState(0);
  const [volume, setVolume] = useState(50);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [isChangingChannel, setIsChangingChannel] = useState(false);
  const videoRef = useRef(null);

  // Channel list - placeholder for future videos
  const channels = [
    { id: 0, name: 'S33K', src: '/crtvideo' },
    { id: 1, name: 'CH02', src: '/crtvideo' }, // Placeholder - same video for now
    { id: 2, name: 'CH03', src: '/crtvideo' }, // Placeholder
    { id: 3, name: 'CH04', src: '/crtvideo' }, // Placeholder
    { id: 4, name: 'STATIC', src: null },       // Static channel
  ];

  // Play/pause video when isOn changes
  useEffect(() => {
    if (videoRef.current) {
      if (isOn && channels[currentChannel].src) {
        videoRef.current.volume = volume / 100;
        videoRef.current.play().catch(e => console.log('Play error:', e));
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isOn, currentChannel, volume]);

  // Update video volume when volume changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume / 100;
    }
  }, [volume]);

  const toggleTV = () => {
    setIsOn(!isOn);
  };

  const changeChannel = (direction) => {
    if (!isOn) return;
    
    // Show static briefly when changing channels
    setIsChangingChannel(true);
    setTimeout(() => {
      setCurrentChannel((prev) => {
        const newChannel = direction === 'up' 
          ? (prev + 1) % channels.length 
          : (prev - 1 + channels.length) % channels.length;
        return newChannel;
      });
      setIsChangingChannel(false);
    }, 300);
  };

  const adjustVolume = (direction) => {
    setVolume((prev) => {
      const newVol = direction === 'up' ? prev + 10 : prev - 10;
      return Math.max(0, Math.min(100, newVol));
    });
  };

  const adjustBrightness = (direction) => {
    setBrightness((prev) => {
      const newBright = direction === 'up' ? prev + 10 : prev - 10;
      return Math.max(30, Math.min(150, newBright));
    });
  };

  const adjustContrast = (direction) => {
    setContrast((prev) => {
      const newContrast = direction === 'up' ? prev + 10 : prev - 10;
      return Math.max(50, Math.min(150, newContrast));
    });
  };

  const isStaticChannel = !channels[currentChannel].src;

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
            <div 
              className="relative w-64 h-48 md:w-96 md:h-72 lg:w-[500px] lg:h-[375px] bg-stone-950 rounded-sm overflow-hidden"
              style={{
                filter: isOn ? `brightness(${brightness}%) contrast(${contrast}%)` : 'none'
              }}
            >
              {/* Video element - always rendered but hidden when off */}
              <video
                ref={videoRef}
                loop
                playsInline
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isOn && !isStaticChannel && !isChangingChannel ? 'opacity-100' : 'opacity-0'}`}
              >
                <source src="/crtvideo.webm" type="video/webm" />
                <source src="/crtvideo.mp4" type="video/mp4" />
              </video>
              
              {/* Channel change static effect */}
              {isOn && (isChangingChannel || isStaticChannel) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="absolute inset-0 opacity-70"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                      animation: 'static 0.1s steps(5) infinite',
                    }}
                  ></div>
                  {isStaticChannel && (
                    <div className="text-amber-500/70 font-mono text-sm z-10 animate-pulse">
                      ▮ NO SIGNAL ▮
                    </div>
                  )}
                </div>
              )}
              
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
              
              {/* TV On State - CRT effects overlay */}
              {isOn && !isStaticChannel && !isChangingChannel && (
                <div className="absolute inset-0 scanlines crt-flicker pointer-events-none">
                  {/* CRT overlay effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-900/5 via-transparent to-red-900/5"></div>
                  
                  {/* Scan line moving effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent h-8 animate-[scanline_4s_linear_infinite]"></div>
                </div>
              )}
              
              {/* Channel indicator overlay */}
              {isOn && (
                <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-amber-500 font-mono text-xs md:text-sm">
                  CH: {channels[currentChannel].name}
                </div>
              )}
              
              {/* Volume indicator overlay */}
              {isOn && (
                <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded text-amber-500 font-mono text-xs">
                  VOL: {volume}%
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
            {/* Left side - Channel buttons */}
            <div className="flex flex-col space-y-1">
              <div className="text-amber-600/60 text-[10px] font-mono text-center mb-1">CHANNEL</div>
              <div className="flex space-x-1">
                <button
                  onClick={() => changeChannel('down')}
                  disabled={!isOn}
                  className={`w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-amber-800 to-stone-700 border-2 border-stone-600 shadow-inner flex items-center justify-center text-amber-500 text-xs font-bold transition-all ${isOn ? 'hover:from-amber-700 hover:to-stone-600 active:scale-95' : 'opacity-50'}`}
                  title="Channel Down"
                >
                  ◀
                </button>
                <button
                  onClick={() => changeChannel('up')}
                  disabled={!isOn}
                  className={`w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-amber-800 to-stone-700 border-2 border-stone-600 shadow-inner flex items-center justify-center text-amber-500 text-xs font-bold transition-all ${isOn ? 'hover:from-amber-700 hover:to-stone-600 active:scale-95' : 'opacity-50'}`}
                  title="Channel Up"
                >
                  ▶
                </button>
              </div>
            </div>

            {/* Center - Brightness/Contrast knobs */}
            <div className="flex space-x-3">
              {/* Brightness control */}
              <div className="flex flex-col items-center">
                <div className="text-amber-600/60 text-[8px] font-mono mb-1">BRIGHT</div>
                <div className="flex space-x-0.5">
                  <button
                    onClick={() => adjustBrightness('down')}
                    className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-gradient-to-br from-stone-500 to-stone-700 border border-stone-600 text-amber-500 text-[8px] flex items-center justify-center hover:from-stone-400 active:scale-95"
                    title="Brightness Down"
                  >
                    -
                  </button>
                  <button
                    onClick={() => adjustBrightness('up')}
                    className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-gradient-to-br from-stone-500 to-stone-700 border border-stone-600 text-amber-500 text-[8px] flex items-center justify-center hover:from-stone-400 active:scale-95"
                    title="Brightness Up"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Contrast control */}
              <div className="flex flex-col items-center">
                <div className="text-amber-600/60 text-[8px] font-mono mb-1">CONTRAST</div>
                <div className="flex space-x-0.5">
                  <button
                    onClick={() => adjustContrast('down')}
                    className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-gradient-to-br from-stone-500 to-stone-700 border border-stone-600 text-amber-500 text-[8px] flex items-center justify-center hover:from-stone-400 active:scale-95"
                    title="Contrast Down"
                  >
                    -
                  </button>
                  <button
                    onClick={() => adjustContrast('up')}
                    className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-gradient-to-br from-stone-500 to-stone-700 border border-stone-600 text-amber-500 text-[8px] flex items-center justify-center hover:from-stone-400 active:scale-95"
                    title="Contrast Up"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Right side - Volume and Power */}
            <div className="flex items-center space-x-2">
              {/* Volume controls */}
              <div className="flex flex-col items-center">
                <div className="text-amber-600/60 text-[8px] font-mono mb-1">VOLUME</div>
                <div className="flex space-x-0.5">
                  <button
                    onClick={() => adjustVolume('down')}
                    className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-stone-500 to-stone-700 border-2 border-amber-900/50 shadow-lg text-amber-500 text-xs flex items-center justify-center hover:from-stone-400 active:scale-95"
                    title="Volume Down"
                  >
                    -
                  </button>
                  <button
                    onClick={() => adjustVolume('up')}
                    className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-stone-500 to-stone-700 border-2 border-amber-900/50 shadow-lg text-amber-500 text-xs flex items-center justify-center hover:from-stone-400 active:scale-95"
                    title="Volume Up"
                  >
                    +
                  </button>
                </div>
              </div>
              
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
      
      {/* CSS for static animation */}
      <style>{`
        @keyframes static {
          0% { transform: translateX(0) translateY(0); }
          10% { transform: translateX(-1%) translateY(-1%); }
          20% { transform: translateX(1%) translateY(1%); }
          30% { transform: translateX(-2%) translateY(0); }
          40% { transform: translateX(0) translateY(2%); }
          50% { transform: translateX(-1%) translateY(-2%); }
          60% { transform: translateX(2%) translateY(1%); }
          70% { transform: translateX(-2%) translateY(-1%); }
          80% { transform: translateX(1%) translateY(0); }
          90% { transform: translateX(0) translateY(-1%); }
          100% { transform: translateX(-1%) translateY(1%); }
        }
      `}</style>
    </div>
  );
};

export default CRTOverlay;
