import PriceSlider from './PriceSlider';
import SearchButton from './SearchButton';
import SearchFilter from './SearchFilter';

export default function SearchForm() {
  return (
    <section className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-8 w-full max-w-[1280px] mx-auto">
      <h2 className="text-xl font-semibold text-navy-700 mb-4">매물 검색</h2>
      <div>
        <SearchFilter />
      </div>
      <div className="mt-6">
        <PriceSlider />
      </div>
      <div className="flex justify-end mt-6">
        <SearchButton />
      </div>
    </section>
  );
}
