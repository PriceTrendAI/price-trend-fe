import PropertyCard from './PropertyCard';

const dummyProperties = [
  {
    id: 1,
    title: '강남 센트럴파크 아파트 32평 남향',
    address: '서울 서대문구 신촌동',
    price: 75000000,
    size: 15,
    type: '원룸',
    imageUrl: '/images/sample1.jpg',
    rooms: 1,
    bathrooms: 1,
    builtYear: 2018,
    description: '햇살 잘 드는 남향 아파트입니다.',
  },
  {
    id: 2,
    title: '마포 한강뷰 오피스텔 20평',
    address: '서울 강남구 역삼동',
    price: 120000000,
    size: 25,
    type: '오피스텔',
  },
  {
    id: 3,
    title: '건대역 근처 투룸',
    address: '서울 광진구 화양동',
    price: 98000000,
    size: 20,
    type: '투룸',
  },
  {
    id: 4,
    title: '건대역 근처 투룸',
    address: '서울 광진구 화양동',
    price: 98000000,
    size: 20,
    type: '투룸',
  },
  {
    id: 5,
    title: '건대역 근처 투룸',
    address: '서울 광진구 화양동',
    price: 98000000,
    size: 20,
    type: '투룸',
  },
];

export default function PropertyGrid() {
  const handleClick = (id: number) => {
    console.log(`Card clicked: ${id}`);
  };

  return (
    <div>
      <h2 className="max-w-[1280px] mx-auto px-4 text-2xl font-semibold text-navy-800">
        검색 결과
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[1280px] mx-auto px-4 py-4">
        {dummyProperties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onClick={() => handleClick(property.id)}
          />
        ))}
      </div>
    </div>
  );
}
