import { Calendar, CircleX } from 'lucide-react';
import type { ApartmentDetailData } from '../../types/property';

interface HistoryCardProps {
  property: ApartmentDetailData;
  onClick: () => void;
  onDelete: (id: number) => void;
}

export default function HistoryCard({ property, onClick, onDelete }: HistoryCardProps) {
  if (!property) return null;

  const id = property.id!;
  const title = property.summary_data?.title || property.complex_name || '-';
  const address = property.complex_info?.도로명주소 || property.complex_info?.지번주소 || '-';
  const type = property.summary_data?.feature?.유형 || '-';
  const area = property.area_detail?.area || property.complex_info?.면적 || '-';
  const createdAt = property.created_at?.split('T')[0];

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <div
      className="relative border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer bg-white"
      onClick={onClick}
    >
      {/* 삭제 버튼 */}
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 z-10"
        onClick={handleDelete}
      >
        <CircleX className="w-4 h-4" />
      </button>

      <div className="p-4 space-y-1">
        <h3 className="font-semibold text-gray-800 text-base truncate">{title}</h3>
        <p className="text-sm text-gray-500 truncate">{address}</p>

        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600">
          <div>
            <span className="font-medium text-gray-500">유형: </span>
            {type}
          </div>
          <div className="col-span-2">
            <span className="font-medium text-gray-500">면적: </span>
            {area}
          </div>
          <div>
            <div className="flex items-center gap-1 text-xs text-gray-500 pt-2 border-t">
              <Calendar className="w-3 h-3" />
              <span>조회일: {createdAt}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
