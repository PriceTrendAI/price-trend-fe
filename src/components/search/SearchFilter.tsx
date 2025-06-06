'use client';

import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

export default function SearchFilter() {
  const [searchParams, setSearchParams] = useState({
    location: '',
    propertyType: '',
    dealType: '',
  });

  const [availableSizes, setAvailableSizes] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState('');

  const canShowSizeOptions =
    searchParams.location && searchParams.propertyType && searchParams.dealType;

  useEffect(() => {
    if (canShowSizeOptions) {
      setAvailableSizes(['59', '74', '84', '101']);
    } else {
      setAvailableSizes([]);
      setSelectedSize('');
    }
  }, [searchParams]);

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
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-9"
              value={searchParams.location}
              onChange={(e) => setSearchParams((prev) => ({ ...prev, location: e.target.value }))}
            />
          </div>
        </div>

        {/* 매물 유형 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">매물 유형</label>
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={searchParams.propertyType}
            onChange={(e) => setSearchParams((prev) => ({ ...prev, propertyType: e.target.value }))}
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
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={searchParams.dealType}
            onChange={(e) => setSearchParams((prev) => ({ ...prev, dealType: e.target.value }))}
          >
            <option value="">거래 유형 선택</option>
            <option value="sale">매매</option>
            <option value="jeonse">전세</option>
            <option value="monthly">월세</option>
          </select>
        </div>
      </div>
      {/* 면적 선택 */}
      {canShowSizeOptions && availableSizes.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">면적 선택</label>
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
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
