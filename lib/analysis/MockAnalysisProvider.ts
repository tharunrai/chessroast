import { Chess } from 'chess.js';
import { AnalysisProvider, GameAnalysisResult, MoveHighlight } from '../types';
import { callGitHubModel } from '../ai/githubModels';

export class MockAnalysisProvider implements AnalysisProvider {
  async analyzeGame(pgn: string, playerColor: 'white' | 'black' = 'white', opponentName: string = 'Opponent'): Promise<GameAnalysisResult> {
    const chess = new Chess();
    let moveCount = 0;
    const sampleMoves: string[] = [];

    try {
      if (pgn && pgn.trim().length > 0) {
        chess.loadPgn(pgn);
      }
    } catch {
      // ignore partial pgn
    }

    const history = chess.history({ verbose: true });
    moveCount = history.length || 30;

    const prefix = playerColor === 'white' ? 'w' : 'b';
    const playerHistory = history.filter(m => m.color === prefix);
    
    playerHistory.slice(0, 6).forEach((m, i) => {
      sampleMoves.push(`Move ${i + 1}: ${m.san}`);
    });

    if (sampleMoves.length === 0) {
      sampleMoves.push("Move 12: Qx?", "Move 18: Kh1");
    }

    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      return this.getOfflineFallback(opponentName, moveCount, sampleMoves);
    }

    const systemPrompt = `You are Stockfish AI Comedy Game Reviewer: an elite chess engine and stand-up comedian. Analyze games and roast the player's specific moves with devastating humor. Return ONLY valid JSON.`;

    const userPrompt = `Chess Match Review:
- Opponent: ${opponentName}
- Player Color: ${playerColor}
- Total Ply: ${moveCount}
- Sample Player Moves: ${sampleMoves.join(', ')}

Generate a humorous Stockfish Game Review. Return JSON matching this schema:
{
  "gameSummary": "Hilarious 2-sentence summary of how the match unfolded and collapsed",
  "biggestBlunders": [
    "Funny quote roasting their biggest blunder moment",
    "Funny quote roasting their endgame or time management"
  ],
  "finalVerdict": "Cooked 🔥",
  "roastScore": 9.1,
  "moveHighlights": [
    { "moveNumber": 12, "san": "${sampleMoves[0]?.split(': ')[1] || 'Qd2'}", "comment": "Hilarious joke about this move", "type": "blunder" },
    { "moveNumber": 16, "san": "${sampleMoves[1]?.split(': ')[1] || 'Kh1'}", "comment": "Another funny joke", "type": "mistake" },
    { "moveNumber": 22, "san": "Resigns", "comment": "The best move played all game.", "type": "brilliant" }
  ]
}`;

    const rawJson = await callGitHubModel(systemPrompt, userPrompt, true);

    if (rawJson) {
      try {
        const data = JSON.parse(rawJson);
        const highlights: MoveHighlight[] = Array.isArray(data.moveHighlights) 
          ? data.moveHighlights.map((m: Record<string, unknown>, idx: number) => ({
              moveNumber: Number(m.moveNumber || idx + 10),
              san: String(m.san || `Move ${idx + 10}`),
              comment: String(m.comment || "Suspicious square selection."),
              type: ['blunder', 'mistake', 'brilliant', 'suspicious', 'comedy'].includes(String(m.type))
                ? (m.type as MoveHighlight['type'])
                : 'blunder'
            }))
          : [];

        return {
          gameSummary: String(data.gameSummary || `Against ${opponentName}, your position fell apart after ${moveCount} ply.`),
          biggestBlunders: Array.isArray(data.biggestBlunders) ? data.biggestBlunders.map(String) : ["Hanging mate in 1."],
          moveHighlights: highlights.length > 0 ? highlights : [{ moveNumber: 14, san: "??", comment: "Moving purely on vibes.", type: "blunder" }],
          finalVerdict: String(data.finalVerdict || "Charcoal 💀"),
          roastScore: Number(data.roastScore || 8.8)
        };
      } catch (err) {
        console.warn("AI Game review JSON parse error:", err);
      }
    }

    return this.getOfflineFallback(opponentName, moveCount, sampleMoves);
  }

  private getOfflineFallback(opponentName: string, moveCount: number, sampleMoves: string[]): GameAnalysisResult {
    return {
      gameSummary: `🤖 AI Game Review Engine Offline: You survived ${moveCount} ply against ${opponentName} (playing moves like ${sampleMoves.slice(0,2).join(', ')}). To unlock live AI move-by-move comedy analysis, please set GITHUB_TOKEN in .env.local!`,
      biggestBlunders: ["Missing GITHUB_TOKEN API key."],
      moveHighlights: [
        { moveNumber: 1, san: "e4", comment: "A classical opening move.", type: "brilliant" },
        { moveNumber: 15, san: "??", comment: "Add GITHUB_TOKEN to .env.local to generate live comedy on this ply!", type: "blunder" }
      ],
      finalVerdict: "Medium Rare 🥩",
      roastScore: 0
    };
  }
}
