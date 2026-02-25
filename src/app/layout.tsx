import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppShell } from "@/components/AppShell";
import { getVolumes } from "@/lib/scripture-data";
import searchIndex from "@/lib/search-index.json";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Liahona — Scripture Study",
  description: "An advanced LDS scripture study engine with split-pane reading, commentaries, and cross-references.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const volumes = getVolumes();

  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppShell volumes={volumes} searchIndex={searchIndex}>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
