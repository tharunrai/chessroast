'use client';

import React, { useRef, useState } from 'react';
import { PlayerProfile, RoastReport } from '@/lib/types';
import { X, Download } from 'lucide-react';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { ThreeDIcon } from './ThreeDIcon';

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
            <ThreeDIcon name="share" size={20} /> SHAREABLE ROAST CARD
          </h3>
          <p className="text-xs text-gray-450 mb-6 font-mono text-center">
            Download this card and flex your tactical crimes to friends
          </p>

          {/* Exportable DOM Card */}
          <div
            ref={cardRef}
            className="w-full bg-[#21201d] border-2 border-[#ff5500]/70 rounded-3xl p-8 relative overflow-hidden select-none"
          >


            {/* Card Header Branding */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#ff5500]/20 to-[#ffbb00]/10 border border-[#ff5500]/30 flex items-center justify-center">
                  <ThreeDIcon name="flame" size={18} />
                </div>
                <span className="font-display font-black tracking-widest text-white text-sm">CHESS ROASTER</span>
              </div>
              <span className="text-[10px] font-mono text-gray-450 px-2 py-1 rounded bg-white/5 border border-white/5">
                {profile.platform.toUpperCase()}
              </span>
            </div>

            {/* Player Info Stamp */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[10px] font-mono text-gray-450 uppercase tracking-widest">WOODPUSHER</p>
                <h2 className="text-3xl font-display font-black text-white tracking-tight truncate max-w-[200px]">
                  @{profile.username}
                </h2>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-mono text-gray-450 uppercase tracking-widest">RATING</p>
                <p className="text-3xl font-display font-black text-[#ffbb00] font-mono">
                  {profile.currentRating}
                </p>
              </div>
            </div>

            {/* Verdict Stamp */}
            <div className="bg-black/45 border border-[#ff5500]/30 rounded-2xl p-4 mb-6 text-center">
              <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-1">OFFICIAL VERDICT</p>
              <div className="text-2xl font-display font-black bg-gradient-to-r from-[#ff5500] via-[#ff8800] to-[#ef4444] bg-clip-text text-transparent">
                {roast.verdictBadge}
              </div>
            </div>

            {/* Biggest Talent */}
            <div className="mb-6">
              <p className="text-[10px] font-mono text-[#22c55e] uppercase font-extrabold mb-1 flex items-center gap-1.5">
                <ThreeDIcon name="sparkles" size={14} /> Secret Talent
              </p>
              <p className="text-sm font-bold text-gray-200 leading-snug">
                "{roast.biggestStrength}"
              </p>
            </div>

            {/* Funniest Roast Quote */}
            <div className="bg-white/5 rounded-xl p-4 mb-8 border border-white/5">
              <p className="text-xs text-gray-350 italic line-clamp-3">
                "{roast.funniestQuote}"
              </p>
            </div>

            {/* Footer Watermark */}
            <div className="flex items-center justify-between pt-4 border-t border-white/5 text-[10px] font-mono text-gray-500">
              <span>chessroaster.app</span>
              <span>Roast Score: {roast.roastScore}/10</span>
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
