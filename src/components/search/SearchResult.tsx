import { LoaderCircle, Home, Search, ChartNoAxesCombined, Database } from 'lucide-react';
import PropertyGrid from '../property/PropertyGrid';
import type { PropertyCardData } from '../../types/property';
import { useMemo } from 'react';

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
  const renderableProperties = useMemo(() => {
    return filteredProperties.filter(
      (p) => p.address?.trim() || p.type?.trim() || p.area?.trim() || p.households?.trim(),
    );
  }, [filteredProperties]);

  if (!showResults) {
    return (
      <>
        <div className="grid md:grid-cols-3 gap-8 py-20">
          <div
            className="text-center p-6 
            bg-white dark:bg-dark-surface 
              rounded-xl 
              border border-gray-100 dark:border-dark-border 
              transition-none 
              hover:transition-shadow hover:duration-200 
              hover:shadow-md dark:hover:shadow-lg"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 bg-navy-100 rounded-lg mb-4 dark:bg-dark-icon">
              <Search className="h-6 w-6 text-navy-600 dark:text-dark-text" />
            </div>
            <h4 className="text-lg font-semibold text-navy-800 mb-2 dark:text-dark-text ">
              AI 가격 예측
            </h4>
            <p className="text-gray-600 text-sm dark:text-dark-subtext">
              머신러닝 기반으로 정확한 <br />
              부동산 가격을 예측합니다
            </p>
          </div>

          <div
            className="text-center p-6 
            bg-white dark:bg-dark-surface 
              rounded-xl 
              border border-gray-100 dark:border-dark-border 
              transition-none 
              hover:transition-shadow hover:duration-200 
              hover:shadow-md dark:hover:shadow-lg"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 bg-navy-100 rounded-lg mb-4 dark:bg-dark-icon">
              <Database className="h-6 w-6 text-navy-600 dark:text-dark-text" />
            </div>
            <h4 className="text-lg font-semibold text-navy-800 mb-2 dark:text-dark-text">
              실시간 데이터
            </h4>
            <p className="text-gray-600 text-sm dark:text-dark-subtext">
              수집된 최신 거래 데이터를 기반으로 <br />
              시장 동향을 보여줍니다
            </p>
          </div>

          <div
            className="text-center p-6 
            bg-white dark:bg-dark-surface 
              rounded-xl 
              border border-gray-100 dark:border-dark-border 
              transition-none 
              hover:transition-shadow hover:duration-200 
              hover:shadow-md dark:hover:shadow-lg"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 bg-navy-100 rounded-lg mb-4 dark:bg-dark-icon">
              <ChartNoAxesCombined className="h-6 w-6 text-navy-600 dark:text-dark-text" />
            </div>
            <h4 className="text-lg font-semibold text-navy-800 mb-2 dark:text-dark-text">
              가격 추이 시각화
            </h4>
            <p className="text-gray-600 text-sm dark:text-dark-subtext">
              예측된 가격 변동을 그래프로 제공해 <br />
              흐름을 쉽게 파악할 수 있습니다
            </p>
          </div>
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-24">
        <LoaderCircle className="h-14 w-14 animate-spin text-gray-300 mx-auto mb-6 dark:text-dark-text" />
        <h3 className="text-xl font-medium text-gray-600 mb-2 dark:text-dark-subtext">
          정보를 불러오고 있습니다
        </h3>
        <p className="text-gray-500 dark:text-dark-subtext">잠시만 기다려주세요...</p>
      </div>
    );
  }

  if ((filteredProperties?.length ?? 0) === 0) {
    return (
      <div className="text-center py-24">
        <Home className="h-16 w-16 text-gray-300 mx-auto mb-6 dark:text-dark-text" />
        <h3 className="text-xl font-medium text-gray-600 mb-2 dark:text-dark-subtext">
          검색 결과가 없습니다
        </h3>
        <p className="text-gray-500 dark:text-dark-subtext">
          입력하신 부동산 정보를 다시 확인해 주세요
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-navy-800 dark:text-dark-subtext">
          검색 결과 ({renderableProperties.length}개)
        </h2>
        <div className="text-sm text-gray-500 dark:text-dark-subtext">
          '{searchQuery}' 검색 결과
        </div>
      </div>
      <PropertyGrid properties={renderableProperties} />
    </>
  );
}
