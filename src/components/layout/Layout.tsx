import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header>
        <div className="max-w-[1280px] mx-auto px-4 py-4">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <a href="/" className="text-3xl font-bold text-navy-900">
              Price Trend AI
            </a>
            <nav className="flex items-center gap-6">
              <a href="/" className="text-gray-600 hover:text-navy-700">
                Home
              </a>
              <a href="/history" className="text-gray-600 hover:text-navy-700">
                history
              </a>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-grow">{children}</main>
    </div>
  );
}
