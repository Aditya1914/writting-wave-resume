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
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className={`transition-all duration-500 ${
        isScrolled ? 'glass-header' : 'glass-card'
      } rounded-2xl px-6 py-3`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="font-heading text-lg gradient-text cursor-pointer mr-8"
          >
            Portfolio
          </motion.div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <motion.button
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(link.href)}
                className={`relative px-3 py-2 text-xs font-medium transition-all duration-300 rounded-lg cursor-pointer ${
                  activeSection === link.href.slice(1) 
                    ? 'text-primary bg-primary/10' 
                    : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
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