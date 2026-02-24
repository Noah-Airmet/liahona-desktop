---
project: Liahona
status: planning
phase: MVP
---

# 🚀 Project: Liahona, an LDS Logos Alternative (MVP)

## 🎯 Core Objective
Build a simple, Markdown-based scripture study app that side-by-side links the standard LDS canon with external commentaries, apologetics (FAIR, BYU RSC), and alternative translations. 

## 🏗️ 1. App Architecture (The Viewer)
- [ ] **UI Layout:** Split-pane web interface (Left: Primary Scripture, Right: Linked Resources/Commentary).
- [ ] **Engine:** Set up a static site generator (e.g., Next.js, Astro, or Nuxt) to render local Markdown files.
- [ ] **Search:** Implement basic client-side fuzzy search (e.g., Fuse.js) across the Markdown directory.
- [ ] **Routing:** Establish a predictable URL structure based on scripture references (e.g., `/bofm/1-ne/1`).

## 🗄️ 2. Data Ingestion (The Content)
- [ ] **Core Text:** Find an existing JSON/XML repository of the LDS Quad and write a script to convert it into individual `.md` chapter files.
- [ ] **Alternative Text:** Import one public domain Bible translation (e.g., WEB or ASV) to test side-by-side comparison.
- [ ] **External Resource:** Pick *one* structured web source (e.g., BYU RSC articles or a single volume of the Interpreter) and successfully scrape it.
- [ ] **Metadata:** Finalize the YAML frontmatter schema to ensure resources can actually link to specific verses.

## 🤖 3. AI Tooling Strategy
- [ ] **Web Scraping:** Feed target HTML snippets into Cursor/Claude to generate Python (BeautifulSoup) extraction scripts.
- [ ] **Data Cleaning:** Use AI to write complex Regex scripts for standardizing footnotes and fixing OCR artifacts.
- [ ] **Auto-Tagging:** Set up an LLM API script to read a scraped article and automatically generate the `scripture_tags` for the frontmatter.
- [ ] **PDFs (Phase 2 Prep):** Research LlamaParse or Marker for future complex document ingestion (Do *not* use raw LLMs for large PDFs).

## 🗺️ Immediate Next Steps
1. Define the exact YAML frontmatter schema.
2. Locate a clean data source for the standard works.
3. Pick the first specific external website to build a scraper for.