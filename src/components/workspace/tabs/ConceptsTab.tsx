'use client';

import React, { useState } from 'react';
import { useRevisionStore } from '@/store/useRevisionStore';
import { KeyConcept } from '@/types/revision';
import {
  BrainCircuit,
  Search,
  Network,
  LayoutGrid,
  Sparkles,
  Tag,
  ArrowUpRight,
  Info,
} from 'lucide-react';
import GlareHover from '@/components/GlareHover';

export function ConceptsTab() {
  const { activePack } = useRevisionStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImportance, setSelectedImportance] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedConceptId, setSelectedConceptId] = useState<string | null>(null);

  if (!activePack) return null;

  const filteredConcepts = activePack.keyConcepts.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesImportance =
      selectedImportance === 'all' || c.importance === selectedImportance;
    return matchesSearch && matchesImportance;
  });

  const getImportanceBadge = (importance: KeyConcept['importance']) => {
    switch (importance) {
      case 'critical':
        return (
          <span className="rounded-full bg-rose-500/15 border border-rose-500/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-300">
            Critical
          </span>
        );
      case 'high':
        return (
          <span className="rounded-full bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-300">
            High Yield
          </span>
        );
      default:
        return (
          <span className="rounded-full bg-blue-500/15 border border-blue-500/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-300">
            Medium
          </span>
        );
    }
  };

  const selectedConcept = activePack.keyConcepts.find((c) => c.id === selectedConceptId);

  return (
    <div className="space-y-6 pb-16">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white">Key Concepts & Mental Models</h2>
          <p className="text-xs text-slate-400">
            {activePack.keyConcepts.length} core concepts distilled into modular study cards
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] p-1 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`btn-spring btn-spring-glass flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>Cards</span>
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`btn-spring btn-spring-glass flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition cursor-pointer ${
              viewMode === 'map'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Network className="h-3.5 w-3.5" />
            <span>Concept Map</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search concepts or definitions..."
            className="w-full rounded-full border border-white/10 bg-white/[0.03] pl-9 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/20"
          />
        </div>

        {/* Importance Filter */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          {['all', 'critical', 'high', 'medium'].map((imp) => (
            <button
              key={imp}
              onClick={() => setSelectedImportance(imp)}
              className={`btn-spring btn-spring-glass rounded-full px-3.5 py-1.5 text-xs font-medium capitalize transition border cursor-pointer ${
                selectedImportance === imp
                  ? 'border-indigo-500/50 bg-indigo-500/15 text-indigo-300'
                  : 'border-white/[0.06] bg-white/[0.02] text-slate-400 hover:text-white'
              }`}
            >
              {imp}
            </button>
          ))}
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredConcepts.map((concept) => (
            <GlareHover
              key={concept.id}
              width="100%"
              height="100%"
              background="transparent"
              borderColor="transparent"
              borderRadius="1rem"
              glareColor="#818cf8"
              glareOpacity={0.2}
              glareAngle={-45}
              glareSize={250}
              transitionDuration={650}
            >
              <div
                onClick={() => setSelectedConceptId(concept.id)}
                className={`glass-panel w-full h-full rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                  selectedConceptId === concept.id
                    ? 'border-indigo-500 ring-2 ring-indigo-500/20 bg-[#161a27]'
                    : 'border-white/[0.08] hover:border-indigo-500/30 hover:translate-y-[-2px]'
                }`}
              >
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2">
                    <span className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[11px] font-medium text-slate-400 border border-white/[0.06]">
                      {concept.category}
                    </span>
                    {getImportanceBadge(concept.importance)}
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight">
                    {concept.name}
                  </h3>

                  {/* Definition */}
                  <p className="text-xs sm:text-sm text-indigo-200/90 font-medium leading-relaxed bg-indigo-500/[0.06] p-2.5 rounded-xl border border-indigo-500/15">
                    {concept.definition}
                  </p>

                  {/* Explanation */}
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {concept.explanation}
                  </p>
                </div>

                {/* Related Concepts */}
                {concept.relatedConcepts && concept.relatedConcepts.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-white/[0.06]">
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-1.5">
                      <Tag className="h-3 w-3 text-slate-500" />
                      <span>Connects with:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {concept.relatedConcepts.map((rel, rIdx) => (
                        <span
                          key={rIdx}
                          className="rounded-md bg-white/[0.03] border border-white/[0.06] px-1.5 py-0.5 text-[10px] text-slate-300"
                        >
                          {rel}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </GlareHover>
          ))}
        </div>
      )}

      {/* Interactive Concept Map View */}
      {viewMode === 'map' && (
        <div className="glass-panel rounded-2xl p-6 border border-white/[0.08] space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Network className="h-5 w-5 text-indigo-400" />
              <h3 className="text-sm font-semibold text-white">Interactive Concept Relationship Network</h3>
            </div>
            <span className="text-xs text-slate-400">Click any concept node to inspect its relations</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Visual Node Cloud / Relationship Matrix */}
            <div className="lg:col-span-2 rounded-2xl bg-black/40 border border-white/[0.06] p-6 min-h-[380px] flex flex-col justify-center relative overflow-hidden">
              {/* Subtle background grid pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(#262c40_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

              <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 p-4">
                {activePack.keyConcepts.map((concept) => {
                  const isSelected = selectedConceptId === concept.id;
                  const isRelated =
                    selectedConcept?.relatedConcepts?.some((rc) =>
                      concept.name.toLowerCase().includes(rc.toLowerCase())
                    ) || false;

                  return (
                    <button
                      key={concept.id}
                      onClick={() => setSelectedConceptId(concept.id)}
                      className={`group relative rounded-2xl p-4 transition-all duration-300 text-left ${
                        isSelected
                          ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-500/30 scale-105 ring-2 ring-white/30'
                          : isRelated
                          ? 'bg-indigo-500/20 text-indigo-200 border border-indigo-400/50 shadow-md'
                          : 'bg-[#151926] text-slate-300 border border-white/10 hover:border-indigo-500/40 hover:bg-[#1a2030]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider opacity-75">
                          {concept.category}
                        </span>
                        {getImportanceBadge(concept.importance)}
                      </div>
                      <p className="font-bold text-sm tracking-tight">{concept.name}</p>
                      <p className="text-[11px] opacity-80 mt-1 line-clamp-1 max-w-[200px]">
                        {concept.definition}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Concept Detail Inspector */}
            <GlareHover
              width="100%"
              height="auto"
              background="transparent"
              borderColor="transparent"
              borderRadius="1rem"
              glareColor="#818cf8"
              glareOpacity={0.2}
              glareAngle={-45}
              glareSize={250}
            >
              <div className="rounded-2xl border border-white/[0.08] bg-[#141824] p-5 space-y-4">
                {selectedConcept ? (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="rounded-md bg-indigo-500/15 border border-indigo-500/30 px-2.5 py-0.5 text-xs font-semibold text-indigo-300">
                        {selectedConcept.category}
                      </span>
                      {getImportanceBadge(selectedConcept.importance)}
                    </div>

                    <h4 className="text-lg font-bold text-white">{selectedConcept.name}</h4>

                    <div>
                      <h5 className="text-[11px] uppercase font-semibold text-slate-400 mb-1">
                        Definition
                      </h5>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.04]">
                        {selectedConcept.definition}
                      </p>
                    </div>

                    <div>
                      <h5 className="text-[11px] uppercase font-semibold text-slate-400 mb-1">
                        Theoretical Mechanics
                      </h5>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {selectedConcept.explanation}
                      </p>
                    </div>

                    {selectedConcept.relatedConcepts && (
                      <div>
                        <h5 className="text-[11px] uppercase font-semibold text-slate-400 mb-1.5">
                          Connected Topics
                        </h5>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedConcept.relatedConcepts.map((r, i) => (
                            <span
                              key={i}
                              className="rounded-md bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 text-xs text-indigo-300 font-medium"
                            >
                              {r}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center h-full py-12 text-slate-500">
                    <Info className="h-8 w-8 mb-2 opacity-50" />
                    <p className="text-sm font-medium">Select a concept from the network to view complete study breakdown</p>
                  </div>
                )}
              </div>
            </GlareHover>
          </div>
        </div>
      )}
    </div>
  );
}
