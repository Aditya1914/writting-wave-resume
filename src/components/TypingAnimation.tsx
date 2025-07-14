import { useState, useEffect } from 'react';

interface TypingAnimationProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  onComplete?: () => void;
}

export const TypingAnimation = ({ 
  text, 
  className = "", 
  delay = 0, 
  speed = 100,
  onComplete 
}: TypingAnimationProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Reset component when text changes
  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
    setStarted(false);
    setIsComplete(false);
  }, [text]);

  useEffect(() => {
    if (delay === 0) {
      setStarted(true);
      return;
    }

    const startTimer = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay, text]);

  useEffect(() => {
    if (!started || !text) return;

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (currentIndex === text.length && !isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, started, speed, isComplete, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {started && !isComplete && (
        <span className="animate-pulse text-primary ml-1">|</span>
      )}
    </span>
  );
};