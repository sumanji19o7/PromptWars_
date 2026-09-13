'use client';

import React from 'react';
import Cubes from './Cubes';

/**
 * Persistent left + right side-rail Cubes decoration.
 * Fixed to viewport edges so they stay visible while scrolling.
 * Uses a narrow column of cubes on each side with the cyberpunk color palette.
 */
export function CubesSideRails() {
  return (
    <>
      {/* Left Rail */}
      <div
        className="fixed top-0 left-0 h-screen pointer-events-auto z-[1] hidden lg:block"
        style={{ width: '36px' }}
      >
        <div style={{ height: '100%', position: 'relative' }}>
          <Cubes
            gridSize={4}
            maxAngle={55}
            radius={2}
            borderStyle="1px solid rgba(0, 242, 254, 0.15)"
            faceColor="rgba(10, 11, 16, 0.85)"
            rippleColor="#00f2fe"
            rippleSpeed={1.8}
            autoAnimate={true}
            rippleOnClick={true}
            cellGap={{ row: 0, col: 0 }}
          />
        </div>
      </div>

      {/* Right Rail */}
      <div
        className="fixed top-0 right-0 h-screen pointer-events-auto z-[1] hidden lg:block"
        style={{ width: '36px' }}
      >
        <div style={{ height: '100%', position: 'relative' }}>
          <Cubes
            gridSize={4}
            maxAngle={55}
            radius={2}
            borderStyle="1px solid rgba(226, 4, 118, 0.15)"
            faceColor="rgba(10, 11, 16, 0.85)"
            rippleColor="#e20476"
            rippleSpeed={1.8}
            autoAnimate={true}
            rippleOnClick={true}
            cellGap={{ row: 0, col: 0 }}
          />
        </div>
      </div>
    </>
  );
}

export default CubesSideRails;
