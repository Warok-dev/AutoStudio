# AutoStudio

AutoStudio is a client website generation pipeline that converts structured input into a production-ready landing page.

Core flow:
1. Brief data is collected (manual brief or form JSON).
2. Python tools generate a normalized `spec.json`.
3. The Next.js app renders the landing page from that spec.
4. Delivery artifacts are generated for handoff.

## What AutoStudio Is

AutoStudio turns:
- `brief.md` -> `spec.json` -> landing page

It is built for repeatable client work with clear outputs:
- Client-specific brief and spec
- Build-ready web app data
- Delivery package (`qa_checklist`, `handoff`, `preview_url`, `summary`)

## How To Generate A Client Site

Run the full pipeline from repo root:

```bash
python tools/run_pipeline.py --client pulsedesk --form tools/sample_form_response.json
```

This executes:
1. Form JSON -> `clients/<client>/brief.md`
2. Brief -> `clients/<client>/spec.json`
3. Copy spec -> `apps/web/src/data/spec.json`
4. Next.js build in `apps/web`
5. Delivery generation in `deliveries/<client>/`

### Manual Commands (optional)

```bash
# Form -> brief
python tools/form_to_brief.py --in tools/sample_form_response.json --out clients/pulsedesk/brief.md

# Brief -> spec
python backend/main.py clients/pulsedesk/brief.md --out clients/pulsedesk/spec.json

# Build web app
cd apps/web
npm run build

# Generate delivery package
cd ../..
python tools/make_delivery.py --client pulsedesk --preview https://example.vercel.app
```

## Folder Structure

```text
AutoStudio/
|-- clients/
|   |-- <client_id>/
|   |   |-- brief.md
|   |   `-- spec.json
|-- deliveries/
|   |-- _templates/
|   `-- <client_id>/
|-- backend/
|   |-- core/
|   `-- main.py
|-- apps/
|   `-- web/
|       `-- src/data/spec.json
`-- tools/
    |-- form_to_brief.py
    |-- make_delivery.py
    `-- run_pipeline.py
```

## Screenshots

Add project visuals here for portfolio presentation:

- `docs/screenshots/01-form-input.png` - Form or input JSON
- `docs/screenshots/02-generated-landing.png` - Final landing page
- `docs/screenshots/03-delivery-folder.png` - Delivery package contents

## Fiverr Workflow

1. Client places order and sends requirements.
2. Requirements are captured via Google Form export JSON.
3. Run one command:
   - `python tools/run_pipeline.py --client <client_id> --form <form_json_path>`
4. AutoStudio builds the site and prepares delivery files.
5. Share preview URL and delivery package with the client.

## Tech Stack

- Python: parsing, generation, orchestration, delivery automation
- Next.js: spec-driven landing page rendering
- Vercel: deployment and preview hosting
