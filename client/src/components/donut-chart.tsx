import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface DonutChartProps {
  data: { name: string; value: number; color: string }[];
  size?: number;
}

export function DonutChart({ data, size = 200 }: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-6">
      {/* Donut Chart */}
      <div className="flex justify-center w-full" style={{ minHeight: `${size}px` }}>
        <div style={{ width: `${Math.min(size, 300)}px`, height: `${Math.min(size, 300)}px` }}>
          <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="85%"
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-3">
        {data.map((item, index) => {
          const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-sm flex-shrink-0" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-foreground font-medium">{item.name}</span>
              </div>
              <span className="text-sm font-semibold text-foreground">{percentage}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
