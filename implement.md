# Chess Roaster - MVP Implementation Plan

## Project Vision

A fun chess website where users enter their Chess.com or Lichess username and receive an AI-generated roast based on their profile and games.

Unlike traditional chess analysis tools, the focus is entertainment first, improvement second.

The website should feel like:

"Spotify Wrapped + Chess Analysis + Stand-up Comedy"

---

# Core User Flow

## Step 1

User lands on homepage.

Select platform:

* Chess.com
* Lichess

Enter username.

Click:

"Roast Me"

---

## Step 2

Fetch profile data from selected platform.

Display:

* Username
* Rating
* Games Played
* Win Rate
* Favorite Opening
* Preferred Time Control

Generate:

### Overview

Short summary of player.

### Roast Report

Funny personalized roast.

### Improvement Report

Actionable advice hidden inside humor.

---

## Step 3

Fetch recent games.

Display as cards:

* Result
* Opening
* Accuracy (if available)
* Opponent
* Date

Each card contains:

"Roast This Game"

button.

---

## Step 4

User clicks a game.

System analyzes game.

Generate:

### Game Summary

Short explanation.

### Biggest Blunders

Most significant mistakes.

### Move Highlights

Funny comments on key moments.

### Final Verdict

Roast score from 1–10.

Example:

"Your queen left the board faster than users leave a website with no dark mode."

---

# Technical Stack

## Frontend

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* shadcn/ui

---

## Backend

Use Next.js API routes.

No separate Express server.

No NestJS.

No separate backend deployment.

---

## Database

No database initially.

Everything fetched live.

Optional future caching.

---

## Chess APIs

### Chess.com

Profile:
GET /player/{username}

Stats:
GET /player/{username}/stats

Archives:
GET /player/{username}/games/archives

Games:
Fetch PGN from archive URLs.

---

### Lichess

User:
GET /api/user/{username}

Games:
GET /api/games/user/{username}

---

# Chess Analysis Engine

## MVP

Use Stockfish locally.

Do not use LLMs for chess analysis.

Workflow:

PGN
→ Parse moves
→ Run Stockfish
→ Extract mistakes
→ Generate roast

Recommended libraries:

* chess.js
* stockfish npm package

---

# Roast Engine Architecture

Two modes.

## Mode A

GitHub Models

Used for testing.

Config value:

ROAST_MODE=github

Pipeline:

Facts
→ Prompt
→ GitHub Model
→ Roast

---

## Mode B

Rule-Based + AI Polishing

Config value:

ROAST_MODE=hybrid

Pipeline:

Facts
→ Rule Engine
→ Roast Fragments
→ AI Rewrites
→ Final Roast

---

# Rule Engine Design

Avoid repetitive roasts.

Never use:

if blunder > 10
return same joke

Instead:

Each category has many templates.

Example:

Blunder Templates:

* "Your queen disappeared like free food in a hostel."
* "That piece was hanging longer than your project deadlines."
* "Stockfish reported suspicious activity."

Random selection.

Combine multiple categories.

Result feels unique.

---

# Data Extraction

Profile Facts:

* Current rating
* Peak rating
* Win rate
* Favorite opening
* Total games
* Time control preference

Game Facts:

* Accuracy
* Blunders
* Mistakes
* Missed wins
* Biggest evaluation swing
* Opening played
* Move count

---

# Profile Roast Structure

## Overview

One paragraph.

## Playstyle Analysis

* Aggression
* Tactical awareness
* Endgame quality

## Biggest Strength

Positive observation.

## Biggest Weakness

Main issue.

## Roast Report

3-5 funny paragraphs.

## Improvement Tips

Actionable suggestions.

---

# Game Roast Structure

## Game Summary

What happened.

## Biggest Blunder

Most painful moment.

## Tactical Crimes

List of mistakes.

## Funny Commentary

Move-specific jokes.

## Final Verdict

Examples:

* Cooked
* Medium Rare
* Charcoal
* Beyond Saving

---

# Shareable Roast Card

Generate beautiful image.

Include:

* Username
* Rating
* Roast Score
* Funniest Roast
* Verdict Badge

Example:

VERDICT:
COOKED 🔥

Rating:
1087

Biggest Talent:
Turning winning positions into documentaries.

---

# Project Structure

app/

* page.tsx

api/

* roast-profile
* roast-game
* chesscom
* lichess

components/

* ProfileOverview
* RoastCard
* GameList
* GameRoastModal
* ShareCard

lib/

* chess
* stockfish
* roast-engine
* github-models
* prompts

config/

* roastMode.ts

---

# MVP Milestones

## Milestone 1

Homepage.

Platform selector.

Username input.

---

## Milestone 2

Fetch profile data.

Display overview.

---

## Milestone 3

Generate profile roast.

---

## Milestone 4

Fetch recent games.

Display list.

---

## Milestone 5

Analyze single game using Stockfish.

---

## Milestone 6

Generate game roast.

---

## Milestone 7

Generate shareable image card.

---

## Milestone 8

Polish UI and animations.

---

# Success Criteria

A user should:

1. Enter username.
2. Laugh within 10 seconds.
3. Share screenshot with friends.
4. Roast individual games.
5. Return with another username.

Entertainment first.
Chess improvement second.


# Architecture Update

## Chess Analysis Engine

### MVP

Do NOT use Stockfish WASM.

Reason:

* Mobile performance can be inconsistent.
* Analysis time depends on user's device.
* Difficult to guarantee a consistent experience.
* Future features become harder to scale.

### New Approach

Analysis runs on the server.

Workflow:

PGN
→ Backend Analysis Service
→ Extract Mistakes
→ Generate Facts
→ Roast Engine
→ Final Roast

---

## Analysis Provider

Use a pluggable architecture.

interface AnalysisProvider {
analyzeGame(pgn: string): AnalysisResult;
}

Implementations:

* MockAnalysisProvider (development)
* ExternalChessAnalysisProvider
* StockfishServerProvider (future)

This allows switching providers without changing UI logic.

---

## MVP Strategy

Phase 1:

* Fetch profile data
* Fetch game data
* Generate profile roast
* Generate game roast
* Use lightweight analysis/mocked analysis

Phase 2:

* Integrate real server-side chess analysis
* Detect blunders
* Detect missed mates
* Detect evaluation swings

Phase 3:

* Advanced analysis
* Opening recommendations
* Personalized improvement reports

---

## Updated Stack

Frontend:

* Next.js
* TypeScript
* Tailwind
* shadcn/ui

Backend:

* Next.js API Routes

Database:

* None

Analysis:

* External Analysis Provider (replaceable)

AI:

* GitHub Models
* Rule-Based + AI Polishing

Hosting:

* Vercel

---

## Design Principle

The frontend should never know how analysis is performed.

Frontend only calls:

POST /api/roast-profile

POST /api/roast-game

The backend decides whether to use:

* Mock analysis
* External provider
* Stockfish server
* Future provider

without requiring frontend changes.
