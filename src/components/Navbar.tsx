import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar({ currentView, navigateTo }: { currentView: string, navigateTo: (view: 'home' | 'portfolio') => void }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#home', view: 'home' },
    { name: 'Portfólio', href: '#portfolio', view: 'portfolio' },
    { name: 'Sobre Mim', href: '#about', view: 'home' },
    { name: 'Contato', href: '#contact', view: 'home' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: any) => {
    if (link.view !== currentView) {
      e.preventDefault();
      navigateTo(link.view);
      // Se for para o home e tiver um hash, espera o render e scrolla
      if (link.href.startsWith('#') && link.href !== '#') {
        setTimeout(() => {
          const el = document.querySelector(link.href);
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || currentView === 'portfolio' ? 'bg-slate-900/95 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <button 
          onClick={() => navigateTo('home')}
          className="text-left focus:outline-none group"
        >
          <span className="text-2xl font-serif font-bold text-white tracking-tight group-hover:text-amber-400 transition-colors">
            Jader J S Pinto
          </span>
          <span className="text-amber-500 text-sm block font-sans font-normal tracking-widest uppercase mt-1">
            Escritor Cristão
          </span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link)}
              className={`transition-colors font-medium text-sm uppercase tracking-wide ${
                (currentView === link.view && link.name === 'Portfólio' && currentView === 'portfolio') || 
                (currentView === 'home' && link.name === 'Início')
                  ? 'text-amber-400' 
                  : 'text-slate-300 hover:text-amber-400'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 border-t border-slate-800 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={`py-2 text-lg font-medium border-b border-slate-800 last:border-0 transition-colors ${
                    currentView === link.view && link.name === 'Portfólio' && currentView === 'portfolio'
                      ? 'text-amber-400'
                      : 'text-slate-300 hover:text-amber-400'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
