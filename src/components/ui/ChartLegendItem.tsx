import { useThemeStore } from '../../store/themeStore';

interface ChartLegendItemProps {
  color: string;
  label: string;
  dashed?: boolean;
}

export default function ChartLegendItem({ color, label, dashed = false }: ChartLegendItemProps) {
  const isDark = useThemeStore((state) => state.isDark);

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginRight: 16 }}>
      <div
        style={{
          width: 16,
          height: 4,
          backgroundColor: dashed ? 'transparent' : color,
          marginRight: 6,
          ...(dashed
            ? {
                backgroundImage: `linear-gradient(to right, ${color} 50%, transparent 50%)`,
                backgroundSize: '8px 100%',
                backgroundRepeat: 'repeat-x',
              }
            : {}),
        }}
      />
      <span
        style={{
          fontSize: 12,
          color: isDark ? '#E6EDF3' : '#333',
        }}
      >
        {label}
      </span>
    </div>
  );
}
