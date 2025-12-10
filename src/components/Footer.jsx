import React from 'react';

const Footer = () => {
  return (
    <footer className="relative z-10 w-full py-4 mt-auto">
      <div className="border-t border-amber-900/30 pt-3">
        <div className="flex items-center justify-center text-stone-600 font-mono text-[10px] md:text-xs">
          <p className="hover:text-amber-500 transition-colors">
            © DIGIARTIFACT 2025
          </p>
          <span className="mx-2 text-stone-700">|</span>
          <p className="hover:text-orange-500 transition-colors">
            © MYCELIA INTERACTIVE 2025
          </p>
          <span className="mx-2 text-stone-700">|</span>
          <p className="hover:text-amber-400 transition-colors">
            © THE S33K3R 2025
          </p>
        </div>
        
        {/* Decorative line */}
        <div className="flex justify-center mt-2">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-700/50 to-transparent"></div>
        </div>
        
        {/* Hidden message */}
        <p className="text-center text-stone-600 text-[10px] mt-1 select-none">
          THE TRUTH IS HIDDEN IN PLAIN SIGHT
        </p>
      </div>
    </footer>
  );
};

export default Footer;
