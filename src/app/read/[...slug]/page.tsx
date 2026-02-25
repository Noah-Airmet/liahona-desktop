import { notFound } from "next/navigation";
import { ScriptureReader } from "@/components/ScriptureReader";
import { getChapter, getAdjacentChapters } from "@/lib/scripture-data";

interface ReadPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function ReadPage({ params }: ReadPageProps) {
  const { slug } = await params;

  if (!slug || slug.length < 3) {
    notFound();
  }

  const [volume, bookSlug, chapterStr] = slug;
  const chapter = parseInt(chapterStr, 10);

  if (isNaN(chapter)) {
    notFound();
  }

  const chapterData = getChapter(volume, bookSlug, chapter);
  if (!chapterData) {
    notFound();
  }

  const { prev, next } = getAdjacentChapters(volume, bookSlug, chapter);

  return <ScriptureReader chapter={chapterData} prev={prev} next={next} />;
}

export async function generateMetadata({ params }: ReadPageProps) {
  const { slug } = await params;

  if (!slug || slug.length < 3) {
    return { title: "Not Found — Liahona" };
  }

  const [volume, bookSlug, chapterStr] = slug;
  const chapter = parseInt(chapterStr, 10);
  const chapterData = getChapter(volume, bookSlug, chapter);

  if (!chapterData) {
    return { title: "Not Found — Liahona" };
  }

  return {
    title: `${chapterData.title} — Liahona`,
    description: `Read ${chapterData.title} with commentary and cross-references.`,
  };
}
