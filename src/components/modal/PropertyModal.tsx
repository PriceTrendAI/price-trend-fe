'use client';

import { useState } from 'react';
import { fetchPricePrediction } from '../../api/search';
import { LoaderCircle, RefreshCw, X } from 'lucide-react';
import type { ForecastPoint } from '../../types/property';
import ForecastChart from '../chart/ForecastChart';

interface PropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: any;
  isLoading: boolean;
}

export default function PropertyModal({
  isOpen,
  onClose,
  property,
  isLoading,
}: PropertyModalProps) {
  const [tab, setTab] = useState<'info' | 'price'>('info');
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [dealType, setDealType] = useState<'매매' | '전세' | '월세'>('매매');
  const [aiChartData, setAiChartData] = useState<ForecastPoint[]>([]);
  const [isPredicting, setIsPredicting] = useState(false);

  const info = property?.complex_info || {};
  if (!isOpen || !property) return null;

  const handlePredict = async () => {
    if (!selectedArea || !property.title || !dealType) return;
    setIsPredicting(true);
    try {
      const res = await fetchPricePrediction(property.title, selectedArea, dealType);

      const forecastData = res.forecast_json;

      const parsed = Object.entries(forecastData).map(([date, v]) => ({
        date,
        actual: v.actual ?? null,
        predicted: v.predicted,
        lower: v.lower,
        upper: v.upper,
        band: v.upper - v.lower,
      }));

      const lastActualIndex = parsed.reduce(
        (acc, cur, idx) => (cur.actual !== null ? idx : acc),
        -1,
      );

      const final = parsed.map((d, idx) => ({
        ...d,
        predictedBefore: idx <= lastActualIndex ? d.predicted : undefined,
        predictedAfter: idx > lastActualIndex ? d.predicted : undefined,
      }));

      setAiChartData(final);
    } catch (err) {
      console.error('예측 실패:', err);
    } finally {
      setIsPredicting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg overflow-y-auto max-h-[90vh]">
        <div className="border-b p-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">{property.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-sm">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-[300px] space-y-2">
            <LoaderCircle className="h-8 w-8 animate-spin text-blue-500" />
            <p className="text-sm text-gray-500">잠시만 기다려 주세요...</p>
          </div>
        ) : (
          <>
            {/* 탭 */}
            <div className="border-b px-6 pt-4">
              <div className="grid grid-cols-2 w-full">
                {['info', 'price'].map((key) => (
                  <button
                    key={key}
                    className={`py-2 text-sm font-medium border-b-2 ${
                      tab === key
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setTab(key as 'info' | 'price')}
                  >
                    {key === 'info' ? '단지 정보' : '가격 분석'}
                  </button>
                ))}
              </div>
            </div>

            {/* 탭 내용 */}
            <div className="p-6">
              {tab === 'info' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Info label="건물 유형" value={property.type} />
                    <Info label="주소" value={property.address} />
                    <Info label="면적" value={property.area} />
                    <Info label="세대수" value={info?.['세대수'] ?? property.households} />
                    <Info label="동 수" value={property.buildings} />
                    <Info label="저/최고층" value={info?.['저/최고층']} />
                    <Info label="총 주차대수" value={info?.['총주차대수']} />
                    <Info label="건설사" value={info?.['건설사']} />
                    <Info label="난방" value={info?.['난방']} />
                    <Info label="승인일" value={info?.['사용승인일'] ?? property.approval_date} />
                    <Info label="지번주소" value={info?.['지번주소']} />
                    <Info label="도로명주소" value={info?.['도로명주소']} />
                    <Info label="용적률" value={info?.['용적률']} />
                    <Info label="건폐율" value={info?.['건폐율']} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-500 mb-2">설명</h4>
                    <p className="text-sm text-gray-700">관리사무소 : {info['관리사무소']}</p>
                  </div>
                </div>
              )}

              {tab === 'price' && (
                <>
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">가격 예측 분석</h3>
                    <p className="text-sm text-gray-600">
                      AI 기반 예측 결과입니다. 실제 시세와 예측값을 확인하세요.
                    </p>
                  </div>
                  {/* 거래 유형 선택 */}
                  <div className="flex gap-4 mb-4">
                    {['매매', '전세', '월세'].map((type) => (
                      <label key={type} className="flex items-center gap-1 text-sm text-gray-700">
                        <input
                          type="radio"
                          name="dealType"
                          value={type}
                          checked={dealType === type}
                          onChange={() => setDealType(type as '매매' | '전세' | '월세')}
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                  {/* 면적 선택 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {info?.['면적']?.split(',').map((area: string) => (
                      <button
                        key={area.trim()}
                        onClick={() => setSelectedArea(area.trim())}
                        className={`px-3 py-1 border rounded-full text-sm ${
                          selectedArea === area.trim()
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {area.trim()}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handlePredict}
                    disabled={!selectedArea || isPredicting}
                    className="mb-2 px-4 py-2 text-sm border border-blue-200 rounded-md text-blue-600 hover:bg-blue-50 disabled:opacity-50 flex items-center"
                  >
                    <RefreshCw className={`mr-2 h-4 w-4 ${isPredicting ? 'animate-spin' : ''}`} />
                    AI 예측 요청
                  </button>

                  {isPredicting ? (
                    <div className="text-center text-sm text-gray-500 h-[400px] flex items-center justify-center border border-gray-100 rounded-md mb-4">
                      예측에는 1~2분 정도 소요될 수 있습니다. 잠시만 기다려 주세요.
                    </div>
                  ) : !aiChartData || aiChartData.length === 0 ? (
                    <div className="text-center text-sm text-gray-500 h-[400px] flex items-center justify-center border border-gray-100 rounded-md">
                      예측 데이터가 없습니다.
                    </div>
                  ) : (
                    <div className="h-[400px]">
                      <ForecastChart data={aiChartData} />
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <h4 className="text-sm font-medium text-gray-500">{label}</h4>
      <p className="text-sm text-gray-800">{value ?? '-'}</p>
    </div>
  );
}
