# Cosmetics Shop Monorepo

Server: Express (ESM) + MongoDB (Mongoose)
Client: Next.js 14 (Pages) + React Query + Tailwind

## Getting Started

1) Server

```
cd server
cp .env.example .env # or set MONGO_URI, PORT
npm i
npm run dev
```

2) Client

```
cd client
export NEXT_PUBLIC_API_BASE=http://localhost:4000/api
npm i
npm run dev
```

Open http://localhost:3000

## Notes
- Coding: JavaScript only, no TypeScript
- Formatting: Prettier, no semicolons, width 120
- Layout: Public and Admin as per AGENTS.md
- Alerts: build dialog-based hooks later (no window.alert)
