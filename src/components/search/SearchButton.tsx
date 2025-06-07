import { Search } from 'lucide-react';

interface SearchButtonProps {
  onClick: () => void;
}

export default function SearchButton({ onClick }: SearchButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-navy-700 hover:bg-blue-800 text-white px-5 py-2 rounded-md text-sm"
    >
      <Search className="h-4 w-4" />
      검색하기
    </button>
  );
}
