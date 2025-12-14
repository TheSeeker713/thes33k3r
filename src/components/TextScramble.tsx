'use client'

import { useEffect, useRef, useState } from 'react'

interface TextScrambleProps {
  text: string
  speed?: number
  className?: string
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?'

export default function TextScramble({ text, speed = 50, className = '' }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const frameRef = useRef(0)
  const queueRef = useRef<Array<{ from: string; to: string; start: number; end: number }>>([])

  useEffect(() => {
    const length = text.length
    const queue: Array<{ from: string; to: string; start: number; end: number }> = []

    // Build the scramble queue
    for (let i = 0; i < length; i++) {
      const from = text[i]
      const to = text[i]
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      queue.push({ from, to, start, end })
    }

    queueRef.current = queue

    let frame = 0
    const update = () => {
      let output = ''
      let complete = 0

      for (let i = 0; i < queue.length; i++) {
        const { from, to, start, end } = queue[i]

        if (frame >= end) {
          complete++
          output += to
        } else if (frame >= start) {
          if (to === ' ') {
            output += ' '
          } else {
            output += CHARS[Math.floor(Math.random() * CHARS.length)]
          }
        } else {
          output += ''
        }
      }

      setDisplayText(output)

      if (complete === queue.length) {
        setIsComplete(true)
      } else {
        frameRef.current = requestAnimationFrame(update)
        frame++
      }
    }

    const timeoutId = setTimeout(() => {
      update()
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [text])

  return (
    <span className={className} aria-label={text}>
      {displayText}
      {!isComplete && <span className="animate-pulse">_</span>}
    </span>
  )
}
