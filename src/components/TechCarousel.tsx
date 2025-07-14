import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface TechCarouselProps {
  technologies: string[];
  speed?: number;
  className?: string;
}

export const TechCarousel = ({ technologies, speed = 3000, className = "" }: TechCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isHovered || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % technologies.length);
    }, speed);

    return () => clearInterval(interval);
  }, [technologies.length, speed, isHovered, isPaused]);

  const handleTouchStart = () => {
    setIsPaused(true);
  };

  const handleTouchEnd = () => {
    setTimeout(() => setIsPaused(false), 2000); // Resume after 2 seconds
  };

  const itemsToShow = isMobile ? 3 : 4;

  return (
    <div 
      className={`relative h-8 sm:h-10 overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentIndex}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ 
            type: "tween",
            duration: 0.5,
            ease: "easeInOut"
          }}
          className="absolute inset-0 flex flex-wrap gap-1.5 sm:gap-2 items-center"
        >
          {/* Show 3 items on mobile, 4 on desktop */}
          {Array.from({ length: itemsToShow }).map((_, i) => {
            const techIndex = (currentIndex + i) % technologies.length;
            return (
              <span
                key={`${techIndex}-${i}`}
                className="tech-badge-small neuro-inset px-2 py-1 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap"
              >
                {technologies[techIndex]}
              </span>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};