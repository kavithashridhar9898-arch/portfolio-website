"use client";
import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { cn } from '@/utils/cn';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = document.getElementById('custom-cursor');
    const follower = document.getElementById('custom-cursor-follower');
    
    if (!cursor || !follower) return;

    // Follower animations with GSAP lag
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
      });

      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: 'power3.out',
      });
    };

    // Hover detection
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('magnetic-btn')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <div 
        id="custom-cursor" 
        className={cn(
          "fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-transform duration-200",
          isHovering ? "scale-0" : "scale-100"
        )}
      />
      <div 
        id="custom-cursor-follower" 
        className={cn(
          "fixed top-0 left-0 w-8 h-8 border border-primary/50 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
          isHovering ? "w-16 h-16 bg-primary/10 backdrop-blur-sm border-primary/30" : "bg-transparent"
        )}
      />
    </>
  );
}
