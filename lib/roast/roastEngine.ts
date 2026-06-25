import { PlayerProfile, RoastReport, VerdictBadge } from '../types';
import { callGitHubModel } from '../ai/githubModels';

export async function generateAIProfileRoast(profile: PlayerProfile): Promise<RoastReport> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return getOfflineFallbackReport(profile);
  }

  const systemPrompt = `You are Stockfish AI Comedy Engine: an elite chess grandmaster and stand-up comedian (think Gordon Ramsay + Spotify Wrapped + GothamChess). You produce savage, emotionally devastating, yet hilariously entertaining roasts on chess players based on their stats. Keep humor sharp, modern, and entertainment-first. Return ONLY valid JSON.`;

  const userPrompt = `Player Profile Facts:
- Username: @${profile.username} (${profile.platform.toUpperCase()})
- Current Rating: ${profile.currentRating} (Peak: ${profile.peakRating})
- Win Rate: ${profile.winRate}% across ${profile.gamesPlayed} matches
- Favorite Opening: ${profile.favoriteOpening}
- Preferred Time Control: ${profile.preferredTimeControl}

Produce a personalized stand-up comedy roast report. Return a JSON object matching this exact schema:
{
  "overview": "Short 1-sentence funny overview of the player",
  "roastParagraphs": [
    "Paragraph 1 roasting ELO rating tier and bracket",
    "Paragraph 2 roasting favorite opening and opening knowledge/theory",
    "Paragraph 3 roasting win rate, wins vs losses, and draw patterns",
    "Paragraph 4 roasting typical blunder rate and tactical patterns",
    "Paragraph 5 roasting preferred time control and time management",
    "Paragraph 6 devastating final stand-up comedy punchline summary"
  ],
  "biggestStrength": "Witty backhanded compliment on their secret chess talent",
  "biggestWeakness": "Savage comedic observation on their fatal flaw",
  "improvementTips": [
    "Actionable chess tip 1 hidden inside humor",
    "Tip 2",
    "Tip 3"
  ],
  "roastScore": 8.7,
  "verdictBadge": "COOKED 🔥",
  "funniestQuote": "The single funniest one-liner roast sentence from your commentary"
}`;

  const rawJson = await callGitHubModel(systemPrompt, userPrompt, true);

  if (rawJson) {
    try {
      const data = JSON.parse(rawJson);
      
      const verdict: VerdictBadge = ['COOKED 🔥', 'CHARCOAL 💀', 'MEDIUM RARE 🥩', 'BEYOND SAVING ☢️', 'SUSPICIOUSLY GOOD 🤖'].includes(data.verdictBadge)
        ? data.verdictBadge
        : 'COOKED 🔥';

      return {
        overview: String(data.overview || `${profile.username} plays chess.`),
        playstyle: {
          aggression: Math.floor(Math.random() * 5) + 5,
          tacticalAwareness: Math.floor(Math.random() * 5) + 4,
          endgameQuality: Math.floor(Math.random() * 4) + 3
        },
        biggestStrength: String(data.biggestStrength || "Unshakeable confidence when pre-moving blunders."),
        biggestWeakness: String(data.biggestWeakness || "Allergic to calculating variations deeper than 1 ply."),
        roastParagraphs: Array.isArray(data.roastParagraphs) && data.roastParagraphs.length > 0
          ? data.roastParagraphs.map(String)
          : ["Your position collapsed faster than a house of cards in a wind tunnel."],
        improvementTips: Array.isArray(data.improvementTips) && data.improvementTips.length > 0
          ? data.improvementTips.map(String)
          : ["Try looking at the entire board before clicking a piece."],
        roastScore: Number(data.roastScore || 8.5),
        verdictBadge: verdict,
        funniestQuote: String(data.funniestQuote || "Stockfish reported suspicious activity.")
      };
    } catch (err) {
      console.warn("Failed to parse AI JSON report:", err);
    }
  }

  return getOfflineFallbackReport(profile);
}

function getOfflineFallbackReport(profile: PlayerProfile): RoastReport {
  return {
    overview: `Player @${profile.username} (${profile.currentRating} ELO).`,
    playstyle: { aggression: 5, tacticalAwareness: 5, endgameQuality: 5 },
    biggestStrength: "Waiting for AI connection.",
    biggestWeakness: "Missing GITHUB_TOKEN API key.",
    roastParagraphs: [
      `🤖 **AI Comedy Engine Offline**: We successfully fetched @${profile.username}'s live stats (${profile.currentRating} rating, ${profile.winRate}% win rate across ${profile.gamesPlayed} matches).`,
      "However, pure AI comedy generation requires an active GitHub Models API token.",
      "👉 **Quick Fix**: Create a `.env.local` file in the workspace and add your token to unlock GPT/Llama stand-up comedy models.",
      "Once configured, click Roast Me again. The models will generate unique custom roasts tailored to your openings and blunder rates.",
      "Without the API key, we fallback to this local rule-based warning message card, which is far too polite.",
      "Set your GITHUB_TOKEN inside your environment files to unlock Stockfish AI's full savage rating analysis!"
    ],
    improvementTips: [
      "Add GITHUB_TOKEN to .env.local to unlock pure Stockfish AI stand-up comedy.",
      "Check that your API key has access to Azure GitHub Models inference endpoints.",
      "Restart your dev server if needed."
    ],
    roastScore: 0,
    verdictBadge: 'MEDIUM RARE 🥩',
    funniestQuote: "Please set GITHUB_TOKEN in .env.local to unleash the roasts!"
  };
}
