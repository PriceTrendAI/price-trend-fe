import { useState, useMemo } from 'react';
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Area, Scatter } from 'recharts';
import type { ForecastPoint } from '../../types/property';

interface ForecastChartProps {
  data: ForecastPoint[];
}

export default function ForecastChart({ data }: ForecastChartProps) {
  const [yMin, yMax] = useMemo(() => {
    if (!data.length) return [0, 0];
    const lowers = data.map((d) => d.lower);
    const uppers = data.map((d) => d.upper);
    const STEP = 100 * 1e6;
    return [
      Math.floor(Math.min(...lowers) / STEP) * STEP,
      Math.ceil(Math.max(...uppers) / STEP) * STEP,
    ];
  }, [data]);

  return (
    <div
      style={{
        width: 800,
        margin: '0 auto',
        height: 400,
        backgroundColor: 'white',
        padding: 16,
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 8,
          color: '#333',
        }}
      >
        📈 부동산 가격 예측
      </h2>
      <ComposedChart
        width={768}
        height={336}
        data={data}
        margin={{ top: 16, right: 16, bottom: 16, left: 0 }}
      >
        <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fontSize: 10 }} />
        <YAxis
          type="number"
          tickFormatter={(v) => `${(v / 1e6).toFixed(0)}백만`}
          domain={[yMin, yMax]}
          allowDataOverflow
          tick={{ fontSize: 12 }}
        />
        <Tooltip
          formatter={(v: number) => `${(v / 1e6).toFixed(1)} 백만 원`}
          labelStyle={{ color: '#333', fontSize: 12 }}
          itemStyle={{ color: '#333', fontSize: 12 }}
          labelFormatter={(d) => `📅 ${d}`}
          animationDuration={0}
        />
        <Line
          type="monotone"
          dataKey="upper"
          stroke="transparent"
          dot={false}
          activeDot={false}
          isAnimationActive={false}
        />
        <Area
          type="monotone"
          dataKey="lower"
          stackId="band"
          stroke="none"
          fill="transparent"
          isAnimationActive={false}
        />
        <Area
          type="monotone"
          dataKey="band"
          stackId="band"
          stroke="none"
          fill="#4f7df9"
          fillOpacity={0.15}
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          dataKey="predictedBefore"
          stroke="#4f7df9"
          strokeWidth={2}
          dot={false}
          name="예측 (기존)"
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          dataKey="predictedAfter"
          stroke="#f94f4f"
          strokeWidth={2}
          dot={false}
          strokeDasharray="4 4"
          name="예측 (미래)"
          isAnimationActive={false}
        />
        <Scatter
          dataKey="actual"
          fill="#000"
          name="실제 거래가"
          shape={(props: any) => {
            const { cx, cy, fill } = props;
            return <circle cx={cx} cy={cy} r={3} fill={fill} />;
          }}
          isAnimationActive={false}
        />
      </ComposedChart>
    </div>
  );
}
