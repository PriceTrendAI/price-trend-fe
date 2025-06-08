import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchSearchResults, type Apartment } from '../../api/search';

export default function SearchResult() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);

  const keyword = useMemo(() => searchParams.get('keyword') || '', [searchParams]);

  useEffect(() => {
    if (!keyword) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchSearchResults(keyword);
        setResults(data);
      } catch (err) {
        console.error('검색 실패', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [keyword]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">검색 결과</h2>
      {loading ? (
        <p>로딩 중...</p>
      ) : results.length === 0 ? (
        <p>결과가 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {results.map((apt) => (
            <div key={apt.index} className="border rounded p-4 shadow bg-white">
              <h3 className="text-lg font-semibold">{apt.title}</h3>
              <p className="text-sm text-gray-600">{apt.address}</p>
              <p className="text-sm text-gray-500">{apt.type}</p>
              <ul className="mt-2 text-sm text-gray-700 list-disc pl-5">
                {apt.specs.map((spec, i) => (
                  <li key={i}>{spec}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
