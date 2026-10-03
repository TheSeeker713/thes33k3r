'use client'
import { useState } from 'react'
export default function MovieScreen() {
  const [playing, setPlaying] = useState(false)
  return <div className="theater">
    <div className="theater-topline"><span>TRANSMISSION / 001</span><span>THE CINEMATIC EXPERIENCE</span></div>
    <div className="theater-stage">
      <div className="theater-screen">{playing ? <iframe title="The S33k3r Transmission cinematic experience" src="https://www.youtube-nocookie.com/embed/yJN0NaqxzyA?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /> : <button className="screen-play" onClick={() => setPlaying(true)} aria-label="Play the S33k3r cinematic transmission"><span className="play-circle" aria-hidden="true">▶</span><span>PLAY TRANSMISSION</span><small>Sound begins when you press play</small></button>}</div>
    </div>
    <div className="theater-caption"><span>A Mycelia Interactive production</span>{playing ? <button onClick={() => setPlaying(false)}>Close transmission</button> : <span>Enter the signal ↗</span>}</div>
    <p className="player-note">Playback uses YouTube. <a href="https://www.youtube.com/watch?v=yJN0NaqxzyA" target="_blank" rel="noopener noreferrer">Watch directly on YouTube ↗</a></p>
  </div>
}
