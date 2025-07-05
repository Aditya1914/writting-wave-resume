import { useState, useEffect } from 'react';
import { TypingAnimation } from './TypingAnimation';

interface CyclingTextProps {
  texts: string[];
  className?: string;
  delay?: number;
  typingSpeed?: number;
  pauseDuration?: number;
}

export const CyclingText = ({ 
  texts, 
  className = "", 
  delay = 0, 
  typingSpeed = 50,
  pauseDuration = 2000 
}: CyclingTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [key, setKey] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
      setKey(prev => prev + 1);
    }, pauseDuration + (texts[currentIndex]?.length || 0) * typingSpeed + 1000);

    return () => clearInterval(interval);
  }, [started, texts, currentIndex, typingSpeed, pauseDuration]);

  if (!started) return null;

  return (
    <TypingAnimation
      text={texts[currentIndex]}
      className={className}
      delay={0}
      speed={typingSpeed}
    />
  );
};