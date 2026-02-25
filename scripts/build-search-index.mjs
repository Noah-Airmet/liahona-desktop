import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, "..", "content");
const OUTPUT = path.join(__dirname, "..", "src", "lib", "search-index.json");

const VOLUME_ORDER = [
  "old-testament",
  "new-testament",
  "book-of-mormon",
  "doctrine-and-covenants",
  "pearl-of-great-price",
];

const chapters = [];

for (const volumeId of VOLUME_ORDER) {
  const volumeDir = path.join(CONTENT_DIR, volumeId);
  if (!fs.existsSync(volumeDir)) continue;

  const bookDirs = fs.readdirSync(volumeDir, { withFileTypes: true });
  for (const bookDir of bookDirs) {
    if (!bookDir.isDirectory()) continue;
    const bookPath = path.join(volumeDir, bookDir.name);
    const files = fs.readdirSync(bookPath).filter((f) => f.endsWith(".md"));

    for (const file of files) {
      const raw = fs.readFileSync(path.join(bookPath, file), "utf-8");

      // Parse frontmatter manually (avoid gray-matter ESM issues)
      const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)/);
      if (!fmMatch) continue;

      const fm = fmMatch[1];
      const content = fmMatch[2];

      const title = fm.match(/title:\s*"(.+)"/)?.[1] || "";
      const chapterNum = fm.match(/chapter:\s*(\d+)/)?.[1] || "";

      // Strip HTML tags and take first 300 chars for preview
      const plainContent = content
        .replace(/<sup>\d+<\/sup>\s*/g, "")
        .replace(/<[^>]+>/g, "")
        .trim()
        .substring(0, 300);

      chapters.push({
        title,
        slug: `${volumeId}/${bookDir.name}/${chapterNum}`,
        volume: volumeId,
        content: plainContent,
      });
    }
  }
}

fs.writeFileSync(OUTPUT, JSON.stringify(chapters));
console.log(`Search index built: ${chapters.length} chapters`);
