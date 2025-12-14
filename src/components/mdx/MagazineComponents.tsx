'use client'

import { ReactNode, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

// ============================================
// 1. ARTICLE GRID WRAPPER
// ============================================
interface ArticleGridProps {
  children: ReactNode
}

export function ArticleGrid({ children }: ArticleGridProps) {
  return (
    <article className="grid grid-cols-12 gap-6 max-w-7xl mx-auto px-6 py-12">
      {children}
    </article>
  )
}

// ============================================
// 2. TYPOGRAPHY COMPONENTS
// ============================================

// Standard Paragraph - Center 8 columns
interface ParagraphProps {
  children?: ReactNode
}

export function Paragraph({ children }: ParagraphProps) {
  return (
    <p className="col-start-3 col-span-8 text-slate-300 text-lg leading-relaxed mb-6 font-light tracking-wide">
      {children}
    </p>
  )
}

// Pull Quote - Breaks out wider, bold, centered
interface PullQuoteProps {
  children?: ReactNode
}

export function PullQuote({ children }: PullQuoteProps) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="col-start-2 col-span-10 my-12 py-8 px-12 text-center relative"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 via-amber-500/20 to-orange-600/10 rounded-lg blur-xl" />
      
      {/* Quote marks */}
      <div className="absolute -top-4 left-8 text-6xl text-orange-500/30 font-serif">"</div>
      <div className="absolute -bottom-8 right-8 text-6xl text-orange-500/30 font-serif">"</div>
      
      {/* Content */}
      <div className="relative">
        <p className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 leading-tight mb-4">
          {children}
        </p>
        <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto rounded-full" />
      </div>
    </motion.blockquote>
  )
}

// H1 - Glitch-styled, full width
interface H1Props {
  children?: ReactNode
}

export function H1({ children }: H1Props) {
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const element = textRef.current
    if (!element) return

    let frame = 0
    const glitchInterval = setInterval(() => {
      frame++
      if (frame % 30 === 0) {
        element.style.textShadow = `
          ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 rgba(255, 107, 0, 0.7),
          ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 rgba(0, 255, 255, 0.7)
        `
        setTimeout(() => {
          element.style.textShadow = 'none'
        }, 50)
      }
    }, 100)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <h1
      ref={textRef}
      className="col-span-12 text-5xl sm:text-6xl md:text-7xl font-bold mb-8 mt-12 text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-amber-400 to-slate-100 tracking-tight"
    >
      {children}
    </h1>
  )
}

// H2 - Glitch-styled, spans center columns
interface H2Props {
  children?: ReactNode
}

export function H2({ children }: H2Props) {
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const element = textRef.current
    if (!element) return

    let frame = 0
    const glitchInterval = setInterval(() => {
      frame++
      if (frame % 40 === 0) {
        element.style.textShadow = `
          ${Math.random() * 5 - 2.5}px ${Math.random() * 5 - 2.5}px 0 rgba(251, 191, 36, 0.6),
          ${Math.random() * 5 - 2.5}px ${Math.random() * 5 - 2.5}px 0 rgba(255, 107, 0, 0.6)
        `
        setTimeout(() => {
          element.style.textShadow = 'none'
        }, 40)
      }
    }, 100)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <h2
      ref={textRef}
      className="col-start-3 col-span-8 text-3xl sm:text-4xl font-bold mb-6 mt-10 text-amber-400 border-b border-orange-500/30 pb-3"
    >
      {children}
    </h2>
  )
}

// H3 - Timestamp style
interface H3Props {
  children?: ReactNode
}

export function H3({ children }: H3Props) {
  return (
    <h3 className="col-start-3 col-span-8 text-xl sm:text-2xl font-mono text-orange-500 mb-4 mt-8 tracking-wider">
      {children}
    </h3>
  )
}

// ============================================
// 3. MEDIA COMPONENT
// ============================================
interface TechFigureProps {
  src: string
  alt: string
  caption?: string
  figNumber?: string
  classification?: 'DECRYPTED' | 'CLASSIFIED' | 'ARCHIVED'
  fullWidth?: boolean
}

export function TechFigure({
  src,
  alt,
  caption,
  figNumber = '01',
  classification = 'DECRYPTED',
  fullWidth = false
}: TechFigureProps) {
  const classificationColors = {
    DECRYPTED: 'text-emerald-400 border-emerald-500/50',
    CLASSIFIED: 'text-red-400 border-red-500/50',
    ARCHIVED: 'text-slate-400 border-slate-500/50'
  }

  return (
    <motion.figure
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`${fullWidth ? 'col-span-12' : 'col-start-2 col-span-10'} my-10 group`}
    >
      {/* Polaroid-style frame */}
      <div className="relative bg-zinc-900/90 border-2 border-slate-700/50 rounded-lg overflow-hidden shadow-2xl group-hover:border-orange-500/50 transition-colors duration-300">
        {/* Schematic grid overlay */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(251,191,36,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        
        {/* Image container */}
        <div className="relative w-full aspect-video bg-zinc-950">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
          />
        </div>

        {/* Caption area - code metadata style */}
        <div className="p-4 border-t-2 border-slate-700/50 bg-zinc-950/80 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <span className="font-mono text-orange-500 text-sm tracking-wider">
                FIG_{figNumber}
              </span>
              <span className="text-slate-600">//</span>
              <span className={`font-mono text-xs px-2 py-1 border rounded ${classificationColors[classification]}`}>
                {classification}
              </span>
            </div>
            
            {/* Fake metadata */}
            <div className="text-xs text-slate-600 font-mono hidden sm:block">
              [TIMESTAMP: {new Date().toISOString().split('T')[0]}]
            </div>
          </div>
          
          {caption && (
            <p className="text-slate-400 text-sm leading-relaxed font-mono">
              {caption}
            </p>
          )}
        </div>

        {/* Corner brackets (schematic style) */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-orange-500/40" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-orange-500/40" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-orange-500/40" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-orange-500/40" />
      </div>
    </motion.figure>
  )
}

// ============================================
// 4. DROP CAP COMPONENT
// ============================================
interface DropCapProps {
  children?: ReactNode
}

export function DropCap({ children }: DropCapProps) {
  const text = String(children)
  const firstLetter = text.charAt(0)
  const restOfText = text.slice(1)

  return (
    <p className="col-start-3 col-span-8 text-slate-300 text-lg leading-relaxed mb-6 font-light tracking-wide">
      <span className="float-left text-8xl font-bold leading-none mr-4 mt-2 text-transparent bg-clip-text bg-gradient-to-br from-orange-500 via-amber-400 to-orange-600">
        {firstLetter}
      </span>
      {restOfText}
    </p>
  )
}

// ============================================
// 5. ADDITIONAL COMPONENTS
// ============================================

// Code block - CRT terminal style
interface CodeProps {
  children?: ReactNode
  className?: string
}

export function Code({ children, className }: CodeProps) {
  const isInline = !className?.includes('language-')
  
  if (isInline) {
    return (
      <code className="px-2 py-0.5 bg-emerald-950/50 text-emerald-400 border border-emerald-500/30 rounded font-mono text-sm">
        {children}
      </code>
    )
  }

  return (
    <div className="col-start-2 col-span-10 my-8">
      <div className="relative group">
        {/* Scanlines effect */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,0,0.1)_2px,rgba(0,255,0,0.1)_4px)] rounded-lg" />
        
        <pre className="relative bg-black/90 border-2 border-emerald-500/50 rounded-lg p-6 overflow-x-auto shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-shadow duration-300">
          <code className="text-emerald-400 font-mono text-sm leading-relaxed">
            {children}
          </code>
        </pre>
        
        {/* Terminal header */}
        <div className="absolute top-2 right-2 flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
        </div>
      </div>
    </div>
  )
}

// Strong/Bold text
interface StrongProps {
  children?: ReactNode
}

export function Strong({ children }: StrongProps) {
  return (
    <strong className="text-amber-300 font-semibold">
      {children}
    </strong>
  )
}

// Links
interface LinkProps {
  children?: ReactNode
  href?: string
}

export function Link({ children, href }: LinkProps) {
  return (
    <a
      href={href}
      className="text-orange-400 underline decoration-orange-500/30 hover:text-orange-300 hover:decoration-orange-400/50 transition-colors"
    >
      {children}
    </a>
  )
}

// Horizontal Rule
export function HR() {
  return (
    <hr className="col-start-3 col-span-8 my-12 border-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
  )
}

// Lists
interface ULProps {
  children?: ReactNode
}

export function UL({ children }: ULProps) {
  return (
    <ul className="col-start-3 col-span-8 list-disc list-inside text-slate-300 text-lg space-y-3 mb-6 ml-6">
      {children}
    </ul>
  )
}

export function OL({ children }: ULProps) {
  return (
    <ol className="col-start-3 col-span-8 list-decimal list-inside text-slate-300 text-lg space-y-3 mb-6 ml-6">
      {children}
    </ol>
  )
}
