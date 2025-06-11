import { TrendingUpDown } from 'lucide-react';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <TrendingUpDown className="h-6 w-6 text-navy-800" />
      <span className="text-xl font-bold text-navy-800">Price Trend AI</span>
    </div>
  );
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            <nav className="flex space-x-8">
              <a
                href="/"
                className="text-gray-600 hover:text-navy-800 font-medium transition-colors"
              >
                Home
              </a>
              <a
                href="/history"
                className="text-gray-600 hover:text-navy-800 font-medium transition-colors"
              >
                History
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow ">{children}</main>

      <footer className="bg-white shadow-sm border-t py-6 text-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Logo />
              <p className="text-sm text-gray-500 mt-2">
                AI 기반 부동산 가격 예측 서비스로 <br />
                스마트한 부동산 투자를 도와드립니다.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">서비스</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>가격 예측</li>
                <li>실시간 분석</li>
                <li>시세 그래프</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">프로젝트</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <ul className="space-y-2 text-sm text-gray-500">
                  <li> 팀명: 제작중</li>
                  <li> 프로젝트: Price Trend AI</li>
                  <li> 팀원: 이예준, 어영민</li>
                </ul>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">과목 정보</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>과목명: 인공지능기반빅데이터분석</li>
                <li>교수님: 장은실 교수님</li>
                <li>학교: 중부대학교</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-500">
            <p>&copy; 2025 Price Trend AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
