'use client'

import InteractiveRoom, { Interactable } from '@/components/InteractiveRoom'
import { useState } from 'react'

export default function BrothelPage() {
  const [inventory, setInventory] = useState<string[]>([])
  const [inspections, setInspections] = useState<Set<string>>(new Set())

  // Define interactive points in the room
  const interactables: Interactable[] = [
    {
      id: 'mirror',
      x: 75, // 75% from left
      y: 35, // 35% from top
      label: 'Inspect Mirror',
      size: 80,
      action: () => {
        if (!inspections.has('mirror')) {
          window.alert('The mirror reflects a face you barely recognize. Scratched into the corner: "December 12th - The truth reveals itself."')
          setInspections(prev => new Set(prev).add('mirror'))
        } else {
          window.alert('The scratched message remains. December 12th.')
        }
      }
    },
    {
      id: 'bottle',
      x: 30,
      y: 65,
      label: 'Pick up Bottle',
      size: 60,
      action: () => {
        if (!inventory.includes('bottle')) {
          setInventory(prev => [...prev, 'bottle'])
          window.alert('You picked up a dusty whiskey bottle. The label reads: "S33K3R Reserve - For those who dare to find."')
          console.log('Inventory updated:', [...inventory, 'bottle'])
        } else {
          window.alert('You already took the bottle.')
        }
      }
    },
    {
      id: 'painting',
      x: 50,
      y: 25,
      label: 'Examine Painting',
      size: 90,
      action: () => {
        window.alert('A painting of a desert at sunset. Or is it sunrise? The frame has strange symbols carved into it...')
        console.log('Painting examined. Symbols might be a cipher.')
      }
    },
    {
      id: 'safe',
      x: 85,
      y: 70,
      label: 'Try Safe',
      size: 70,
      action: () => {
        const code = prompt('Enter the combination (4 digits):')
        if (code === '1212') {
          window.alert('✅ The safe clicks open. Inside: A key and a note that reads "The transmission is real. Trust the S33K3R."')
          setInventory(prev => [...prev, 'safe-key', 'note'])
        } else if (code) {
          window.alert('❌ Wrong combination. The safe remains locked.')
        }
      }
    },
    {
      id: 'window',
      x: 20,
      y: 30,
      label: 'Look Outside',
      size: 100,
      action: () => {
        window.alert('Through the dusty window, you see an endless desert. In the distance, a radio tower blinks red.')
        console.log('Window inspected - radio tower noted.')
      }
    }
  ]

  return (
    <InteractiveRoom
      backgroundImage="/rooms/brothel-room.jpg" // You'll need to add this image
      backgroundAlt="Abandoned brothel room interior"
      roomTitle="THE BROTHEL - ROOM 7"
      statusText={`INVENTORY: ${inventory.length > 0 ? inventory.join(', ').toUpperCase() : 'EMPTY'}`}
      interactables={interactables}
    />
  )
}
