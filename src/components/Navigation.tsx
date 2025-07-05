import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Tech Stack', href: '#tech' },
  { name: 'Projects', href: '#projects' },
  { name: 'Profiles', href: '#profiles' },
  { name: 'Contact', href: '#contact' }
];

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4"
    >
      <div className={`transition-all duration-500 nav-glass rounded-full px-4 py-2 max-w-fit mx-auto border border-white/10`}>
        <div className="flex items-center justify-center gap-1">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="font-body text-sm gradient-text cursor-pointer px-3 py-1"
          >
            Portfolio
          </motion.div>

          {/* Separator */}
          <div className="w-px h-4 bg-border/50 mx-2"></div>

          {/* Navigation Links */}
          <div className="flex items-center gap-0.5">
            {navLinks.map((link, index) => (
              <motion.button
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection(link.href)}
                className={`relative px-3 py-1.5 text-xs font-body font-medium transition-all duration-300 rounded-full cursor-pointer ${
                  activeSection === link.href.slice(1) 
                    ? 'text-primary bg-primary/10' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.name}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};