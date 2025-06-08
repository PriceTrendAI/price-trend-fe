'use client';

import { useEffect, useMemo, useState } from 'react';
import { Home, MapPin, Search } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchSearchResults } from '../../api/search';
import PropertyGrid from '../card/PropertyGrid';
import type { PropertyCardData } from '../../types/property';

// SearchFilter 컴포넌트의 props 타입 정의
// interface SearchFilterProps {
//   initialSearchParams: PropertySearchParams; // 초기 검색 파라미터 (ex. keyword)
//   onParamsChange: (params: PropertySearchParams) => void; // 상위로 파라미터 전달하는 콜백
// }

export default function SearchFilter() {
  // 검색어 입력 상태
  const [searchQuery, setSearchQuery] = useState('');

  // 검색 결과 보여줄지 여부
  const [showResults, setShowResults] = useState(false);

  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false);

  // 검색 결과 리스트 상태
  const [filteredProperties, setFilteredProperties] = useState<PropertyCardData[]>([]);

  const navigate = useNavigate();

  // 주소 쿼리스트링 (예: /search?keyword=삼송동일스위트2차)에서 keyword 추출
  const [searchParams] = useSearchParams();
  const keywordFromQuery = useMemo(() => searchParams.get('keyword') || '', [searchParams]);

  // 실제 검색을 수행하는 함수
  const handleSearch = async (keywordParam?: string) => {
    const keyword = keywordParam || searchQuery.trim();
    if (!keyword) return;

    try {
      setIsLoading(true); // 로딩 중 표시
      setShowResults(true); // 결과 보여주도록 설정
      const response = await fetchSearchResults(keyword); // API 호출
      setFilteredProperties(response); // 결과 저장
    } catch (error) {
      console.error('검색 실패:', error);
      setFilteredProperties([]); // 에러 시 빈 배열
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  // 검색 버튼 클릭 시 실행되는 함수
  const onSearchClick = () => {
    const keyword = searchQuery.trim();
    if (keyword) {
      // 검색어를 URL 쿼리로 반영해서 이동 (라우팅 발생)
      navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  // 쿼리에서 keyword가 바뀔 때 자동 검색 실행
  useEffect(() => {
    setSearchQuery(keywordFromQuery); // 쿼리에서 가져온 keyword를 입력창에도 반영
    if (keywordFromQuery) {
      handleSearch(keywordFromQuery); // 자동 검색
    }
  }, [keywordFromQuery]);

  return (
    <div className="max-w-7xl mx-auto min-h-screen bg-gray-50">
      {/* 상단 검색 바 영역 */}
      <div className="bg-white border-b rounded-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-6">
            <Home className="h-8 w-8 text-navy-700" />
            <h1 className="text-2xl font-bold text-navy-800">부동산 가격 예측 서비스</h1>
          </div>

          {/* 검색 입력 필드와 버튼 */}
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

      {/* 본문 - 결과 표시 영역 */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {showResults ? (
          isLoading ? (
            // 로딩 중
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">검색 중입니다...</p>
            </div>
          ) : filteredProperties.length === 0 ? (
            // 결과 없음
            <div className="text-center py-12">
              <Home className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">검색 결과가 없습니다.</p>
            </div>
          ) : (
            // 결과 있음
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-navy-800">
                  검색 결과 ({filteredProperties.length}개)
                </h2>
                <div className="text-sm text-gray-500">'{searchQuery}' 검색 결과</div>
              </div>
              <PropertyGrid properties={filteredProperties} />
            </>
          )
        ) : (
          // 초기 상태 (아직 검색 안 했을 때)
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
