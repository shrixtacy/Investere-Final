
import { useState, useEffect } from 'react';
import { 
  LineChart, Line, 
  AreaChart, Area,
  XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, 
  BarChart, Bar, LabelList,
  ScatterChart, Scatter, ZAxis,
  ComposedChart, ReferenceLine
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import EnhancedCharts from './EnhancedCharts';

// Update the props interface to accept data and stockSymbols
interface StockComparisonChartProps {
  data: Array<any>;
  stockSymbols: Array<string>;
}

const StockComparisonChart = ({ data, stockSymbols }: StockComparisonChartProps) => {
  // Configure colors based on symbols
  const symbol1 = stockSymbols[0];
  const symbol2 = stockSymbols[1];
  
  const config = {
    [symbol1]: { label: symbol1, color: "#3B82F6" },
    [symbol2]: { label: symbol2, color: "#10B981" },
  };
  
  return (
    <div className="w-full">
      <ChartContainer config={config} className="h-[300px]">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorStock1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="colorStock2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <ChartTooltip
            content={({ active, payload }) => (
              <ChartTooltipContent 
                active={active} 
                payload={payload} 
                labelFormatter={(value) => `Date: ${value}`}
              />
            )}
          />
          <Legend />
          <Area 
            type="monotone" 
            dataKey={symbol1} 
            stroke="#3B82F6" 
            fillOpacity={0.3}
            fill="url(#colorStock1)"
            strokeWidth={2} 
            activeDot={{ r: 6 }} 
          />
          <Area 
            type="monotone" 
            dataKey={symbol2} 
            stroke="#10B981" 
            fillOpacity={0.3}
            fill="url(#colorStock2)"
            strokeWidth={2} 
            activeDot={{ r: 6 }} 
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};

export default StockComparisonChart;
