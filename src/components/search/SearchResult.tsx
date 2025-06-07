import { useLocation } from 'react-router-dom';

export default function SearchResult() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const location = params.get('location');
  const dealType = params.get('dealType');
  const propertyType = params.get('propertyType');
  const size = params.get('size');

  const hasSearch = location && dealType && propertyType;

  if (!hasSearch) return null;

  return (
    <div>
      <div className="max-w-[1280px] mx-auto px-4">
        <h2 className="text-xl font-semibold mb-4 text-navy-800">검색 결과</h2>
        <ul className="list-disc pl-5 text-gray-800 space-y-1">
          <li>지역: {location}</li>
          <li>거래유형: {dealType}</li>
          <li>매물유형: {propertyType}</li>
          {size && <li>면적: {size}㎡</li>}
        </ul>
      </div>
    </div>
  );
}
