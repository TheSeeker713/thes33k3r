import React from 'react';

const Footer = () => {
  return (
    <footer className="relative z-10 w-full py-8 mt-auto">
      <div className="border-t border-amber-900/30 pt-6">
        <div className="flex flex-col items-center space-y-2 text-stone-600 font-mono text-xs md:text-sm">
          <p className="hover:text-amber-500 transition-colors">
            © DIGIARTIFACT 2025
          </p>
          <p className="hover:text-orange-500 transition-colors">
            © MYCELIA INTERACTIVE 2025
          </p>
          <p className="hover:text-amber-400 transition-colors">
            © THE S33K3R 2025
          </p>
        </div>
        
        {/* Decorative line */}
        <div className="flex justify-center mt-4">
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-700/50 to-transparent"></div>
        </div>
        
        {/* Hidden message */}
        <p className="text-center text-stone-900 text-xs mt-2 select-none">
          THE TRUTH IS HIDDEN IN PLAIN SIGHT
        </p>
      </div>
    </footer>
  );
};

export default Footer;
