import { useState, useEffect } from 'react';

import type { PropertyCardData } from '../../types/property';
import { fetchAllHistory, fetchHistoryDetail } from '../../api/search';
import HistoryModal from './HistoryModal';
import HistoryCard from './HistoryCard';

export default function HistoryList() {
  const [history, setHistory] = useState<PropertyCardData[]>([]);
  const [selected, setSelected] = useState<PropertyCardData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchAllHistory().then((data) => {
      const withIndex = data.map((item, idx) => ({ ...item, index: idx }));
      setHistory(withIndex);
    });
  }, []);

  const handleClick = async (id: number) => {
    const detail = await fetchHistoryDetail(id);
    setSelected(detail);
    setModalOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[1280px] mx-auto px-4 py-4">
        {history.map((item) => (
          <HistoryCard key={item.index} property={item} onClick={() => handleClick(item.index)} />
        ))}
      </div>

      <HistoryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} property={selected} />
    </>
  );
}
