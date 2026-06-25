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
          className="relative w-full max-w-lg glass-panel bg-[#090514] border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col items-center"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
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

            <div className="relative overflow-hidden rounded-[1.9rem] bg-[#1b1816] p-5 sm:p-6">
              <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.45) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />

            <div className="relative z-10">
              {/* Card top bar */}
              <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                  </div>
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

                <div className="px-3 py-1.5 rounded-full text-[10px] font-mono font-black uppercase tracking-[0.3em] text-white"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  {profile.platform}
                </div>
              </div>

              {/* Portrait + stats */}
              <div className="grid grid-cols-[110px_1fr] gap-4 items-start mb-4">
                <div className="relative">
                  <div className="absolute inset-0 rounded-[1.7rem] bg-gradient-to-br from-[#ff5500]/20 via-[#ff8a00]/10 to-transparent blur-xl scale-110" />
                  <div className="relative rounded-[1.7rem] p-2 bg-[#14110f] border-2 border-[#ff5500]">
                    {profile.avatar ? (
                      <Image
                        src={profile.avatar}
                        alt={profile.username}
                        width={130}
                        height={130}
                        className="w-full h-[130px] rounded-[1.25rem] object-cover"
                      />
                    ) : (
                      <div className="w-full h-[130px] rounded-[1.25rem] flex items-center justify-center font-display font-black text-5xl uppercase text-white"
                        style={{ background: 'linear-gradient(135deg, #ff5500, #bf5af2)' }}>
                        {profile.username[0]}
                      </div>
                    )}
                  </div>

                  <div className="absolute -right-2 -bottom-2 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-white"
                    style={{ background: '#ff5500', border: '1px solid rgba(255,255,255,0.18)' }}>
                    Lv {Math.max(1, Math.round(profile.currentRating / 100))}
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="min-w-0">
                      <p className="text-[9px] font-mono uppercase tracking-[0.35em] mb-1" style={{ color: 'rgba(255,255,255,0.42)' }}>
                        PLAYER NAME
                      </p>
                      <h2 className="text-2xl sm:text-[1.7rem] leading-none font-display font-black text-white truncate">
                        @{profile.username}
                      </h2>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-[9px] font-mono uppercase tracking-[0.35em] mb-1" style={{ color: 'rgba(255,255,255,0.42)' }}>
                        RATING
                      </p>
                      <p className="text-3xl font-display font-black text-[#ffd166] leading-none">
                        {profile.currentRating}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-2xl px-3 py-2.5 bg-white/5 border border-white/8">
                      <p className="text-[9px] font-mono uppercase tracking-[0.32em] mb-1" style={{ color: 'rgba(255,255,255,0.42)' }}>HP</p>
                      <p className="text-sm font-black text-white">{profile.winRate}%</p>
                    </div>
                    <div className="rounded-2xl px-3 py-2.5 bg-white/5 border border-white/8">
                      <p className="text-[9px] font-mono uppercase tracking-[0.32em] mb-1" style={{ color: 'rgba(255,255,255,0.42)' }}>RATING</p>
                      <p className="text-sm font-black text-white flex items-center gap-1"><Swords size={14} className="text-[#ff8a00]" /> {profile.currentRating}</p>
                    </div>
                    <div className="rounded-2xl px-3 py-2.5 bg-white/5 border border-white/8">
                      <p className="text-[9px] font-mono uppercase tracking-[0.32em] mb-1" style={{ color: 'rgba(255,255,255,0.42)' }}>DEF</p>
                      <p className="text-sm font-black text-white flex items-center gap-1"><Shield size={14} className="text-[#60a5fa]" /> {profile.peakRating}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Roast move */}
              <div className="mb-4 rounded-[1.5rem] p-4" style={{ background: 'linear-gradient(135deg, rgba(255,85,0,0.12), rgba(255,255,255,0.04))', border: '1px solid rgba(255,85,0,0.24)' }}>
                <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-[0.3em]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  <Sparkles size={14} /> Special Move
                </div>
                <p className="text-base sm:text-lg leading-relaxed font-semibold text-white">
                  “{roast.funniestQuote}”
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[10px] font-mono text-white/40">
                <span>chessroaster.app</span>
                <span>{profile.platform.toUpperCase()} CARD</span>
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
