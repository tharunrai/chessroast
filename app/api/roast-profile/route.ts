import { NextRequest, NextResponse } from 'next/server';
import { PlayerProfile } from '@/lib/types';
import { generateAIProfileRoast } from '@/lib/roast/roastEngine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const profile: PlayerProfile = body.profile;

    if (!profile || !profile.username) {
      return NextResponse.json({ error: 'Valid player profile is required' }, { status: 400 });
    }

    // Generate hilarious roast report (Rule or AI Hybrid)
    const roast = await generateAIProfileRoast(profile);

    // Simulate slight calculation delay for comedic suspense (500ms)
    await new Promise(r => setTimeout(r, 500));

    return NextResponse.json({ roast });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error during roast generation';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
