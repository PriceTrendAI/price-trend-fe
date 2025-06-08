'use client';

import { useState } from 'react';

import type { PropertyCardData, 상세정보 } from '../../types/property';
import RechartsPriceChart from '../chart/PriceChart';

interface PropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: (상세정보 & PropertyCardData & { priceData: any[] }) | null;
}

export default function PropertyModal({ isOpen, onClose, property }: PropertyModalProps) {
  const [tab, setTab] = useState<'info' | 'price'>('info');

  if (!isOpen || !property) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg overflow-y-auto max-h-[90vh]">
        <div className="border-b p-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">{property.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-sm">
            닫기
          </button>
        </div>

        {/* 탭 메뉴 */}
        <div className="border-b px-6 pt-4">
          <div className="grid grid-cols-2 w-full">
            <button
              className={`py-2 text-sm font-medium border-b-2 ${
                tab === 'info'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setTab('info')}
            >
              기본 정보
            </button>
            <button
              className={`py-2 text-sm font-medium border-b-2 ${
                tab === 'price'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setTab('price')}
            >
              가격 분석
            </button>
          </div>
        </div>

        <div className="p-6">
          {tab === 'info' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Info label="건물 유형" value={property.type} />
                <Info label="주소" value={property.address} />
                <Info label="면적" value={property.area} />
                <Info label="승인일" value={property.approval_date} />
                <Info label="세대수" value={property.households} />
                <Info label="동 수" value={property.buildings} />

                {/* <Info label="세대수" value={property['세대수']} />
                <Info label="저/최고층" value={property['저/최고층']} />
                <Info label="총 주차대수" value={property['총주차대수']} />
                <Info label="건설사" value={property['건설사']} />
                <Info label="난방" value={property['난방']} />
                <Info label="승인일" value={property['사용승인일']} />
                <Info label="지번주소" value={property['지번주소']} />
                <Info label="도로명주소" value={property['도로명주소']} /> */}
              </div>

              <div>
                <h4 className="font-medium text-gray-500 mb-2">설명</h4>
                <p className="text-sm text-gray-700">{property['관리사무소']}</p>
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

              <div className="h-[400px]">
                <RechartsPriceChart data={property.priceData} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Stat label="현재 시세" value="9억 5,000만원" />
                <Stat label="예측 상한가" value="10억 5,000만원" color="green" />
                <Stat label="예측 하한가" value="9억원" color="red" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <h4 className="text-sm font-medium text-gray-500">{label}</h4>
      <p className="text-sm text-gray-800">{value}</p>
    </div>
  );
}

function Stat({
  label,
  value,
  color = 'gray',
}: {
  label: string;
  value: string;
  color?: 'gray' | 'green' | 'red';
}) {
  const colorMap = {
    gray: 'text-gray-900',
    green: 'text-green-600',
    red: 'text-red-600',
  };

  return (
    <div className="p-4 border rounded-lg">
      <h4 className="text-sm font-medium text-gray-500">{label}</h4>
      <p className={`text-lg font-bold ${colorMap[color]}`}>{value}</p>
    </div>
  );
}
