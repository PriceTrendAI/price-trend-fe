'use client';

import { useEffect, useMemo, useState } from 'react';
import { Home, MapPin, Search } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { PropertyData } from '../card/PropertyGrid';
import { fetchSearchResults, type Apartment } from '../../api/search';
import PropertyGrid from '../card/PropertyGrid';

export interface SearchParams {
  location: string;
  propertyType: string;
  dealType: string;
  size?: string;
}

interface SearchFilterProps {
  initialSearchParams: SearchParams;
  availableSizes: string[];
  onParamsChange: (params: SearchParams) => void;
}

export default function SearchFilter({
  initialSearchParams,
  availableSizes,
  onParamsChange,
}: SearchFilterProps) {
  const [currentFilterState, setCurrentFilterState] = useState<SearchParams>(initialSearchParams);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState<PropertyData[]>([]);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const keywordFromQuery = useMemo(() => searchParams.get('keyword') || '', [searchParams]);

  const handleSearch = async (keywordParam?: string) => {
    const keyword = keywordParam || searchQuery.trim();
    if (!keyword) return;

    try {
      setShowResults(true);
      const apartments: Apartment[] = await fetchSearchResults(keyword);

      const mapped: PropertyData[] = apartments.map((apt) => ({
        id: apt.index,
        title: apt.title,
        address: apt.address,
        price: 0,
        size: 0,
        type: apt.type,
        imageUrl: '',
        rooms: apt.specs.includes('3룸') ? 3 : 2,
        bathrooms: apt.specs.includes('2욕실') ? 2 : 1,
        builtYear: 2020,
        description: apt.specs.join(', '),
      }));

      setFilteredProperties(mapped);
    } catch (error) {
      console.error('검색 실패:', error);
      setFilteredProperties([]);
    }
  };

  const onSearchClick = () => {
    const keyword = searchQuery.trim();
    if (keyword) {
      navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  const canShowSizeOptions =
    currentFilterState.location &&
    currentFilterState.propertyType &&
    currentFilterState.dealType &&
    availableSizes.length > 0;

  useEffect(() => {
    if (!canShowSizeOptions) {
      const updated = { ...currentFilterState, size: '' };
      setCurrentFilterState(updated);
      onParamsChange(updated);
    }
  }, [canShowSizeOptions]);

  useEffect(() => {
    setSearchQuery(keywordFromQuery);
    if (keywordFromQuery) {
      handleSearch(keywordFromQuery);
    }
  }, [keywordFromQuery]);

  return (
    <div className="max-w-7xl mx-auto min-h-screen bg-gray-50">
      <div className="bg-white border-b rounded-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-6">
            <Home className="h-8 w-8 text-navy-700" />
            <h1 className="text-2xl font-bold text-navy-800">부동산 가격 예측 서비스</h1>
          </div>

          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                placeholder="동이나 지역을 입력하세요 (예: 강남구, 역삼동)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 py-2 border rounded-md"
                onKeyDown={(e) => e.key === 'Enter' && onSearchClick()}
              />
            </div>
            <button
              onClick={onSearchClick}
              className="px-6 py-2 bg-navy-700 text-white rounded-md flex items-center"
            >
              <Search className="h-4 w-4 mr-2" /> 검색
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {showResults ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-navy-800">
                검색 결과 ({filteredProperties.length}개)
              </h2>
              <div className="text-sm text-gray-500">'{searchQuery}' 검색 결과</div>
            </div>

            {filteredProperties.length === 0 ? (
              <div className="text-center py-12">
                <Home className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">검색 결과가 없습니다.</p>
              </div>
            ) : (
              <PropertyGrid properties={filteredProperties} />
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <Home className="h-16 w-16 text-gray-300 mx-auto mb-6" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">부동산을 검색해보세요</h3>
            <p className="text-gray-500">동이나 지역명을 입력하여 부동산 정보를 확인하세요</p>
          </div>
        )}
      </div>
    </div>
  );
}
