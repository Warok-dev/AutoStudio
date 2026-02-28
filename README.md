# AutoStudio

AutoStudio is a multi-agent pipeline that transforms a structured client brief into a production-ready Next.js landing page (code + preview + QA checklist).  
The project is designed as a portfolio-grade system showcasing automation, software engineering practices, and end-to-end delivery workflows.

---

## Project Vision

AutoStudio simulates a real-world digital agency workflow by orchestrating multiple roles (Product, Design, Development, QA) into an automated website generation pipeline.

Goals:
- Reduce website production time
- Maintain quality and traceability
- Enable fast iterations through structured inputs and reproducible builds
- Standardize delivery workflows for client projects (e.g., Fiverr)

---

## How It Works (v1)

### Input
A structured client brief (`brief.md`) containing:
- Brand name and tagline
- Target audience
- Style preferences (colors, tone)
- Required sections (hero, features, FAQ, CTA, etc.)
- Content and assets references

### Processing
1. A Python pipeline parses the brief and generates a structured specification (`spec.json`)
2. The Next.js app renders the landing page from the specification
3. A QA checklist validates the output (manual + scriptable checks)
4. The site is deployed to Vercel to provide a preview link

### Output
- Production-ready Next.js landing page
- Public preview deployment (Vercel)
- QA checklist validation
- Delivery-ready project structure

---

## Tech Stack

- Next.js / React
- Node.js (project tooling)
- Python (brief parsing, spec generation, QA automation)
- Vercel (deployment)
- GitHub (versioning and CI-ready structure)

```

autostudio/
  briefs/                 # Raw client briefs (markdown input)
  specs/                  # Generated structured specifications (json)

  apps/
    web/                  # Next.js application (frontend)

  backend/
    core/                 # Parsing and spec generation logic
    qa/                   # QA and validation modules
    utils/                # Shared utilities
    main.py               # Entry point (CLI)

  scripts/                # Automation wrappers (optional)

  docs/
    architecture.md
    decisions.md
    qa_checklist.md

```

## v1 Scope (MVP)

- Single landing page generation
- Manual brief input (`brief.md`)
- Python-based Brief -> Spec generation
- Spec-based rendering in Next.js
- Vercel preview deployment
- QA checklist documentation

---

## Roadmap

### v2
- Multi-page support (Home / About / Contact)
- Improved brief parsing and validation (Python)
- Reusable UI components library
- Automated checks (lint, link checks, basic SEO rules)

### v3
- Client portal (submit brief, upload assets, track status)
- Multi-agent orchestration logic (task planning, role outputs)
- Automated testing and performance scoring (Lighthouse, accessibility)
- Template marketplace (multiple landing page styles)

---

## Why This Project Matters

AutoStudio demonstrates skills relevant to Computer Engineering and software internships:
- End-to-end system design (input -> processing -> output -> deployment)
- Automation and reproducible pipelines
- Frontend architecture with Next.js
- Python tooling for parsing, validation, and QA workflows
- Deployment and delivery practices used in real production environments

---

## Author

Built by Ahouzi Mohammed  
Computer Engineering 
