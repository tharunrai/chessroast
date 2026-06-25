'use client';

import React from 'react';
import { PlayerProfile, PlaystyleAnalysis } from '@/lib/types';
import { motion } from 'framer-motion';
import { Share, Trophy, TrendingUp, Swords, BookOpen, Clock, Gauge, Flame } from 'lucide-react';

interface ProfileOverviewProps {
  profile: PlayerProfile;
  verdictBadge: string;
  playstyle?: PlaystyleAnalysis;
  onShareClick: () => void;
}

export function ProfileOverview({ profile, verdictBadge, playstyle, onShareClick }: ProfileOverviewProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-12 relative z-10">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full rounded-3xl p-6 sm:p-10 mb-6 relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(18, 17, 34, 0.98) 0%, rgba(13, 12, 28, 0.96) 100%)',
          border: '1px solid rgba(120, 92, 255, 0.18)'
        }}
      >


        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          {/* Player Info */}
          <div className="flex items-center gap-5">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.username}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover"
                style={{ border: '2px solid rgba(191, 90, 242, 0.5)' }}
              />
            ) : (
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center font-display font-black text-4xl text-white uppercase"
                style={{
                  background: 'linear-gradient(135deg, #ff5500, #bf5af2)'
                }}>
                {profile.username[0]}
              </div>
            )}

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-extrabold uppercase tracking-wider"
                  style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  {profile.platform}
                </span>
                {profile.title ? (
                  <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider"
                    style={{ background: '#ff9f0a', color: '#000' }}>
                    {profile.title}
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider"
                    style={{ background: 'rgba(191,90,242,0.15)', color: '#d070f0', border: '1px solid rgba(191,90,242,0.3)' }}>
                    Certified Woodpusher
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
                @{profile.username}
              </h1>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Verdict pill */}
            <div className="px-5 py-3.5 rounded-2xl text-center"
              style={{
                background: 'rgba(0,0,0,0.35)',
                border: '1px solid rgba(255,107,53,0.3)'
              }}>
              <p className="text-[9px] font-mono uppercase tracking-widest mb-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>FINAL VERDICT</p>
              <div className="text-lg sm:text-xl font-display font-black text-gradient-fire animate-bounce">
                {verdictBadge}
              </div>
            </div>

            {/* Share button */}
            <button
              onClick={onShareClick}
              id="export-roast-btn"
              className="px-5 py-3.5 rounded-2xl font-bold text-sm tracking-wide text-white flex items-center justify-center gap-2 active:scale-95 transition-all"
              style={{
                background: '#bf5af2'
              }}
            >
              <Share size={18} />
              <span>Export Roast Card</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Grid containing Playstyle (left side, 1 col) and Stats (right side, 2 cols in 2x2 grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
        {/* Playstyle card — purple border accent */}
        {playstyle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, rgba(18, 17, 34, 0.98) 0%, rgba(13, 12, 28, 0.96) 100%)',
              border: '1px solid rgba(191, 90, 242, 0.22)'
            }}
          >
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Gauge size={22} className="text-gray-300" />
                <h4 className="font-display font-black text-white text-sm uppercase tracking-wide">Playstyle</h4>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Aggression', value: playstyle.aggression, color: '#ff5500' },
                  { label: 'Tactical Vision', value: playstyle.tacticalAwareness, color: '#bf5af2' },
                  { label: 'Endgame Quality', value: playstyle.endgameQuality, color: '#30d158' },
                ].map(({ label, value, color }) => (
                  <div key={label}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.6)' }}>{label}</span>
                      <span className="text-xs font-mono font-bold" style={{ color }}>{value}/10</span>
                    </div>
                    <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                      <div
                        style={{ width: `${value * 10}%`, background: color }}
                        className="h-full rounded-full transition-all duration-700"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Combat Rating summary */}
            {(() => {
              const avg = Math.round((playstyle.aggression + playstyle.tacticalAwareness + playstyle.endgameQuality) / 3);
              const label = avg >= 8 ? 'Elite Destroyer' : avg >= 6 ? 'Solid Tactician' : avg >= 4 ? 'Average Joe' : 'Humble Beginner';
              const color = avg >= 8 ? '#ff5500' : avg >= 6 ? '#bf5af2' : avg >= 4 ? '#5ac8fa' : '#30d158';
              return (
                <div className="mt-5 pt-5 flex items-center justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Combat Rating</p>
                    <p className="text-xs font-mono font-bold" style={{ color: 'rgba(255,255,255,0.7)' }}>{label}</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-display font-black text-xl"
                    style={{ background: `${color}18`, border: `1px solid ${color}50`, color }}>
                    {avg}
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}

        {/* Stats grid — 4 cards in 2x2 grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 ${playstyle ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          {/* Rating card — orange */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="glass-panel glass-panel-hover p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden"
            style={{ borderColor: 'rgba(255,107,53,0.25)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>Rating</span>
              <Trophy size={30} className="text-orange-400" />
            </div>
            <div>
              <div className="text-4xl font-display font-black text-white mb-1">
                {profile.currentRating}
              </div>
              <p className="text-xs font-mono flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <TrendingUp size={13} className="text-yellow-400" />
                <span>Peak: <span className="text-ios-yellow font-semibold">{profile.peakRating}</span></span>
              </p>
            </div>
          </motion.div>

          {/* Win Rate card — green */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="glass-panel glass-panel-hover p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden"
            style={{ borderColor: 'rgba(48,209,88,0.25)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>Win Rate</span>
              <Swords size={30} className="text-green-400" />
            </div>
            <div>
              <div className="text-4xl font-display font-black text-white mb-2">
                {profile.winRate}%
              </div>
              {/* Segmented progress bar */}
              <div className="w-full h-2 rounded-full overflow-hidden flex gap-0.5 mb-1.5" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <div style={{ width: `${profile.winRate}%`, background: 'linear-gradient(90deg, #30d158, #32d870)' }} className="h-full rounded-l-full" />
                <div style={{ width: `${100 - profile.winRate}%`, background: 'linear-gradient(90deg, #ff3b30, #ff5555)' }} className="h-full rounded-r-full" />
              </div>
              <div className="flex justify-between text-[10px] font-mono font-semibold">
                <span className="text-ios-green">{profile.wins}W</span>
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>{profile.draws}D</span>
                <span className="text-ios-pink">{profile.losses}L</span>
              </div>
            </div>
          </motion.div>

          {/* Opening card — purple */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="glass-panel glass-panel-hover p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden"
            style={{ borderColor: 'rgba(191,90,242,0.25)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>Fav Opening</span>
              <BookOpen size={30} className="text-purple-400" />
            </div>
            <div>
              <div className="text-lg font-display font-black text-white leading-snug line-clamp-2 mb-1">
                {profile.favoriteOpening}
              </div>
              <p className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.45)' }}>Theory: Suspicious 🤔</p>
            </div>
          </motion.div>

          {/* Time Control card — teal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="glass-panel glass-panel-hover p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden"
            style={{ borderColor: 'rgba(90,200,250,0.25)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>Preferred Mode</span>
              <Clock size={30} className="text-teal-400" />
            </div>
            <div>
              <div className="text-xl font-display font-black text-white leading-snug mb-1">
                {profile.preferredTimeControl}
              </div>
              <p className="text-xs font-mono flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
                <Flame size={12} className="text-orange-500" /> Chaos factor: High
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
