import { useState, useEffect } from 'react';
import { toast } from 'sonner';

import type { ApartmentDetailData } from '../../types/property';
import { fetchAllHistory, fetchHistoryDetail, deleteHistoryDetail } from '../../api/search';
import HistoryModal from './HistoryModal';
import HistoryCard from './HistoryCard';

export default function HistoryGrid() {
  const [history, setHistory] = useState<ApartmentDetailData[]>([]);
  const [selected, setSelected] = useState<ApartmentDetailData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [sortType, setSortType] = useState<'recent' | 'name' | 'recent-desc'>('recent');

  const loadHistory = async () => {
    const data = await fetchAllHistory();
    setHistory(data);
  };

  const sortedHistory = [...history].sort((a, b) => {
    if (sortType === 'name') {
      const aTitle = a.summary_data?.title || '';
      const bTitle = b.summary_data?.title || '';
      return aTitle.localeCompare(bTitle, 'ko');
    }
    const aTime = new Date(a.created_at || '').getTime();
    const bTime = new Date(b.created_at || '').getTime();
    return sortType === 'recent-desc' ? aTime - bTime : bTime - aTime;
  });

  useEffect(() => {
    loadHistory();
  }, []);

  const handleClick = async (id: number) => {
    try {
      const detail = await fetchHistoryDetail(id);
      setSelected(detail);
      setModalOpen(true);
    } catch {
      toast.error('상세 정보를 불러오지 못했습니다.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteHistoryDetail(id);
      if (selected?.id === id) {
        setModalOpen(false);
      }
      toast.success('삭제되었습니다.');
      loadHistory();
    } catch {
      toast.error('오류가 발생했습니다.');
    }
  };

  return (
    <>
      <div className="max-w-[1280px] mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-gray-600 text-sm dark:text-dark-text">총 {history.length}건</div>
        <select
          className="text-sm border px-2 py-1 rounded bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-navy-100
          dark:bg-dark-surface dark:text-dark-text dark:border-dark-border dark:focus:ring-dark-icon"
          value={sortType}
          onChange={(e) => setSortType(e.target.value as 'recent' | 'recent-desc' | 'name')}
        >
          <option value="recent">최신순</option>
          <option value="recent-desc">과거순</option>
          <option value="name">가나다순</option>
        </select>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 dark:text-dark-text">조회된 기록이 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[1280px] mx-auto px-4 pb-12">
          {sortedHistory.map((item) => (
            <HistoryCard
              key={item.id}
              property={item}
              onClick={() => handleClick(item.id!)}
              onDelete={() => handleDelete(item.id!)}
            />
          ))}
        </div>
      )}

      <HistoryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} property={selected} />
    </>
  );
}
