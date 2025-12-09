'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export interface Interactable {
  id: string
  x: number // percentage 0-100
  y: number // percentage 0-100
  label: string
  action: () => void
  size?: number // optional size in pixels, default 60
}

interface InteractiveRoomProps {
  backgroundImage: string
  backgroundAlt?: string
  interactables: Interactable[]
  roomTitle?: string
  statusText?: string
}

export default function InteractiveRoom({
  backgroundImage,
  backgroundAlt = 'Interactive room scene',
  interactables,
  roomTitle,
  statusText = '© THE S33K3R 2025'
}: InteractiveRoomProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)

  const handleInteractableClick = (interactable: Interactable) => {
    setActiveId(interactable.id)
    interactable.action()
    
    // Reset active state after animation
    setTimeout(() => {
      setActiveId(null)
    }, 300)
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0d0a08] font-mono">
      {/* Background Image Layer */}
      <div className="fixed inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={backgroundAlt}
          fill
          priority
          quality={90}
          className="object-cover"
          sizes="100vw"
        />
        
        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/50 pointer-events-none" />
        <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.8)] pointer-events-none" />
        
        {/* Scanline Effect */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.15),
              rgba(0, 0, 0, 0.15) 1px,
              transparent 1px,
              transparent 2px
            )`
          }}
        />
        
        {/* Dust/Grain Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-stone-950/90 backdrop-blur-sm border-b border-amber-900/30">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link 
            href="/"
            className="text-amber-500 hover:text-amber-400 transition-colors duration-200 tracking-widest text-sm font-bold uppercase"
          >
            ← RETURN
          </Link>
          {roomTitle && (
            <h1 className="text-stone-400 text-xs tracking-wider uppercase">
              {roomTitle}
            </h1>
          )}
        </div>
      </header>

      {/* Interactive Hitboxes Layer */}
      <div className="fixed inset-0 z-10" style={{ pointerEvents: 'none' }}>
        {interactables.map((item) => {
          const isHovered = hoveredId === item.id
          const isActive = activeId === item.id
          const size = item.size || 60

          return (
            <button
              key={item.id}
              onClick={() => handleInteractableClick(item)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 group"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                width: `${size}px`,
                height: `${size}px`,
                pointerEvents: 'auto',
                cursor: isHovered ? 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' style=\'font-size: 24px;\'><text y=\'24\'>👁️</text></svg>") 16 16, pointer' : 'default'
              }}
              aria-label={item.label}
            >
              {/* Pulsing Circle Indicator */}
              <div 
                className={`
                  absolute inset-0 rounded-full transition-all duration-300
                  ${isActive ? 'bg-amber-500/60 scale-125' : 'bg-amber-500/0'}
                  ${isHovered ? 'bg-amber-500/30 scale-110' : ''}
                  group-hover:animate-pulse
                `}
              />
              
              {/* Subtle Ring */}
              <div 
                className={`
                  absolute inset-0 rounded-full border-2 transition-all duration-300
                  ${isHovered ? 'border-amber-400/80 scale-110' : 'border-amber-600/20'}
                `}
              />
              
              {/* Inner Dot */}
              <div 
                className={`
                  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                  w-2 h-2 rounded-full transition-all duration-200
                  ${isHovered ? 'bg-amber-400 scale-150' : 'bg-amber-600/50'}
                `}
              />

              {/* Label on Hover */}
              {isHovered && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-stone-950/95 border border-amber-700/50 rounded text-amber-400 text-xs tracking-wider uppercase whitespace-nowrap shadow-lg animate-fade-in">
                  {item.label}
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Sticky Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-stone-950/90 backdrop-blur-sm border-t border-amber-900/30">
        <div className="max-w-7xl mx-auto px-6 py-3 text-center">
          <p className="text-stone-600 text-xs tracking-wider font-mono">
            {statusText}
          </p>
        </div>
      </footer>
    </div>
  )
}
