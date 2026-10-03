'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(false)
  useEffect(() => {
    let theme = 'light'
    try { theme = localStorage.getItem('s33k3r-theme') || 'light' } catch { /* Storage may be unavailable in private browsing. */ }
    document.documentElement.dataset.theme = theme === 'dark' ? 'dark' : 'light'
    const frame = requestAnimationFrame(() => setDark(theme === 'dark'))
    return () => cancelAnimationFrame(frame)
  }, [])
  function toggleTheme() {
    const next = !dark
    setDark(next)
    document.documentElement.dataset.theme = next ? 'dark' : 'light'
    try { localStorage.setItem('s33k3r-theme', next ? 'dark' : 'light') } catch { /* Storage may be unavailable in private browsing. */ }
  }
  const links = [['The collective', '/collective'], ['Transmissions', '/#transmissions'], ['Games', '/games'], ['Archive', '/devlog']]
  return <header className="site-header">
    <Link href="/" className="wordmark" aria-label="S33k3r home">S33K3R<span className="wordmark-dot">✳</span></Link>
    <nav aria-label="Main navigation" className={open ? 'main-nav is-open' : 'main-nav'} id="main-navigation">
      {links.map(([label, href]) => <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</Link>)}
    </nav>
    <div className="header-controls"><button className="theme-toggle" onClick={toggleTheme} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} aria-pressed={dark}><span aria-hidden="true">{dark ? '☾' : '☀'}</span><span className="theme-label">{dark ? 'Dark' : 'Light'}</span></button>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-navigation">{open ? 'Close' : 'Menu'}</button></div>
  </header>
}
