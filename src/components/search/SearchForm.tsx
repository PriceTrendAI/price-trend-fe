'use client';

import { useState } from 'react';
import PriceSlider from './PriceSlider';
import SearchButton from './SearchButton';
import SearchFilter from './SearchFilter';
import type { SearchParams } from './SearchFilter';
import { useNavigate } from 'react-router-dom';

export default function SearchForm() {
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    location: '',
    propertyType: '',
    dealType: '',
    size: '',
  });

  const navigate = useNavigate();

  const buildQueryParams = (params: SearchParams): URLSearchParams => {
    const filteredEntries = Object.entries(params).filter(
      ([, value]) => typeof value === 'string' && value.trim() !== '',
    ) as [string, string][];
    return new URLSearchParams(filteredEntries);
  };

  const handleSearchClick = () => {
    const params = buildQueryParams(searchParams);
    navigate(`/search?${params.toString()}`);
  };

  const handleSearchParamsChange = (updatedParams: SearchParams) => {
    setSearchParams(updatedParams);

    // 조건 충족 시 임의의 사이즈 제공
    if (updatedParams.location && updatedParams.propertyType && updatedParams.dealType) {
      const mockSizes = ['59', '84', '101'];
      setAvailableSizes(mockSizes);
    } else {
      setAvailableSizes([]);
    }
  };

  return (
    <section className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-8 w-full max-w-[1280px] mx-auto">
      <h2 className="text-xl font-semibold text-navy-700 mb-4">매물 검색</h2>

      <SearchFilter
        initialSearchParams={searchParams}
        availableSizes={availableSizes}
        onParamsChange={handleSearchParamsChange}
      />

      <div className="mt-6">
        <PriceSlider />
      </div>

      <div className="flex justify-end mt-6">
        <SearchButton onClick={handleSearchClick} />
      </div>
    </section>
  );
}
