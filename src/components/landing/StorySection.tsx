'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

interface StorySectionProps {
  id?: string;
  children: React.ReactNode;
  chapterNumber?: string;
  chapterTitle?: string;
  isFirst?: boolean;
  isLast?: boolean;
  className?: string;
  containerClassName?: string;
}

export function StorySection({
  id,
  children,
  chapterNumber,
  chapterTitle,
  isFirst = false,
  isLast = false,
  className = '',
  containerClassName = '',
}: StorySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track scroll progress through this section's container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: isFirst ? ['start start', 'end start'] : ['start end', 'end start'],
  });

  // Distance multipliers for mobile / reduced motion (tightened for 50% less gap)
  const yDist = shouldReduceMotion ? 0 : isMobile ? 18 : 32;
  const scaleReduction = shouldReduceMotion ? 1 : isMobile ? 0.99 : 0.98;

  // Raw transforms with crisper, 50% shorter travel handoffs
  const rawOpacity = useTransform(
    scrollYProgress,
    isFirst
      ? [0, 0.5, 0.88, 1]
      : isLast
      ? [0, 0.22, 1, 1]
      : [0, 0.2, 0.8, 1],
    isFirst
      ? [1, 1, 0, 0]
      : isLast
      ? [0, 1, 1, 1]
      : [0, 1, 1, 0]
  );

  const rawY = useTransform(
    scrollYProgress,
    isFirst
      ? [0, 0.5, 0.9, 1]
      : isLast
      ? [0, 0.22, 1, 1]
      : [0, 0.2, 0.8, 1],
    isFirst
      ? [0, 0, -yDist, -yDist]
      : isLast
      ? [yDist, 0, 0, 0]
      : [yDist, 0, 0, -yDist]
  );

  const rawScale = useTransform(
    scrollYProgress,
    isFirst
      ? [0, 0.5, 0.9, 1]
      : isLast
      ? [0, 0.22, 1, 1]
      : [0, 0.2, 0.8, 1],
    isFirst
      ? [1, 1, scaleReduction, scaleReduction]
      : isLast
      ? [scaleReduction, 1, 1, 1]
      : [scaleReduction, 1, 1, scaleReduction]
  );

  // Smooth buttery spring physics
  const springConfig = { stiffness: 110, damping: 24, restDelta: 0.001 };
  const opacity = useSpring(rawOpacity, springConfig);
  const y = useSpring(rawY, springConfig);
  const scale = useSpring(rawScale, springConfig);

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative w-full ${
        isFirst
          ? 'min-h-[108vh] sm:min-h-[116vh]'
          : isLast
          ? 'min-h-[75vh] sm:min-h-[85vh]'
          : 'min-h-[116vh] sm:min-h-[126vh]'
      } ${containerClassName}`}
    >
      {/* Sticky presentation viewport: 50% tighter vertical padding to eliminate large gaps */}
      <div className="sticky top-16 md:top-20 z-10 w-full min-h-[calc(100vh-6rem)] flex flex-col justify-center items-center py-3 sm:py-5 px-2 sm:px-4 pointer-events-auto">
        <motion.div
          style={{
            opacity,
            y,
            scale,
          }}
          className={`w-full max-w-7xl mx-auto ${className}`}
        >
          {/* Subtle Chapter Marker */}
          {chapterNumber && (
            <div className="flex items-center gap-2 mb-4 select-none pointer-events-none">
              <span className="font-mono text-[10px] tracking-widest uppercase text-cyan-400/70 px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30">
                {chapterNumber}
              </span>
              {chapterTitle && (
                <span className="font-mono text-[11px] text-[#b9cacb] uppercase tracking-wider hidden sm:inline">
                  // {chapterTitle}
                </span>
              )}
            </div>
          )}

          {children}
        </motion.div>
      </div>
    </div>
  );
}
