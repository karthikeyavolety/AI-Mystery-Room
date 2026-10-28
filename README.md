# AI Mystery

An AI-powered fictional investigation platform. Players submit a scenario, inspect a generated case file, track evidence and notes, and make one final accusation. The canonical solution stays on the server until the case is complete.

## Stack

- React 18, Vite, React Router
- Node.js, Express, Mongoose, MongoDB
- Google Gemini through a server-side provider adapter
- Cookie-based sessions stored in MongoDB

## Requirements

- Node.js 20 or later
- MongoDB 7 or a compatible MongoDB service
- A Google Gemini API key for mystery generation

## Run locally

1. Copy `server/.env.example` to `server/.env` and set a long random `SESSION_SECRET`, `MONGODB_URI`, and `GEMINI_API_KEY`.
2. Install dependencies from the repository root: `npm install`.
3. Start the API and frontend: `npm run dev`.
4. Open `http://localhost:5173`.

The API listens on port 4000. `GEMINI_MODEL` selects the server-side text model. If the Gemini key is absent, generation records an explicit failure and the case remains unplayable; no fake case is shown as successfully generated.

## Commands

- `npm run dev` — run both applications
- `npm run build` — create the frontend production build
- `npm start` — start the API server

## Product flow

Create an account, submit a scenario, wait for its generation job, inspect the briefing and evidence, record notes, then submit one final accusation. The API enforces ownership and completion rules. Solution fields are excluded from ordinary case reads and only selected after an accusation has been recorded.

## Configuration

See `server/.env.example` for the environment variables. In production, set `NODE_ENV=production`, use HTTPS, provide a strong session secret, and configure an allowed `CLIENT_ORIGIN`. MongoDB must be reachable by both Express and the session store.

## Current implementation notes

Generation uses Gemini JSON output and validates required fields plus suspect/evidence references before marking a mystery ready. Image and audio evidence currently appear as text descriptions or transcripts; actual media generation and private object storage are not configured in this initial project scaffold. A durable background queue, administrator tools, account preferences UI, cancellation, and separate normalized collection models remain deployment milestones.
