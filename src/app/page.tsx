import Link from "next/link";
import { GlassPanel, GlassBadge } from "@/components/ui";
import { getVolumes } from "@/lib/scripture-data";

const BookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M3 4.5C3 3.67 3.67 3 4.5 3H8C9.1 3 10 3.9 10 5V17C10 16.17 9.33 15.5 8.5 15.5H4.5C3.67 15.5 3 16.17 3 17V4.5Z" stroke="currentColor" strokeWidth="1.3" />
    <path d="M17 4.5C17 3.67 16.33 3 15.5 3H12C10.9 3 10 3.9 10 5V17C10 16.17 10.67 15.5 11.5 15.5H15.5C16.33 15.5 17 16.17 17 17V4.5Z" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

const VOLUME_ICONS: Record<string, string> = {
  "old-testament": "OT",
  "new-testament": "NT",
  "book-of-mormon": "BM",
  "doctrine-and-covenants": "DC",
  "pearl-of-great-price": "PG",
};

export default function Home() {
  const volumes = getVolumes();

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 mb-6 text-accent">
            <BookIcon />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-3">Liahona</h1>
          <p className="text-foreground-muted text-lg max-w-lg mx-auto leading-relaxed">
            Deep-dive scripture study with side-by-side reading, commentaries, and cross-references.
          </p>
        </div>

        {/* Volume cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {volumes.map((volume) => {
            const firstBook = volume.books[0];
            const href = firstBook
              ? `/read/${volume.id}/${firstBook.slug}/1`
              : "#";

            return (
              <Link key={volume.id} href={href}>
                <GlassPanel className="group hover:border-glass-border-strong hover:bg-glass-bg-hover transition-all duration-200 cursor-pointer h-full">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-bold text-xs flex-shrink-0">
                      {VOLUME_ICONS[volume.id]}
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                        {volume.title}
                      </h2>
                      <p className="text-xs text-foreground-subtle mt-1">
                        {volume.books.length} books
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {volume.books.slice(0, 5).map((book) => (
                      <GlassBadge key={book.slug}>{book.title}</GlassBadge>
                    ))}
                    {volume.books.length > 5 && (
                      <GlassBadge variant="accent">+{volume.books.length - 5}</GlassBadge>
                    )}
                  </div>
                </GlassPanel>
              </Link>
            );
          })}
        </div>

        {/* Quick links */}
        <div className="mt-12 text-center">
          <p className="text-foreground-subtle text-sm mb-4">Quick start</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: "1 Nephi 1", href: "/read/book-of-mormon/1-nephi/1" },
              { label: "Genesis 1", href: "/read/old-testament/genesis/1" },
              { label: "Matthew 1", href: "/read/new-testament/matthew/1" },
              { label: "D&C 1", href: "/read/doctrine-and-covenants/sections/1" },
              { label: "Moses 1", href: "/read/pearl-of-great-price/moses/1" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-xl bg-glass-bg border border-glass-border text-sm text-foreground-muted hover:text-accent hover:border-accent/30 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
