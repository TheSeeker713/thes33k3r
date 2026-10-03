import { getDevlogs } from '@/lib/devlogs'
import Link from 'next/link'
import SiteShell from '@/components/SiteShell'

export const metadata = {
  title: 'Development Archive',
  description: 'Jeremy Robards on building The S33k3r Transmission: the early CRT, the Bank, the Signal Teal redesign and the collective. Read from oldest to newest.',
}

export default async function DevlogPage() {
  const devlogs = await getDevlogs()
  const years = `${devlogs[0].startDate.slice(0, 4)}–${devlogs[devlogs.length - 1].endDate.slice(0, 4)}`
  return <SiteShell>
    <section className="page-intro archive-intro">
      <p className="eyebrow">THE DEVELOPMENT ARCHIVE / {years}</p>
      <h1>Behind<br /><em>the signal.</em></h1>
      <p>I'm Jeremy Robards, CTO of Mycelia Interactive LLC. This is my account of building The S33k3r Transmission, from the first CRT screen to the Signal Teal rebuild and the faces of the collective.</p>
      <p className="archive-note">{devlogs.length} entries, oldest first. GitHub commits and site sources appear at the end of every entry.</p>
    </section>
    <section className="devlog-list content-section" aria-label="Development entries, oldest to newest">
      {devlogs.map(log => <Link key={log.slug} href={`/devlog/${log.slug}`} className="devlog-row">
        <span className="log-number">{log.number}</span>
        <div><span className="eyebrow">{log.phase} / <time dateTime={log.startDate}>{log.dateRange}</time></span><h2>{log.title}</h2><p>{log.excerpt}</p></div>
        <span aria-hidden="true">↗</span>
      </Link>)}
    </section>
  </SiteShell>
}
