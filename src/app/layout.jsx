import './globals.css'

export const metadata = {
  title: 'thes33k3r',
  description: 'THE S33K3R TRANSMISSION',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
