'use client'
import { useEffect, useRef, useState } from 'react'
export default function VideoBackground() {
  const video = useRef(null)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    function update() { setPaused(media.matches); if (media.matches) video.current?.pause(); else video.current?.play().catch(() => {}) }
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  function toggle() { if (paused) video.current?.play().catch(() => {}); else video.current?.pause(); setPaused(!paused) }
  return <><div className="video-backdrop" aria-hidden="true"><video ref={video} autoPlay loop muted playsInline preload="metadata" poster="/images/signal-park.webp"><source src="/background.webm" type="video/webm" /></video></div><button className="motion-control" onClick={toggle}>{paused ? 'Resume background' : 'Pause background'}</button></>
}
