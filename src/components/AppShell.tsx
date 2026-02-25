"use client";

import { useState, useEffect, useCallback } from "react";
import { Sidebar } from "@/components/Sidebar";
import { SearchDialog } from "@/components/SearchDialog";
import { GlassButton } from "@/components/ui";
import type { Volume } from "@/lib/types";

interface SearchItem {
  title: string;
  slug: string;
  volume: string;
  content: string;
}

interface AppShellProps {
  volumes: Volume[];
  searchIndex: SearchItem[];
  children: React.ReactNode;
}

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const AppShell = ({ volumes, searchIndex, children }: AppShellProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSidebar = useCallback(() => setSidebarOpen((v) => !v), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar volumes={volumes} isOpen={sidebarOpen} onToggle={toggleSidebar} />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="flex-shrink-0 h-12 border-b border-glass-border flex items-center px-4 gap-3">
          <GlassButton
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="lg:hidden"
            aria-label="Toggle sidebar"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4H14M2 8H14M2 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </GlassButton>

          <button
            onClick={() => setSearchOpen(true)}
            className="flex-1 max-w-md flex items-center gap-2 px-3 py-1.5 rounded-xl bg-glass-bg border border-glass-border text-foreground-subtle text-sm hover:border-glass-border-strong transition-colors cursor-pointer"
          >
            <SearchIcon />
            <span>Search scriptures...</span>
            <span className="ml-auto text-[11px] bg-glass-bg border border-glass-border rounded px-1.5 py-0.5 font-mono">
              ⌘K
            </span>
          </button>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </main>

      <SearchDialog isOpen={searchOpen} onClose={closeSearch} searchIndex={searchIndex} />
    </div>
  );
};

export { AppShell };
