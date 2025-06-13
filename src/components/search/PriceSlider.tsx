'use client';

import { formatPrice } from '../../utils/format';
import { Slider } from '../ui/PriceSlider';

interface PriceSliderProps {
  value: number[];
  onChange: (value: number[]) => void;
}

export default function PriceSlider({ value, onChange }: PriceSliderProps) {
  const formatPriceRange = (val: number) => {
    if (val === 0) return '0원';
    if (val < 10000) return `${val}만원`;
    return formatPrice(val);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">가격 범위</label>
        <span className="text-sm text-gray-500">
          {formatPriceRange(value[0])} ~ {formatPriceRange(value[1])}
        </span>
      </div>
      <div className="px-3 py-2">
        <Slider max={100000} step={100} value={value} onValueChange={onChange} />
      </div>
      <div className="flex justify-between text-xs text-gray-500 px-3">
        <span>0원</span>
        <span>1천만원</span>
        <span>5천만원</span>
        <span>1억원</span>
        <span>5억원</span>
        <span>10억원</span>
      </div>
    </div>
  );
}
