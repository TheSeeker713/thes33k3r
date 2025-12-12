"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { label: 'HOME', href: '/', type: 'link' },
    { label: 'TRANSMISSIONS', href: { pathname: '/', hash: 'transmissions' }, type: 'link' },
    { label: 'THE PUZZLE', href: { pathname: '/', hash: 'puzzle' }, type: 'link' },
  ]

  const isActive = (href) => {
    const targetPath = typeof href === 'string' ? href : href?.pathname || '/'
    if (targetPath === '/' && pathname === '/') return true
    return pathname === targetPath
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-950/90 backdrop-blur-sm border-b border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-12 md:h-14">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <span className="text-amber-500 font-mono text-sm md:text-base tracking-wider">
              S33K3R
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`font-mono text-xs tracking-wider transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-amber-500'
                    : 'text-stone-400 hover:text-amber-400'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Prominent Warning Button */}
            <Link
              href="/about"
              className="font-mono text-xs tracking-wider px-4 py-2 rounded border-2 border-amber-500 text-amber-500 bg-amber-900/20 hover:bg-amber-800/40 hover:border-amber-400 hover:text-amber-400 transition-all duration-300 animate-pulse font-bold shadow-lg shadow-amber-500/30"
            >
              ⚠ THE WARNING
            </Link>
            
            {/* Coming Soon Label */}
            <span className="font-mono text-xs tracking-wider text-amber-500 animate-pulse pointer-events-none">
              COMING SOON: DEC 14
            </span>
            
            {/* Disabled Room Button */}
            <button
              disabled
              className="font-mono text-xs tracking-wider px-3 py-1 rounded border border-red-500/50 text-red-400 bg-red-900/20 cursor-not-allowed opacity-60"
            >
              ROOM [LOCKED]
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-amber-500 hover:text-amber-400 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 bg-current transform transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block h-0.5 bg-current transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 bg-current transform transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-80 pb-4' : 'max-h-0'}`}>
          <div className="flex flex-col space-y-2 pt-2 border-t border-amber-900/20">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`font-mono text-sm tracking-wider py-2 px-2 transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-amber-500 bg-amber-900/20'
                    : 'text-stone-400 hover:text-amber-400 hover:bg-amber-900/10'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile Warning Button */}
            <Link
              href="/about"
              onClick={() => setIsMenuOpen(false)}
              className="font-mono text-sm tracking-wider py-3 px-4 rounded border-2 border-amber-500 text-amber-500 bg-amber-900/20 hover:bg-amber-800/40 transition-all duration-300 animate-pulse font-bold text-center shadow-lg shadow-amber-500/30"
            >
              ⚠ THE WARNING
            </Link>
            
            {/* Mobile Coming Soon & Locked Room */}
            <span className="font-mono text-xs tracking-wider py-2 px-2 text-amber-500 animate-pulse">
              COMING SOON: DEC 14
            </span>
            <button
              disabled
              className="font-mono text-sm tracking-wider py-2 px-2 rounded border border-red-500/50 text-red-400 bg-red-900/20 cursor-not-allowed opacity-60 text-left"
            >
              ROOM [LOCKED]
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
