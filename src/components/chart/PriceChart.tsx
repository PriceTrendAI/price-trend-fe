'use client';

import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

interface PricePoint {
  date: string;
  actual?: number;
  predicted?: number;
  upper?: number;
  lower?: number;
}

interface RechartsPriceChartProps {
  data: PricePoint[];
}

export default function RechartsPriceChart({ data }: RechartsPriceChartProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />

        <Area type="monotone" dataKey="upper" stroke="none" fillOpacity={0.1} fill="#4ade80" />
        <Area type="monotone" dataKey="lower" stroke="none" fillOpacity={0.1} fill="#f87171" />

        <Line type="monotone" dataKey="actual" stroke="#334155" strokeWidth={2} dot={{ r: 3 }} />
        <Line
          type="monotone"
          dataKey="predicted"
          stroke="#6366f1"
          strokeDasharray="5 5"
          strokeWidth={2}
          dot={{ r: 3 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
