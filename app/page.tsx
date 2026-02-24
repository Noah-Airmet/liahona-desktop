import { SplitViewer } from '@/components/features/SplitViewer';
import { GlassPane } from '@/components/ui/GlassPane';
import { LiquidButton } from '@/components/ui/LiquidButton';

/**
 * Liahona Home Page
 * 
 * The main entry point for the scripture study engine.
 * Per PRD.md Section 3:
 * - Implements split-pane reading interface
 * - Left pane for primary canonical text
 * - Right pane for linked resources
 */

export default function Home() {
  return (
    <main className="h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 border-b border-glass-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-white">Liahona</h1>
            <span className="text-sm text-slate-400">Scripture Study Engine</span>
          </div>
          <div className="flex items-center gap-2">
            <LiquidButton variant="secondary" size="sm">
              Search
            </LiquidButton>
            <LiquidButton variant="secondary" size="sm">
              Navigation
            </LiquidButton>
          </div>
        </div>
      </header>

      {/* Main Content - Split Viewer */}
      <div className="flex-1 overflow-hidden">
        <SplitViewer />
      </div>

      {/* Footer */}
      <footer className="p-2 border-t border-glass-border text-center">
        <p className="text-xs text-slate-500">
          MVP Phase - Local Markdown Study Engine
        </p>
      </footer>
    </main>
  );
}
