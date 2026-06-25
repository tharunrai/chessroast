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
    // 1. Fetch user profile
    const userRes = await fetch(`https://lichess.org/api/user/${username}`, { headers: HEADERS });
    if (!userRes.ok) {
      if (userRes.status === 404) {
        return NextResponse.json({ error: `Player '${username}' not found on Lichess` }, { status: 404 });
      }
      throw new Error(`Lichess user API error: ${userRes.statusText}`);
    }
    const userData = await userRes.json();

    const perfs = userData.perfs || {};
    const count = userData.count || { all: 10, win: 5, loss: 4, draw: 1 };
    
    const wins = count.win || 0;
    const losses = count.loss || 0;
    const draws = count.draw || 0;
    const gamesPlayed = count.all || (wins + losses + draws) || 1;
    const winRate = Number(((wins / gamesPlayed) * 100).toFixed(1));

    const rapid = perfs.rapid || {};
    const blitz = perfs.blitz || {};
    const bullet = perfs.bullet || {};

    const currentRating = rapid.rating || blitz.rating || bullet.rating || 1500;
    const peakRating = rapid.rating || currentRating;

    let preferredTimeControl = 'Rapid (10+0)';
    if ((blitz.games || 0) > (rapid.games || 0)) {
      preferredTimeControl = 'Blitz (3+0)';
    } else if ((bullet.games || 0) > (rapid.games || 0)) {
      preferredTimeControl = 'Bullet (1+0) Berserk 🔥';
    }

    // 2. Fetch recent games NDJSON
    const gamesRes = await fetch(`https://lichess.org/api/games/user/${username}?max=8&opening=true`, {
      headers: {
        ...HEADERS,
        'Accept': 'application/x-ndjson'
      }
    });

    const recentGames: ChessGame[] = [];
    const openingCounts: Record<string, number> = {};
    let favoriteOpening = 'Queen\'s Pawn Game';

    if (gamesRes.ok) {
      const text = await gamesRes.text();
      const lines = text.split('\n').filter(l => l.trim().length > 0);

      lines.forEach((line, idx) => {
        try {
          const g = JSON.parse(line);
          const players = g.players || {};
          const whiteObj = players.white || {};
          const blackObj = players.black || {};

          const whiteUser = (whiteObj.user?.name || whiteObj.user?.id || '').toLowerCase();
          const isWhite = whiteUser === username;

          const playerObj = isWhite ? whiteObj : blackObj;
          const opponentObj = isWhite ? blackObj : whiteObj;

          const playerRating = Number(playerObj.rating || currentRating);
          const opponentRating = Number(opponentObj.rating || currentRating);
          const opponentName = opponentObj.user?.name || 'Anonymous';

          const winner = g.winner; // 'white' | 'black' | undefined
          let result: 'win' | 'loss' | 'draw' = 'draw';
          if (!winner) result = 'draw';
          else if ((winner === 'white' && isWhite) || (winner === 'black' && !isWhite)) result = 'win';
          else result = 'loss';

          const openingObj = g.opening || {};
          const openingName = openingObj.name || 'Lichess Mystery Opening';
          openingCounts[openingName] = (openingCounts[openingName] || 0) + 1;

          const createdAt = Number(g.createdAt || Date.now());
          const dateStr = new Date(createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

          const pgnStr = g.moves || '';

          recentGames.push({
            id: `li_${g.id || idx}`,
            pgn: pgnStr,
            result,
            playerColor: isWhite ? 'white' : 'black',
            opening: openingName,
            opponentName,
            opponentRating,
            playerRating,
            date: dateStr,
            url: `https://lichess.org/${g.id}`
          });
        } catch {
          // ignore malformed NDJSON line
        }
      });

      let maxCount = 0;
      Object.entries(openingCounts).forEach(([name, count]) => {
        if (count > maxCount) {
          maxCount = count;
          favoriteOpening = name;
        }
      });
    }

    const profile: PlayerProfile = {
      username: userData.username || username,
      platform: 'lichess',
      avatar: undefined,
      title: userData.title,
      currentRating,
      peakRating,
      gamesPlayed,
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
