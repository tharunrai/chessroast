export type Platform = 'chesscom' | 'lichess';

export interface PlayerProfile {
  username: string;
  platform: Platform;
  avatar?: string;
  title?: string;
  currentRating: number;
  peakRating: number;
  gamesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
  winRate: number; // percentage e.g. 48.5
  favoriteOpening: string;
  preferredTimeControl: string;
  joinedDate?: string;
}

export interface ChessGame {
  id: string;
  pgn: string;
  result: 'win' | 'loss' | 'draw';
  playerColor: 'white' | 'black';
  opening: string;
  accuracy?: number;
  opponentName: string;
  opponentRating: number;
  playerRating: number;
  date: string;
  url?: string;
}

export interface PlaystyleAnalysis {
  aggression: number; // 1-10
  tacticalAwareness: number; // 1-10
  endgameQuality: number; // 1-10
}

export type VerdictBadge = 'COOKED 🔥' | 'CHARCOAL 💀' | 'MEDIUM RARE 🥩' | 'BEYOND SAVING ☢️' | 'SUSPICIOUSLY GOOD 🤖';

export interface RoastReport {
  overview: string;
  playstyle: PlaystyleAnalysis;
  biggestStrength: string;
  biggestWeakness: string;
  roastParagraphs: string[];
  improvementTips: string[];
  roastScore: number; // 1-10
  verdictBadge: VerdictBadge;
  funniestQuote: string;
}

export interface MoveHighlight {
  moveNumber: number;
  san: string;
  comment: string;
  type: 'blunder' | 'mistake' | 'brilliant' | 'suspicious' | 'comedy';
}

export interface GameAnalysisResult {
  gameSummary: string;
  biggestBlunders: string[];
  moveHighlights: MoveHighlight[];
  finalVerdict: string;
  roastScore: number; // 1-10
}

export interface AnalysisProvider {
  analyzeGame(pgn: string, playerColor: 'white' | 'black', opponentName: string): Promise<GameAnalysisResult>;
}
