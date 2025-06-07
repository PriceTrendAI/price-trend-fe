import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header>
        <div className="max-w-[1280px] mx-auto px-4 py-4">
        
          <a href="/" className="text-2xl font-bold text-navy-900">
            Price Trend AI
          </a>
        </div>
      </header>

      <main className="flex-grow">{children}</main>
    </div>
  );
}
