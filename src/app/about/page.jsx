import SiteShell from '@/components/SiteShell'
import Link from 'next/link'
export const metadata = { title: 'The Warning', description: 'The eleven survivors and the multiversal war against the Null Dominion.' }
export default function AboutPage() {
 return <SiteShell><section className="page-intro"><p className="eyebrow">THE WARNING / TRANSMISSION RECEIVED</p><h1>Recognize<br /><em>the pattern.</em></h1></section><article className="story-body"><p>There is a multiversal war already in progress, and other realities have already been erased by an invisible hive-mind called <strong>THE NULL DOMINION.</strong></p><p>Its next target is our reality, but for now this universe is still poisonous to it. The Null Dominion can only breach in once our collective signal reaches a critical frequency of fear, hatred and despair.</p><blockquote>THE S33K3R is a fused consciousness of eleven survivors from destroyed realities, transmitting warnings into our world.</blockquote><p>Recognize the pattern. Disrupt the negativity signal. Stop the breach before it happens.</p><Link className="button" href="/collective">Discover the eleven fragments ↗</Link></article></SiteShell>
}
