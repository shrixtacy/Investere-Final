
import { useState } from 'react';
import { 
  AreaChart, Area, 
  BarChart, Bar, 
  LineChart, Line, 
  ComposedChart, 
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Enhanced finance chart types
export type ChartType = 
  'area' | 'line' | 'bar' | 'candle' | 
  'radar' | 'pie' | 'composed' | 'gauge';

interface EnhancedChartsProps {
  data: any[];
  type: ChartType;
  title: string;
  height?: number;
  dataKeys: string[];
  xAxisKey: string;
  colors?: string[];
}

const EnhancedCharts = ({ 
  data, 
  type, 
  title, 
  height = 300, 
  dataKeys, 
  xAxisKey,
  colors = ['#3B82F6', '#10B981', '#F97316', '#8B5CF6', '#EC4899']
}: EnhancedChartsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] border border-gray-200 dark:border-gray-700 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">No data available</p>
      </div>
    );
  }
  
  // Create config for ChartContainer
  const config = Object.fromEntries(
    dataKeys.map((key, i) => [
      key, 
      { 
        label: key, 
        color: colors[i % colors.length],
        area: type === 'area' || type === 'composed'
      }
    ])
  );
  
  const renderChart = () => {
    switch (type) {
      case 'area':
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <ChartTooltip
              content={({ active, payload }) => (
                <ChartTooltipContent 
                  active={active} 
                  payload={payload} 
                  labelFormatter={(value) => `${value}`}
                />
              )}
            />
            <Legend />
            {dataKeys.map((key, i) => (
              <Area 
                key={key}
                type="monotone" 
                dataKey={key} 
                stroke={colors[i % colors.length]} 
                fill={colors[i % colors.length]} 
                fillOpacity={0.3}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            ))}
          </AreaChart>
        );
        
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <ChartTooltip
              content={({ active, payload }) => (
                <ChartTooltipContent 
                  active={active} 
                  payload={payload} 
                  labelFormatter={(value) => `${value}`}
                />
              )}
            />
            <Legend />
            {dataKeys.map((key, i) => (
              <Line 
                key={key}
                type="monotone" 
                dataKey={key} 
                stroke={colors[i % colors.length]} 
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        );
        
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <ChartTooltip
              content={({ active, payload }) => (
                <ChartTooltipContent 
                  active={active} 
                  payload={payload} 
                  labelFormatter={(value) => `${value}`}
                />
              )}
            />
            <Legend />
            {dataKeys.map((key, i) => (
              <Bar 
                key={key}
                dataKey={key} 
                fill={colors[i % colors.length]} 
                radius={[4, 4, 0, 0]} // Rounded top corners
                barSize={30}
              />
            ))}
          </BarChart>
        );
        
      case 'composed':
        return (
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <ChartTooltip
              content={({ active, payload }) => (
                <ChartTooltipContent 
                  active={active} 
                  payload={payload} 
                  labelFormatter={(value) => `${value}`}
                />
              )}
            />
            <Legend />
            {dataKeys.map((key, i) => {
              // Alternate between line and bar
              if (i % 2 === 0) {
                return (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={colors[i % colors.length]}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                );
              } else {
                return (
                  <Bar
                    key={key}
                    dataKey={key}
                    fill={colors[i % colors.length]}
                    barSize={20}
                  />
                );
              }
            })}
          </ComposedChart>
        );
        
      case 'pie':
        // Transform data for pie chart
        const pieData = dataKeys.map((key, index) => {
          const value = data.reduce((sum, item) => sum + (Number(item[key]) || 0), 0);
          return { name: key, value };
        });
        
        return (
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              onMouseEnter={(_, index) => setActiveIndex(index)}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}`, 'Value']} />
            <Legend />
          </PieChart>
        );
        
      case 'radar':
        return (
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey={xAxisKey} />
            <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
            {dataKeys.map((key, i) => (
              <Radar
                key={key}
                name={key}
                dataKey={key}
                stroke={colors[i % colors.length]}
                fill={colors[i % colors.length]}
                fillOpacity={0.2}
              />
            ))}
            <Legend />
            <Tooltip />
          </RadarChart>
        );
        
      default:
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <ChartTooltip
              content={({ active, payload }) => (
                <ChartTooltipContent 
                  active={active} 
                  payload={payload} 
                  labelFormatter={(value) => `${value}`}
                />
              )}
            />
            <Legend />
            {dataKeys.map((key, i) => (
              <Line 
                key={key}
                type="monotone" 
                dataKey={key} 
                stroke={colors[i % colors.length]} 
                strokeWidth={2}
              />
            ))}
          </LineChart>
        );
    }
  };
  
  return (
    <div className="w-full">
      <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">
        {title}
      </h3>
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
        <ChartContainer config={config} className={`h-[${height}px]`}>
          {renderChart()}
        </ChartContainer>
      </div>
    </div>
  );
};

export default EnhancedCharts;
