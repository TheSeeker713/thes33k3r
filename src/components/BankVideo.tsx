'use client'

import { useEffect, useRef, useState } from 'react'

interface BankVideoProps {
  src: string
  label: string
  continueLabel: string
  onComplete: () => void
}

export default function BankVideo({ src, label, continueLabel, onComplete }: BankVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playbackIssue, setPlaybackIssue] = useState(false)

  function play() {
    const video = videoRef.current
    if (!video) return
    video.volume = 0.8
    video.play().catch(() => setPlaybackIssue(true))
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.volume = 0.8
    video.play().catch(() => setPlaybackIssue(true))
    return () => video.pause()
  }, [])

  return <div className="absolute inset-0 z-50 bg-black flex items-center justify-center">
    <video
      ref={videoRef}
      aria-label={label}
      className="max-w-full max-h-full object-contain"
      src={src}
      playsInline
      preload="auto"
      onEnded={onComplete}
      onError={() => setPlaybackIssue(true)}
      onStalled={() => setPlaybackIssue(true)}
      onPlaying={() => setPlaybackIssue(false)}
    />
    <div className="absolute bottom-6 inset-x-4 flex flex-wrap items-center justify-center gap-3 text-sm font-mono">
      {playbackIssue && <>
        <p role="status" className="w-full text-center text-amber-300">The cinematic could not play. You can retry or continue.</p>
        <button type="button" onClick={play} className="px-4 py-2 rounded border border-amber-500/60 text-amber-300 bg-black/80">Retry video</button>
      </>}
      <button type="button" onClick={onComplete} className="px-4 py-2 rounded border border-amber-500/60 text-amber-300 hover:bg-amber-500/10 bg-black/80">
        {continueLabel}
      </button>
    </div>
  </div>
}
