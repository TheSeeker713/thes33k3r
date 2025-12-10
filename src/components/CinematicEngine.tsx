'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import type { WorldConfig, RoomNode, ChoiceCard } from '@/types/game';

interface CinematicEngineProps {
  initialRoomId: string;
  worldConfig: WorldConfig;
  onRoomChange?: (roomId: string) => void;
  externalRoomId?: string; // For header navigation to force room changes
  disabled?: boolean; // Disable all interactions when true
}

export default function CinematicEngine({
  initialRoomId,
  worldConfig,
  onRoomChange,
  externalRoomId,
  disabled = false,
}: CinematicEngineProps) {
  const [currentRoomId, setCurrentRoomId] = useState(initialRoomId);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCards, setShowCards] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentRoom: RoomNode = worldConfig.rooms[currentRoomId];

  // Handle external room changes (e.g., from header navigation)
  useEffect(() => {
    if (externalRoomId && externalRoomId !== currentRoomId && !isTransitioning) {
      // Hard cut - no transition video
      setShowCards(false);
      setCurrentRoomId(externalRoomId);
      setTimeout(() => setShowCards(true), 300);
      onRoomChange?.(externalRoomId);
    }
  }, [externalRoomId, currentRoomId, isTransitioning, onRoomChange]);

  const handleCardClick = (card: ChoiceCard) => {
    if (isTransitioning || disabled) return;

    const targetRoom = worldConfig.rooms[card.targetRoomId];
    if (!targetRoom) {
      console.error(`Target room not found: ${card.targetRoomId}`);
      return;
    }

    // Step 1: Hide cards immediately
    setShowCards(false);
    setIsTransitioning(true);

    // Step 2: Set video source and make visible
    const video = videoRef.current;
    if (video) {
      video.src = card.transitionVideo;
      video.style.opacity = '1';
      video.style.display = 'block';
      
      // Play the video
      video.play().catch((error) => {
        console.error('Video playback failed:', error);
        // Fallback: just transition immediately
        completeTransition(card.targetRoomId);
      });
    } else {
      // No video element, just transition
      completeTransition(card.targetRoomId);
    }
  };

  const handleVideoEnded = () => {
    const video = videoRef.current;
    if (!video) return;

    // Get the target room from the video's data attribute
    const targetRoomId = video.getAttribute('data-target-room');
    if (targetRoomId) {
      completeTransition(targetRoomId);
    }
  };

  const completeTransition = (targetRoomId: string) => {
    // Step 3: Hide video
    const video = videoRef.current;
    if (video) {
      video.style.opacity = '0';
      video.style.display = 'none';
      video.src = ''; // Clear source
    }

    // Step 4: Swap background to target room
    setCurrentRoomId(targetRoomId);
    setIsTransitioning(false);

    // Step 5: Fade in new cards
    setTimeout(() => {
      setShowCards(true);
    }, 100);

    onRoomChange?.(targetRoomId);
  };

  // Preload next video when hovering over a card
  const handleCardHover = (card: ChoiceCard) => {
    const video = videoRef.current;
    if (video && !isTransitioning) {
      video.setAttribute('data-target-room', card.targetRoomId);
      // Preload the video
      const preloadVideo = document.createElement('video');
      preloadVideo.src = card.transitionVideo;
      preloadVideo.preload = 'auto';
    }
  };

  if (!currentRoom) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-amber-500">
        <p>Room not found: {currentRoomId}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        {currentRoom.loopingBackground ? (
          <video
            className="w-full h-full object-cover"
            src={currentRoom.loopingBackground}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <Image
            src={currentRoom.staticBackground}
            alt={`Room: ${currentRoom.id}`}
            fill
            className="object-cover"
            priority
            quality={90}
          />
        )}
      </div>

      {/* Transition Video Layer */}
      <video
        ref={videoRef}
        className="absolute inset-0 z-10 w-full h-full object-cover transition-opacity duration-300"
        style={{ opacity: 0, display: 'none' }}
        preload="auto"
        playsInline
        onEnded={handleVideoEnded}
      />

      {/* Choice Cards UI Layer */}
      <div
        className={`absolute inset-0 z-20 flex items-center justify-center p-8 transition-opacity duration-500 ${
          showCards && !isTransitioning && !disabled ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
          {currentRoom.cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card)}
              onMouseEnter={() => handleCardHover(card)}
              className="group relative bg-black/80 border-2 border-amber-600/50 rounded-lg p-6 
                         hover:border-amber-500 hover:shadow-[0_0_20px_rgba(251,191,36,0.5)]
                         transition-all duration-300 hover:scale-105 active:scale-95
                         backdrop-blur-sm"
              disabled={isTransitioning || disabled}
            >
              {/* Card Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/0 via-amber-600/0 to-amber-600/20 
                              rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Card Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-amber-500 mb-3 group-hover:text-amber-400 transition-colors">
                  {card.label}
                </h3>
                <p className="text-amber-200/80 text-sm leading-relaxed group-hover:text-amber-100 transition-colors">
                  {card.description}
                </p>
              </div>

              {/* Corner Decorations */}
              <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-amber-600/50 group-hover:border-amber-500 transition-colors" />
              <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-amber-600/50 group-hover:border-amber-500 transition-colors" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-amber-600/50 group-hover:border-amber-500 transition-colors" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-amber-600/50 group-hover:border-amber-500 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Transition State Indicator (Optional Debug) */}
      {isTransitioning && (
        <div className="absolute top-4 right-4 z-30 bg-black/80 border border-amber-600/50 px-3 py-1 rounded text-amber-500 text-sm">
          Transitioning...
        </div>
      )}
    </div>
  );
}
