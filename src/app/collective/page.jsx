import SiteShell from '@/components/SiteShell'
import Link from 'next/link'
import { fragments, portraitPath } from '@/lib/fragments'
export const metadata = { title: 'The Collective' }
export default function CollectivePage() {
  return <SiteShell>
    <section className="page-intro"><p className="eyebrow">ELEVEN SURVIVORS / ONE CONSCIOUSNESS</p><h1>Worlds erased.<br /><em>Lives that remain.</em></h1><p>S33k3r is a collective consciousness formed from eleven surviving human fragments. Each retains a distinct personality, memory and connection to their original reality.</p><Link className="text-link" href="/about">Read the warning ↗</Link></section>
    <section className="fragment-grid content-section" aria-label="The eleven fragments">
      {fragments.map((fragment, i) => <article key={fragment.id} id={fragment.id} className="fragment-card">
        <div className="fragment-portrait">
          {portraitPath(fragment) ? <img src={portraitPath(fragment)} alt={fragment.alt} width="768" height="1152" loading="lazy" decoding="async" /> : <div className="fragment-signal" aria-hidden="true"><span>{fragment.symbol}</span><span className="eyebrow">{fragment.name.toUpperCase()} SEEKER</span></div>}
          <span className="fragment-number">{String(i+1).padStart(2,'0')} / 11</span>
        </div>
        <div className="fragment-copy"><p className="fragment-role">{fragment.role}</p><h2>{fragment.name}</h2><p>{fragment.description}</p></div>
      </article>)}
    </section>
  </SiteShell>
}
