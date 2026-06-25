'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { PlayerProfile, RoastReport } from '@/lib/types';
import { X, Download, Share, Flame, Sparkles, Shield, Swords } from 'lucide-react';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

interface ShareCardModalProps {
  profile: PlayerProfile | null;
  roast: RoastReport | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ShareCardModal({ profile, roast, isOpen, onClose }: ShareCardModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen || !profile || !roast) return null;

  const handleDownload = async () => {
    if (!cardRef.current || isExporting) return;
    setIsExporting(true);

    try {
      // trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff5500', '#a855f7', '#22c55e']
      });

      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 3 });
      const link = document.createElement('a');
      link.download = `${profile.username}_chess_roast.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error exporting PNG:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-black/85 backdrop-blur-xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl glass-panel bg-[#090514] border border-[rgba(120,92,255,0.22)] rounded-3xl p-4 sm:p-6 md:p-8 flex flex-col items-center"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-[#17172a] hover:bg-[#23203d] text-gray-400 hover:text-white transition-colors border border-white/5"
          >
            <X className="w-5 h-5" />
          </button>

          <h3 className="text-xl font-display font-black text-white tracking-wide mb-2 flex items-center gap-2">
            <Share size={20} className="text-white" /> SHAREABLE ROAST CARD
          </h3>
          <p className="text-xs text-gray-450 mb-6 font-mono text-center">
            Download this card and flex your tactical crimes to friends
          </p>

          {/* Exportable DOM Card */}
          <div
            ref={cardRef}
            className="w-full max-w-[520px] rounded-[2rem] p-[2px] bg-gradient-to-r from-[#ff5500] via-[#ffd166] via-[#a855f7] to-[#60a5fa] select-none"
          >

            <div className="relative overflow-hidden rounded-[1.9rem] bg-[#1b1816] p-4 sm:p-5 md:p-6">

            <div className="relative z-10">
              {/* Card top bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#ff5500] via-[#ff8a00] to-[#ffd166] border border-white/10 flex items-center justify-center">
                    <Flame size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[9px] font-mono uppercase tracking-[0.35em]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      CHESS ROASTER
                    </p>
                    <p className="text-sm font-display font-black text-white tracking-[0.18em] uppercase">
                      Roast Card
                    </p>
                  </div>
                </div>

              </div>

              {/* Portrait + stats */}
              <div className="grid grid-cols-1 sm:grid-cols-[110px_1fr] gap-4 items-start mb-4">
                <div className="relative w-fit mx-auto sm:mx-0">
                  <div className="relative rounded-[1.7rem] p-2 bg-[#14110f] border-2 border-[#ff5500]">
                    {profile.avatar ? (
                      <Image
                        src={profile.avatar}
                        alt={profile.username}
                        width={130}
                        height={130}
                        className="w-[104px] h-[104px] sm:w-[130px] sm:h-[130px] rounded-[1.25rem] object-cover"
                      />
                    ) : (
                      <div className="w-[104px] h-[104px] sm:w-[130px] sm:h-[130px] rounded-[1.25rem] flex items-center justify-center font-display font-black text-4xl sm:text-5xl uppercase text-white"
                        style={{ background: 'linear-gradient(135deg, #ff5500, #bf5af2)' }}>
                        {profile.username[0]}
                      </div>
                    )}
                  </div>

                  <div className="absolute -right-1.5 -bottom-1.5 sm:-right-2 sm:-bottom-2 px-2.5 py-1 rounded-full text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-white"
                    style={{ background: '#ff5500', border: '1px solid rgba(255,255,255,0.18)' }}>
                    Lv {Math.max(1, Math.round(profile.currentRating / 100))}
                  </div>
                </div>

                <div className="min-w-0 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-3 mb-3">
                    <div className="min-w-0">
                      <p className="text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.3em] sm:tracking-[0.35em] mb-1" style={{ color: 'rgba(255,255,255,0.42)' }}>
                        PLAYER NAME
                      </p>
                      <h2 className="text-xl sm:text-[1.7rem] leading-none font-display font-black text-white truncate">
                        @{profile.username}
                      </h2>
                    </div>
                    <div className="text-center sm:text-right flex-shrink-0">
                      <p className="text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.3em] sm:tracking-[0.35em] mb-1" style={{ color: 'rgba(255,255,255,0.42)' }}>
                        RATING
                      </p>
                      <p className="text-2xl sm:text-3xl font-display font-black text-[#ffd166] leading-none">
                        {profile.currentRating}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <div className="rounded-2xl px-3 py-2.5 bg-[#17172a] border border-white/8 text-center sm:text-left">
                      <p className="text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.28em] sm:tracking-[0.32em] mb-1" style={{ color: 'rgba(255,255,255,0.42)' }}>HP</p>
                      <p className="text-sm font-black text-white whitespace-nowrap">{profile.winRate}%</p>
                    </div>
                    <div className="rounded-2xl px-3 py-2.5 bg-[#17172a] border border-white/8 text-center sm:text-left">
                      <p className="text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.28em] sm:tracking-[0.32em] mb-1" style={{ color: 'rgba(255,255,255,0.42)' }}>RATING</p>
                      <p className="text-sm font-black text-white flex items-center justify-center sm:justify-start gap-1 whitespace-nowrap"><Swords size={14} className="text-[#ff8a00]" /> {profile.currentRating}</p>
                    </div>
                    <div className="rounded-2xl px-3 py-2.5 bg-[#17172a] border border-white/8 text-center sm:text-left">
                      <p className="text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.28em] sm:tracking-[0.32em] mb-1" style={{ color: 'rgba(255,255,255,0.42)' }}>DEF</p>
                      <p className="text-sm font-black text-white flex items-center justify-center sm:justify-start gap-1 whitespace-nowrap"><Shield size={14} className="text-[#60a5fa]" /> {profile.peakRating}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Roast move */}
              <div className="mb-4 rounded-[1.25rem] p-3 sm:p-4" style={{ background: 'linear-gradient(135deg, rgba(255,85,0,0.12), rgba(255,255,255,0.04))', border: '1px solid rgba(255,85,0,0.24)' }}>
                <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-[0.3em]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  <Sparkles size={14} /> Special Move
                </div>
                <p className="text-sm sm:text-base leading-relaxed font-semibold text-white">
                  “{roast.funniestQuote}”
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[9px] sm:text-[10px] font-mono text-white/40">
                <span>chess-roaster.vercel.app</span>
              </div>
            </div>
          </div>
          </div>

          {/* Modal Buttons */}
          <div className="w-full grid grid-cols-1 gap-3 mt-6">
            <button
              onClick={handleDownload}
              disabled={isExporting}
              className="w-full py-4 rounded-xl bg-[#ff5500] hover:bg-[#ff6600] text-white font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
            >
              {isExporting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD ROAST CARD PNG</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
