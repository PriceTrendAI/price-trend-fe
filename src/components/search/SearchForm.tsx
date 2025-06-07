import { useState } from 'react';
import type { SearchParams } from './SearchFilter';
import SearchFilter from './SearchFilter';

export default function SearchForm() {
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    location: '',
    propertyType: '',
    dealType: '',
    size: '',
  });

  const handleSearchParamsChange = (updatedParams: SearchParams) => {
    setSearchParams(updatedParams);

    if (updatedParams.location && updatedParams.propertyType && updatedParams.dealType) {
      const mockSizes = ['59', '84', '101'];
      setAvailableSizes(mockSizes);
    } else {
      setAvailableSizes([]);
    }
  };

  return (
    <section className="...">
      <SearchFilter
        initialSearchParams={searchParams}
        availableSizes={availableSizes}
        onParamsChange={handleSearchParamsChange}
      />
    </section>
  );
}
