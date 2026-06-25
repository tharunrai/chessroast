'use client';

import React from 'react';
import { ChessGame, GameAnalysisResult } from '@/lib/types';
import { X, Flame, Skull, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GameRoastModalProps {
  game: ChessGame | null;
  analysis: GameAnalysisResult | null;
  isOpen: boolean;
  onClose: () => void;
}

export function GameRoastModal({ game, analysis, isOpen, onClose }: GameRoastModalProps) {
  if (!isOpen || !game || !analysis) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 overflow-y-auto"
        style={{ background: 'rgba(4, 2, 14, 0.88)', backdropFilter: 'blur(24px)' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="relative w-full max-w-3xl rounded-3xl p-6 sm:p-8 max-h-[90vh] flex flex-col"
          style={{
            background: '#262421',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >


          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2.5 rounded-xl transition-all hover:scale-110 active:scale-95"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <X className="w-4 h-4 text-white opacity-70" />
          </button>

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 pr-10 relative z-10"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <div>
              <div className="flex items-center gap-2 mb-1.5 text-xs font-mono font-bold uppercase tracking-wide"
                style={{ color: '#ff6b35' }}>
                <Flame size={15} />
                <span>AI Game Review</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
                vs {game.opponentName}
                <span className="text-lg ml-2 font-mono font-normal" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  ({game.opponentRating})
                </span>
              </h2>
              <p className="text-xs font-mono mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {game.opening} • {game.date}
              </p>
            </div>

            {/* Score pills */}
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <div className="px-4 py-2.5 rounded-2xl text-center"
                style={{ background: 'rgba(255,107,53,0.12)', border: '1px solid rgba(255,107,53,0.3)' }}>
                <p className="text-[9px] font-mono uppercase tracking-widest mb-0.5" style={{ color: 'rgba(255,255,255,0.42)' }}>VERDICT</p>
                <div className="text-base font-display font-black" style={{ color: '#ff7055' }}>
                  {analysis.finalVerdict}
                </div>
              </div>

              <div className="px-4 py-2.5 rounded-2xl text-center"
                style={{ background: 'rgba(191,90,242,0.12)', border: '1px solid rgba(191,90,242,0.3)' }}>
                <p className="text-[9px] font-mono uppercase tracking-widest mb-0.5" style={{ color: 'rgba(255,255,255,0.42)' }}>CRIME SCORE</p>
                <div className="text-base font-display font-black" style={{ color: '#d070f0' }}>
                  {analysis.roastScore}/10
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable body */}
          <div className="overflow-y-auto pr-1 my-5 space-y-5 flex-1">
            {/* Summary */}
            <div className="p-5 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="text-sm sm:text-base leading-relaxed font-medium" style={{ color: 'rgba(255,255,255,0.88)' }}>
                {analysis.gameSummary}
              </p>
            </div>

            {/* Biggest Blunders */}
            <div>
              <h4 className="flex items-center gap-2 text-xs font-display font-black uppercase tracking-widest mb-3"
                style={{ color: '#ff5555' }}>
                <Skull size={17} />
                <span>Biggest Blunders</span>
              </h4>
              <div className="space-y-2.5">
                {analysis.biggestBlunders.map((b, idx) => (
                  <div key={idx} className="p-4 rounded-2xl flex items-start gap-3"
                    style={{ background: 'rgba(255,59,48,0.1)', border: '1px solid rgba(255,59,48,0.22)' }}>
                    <span className="text-lg flex-shrink-0">🚨</span>
                    <span className="text-sm font-medium leading-snug" style={{ color: 'rgba(255,255,255,0.85)' }}>"{b}"</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Move Highlights */}
            <div>
              <h4 className="flex items-center gap-2 text-xs font-display font-black uppercase tracking-widest mb-3"
                style={{ color: '#d070f0' }}>
                <Sparkles size={17} />
                <span>Move Commentary</span>
              </h4>
              <div className="space-y-2.5">
                {analysis.moveHighlights.map((m, idx) => {
                  const isBlunder = m.type === 'blunder' || m.type === 'mistake';
                  return (
                    <div key={idx} className="p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center gap-3"
                      style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="flex items-center gap-2.5 flex-shrink-0">
                        <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-black"
                          style={isBlunder
                            ? { background: 'rgba(255,59,48,0.25)', color: '#ff7055', border: '1px solid rgba(255,59,48,0.3)' }
                            : { background: 'rgba(48,209,88,0.18)', color: '#32d870', border: '1px solid rgba(48,209,88,0.3)' }
                          }>
                          #{m.moveNumber}
                        </span>
                        <span className="text-base font-mono font-black text-white">{m.san}</span>
                      </div>
                      <p className="text-xs sm:text-sm italic flex-1 pl-3"
                        style={{ color: 'rgba(255,255,255,0.72)', borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
                        "{m.comment}"
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 flex justify-end" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest font-mono transition-all hover:brightness-125 active:scale-95 text-white"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              Close Review
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
