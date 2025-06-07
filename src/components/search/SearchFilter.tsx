'use client';

import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';

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

  const handleChange =
    (field: keyof SearchParams) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const updated = { ...currentFilterState, [field]: e.target.value };
      setCurrentFilterState(updated);
      onParamsChange(updated);
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

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* 지역 입력 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">지역</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="예: 서울시 강남구 개포동"
              className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-9"
              value={currentFilterState.location}
              onChange={handleChange('location')}
            />
          </div>
        </div>

        {/* 매물 유형 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">매물 유형</label>
          <select
            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={currentFilterState.propertyType}
            onChange={handleChange('propertyType')}
          >
            <option value="">매물 유형 선택</option>
            <option value="apartment">아파트</option>
            <option value="villa">빌라</option>
            <option value="officetel">오피스텔</option>
            <option value="house">단독주택</option>
          </select>
        </div>

        {/* 거래 유형 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">거래 유형</label>
          <select
            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={currentFilterState.dealType}
            onChange={handleChange('dealType')}
          >
            <option value="">거래 유형 선택</option>
            <option value="sale">매매</option>
            <option value="jeonse">전세</option>
            <option value="monthly">월세</option>
          </select>
        </div>
      </div>

      {/* 면적 선택 */}
      {canShowSizeOptions && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">면적 선택</label>
          <select
            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={currentFilterState.size}
            onChange={handleChange('size')}
          >
            <option value="">평수를 선택하세요</option>
            {availableSizes.map((size) => (
              <option key={size} value={size}>
                {size}㎡
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
}
