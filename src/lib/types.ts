export interface Volume {
  id: string;
  title: string;
  books: BookMeta[];
}

export interface BookMeta {
  slug: string;
  title: string;
  chapters: number;
}

export interface ChapterData {
  title: string;
  book: string;
  chapter: number;
  volume: string;
  slug: string;
  verses_count: number;
  content: string;
}

export interface NavigationItem {
  volume: string;
  volumeTitle: string;
  book: string;
  bookSlug: string;
  chapter: number;
}

export interface SearchResult {
  title: string;
  slug: string;
  volume: string;
  preview: string;
  score: number;
}
