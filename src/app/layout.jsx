import './globals.css'
export const metadata = {
  metadataBase: new URL('https://www.thes33k3r.com'),
  title: { default: 'The S33k3r Transmission | Mycelia Interactive', template: '%s | The S33k3r Transmission' },
  description: 'Eleven fragments. One transmission. Explore the cinematic and interactive worlds of The S33k3r Transmission, a Mycelia Interactive production.',
  openGraph: { title: 'The S33k3r Transmission', description: 'Eleven fragments. One transmission.', images: ['/images/signal-park.webp'], type: 'website' },
  robots: { index: true, follow: true },
  icons: { icon: '/icon.svg' },
}
export default function RootLayout({ children }) {
  return <html lang="en" data-theme="light"><body><a className="skip-link" href="#main-content">Skip to content</a>{children}</body></html>
}
