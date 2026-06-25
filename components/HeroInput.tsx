'use client';

import React, { useState } from 'react';
import { Platform } from '@/lib/types';
import { Search, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ThreeDIcon } from './ThreeDIcon';

interface HeroInputProps {
  onSubmit: (platform: Platform, username: string) => void;
  isLoading: boolean;
}

const SAMPLE_USERS: Record<Platform, string[]> = {
  chesscom: ['hikaru', 'magnuscarlsen', 'gothamchess', 'danielnaroditsky', 'botez'],
  lichess: ['drnykterstein', 'german11', 'rebeccaharris', 'lachesisq', 'ericrosen']
};

export function HeroInput({ onSubmit, isLoading }: HeroInputProps) {
  const [platform, setPlatform] = useState<Platform>('chesscom');
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && !isLoading) {
      onSubmit(platform, username.trim());
    }
  };

  const handleSampleClick = (name: string) => {
    setUsername(name);
    if (!isLoading) {
      onSubmit(platform, name);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-12 sm:py-20 flex flex-col items-center text-center">
  

      {/* Hero headline */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className="text-5xl sm:text-7xl font-display font-black tracking-tight leading-[0.9] mb-4"
      >
        <span className="text-white">GET </span>
        <span className="text-gradient-fire">COOKED</span>
        <br />
        <span className="text-white">BY </span>
        <span style={{
          background: 'linear-gradient(135deg, #bf5af2, #5ac8fa)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>AI COMEDY</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-base sm:text-lg max-w-lg mb-10 leading-relaxed font-medium"
        style={{ color: 'rgba(255,255,255,0.65)' }}
      >
        Enter your username. We analyze your live games and serve personalized roasts on your questionable tactical crimes.
      </motion.p>

      {/* Platform selector card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, delay: 0.3 }}
        className="w-full max-w-xl rounded-3xl p-2 mb-6"
        style={{
          background: '#262421',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        {/* Platform toggles */}
        <div className="grid grid-cols-2 gap-1.5 p-1.5 rounded-2xl mb-3" style={{ background: 'rgba(0,0,0,0.3)' }}>
          <button
            type="button"
            onClick={() => setPlatform('chesscom')}
            className="py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300"
            style={platform === 'chesscom' ? {
              background: '#6aaa40',
              color: '#fff'
            } : {
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-white/90 inline-block" />
            <span>Chess.com</span>
          </button>

          <button
            type="button"
            onClick={() => setPlatform('lichess')}
            className="py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300"
            style={platform === 'lichess' ? {
              background: '#ffffff',
              color: '#111'
            } : {
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-gray-600 border border-gray-400 inline-block" />
            <span>Lichess.org</span>
          </button>
        </div>

        {/* Input + submit */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 px-1 pb-1">
          <div className="relative flex-1">
            <Search className="w-4.5 h-4.5 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.35)' }} />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={platform === 'chesscom' ? 'e.g. hikaru, gothamchess' : 'e.g. drnykterstein'}
              disabled={isLoading}
              className="w-full rounded-2xl pl-11 pr-4 py-3.5 text-white text-sm font-medium transition-all disabled:opacity-50 outline-none"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                caretColor: '#ff6b35',
              }}
              onFocus={e => {
                e.currentTarget.style.border = '1.5px solid rgba(255, 107, 53, 0.6)';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,107,53,0.1)';
              }}
              onBlur={e => {
                e.currentTarget.style.border = '1px solid rgba(255,255,255,0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          <button
            type="submit"
            id="roast-submit-btn"
            disabled={!username.trim() || isLoading}
            className="px-7 py-3.5 rounded-2xl font-black text-sm tracking-wide text-white transition-all active:scale-95 disabled:opacity-40 flex items-center justify-center gap-2 whitespace-nowrap"
            style={{
              background: '#ff5500',
            }}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>ROAST ME</span>
                <ThreeDIcon name="flame" size={18} />
              </>
            )}
          </button>
        </form>
      </motion.div>

      {/* Sample users */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="flex flex-wrap items-center justify-center gap-2"
      >
        <span className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.4)' }}>
          <ThreeDIcon name="dice" size={13} /> Try:
        </span>
        {SAMPLE_USERS[platform].map((sample) => (
          <button
            key={sample}
            onClick={() => handleSampleClick(sample)}
            disabled={isLoading}
            className="px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all disabled:opacity-40 flex items-center gap-1"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.65)'
            }}
          >
            <span>@{sample}</span>
            <ArrowRight className="w-3 h-3 opacity-50" />
          </button>
        ))}
      </motion.div>
    </div>
  );
}
