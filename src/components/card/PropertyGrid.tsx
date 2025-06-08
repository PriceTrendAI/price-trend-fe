import { useState } from 'react';
import PropertyModal from '../modal/PropertyModal';
import PropertyCard from './PropertyCard';
import type { PropertyCardData } from '../../types/property';

interface PropertyGridProps {
  properties: PropertyCardData[];
}

export default function PropertyGrid({ properties }: PropertyGridProps) {
  const [selectedProperty, setSelectedProperty] = useState<PropertyCardData | null>(null);

  const handleClick = (index: number) => {
    const property = properties.find((p) => p.index === index);
    if (property) setSelectedProperty(property);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[1280px] mx-auto px-4 py-4">
        {properties.map((property) => (
          <PropertyCard
            key={property.index}
            property={property}
            onClick={() => handleClick(property.index)}
          />
        ))}
      </div>
      {selectedProperty && (
        <PropertyModal
          isOpen={!!selectedProperty}
          onClose={() => setSelectedProperty(null)}
          property={selectedProperty}
        />
      )}
    </div>
  );
}
