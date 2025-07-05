import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TechCarouselProps {
  technologies: string[];
  speed?: number;
  className?: string;
}

export const TechCarousel = ({ technologies, speed = 3000, className = "" }: TechCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % technologies.length);
    }, speed);

    return () => clearInterval(interval);
  }, [technologies.length, speed, isHovered]);

  return (
    <div 
      className={`relative h-8 overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
          className="absolute inset-0 flex flex-wrap gap-2 items-center"
        >
          {/* Show 3-4 items at once */}
          {Array.from({ length: 4 }).map((_, i) => {
            const techIndex = (currentIndex + i) % technologies.length;
            return (
              <span
                key={`${techIndex}-${i}`}
                className="tech-badge-small neuro-inset px-2 py-1 text-xs font-medium rounded-lg whitespace-nowrap"
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