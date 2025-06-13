import { useEffect, useMemo, useState } from 'react';
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Area, Scatter } from 'recharts';
import type { ForecastPoint } from '../../types/property';
import ChartLegendItem from '../ui/ChartLegendItem';
import { useThemeStore } from '../../store/themeStore';

interface ForecastChartProps {
  data: ForecastPoint[];
}

export default function ForecastChart({ data }: ForecastChartProps) {
  const isDark = useThemeStore((s) => s.isDark);
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

  const labelMap: Record<string, string> = {
    upper: '상한가',
    lower: '하한가',
    band: '예측 범위',
    predictedBefore: '예측 (기존)',
    predictedAfter: '예측 (미래)',
    actual: '실제 거래가',
  };

  const labelColor: Record<string, string> = {
    upper: isDark ? 'text-dark-subtext' : 'text-gray-600',
    lower: isDark ? 'text-dark-subtext' : 'text-gray-600',
    predictedBefore: isDark ? 'text-blue-400' : 'text-blue-600',
    predictedAfter: isDark ? 'text-red-400' : 'text-red-600',
    band: isDark ? 'text-[rgba(79,125,249,0.5)]' : 'text-blue-400',
    actual: isDark ? 'text-dark-text' : 'text-navy-800',
  };

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
      style={{
        width: 800,
        margin: '0 auto',
        height: 400,
        backgroundColor: isDark ? '#262C31' : 'white',
        padding: 16,
      }}
    >
      <ComposedChart
        width={768}
        height={336}
        data={data}
        margin={{ top: 16, right: 16, bottom: 16, left: 0 }}
      >
        <CartesianGrid stroke={isDark ? '#8B949E' : '#eee'} strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fontSize: 10, fill: isDark ? '#E6EDF3' : '#333' }} />
        <YAxis
          type="number"
          tickFormatter={(v) => `${(v / 1e8).toFixed(1)}억`}
          domain={[yMin, yMax]}
          allowDataOverflow
          tick={{ fontSize: 10, fill: isDark ? '#E6EDF3' : '#333' }}
        />
        <Tooltip
          content={({ label, payload }) => {
            if (!payload || payload.length === 0) return null;

            return (
              <div
                className="bg-white shadow-md rounded-md p-3 border text-sm text-gray-700 min-w-[180px]
              dark:bg-dark-surface dark:shadow-md dark:border-dark-border"
              >
                <div
                  className="mb-2 font-semibold text-navy-800 flex items-center gap-1
                dark:text-dark-text"
                >
                  <span>📅{label}</span>
                </div>
                {payload.map((entry, index) => {
                  const { dataKey, value } = entry;
                  const name = labelMap[dataKey as string] ?? dataKey;
                  const color = labelColor[dataKey as string] ?? 'text-gray-700';

                  return (
                    <div key={index} className="flex justify-between items-center">
                      <span className={`truncate ${color}`}>{name}</span>
                      <span className="text-gray-900 dark:text-dark-text">
                        {value != null ? `${((value as number) / 1e8).toFixed(2)} 억 원` : '-'}
                      </span>
                    </div>
                  );
                })}
              </div>
            );
          }}
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
          fill="#4F7DF9"
          fillOpacity={0.15}
          isAnimationActive={enableAnimation}
          animationDuration={1200}
          animationEasing="ease-out"
        />

        {/* 예측 (기존) 선 */}
        <Line
          dataKey="predictedBefore"
          stroke={isDark ? '#6ea8ff' : '#4f7df9'}
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
          fill={isDark ? '#E6EDF3' : '#1B2A4E'}
          name="실제 거래가"
          shape={({ cx, cy, fill }: any) => <circle cx={cx} cy={cy} r={1.6} fill={fill} />}
          isAnimationActive={false}
        />
      </ComposedChart>

      {/* 범례 */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
        <ChartLegendItem color={isDark ? '#6ea8ff' : '#4f7df9'} label="예측 (기존)" />
        <ChartLegendItem color={isDark ? '#f87171' : '#f94f4f'} label="예측 (미래)" dashed />

        <ChartLegendItem color={isDark ? '#E6EDF3' : '#1B2A4E'} label="실제 거래가" dashed />
        <ChartLegendItem color="rgba(79, 125, 249, 0.5)" label="예측 범위" />
      </div>
    </div>
  );
}
