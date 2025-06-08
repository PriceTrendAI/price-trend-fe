import { Building } from 'lucide-react';
import type { PropertyCardData } from '../../types/property';

interface PropertyCardProps {
  property: PropertyCardData;
  onClick: () => void;
  onToggleScrap?: () => void;
  isScrapped?: boolean;
}

export default function PropertyCard({ property, onClick }: PropertyCardProps) {
  return (
    <div
      className="relative border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer bg-white"
      onClick={onClick}
    >
      {/* 상단 배경 or 이미지 */}
      <div className="relative h-40 w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <span className="text-sm text-gray-400">Price Trend AI</span>
        <div className="absolute top-2 left-2 bg-white/70 p-1 rounded-full">
          <Building className="w-4 h-4 text-gray-300" />
        </div>
      </div>

      {/* 하단 정보 */}
      <div className="p-4 space-y-1">
        <h3 className="font-semibold text-gray-800 text-base truncate">{property.title}</h3>
        <p className="text-sm text-gray-500 truncate">{property.address}</p>

        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600">
          <div>
            <span className="font-medium text-gray-500">유형: </span>
            {property.type}
          </div>
          <div className="col-span-2">
            <span className="font-medium text-gray-500">면적: </span>
            {property.area}
          </div>
        </div>
      </div>
    </div>
  );
}
