import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-navy-900">
            Price Trend AI
          </a>
          <nav className="flex items-center gap-6">
            <a href="/" className="text-gray-600 hover:text-navy-700">
              Home
            </a>
            <a href="/scraps" className="text-gray-600 hover:text-navy-700">
              scraps
            </a>
          </nav>
        </div>
      </header>
      <main className="flex-grow">{children}</main>
    </div>
  );
}
