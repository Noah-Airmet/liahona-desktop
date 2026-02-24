# Product Requirements Document (PRD)

**Project Name:** "Liahona" (Working Title)
**Document Owner:** Noah & Sid
**Phase:** Minimum Viable Product (MVP)
**Status:** Draft

## 1. Product Overview

### 1.1 Problem Statement

The official Gospel Library app excels at standard, sequential scripture reading but lacks advanced features for deep-dive scholarship. Users cannot view original languages side-by-side, nor can they seamlessly cross-reference scriptures with apologetic resources (FAIR, BYU RSC), comprehensive commentaries, or alternative Bible translations.

### 1.2 Proposed Solution

A lightweight, web-based study engine powered entirely by a local directory of Markdown files. By utilizing YAML frontmatter, the app will programmatically link core canonical texts with thousands of external resources, displayed in a split-pane UI for parallel study.

## 2. Target Audience & Scope

* **Audience:** Internal personal use only (bypassing copyright and licensing restrictions for proprietary materials).
* **Scope:** This MVP focuses strictly on proving the data architecture (Markdown + YAML) and the core split-pane reading experience. Complex data ingestion (like parsing OCR'd PDFs) is deferred to later phases.

## 3. Core MVP Features

### 3.1 Split-Pane Reading Interface

* **Left Pane (Primary Text):** Displays the core canonical text (e.g., Book of Mormon, KJV). Includes next/previous chapter navigation.
* **Right Pane (Supplemental Text):** Displays linked resources corresponding to the currently viewed chapter or verse. Users can toggle between alternative translations, commentaries, or articles.
* **Sync Scrolling (Optional but desired):** Scrolling the primary text highlights or aligns the relevant commentary in the right pane.

### 3.2 Markdown Rendering Engine

* The web app must fetch and render `.md` files dynamically or via a static site generator (e.g., Next.js, Astro).
* Must parse YAML frontmatter to extract metadata (`title`, `author`, `scripture_tags`) to build the relational database/graph of how documents connect.

### 3.3 Search & Navigation

* **Fuzzy Search:** Implementation of a fast, client-side search (e.g., Fuse.js) across the Markdown directory.
* **Hierarchical Navigation:** A simple sidebar or dropdown menu mimicking the standard works tree (e.g., *Book of Mormon -> 1 Nephi -> Chapter 1*).

## 4. Data Architecture & Ingestion Requirements

The MVP data pipeline will establish the blueprint for the larger "moonshot" ingestion.

* **Standard Works:** Convert an existing open-source JSON/XML repository of the LDS standard works into individual chapter-level `.md` files.
* **Alternative Bible:** Ingest one public domain translation (e.g., WEB or ASV).
* **Web Scraper Pipeline:** Build a Python/BeautifulSoup script (aided by AI code-generation) to scrape one target source (e.g., a specific volume of the Interpreter or a subset of BYU RSC articles).
* **Auto-Tagging:** Script an LLM API workflow to read the scraped articles and output an array of scripture references to be injected into the file's YAML frontmatter.

## 5. Non-Functional Requirements

* **Portability:** All data must remain in flat Markdown files so the database is essentially just a file system, allowing for easy Git version control.
* **Performance:** The app should load quickly, leveraging static generation where possible to avoid heavy database queries.
* **Security:** Since the app involves rendering generated HTML from Markdown (and potentially from scraped web sources), inputs must be strictly sanitized to prevent XSS vulnerabilities, ensuring the local web app remains secure.

## 6. Out of Scope (Future Phases)

* **PDF Ingestion:** Parsing out-of-print books or scanned journals (Requires dedicated OCR tooling like Marker/LlamaParse).
* **User Accounts & Cloud Syncing:** The MVP will run locally or be hosted as a simple static site for the two developers.
* **Mobile Native Application:** The focus is on a responsive web app first.

---

Would you like to draft that YAML frontmatter schema next, so we can define exactly how the web app will know that a specific FAIR article should appear in the right pane when you navigate to 2 Nephi 2?