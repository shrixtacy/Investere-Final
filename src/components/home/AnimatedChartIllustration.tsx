
import React, { useEffect, useState } from 'react';
import { 
  LineChart, 
  Line, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  AreaChart,
  Area,
  ResponsiveContainer
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

// Define chart configurations with enhanced styling
const chartConfig = {
  nifty: {
    label: "Nifty 50",
    theme: {
      light: "#6366f1", // Indigo color
      dark: "#818cf8"
    }
  },
  sensex: {
    label: "Sensex",
    theme: {
      light: "#10b981", // Emerald color
      dark: "#34d399"
    }
  },
  banking: {
    label: "Banking",
    theme: {
      light: "#f59e0b", // Amber color
      dark: "#fbbf24"
    }
  }
};

// Initial data states with more data points for smoother curves
const initialNiftyData = [
  { day: 'Mon', price: 22400 },
  { day: 'Tue', price: 22320 },
  { day: 'Wed', price: 22380 },
  { day: 'Thu', price: 22450 },
  { day: 'Fri', price: 22500 },
  { day: 'Sat', price: 22550 },
  { day: 'Sun', price: 22580 }
];

const initialSensexData = [
  { day: 'Mon', price: 73800 },
  { day: 'Tue', price: 73650 },
  { day: 'Wed', price: 73900 },
  { day: 'Thu', price: 74200 },
  { day: 'Fri', price: 74350 },
  { day: 'Sat', price: 74250 },
  { day: 'Sun', price: 74400 }
];

const initialBankingData = [
  { day: 'Mon', price: 47800 },
  { day: 'Tue', price: 47600 },
  { day: 'Wed', price: 47900 },
  { day: 'Thu', price: 48100 },
  { day: 'Fri', price: 48350 },
  { day: 'Sat', price: 48200 },
  { day: 'Sun', price: 48400 }
];

// Generate more realistic data points with smoother transitions
const generateRandomData = (baseData: any[], volatility: number = 80) => {
  return baseData.map((item, index) => {
    // Create smoother trend lines
    const noise = Math.sin(index * 0.5) * volatility * 0.7 + (Math.random() - 0.5) * volatility;
    return {
      ...item,
      price: item.price + noise
    };
  });
};

const AnimatedChartIllustration = () => {
  const [chartIndex, setChartIndex] = useState(0);
  const [niftyData, setNiftyData] = useState(initialNiftyData);
  const [sensexData, setSensexData] = useState(initialSensexData);
  const [bankingData, setBankingData] = useState(initialBankingData);
  
  const charts = [
    { 
      title: "Nifty 50", 
      data: niftyData, 
      dataKey: "nifty",
      icon: TrendingUp,
      color: "#6366f1",
      gradientStart: "#c7d2fe",
      gradientEnd: "#6366f150"
    },
    { 
      title: "Sensex", 
      data: sensexData, 
      dataKey: "sensex",
      icon: BarChart3,
      color: "#10b981",
      gradientStart: "#a7f3d0",
      gradientEnd: "#10b98150"
    },
    { 
      title: "Bank Nifty", 
      data: bankingData, 
      dataKey: "banking",
      icon: TrendingDown,
      color: "#f59e0b",
      gradientStart: "#fde68a",
      gradientEnd: "#f59e0b50"
    }
  ];

  const currentChart = charts[chartIndex];
  
  // Update chart data and rotate charts
  useEffect(() => {
    const dataInterval = setInterval(() => {
      setNiftyData(generateRandomData(niftyData));
      setSensexData(generateRandomData(sensexData));
      setBankingData(generateRandomData(bankingData));
    }, 2500); // Slower updates for smoother animation
    
    const rotateInterval = setInterval(() => {
      setChartIndex((prevIndex) => (prevIndex + 1) % charts.length);
    }, 6000); // Give more time to view each chart
    
    return () => {
      clearInterval(dataInterval);
      clearInterval(rotateInterval);
    };
  }, [niftyData, sensexData, bankingData]);

  // Calculate change percentage
  const calculateChange = (data: any[]) => {
    if (data.length < 2) return 0;
    const firstValue = data[0].price;
    const lastValue = data[data.length - 1].price;
    return ((lastValue - firstValue) / firstValue) * 100;
  };

  const changePercent = calculateChange(currentChart.data);
  const isPositive = changePercent >= 0;

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          <currentChart.icon className="h-5 w-5" style={{ color: currentChart.color }} />
          <h3 className="font-medium text-gray-900 dark:text-white">{currentChart.title}</h3>
        </div>
        <div className={`text-sm font-medium flex items-center ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
          {isPositive ? (
            <TrendingUp className="h-4 w-4 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 mr-1" />
          )}
          {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
        </div>
      </div>
      
      <div className="relative flex-1 bg-white dark:bg-gray-800 rounded-xl p-4 overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
        <ChartContainer className="h-full" config={chartConfig}>
          {/* Use a fixed height container instead of ResponsiveContainer to avoid the "cut-off" issue */}
          <div style={{ width: '100%', height: '100%', minHeight: '180px' }}>
            <AreaChart 
              data={currentChart.data} 
              margin={{ top: 10, right: 5, left: 5, bottom: 10 }}
              width={500}
              height={200}
            >
              <defs>
                <linearGradient id={`color${chartIndex}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={currentChart.gradientStart} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={currentChart.gradientEnd} stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: 12, fill: '#94a3b8' }} 
                axisLine={false} 
                tickLine={false} 
                dy={10}
              />
              <YAxis 
                domain={['dataMin - 200', 'dataMax + 200']} 
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                axisLine={false}
                tickLine={false}
                width={40}
              />
              <Tooltip 
                content={<ChartTooltipContent />} 
                cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '5 5' }}
              />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke={currentChart.color} 
                strokeWidth={2.5}
                fill={`url(#color${chartIndex})`}
                activeDot={{ r: 6, strokeWidth: 0, fill: currentChart.color }}
                animationDuration={700}
                animationEasing="ease-in-out"
              />
            </AreaChart>
          </div>
        </ChartContainer>
      </div>
      
      <div className="flex justify-between items-center mt-3 text-xs text-gray-500 dark:text-gray-400">
        <div>This week</div>
        <div className="flex space-x-2">
          {charts.map((chart, index) => (
            <div 
              key={chart.dataKey}
              className={`h-1.5 w-6 rounded-full cursor-pointer transition-all duration-300 ${
                index === chartIndex ? 
                  (chart.dataKey === 'nifty' ? 'bg-indigo-500' : 
                   chart.dataKey === 'sensex' ? 'bg-emerald-500' : 'bg-amber-500')
                : 'bg-gray-200 dark:bg-gray-700'
              }`}
              onClick={() => setChartIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedChartIllustration;
