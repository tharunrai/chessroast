'use client';

import React from 'react';
import Image from 'next/image';
import { ChessGame, PlayerProfile } from '@/lib/types';
import { Calendar, ExternalLink, Swords, Target } from 'lucide-react';
import { motion } from 'framer-motion';

interface GameListProps {
  games: ChessGame[];
  profile: PlayerProfile | null;
}

// Each card gets a unique accent color in rotation
const CARD_ACCENTS = [
  { border: 'rgba(255,107,53,0.28)', glow: 'rgba(255,85,0,0.15)', radial: 'rgba(255,107,53,0.5)' },
  { border: 'rgba(191,90,242,0.28)', glow: 'rgba(191,90,242,0.15)', radial: 'rgba(191,90,242,0.5)' },
  { border: 'rgba(90,200,250,0.28)', glow: 'rgba(90,200,250,0.15)', radial: 'rgba(90,200,250,0.5)' },
  { border: 'rgba(48,209,88,0.28)', glow: 'rgba(48,209,88,0.15)', radial: 'rgba(48,209,88,0.5)' },
];

function getBriefRoast(game: ChessGame) {
  if (game.result === 'win') {
    return game.accuracy && game.accuracy >= 85
      ? 'Clean win. The engine approved, reluctantly.'
      : 'You won, but the moves still look lightly haunted.';
  }

  if (game.result === 'draw') {
    return game.accuracy && game.accuracy >= 80
      ? 'Decent draw. Barely surviving, but still breathing.'
      : 'A draw that felt more like mutual surrender.';
  }

  return game.accuracy && game.accuracy < 60
    ? `A loss at ${game.accuracy}% accuracy. That was rough.`
    : `You lost to ${game.opponentName}. The position folded early.`;
}

export function GameList({ games, profile }: GameListProps) {
  if (games.length === 0) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 pb-20">
      <div className="flex items-center gap-3 mb-6 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(255,59,48,0.25), rgba(255,107,53,0.12))',
            border: '1px solid rgba(255,59,48,0.35)'
          }}
        >
          <Swords size={24} className="text-red-400" />
        </div>
        <div>
          <h3 className="text-2xl font-display font-black text-white tracking-wide">RECENT MATCHES</h3>
          <p className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.38)' }}>Short roast cards</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {games.map((g, idx) => {
          const isWin = g.result === 'win';
          const isLoss = g.result === 'loss';
          const accent = CARD_ACCENTS[idx % CARD_ACCENTS.length];
          const profileInitial = profile?.username?.[0]?.toUpperCase() ?? 'P';

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
              className="relative flex flex-col rounded-[1.7rem] p-3 sm:p-4 overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'linear-gradient(180deg, rgba(18, 17, 34, 0.98), rgba(13, 12, 28, 0.96))',
                border: `1px solid ${accent.border}`
              }}
            >
              <div className="relative z-10 flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-[0.25em]" style={{ background: resultStyle.bg, color: resultStyle.color, border: `1px solid ${resultStyle.border}` }}>
                    {g.result}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.42)' }}>
                  <Calendar className="w-3 h-3" />
                  <span>{g.date}</span>
                </div>
              </div>

              <div className="relative z-10 rounded-[1.2rem] p-3 mb-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    {profile?.avatar ? (
                      <Image
                        src={profile.avatar}
                        alt={profile.username}
                        width={88}
                        height={88}
                        className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-[1rem] object-cover"
                        style={{ border: '2px solid rgba(255,255,255,0.14)' }}
                      />
                    ) : (
                      <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-[1rem] flex items-center justify-center font-display font-black text-3xl text-white uppercase" style={{ background: 'linear-gradient(135deg, #ff5500, #bf5af2)', border: '2px solid rgba(255,255,255,0.14)' }}>
                        {profileInitial}
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1 pt-0.5">
                    <h4 className="text-xl sm:text-2xl font-display font-black text-white tracking-tight leading-none truncate">
                      VS {g.opponentName}
                    </h4>
                    <p className="mt-1.5 text-xs sm:text-sm font-medium leading-snug line-clamp-2" style={{ color: 'rgba(255,255,255,0.68)' }}>
                      {g.opening}
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative z-10 rounded-[1rem] px-3 py-2.5 mb-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-[10px] font-mono uppercase tracking-[0.35em] mb-1.5" style={{ color: 'rgba(255,255,255,0.38)' }}>
                  Roast
                </p>
                <p className="text-sm sm:text-[14px] leading-relaxed font-medium" style={{ color: isLoss ? '#ff847d' : 'rgba(255,255,255,0.78)' }}>
                    {getBriefRoast(g)}
                </p>
              </div>

              <div className="relative z-10 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  {g.accuracy !== undefined && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.74)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <Target className="w-3 h-3" /> {g.accuracy}%
                    </span>
                  )}
                  {g.url && (
                    <a
                      href={g.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors hover:opacity-80"
                      style={{ color: 'rgba(255,255,255,0.74)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      <ExternalLink className="w-3 h-3" /> View
                    </a>
                  )}
                </div>

                <span className="text-[10px] font-mono uppercase tracking-[0.3em]" style={{ color: 'rgba(255,255,255,0.38)' }}>
                  {g.playerColor}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
