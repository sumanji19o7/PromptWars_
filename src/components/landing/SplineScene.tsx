'use client';

import React, { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import { Loader2, Move3d, Zap } from 'lucide-react';

const SCENE_URL = 'https://prod.spline.design/eJvZzGgMtwykUbxg/scene.splinecode';

interface SplineSceneProps {
  className?: string;
  onLoaded?: () => void;
  onStartNow?: () => void;
}

export function SplineScene({ className = '', onLoaded, onStartNow }: SplineSceneProps) {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [sceneLoaded, setSceneLoaded] = useState(false);
  const viewerRef = useRef<any>(null);

  useEffect(() => {
    // Fallback timer: if scene hasn't fired 'load' event within 4.5s, clear loading overlay
    const timer = setTimeout(() => {
      setSceneLoaded(true);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const viewerEl = viewerRef.current;
    if (!viewerEl) return;

    // Listen to mouse clicks on the Spline viewer
    const handleMouseDown = (e: any) => {
      // If user clicked any element or button in the scene
      if (onStartNow) {
        onStartNow();
      }
    };

    viewerEl.addEventListener('mouseDown', handleMouseDown);
    viewerEl.addEventListener('click', handleMouseDown);

    return () => {
      viewerEl.removeEventListener('mouseDown', handleMouseDown);
      viewerEl.removeEventListener('click', handleMouseDown);
    };
  }, [onStartNow]);

  const handleViewerLoaded = () => {
    setSceneLoaded(true);
    if (onLoaded) onLoaded();
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Load Spline Viewer Web Component script */}
      <Script
        src="https://unpkg.com/@splinetool/viewer@1.9.72/build/spline-viewer.js"
        type="module"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />

      {/* Loading Skeleton */}
      {!sceneLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#090a0f]/80 backdrop-blur-sm transition-opacity duration-500">
          <div className="flex items-center gap-2.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-xs font-semibold text-indigo-300 shadow-xl">
            <Loader2 className="h-4 w-4 animate-spin text-indigo-400" />
            <span>Loading 3D Spatial Canvas...</span>
          </div>
        </div>
      )}

      {/* 3D Interaction Pill */}
      <div className="absolute top-4 right-4 z-20 pointer-events-none opacity-85 hover:opacity-100 transition hidden sm:flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[11px] font-medium text-slate-300 backdrop-blur-md shadow-lg">
        <Move3d className="h-3.5 w-3.5 text-indigo-400" />
        <span>Interactive 3D • Click Asset to Start</span>
      </div>

      {/* Spline Viewer Custom Element */}
      <div className="w-full h-full cursor-pointer">
        {/* @ts-expect-error Custom web component */}
        <spline-viewer
          ref={viewerRef}
          url={SCENE_URL}
          events-target="global"
          background="transparent"
          onLoad={handleViewerLoaded}
          style={{ width: '100%', height: '100%', display: 'block' }}
        />
      </div>
    </div>
  );
}
