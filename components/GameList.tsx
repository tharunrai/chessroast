'use client';

import React from 'react';
import { ChessGame } from '@/lib/types';
import { Calendar, ExternalLink, Swords, Target, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

interface GameListProps {
  games: ChessGame[];
  onRoastGame: (game: ChessGame) => void;
  isLoadingGameId?: string;
}

// Each card gets a unique accent color in rotation
const CARD_ACCENTS = [
  { border: 'rgba(255,107,53,0.28)', glow: 'rgba(255,85,0,0.15)', radial: 'rgba(255,107,53,0.5)' },
  { border: 'rgba(191,90,242,0.28)', glow: 'rgba(191,90,242,0.15)', radial: 'rgba(191,90,242,0.5)' },
  { border: 'rgba(90,200,250,0.28)', glow: 'rgba(90,200,250,0.15)', radial: 'rgba(90,200,250,0.5)' },
  { border: 'rgba(48,209,88,0.28)', glow: 'rgba(48,209,88,0.15)', radial: 'rgba(48,209,88,0.5)' },
];

export function GameList({ games, onRoastGame, isLoadingGameId }: GameListProps) {
  if (games.length === 0) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 pb-20">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-8 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(255,59,48,0.25), rgba(255,107,53,0.12))',
            border: '1px solid rgba(255,59,48,0.35)'
          }}>
          <Swords size={24} className="text-red-400" />
        </div>
        <div>
          <h3 className="text-2xl font-display font-black text-white tracking-wide">RECENT MATCHES</h3>
          <p className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.38)' }}>Click any game for a personalized AI roast</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {games.map((g, idx) => {
          const isWin = g.result === 'win';
          const isLoss = g.result === 'loss';
          const accent = CARD_ACCENTS[idx % CARD_ACCENTS.length];

          const resultStyle = isWin
            ? { bg: 'rgba(48,209,88,0.15)', color: '#32d870', border: 'rgba(48,209,88,0.35)' }
            : isLoss
              ? { bg: 'rgba(255,59,48,0.15)', color: '#ff5555', border: 'rgba(255,59,48,0.35)' }
              : { bg: 'rgba(255,159,10,0.15)', color: '#ffb830', border: 'rgba(255,159,10,0.35)' };

          return (
            <motion.div
              key={g.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              className="flex flex-col justify-between rounded-3xl p-5 group relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{
                background: '#262421',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >


              <div className="relative z-10">
                {/* Result badge + date */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase font-mono"
                    style={{ background: resultStyle.bg, color: resultStyle.color, border: `1px solid ${resultStyle.border}` }}>
                    {g.result}
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] font-mono"
                    style={{ color: 'rgba(255,255,255,0.38)' }}>
                    <Calendar className="w-3 h-3" /> {g.date}
                  </span>
                </div>

                {/* Opponent */}
                <div className="mb-3.5">
                  <p className="text-[10px] font-mono uppercase tracking-wider mb-0.5" style={{ color: 'rgba(255,255,255,0.38)' }}>OPPONENT</p>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-base font-display font-bold text-white truncate">{g.opponentName}</span>
                    <span className="text-xs font-mono flex-shrink-0" style={{ color: 'rgba(255,255,255,0.42)' }}>({g.opponentRating})</span>
                  </div>
                </div>

                {/* Opening */}
                <div className="mb-5">
                  <p className="text-[10px] font-mono uppercase tracking-wider mb-0.5" style={{ color: 'rgba(255,255,255,0.38)' }}>OPENING</p>
                  <p className="text-sm font-semibold leading-snug line-clamp-2" style={{ color: 'rgba(255,255,255,0.78)' }}>
                    {g.opening}
                  </p>
                </div>
              </div>

              <div className="relative z-10 space-y-2">
                {/* Accuracy */}
                {g.accuracy !== undefined && (
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <span className="flex items-center gap-1.5 text-[11px] font-mono" style={{ color: 'rgba(255,255,255,0.48)' }}>
                      <Target size={13} /> Accuracy
                    </span>
                    <span className="text-xs font-black font-mono" style={{
                      color: g.accuracy > 85 ? '#32d870' : g.accuracy < 60 ? '#ff5555' : '#ffb830'
                    }}>
                      {g.accuracy}%
                    </span>
                  </div>
                )}

                {/* Roast button */}
                <button
                  onClick={() => onRoastGame(g)}
                  disabled={isLoadingGameId === g.id}
                  className="w-full py-3 px-4 rounded-2xl text-white font-black text-[11px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 hover:brightness-110"
                  style={{
                    background: '#ff5500'
                  }}
                >
                  {isLoadingGameId === g.id ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Flame size={15} />
                      <span>ROAST GAME</span>
                    </>
                  )}
                </button>

                {/* External link */}
                {g.url && (
                  <a
                    href={g.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 py-1 text-[10px] font-mono transition-colors hover:opacity-80"
                    style={{ color: 'rgba(255,255,255,0.35)' }}
                  >
                    <span>View on platform</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
