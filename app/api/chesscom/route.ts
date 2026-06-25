import { NextRequest, NextResponse } from 'next/server';
import { ChessGame, PlayerProfile } from '@/lib/types';

const HEADERS = {
  'User-Agent': 'ChessRoasterMVP (contact: dev@chessroaster.app)'
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username')?.trim().toLowerCase();

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  try {
    // 1. Fetch profile
    const profileRes = await fetch(`https://api.chess.com/pub/player/${username}`, { headers: HEADERS });
    if (!profileRes.ok) {
      if (profileRes.status === 404) {
        return NextResponse.json({ error: `Player '${username}' not found on Chess.com` }, { status: 404 });
      }
      throw new Error(`Chess.com profile API error: ${profileRes.statusText}`);
    }
    const profileData = await fetchJsonSafe(profileRes);

    // 2. Fetch stats
    const statsRes = await fetch(`https://api.chess.com/pub/player/${username}/stats`, { headers: HEADERS });
    const statsData = statsRes.ok ? await fetchJsonSafe(statsRes) : {};

    // Calculate ratings & win rates
    const rapid = statsData.chess_rapid || {};
    const blitz = statsData.chess_blitz || {};
    const bullet = statsData.chess_bullet || {};

    // Pick main mode
    const mainStats = rapid.record || blitz.record || bullet.record || { win: 10, loss: 10, draw: 2 };
    const wins = mainStats.win || 0;
    const losses = mainStats.loss || 0;
    const draws = mainStats.draw || 0;
    const gamesPlayed = wins + losses + draws || 1;
    const winRate = Number(((wins / gamesPlayed) * 100).toFixed(1));

    const currentRating = rapid.last?.rating || blitz.last?.rating || bullet.last?.rating || 1200;
    const peakRating = rapid.best?.rating || blitz.best?.rating || bullet.best?.rating || currentRating;

    let preferredTimeControl = 'Rapid (10 min)';
    if (blitz.record && (blitz.record.win + blitz.record.loss > (rapid.record?.win || 0))) {
      preferredTimeControl = 'Blitz (3 min)';
    } else if (bullet.record && (bullet.record.win + bullet.record.loss > (rapid.record?.win || 0))) {
      preferredTimeControl = 'Bullet (1 min) ☕';
    }

    // 3. Fetch archives
    const archivesRes = await fetch(`https://api.chess.com/pub/player/${username}/games/archives`, { headers: HEADERS });
    let recentGames: ChessGame[] = [];
    let favoriteOpening = 'Italian Game';

    if (archivesRes.ok) {
      const archivesData = await fetchJsonSafe(archivesRes);
      const archiveUrls: string[] = archivesData.archives || [];

      if (archiveUrls.length > 0) {
        const latestUrl = archiveUrls[archiveUrls.length - 1];
        const gamesRes = await fetch(latestUrl, { headers: HEADERS });
        if (gamesRes.ok) {
          const gamesObj = await fetchJsonSafe(gamesRes);
          const rawGames: Array<Record<string, unknown>> = gamesObj.games || [];

          // Take last 8 games
          const lastGames = rawGames.slice(-8).reverse();

          const openingCounts: Record<string, number> = {};

          recentGames = lastGames.map((g, idx) => {
            const whiteObj = (g.white as Record<string, unknown>) || {};
            const blackObj = (g.black as Record<string, unknown>) || {};
            
            const isWhite = String(whiteObj.username || '').toLowerCase() === username;
            const playerObj = isWhite ? whiteObj : blackObj;
            const opponentObj = isWhite ? blackObj : whiteObj;

            const playerRating = Number(playerObj.rating || currentRating);
            const opponentRating = Number(opponentObj.rating || currentRating);
            const opponentName = String(opponentObj.username || 'Anonymous');

            const playerResult = String(playerObj.result || '');
            let result: 'win' | 'loss' | 'draw' = 'draw';
            if (playerResult === 'win') result = 'win';
            else if (['checkmated', 'timeout', 'resigned', 'abandoned'].includes(playerResult)) result = 'loss';

            // Extract opening from PGN or ECO URL
            const pgnStr = String(g.pgn || '');
            let openingName = 'Van' + ' Geet / Custom Opening';
            const ecoMatch = pgnStr.match(/\[ECOUrl ".*\/openings\/(.*?)"\]/);
            if (ecoMatch && ecoMatch[1]) {
              openingName = ecoMatch[1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            } else if (pgnStr.includes("Sicilian")) openingName = "Sicilian Defense";
            else if (pgnStr.includes("Queen's Gambit")) openingName = "Queen's Gambit";
            else if (pgnStr.includes("King's Indian")) openingName = "King's Indian";
            else if (pgnStr.includes("Caro-Kann")) openingName = "Caro-Kann";
            else if (pgnStr.includes("French")) openingName = "French Defense";
            else if (pgnStr.includes("London")) openingName = "London System";

            openingCounts[openingName] = (openingCounts[openingName] || 0) + 1;

            const accuracies = (g.accuracies as Record<string, number>) || {};
            const acc = isWhite ? accuracies.white : accuracies.black;

            const endTime = Number(g.end_time || Math.floor(Date.now() / 1000));
            const dateStr = new Date(endTime * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

            return {
              id: `cc_${endTime}_${idx}`,
              pgn: pgnStr,
              result,
              playerColor: isWhite ? 'white' : 'black',
              opening: openingName,
              accuracy: acc ? Number(acc.toFixed(1)) : undefined,
              opponentName,
              opponentRating,
              playerRating,
              date: dateStr,
              url: String(g.url || '')
            };
          });

          // Determine favorite opening
          let maxCount = 0;
          Object.entries(openingCounts).forEach(([name, count]) => {
            if (count > maxCount) {
              maxCount = count;
              favoriteOpening = name;
            }
          });
        }
      }
    }

    const profile: PlayerProfile = {
      username: profileData.username || username,
      platform: 'chesscom',
      avatar: profileData.avatar,
      title: profileData.title,
      currentRating,
      peakRating,
      gamesPlayed: gamesPlayed > 0 ? gamesPlayed : recentGames.length,
      wins,
      losses,
      draws,
      winRate,
      favoriteOpening,
      preferredTimeControl
    };

    return NextResponse.json({ profile, games: recentGames });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown server error';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

async function fetchJsonSafe(res: Response) {
  try {
    return await res.json();
  } catch {
    return {};
  }
}
