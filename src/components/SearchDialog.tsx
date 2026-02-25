"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Fuse, { type FuseResult } from "fuse.js";
import { GlassPanel, GlassInput } from "@/components/ui";

interface SearchItem {
  title: string;
  slug: string;
  volume: string;
  content: string;
}

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  searchIndex: SearchItem[];
}

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const VOLUME_LABELS: Record<string, string> = {
  "book-of-mormon": "BoM",
  "doctrine-and-covenants": "D&C",
  "pearl-of-great-price": "PGP",
  "old-testament": "OT",
  "new-testament": "NT",
};

const SearchDialog = ({ isOpen, onClose, searchIndex }: SearchDialogProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FuseResult<SearchItem>[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const fuse = useCallback(() => {
    return new Fuse(searchIndex, {
      keys: [
        { name: "title", weight: 2 },
        { name: "content", weight: 1 },
      ],
      threshold: 0.35,
      includeScore: true,
      minMatchCharLength: 2,
    });
  }, [searchIndex]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const searchResults = fuse().search(query).slice(0, 12);
    setResults(searchResults);
    setSelectedIndex(0);
  }, [query, fuse]);

  const navigate = (slug: string) => {
    router.push(`/read/${slug}`);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      navigate(results[selectedIndex].item.slug);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  // Global keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <GlassPanel variant="strong" noPadding className="relative w-full max-w-xl mx-4 overflow-hidden">
        <div className="p-3 border-b border-glass-border">
          <GlassInput
            ref={inputRef}
            icon={<SearchIcon />}
            placeholder="Search scriptures... (e.g. '1 Nephi 3' or 'faith')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        {results.length > 0 && (
          <div className="max-h-80 overflow-y-auto p-1.5">
            {results.map((result, i) => (
              <button
                key={result.item.slug}
                onClick={() => navigate(result.item.slug)}
                className={`
                  w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3
                  transition-colors cursor-pointer
                  ${i === selectedIndex ? "bg-glass-bg-active" : "hover:bg-glass-bg"}
                `}
              >
                <span
                  className="text-[10px] font-semibold text-accent bg-accent/10 border border-accent/20 rounded-md px-1.5 py-0.5 flex-shrink-0"
                >
                  {VOLUME_LABELS[result.item.volume] || result.item.volume}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{result.item.title}</p>
                  <p className="text-xs text-foreground-subtle truncate mt-0.5">
                    {result.item.content.substring(0, 80)}...
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {query && results.length === 0 && (
          <div className="p-6 text-center text-foreground-subtle text-sm">
            No results found for &quot;{query}&quot;
          </div>
        )}

        <div className="px-3 py-2 border-t border-glass-border flex items-center gap-3 text-[11px] text-foreground-subtle">
          <span className="bg-glass-bg border border-glass-border rounded px-1.5 py-0.5 font-mono">
            ↑↓
          </span>
          navigate
          <span className="bg-glass-bg border border-glass-border rounded px-1.5 py-0.5 font-mono">
            ↵
          </span>
          open
          <span className="bg-glass-bg border border-glass-border rounded px-1.5 py-0.5 font-mono">
            esc
          </span>
          close
        </div>
      </GlassPanel>
    </div>
  );
};

export { SearchDialog };
