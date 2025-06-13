'use client';

import { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import ForecastChart from '../chart/ForecastChart';
import type { ApartmentDetailData } from '../../types/property';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: ApartmentDetailData | null;
}

export default function HistoryModal({ isOpen, onClose, property }: HistoryModalProps) {
  const [tab, setTab] = useState<'info' | 'price'>('info');
  const [aiChartData, setAiChartData] = useState<any[]>([]);

  const feature = property?.summary_data?.feature || {};
  const complex = property?.complex_info || {};
  const title = property?.summary_data?.title || property?.complex_name || '-';
  const address = complex.도로명주소 || complex.지번주소 || '-';
  const areaString = complex.면적 || feature.면적 || '';

  const initialChartData = useMemo(() => {
    if (!property) return [];
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

    return parsed.map((d, idx) => ({
      ...d,
      predictedBefore: idx <= lastActualIndex ? d.predicted : undefined,
      predictedAfter: idx > lastActualIndex ? d.predicted : undefined,
    }));
  }, [property]);

  useEffect(() => {
    setAiChartData(initialChartData);
  }, [initialChartData]);

  if (!isOpen || !property) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg overflow-y-auto max-h-[90vh] dark:bg-dark-surface dark:shadow-xl">
        <div className="border-b p-6 flex justify-between items-center dark:border-dark-border">
          <h2 className="text-xl font-semibold dark:text-dark-text">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-sm dark:text-dark-subtext dark:hover:text-dark-text"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="border-b px-6 pt-4 dark:border-dark-border">
          <div className="grid grid-cols-2 w-full">
            {['info', 'price'].map((key) => (
              <button
                key={key}
                className={`py-2 text-sm font-medium border-b-2 ${
                  tab === key
                    ? 'border-blue-600 text-blue-600 dark:border-dark-text dark:text-dark-text'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-dark-subtext dark:hover:text-dark-text'
                }`}
                onClick={() => setTab(key as 'info' | 'price')}
              >
                {key === 'info' ? '단지 정보' : '가격 분석'}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* 단지 정보 탭 */}
          <div className={tab === 'info' ? 'block' : 'hidden'}>
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
                  <h4 className="font-medium text-gray-500 mb-2 dark:text-dark-text">설명</h4>
                  <p className="text-sm text-gray-700 dark:text-dark-subtext">
                    관리사무소 : {complex.관리사무소}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 가격 분석 탭 */}
          <div className={tab === 'price' ? 'block' : 'hidden'}>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-1 dark:text-dark-text">
                가격 예측 분석
              </h3>
              <p className="text-sm text-gray-500 dark:text-dark-subtext">
                DB에 저장된 예측 결과입니다. 실제 시세와 예측값을 확인하세요.
              </p>
            </div>
            <ul className="space-y-1 text-sm text-gray-700 mb-2 list-none dark:text-dark-subtext">
              <li>
                <span className="font-medium text-gray-600 inline-block w-20 dark:text-dark-text">
                  거래유형
                </span>
                <span>{property.deal_type ?? '-'}</span>
              </li>
              <li>
                <span className="font-medium text-gray-600 inline-block w-20 dark:text-dark-text">
                  면적
                </span>
                <span>{property.area_detail?.area || property.complex_info?.면적 || '-'}</span>
              </li>
              <li>
                <span className="font-medium text-gray-600 inline-block w-20 dark:text-dark-text">
                  조회일
                </span>
                <span>
                  {property.created_at?.slice(0, 16).replace('T', ' ') ||
                    property.updated_at?.slice(0, 16).replace('T', ' ') ||
                    '-'}
                </span>
              </li>
            </ul>

            {aiChartData.length === 0 ? (
              <div className="text-center text-gray-500 text-sm h-[400px] flex items-center justify-center border rounded dark:border-dark-border">
                예측 데이터가 존재하지 않습니다.
              </div>
            ) : (
              <div className="h-[400px]">
                <ForecastChart data={aiChartData} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <h4 className="text-sm font-medium text-gray-500 dark:text-dark-text">{label}</h4>
      <p className="text-sm text-gray-800 dark:text-dark-subtext">{value ?? '-'}</p>
    </div>
  );
}
