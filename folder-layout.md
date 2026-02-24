lds-study-engine/
├── app/                      # Next.js App Router (Pages & Routing)
│   ├── layout.tsx            # Global layout wrapper
│   ├── page.tsx              # Your main home page
│   └── globals.css           # Your CSS with the glass background mesh
├── components/               # 🧩 ALL your React components live here
│   ├── ui/                   # -> The "Primitives" (AI uses these, doesn't change them)
│   │   ├── LiquidButton.tsx
│   │   └── GlassPane.tsx
│   └── features/             # -> The "App Logic" (Where the AI does the heavy lifting)
│       ├── SplitViewer.tsx
│       └── MarkdownRenderer.tsx
├── content/                  # 📚 Your actual data (The Markdown files)
│   ├── standard-works/
│   │   └── bofm/1-ne/1.md
│   └── commentaries/
│       └── fair-2-ne-2.md
├── lib/                      # Utility functions and scripts
│   └── markdownParser.ts     # The script that reads your .md and YAML
├── tailwind.config.ts        # Your locked-in design tokens
└── AI_INSTRUCTIONS.md        # The master rulebook for Cursor/Claude