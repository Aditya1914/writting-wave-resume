import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Tech Stack', href: '#tech' },
  { name: 'Projects', href: '#projects' },
  { name: 'Profiles', href: '#profiles' },
  { name: 'Contact', href: '#contact' }
];

// Simple, optimized smooth scroll function
function smoothScrollTo(targetY: number, duration: number): void {
  // Cancel any ongoing animations
  if (window.smoothScrollAnimationId) {
    window.cancelAnimationFrame(window.smoothScrollAnimationId);
  }

  const startingY = window.scrollY;
  const diff = targetY - startingY;
  let start: number;

  // Easing function
  const easeInOutQuad = (t: number): number => {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  };

  function step(timestamp: number) {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const percent = Math.min(time / duration, 1);
    const easedPercent = easeInOutQuad(percent);
    
    window.scrollTo(0, startingY + diff * easedPercent);

    if (time < duration) {
      window.smoothScrollAnimationId = window.requestAnimationFrame(step);
    }
  }

  window.smoothScrollAnimationId = window.requestAnimationFrame(step);
}

// Augment Window interface
declare global {
  interface Window {
    smoothScrollAnimationId?: number;
  }
}

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const [isScrolling, setIsScrolling] = useState(false);
  
  // Optimize the website for smooth scrolling
  useEffect(() => {
    // Force early layout calculations
    const sections = navLinks.map(link => document.querySelector(link.href));
    sections.forEach(section => {
      if (section) {
        (section as HTMLElement).getBoundingClientRect();
      }
    });

    // Default to auto scroll behavior (we'll handle smooth scrolling ourselves)
    document.documentElement.style.scrollBehavior = 'auto';
    
    return () => {
      // Reset scroll behavior
      document.documentElement.style.scrollBehavior = '';
      
      // Cancel any ongoing animations
      if (window.smoothScrollAnimationId) {
        window.cancelAnimationFrame(window.smoothScrollAnimationId);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Update navbar appearance based on scroll position
      setIsScrolled(window.scrollY > 50);
      
      // Don't update active section during programmatic scrolling
      if (isScrolling) return;
      
      // Update active section based on scroll position
      const sections = navLinks.map(link => document.querySelector(link.href));
      const scrollPosition = window.scrollY + 100;
      
      // Find the current section
      let currentSection = '';
      
      sections.forEach((section, index) => {
        if (section) {
          const offsetTop = (section as HTMLElement).offsetTop;
          const offsetHeight = (section as HTMLElement).offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentSection = navLinks[index].href.slice(1);
          }
        }
      });
      
      // If no section is detected, find the closest one
      if (!currentSection) {
        let closestSection = 'home';
        let minDistance = Infinity;
        
        sections.forEach((section, index) => {
          if (section) {
            const offsetTop = (section as HTMLElement).offsetTop;
            const distance = Math.abs(scrollPosition - offsetTop);
            if (distance < minDistance) {
              minDistance = distance;
              closestSection = navLinks[index].href.slice(1);
            }
          }
        });
        
        currentSection = closestSection;
      }
      
      // Only update if the section actually changed
      setActiveSection(prev => prev !== currentSection ? currentSection : prev);
    };

    // Run initially to set correct section
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolling]);

  // Close mobile menu when clicking outside or on link
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.querySelector('[data-nav="navigation"]');
      if (nav && !nav.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent scroll when menu is open
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Ultra-smooth scroll implementation for Vercel
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (!element) return;

    // Update the UI first for responsive feedback
    setActiveSection(href.slice(1));
    setIsScrolling(true);
    
    // Get the element position with offset for navbar
    const rect = element.getBoundingClientRect();
    const offsetTop = rect.top + window.pageYOffset;
    const navbarOffset = 80; // Adjust based on navbar height
    
    // Calculate duration based on distance (faster for shorter distances)
    const distance = Math.abs(window.pageYOffset - (offsetTop - navbarOffset));
    const minDuration = 400; // Minimum duration in ms
    const baseDuration = isMobile ? 600 : 800; // Base duration for each platform
    const duration = Math.min(minDuration + distance * 0.2, baseDuration);
    
    // Perform the smooth scroll with our custom implementation
    smoothScrollTo(offsetTop - navbarOffset, duration);
    
    // Reset scrolling state after animation completes
    setTimeout(() => {
      setIsScrolling(false);
    }, duration + 50);
    
    // Close mobile menu
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-2 sm:top-4 left-0 right-0 z-50 flex justify-center px-2 sm:px-4"
        data-nav="navigation"
      >
        <div className={`transition-all duration-500 nav-glass rounded-full px-3 sm:px-4 py-2 border border-white/10 w-full max-w-fit`}>
          <div className="flex items-center justify-between gap-2">
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="font-body text-xs sm:text-sm gradient-text cursor-pointer px-2 sm:px-3 py-1 whitespace-nowrap flex items-center gap-2"
            >
              {/* Active status indicator */}
              <div className="relative">
                <div className="w-2 h-2 bg-green-500 rounded-full shadow-sm shadow-green-500/50" />
                {/* Pulse effect */}
                <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-75" />
              </div>
              Portfolio
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {/* Separator */}
              <div className="w-px h-4 bg-border/50 mx-2"></div>

              {/* Navigation Links */}
              <div className="flex items-center gap-0.5">
                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.href.slice(1);
                  
                  return (
                    <motion.button
                      key={link.name}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => scrollToSection(link.href)}
                      className="relative px-3 py-1.5 text-xs font-body font-medium transition-all duration-300 rounded-full cursor-pointer group"
                      style={{ 
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        border: 'none'
                      }}
                    >
                      <span 
                        className={`relative z-10 transition-colors duration-300`}
                        style={{
                          color: isActive ? 'hsl(258 90% 66%)' : 'hsl(220 12% 68%)',
                          backgroundColor: 'transparent'
                        }}
                      >
                        {link.name}
                      </span>
                      
                      {/* Equal hover effect for ALL buttons */}
                      <div className="absolute inset-0 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 bg-white/5" />
                      
                      {/* Active indicator - ONLY for active button */}
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute inset-0 rounded-full border border-primary/40"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={toggleMobileMenu}
                className="p-2 rounded-full hover:bg-white/5 transition-colors"
                aria-label="Toggle mobile menu"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay - Bottom Sheet */}
      <AnimatePresence>
        {isMobileMenuOpen && isMobile && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background/60 backdrop-blur-md z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Bottom Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ 
                type: "spring", 
                damping: 30, 
                stiffness: 300,
                mass: 0.8
              }}
              className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
            >
              <div className="bg-card/95 backdrop-blur-xl rounded-t-3xl border-t border-white/10 shadow-2xl">
                {/* Pull Handle */}
                <div className="flex justify-center pt-3 pb-2">
                  <div className="w-12 h-1 bg-muted-foreground/30 rounded-full" />
                </div>

                {/* Header */}
                <div className="px-6 pb-4">
                  <h3 className="text-lg font-semibold text-center gradient-text">
                    Navigation
                  </h3>
                </div>

                {/* Navigation Links */}
                <div className="px-4 pb-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="space-y-2"
                  >
                    {navLinks.map((link, index) => {
                      const isActive = activeSection === link.href.slice(1);
                      
                      return (
                        <motion.button
                          key={link.name}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => scrollToSection(link.href)}
                          className={`relative w-full text-left px-6 py-4 rounded-2xl font-medium transition-all duration-300 min-h-[56px] flex items-center ${
                            isActive
                              ? 'bg-primary/10 border border-primary/20' 
                              : 'bg-muted/20 border border-transparent hover:bg-muted/30 active:bg-muted/40'
                          }`}
                        >
                          {/* Background gradient effect */}
                          <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                            isActive
                              ? 'bg-gradient-to-r from-primary/5 to-accent/5'
                              : 'bg-gradient-to-r from-primary/5 to-accent/5 opacity-0'
                          }`} />
                          
                          <div className="relative flex items-center gap-4 w-full">
                            {/* Status indicator */}
                            <div className={`w-3 h-3 rounded-full transition-all duration-300 flex-shrink-0 ${
                              isActive 
                                ? 'bg-primary shadow-md shadow-primary/50' 
                                : 'bg-muted-foreground/20'
                            }`} />
                            
                            {/* Link text */}
                            <span className={`text-base transition-colors duration-300 ${
                              isActive ? 'text-primary font-semibold' : 'text-foreground'
                            }`}>
                              {link.name}
                            </span>
                            
                            {/* Active indicator */}
                            {isActive && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="ml-auto w-2 h-2 bg-primary rounded-full"
                              />
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </motion.div>
                </div>

                {/* Footer with safe area */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  className="px-6 pb-8 pt-4 border-t border-white/5"
                >
                  <p className="text-sm text-muted-foreground text-center">
                    Swipe down or tap outside to close
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Tablet Menu (between mobile and desktop) */}
      {isMobile && !isMobileMenuOpen && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-40 md:hidden">
          <div className="flex items-center gap-1 glass-card rounded-full px-3 py-1 border border-white/10">
            {navLinks.map((link, index) => (
              <motion.button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                whileHover={{ scale: 1.4 }}
                whileTap={{ scale: 0.9 }}
                className={`relative w-2 h-2 rounded-full transition-all duration-300 group ${
                  activeSection === link.href.slice(1) 
                    ? 'bg-primary scale-125 shadow-md shadow-primary/50' 
                    : 'bg-muted-foreground/40 hover:bg-primary/60'
                }`}
                aria-label={`Navigate to ${link.name}`}
              >
                {/* Hover ring effect */}
                <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                  activeSection === link.href.slice(1)
                    ? 'ring-2 ring-primary/30'
                    : 'ring-0 group-hover:ring-2 group-hover:ring-primary/20'
                }`} />
                
                {/* Active pulse effect */}
                {activeSection === link.href.slice(1) && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/30"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};