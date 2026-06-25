export type RoastMode = 'rule' | 'github' | 'hybrid';

export function getRoastMode(): RoastMode {
  const mode = process.env.ROAST_MODE?.toLowerCase();
  if (mode === 'github' || mode === 'hybrid' || mode === 'rule') {
    return mode;
  }
  // If GITHUB_TOKEN is present, default to hybrid, else rule
  return process.env.GITHUB_TOKEN ? 'hybrid' : 'rule';
}
