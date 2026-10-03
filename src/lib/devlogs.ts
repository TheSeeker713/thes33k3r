import fs from 'node:fs'
import path from 'node:path'

export interface DevlogMetadata {
  slug: string
  number: string
  title: string
  subtitle: string
  dateRange: string
  startDate: string
  endDate: string
  excerpt: string
  author: string
  authorRole: string
  phase: string
  revisedDate: string
  status: 'DECRYPTED' | 'ARCHIVED' | 'CLASSIFIED'
}

export interface Devlog extends DevlogMetadata {
  content: string
  timestamps: string[]
}

// Explicit metadata keeps dates and excerpts independent of markdown headings or links.
export async function getDevlogs(): Promise<DevlogMetadata[]> {
  const directory = path.join(process.cwd(), 'src/app/devlog/data')
  return fs.readdirSync(directory)
    .filter(filename => /^devlogs\d{2}\.json$/.test(filename))
    .map(filename => JSON.parse(fs.readFileSync(path.join(directory, filename), 'utf8')) as DevlogMetadata)
    .sort((a, b) => Date.parse(a.startDate) - Date.parse(b.startDate) || Number(a.number) - Number(b.number))
}

export async function getDevlogBySlug(slug: string): Promise<Devlog | null> {
  const metadata = (await getDevlogs()).find(log => log.slug === slug)
  if (!metadata || !/^devlog\d{2}$/.test(slug)) return null
  const content = fs.readFileSync(path.join(process.cwd(), 'public/devlog', `${slug}.md`), 'utf8')
  const timestamps = [...content.matchAll(/\[(\d{1,2}:\d{2}\s+[AP]M\s+MT)\]/g)].map(match => match[1])
  return { ...metadata, content, timestamps: [...new Set(timestamps)] }
}
