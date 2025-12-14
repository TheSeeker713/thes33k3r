'use client'

import { DevlogMetadata } from '@/lib/devlogs'
import DevlogCard from './DevlogCard'

interface DevlogGridProps {
  devlogs: DevlogMetadata[]
}

export default function DevlogGrid({ devlogs }: DevlogGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {devlogs.map((devlog) => (
        <DevlogCard key={devlog.slug} devlog={devlog} />
      ))}
    </div>
  )
}
