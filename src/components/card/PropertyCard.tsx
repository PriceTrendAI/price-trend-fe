import { Bookmark, BookmarkCheck, ImageOff } from 'lucide-react';

interface PropertyData {
  id: number;
  title: string;
  address: string;
  price: number;
  size: number;
  type: string;
  imageUrl?: string;
}

interface PropertyCardProps {
  property: PropertyData;
  onClick: () => void;
  onToggleScrap?: () => void;
  isScrapped?: boolean;
}

export default function PropertyCard({
  property,
  onClick,
  onToggleScrap,
  isScrapped = false,
}: PropertyCardProps) {
  return (
    <div
      className="border rounded-lg overflow-hidden shadow hover:shadow-md transition cursor-pointer bg-white"
      onClick={onClick}
    >
      <div className="relative h-48 w-full bg-gray-200">
        {property.imageUrl ? (
          <img
            src={property.imageUrl}
            alt={property.title}
            className="object-cover h-full w-full"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-[#eaeaea] text-sm">
            <ImageOff className="w-6 h-6 text-gray-400" />
          </div>
        )}
        {onToggleScrap && (
          <button
            className="absolute top-2 right-2 bg-white/80 rounded-full p-1"
            onClick={(e) => {
              e.stopPropagation();
              onToggleScrap();
            }}
          >
            {isScrapped ? (
              <BookmarkCheck className="w-5 h-5 text-blue-600" />
            ) : (
              <Bookmark className="w-5 h-5 text-gray-500" />
            )}
          </button>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1 truncate">{property.title}</h3>
        <p className="text-sm text-gray-500 mb-2">{property.address}</p>
        <div className="flex justify-between text-sm text-gray-700">
          <span className="font-medium">{property.price.toLocaleString()}원</span>
          <span>
            {property.size}평 · {property.type}
          </span>
        </div>
      </div>
    </div>
  );
}
