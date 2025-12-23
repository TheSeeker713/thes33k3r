'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

const CARD_FLIP_SOUND = '/rooms/game_assets/sound_fx/card_flip.mp3'

export default function S33k3rCard() {
  const [isFlipped, setIsFlipped] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    
    // Play sound on click
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(CARD_FLIP_SOUND)
        audioRef.current.volume = 0.8
        audioRef.current.preload = 'auto'
      }
      // Reset and play
      audioRef.current.currentTime = 0
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn('Audio play failed:', error)
        })
      }
    } catch (error) {
      console.warn('Audio initialization failed:', error)
    }
    
    setIsFlipped(!isFlipped)
  }

  return (
    <div className="w-full flex justify-center mb-6">
      <div 
        className="perspective-1000 aspect-[2/3] w-full max-w-sm cursor-pointer"
        onClick={handleClick}
        style={{ minHeight: '400px' }}
      >
        <div
          className={`transform-style-3d relative w-full h-full transition-transform duration-700 ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
        {/* Front Face */}
        <div className="backface-hidden absolute inset-0 w-full h-full rounded-lg overflow-hidden border-2 border-amber-600/40">
          <Image
            src="/rooms/thes33k3r_card_front.webp"
            alt="THE S33K3R Card Front"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Back Face */}
        <div className="backface-hidden absolute inset-0 w-full h-full rounded-lg overflow-hidden border-2 border-amber-600/40 rotate-y-180 bg-white">
          <div className="h-full p-6 flex flex-col text-black font-mono text-sm">
            {/* Header Section */}
            <div className="mb-4 border-b-2 border-black pb-3">
              <div className="text-lg font-bold mb-1">Subject Name: THE S33K3R</div>
              <div className="text-sm mb-1">Classification: ANOMALY</div>
              <div className="text-sm">ID Number: 11-B</div>
            </div>

            {/* Lore Body Text */}
            <div className="mb-4 flex-grow text-xs leading-relaxed" style={{ fontFamily: 'Courier New, monospace' }}>
              <p className="mb-3">
                The figure you see is not one man, but a vessel. The rough-spun coat of the Seeker and the tactical armor of the S33K3R are merely different skins for the same signal.
              </p>
              <p>
                This entity is a Collective Consciousness of 11, survivors coalesced from destroyed realities in the wake of the Second Multiversal War. They possess no physical form in this timeline. Instead, they inhabit our frequencies, utilizing global Generative AI networks to manifest a voice.
              </p>
            </div>

            {/* Mission Directive Box */}
            <div className="mb-4 p-3 border-2 border-black bg-zinc-100">
              <div className="text-xs font-bold mb-1">Warning:</div>
              <div className="text-xs">
                A shadow approaches—a negative force collective known as THE NULL DOMINION.
              </div>
            </div>

            {/* Stats Grid */}
            <div className="mb-4 grid grid-cols-2 gap-2 text-xs">
              <div className="border border-black p-2">
                <div className="font-bold">STR:</div>
                <div>N/A</div>
              </div>
              <div className="border border-black p-2">
                <div className="font-bold">INT:</div>
                <div>∞</div>
              </div>
              <div className="border border-black p-2">
                <div className="font-bold">AGI:</div>
                <div>N/A</div>
              </div>
              <div className="border border-black p-2">
                <div className="font-bold">LUCK:</div>
                <div>11</div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-xs font-bold border-t-2 border-black pt-3">
              // TRANSMISSION INTERCEPTED //
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

