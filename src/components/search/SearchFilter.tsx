'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { MapPin, Search, X } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchSearchResults } from '../../api/search';
import type { PropertyCardData } from '../../types/property';
import SearchResult from './SearchResult';

const RECENT_KEY = 'recent_keywords';
const MAX_RECENT = 5;

export default function SearchFilter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState<PropertyCardData[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [hasQueried, setHasQueried] = useState(false);
  const [confirmedQuery, setConfirmedQuery] = useState('');
  const [recentKeywords, setRecentKeywords] = useState<string[]>([]);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const keywordFromQuery = useMemo(() => searchParams.get('keyword') || '', [searchParams]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_KEY);
      if (stored) setRecentKeywords(JSON.parse(stored));
    } catch {
      setRecentKeywords([]);
    }
  }, []);

  const saveRecentKeyword = useCallback((keyword: string) => {
    setRecentKeywords((prev) => {
      const updated = [keyword, ...prev.filter((k) => k !== keyword)].slice(0, MAX_RECENT);
      localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeRecentKeyword = (keyword: string) => {
    const updated = recentKeywords.filter((k) => k !== keyword);
    setRecentKeywords(updated);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
  };

  const handleSearch = useCallback(
    async (keywordParam?: string) => {
      const keyword = keywordParam || searchQuery.trim();
      if (!keyword) return;

      saveRecentKeyword(keyword);
      navigate(`/search?keyword=${encodeURIComponent(keyword)}`);

      try {
        setIsLoading(true);
        setShowResults(true);
        const response = await fetchSearchResults(keyword);
        setFilteredProperties(Array.isArray(response) ? response : []);
        setConfirmedQuery(keyword);
      } catch {
        setFilteredProperties([]);
        setConfirmedQuery(keyword);
      } finally {
        setIsLoading(false);
      }
    },
    [searchQuery, navigate, saveRecentKeyword],
  );

  useEffect(() => {
    if (!hasQueried && keywordFromQuery) {
      setSearchQuery(keywordFromQuery);
      handleSearch(keywordFromQuery);
      setHasQueried(true);
    }
  }, [keywordFromQuery, handleSearch, hasQueried]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-[6.5rem]">
      <div className="text-center mb-12">
        <div className="py-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
            <MapPin className="w-4 h-4 mr-1" />
            부동산 가격 예측 서비스
          </span>
        </div>
        <h2 className="text-4xl font-bold mb-4 text-gray-900">부동산을 검색해 보세요</h2>
        <p className="text-gray-600">타겟 부동산을 입력하여 부동산 정보를 예측해 보세요</p>
      </div>

      <div className="relative max-w-2xl mx-auto mb-6">
        <div
          className={`bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 ${
            isFocused
              ? 'border-navy-500 shadow-xl ring-2 ring-navy-100'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center relative">
            <div className="pl-4">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="검색할 지역 또는 건물명을 입력해 주세요 (예: 역삼동, 래미안 블레스티지)"
              className="flex-1 px-4 py-5 text-lg border-0 rounded-2xl focus:ring-0 focus:outline-none bg-transparent placeholder:text-gray-400"
            />
            <button
              onClick={() => handleSearch()}
              className="mr-4 bg-navy-700 hover:shadow-md transition-shadow duration-200 text-white font-medium px-6 py-2 rounded-xl text-sm"
            >
              검색
            </button>
          </div>
        </div>

        {recentKeywords.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2 text-sm text-gray-600">
            {recentKeywords.map((kw) => (
              <div
                key={kw}
                className="flex items-center bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  setSearchQuery(kw);
                  handleSearch(kw);
                }}
              >
                <span>{kw}</span>
                <X
                  className="w-4 h-4 ml-1 hover:text-red-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeRecentKeyword(kw);
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <SearchResult
        isLoading={isLoading}
        filteredProperties={filteredProperties}
        searchQuery={confirmedQuery}
        showResults={showResults}
      />
    </div>
  );
}
