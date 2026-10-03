import Link from 'next/link'
import SiteShell from '@/components/SiteShell'
export const metadata = { title: 'Games' }
export default function GamesPage() {
 return <SiteShell><section className="page-intro"><p className="eyebrow">INTERACTIVE WORLDS</p><h1>Follow the signal.<br /><em>Enter the story.</em></h1><p>Explore the existing interactive experience within The S33k3r Transmission.</p></section><section className="content-section games-list"><Link href="/games/bank" className="experience-card bank-card"><img src="/rooms/banklobby_room.webp" alt="The abandoned Bank lobby" width="1280" height="720" /><div><p className="eyebrow">FMV PUZZLE / SINGLE PLAYER</p><h2>The Bank</h2><p>The vault contains the first truth. Recover the protocol through the cinematic Bank encounter.</p><span className="button button-light">Enter the Bank ↗</span></div></Link></section></SiteShell>
}
