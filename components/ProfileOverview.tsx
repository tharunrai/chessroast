'use client';

import React from 'react';
import { PlayerProfile } from '@/lib/types';
import { motion } from 'framer-motion';
import { ThreeDIcon } from './ThreeDIcon';

interface ProfileOverviewProps {
  profile: PlayerProfile;
  verdictBadge: string;
  onShareClick: () => void;
}

export function ProfileOverview({ profile, verdictBadge, onShareClick }: ProfileOverviewProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-12 relative z-10">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full rounded-3xl p-6 sm:p-10 mb-6 relative overflow-hidden"
        style={{
          background: '#262421',
          border: '1px solid rgba(255, 255, 255, 0.08)'
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
              <ThreeDIcon name="share" size={18} />
              <span>Export Roast Card</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats grid — each card has distinct iOS color */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Rating card — orange */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel glass-panel-hover p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden"
          style={{ borderColor: 'rgba(255,107,53,0.25)' }}
        >

          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>Rating</span>
            <ThreeDIcon name="trophy" size={30} />
          </div>
          <div>
            <div className="text-4xl font-display font-black text-white mb-1">
              {profile.currentRating}
            </div>
            <p className="text-xs font-mono flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <ThreeDIcon name="trending" size={13} />
              <span>Peak: <span className="text-ios-yellow font-semibold">{profile.peakRating}</span></span>
            </p>
          </div>
        </motion.div>

        {/* Win Rate card — green */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-panel glass-panel-hover p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden"
          style={{ borderColor: 'rgba(48,209,88,0.25)' }}
        >

          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>Win Rate</span>
            <ThreeDIcon name="swords" size={30} />
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
          transition={{ delay: 0.2 }}
          className="glass-panel glass-panel-hover p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden"
          style={{ borderColor: 'rgba(191,90,242,0.25)' }}
        >

          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>Fav Opening</span>
            <ThreeDIcon name="book" size={30} />
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
          transition={{ delay: 0.25 }}
          className="glass-panel glass-panel-hover p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden"
          style={{ borderColor: 'rgba(90,200,250,0.25)' }}
        >

          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>Preferred Mode</span>
            <ThreeDIcon name="clock" size={30} />
          </div>
          <div>
            <div className="text-xl font-display font-black text-white leading-snug mb-1">
              {profile.preferredTimeControl}
            </div>
            <p className="text-xs font-mono flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
              <ThreeDIcon name="flame" size={12} /> Chaos factor: High
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
