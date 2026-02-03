import React, { useState, useEffect } from 'react';
import { Container } from './ui/Container';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShidenLogo } from './ui/ShidenLogo';

interface NavbarProps {
    onViewChange: (view: 'home' | 'game') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onViewChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#founders' }, // Directed to Founders as per request "about to founders sections"
    { name: 'Partners', href: '#partners' },
  ];

  return (
    <>
      <nav 
        className={`fixed w-full z-50 top-0 left-0 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/80 backdrop-blur-lg border-b border-white/10 py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <Container>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer relative z-50" onClick={() => window.scrollTo(0,0)}>
              <ShidenLogo className="h-8 md:h-10 w-auto" />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-12">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-white hover:text-shiden-accent text-sm font-semibold uppercase tracking-widest transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
               <button 
                  onClick={() => onViewChange('game')}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/70 hover:text-shiden-accent transition-colors"
               >
                   Simulation
               </button>
               <a href="#contact" className={`border px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${isScrolled ? 'border-white text-white hover:bg-white hover:text-black' : 'border-white text-white hover:bg-white hover:text-black'}`}>
                  Let's Talk
               </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="-mr-2 flex md:hidden relative z-50">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none"
              >
                {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
              </button>
            </div>
          </div>
        </Container>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-40 bg-black flex flex-col justify-center items-center"
          >
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-shiden-accent text-4xl font-display font-bold"
                >
                  {link.name}
                </a>
              ))}
              
              <button 
                  onClick={() => { setIsOpen(false); onViewChange('game'); }}
                  className="text-shiden-accent text-2xl font-display font-bold uppercase"
              >
                  Play Simulation
              </button>

               <a href="#contact" onClick={() => setIsOpen(false)} className="mt-8 text-white border border-white px-8 py-3 rounded-full text-xl font-bold uppercase">
                Start a Project
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
