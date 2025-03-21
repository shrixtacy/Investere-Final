
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { 
  BarChart4, TrendingUp, Search, ArrowRight, 
  Zap, ChevronDown, Download 
} from 'lucide-react';
import { 
  LineChart, Line, CartesianGrid, XAxis, YAxis, 
  Tooltip, ResponsiveContainer 
} from 'recharts';
import TimeRangeSelector from '@/components/dashboard/TimeRangeSelector';
import MarketIndices from '@/components/dashboard/MarketIndices';
import TopMovers from '@/components/dashboard/TopMovers';
import MarketUpdates from '@/components/dashboard/MarketUpdates';
import { getMarketDataForRange, TimeRange } from '@/utils/marketData';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('1M');
  const [chartData, setChartData] = useState(getMarketDataForRange(timeRange));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setChartData(getMarketDataForRange(timeRange));
  }, [timeRange]);

  const handleRangeChange = (range: TimeRange) => {
    setTimeRange(range);
  };

  return (
    <MainLayout>
      <div className="pt-28 pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="animate-slide-up">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Indian Financial Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Real-time financial insights and AI-powered predictions for Indian markets at your fingertips.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  { 
                    title: 'Nifty 50 Prediction', 
                    value: '+2.1%', 
                    desc: 'Expected growth in Q3',
                    trend: 'up',
                    icon: <TrendingUp className="h-5 w-5 text-finance-blue" />,
                    color: 'blue' 
                  },
                  { 
                    title: 'AI Insights Generated', 
                    value: '1,578', 
                    desc: 'For Indian markets',
                    trend: 'neutral',
                    icon: <Zap className="h-5 w-5 text-finance-indigo" />,
                    color: 'indigo' 
                  },
                  { 
                    title: 'Data Points Analyzed', 
                    value: '3.2M', 
                    desc: 'From 350+ Indian sources',
                    trend: 'up',
                    icon: <Search className="h-5 w-5 text-finance-teal" />,
                    color: 'teal' 
                  }
                ].map((stat, index) => (
                  <div 
                    key={index} 
                    className="glass-card rounded-xl p-5 animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {stat.title}
                      </div>
                      <div className={`h-8 w-8 flex items-center justify-center rounded-lg bg-${stat.color === 'blue' ? 'finance-blue' : stat.color === 'indigo' ? 'finance-indigo' : 'finance-teal'}/10`}>
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                        {stat.desc}
                      </span>
                      {stat.trend === 'up' && (
                        <span className="text-xs font-medium text-finance-green flex items-center">
                          <svg className="h-3 w-3 mr-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 15l-6-6-6 6" />
                          </svg>
                          10.2%
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="glass-card rounded-xl p-6 mb-8 animate-slide-up animate-delay-300">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Indian Market Overview</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      AI-predicted market trends for major Indian indices
                    </p>
                  </div>
                  <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                    <TimeRangeSelector 
                      selectedRange={timeRange} 
                      onRangeChange={handleRangeChange} 
                    />
                    <button className="flex items-center justify-center h-8 w-8 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="h-80 w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden mb-4 border border-gray-100 dark:border-gray-700">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 10,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="day" 
                        tick={{ fontSize: 12, fill: '#64748b' }}
                        axisLine={{ stroke: '#e5e7eb' }}
                        tickLine={{ stroke: '#e5e7eb' }}
                      />
                      <YAxis 
                        tickFormatter={(value) => `${value.toLocaleString()}`}
                        tick={{ fontSize: 12, fill: '#64748b' }}
                        axisLine={{ stroke: '#e5e7eb' }}
                        tickLine={{ stroke: '#e5e7eb' }}
                      />
                      <Tooltip 
                        formatter={(value) => [`${value.toLocaleString()}`, '']}
                        labelFormatter={(label) => `Date: ${label}`}
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '6px',
                          padding: '10px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="nifty" 
                        stroke="#0070f3" 
                        strokeWidth={2}
                        dot={{ r: 3, strokeWidth: 2, fill: 'white' }}
                        activeDot={{ r: 5, strokeWidth: 2 }}
                        name="Nifty 50"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="prediction" 
                        stroke="#14b8a6" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ r: 3, strokeWidth: 2, fill: 'white' }}
                        activeDot={{ r: 5, strokeWidth: 2 }}
                        name="AI Prediction"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-6">
                    <div className="h-3 w-3 rounded-full bg-finance-blue mr-2" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">Nifty 50</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-finance-teal mr-2" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">AI Prediction</span>
                  </div>
                </div>
                
                <MarketIndices />
              </div>
              
              <TopMovers />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="glass-card rounded-xl p-6 animate-slide-up animate-delay-400">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    AI-Generated Insights for Indian Markets
                  </h2>
                  
                  <div className="space-y-4">
                    {[
                      { title: 'Indian IT sector expected to outperform broader market by 3.5%', category: 'Sector Analysis' },
                      { title: 'RBI monetary policy likely to remain unchanged for Q2', category: 'Economic Policy' },
                      { title: 'Domestic equity inflows indicating robust retail participation', category: 'Fund Flows' }
                    ].map((insight, index) => (
                      <div key={index} className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded mb-2">
                          {insight.category}
                        </span>
                        <h3 className="text-gray-900 dark:text-white font-medium mb-2">{insight.title}</h3>
                        <Link to="/insights" className="text-sm text-finance-blue hover:text-blue-700 dark:hover:text-blue-400 transition-colors flex items-center">
                          View analysis
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </div>
                    ))}
                  </div>
                  
                  <Link to="/insights" className="mt-4 text-finance-blue hover:text-blue-700 dark:hover:text-blue-400 transition-colors font-medium flex items-center">
                    View all insights
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
                
                <MarketUpdates />
              </div>
            </div>
            
            <div className="lg:col-span-1 animate-slide-up animate-delay-200">
              <div className="sticky top-24">
                <div className="glass-card rounded-xl p-6 mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    AI Assistant
                  </h2>
                  
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 mb-4">
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-8 w-8 bg-finance-blue rounded-full flex items-center justify-center text-white font-medium">
                          AI
                        </div>
                        <div className="ml-3 bg-white dark:bg-gray-800 rounded-lg p-3 text-sm text-gray-700 dark:text-gray-300">
                          How can I help with your Indian market analysis today?
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Ask about Indian financial data..." 
                      className="w-full p-3 pr-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-finance-blue"
                    />
                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-finance-blue">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="glass-card rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Quick Actions
                  </h2>
                  
                  <div className="space-y-3">
                    <button className="w-full flex items-center p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors text-sm">
                      <span className="mr-3 text-finance-blue"><BarChart4 className="h-5 w-5" /></span>
                      Generate Nifty Prediction
                    </button>
                    <button className="w-full flex items-center p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors text-sm">
                      <span className="mr-3 text-finance-blue"><Search className="h-5 w-5" /></span>
                      Extract Indian Market Data
                    </button>
                    <button className="w-full flex items-center p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors text-sm">
                      <span className="mr-3 text-finance-blue"><TrendingUp className="h-5 w-5" /></span>
                      Analyze Sectoral Trends
                    </button>
                    <button className="w-full flex items-center p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors text-sm">
                      <span className="mr-3 text-finance-blue"><Download className="h-5 w-5" /></span>
                      Export Indian Market Report
                    </button>
                  </div>
                </div>
                
                <div className="glass-card rounded-xl p-6 mt-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Indian Economic Indicators
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">GDP Growth (FY24)</div>
                          <div className="text-lg font-semibold text-gray-900 dark:text-white">7.2%</div>
                        </div>
                        <div className="text-xs font-medium text-finance-green flex items-center">
                          <svg className="h-3 w-3 mr-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 15l-6-6-6 6" />
                          </svg>
                          0.3%
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Inflation (CPI)</div>
                          <div className="text-lg font-semibold text-gray-900 dark:text-white">4.85%</div>
                        </div>
                        <div className="text-xs font-medium text-finance-red flex items-center">
                          <svg className="h-3 w-3 mr-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                          0.12%
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Repo Rate</div>
                          <div className="text-lg font-semibold text-gray-900 dark:text-white">6.50%</div>
                        </div>
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          Unchanged
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">INR/USD</div>
                          <div className="text-lg font-semibold text-gray-900 dark:text-white">₹83.47</div>
                        </div>
                        <div className="text-xs font-medium text-finance-red flex items-center">
                          <svg className="h-3 w-3 mr-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                          0.08%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
