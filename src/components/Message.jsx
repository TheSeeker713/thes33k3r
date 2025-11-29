import React from 'react';

const Message = () => {
  return (
    <div className="relative z-10 text-center px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Main message */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-green-400 mb-4 text-glitch font-mono leading-tight text-glow">
          THEY SAY THE S33K3R TRANSMISSION BEGINS NOVEMBER 29TH,
        </h1>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-red-500 mb-8 font-mono italic animate-pulse">
          But is that true?
        </h2>
        
        {/* Instructions */}
        <div className="space-y-2 text-lg md:text-xl lg:text-2xl text-gray-300 font-mono">
          <p className="text-yellow-400 animate-pulse">
            ▶ Play the game
          </p>
          <p className="text-cyan-400">
            ▶ Solve the puzzle
          </p>
          <p className="text-green-400">
            ▶ Get the real date
          </p>
          <p className="text-red-500 font-bold mt-4 text-xl md:text-2xl">
            ▶ DO NOT TELL ANYONE
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="mt-8 flex justify-center space-x-4 text-green-500/50 text-2xl">
          <span className="animate-pulse">◆</span>
          <span className="animate-pulse delay-100">◆</span>
          <span className="animate-pulse delay-200">◆</span>
        </div>
      </div>
    </div>
  );
};

export default Message;
