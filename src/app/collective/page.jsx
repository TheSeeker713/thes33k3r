import SiteShell from '@/components/SiteShell'
import Link from 'next/link'
export const metadata = { title: 'The Collective' }
const fragments = [
  ['Sun', 'Grounded in physical humanity: desert, horses, roads and a neo-western world.'],
  ['Star', 'An orbital and cosmic perspective. Data and patterns; complementary to Sun.'],
  ['Soul', 'Community, conscience, empathy and collective humanity.'],
  ['Shadow', 'An investigator who uncovers the Null Order / Null Dominion.'],
  ['Radio', 'Signals, transmissions and communication across realities.'],
  ['Lost', 'A displaced survivor who remembers erased realities.'],
  ['Twin fragment A', 'Searching, questioning, recognition and reunion.'],
  ['Twin fragment B', 'A distinct counterpart to the other twin.'],
  ['Song', 'Music, expression and artistic memory.'],
  ['Silent', 'Without a speaking or singing voice.'],
  ['Unknown / Unnamed', 'Intentionally unidentified. A distinct fragment from Lost.'],
]
export default function CollectivePage() {
  return <SiteShell><section className="page-intro"><p className="eyebrow">ELEVEN SURVIVORS / ONE CONSCIOUSNESS</p><h1>Worlds erased.<br /><em>Lives that remain.</em></h1><p>S33k3r is a collective consciousness formed from eleven surviving human fragments. Each retains a distinct personality, memory and connection to their original reality.</p><Link className="text-link" href="/about">Read the warning ↗</Link></section><section className="fragment-grid content-section" aria-label="The eleven fragments">{fragments.map(([name, description],i) => <article key={name} className="fragment"><span className="fragment-number">{String(i+1).padStart(2,'0')} / 11</span><h2>{name}</h2><p>{description}</p>{i === 6 || i === 7 ? <small>Temporary index label; personal name not displayed here.</small> : null}</article>)}</section></SiteShell>
}
