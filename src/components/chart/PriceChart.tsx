'use client';

import { useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import type { TooltipProps } from 'recharts';

interface PricePoint {
  date: string;
  price?: number;
  upperPrice?: number;
  lowerPrice?: number;
  isPrediction?: boolean;
}

interface PriceChartProps {
  showPrediction?: boolean;
}

const mockPriceHistory: PricePoint[] = [
  { date: '2024-01', price: 78000 },
  { date: '2024-02', price: 80000 },
  { date: '2024-03', price: 82000 },
  { date: '2024-04', price: 83000 },
  { date: '2024-05', price: 84000 },
];

const mockPricePrediction: PricePoint[] = [
  {
    date: '2024-06',
    upperPrice: 87000,
    lowerPrice: 83000,
    price: 85000,
    isPrediction: true,
  },
  {
    date: '2024-07',
    upperPrice: 88000,
    lowerPrice: 84000,
    price: 86000,
    isPrediction: true,
  },
  {
    date: '2024-08',
    upperPrice: 89000,
    lowerPrice: 85000,
    price: 87000,
    isPrediction: true,
  },
];

const getCurrentYearMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

export default function PriceChart({ showPrediction = false }: PriceChartProps) {
  const today = useMemo(() => getCurrentYearMonth(), []);

  const combinedData: PricePoint[] = useMemo(() => {
    const actual = mockPriceHistory.map((p) => ({
      ...p,
      upperPrice: undefined,
      lowerPrice: undefined,
    }));
    const prediction = showPrediction
      ? mockPricePrediction.filter((p) => !actual.some((a) => a.date === p.date))
      : [];
    return [...actual, ...prediction].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  }, [showPrediction]);

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload?.length) {
      const data = payload[0].payload as PricePoint;
      const label = new Date(data.date + '-01').toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
      });

      return (
        <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-md">
          <p className="text-xs text-gray-500">{label}</p>
          {data.price !== undefined && (
            <p className="font-medium">
              기준: {data.price?.toLocaleString()}만원
              {data.isPrediction && <span className="text-blue-500 text-xs ml-1">(예측)</span>}
            </p>
          )}
          {data.upperPrice !== undefined && data.lowerPrice !== undefined && (
            <p className="font-medium text-blue-600">
              예측 범위: {data.lowerPrice?.toLocaleString()}만원 ~{' '}
              {data.upperPrice?.toLocaleString()}만원
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const formatYAxis = (v: number) => {
    if (v >= 10000) return `${(v / 10000).toFixed(1)}억`;
    if (v >= 1000) return `${(v / 1000).toFixed(0)}천만`;
    return `${v}만`;
  };

  const formatXAxis = (v: string) => {
    const date = new Date(v + '-01');
    return `${date.getMonth() + 1}월`;
  };

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={combinedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: '#64748b' }}
            tickFormatter={formatXAxis}
          />
          <YAxis tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={formatYAxis} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine x={today} stroke="#94a3b8" strokeWidth={1} strokeDasharray="3 3" />

          <Line
            type="monotone"
            dataKey="price"
            stroke="#334155"
            dot={false}
            isAnimationActive={false}
          />

          {showPrediction && (
            <>
              <Line
                type="monotone"
                dataKey="upperPrice"
                stroke="#60a5fa"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="lowerPrice"
                stroke="#60a5fa"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
