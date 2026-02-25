import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const BASE_DIR = '/Users/nairmet/development/liahona-desktop';
const JSON_DIR = join(BASE_DIR, 'data/json');
const CONTENT_DIR = join(BASE_DIR, 'content');

// Convert book name to URL-friendly slug
function slugify(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-');
}

let totalFiles = 0;

// Process standard volumes (Book of Mormon, Pearl of Great Price, Old Testament, New Testament)
function processStandardVolume(filename, volumeSlug) {
  const data = JSON.parse(readFileSync(join(JSON_DIR, filename), 'utf-8'));
  let count = 0;

  for (const book of data.books) {
    const bookSlug = slugify(book.book);
    const bookDir = join(CONTENT_DIR, volumeSlug, bookSlug);
    mkdirSync(bookDir, { recursive: true });

    for (const chapter of book.chapters) {
      const versesText = chapter.verses
        .map((v) => `<sup>${v.verse}</sup> ${v.text}`)
        .join('\n\n');

      const slug = `${bookSlug}/${chapter.chapter}`;

      const md = `---
title: "${chapter.reference}"
book: "${book.book}"
chapter: ${chapter.chapter}
volume: "${volumeSlug}"
slug: "${slug}"
verses_count: ${chapter.verses.length}
---

${versesText}
`;

      writeFileSync(join(bookDir, `${chapter.chapter}.md`), md);
      count++;
    }
  }

  return count;
}

// Process Doctrine and Covenants (different JSON structure)
function processDnC() {
  const data = JSON.parse(readFileSync(join(JSON_DIR, 'doctrine-and-covenants.json'), 'utf-8'));
  const volumeSlug = 'doctrine-and-covenants';
  const sectionDir = join(CONTENT_DIR, volumeSlug, 'sections');
  mkdirSync(sectionDir, { recursive: true });
  let count = 0;

  for (const section of data.sections) {
    const versesText = section.verses
      .map((v) => `<sup>${v.verse}</sup> ${v.text}`)
      .join('\n\n');

    const slug = `sections/${section.section}`;

    const md = `---
title: "${section.reference}"
book: "Doctrine and Covenants"
chapter: ${section.section}
volume: "${volumeSlug}"
slug: "${slug}"
verses_count: ${section.verses.length}
---

${versesText}
`;

    writeFileSync(join(sectionDir, `${section.section}.md`), md);
    count++;
  }

  return count;
}

// Run all conversions
const volumes = [
  ['book-of-mormon.json', 'book-of-mormon'],
  ['pearl-of-great-price.json', 'pearl-of-great-price'],
  ['old-testament.json', 'old-testament'],
  ['new-testament.json', 'new-testament'],
];

for (const [file, slug] of volumes) {
  const count = processStandardVolume(file, slug);
  console.log(`${slug}: ${count} files`);
  totalFiles += count;
}

const dncCount = processDnC();
console.log(`doctrine-and-covenants: ${dncCount} files`);
totalFiles += dncCount;

console.log(`\nTotal files created: ${totalFiles}`);
