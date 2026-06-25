'use client';

import React from 'react';
import { RefreshCw } from 'lucide-react';
import { ThreeDIcon } from './ThreeDIcon';

interface NavbarProps {
  onReset?: () => void;
  showReset?: boolean;
}

export function Navbar({ onReset, showReset }: NavbarProps) {
  return (
    <header className="w-full sticky top-0 z-50 px-4 py-3 sm:px-8" style={{
      background: '#21201d',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div
          onClick={onReset}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          {/* iOS-style icon container */}
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-all duration-300" style={{
            background: 'linear-gradient(145deg, #ff6b35, #ff3b30)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <ThreeDIcon name="flame" size={22} />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-display font-black tracking-tight text-gradient-fire">
              CHESS ROASTER
            </h1>
            <p className="text-[10px] text-muted-content font-mono tracking-widest uppercase flex items-center gap-1">
              <ThreeDIcon name="sparkles" size={10} />
              <span>AI Comedy Engine</span>
            </p>
          </div>
        </div>

        {showReset && (
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all active:scale-95 group/btn"
            style={{
              background: 'rgba(255, 255, 255, 0.07)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: 'rgba(255,255,255,0.85)'
            }}
          >
            <RefreshCw className="w-3.5 h-3.5 group-hover/btn:rotate-180 transition-transform duration-500" />
            <span>Roast Another</span>
          </button>
        )}
      </div>
    </header>
  );
}
