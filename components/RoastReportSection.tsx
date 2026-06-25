'use client';

import React from 'react';
import { RoastReport } from '@/lib/types';
import { motion } from 'framer-motion';
import { ThreeDIcon } from './ThreeDIcon';

interface RoastReportSectionProps {
  roast: RoastReport;
}

export function RoastReportSection({ roast }: RoastReportSectionProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 pb-16 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Main roast commentary ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 rounded-3xl p-6 sm:p-8 relative overflow-hidden"
          style={{
            background: '#262421',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >


          {/* Section header */}
          <div className="flex items-center gap-3 mb-6 pb-5 relative" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(255,85,0,0.3), rgba(255,59,48,0.15))', border: '1px solid rgba(255,85,0,0.3)' }}>
              <ThreeDIcon name="flame" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-display font-black text-white tracking-wide">AI Roast Report</h3>
              <p className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.42)' }}>Generated from archives & tactical habits</p>
            </div>
          </div>

          {/* Roast paragraphs */}
          <div className="space-y-4">
            {roast.roastParagraphs.map((p, idx) => (
              <p key={idx}
                className="text-sm sm:text-base leading-relaxed rounded-2xl p-4 font-medium"
                style={{
                  color: 'rgba(255,255,255,0.88)',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  lineHeight: 1.7
                }}
              >
                {p}
              </p>
            ))}

            {/* Secret Talent & Fatal Flaw inside the report section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              {/* Strength */}
              <div className="rounded-2xl p-4" style={{
                background: 'rgba(48,209,88,0.08)',
                border: '1px solid rgba(48,209,88,0.2)'
              }}>
                <div className="flex items-center gap-2 mb-2">
                  <ThreeDIcon name="thumbsup" size={16} />
                  <span className="text-xs font-mono font-bold uppercase tracking-wide text-ios-green">Secret Talent</span>
                </div>
                <p className="text-sm font-semibold leading-snug text-white">
                  "{roast.biggestStrength}"
                </p>
              </div>

              {/* Weakness */}
              <div className="rounded-2xl p-4" style={{
                background: 'rgba(255,59,48,0.08)',
                border: '1px solid rgba(255,59,48,0.2)'
              }}>
                <div className="flex items-center gap-2 mb-2">
                  <ThreeDIcon name="thumbsdown" size={16} />
                  <span className="text-xs font-mono font-bold uppercase tracking-wide text-ios-pink">Fatal Flaw</span>
                </div>
                <p className="text-sm font-semibold leading-snug text-white">
                  "{roast.biggestWeakness}"
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Right Column ──────────────────────────────────── */}
        <div className="space-y-5">
          {/* Playstyle bars */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-3xl p-6"
            style={{
              background: '#262421',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <div className="flex items-center gap-2 mb-5">
              <ThreeDIcon name="gauge" size={22} />
              <h4 className="font-display font-black text-white text-sm uppercase tracking-wide">Playstyle</h4>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Aggression', value: roast.playstyle.aggression, color: '#ff5500', glow: 'rgba(255,85,0,0.5)' },
                { label: 'Tactical Vision', value: roast.playstyle.tacticalAwareness, color: '#bf5af2', glow: 'rgba(191,90,242,0.5)' },
                { label: 'Endgame Quality', value: roast.playstyle.endgameQuality, color: '#30d158', glow: 'rgba(48,209,88,0.5)' },
              ].map(({ label, value, color, glow }) => (
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
          </motion.div>
        </div>
      </div>

      {/* ── Dark Roast Improvement Tips ───────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 rounded-3xl p-6 sm:p-8"
        style={{
          background: '#262421',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{ background: '#3d1c12', border: '1px solid rgba(255,85,0,0.4)' }}>
            <ThreeDIcon name="flame" size={22} className="text-[#ff5500]" />
          </div>
          <div>
            <h3 className="text-xl font-display font-black text-white tracking-wide">DARK ROAST IMPROVEMENT</h3>
            <p className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.42)' }}>Savage advice to rebuild your game from the ashes</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roast.improvementTips.map((tip, idx) => {
            return (
              <div key={idx} className="rounded-2xl p-5 flex flex-col gap-3 transition-all hover:-translate-y-1 duration-300"
                style={{
                  background: '#1d1c1a',
                  border: '1px solid rgba(255, 85, 0, 0.16)'
                }}>
                <span className="text-3xl font-display font-black text-[#ff5500]">
                  0{idx + 1}
                </span>
                <p className="text-sm font-medium leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
                  "{tip}"
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
