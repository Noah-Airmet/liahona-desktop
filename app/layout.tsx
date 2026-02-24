import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Liahona - Scripture Study Engine',
  description: 'A lightweight, web-based study engine for deep-dive scripture scholarship with parallel study panes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
