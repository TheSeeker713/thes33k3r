import { getDevlogs } from '@/lib/devlogs'
import Link from 'next/link'
import SiteShell from '@/components/SiteShell'
export const metadata = { title: 'Development Archive' }
export default async function DevlogPage() {
 const devlogs = await getDevlogs()
 return <SiteShell><section className="page-intro"><p className="eyebrow">THE HISTORICAL DEVELOPMENT ARCHIVE / 2025</p><h1>Behind<br /><em>the signal.</em></h1><p>The original development journals, preserved as a record of the early experience. Historical plans and descriptions reflect their publication dates.</p></section><section className="devlog-list content-section">{devlogs.map(log => <Link key={log.slug} href={`/devlog/${log.slug}`} className="devlog-row"><span className="log-number">{log.number}</span><div><span className="eyebrow">{log.dateRange}</span><h2>{log.subtitle || log.title}</h2><p>{log.excerpt}</p></div><span aria-hidden="true">↗</span></Link>)}</section></SiteShell>
}
