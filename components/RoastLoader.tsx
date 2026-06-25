'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Loader2, Check, Circle } from 'lucide-react';

const LOADING_QUOTES = [
  "Connecting to Stockfish Roast cluster...",
  "Parsing your questionable tactical crimes...",
  "Counting hanging queens in archive data...",
  "Consulting Magnus Carlsen's eyebrow raises...",
  "Calculating blunder frequencies on rank 8...",
  "Preparing emotionally devastating roast metaphors..."
];

const ANALYSIS_STEPS = [
  { id: 1, label: "Scanning platform history & ELO stats" },
  { id: 2, label: "Evaluating blunder databases & tactical patterns" },
  { id: 3, label: "Calculating opening theory suspiciousness" },
  { id: 4, label: "Formulating brutal personal burns" },
  { id: 5, label: "Assembling Dark Roast Improvement checklist" }
];

export function RoastLoader() {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  // Rotate quotes
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setQuoteIdx((prev) => (prev + 1) % LOADING_QUOTES.length);
    }, 1500);
    return () => clearInterval(quoteInterval);
  }, []);

  // Increment analysis steps sequentially to simulate a real loading process
  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStepIdx((prev) => {
        if (prev < ANALYSIS_STEPS.length) {
          return prev + 1;
        }
        return prev;
      });
    }, 1300);
    return () => clearInterval(stepInterval);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-16 text-center flex flex-col items-center relative z-10">
      {/* Premium Loader Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full rounded-3xl p-6 sm:p-8 relative overflow-hidden"
        style={{
          background: '#262421',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        {/* Top Flame Animation */}
        <div className="relative mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center relative"
            style={{
              background: '#1b1a18',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
            <Flame size={38} className="text-[#ff5500] animate-pulse" />
            
            {/* Spinning tactical radar ring */}
            <div className="absolute inset-0 border border-dashed border-[#ff5500]/40 rounded-full animate-spin" style={{ animationDuration: '8s' }} />
          </div>
          <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full border border-orange-500/20 animate-ping pointer-events-none" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-display font-black tracking-wide mb-1 uppercase text-gradient-fire">
          ANALYZING ARCHIVES
        </h3>
        <p className="text-[10px] font-mono uppercase tracking-widest mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Compiling your chess crimes
        </p>

        {/* Live Checklist Console */}
        <div className="w-full rounded-2xl p-4 mb-6 text-left space-y-3 font-mono text-xs"
          style={{
            background: 'rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(255, 255, 255, 0.04)'
          }}
        >
          {ANALYSIS_STEPS.map((step, idx) => {
            const isCompleted = idx < currentStepIdx;
            const isCurrent = idx === currentStepIdx;

            return (
              <div key={step.id} className="flex items-center gap-3 transition-colors duration-300">
                {isCompleted ? (
                  <div className="w-4 h-4 rounded-full flex items-center justify-center bg-green-500/20 border border-green-500 text-green-400">
                    <Check size={10} strokeWidth={3} />
                  </div>
                ) : isCurrent ? (
                  <div className="w-4 h-4 rounded-full flex items-center justify-center border border-amber-500 text-amber-500">
                    <Loader2 size={10} className="animate-spin" />
                  </div>
                ) : (
                  <div className="w-4 h-4 rounded-full flex items-center justify-center border border-white/20 text-white/20">
                    <Circle size={8} fill="currentColor" />
                  </div>
                )}
                <span className={`transition-colors duration-300 ${
                  isCompleted ? 'text-white/60 line-through decoration-white/20' : isCurrent ? 'text-amber-400 font-bold' : 'text-white/30'
                }`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Rotating quotes display */}
        <div className="min-h-[70px] flex items-center justify-center mb-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={quoteIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-sm font-mono font-bold max-w-md rounded-xl px-5 py-3 w-full"
              style={{
                color: '#ffb830',
                background: 'rgba(255,159,10,0.06)',
                border: '1px solid rgba(255,159,10,0.15)'
              }}
            >
              "{LOADING_QUOTES[quoteIdx]}"
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Multi-color progress shimmer bar */}
        <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div className="w-full h-full rounded-full animate-shimmer" style={{
            backgroundImage: 'linear-gradient(90deg, #ff5500, #bf5af2, #5ac8fa, #30d158, #ff5500)',
            backgroundSize: '200% 100%'
          }} />
        </div>
      </motion.div>
    </div>
  );
}
