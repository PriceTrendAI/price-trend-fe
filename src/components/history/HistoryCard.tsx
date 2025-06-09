import type { ApartmentDetailData } from '../../types/property';

interface HistoryCardProps {
  property: ApartmentDetailData;
  onClick: () => void;
}

export default function HistoryCard({ property, onClick }: HistoryCardProps) {
  if (!property) return null;

  const title = property.summary_data?.title || property.complex_name || '-';
  const address = property.complex_info?.도로명주소 || property.complex_info?.지번주소 || '-';
  const type = property.summary_data?.feature?.유형 || '-';
  const area = property.area_detail?.area || property.complex_info?.면적 || '-';
  const createdAt = property.created_at?.split('T')[0];

  return (
    <div
      className="relative border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer bg-white"
      onClick={onClick}
    >
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
            <span className="font-medium text-gray-500">조회일: </span>
            {createdAt}
          </div>
        </div>
      </div>
    </div>
  );
}
