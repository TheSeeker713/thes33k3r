import React, { useRef, useCallback } from 'react';

const FartBubble = () => {
  const audioContextRef = useRef(null);

  const playFart = useCallback(() => {
    // Create audio context on demand (required for mobile/autoplay policies)
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    const ctx = audioContextRef.current;
    const now = ctx.currentTime;
    
    // Create noise buffer for fart sound
    const duration = 0.5;
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
      // Add some low frequency wobble
      const wobble = Math.sin(i / sampleRate * 30 * Math.PI * 2) * 0.3;
      data[i] = (lastOut * 3 + wobble) * (1 - i / bufferSize); // Fade out
    }
    
    // Create source and connect
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    
    // Add lowpass filter for more bass
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 200;
    filter.Q.value = 1;
    
    // Add gain for volume control
    const gainNode = ctx.createGain();
    gainNode.gain.value = 0.5;
    
    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    source.start(now);
    source.stop(now + duration);
  }, []);

  return (
    <button
      onClick={playFart}
      className="fixed bottom-20 left-4 w-8 h-8 rounded-full opacity-80 hover:opacity-100 transition-opacity duration-300 z-50"
      style={{
        background: 'radial-gradient(circle at 30% 30%, #ff00ff, #aa00aa)',
        boxShadow: '0 0 12px rgba(255, 0, 255, 0.6)',
      }}
      aria-hidden="true"
    />
  );
};

export default FartBubble;
