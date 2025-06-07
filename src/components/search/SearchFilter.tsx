'use client';

import { useEffect, useState } from 'react';
import { Home, MapPin, Search } from 'lucide-react';
// import PriceSlider from './PriceSlider';
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

interface Property {
  id: number;
  title: string;
  type: string;
  location: string;
  price: number;
  area: number;
  rooms: number;
  year: number;
  image: string;
}

export default function SearchFilter({
  initialSearchParams,
  availableSizes,
  onParamsChange,
}: SearchFilterProps) {
  const [currentFilterState, setCurrentFilterState] = useState<SearchParams>(initialSearchParams);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [filters, setFilters] = useState({
    type: 'all',
    priceRange: [0, 20],
    areaRange: [0, 150],
  });

  const areaOptions = [
    { label: '전체', value: 150 },
    { label: '30m² 이하', value: 30 },
    { label: '30~60m²', value: 60 },
    { label: '60~85m²', value: 85 },
    { label: '85~100m²', value: 100 },
    { label: '100m² 이상', value: 999 },
  ];

  const dealTypeOptions = ['전세', '월세', '매매'];

  const handleSearch = () => {
    setShowFilters(true);
    setShowResults(true);
    // 여기에 실제 필터링 로직 삽입
    setFilteredProperties([
      {
        id: 1,
        title: '럭셔리 아파트',
        type: '매매',
        location: '강남구 역삼동',
        price: 13,
        area: 85,
        rooms: 3,
        year: 2017,
        image: '',
      },
    ]);
  };

  // const formatPrice = (price: number) => `${price.toLocaleString()}억`;

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

  return (
    <div className="max-w-7xl mx-auto min-h-screen bg-gray-50">
      <div className="bg-white border-b rounded-md">
        {/* shadow-sm */}
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
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-navy-700 text-white rounded-md flex items-center"
            >
              <Search className="h-4 w-4 mr-2" /> 검색
            </button>
            {/* <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-2 border rounded-md flex items-center"
            >
              <Filter className="h-4 w-4 mr-2" /> 필터
            </button> */}
          </div>

          {showFilters && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* 거래 방식 */}
                <div>
                  <p className="text-sm font-medium mb-2">거래 방식</p>
                  <div className="flex flex-wrap gap-4">
                    {dealTypeOptions.map((option) => {
                      const isSelected = filters.type === option;
                      return (
                        <label
                          key={option}
                          htmlFor={`deal-${option}`}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <button
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => setFilters({ ...filters, type: option })}
                            id={`deal-${option}`}
                            className={`aspect-square h-5 w-5 rounded-full border border-black bg-white
              flex items-center justify-center
              focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
                          >
                            {isSelected && <span className="h-2.5 w-2.5 rounded-full bg-black" />}
                          </button>
                          <span className="text-sm">{option}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* 면적 */}
                <div>
                  <p className="text-sm font-medium mb-2">면적</p>
                  <div className="flex flex-wrap gap-4">
                    {areaOptions.map((option) => {
                      const isSelected = filters.areaRange[1] === option.value;
                      return (
                        <label
                          key={option.value}
                          htmlFor={`size-${option.value}`}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <button
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            id={`size-${option.value}`}
                            onClick={() =>
                              setFilters({ ...filters, areaRange: [0, Number(option.value)] })
                            }
                            className={`aspect-square h-5 w-5 rounded-full border border-black bg-white
              flex items-center justify-center
              focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
                          >
                            {isSelected && <span className="h-2.5 w-2.5 rounded-full bg-black" />}
                          </button>
                          <span className="text-sm">{option.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* 가격 범위 슬라이더
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PriceSlider
                  value={filters.priceRange}
                  onChange={(range) => setFilters({ ...filters, priceRange: range })}
                /> 
              </div>*/}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {showResults ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold  text-navy-800">
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
              // <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              //   {filteredProperties.map((property) => (
              //     <div
              //       key={property.id}
              //       className="border rounded-md overflow-hidden shadow hover:shadow-lg cursor-pointer"
              //       onClick={() => setSelectedProperty(property)}
              //     >
              //       <img
              //         src={property.image || '/placeholder.svg'}
              //         alt={property.title}
              //         className="w-full h-48 object-cover"
              //       />
              //       <div className="p-4">
              //         <div className="flex items-center justify-between mb-2">
              //           <h3 className="font-semibold text-lg truncate">{property.title}</h3>
              //           <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
              //             {property.type}
              //           </span>
              //         </div>
              //         <p className="text-sm text-gray-600 mb-2 flex items-center">
              //           <MapPin className="h-4 w-4 mr-1" /> {property.location}
              //         </p>
              //         <div className="text-sm text-gray-700 space-y-1">
              //           <div className="flex justify-between">
              //             <span>가격</span>
              //             <span className="font-semibold text-blue-600">
              //               {formatPrice(property.price)}
              //             </span>
              //           </div>
              //           <div className="flex justify-between">
              //             <span>면적</span>
              //             <span>{property.area}㎡</span>
              //           </div>
              //           <div className="flex justify-between">
              //             <span>방/년도</span>
              //             <span>
              //               {property.rooms}개 / {property.year}년
              //             </span>
              //           </div>
              //         </div>
              //         <div className="mt-3 pt-3 border-t flex items-center text-sm text-green-600">
              //           <TrendingUp className="h-4 w-4 mr-1" /> 가격 예측 보기
              //         </div>
              //       </div>
              //     </div>
              //   ))}
              // </div>
              <PropertyGrid />
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <Home className="h-16 w-16 text-gray-300 mx-auto mb-6" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">부동산을 검색해보세요</h3>
            <p className="text-gray-500">
              동이나 지역명을 입력하여 부동산 정보와 가격 예측을 확인하세요
            </p>
          </div>
        )}
      </div>

      {selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-full max-w-xl">
            <h2 className="text-xl font-semibold mb-4">{selectedProperty.title}</h2>
            <p>추가 정보 표시 영역</p>
            <button
              onClick={() => setSelectedProperty(null)}
              className="mt-4 px-4 py-2 bg-gray-200 rounded"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
