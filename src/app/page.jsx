import Link from 'next/link'
import MovieScreen from '@/components/MovieScreen'
import VideoBackground from '@/components/VideoBackground'
import SiteShell from '@/components/SiteShell'
import { fragments, portraitPath } from '@/lib/fragments'
export default function Home() {
  return <SiteShell>
    <section className="hero">
      <img className="hero-image" src="/images/signal-park.webp" alt="An atmospheric amusement park beside a misty canal, with teal railings and amber lanterns" fetchPriority="high" width="1536" height="1024" />
      <div className="hero-shade" />
      <div className="hero-copy"><p className="eyebrow"><span className="signal-dot" /> A SIGNAL ACROSS REALITIES</p><h1>THE S33K3R<br /><em>TRANSMISSION</em></h1><p className="hero-subtitle">Eleven fragments. One transmission.</p><p className="hero-description">Their worlds were erased.<br />Their voices are still reaching ours.</p><div className="hero-actions"><a className="button button-light" href="#transmissions">Watch the transmission <span>↗</span></a><Link className="hero-link" href="/collective">Discover the collective →</Link></div></div>
      <div className="hero-coordinate"><span>11 SURVIVORS / ONE CONSCIOUSNESS</span><span>THE SIGNAL CONTINUES</span></div>
    </section>
    <div className="signal-strip"><span>FMV & CINEMA</span><span aria-hidden="true">✳</span><span>INTERACTIVE WORLDS</span><span aria-hidden="true">✳</span><span>MUSIC & MEMORY</span><span aria-hidden="true">✳</span><span>THE S33K3R TRANSMISSION</span></div>
    <section id="transmissions" className="transmission-section"><VideoBackground /><div className="section-heading"><div><p className="eyebrow">01 / RECEIVE THE SIGNAL</p><h2>A world beyond<br /><em>the screen.</em></h2></div><p>A cinematic transmission from The S33k3r.<br />Step into the story. Follow what remains.</p></div><MovieScreen /></section>
    <section className="collective-preview content-section"><div className="section-heading"><div><p className="eyebrow">02 / THE COLLECTIVE</p><h2>Eleven lives.<br /><em>Still connected.</em></h2></div><div className="section-intro"><p>S33k3r is a collective consciousness of eleven surviving human fragments. Each carries a distinct personality, memory and connection to a world that no longer exists.</p><Link className="text-link" href="/collective">Meet the collective <span>↗</span></Link></div></div>
      <nav className="collective-profiles" aria-label="Meet the eleven fragments">
        {fragments.map((fragment, i) => <Link key={fragment.id} className="collective-profile" href={`/collective#${fragment.id}`} aria-label={`Meet ${fragment.name}`}>
          <span className="profile-image">{portraitPath(fragment) ? <img src={portraitPath(fragment, true)} alt="" width="256" height="384" loading="lazy" decoding="async" /> : <span className="profile-symbol" aria-hidden="true">{fragment.symbol}</span>}</span>
          <span className="profile-name">{fragment.label}</span><span className="profile-number">{String(i+1).padStart(2,'0')}</span>
        </Link>)}
      </nav>
      <p className="fine-note">Eleven fragments. Distinct memories. A shared transmission.</p></section>
    <section className="explore-section content-section"><p className="eyebrow">03 / FOLLOW THE TRANSMISSION</p><div className="experience-grid"><Link href="/games" className="experience-card bank-card"><img src="/rooms/banklobby_room.webp" alt="Sunlight entering the abandoned Bank lobby" loading="lazy" width="1280" height="720" /><div><span className="eyebrow">INTERACTIVE EXPERIENCE</span><h2>The Bank</h2><p>The signal leads here. The vault contains the first truth.</p><span className="text-link">Explore the games <span>↗</span></span></div></Link><Link href="/devlog" className="experience-card archive-card"><span className="archive-number" aria-hidden="true">08</span><div><span className="eyebrow">THE DEVELOPMENT ARCHIVE</span><h2>Behind the signal.</h2><p>Eight chapters tracing the early cinematic experience, its puzzles and the Bank encounter.</p><span className="text-link">Read the archive <span>↗</span></span></div></Link></div></section>
  </SiteShell>
}
