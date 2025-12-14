'use client'

import { useEffect, useState } from 'react'

interface TextScrambleProps {
  text: string
  className?: string
}

export default function TextScramble({ text, className = '' }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text)
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&'
  
  useEffect(() => {
    let iteration = 0
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return text[index]
            }
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )
      
      if (iteration >= text.length) {
        clearInterval(interval)
      }
      
      iteration += 1 / 3
    }, 30)
    
    return () => clearInterval(interval)
  }, [text])

  return <span className={className}>{displayText}</span>
}
