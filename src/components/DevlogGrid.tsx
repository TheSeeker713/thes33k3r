'use client'

import { motion } from 'framer-motion'
import { DevlogMetadata } from '@/lib/devlogs'
import DevlogCard from './DevlogCard'

interface DevlogGridProps {
  devlogs: DevlogMetadata[]
}

export default function DevlogGrid({ devlogs }: DevlogGridProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {devlogs.map((devlog, index) => (
        <motion.div
          key={devlog.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
        >
          <DevlogCard devlog={devlog} />
        </motion.div>
      ))}
    </motion.div>
  )
}
