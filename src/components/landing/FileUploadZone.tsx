'use client';

import React, { useState, useRef } from 'react';
import { useRevisionStore } from '@/store/useRevisionStore';
import { formatFileSize } from '@/lib/utils';
import {
  UploadCloud,
  FileText,
  FileCheck,
  X,
  Zap,
  AlertCircle,
  FileSpreadsheet,
  Cpu,
} from 'lucide-react';

interface FileUploadZoneProps {
  onStartProcessing: (file: File) => void;
  onRunDemo: () => void;
}

const SUPPORTED_EXTENSIONS = ['.pdf', '.docx', '.pptx'];

export function FileUploadZone({ onStartProcessing, onRunDemo }: FileUploadZoneProps) {
  const { preferences, setPreferences, setUploadedFile } = useRevisionStore();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [distillationMode, setDistillationMode] = useState<'comp' | 'cram' | 'flashcards'>('comp');
  const inputRef = useRef<HTMLInputElement>(null);

  const validateAndSetFile = (file: File) => {
    setValidationError(null);
    const ext = '.' + (file.name.split('.').pop()?.toLowerCase() || '');
    if (!SUPPORTED_EXTENSIONS.includes(ext)) {
      setValidationError(`Unsupported file type (${ext}). Please upload a PDF, DOCX, or PPTX lecture file.`);
      return;
    }
    if (file.size > 75 * 1024 * 1024) {
      setValidationError('File size exceeds 75MB limit.');
      return;
    }

    setSelectedFile(file);
    setUploadedFile({
      name: file.name,
      size: file.size,
      type: file.type || 'application/octet-stream',
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setUploadedFile(null);
    setValidationError(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleModeSelect = (mode: 'comp' | 'cram' | 'flashcards') => {
    setDistillationMode(mode);
    if (mode === 'cram') {
      setPreferences({ examStyle: 'Theory Focused' });
    } else if (mode === 'comp') {
      setPreferences({ examStyle: 'Mixed / Comprehensive' });
    } else {
      setPreferences({ examStyle: 'Application & Problem Solving' });
    }
  };

  return (
    <div className="w-full bg-[#121520]/45 backdrop-blur-xl rounded-xl p-6 lg:p-9 border border-cyan-500/30 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
      {/* Cyber Corner Notches and Scanlines Accent */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00f2fe] pointer-events-none" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#e20476] pointer-events-none" />
      <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-8">
        {/* Output Mode Segmented Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#3a494b]/30">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-cyan-300 font-semibold tracking-wide">
              DISTILLATION STRATEGY
            </span>
            <span className="font-mono text-[11px] text-[#b9cacb]">[SELECT TARGET MATRIX]</span>
          </div>

          <div className="inline-flex p-1 rounded-full bg-[#090a0f]/50 backdrop-blur-md border border-[#3a494b]/60 self-start sm:self-auto gap-1.5 font-mono">
            <button
              onClick={() => handleModeSelect('comp')}
              type="button"
              className={`btn-spring btn-spring-glass px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
                distillationMode === 'comp'
                  ? 'bg-[#00f2fe] text-black font-bold shadow-[0_0_12px_rgba(0,242,254,0.6)]'
                  : 'text-[#b9cacb] hover:text-white'
              }`}
            >
              COMPREHENSIVE + 10 EXAM QS
            </button>
            <button
              onClick={() => handleModeSelect('cram')}
              type="button"
              className={`btn-spring btn-spring-glass px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
                distillationMode === 'cram'
                  ? 'bg-[#00f2fe] text-black font-bold shadow-[0_0_12px_rgba(0,242,254,0.6)]'
                  : 'text-[#b9cacb] hover:text-white'
              }`}
            >
              EXECUTIVE CRAM + RECALL
            </button>
            <button
              onClick={() => handleModeSelect('flashcards')}
              type="button"
              className={`btn-spring btn-spring-glass px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
                distillationMode === 'flashcards'
                  ? 'bg-[#00f2fe] text-black font-bold shadow-[0_0_12px_rgba(0,242,254,0.6)]'
                  : 'text-[#b9cacb] hover:text-white'
              }`}
            >
              ANKI / FLASH MATRIX
            </button>
          </div>
        </div>

        {/* Futuristic Drag & Drop Work Area */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => !selectedFile && inputRef.current?.click()}
          className={`group relative rounded-lg bg-[#090a0f]/35 backdrop-blur-md border-2 border-dashed transition-all duration-200 p-8 sm:p-12 text-center flex flex-col items-center justify-center cursor-pointer shadow-inner cyber-glow-cyan ${
            dragActive
              ? 'border-[#00f2fe] bg-cyan-950/30 scale-[1.01]'
              : selectedFile
              ? 'border-cyan-400/60 bg-cyan-950/20 cursor-default'
              : 'border-cyan-400/40 hover:border-cyan-400 hover:bg-[#090a0f]/50'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.pptx,.docx"
            onChange={handleChange}
            className="hidden"
          />

          {!selectedFile ? (
            <>
              <div className="w-16 h-16 rounded-lg bg-[#1f2438] border border-cyan-400/60 flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(0,242,254,0.3)] text-[#00f2fe] group-hover:scale-110 group-hover:border-cyan-300 transition-all duration-200">
                <UploadCloud className="h-8 w-8 animate-pulse text-[#00f2fe]" />
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white mb-2 font-mono">
                Ingest lecture PDF here, or{' '}
                <span className="text-[#00f2fe] font-semibold underline underline-offset-4 decoration-[#00f2fe]/40 group-hover:decoration-[#00f2fe]">
                  browse storage partition
                </span>
              </h3>

              <p className="text-xs sm:text-sm text-[#b9cacb] max-w-md mb-6 font-mono">
                Accepts complex syllabi, multi-column decks, scans (.pdf, .pptx, .docx up to 75MB)
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="font-mono text-[11px] uppercase tracking-widest text-cyan-400/70 font-semibold">
                  PRELOAD SAMPLE:
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRunDemo();
                  }}
                  type="button"
                  className="btn-spring btn-spring-glass inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1f2438]/80 border border-cyan-500/40 text-cyan-100 font-mono text-[12px] transition-all shadow-sm cursor-pointer"
                >
                  <FileText className="h-4 w-4 text-cyan-400" />
                  <span className="truncate max-w-[240px] sm:max-w-none text-cyan-200 font-medium">
                    Lecture_08_Neurobiology_Synaptic_Transmission.pdf
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#090a0f]/80 font-mono text-[10px] text-cyan-400 border border-cyan-500/30">
                    4.2 MB
                  </span>
                </button>
              </div>
            </>
          ) : (
            <div className="w-full max-w-md rounded-xl border border-cyan-400/60 bg-[#121520] p-4 text-left shadow-[0_0_20px_rgba(0,242,254,0.2)]">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#181c2b] border border-cyan-400/40">
                  <FileText className="h-6 w-6 text-cyan-400" />
                </div>
                <div className="min-w-0 flex-1 font-mono">
                  <p className="truncate text-sm font-bold text-white">{selectedFile.name}</p>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-400">
                    <span>{formatFileSize(selectedFile.size)}</span>
                    <span>•</span>
                    <span className="uppercase text-[10px] text-cyan-400 font-bold">
                      {selectedFile.name.split('.').pop()}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile();
                  }}
                  className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white transition cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Validation Error */}
        {validationError && (
          <div className="flex items-center gap-2 rounded-lg border border-pink-500/40 bg-pink-950/20 p-3 text-xs text-pink-300 font-mono">
            <AlertCircle className="h-4 w-4 shrink-0 text-pink-400" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Action Button */}
        {selectedFile && (
          <button
            type="button"
            onClick={() => onStartProcessing(selectedFile)}
            className="btn-spring btn-spring-cyan w-full flex items-center justify-center gap-2 py-4 rounded-full bg-[#121520] border border-[#00f2fe] text-[#00f2fe] font-mono font-bold text-sm shadow-[0_0_25px_rgba(0,242,254,0.4)] transition cursor-pointer"
          >
            <Cpu className="h-5 w-5" />
            <span>INITIALIZE NEURAL SYNTHESIS</span>
          </button>
        )}
      </div>
    </div>
  );
}
