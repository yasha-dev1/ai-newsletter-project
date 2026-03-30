import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  title: "The AI Engineer — Weekly Newsletter for AI Engineers",
  description:
    "Stay ahead of the curve. A curated weekly newsletter covering the latest in AI engineering — papers, tools, tutorials, and industry insights.",
};

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white font-bold text-sm tracking-tight group-hover:scale-105 transition-transform">
        AI
      </div>
      <span className="font-semibold text-lg tracking-tight">
        The AI Engineer
      </span>
    </Link>
  );
}

function Header() {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />
        <nav className="hidden sm:flex items-center gap-8 text-sm font-medium text-muted">
          <Link
            href="/blog"
            className="hover:text-foreground transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/papers"
            className="hover:text-foreground transition-colors"
          >
            AI Papers
          </Link>
          <Link
            href="/glossary"
            className="hover:text-foreground transition-colors"
          >
            Glossary
          </Link>
        </nav>
        <a
          href="#subscribe"
          className="text-sm font-medium px-4 py-2 rounded-full bg-accent text-white hover:bg-accent-light transition-colors"
        >
          Subscribe
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
        <div>
          <Logo />
          <p className="mt-3 text-muted leading-relaxed">
            A weekly newsletter helping AI engineers stay current with the
            fast-moving world of AI.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Content</h4>
          <ul className="space-y-2 text-muted">
            <li>
              <Link
                href="/blog"
                className="hover:text-foreground transition-colors"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/papers"
                className="hover:text-foreground transition-colors"
              >
                AI Papers
              </Link>
            </li>
            <li>
              <Link
                href="/glossary"
                className="hover:text-foreground transition-colors"
              >
                Glossary
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Connect</h4>
          <ul className="space-y-2 text-muted">
            <li>
              <a href="#" className="hover:text-foreground transition-colors">
                Twitter / X
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground transition-colors">
                GitHub
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground transition-colors">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border text-center text-xs text-muted py-6">
        &copy; {new Date().getFullYear()} The AI Engineer. All rights reserved.
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
