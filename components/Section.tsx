// components/AnimateOnScroll.js

"use client";
import { useState, useEffect, useRef } from 'react';

interface AnimateOnScrollProps {
  delay?: number;
  threshold?: number;
}
const TRANSITION_CLASSES = 'transition-all duration-700 ease-out';

export default function AnimateOnScroll({ 
  children,
  delay = 0, 
  threshold = 0.1 
}: React.PropsWithChildren<AnimateOnScrollProps>) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay); 
        } 
      },
      { threshold: threshold } 
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [delay, threshold]);

  const animationClasses = isVisible
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-16';

  return (
    <div 
      ref={ref} 
      className={`${TRANSITION_CLASSES} ${animationClasses}`}
    >
      {children}
    </div>
  );
}