import { useState, useEffect } from 'react';
import { toast } from 'sonner';

import type { PropertyCardData } from '../../types/property';
import { fetchAllHistory, fetchHistoryDetail, deleteHistoryDetail } from '../../api/search';
import HistoryModal from './HistoryModal';
import HistoryCard from './HistoryCard';

export default function HistoryGrid() {
  const [history, setHistory] = useState<PropertyCardData[]>([]);
  const [selected, setSelected] = useState<PropertyCardData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const loadHistory = async () => {
    const data = await fetchAllHistory();
    setHistory(data);
  };

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
      toast.error('삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      {history.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500">조회된 기록이 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[1280px] mx-auto px-4 py-4">
          {history.map((item) => (
            <HistoryCard
              key={item.id} 
              property={item}
              onClick={() => handleClick(item.id)} 
              onDelete={() => handleDelete(item.id)}
            />
          ))}
        </div>
      )}

      <HistoryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} property={selected} />
    </>
  );
}
