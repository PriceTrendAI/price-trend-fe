import { useEffect, useMemo, useState } from 'react';
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Area, Scatter } from 'recharts';
import type { ForecastPoint } from '../../types/property';
import ChartLegendItem from '../ui/ChartLegendItem';

interface ForecastChartProps {
  data: ForecastPoint[];
}

export default function ForecastChart({ data }: ForecastChartProps) {
  const [enableAnimation, setEnableAnimation] = useState(false);
  const [showAfterLine, setShowAfterLine] = useState(false);

  // Y축 최소/최대 계산
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

  // 애니메이션과 predictedAfter 표시 트리거
  useEffect(() => {
    if (data.length > 0) {
      setEnableAnimation(false);
      setShowAfterLine(false);

      const enableAnimationTimer = setTimeout(() => {
        setEnableAnimation(true);
      }, 50);

      const showAfterLineTimer = setTimeout(() => {
        setShowAfterLine(true);
      }, 1250);

      return () => {
        clearTimeout(enableAnimationTimer);
        clearTimeout(showAfterLineTimer);
      };
    }
  }, [data]);
  if (data.length === 0) return null;

  return (
    <div
      style={{ width: 800, margin: '0 auto', height: 400, backgroundColor: 'white', padding: 16 }}
    >
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
          tickFormatter={(v) => `${(v / 1e8).toFixed(1)}억`}
          domain={[yMin, yMax]}
          allowDataOverflow
          tick={{ fontSize: 12 }}
        />
        <Tooltip
          formatter={(v: number) => `${(v / 1e8).toFixed(2)} 억 원`}
          labelFormatter={(d) => `📅 ${d}`}
          labelStyle={{ color: '#333', fontSize: 12 }}
          itemStyle={{ color: '#333', fontSize: 12 }}
          animationDuration={0}
        />
        {/* 불필요한 시각 요소들 숨김 처리 */}
        <Line
          dataKey="upper"
          stroke="transparent"
          dot={false}
          activeDot={false}
          isAnimationActive={false}
        />
        <Area
          dataKey="lower"
          stackId="band"
          stroke="none"
          fill="transparent"
          isAnimationActive={false}
        />

        {/* 예측 범위 영역 */}
        <Area
          dataKey="band"
          stackId="band"
          stroke="none"
          fill="#4f7df9"
          fillOpacity={0.15}
          isAnimationActive={enableAnimation}
          animationDuration={1200}
          animationEasing="ease-out"
        />

        {/* 예측 (기존) 선 */}
        <Line
          dataKey="predictedBefore"
          stroke="#4f7df9"
          strokeWidth={2}
          dot={false}
          name="예측 (기존)"
          isAnimationActive={enableAnimation}
          animationDuration={1200}
          animationEasing="ease-out"
          connectNulls={true}
        />

        {/* 예측 (미래) 선 - 예측(기존) 선 끝난 뒤 등장 */}
        {showAfterLine && (
          <Line
            dataKey="predictedAfter"
            stroke="#f94f4f"
            strokeWidth={2}
            dot={false}
            strokeDasharray="4 4"
            name="예측 (미래)"
            isAnimationActive={enableAnimation}
            animationDuration={800}
            animationEasing="ease-out"
          />
        )}

        {/* 실제 거래가 점 */}
        <Scatter
          dataKey="actual"
          fill="#1B2A4E"
          name="실제 거래가"
          shape={({ cx, cy, fill }: any) => <circle cx={cx} cy={cy} r={1.6} fill={fill} />}
          isAnimationActive={false}
        />
      </ComposedChart>

      {/* 범례 */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
        <ChartLegendItem color="#4f7df9" label="예측 (기존)" />
        <ChartLegendItem color="#f94f4f" label="예측 (미래)" dashed />
        <ChartLegendItem color="#1B2A4E" label="실제 거래가" dashed />
        <ChartLegendItem color="rgba(79, 125, 249, 0.15)" label="예측 범위" />
      </div>
    </div>
  );
}
