import SiteShell from '@/components/SiteShell'
import Link from 'next/link'
export default function NotFound() { return <SiteShell><section className="page-intro"><p className="eyebrow">404 / SIGNAL NOT FOUND</p><h1>This frequency<br /><em>is quiet.</em></h1><Link className="button" href="/">Return to the transmission ↗</Link></section></SiteShell> }
