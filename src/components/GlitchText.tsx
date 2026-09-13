'use client';

import React from 'react';
import './GlitchText.css';

interface GlitchTextProps {
  children: string;
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
  className?: string;
}

export function GlitchText({
  children,
  speed = 0.5,
  enableShadows = true,
  enableOnHover = false,
  className = '',
}: GlitchTextProps) {
  const inlineStyles: React.CSSProperties & Record<string, string> = {
    '--after-duration': `${speed * 3}s`,
    '--before-duration': `${speed * 2}s`,
    '--after-shadow': enableShadows ? '-3px 0 #e20476' : 'none',
    '--before-shadow': enableShadows ? '3px 0 #00f2fe' : 'none',
  };

  const hoverClass = enableOnHover ? 'enable-on-hover' : '';

  return (
    <span
      className={`glitch ${hoverClass} ${className}`}
      style={inlineStyles}
      data-text={children}
    >
      {children}
    </span>
  );
}

export default GlitchText;
