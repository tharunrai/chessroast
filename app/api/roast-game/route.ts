import { NextRequest, NextResponse } from 'next/server';
import { MockAnalysisProvider } from '@/lib/analysis/MockAnalysisProvider';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pgn, playerColor = 'white', opponentName = 'Opponent' } = body;

    const provider = new MockAnalysisProvider();
    const analysis = await provider.analyzeGame(pgn || '', playerColor, opponentName);

    // Simulate analysis engine crunching moves
    await new Promise(r => setTimeout(r, 600));

    return NextResponse.json({ analysis });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error during game analysis';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
