import { LoaderCircle, Home } from 'lucide-react';
import PropertyGrid from '../card/PropertyGrid';
import type { PropertyCardData } from '../../types/property';

interface Props {
  isLoading: boolean;
  filteredProperties: PropertyCardData[];
  searchQuery: string;
  showResults: boolean;
}

export default function SearchResult({
  isLoading,
  filteredProperties,
  searchQuery,
  showResults,
}: Props) {
  if (!showResults) {
    return (
      <div className="text-center py-20">
        <Home className="h-16 w-16 text-gray-300 mx-auto mb-6" />
        <h3 className="text-xl font-medium text-gray-600 mb-2">부동산을 검색해보세요</h3>
        <p className="text-gray-500">동이나 지역명을 입력하여 부동산 정보를 확인하세요</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <LoaderCircle className="h-14 w-14 animate-spin text-gray-300 mx-auto mb-6" />
        <h3 className="text-xl font-medium text-gray-500 mb-2">잠시만 기다려 주세요...</h3>
      </div>
    );
  }

  if ((filteredProperties?.length ?? 0) === 0) {
    return (
      <div className="text-center py-20">
        <Home className="h-16 w-16 text-gray-300 mx-auto mb-6" />
        <h3 className="text-xl font-medium text-gray-600 mb-2">검색 결과가 없습니다</h3>
        <p className="text-gray-500">동이나 지역명을 입력하여 부동산 정보를 확인하세요</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-navy-800">
          검색 결과 ({filteredProperties.length}개)
        </h2>
        <div className="text-sm text-gray-500">'{searchQuery}' 검색 결과</div>
      </div>
      <PropertyGrid properties={filteredProperties} />
    </>
  );
}
