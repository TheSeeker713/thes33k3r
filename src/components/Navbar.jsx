import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'HOME', href: '#', active: true },
    { label: 'TRANSMISSIONS', href: '#transmissions' },
    { label: 'THE PUZZLE', href: '#puzzle' },
    { label: 'ABOUT', href: '#about' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <nav className="relative z-50 bg-stone-950/80 backdrop-blur-sm border-b border-amber-900/30">
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
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`font-mono text-xs tracking-wider transition-colors duration-200 ${
                  item.active 
                    ? 'text-amber-500' 
                    : 'text-stone-400 hover:text-amber-400'
                }`}
              >
                {item.label}
              </a>
            ))}
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
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-64 pb-4' : 'max-h-0'}`}>
          <div className="flex flex-col space-y-2 pt-2 border-t border-amber-900/20">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`font-mono text-sm tracking-wider py-2 px-2 transition-colors duration-200 ${
                  item.active 
                    ? 'text-amber-500 bg-amber-900/20' 
                    : 'text-stone-400 hover:text-amber-400 hover:bg-amber-900/10'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
