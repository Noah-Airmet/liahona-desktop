import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Volume, BookMeta, ChapterData, NavigationItem } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

const VOLUME_TITLES: Record<string, string> = {
  "book-of-mormon": "Book of Mormon",
  "doctrine-and-covenants": "Doctrine and Covenants",
  "pearl-of-great-price": "Pearl of Great Price",
  "old-testament": "Old Testament",
  "new-testament": "New Testament",
};

const VOLUME_ORDER = [
  "old-testament",
  "new-testament",
  "book-of-mormon",
  "doctrine-and-covenants",
  "pearl-of-great-price",
];

export const getVolumes = (): Volume[] => {
  return VOLUME_ORDER.map((volumeId) => ({
    id: volumeId,
    title: VOLUME_TITLES[volumeId],
    books: getBooksForVolume(volumeId),
  }));
};

export const getBooksForVolume = (volumeId: string): BookMeta[] => {
  const volumeDir = path.join(CONTENT_DIR, volumeId);
  if (!fs.existsSync(volumeDir)) return [];

  const entries = fs.readdirSync(volumeDir, { withFileTypes: true });
  const books: BookMeta[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const bookDir = path.join(volumeDir, entry.name);
    const chapters = fs.readdirSync(bookDir).filter((f) => f.endsWith(".md"));

    // Read first chapter to get book title
    const firstChapter = path.join(bookDir, "1.md");
    let title = entry.name;
    if (fs.existsSync(firstChapter)) {
      const { data } = matter(fs.readFileSync(firstChapter, "utf-8"));
      title = data.book || entry.name;
    }

    books.push({
      slug: entry.name,
      title,
      chapters: chapters.length,
    });
  }

  return books;
};

export const getChapter = (
  volume: string,
  bookSlug: string,
  chapter: number
): ChapterData | null => {
  const filePath = path.join(CONTENT_DIR, volume, bookSlug, `${chapter}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    title: data.title,
    book: data.book,
    chapter: data.chapter,
    volume: data.volume,
    slug: data.slug,
    verses_count: data.verses_count,
    content: content.trim(),
  };
};

export const getAdjacentChapters = (
  volume: string,
  bookSlug: string,
  chapter: number
): { prev: NavigationItem | null; next: NavigationItem | null } => {
  const books = getBooksForVolume(volume);
  const bookIndex = books.findIndex((b) => b.slug === bookSlug);
  const currentBook = books[bookIndex];

  let prev: NavigationItem | null = null;
  let next: NavigationItem | null = null;

  // Previous chapter
  if (chapter > 1) {
    prev = {
      volume,
      volumeTitle: VOLUME_TITLES[volume],
      book: currentBook.title,
      bookSlug,
      chapter: chapter - 1,
    };
  } else if (bookIndex > 0) {
    const prevBook = books[bookIndex - 1];
    prev = {
      volume,
      volumeTitle: VOLUME_TITLES[volume],
      book: prevBook.title,
      bookSlug: prevBook.slug,
      chapter: prevBook.chapters,
    };
  }

  // Next chapter
  if (chapter < currentBook.chapters) {
    next = {
      volume,
      volumeTitle: VOLUME_TITLES[volume],
      book: currentBook.title,
      bookSlug,
      chapter: chapter + 1,
    };
  } else if (bookIndex < books.length - 1) {
    const nextBook = books[bookIndex + 1];
    next = {
      volume,
      volumeTitle: VOLUME_TITLES[volume],
      book: nextBook.title,
      bookSlug: nextBook.slug,
      chapter: 1,
    };
  }

  return { prev, next };
};

