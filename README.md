# AutoStudio

AI-powered client website generator pipeline built for freelancers running a Fiverr-style delivery workflow. AutoStudio converts structured client intake into a landing-page spec, renders it in a Next.js frontend, and packages delivery assets for handoff.

## Live Demo

[View the deployed Vercel demo](https://auto-studio-two.vercel.app/)

## Overview

This project models a practical freelance automation pipeline:

- collect a client brief from form data or a manual markdown brief
- transform the brief into a structured website spec with Python
- render the spec into a reusable client-facing website
- generate handoff assets for delivery, QA, and preview sharing

It is designed as a portfolio-quality systems project: clear orchestration, deterministic outputs, and a workflow that maps directly to real client work.

## Key Features

- End-to-end pipeline from intake to delivery with `tools/run_pipeline.py`
- Structured client workspaces in `clients/<client_id>/`
- Spec-driven website rendering with Next.js, React, and TypeScript
- Delivery packaging with QA checklist, handoff notes, preview URL, and summary
- Reusable workflow for multiple freelance clients and repeatable gigs

## Architecture

```text
Client Intake
  Fiverr order / form response / manual brief
                |
                v
      tools/form_to_brief.py
                |
                v
      clients/<client_id>/brief.md
                |
                v
          backend/main.py
   brief parser + spec generator
                |
                v
      clients/<client_id>/spec.json
                |
                v
 apps/web/src/data/spec.json
                |
                v
       Next.js website renderer
                |
                v
     tools/make_delivery.py
                |
                v
      deliveries/<client_id>/
```

## Tech Stack

- Python 3.11+: pipeline orchestration, brief parsing, spec generation, delivery packaging
- Next.js 16
- React 19
- TypeScript 5
- Tailwind CSS 4
- Node.js 20+ and npm

## Setup

```bash
git clone <repo-url>
cd AutoStudio

cd apps/web
npm install
cd ../..
```

Run the sample pipeline:

```bash
python tools/run_pipeline.py --client pulsedesk --form tools/sample_form_response.json --preview https://example.vercel.app
```

## Environment Variables

The core local pipeline does not require secrets.

| Variable | Required | Purpose |
| --- | --- | --- |
| `CLIENT_ID` | No | Used by `apps/web/scripts/generate-spec.mjs` to select which client brief/spec to compile |
| `NODE_ENV` | No | Standard Next.js runtime/build mode |

Example:

```bash
CLIENT_ID=pulsedesk
```

## Usage

1. Client intake: receive a Fiverr order, export form data, or prepare a manual `brief.md`.
2. Generation: run `python tools/run_pipeline.py --client <client_id> --form <form.json> --preview <preview_url>`.
3. Review: inspect the generated spec in `clients/<client_id>/spec.json` and build output in `apps/web`.
4. Delivery: send the packaged files in `deliveries/<client_id>/` plus the live preview link to the client.

## Scripts

- `python tools/run_pipeline.py --client <id> --form <json> --preview <url>`: run the full intake-to-delivery pipeline
- `python tools/form_to_brief.py --in <json> --out clients/<id>/brief.md`: convert form data into a normalized brief
- `python backend/main.py clients/<id>/brief.md --out clients/<id>/spec.json`: generate a website spec from the brief
- `python tools/make_delivery.py --client <id> --preview <url>`: create delivery artifacts
- `npm run dev` in `apps/web`: start the local frontend
- `npm run generate` in `apps/web`: regenerate `src/data/spec.json` from a client brief using `CLIENT_ID`
- `npm run build` in `apps/web`: production build
- `npm run start` in `apps/web`: serve the production build
- `npm run lint` in `apps/web`: lint the frontend

## Roadmap

- Plug in LLM providers for richer copy generation and layout variation
- Add automated visual QA for desktop and mobile screenshots
- Support multi-page site generation from one client brief
- Add CI/CD for preview deployment and packaged delivery automation

## License

MIT License. See `LICENSE`.
