import { useState } from 'react';
import PropertyModal from './PropertyModal';
import PropertyCard from './PropertyCard';
import type { PropertyCardData } from '../../types/property';
import { fetchPropertyDetails } from '../../api/search';

export default function PropertyGrid({ properties }: { properties: PropertyCardData[] }) {
  const [selectedProperty, setSelectedProperty] = useState<PropertyCardData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fullProperty, setFullProperty] = useState<any>(null);

  const handleClick = async (property: PropertyCardData) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
    setIsLoading(true);
    try {
      const details = await fetchPropertyDetails(property.title);
      const combined = { ...property, ...details };
      setFullProperty(combined);
    } catch (e) {
      console.error('상세 정보 불러오기 실패', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
    setFullProperty(null);
    setIsLoading(false);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 max-w-[1280px] mx-auto px-4 py-4">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onClick={() => handleClick(property)}
          />
        ))}
      </div>

      {isModalOpen && selectedProperty && (
        <PropertyModal
          isOpen={isModalOpen}
          onClose={handleClose}
          property={fullProperty ?? selectedProperty}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
