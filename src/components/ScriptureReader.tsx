"use client";

import Link from "next/link";
import { GlassButton } from "@/components/ui";
import type { ChapterData, NavigationItem } from "@/lib/types";

interface ScriptureReaderProps {
  chapter: ChapterData;
  prev: NavigationItem | null;
  next: NavigationItem | null;
}

const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ScriptureReader = ({ chapter, prev, next }: ScriptureReaderProps) => {
  return (
    <div className="flex flex-col h-full">
      {/* Chapter header */}
      <div className="flex-shrink-0 px-6 pt-6 pb-4 border-b border-glass-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-foreground-subtle uppercase tracking-widest mb-1">
              {chapter.volume.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
            </p>
            <h1 className="text-2xl font-semibold tracking-tight">{chapter.title}</h1>
          </div>
          <span className="text-xs text-foreground-subtle">
            {chapter.verses_count} verses
          </span>
        </div>
      </div>

      {/* Scripture text */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div
          className="prose prose-invert max-w-2xl mx-auto font-serif text-[17px] leading-[1.85] text-foreground/90"
          dangerouslySetInnerHTML={{ __html: chapter.content }}
        />
      </div>

      {/* Navigation footer */}
      <div className="flex-shrink-0 px-6 py-3 border-t border-glass-border flex items-center justify-between">
        {prev ? (
          <Link href={`/read/${prev.volume}/${prev.bookSlug}/${prev.chapter}`}>
            <GlassButton variant="ghost" size="sm">
              <ArrowLeftIcon />
              <span className="hidden sm:inline">{prev.book} {prev.chapter}</span>
            </GlassButton>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link href={`/read/${next.volume}/${next.bookSlug}/${next.chapter}`}>
            <GlassButton variant="ghost" size="sm">
              <span className="hidden sm:inline">{next.book} {next.chapter}</span>
              <ArrowRightIcon />
            </GlassButton>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export { ScriptureReader };
