# Handoff Guide

## How To Edit Text
- Main content source: `clients/<client_id>/brief.md`
- Generated client spec: `clients/<client_id>/spec.json`
- Web app spec consumed by Next.js: `apps/web/src/data/spec.json`

Typical workflow:
1. Update `clients/<client_id>/brief.md`
2. Run generation in `apps/web`:
   - `CLIENT_ID=<client_id> npm run generate`
3. Validate:
   - `npm run lint`
   - `npm run build`

## How To Redeploy
1. Regenerate spec for the client (`npm run generate` with `CLIENT_ID`).
2. Commit and push changes.
3. Trigger deployment in your hosting provider (for example Vercel).
4. Update `deliveries/<client_id>/preview_url.txt` with the latest deployment URL.

## Where Files Are
- Client brief/spec: `clients/<client_id>/`
- Delivery package: `deliveries/<client_id>/`
- Website app: `apps/web/`
- Backend generators: `backend/`
- Utility scripts: `tools/`
