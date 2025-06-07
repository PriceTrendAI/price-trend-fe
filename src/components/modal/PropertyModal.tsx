'use client';

import { useState } from 'react';
import { RefreshCw, RotateCcw } from 'lucide-react';
import { formatPrice } from '../../utils/format';
import PriceChart from '../chart/PriceChart';

// 임의 타입 정의
interface PropertyData {
  id: number;
  title: string;
  address: string;
  price: number;
  size: number;
  type: string;
  rooms: number;
  bathrooms: number;
  builtYear: number;
  description: string;
}

// Props
interface PropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: PropertyData | null;
}

// 모달 컴포넌트
export default function PropertyModal({ isOpen, onClose, property }: PropertyModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [predictionRequested, setPredictionRequested] = useState(false);
  const [predictionKey, setPredictionKey] = useState(0);

  if (!isOpen || !property) return null;

  const handlePredictPrice = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    setPredictionRequested(true);
  };

  const handleRefreshPrediction = async () => {
    setIsRefreshing(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsRefreshing(false);
    setPredictionKey((prev) => prev + 1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-navy-800">{property.title}</h2>
          <button onClick={onClose} className="text-sm text-gray-400 hover:text-gray-600">
            닫기
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-medium text-navy-800 mb-4">매물 정보</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <InfoRow label="주소" value={property.address} />
                <InfoRow
                  label="가격"
                  value={<span className="text-navy-700">{formatPrice(property.price)}</span>}
                />
                <InfoRow
                  label="면적"
                  value={`${property.size}평 (${Math.round(property.size * 3.3)}㎡)`}
                />
                <InfoRow label="유형" value={property.type} />
                <InfoRow label="방/욕실" value={`${property.rooms}개 / ${property.bathrooms}개`} />
                <InfoRow label="준공년도" value={`${property.builtYear}년`} />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-navy-800 mb-4">상세 설명</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{property.description}</p>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-navy-800">시세 그래프</h3>
              <div className="flex gap-2">
                {!predictionRequested ? (
                  <button
                    onClick={handlePredictPrice}
                    disabled={isLoading}
                    className="px-3 py-1 border rounded-md text-sm text-navy-600 border-navy-200 hover:bg-navy-50"
                  >
                    {isLoading ? (
                      <RefreshCw className="inline-block mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="inline-block mr-2 h-4 w-4" />
                    )}
                    AI 가격 예측
                  </button>
                ) : (
                  <button
                    onClick={handleRefreshPrediction}
                    disabled={isRefreshing}
                    className="px-3 py-1 border rounded-md text-sm text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    {isRefreshing ? (
                      <RotateCcw className="inline-block mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <RotateCcw className="inline-block mr-2 h-4 w-4" />
                    )}
                    예측 갱신
                  </button>
                )}
              </div>
            </div>

            <div className="h-[300px] w-full">
              {predictionRequested ? (
                <PriceChart propertyId={String(property.id)} showPrediction key={predictionKey} />
              ) : (
                <div className="h-full flex items-center justify-center bg-gray-100 text-sm text-gray-500">
                  예측 요청 필요
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ✅ 한 줄 정보 출력용 컴포넌트
const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex justify-between">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);
