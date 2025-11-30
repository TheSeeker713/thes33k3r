import React, { useRef, useState, useCallback } from 'react';

const SpecialMenu = () => {
  const audioContextRef = useRef(null);
  const [showMessage, setShowMessage] = useState(false);

  const playFart = useCallback(() => {
    // Create audio context on demand (required for mobile/autoplay policies)
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    const ctx = audioContextRef.current;
    const now = ctx.currentTime;
    
    // Create noise buffer for fart sound
    const duration = 0.6;
    const sampleRate = ctx.sampleRate;
    const bufferSize = duration * sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);
    
    // Generate brown noise with modulation for fart-like sound
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Brown noise formula
      lastOut = (lastOut + (0.02 * white)) / 1.02;
      // Add some low frequency wobble - different frequency for variety
      const wobble = Math.sin(i / sampleRate * 25 * Math.PI * 2) * 0.4;
      data[i] = (lastOut * 3.5 + wobble) * (1 - i / bufferSize); // Fade out
    }
    
    // Create source and connect
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    
    // Add lowpass filter for more bass
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 180;
    filter.Q.value = 1.2;
    
    // Add gain for volume control
    const gainNode = ctx.createGain();
    gainNode.gain.value = 0.6;
    
    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    source.start(now);
    source.stop(now + duration);
  }, []);

  const handleClick = () => {
    setShowMessage(true);
    // Small delay before fart for comedic timing
    setTimeout(() => {
      playFart();
    }, 300);
    // Hide message after a few seconds
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  return (
    <>
      {/* Hidden special menu button - top right corner */}
      <button
        onClick={handleClick}
        className="fixed top-4 right-4 w-6 h-6 opacity-[0.02] hover:opacity-15 transition-opacity duration-300 cursor-default z-50"
        style={{
          background: 'linear-gradient(135deg, rgba(139, 90, 43, 0.3), rgba(74, 14, 14, 0.2))',
        }}
        aria-hidden="true"
      />
      
      {/* Message popup */}
      {showMessage && (
        <div 
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100] pointer-events-none"
        >
          <div 
            className="bg-stone-900/95 border-2 border-amber-600 px-8 py-6 rounded-lg shadow-2xl animate-pulse"
            style={{
              boxShadow: '0 0 30px rgba(217, 119, 6, 0.4), inset 0 0 20px rgba(0,0,0,0.5)',
            }}
          >
            <p className="text-amber-500 text-2xl font-mono tracking-wider text-center text-glow">
              how special for you
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SpecialMenu;
