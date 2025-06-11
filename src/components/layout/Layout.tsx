import { Home } from 'lucide-react';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header>
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <Home className="h-8 w-8 text-navy-800" />
                <h1 className="text-2xl font-bold text-gray-900">Price Trend AI</h1>
              </div>
              <nav className="flex space-x-8">
                <a
                  href="/"
                  className="text-gray-600 hover:text-navy-600 font-medium transition-colors"
                >
                  Home
                </a>
                <a
                  href="/history"
                  className="text-gray-600 hover:text-navy-600 font-medium transition-colors"
                >
                  History
                </a>
              </nav>
            </div>
          </div>
        </header>
      </header>
      <main className="flex-grow">{children}</main>
    </div>
  );
}
