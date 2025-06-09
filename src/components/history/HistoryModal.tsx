'use client';

import { useEffect, useState } from 'react';
import { X, RefreshCw } from 'lucide-react';
import ForecastChart from '../chart/ForecastChart';
import type { ApartmentDetailData } from '../../types/property';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: ApartmentDetailData | null;
}

export default function HistoryModal({ isOpen, onClose, property }: HistoryModalProps) {
  const [tab, setTab] = useState<'info' | 'price'>('info');
  const [dealType, setDealType] = useState<'매매' | '전세' | '월세'>('매매');
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [aiChartData, setAiChartData] = useState<any[]>([]);

  const feature = property?.summary_data?.feature || {};
  const complex = property?.complex_info || {};
  const title = property?.summary_data?.title || property?.complex_name || '-';
  const address = complex.도로명주소 || complex.지번주소 || '-';
  const areaString = complex.면적 || feature.면적 || '';
  const areas = areaString.split(',').map((a) => a.trim());

  const forecastEntries = property?.forecast_json ?? {};
  const parsed = Object.entries(forecastEntries)
    .map(([date, data]) => ({
      date,
      actual: data.actual ?? null,
      predicted: data.predicted,
      lower: data.lower,
      upper: data.upper,
      band: data.upper - data.lower,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const lastActualIndex = parsed.reduce((acc, cur, idx) => (cur.actual !== null ? idx : acc), -1);

  const initialChartData = parsed.map((d, idx) => ({
    ...d,
    predictedBefore: idx <= lastActualIndex ? d.predicted : undefined,
    predictedAfter: idx > lastActualIndex ? d.predicted : undefined,
  }));
  useEffect(() => {
    if (property && initialChartData.length > 0) {
      setAiChartData(initialChartData);
    }

    if (!selectedArea) {
      const defaultArea = areas[0];
      setSelectedArea(defaultArea || null);
    }
  }, [property]);

  if (!isOpen || !property) return null;

  const handlePredict = async () => {
    setIsPredicting(true);
    setTimeout(() => {
      setAiChartData(initialChartData);
      setIsPredicting(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg overflow-y-auto max-h-[90vh]">
        <div className="border-b p-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold truncate">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-sm">
            <X className="w-5 h-5" />
          </button>
        </div>

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

        <div className="p-6">
          {tab === 'info' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Info label="건물 유형" value={feature.유형} />
                <Info label="주소" value={address} />
                <Info label="면적" value={areaString} />
                <Info label="세대수" value={feature.세대수 || complex.세대수} />
                <Info label="동 수" value={feature.동수} />
                <Info label="저/최고층" value={complex['저/최고층']} />
                <Info label="총 주차대수" value={complex.총주차대수} />
                <Info label="건설사" value={complex.건설사} />
                <Info label="난방" value={complex.난방} />
                <Info label="승인일" value={feature.사용승인일 || complex.사용승인일} />
                <Info label="지번주소" value={complex.지번주소} />
                <Info label="도로명주소" value={complex.도로명주소} />
                <Info label="용적률" value={complex.용적률} />
                <Info label="건폐율" value={complex.건폐율} />
              </div>
              {complex.관리사무소 && (
                <div>
                  <h4 className="font-medium text-gray-500 mb-2">설명</h4>
                  <p className="text-sm text-gray-700">관리사무소 : {complex.관리사무소}</p>
                </div>
              )}
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

              <div className="flex flex-wrap gap-2 mb-4">
                {areas.map((area) => (
                  <button
                    key={area}
                    onClick={() => setSelectedArea(area)}
                    className={`px-3 py-1 border rounded-full text-sm ${
                      selectedArea === area ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>

              <button
                onClick={handlePredict}
                disabled={!selectedArea || isPredicting}
                className="mb-4 px-4 py-2 text-sm border border-blue-200 rounded-md text-blue-600 hover:bg-blue-50 disabled:opacity-50 flex items-center"
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${isPredicting ? 'animate-spin' : ''}`} />
                AI 예측 요청
              </button>

              <div className="h-[400px]">
                <ForecastChart data={aiChartData} />
              </div>
            </>
          )}
        </div>
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
