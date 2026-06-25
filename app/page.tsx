'use client';
// Clean background reloaded without orbs or radial circles

import React, { useState, useEffect } from 'react';
import { ChessGame, GameAnalysisResult, Platform, PlayerProfile, RoastReport } from '@/lib/types';
import { Navbar } from '@/components/Navbar';
import { HeroInput } from '@/components/HeroInput';
import { ProfileOverview } from '@/components/ProfileOverview';
import { RoastReportSection } from '@/components/RoastReportSection';
import { GameList } from '@/components/GameList';
import { RoastLoader } from '@/components/RoastLoader';
import { GameRoastModal } from '@/components/GameRoastModal';
import { ShareCardModal } from '@/components/ShareCardModal';
import { AlertCircle, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export default function Home() {
  const [step, setStep] = useState<'search' | 'loading' | 'dashboard'>('search');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [profile, setProfile] = useState<PlayerProfile | null>(null);
  const [games, setGames] = useState<ChessGame[]>([]);
  const [roast, setRoast] = useState<RoastReport | null>(null);

  const [selectedGame, setSelectedGame] = useState<ChessGame | null>(null);
  const [gameAnalysis, setGameAnalysis] = useState<GameAnalysisResult | null>(null);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  const [isLoadingGameId, setIsLoadingGameId] = useState<string | undefined>(undefined);

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleRoastRequest = async (platform: Platform, username: string) => {
    setErrorMessage(null);
    setStep('loading');

    try {
      // 1. Fetch live player data
      const fetchUrl = platform === 'chesscom'
        ? `/api/chesscom?username=${encodeURIComponent(username)}`
        : `/api/lichess?username=${encodeURIComponent(username)}`;

      const res = await fetch(fetchUrl);
      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || `Failed to fetch player data from ${platform}`);
      }

      const fetchedProfile: PlayerProfile = data.profile;
      const fetchedGames: ChessGame[] = data.games || [];

      // 2. Request profile roast
      const roastRes = await fetch('/api/roast-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile: fetchedProfile })
      });
      const roastObj = await roastRes.json();

      if (!roastRes.ok || roastObj.error) {
        throw new Error(roastObj.error || 'Failed to generate profile roast');
      }

      setProfile(fetchedProfile);
      setGames(fetchedGames);
      setRoast(roastObj.roast);
      setStep('dashboard');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong during live fetch';
      setErrorMessage(msg);
      setStep('search');
    }
  };

  const handleRoastSingleGame = async (game: ChessGame) => {
    setIsLoadingGameId(game.id);
    setSelectedGame(game);

    try {
      const res = await fetch('/api/roast-game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pgn: game.pgn,
          playerColor: game.playerColor,
          opponentName: game.opponentName
        })
      });
      const data = await res.json();

      if (res.ok && data.analysis) {
        setGameAnalysis(data.analysis);
        setIsGameModalOpen(true);
      }
    } catch (err) {
      console.error('Game review error:', err);
    } finally {
      setIsLoadingGameId(undefined);
    }
  };

  const handleReset = () => {
    setStep('search');
    setProfile(null);
    setGames([]);
    setRoast(null);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onReset={handleReset} showReset={step === 'dashboard'} />

      <main className="flex-1 flex flex-col justify-center relative z-10">
        {/* Error Alert */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto mt-6 mx-4 px-6 py-4 rounded-2xl flex items-center gap-3.5"
              style={{
                background: 'rgba(255, 59, 48, 0.12)',
                border: '1px solid rgba(255, 59, 48, 0.35)',
                color: '#ff6b5b'
              }}
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <div className="text-sm font-semibold flex-1 text-white">
                {errorMessage}
              </div>
              <button
                onClick={() => setErrorMessage(null)}
                className="text-xs font-mono underline hover:opacity-85 text-ios-pink"
              >
                Dismiss
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* State 1: Search Input */}
        {step === 'search' && (
          <HeroInput onSubmit={handleRoastRequest} isLoading={false} />
        )}

        {/* State 2: Hilarious Loading Animation */}
        {step === 'loading' && (
          <RoastLoader />
        )}

        {/* State 3: Roasted Dashboard */}
        {step === 'dashboard' && profile && roast && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <ProfileOverview
              profile={profile}
              verdictBadge={roast.verdictBadge}
              playstyle={roast.playstyle}
              onShareClick={() => setIsShareModalOpen(true)}
            />

            <RoastReportSection roast={roast} profile={profile} />

            <GameList
              games={games}
              onRoastGame={handleRoastSingleGame}
              isLoadingGameId={isLoadingGameId}
            />
          </motion.div>
        )}
      </main>

      {/* Modals */}
      <GameRoastModal
        game={selectedGame}
        analysis={gameAnalysis}
        isOpen={isGameModalOpen}
        onClose={() => setIsGameModalOpen(false)}
      />

      <ShareCardModal
        profile={profile}
        roast={roast}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      {/* Footer */}
      <footer className="w-full py-8 text-center relative z-10" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <p className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>
          CHESS ROASTER &bull; ENTERTAINMENT FIRST, IMPROVEMENT SECOND
        </p>
        <div className="flex items-center justify-center gap-3 mt-2">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#ff5500' }} />
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#bf5af2' }} />
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#5ac8fa' }} />
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#30d158' }} />
        </div>
      </footer>
    </div>
  );
}
