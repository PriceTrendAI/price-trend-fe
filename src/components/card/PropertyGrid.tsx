import { useState } from 'react';
import PropertyModal from '../modal/PropertyModal';
import PropertyCard from './PropertyCard';

export interface PropertyData {
  id: number;
  title: string;
  address: string;
  price: number;
  size: number;
  type: string;
  imageUrl?: string;
  rooms: number;
  bathrooms: number;
  builtYear: number;
  description: string;
}

interface PropertyGridProps {
  properties: PropertyData[];
}

export default function PropertyGrid({ properties }: PropertyGridProps) {
  const [selectedProperty, setSelectedProperty] = useState<PropertyData | null>(null);

  const handleClick = (id: number) => {
    const property = properties.find((p) => p.id === id);
    if (property) setSelectedProperty(property);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[1280px] mx-auto px-4 py-4">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onClick={() => handleClick(property.id)}
          />
        ))}
      </div>
      <PropertyModal
        isOpen={!!selectedProperty}
        onClose={() => setSelectedProperty(null)}
        property={selectedProperty}
      />
    </div>
  );
}
