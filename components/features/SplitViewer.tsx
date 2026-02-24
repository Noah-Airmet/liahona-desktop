import React from 'react';
import { GlassPane } from '@/components/ui/GlassPane';

/**
 * SplitViewer Component
 * 
 * This is the core component for the MVP split-pane reading experience.
 * - Left Pane: Displays the primary canonical text (Standard Works)
 * - Right Pane: Displays linked supplemental resources (commentaries, translations)
 * 
 * Per PRD.md Section 3.1:
 * - Left pane includes next/previous chapter navigation
 * - Right pane allows toggling between alternative translations, commentaries, or articles
 * - Optional sync scrolling to highlight relevant commentary
 */

interface SplitViewerProps {
  // TODO: Define props for primary text content
  // TODO: Define props for supplemental resource content
  // TODO: Define props for navigation (next/prev chapter)
  // TODO: Define props for resource switching
}

export const SplitViewer: React.FC<SplitViewerProps> = () => {
  return (
    <div className="flex h-full gap-4 p-4">
      {/* Left Pane - Primary Text */}
      <GlassPane className="flex-1 flex flex-col">
        <div className="p-4 border-b border-glass-border">
          <h2 className="text-lg font-semibold text-white">Primary Text</h2>
          {/* TODO: Chapter navigation controls */}
        </div>
        <div className="flex-1 overflow-auto p-4">
          {/* TODO: Render primary scripture text */}
          <p className="text-slate-300">Primary text content will be rendered here...</p>
        </div>
      </GlassPane>

      {/* Right Pane - Supplemental Resources */}
      <GlassPane className="flex-1 flex flex-col">
        <div className="p-4 border-b border-glass-border">
          <h2 className="text-lg font-semibold text-white">Resources</h2>
          {/* TODO: Resource toggle/switcher */}
        </div>
        <div className="flex-1 overflow-auto p-4">
          {/* TODO: Render linked commentary/resources */}
          <p className="text-slate-300">Linked resources will be rendered here...</p>
        </div>
      </GlassPane>
    </div>
  );
};
