import { useEffect, RefObject } from 'react';

export function useParallax(ref: RefObject<HTMLElement | null>, speed: number = 0.1) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frameId: number;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Optimization: Only animate if the element is actually on screen (or close to it)
      if (rect.top < windowHeight && rect.bottom > 0) {
        
        // Calculate the center of the viewport
        const centerY = windowHeight / 2;
        // Calculate the center of the element
        const elementCenterY = rect.top + rect.height / 2;
        
        // Calculate the shift. 
        // (Viewport Center - Element Center) * Speed Factor
        // If speed is 0.1, it moves 10% of the distance.
        const shift = (centerY - elementCenterY) * speed;

        // Apply transform directly to the DOM element
        element.style.transform = `translate3d(0, ${shift}px, 0)`;
      }
    };

    const loop = () => {
      handleScroll();
      frameId = requestAnimationFrame(loop);
    };

    // Start the loop
    loop();

    return () => cancelAnimationFrame(frameId);
  }, [ref, speed]);
}