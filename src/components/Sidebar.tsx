"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { GlassPanel, GlassButton } from "@/components/ui";
import type { Volume } from "@/lib/types";

interface SidebarProps {
  volumes: Volume[];
  isOpen: boolean;
  onToggle: () => void;
}

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    className={`transition-transform duration-200 ${open ? "rotate-90" : ""}`}
  >
    <path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const MenuIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M3 5H15M3 9H15M3 13H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const Sidebar = ({ volumes, isOpen, onToggle }: SidebarProps) => {
  const params = useParams();
  const currentSlug = params?.slug as string[] | undefined;
  const [expandedVolumes, setExpandedVolumes] = useState<Set<string>>(new Set());
  const [expandedBooks, setExpandedBooks] = useState<Set<string>>(new Set());

  const toggleVolume = (id: string) => {
    setExpandedVolumes((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleBook = (key: string) => {
    setExpandedBooks((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const isActive = (volume: string, bookSlug: string, chapter: number) => {
    if (!currentSlug || currentSlug.length < 3) return false;
    return currentSlug[0] === volume && currentSlug[1] === bookSlug && currentSlug[2] === String(chapter);
  };

  return (
    <>
      {/* Mobile toggle */}
      <GlassButton
        variant="ghost"
        size="sm"
        onClick={onToggle}
        className="fixed top-3 left-3 z-50 lg:hidden"
        aria-label="Toggle sidebar"
      >
        <MenuIcon />
      </GlassButton>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-72
          transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:relative lg:translate-x-0
        `}
      >
        <GlassPanel
          variant="strong"
          noPadding
          className="h-full rounded-none border-r border-l-0 border-t-0 border-b-0 flex flex-col"
        >
          {/* Header */}
          <div className="p-4 pb-3 border-b border-glass-border">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center text-accent font-bold text-sm">
                L
              </div>
              <span className="text-lg font-semibold tracking-tight text-foreground group-hover:text-accent transition-colors">
                Liahona
              </span>
            </Link>
          </div>

          {/* Navigation tree */}
          <nav className="flex-1 overflow-y-auto p-2">
            {volumes.map((volume) => (
              <div key={volume.id} className="mb-1">
                <button
                  onClick={() => toggleVolume(volume.id)}
                  className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm font-medium text-foreground-muted hover:text-foreground hover:bg-glass-bg transition-colors cursor-pointer"
                >
                  <ChevronIcon open={expandedVolumes.has(volume.id)} />
                  <span className="truncate">{volume.title}</span>
                </button>

                {expandedVolumes.has(volume.id) && (
                  <div className="ml-3 border-l border-glass-border">
                    {volume.books.map((book) => {
                      const bookKey = `${volume.id}/${book.slug}`;
                      return (
                        <div key={bookKey}>
                          <button
                            onClick={() => toggleBook(bookKey)}
                            className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-foreground-muted hover:text-foreground hover:bg-glass-bg rounded-r-lg transition-colors cursor-pointer"
                          >
                            <ChevronIcon open={expandedBooks.has(bookKey)} />
                            <span className="truncate">{book.title}</span>
                            <span className="ml-auto text-foreground-subtle text-[10px]">
                              {book.chapters}
                            </span>
                          </button>

                          {expandedBooks.has(bookKey) && (
                            <div className="ml-5 flex flex-wrap gap-0.5 py-1 px-1">
                              {Array.from({ length: book.chapters }, (_, i) => i + 1).map((ch) => (
                                <Link
                                  key={ch}
                                  href={`/read/${volume.id}/${book.slug}/${ch}`}
                                  className={`
                                    w-8 h-7 flex items-center justify-center
                                    text-[11px] rounded-md transition-all
                                    ${
                                      isActive(volume.id, book.slug, ch)
                                        ? "bg-accent/20 text-accent border border-accent/30 font-semibold"
                                        : "text-foreground-muted hover:bg-glass-bg-hover hover:text-foreground"
                                    }
                                  `}
                                >
                                  {ch}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </GlassPanel>
      </aside>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export { Sidebar };
