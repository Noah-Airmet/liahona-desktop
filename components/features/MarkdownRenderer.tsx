import React from 'react';

/**
 * MarkdownRenderer Component
 * 
 * Responsible for rendering Markdown content with YAML frontmatter parsing.
 * 
 * Per PRD.md Section 3.2:
 * - Fetches and renders .md files dynamically
 * - Parses YAML frontmatter to extract metadata (title, author, scripture_tags)
 * - Builds relational database/graph of document connections
 * 
 * Note: Inputs must be strictly sanitized to prevent XSS (PRD.md Section 5)
 */

interface MarkdownMetadata {
  title?: string;
  author?: string;
  scripture_tags?: string[];
  [key: string]: unknown;
}

interface MarkdownRendererProps {
  content: string;
  metadata?: MarkdownMetadata;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ 
  content, 
  metadata,
  className = '' 
}) => {
  // TODO: Implement YAML frontmatter parsing
  // TODO: Implement Markdown to HTML rendering with sanitization
  // TODO: Implement scripture tag linking
  
  return (
    <div className={`prose prose-invert max-w-none ${className}`}>
      {metadata?.title && (
        <h1 className="text-2xl font-bold text-white mb-2">{metadata.title}</h1>
      )}
      {metadata?.author && (
        <p className="text-sm text-slate-400 mb-4">By {metadata.author}</p>
      )}
      {/* TODO: Render sanitized HTML from Markdown */}
      <div className="text-slate-200 whitespace-pre-wrap">{content}</div>
    </div>
  );
};
