'use client';

import React, { useState } from 'react';
import { Network, Sparkles, BookOpen, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import GlareHover from '@/components/GlareHover';

interface KeyConceptsShowcaseProps {
  onRunDemo?: () => void;
  onScrollToUpload?: () => void;
}

const SAMPLE_CONCEPTS = [
  {
    id: 'c1',
    name: 'Action Potential Propagation',
    category: 'Biophysics / Neurobiology',
    importance: 'CRITICAL CORE',
    importanceColor: 'text-[#00f2fe] border-cyan-500/40 bg-cyan-950/60',
    definition:
      'All-or-none electrical impulse generated when axon hillock depolarizes past -55mV threshold, opening voltage-gated Na+ channels.',
    governingEquation: 'V(t) = V_rest + (V_peak - V_rest) * (1 - e^(-t/RC))',
    related: ['Refractory Period', 'Myelination / Saltatory', 'Nodes of Ranvier'],
  },
  {
    id: 'c2',
    name: 'Synaptic Vesicle Exocytosis',
    category: 'Molecular Mechanism',
    importance: 'HIGH YIELD',
    importanceColor: 'text-pink-400 border-pink-500/40 bg-pink-950/60',
    definition:
      'SNARE-complex-mediated fusion of neurotransmitter vesicles with presynaptic membrane upon Ca2+ influx via P/Q and N-type channels.',
    governingEquation: 'Rate = k[Ca2+]^4 (Cooperativity)',
    related: ['SNARE Complex', 'Synaptotagmin', 'Clathrin Endocytosis'],
  },
  {
    id: 'c3',
    name: 'Spatial vs. Temporal Summation',
    category: 'Computational Neuroscience',
    importance: 'EXAM ESSENTIAL',
    importanceColor: 'text-amber-400 border-amber-500/40 bg-amber-950/60',
    definition:
      'Integration of EPSPs and IPSPs across dendritic arbor (spatial) or high-frequency pulses at a single synapse (temporal).',
    governingEquation: 'ΔV_net = Σ(EPSP_i) - Σ(IPSP_j) ≥ Threshold',
    related: ['Dendritic Attenuation', 'Length Constant λ', 'Time Constant τ'],
  },
];

export function KeyConceptsShowcase({ onRunDemo, onScrollToUpload }: KeyConceptsShowcaseProps) {
  const [activeConceptId, setActiveConceptId] = useState('c1');
  const activeConcept = SAMPLE_CONCEPTS.find((c) => c.id === activeConceptId) || SAMPLE_CONCEPTS[0];

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#3a494b]/30">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-mono text-[11px] font-bold">
            <Network className="h-3.5 w-3.5 text-cyan-400" />
            <span>CHAPTER 04 // COGNITIVE RECOVERY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-mono">
            Modular Concepts &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] via-teal-300 to-indigo-300">
              Semantic Node Maps
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-[#b9cacb] max-w-2xl leading-relaxed">
            Never memorize raw text. StudyFlow parses complex lecture syllabi into structured mental models,
            connecting governing equations with foundational definitions.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono shrink-0">
          <button
            onClick={onRunDemo}
            className="btn-spring btn-spring-cyan inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-cyan-400/40 bg-[#121520] text-cyan-300 text-xs font-bold transition shadow-sm cursor-pointer"
          >
            <Zap className="h-3.5 w-3.5 fill-current" />
            <span>Interactive Demo</span>
          </button>
        </div>
      </div>

      {/* Concept Cards Grid & Detailed Node Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Concept Selector Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {SAMPLE_CONCEPTS.map((concept) => {
            const isActive = activeConceptId === concept.id;

            return (
              <GlareHover
                key={concept.id}
                width="100%"
                height="auto"
                background="transparent"
                borderColor="transparent"
                borderRadius="1rem"
                glareColor="#00f2fe"
                glareOpacity={0.25}
                glareAngle={-35}
                glareSize={200}
                transitionDuration={600}
              >
                <button
                  type="button"
                  onClick={() => setActiveConceptId(concept.id)}
                  className={`btn-spring btn-card w-full text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer backdrop-blur-md ${
                    isActive
                      ? 'border-cyan-400/70 bg-cyan-950/40 shadow-[0_0_20px_rgba(0,242,254,0.25)] text-white ring-1 ring-cyan-400/50'
                      : 'border-white/[0.08] bg-[#121520]/60 text-slate-400 hover:border-cyan-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      {concept.category}
                    </span>
                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 rounded-full border font-bold ${concept.importanceColor}`}
                    >
                      {concept.importance}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">{concept.name}</h3>
                  <p className="text-xs text-[#b9cacb] line-clamp-2 leading-relaxed">
                    {concept.definition}
                  </p>
                </button>
              </GlareHover>
            );
          })}
        </div>

        {/* Right Column: Deep Node Inspector Deck (7 cols) */}
        <div className="lg:col-span-7">
          <GlareHover
            width="100%"
            height="100%"
            background="transparent"
            borderColor="transparent"
            borderRadius="1.25rem"
            glareColor="#00f2fe"
            glareOpacity={0.2}
            glareAngle={-45}
            glareSize={320}
            transitionDuration={700}
          >
            <div className="w-full h-full bg-[#121520]/50 backdrop-blur-xl rounded-2xl p-6 sm:p-7 border border-cyan-500/30 shadow-[0_0_25px_rgba(0,0,0,0.5)] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#3a494b]/30 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00f2fe] shadow-[0_0_8px_#00f2fe] animate-pulse" />
                    <span className="font-mono text-xs text-cyan-300 font-bold uppercase tracking-wider">
                      SEMANTIC NODE // {activeConcept.id.toUpperCase()}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-[#b9cacb]">
                    CONFIDENCE SCORE: <b className="text-[#00f2fe]">99.8%</b>
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-mono mb-2">
                    {activeConcept.name}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    {activeConcept.definition}
                  </p>
                </div>

                {/* Formula Callout */}
                <div className="p-4 rounded-xl bg-[#090a0f] border border-cyan-400/40 space-y-1.5 shadow-inner font-mono">
                  <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe]" />
                    GOVERNING QUANTITATIVE EXPRESSION
                  </div>
                  <div className="text-xs sm:text-sm text-cyan-200 font-bold bg-cyan-950/30 p-2.5 rounded-lg border border-cyan-500/20 overflow-x-auto">
                    {activeConcept.governingEquation}
                  </div>
                </div>

                {/* Related Nodes Matrix */}
                <div className="space-y-1.5 font-mono">
                  <span className="text-[11px] text-[#b9cacb] uppercase tracking-wider font-semibold">
                    CONNECTED NEURAL NODES:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeConcept.related.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200 font-medium"
                      >
                        ⚡ {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Exploration Cue */}
              <div className="pt-4 border-t border-[#3a494b]/30 flex items-center justify-between font-mono text-xs text-[#b9cacb]">
                <span className="flex items-center gap-1.5 text-cyan-300/90">
                  <ShieldCheck className="h-4 w-4 text-cyan-400" />
                  Deterministic extraction from authoritative syllabus
                </span>
                <button
                  type="button"
                  onClick={onScrollToUpload}
                  className="btn-spring btn-spring-cyan inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-cyan-300 hover:text-black font-bold transition cursor-pointer"
                >
                  <span>Extract Mine</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </GlareHover>
        </div>
      </div>
    </div>
  );
}
