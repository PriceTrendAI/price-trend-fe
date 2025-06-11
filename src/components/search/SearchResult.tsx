import { LoaderCircle, Home, Search, Building, ChartNoAxesCombined } from 'lucide-react';
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
      <>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-navy-100 rounded-lg mb-4">
              <Search className="h-6 w-6 text-navy-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">AI 가격 예측</h4>
            <p className="text-gray-600 text-sm">
              머신러닝 기반으로 정확한 부동산 가격을 예측합니다
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-navy-100 rounded-lg mb-4">
              <Building className="h-6 w-6 text-navy-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">실시간 데이터</h4>
            <p className="text-gray-600 text-sm">
              최신 거래 정보와 시장 동향을 실시간으로 반영합니다
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-navy-100 rounded-lg mb-4">
              <ChartNoAxesCombined className="h-6 w-6 text-navy-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">가격 추이 시각화</h4>
            <p className="text-gray-600 text-sm">
              예측된 가격 변동을 그래프로 제공해 흐름을 쉽게 파악할 수 있습니다
            </p>
          </div>
        </div>
      </>
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
