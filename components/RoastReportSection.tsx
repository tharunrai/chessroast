'use client';

import React from 'react';
import { RoastReport } from '@/lib/types';
import { motion } from 'framer-motion';
import { Flame, ThumbsUp, ThumbsDown } from 'lucide-react';

interface RoastReportSectionProps {
  roast: RoastReport;
}

export function RoastReportSection({ roast }: RoastReportSectionProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-2 pb-16 relative z-10">
      <div className="flex flex-col gap-6">

        {/* ── Main roast commentary ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full rounded-3xl p-6 sm:p-8 relative overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, rgba(18, 17, 34, 0.98) 0%, rgba(13, 12, 28, 0.96) 100%)',
            border: '1px solid rgba(255, 85, 0, 0.18)'
          }}
        >
          {/* Section header */}
          <div className="flex items-center gap-3 mb-6 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(255,85,0,0.3), rgba(255,59,48,0.15))', border: '1px solid rgba(255,85,0,0.3)' }}>
              <Flame size={22} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-display font-black text-white tracking-wide">AI Roast Report</h3>
              <p className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.42)' }}>The AI is roasting your games directly</p>
            </div>
          </div>

          {/* Roast paragraphs — chat bubble style */}
          <div className="space-y-4">
            {roast.roastParagraphs.map((p, idx) => (
              <div key={idx} className="rounded-2xl rounded-tl-sm p-4 text-sm sm:text-base leading-relaxed font-medium" style={{
                color: 'rgba(255,255,255,0.88)',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.06)',
                lineHeight: 1.75
              }}>
                {p}
              </div>
            ))}

            {/* Secret Talent & Fatal Flaw */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="rounded-2xl p-5" style={{
                background: 'rgba(48,209,88,0.08)',
                border: '1px solid rgba(48,209,88,0.2)'
              }}>
                <div className="flex items-center gap-2 mb-3">
                  <ThumbsUp size={16} className="text-green-400" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wide text-ios-green">What you did right</span>
                </div>
                <p className="text-sm font-semibold leading-relaxed text-white">
                  "{roast.biggestStrength}"
                </p>
              </div>

              <div className="rounded-2xl p-5" style={{
                background: 'rgba(255,59,48,0.08)',
                border: '1px solid rgba(255,59,48,0.2)'
              }}>
                <div className="flex items-center gap-2 mb-3">
                  <ThumbsDown size={16} className="text-red-400" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wide text-ios-pink">Where you collapsed</span>
                </div>
                <p className="text-sm font-semibold leading-relaxed text-white">
                  "{roast.biggestWeakness}"
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Dark Roast Improvement Tips ───────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-3xl p-6 sm:p-8"
          style={{
            background: 'linear-gradient(180deg, rgba(18, 17, 34, 0.98) 0%, rgba(13, 12, 28, 0.96) 100%)',
            border: '1px solid rgba(255, 85, 0, 0.18)'
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: '#3d1c12', border: '1px solid rgba(255,85,0,0.4)' }}>
              <Flame size={22} className="text-[#ff5500]" />
            </div>
            <div>
              <h3 className="text-xl font-display font-black text-white tracking-wide">SOME IMPROVEMENT</h3>
              <p className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.42)' }}>How you can stop giving the AI easy material</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {roast.improvementTips.map((tip, idx) => (
              <div key={idx} className="rounded-2xl p-5 flex flex-col gap-3 transition-all hover:-translate-y-1 duration-300"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255, 85, 0, 0.18)'
                }}>
                <span className="text-3xl font-display font-black text-[#ff5500]">
                  0{idx + 1}
                </span>
                <p className="text-sm font-medium leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
                  "{tip}"
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
