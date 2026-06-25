'use client';

import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';

export type IconName =
  | 'flame'
  | 'trophy'
  | 'swords'
  | 'skull'
  | 'sparkles'
  | 'clock'
  | 'book'
  | 'target'
  | 'zap'
  | 'lightbulb'
  | 'gauge'
  | 'alert'
  | 'trending'
  | 'award'
  | 'calendar'
  | 'dice'
  | 'search'
  | 'share'
  | 'download'
  | 'check'
  | 'thumbsup'
  | 'thumbsdown';

interface ThreeDIconProps {
  name: IconName;
  className?: string;
  size?: number;
  glow?: boolean;
}

const EMOJI_MAPPING: Record<IconName, { path: string; fallback: string }> = {
  flame: {
    path: 'Fire/3D/fire_3d.png',
    fallback: 'Flame'
  },
  trophy: {
    path: 'Trophy/3D/trophy_3d.png',
    fallback: 'Trophy'
  },
  swords: {
    path: 'Crossed%20swords/3D/crossed_swords_3d.png',
    fallback: 'Swords'
  },
  skull: {
    path: 'Skull/3D/skull_3d.png',
    fallback: 'Skull'
  },
  sparkles: {
    path: 'Sparkles/3D/sparkles_3d.png',
    fallback: 'Sparkles'
  },
  clock: {
    path: 'Watch/3D/watch_3d.png',
    fallback: 'Clock'
  },
  book: {
    path: 'Open%20book/3D/open_book_3d.png',
    fallback: 'BookOpen'
  },
  target: {
    path: 'Bullseye/3D/bullseye_3d.png',
    fallback: 'Target'
  },
  zap: {
    path: 'High%20voltage/3D/high_voltage_3d.png',
    fallback: 'Zap'
  },
  lightbulb: {
    path: 'Light%20bulb/3D/light_bulb_3d.png',
    fallback: 'Lightbulb'
  },
  gauge: {
    path: 'Gauge/3D/gauge_3d.png', // Fallback to icon will happen if 404
    fallback: 'Gauge'
  },
  alert: {
    path: 'Warning/3D/warning_3d.png',
    fallback: 'AlertTriangle'
  },
  trending: {
    path: 'Chart%20increasing/3D/chart_increasing_3d.png',
    fallback: 'TrendingUp'
  },
  award: {
    path: 'Ribbon/3D/ribbon_3d.png',
    fallback: 'Award'
  },
  calendar: {
    path: 'Calendar/3D/calendar_3d.png',
    fallback: 'Calendar'
  },
  dice: {
    path: 'Game%20die/3D/game_die_3d.png',
    fallback: 'Dices'
  },
  search: {
    path: 'Magnifying%20glass%20tilted%20right/3D/magnifying_glass_tilted_right_3d.png',
    fallback: 'Search'
  },
  share: {
    path: 'Outbox%20tray/3D/outbox_tray_3d.png',
    fallback: 'Share2'
  },
  download: {
    path: 'Inbox%20tray/3D/inbox_tray_3d.png',
    fallback: 'Download'
  },
  check: {
    path: 'Check%20mark%20button/3D/check_mark_button_3d.png',
    fallback: 'Check'
  },
  thumbsup: {
    path: 'Thumbs%20up/Default/3D/thumbs_up_3d_default.png', // We'll verify or fallback if needed
    fallback: 'ThumbsUp'
  },
  thumbsdown: {
    path: 'Thumbs%20down/Default/3D/thumbs_down_3d_default.png',
    fallback: 'ThumbsDown'
  }
};

export function ThreeDIcon({ name, className = '', size = 32 }: ThreeDIconProps) {
  const mapping = EMOJI_MAPPING[name];
  const fallbackName = mapping ? mapping.fallback : 'HelpCircle';
  const LucideComponent = (LucideIcons as any)[fallbackName] || LucideIcons.HelpCircle;
  return <LucideComponent className={className} style={{ width: size, height: size }} />;
}
