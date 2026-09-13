import React, { useState, useEffect } from 'react';
import { Timer, Zap, Sparkles, Terminal, Move3d } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { SplineScene } from './SplineScene';
import { GlitchText } from '@/components/GlitchText';

interface CyberpunkHeroProps {
  onStartNow: () => void;
  isUnlocked: boolean;
}

export function CyberpunkHero({ onStartNow, isUnlocked }: CyberpunkHeroProps) {
  const [timerSeconds, setTimerSeconds] = useState(2535); // 42 min 15 sec
  const shouldReduceMotion = useReducedMotion();

  // Scroll tracking to decouple text fade-out from 3D model duration (50% tighter)
  const { scrollY } = useScroll();
  const rawTextOpacity = useTransform(scrollY, [0, 150], [1, 0]);
  const rawTextY = useTransform(scrollY, [0, 150], [0, shouldReduceMotion ? 0 : -22]);
  const rawSplineOpacity = useTransform(scrollY, [0, 140, 340], [1, 1, 0.15]);
  const rawSplineY = useTransform(scrollY, [0, 340], [0, shouldReduceMotion ? 0 : -15]);

  const springCfg = { stiffness: 90, damping: 25, restDelta: 0.001 };
  const springTextOpacity = useSpring(rawTextOpacity, springCfg);
  const springTextY = useSpring(rawTextY, springCfg);
  const springSplineOpacity = useSpring(rawSplineOpacity, springCfg);
  const springSplineY = useSpring(rawSplineY, springCfg);

  const textOpacity = shouldReduceMotion ? 1 : springTextOpacity;
  const textY = shouldReduceMotion ? 0 : springTextY;
  const splineOpacity = shouldReduceMotion ? 1 : springSplineOpacity;
  const splineY = shouldReduceMotion ? 0 : springSplineY;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 2535));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* Top Editorial Cyber Header & HUD Metadata - Fades earlier on scroll */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[#3a494b]/30"
      >
        <div className="max-w-2xl space-y-3">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#e20476]/20 border border-[#e20476]/50 text-pink-300 font-mono text-[10px] tracking-widest font-bold uppercase inline-flex items-center">
              <GlitchText speed={0.4} enableShadows={true} className="text-[10px] tracking-widest text-pink-300 font-bold">
                NEURAL ENGINE // ONLINE
              </GlitchText>
            </span>
            <span className="text-[#3a494b] font-mono text-[14px] leading-none">//</span>
            <span className="font-mono text-[11px] text-[#00f2fe] flex items-center gap-1.5 tracking-wider font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#00f2fe] shadow-[0_0_8px_#00f2fe] animate-pulse" />
              QUANTUM SYNAPSE PIPELINE READY
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[46px] leading-tight text-white font-bold tracking-tight font-mono">
            Turn dense lecture slides into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] via-teal-300 to-[#e20476] glow-text-cyan">
              neural recall mastery.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#b9cacb] leading-relaxed">
            Upload syllabus or slide manifests. Lectura extracts semantic hierarchies, synthesizes
            high-yield node summaries, and builds active recall drills in real time.
          </p>
        </div>

        {/* HUD Focus Protocol Box */}
        <div className="flex md:flex-col items-end justify-between md:justify-end gap-2 shrink-0">
          <div className="font-mono text-[11px] text-[#00f2fe]/80 uppercase tracking-widest text-right font-semibold">
            HUD FOCUS PROTOCOL
          </div>
          <div className="flex items-center gap-2.5 bg-[#121520]/60 backdrop-blur-md border border-cyan-500/30 px-4 py-2 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.5)]">
            <Timer className="h-5 w-5 text-[#00f2fe] animate-pulse" />
            <span className="font-mono text-[15px] font-bold text-white tracking-widest">
              {formatTimer(timerSeconds)}
            </span>
            <span className="font-mono text-[10px] text-pink-300 px-1.5 py-0.5 rounded bg-[#e20476]/20 border border-pink-500/30 font-bold">
              POMODORO_02
            </span>
          </div>
        </div>
      </motion.div>

      {/* Interactive Spline 3D Neural Spatial Deck - Stays visible longer than text */}
      <motion.div
        style={{ opacity: splineOpacity, y: splineY }}
        className="w-full bg-[#121520]/45 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-cyan-500/30 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden"
      >
        {/* Cyber Corner Notches */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00f2fe] pointer-events-none" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#e20476] pointer-events-none" />
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#3a494b]/30">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-[#00f2fe]" />
            <span className="font-mono text-xs text-cyan-300 font-bold">
              NEURAL SPATIAL MATRIX // INTERACTIVE CORE
            </span>
          </div>
          <span className="font-mono text-[11px] text-cyan-400/90">
            {isUnlocked ? '🎮 Play & rotate 3D scene freely • Scroll down when ready' : 'Click 3D Asset or Button to Activate'}
          </span>
        </div>

        <div className="w-full h-[360px] sm:h-[440px] relative rounded-lg overflow-hidden bg-[#090a0f]/50 backdrop-blur-xs border border-cyan-500/20">
          <SplineScene onStartNow={onStartNow} />

          {/* Glowing Start Now CTA on top of 3D Asset */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
            <button
              onClick={onStartNow}
              className={`btn-spring flex items-center gap-2 rounded-full px-7 py-3 font-mono text-xs font-bold transition shadow-2xl cursor-pointer ${
                isUnlocked
                  ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.6)] border border-emerald-300'
                  : 'btn-spring-cyan bg-[#121520] text-[#00f2fe] shadow-[0_0_25px_rgba(0,242,254,0.7)] border border-cyan-300 animate-pulse'
              }`}
            >
              <Zap className="h-4 w-4 fill-current" />
              <span>{isUnlocked ? '✓ 3D MATRIX ACTIVE' : '⚡ START NOW [INITIALIZE]'}</span>
            </button>

            {isUnlocked && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/85 border border-cyan-400/60 text-cyan-300 font-mono text-[11px] shadow-[0_0_15px_rgba(0,242,254,0.4)] backdrop-blur-md animate-bounce">
                <span>↓ Scroll down to view features & synthesis</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
