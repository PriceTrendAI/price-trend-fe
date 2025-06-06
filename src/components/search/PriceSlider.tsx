'use client';

import { useState } from 'react';
import { formatPrice } from '../../utils/format';
import { Slider } from '../ui/slider';

export default function PriceSlider() {
  const [priceRange, setPriceRange] = useState<number[]>([0, 100000]);

  const formatPriceRange = (value: number) => {
    if (value === 0) return '0원';
    if (value < 10000) return `${value}만원`;
    return formatPrice(value); // 10000 이상 → formatPrice(예: 1억)
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">가격 범위</label>
        <span className="text-sm text-gray-500">
          {formatPriceRange(priceRange[0])} ~ {formatPriceRange(priceRange[1])}
        </span>
      </div>
      <div className="px-3 py-2">
        <Slider
          defaultValue={[0, 100000]}
          max={100000}
          step={100}
          value={priceRange}
          onValueChange={setPriceRange}
        />
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
