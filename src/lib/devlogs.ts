import fs from 'fs'
import path from 'path'

export interface DevlogMetadata {
  slug: string
  number: string
  title: string
  subtitle: string
  dateRange: string
  excerpt: string
  status: 'DECRYPTED' | 'ARCHIVED' | 'CLASSIFIED'
}

export interface Devlog extends DevlogMetadata {
  content: string
  timestamps: string[]
}

/**
 * Reads all devlog markdown files from public/devlog/ directory
 * Parses metadata and content for the magazine interface
 */
export async function getDevlogs(): Promise<DevlogMetadata[]> {
  const devlogDir = path.join(process.cwd(), 'public', 'devlog')
  
  // Read all markdown files
  const files = fs.readdirSync(devlogDir).filter(file => file.endsWith('.md'))
  
  const devlogs = files.map(filename => {
    const filePath = path.join(devlogDir, filename)
    const content = fs.readFileSync(filePath, 'utf-8')
    
    return parseDevlogMetadata(filename, content)
  })
  
  // Sort by number descending (newest first)
  return devlogs.sort((a, b) => parseInt(b.number) - parseInt(a.number))
}

/**
 * Get a single devlog by slug with full content and extracted timestamps
 */
export async function getDevlogBySlug(slug: string): Promise<Devlog | null> {
  const devlogPath = path.join(process.cwd(), 'public', 'devlog', `${slug}.md`)
  
  if (!fs.existsSync(devlogPath)) {
    return null
  }
  
  const content = fs.readFileSync(devlogPath, 'utf-8')
  const metadata = parseDevlogMetadata(`${slug}.md`, content)
  const timestamps = extractTimestamps(content)
  
  return {
    ...metadata,
    content,
    timestamps
  }
}

/**
 * Parse markdown content to extract metadata
 */
function parseDevlogMetadata(filename: string, content: string): DevlogMetadata {
  const lines = content.split('\n')
  
  // Extract number from filename (devlog01.md -> 01)
  const number = filename.match(/devlog(\d+)\.md/)?.[1] || '00'
  const slug = `devlog${number}`
  
  // Extract first H1 as title
  const titleMatch = content.match(/^#\s+(.+)$/m)
  const title = titleMatch ? titleMatch[1] : 'Untitled'
  
  // Extract first H2 as subtitle
  const subtitleMatch = content.match(/^##\s+(.+)$/m)
  const subtitle = subtitleMatch ? subtitleMatch[1] : ''
  
  // Extract first timestamp as date range
  const timestampMatch = content.match(/\[([^\]]+)\]/)
  const dateRange = timestampMatch ? timestampMatch[1] : 'Date Unknown'
  
  // Extract first paragraph as excerpt (skip headings and timestamps)
  const paragraphMatch = content.match(/^(?!#|###)([^\n]{50,200})/m)
  const excerpt = paragraphMatch ? paragraphMatch[1].substring(0, 150) + '...' : ''
  
  // Determine status based on log number
  let status: 'DECRYPTED' | 'ARCHIVED' | 'CLASSIFIED' = 'DECRYPTED'
  const num = parseInt(number)
  if (num <= 3) {
    status = 'ARCHIVED'
  } else if (num >= 7) {
    status = 'DECRYPTED'
  }
  
  return {
    slug,
    number,
    title,
    subtitle,
    dateRange,
    excerpt,
    status
  }
}

/**
 * Extract all timestamps from markdown content
 * Looks for patterns like [11:11 AM MT] or [December 14th, 2025]
 */
function extractTimestamps(content: string): string[] {
  const timestampRegex = /\[(\d{1,2}:\d{2}\s+[AP]M(?:\s+MT)?)\]/g
  const timestamps: string[] = []
  let match
  
  while ((match = timestampRegex.exec(content)) !== null) {
    timestamps.push(match[1])
  }
  
  // Remove duplicates while preserving order
  return [...new Set(timestamps)]
}
