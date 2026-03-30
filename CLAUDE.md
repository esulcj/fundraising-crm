# Fundraising CRM — Build Rules

## Stack
- Frontend: Static HTML/CSS/JS on CF Pages. ES5 only. No frameworks.
- Backend: Cloudflare Workers with D1 binding
- AI: Anthropic Claude API called from Workers (not OpenClaw)
- Auth: CF Access on all routes

## Design
- Light theme ONLY. White bg, grey accents.
- System font stack
- Müller-Brockmann grid, type scale: 42/22/16/14/13/12/11px
- Max-width 960px centered content
- Mobile-first for card processing and briefings (375px)

## Deploy
- Pages: scripts/deploy-pages.sh ONLY. Never wrangler directly. Never share pages.dev URLs.
- Workers: wrangler deploy
- Secrets: wrangler secret put ANTHROPIC_API_KEY

## Existing D1
- Database ID: 201918c4-0b3c-4084-abcb-50ed0b1979ac
- Existing tables: investors, contacts, interactions, actions, materials, dd_items
- DO NOT drop existing tables. Extend them.

## Rules
- All data in D1, not files
- Agent configs editable from UI
- Agent calls must stream, never block on full response
- Error states explicit in UI (skeleton, retry, error banner)
- ES5 JavaScript: var, function expressions, no arrows/const/let
