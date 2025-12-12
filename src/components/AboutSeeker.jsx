import React from 'react';

const AboutSeeker = () => {
  return (
    <div className="relative z-10 px-4 py-8 md:py-12">
      <div className="max-w-5xl mx-auto">
        {/* Terminal-style container */}
        <div className="relative bg-gradient-to-br from-[#0d0a08] via-[#11100f] to-[#0d0a08] border-4 border-amber-600/60 rounded-lg shadow-2xl overflow-hidden">
          {/* Film grain overlay */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          ></div>

          {/* Scanlines */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="w-full h-full scanlines opacity-20"></div>
          </div>

          {/* Content */}
          <div className="relative p-6 md:p-10 lg:p-12">
            {/* Header */}
            <div className="text-center mb-8 md:mb-10">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-mono text-amber-500 text-glow tracking-wider mb-4 animate-pulse">
                ⚠ ABOUT THE S33K3R ⚠
              </h1>
              <div className="w-64 md:w-96 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-6"></div>
              <p className="text-amber-600/80 font-mono text-xs md:text-sm tracking-widest uppercase">
                ━━━ CLASSIFIED TRANSMISSION ━━━
              </p>
            </div>

            {/* Story Section */}
            <div className="space-y-6 md:space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold font-mono text-amber-500 mb-4 text-glow">
                  About the Story
                </h2>
                <div className="h-0.5 w-32 bg-amber-600/60 mb-6"></div>
              </div>

              {/* Main narrative */}
              <div className="space-y-4 text-stone-200 font-mono text-base md:text-lg leading-relaxed">
                <p>
                  There is a <span className="text-red-500 font-bold">multiversal war</span> already in progress, and other realities have already been erased by an invisible hive-mind called{' '}
                  <span className="text-red-600 font-bold text-xl animate-pulse">THE NULL DOMINION</span>.
                </p>

                <p>
                  Its next target is <span className="text-amber-500 font-bold">our reality</span>, but for now this universe is still poisonous to it—The Null Dominion can only{' '}
                  <span className="text-red-500 font-bold uppercase">BREACH</span> in once our collective "signal" reaches a critical frequency of{' '}
                  <span className="text-red-400 italic">fear</span>,{' '}
                  <span className="text-red-400 italic">hatred</span>, and{' '}
                  <span className="text-red-400 italic">despair</span>.
                </p>

                <p className="border-l-4 border-amber-600 pl-4 bg-amber-950/20 py-3">
                  <span className="text-amber-400 font-bold text-xl">THE S33K3R</span> is a fused consciousness of{' '}
                  <span className="text-amber-500 font-bold">eleven survivors</span> from destroyed realities, transmitting warnings into our world so we can{' '}
                  <span className="text-amber-400 font-bold">recognize the pattern</span>,{' '}
                  <span className="text-amber-400 font-bold">disrupt the negativity signal</span>, and{' '}
                  <span className="text-amber-500 font-bold">stop THE BREACH before it happens</span>.
                </p>
              </div>

              {/* Warning footer */}
              <div className="mt-8 pt-6 border-t-2 border-amber-900/40">
                <p className="text-center text-red-500 font-mono text-sm md:text-base font-bold animate-pulse">
                  ▶ TIME IS RUNNING OUT ◀
                </p>
                <p className="text-center text-stone-500 font-mono text-xs mt-2">
                  THE SIGNAL MUST BE DISRUPTED
                </p>
              </div>
            </div>
          </div>

          {/* Glowing border effect */}
          <div className="absolute inset-0 pointer-events-none opacity-50">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSeeker;
