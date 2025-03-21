
import { useEffect, useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { TrendingUp, TrendingDown, ChevronRight, Filter, Calendar, Download } from 'lucide-react';

const insights = [
  {
    id: 1,
    title: 'Nifty 50 Expected to Rise 2.1% in Next Quarter',
    category: 'Indian Market Prediction',
    date: 'May 21, 2024',
    trend: 'positive',
    confidence: 84,
    summary: 'Our AI models indicate a strong likelihood of continued growth in the Nifty 50 index over the next 3 months, driven by IT, banking, and consumer goods sectors.',
    details: 'Based on analysis of over 1.2 million data points from 500+ sources, our algorithms predict sustained growth in the Nifty 50. Key contributing factors include strong earnings reports from IT companies, favorable domestic monetary policy environment, and increased consumer spending in FMCG sector. Foreign Institutional Investors (FIIs) are expected to increase their allocations to Indian markets, providing additional momentum. The analysis also factors in global market conditions and geopolitical developments that could potentially impact Indian markets.'
  },
  {
    id: 2,
    title: 'India Inflation Rate Projected to Moderate to 4.5%',
    category: 'Indian Economic Indicator',
    date: 'May 18, 2024',
    trend: 'positive',
    confidence: 91,
    summary: 'Following recent RBI policy adjustments, our models predict India\'s inflation will stabilize near the target range within the next two quarters.',
    details: 'Analysis of CPI trends, commodity prices, domestic agricultural output, and RBI policies suggests inflation will moderate to 4.5% (±0.3%) by Q3 2024. Our models show high confidence in this stabilization based on correlation between current indicators and historical patterns. Key sectors driving this trend include food, housing, and energy. The RBI\'s recent monetary policy stance, maintaining repo rate at 6.5%, is aligned with this projection. Declining international crude oil prices and stable domestic food production are expected to contribute significantly to inflation moderation.'
  },
  {
    id: 3,
    title: 'Indian IT Sector Poised for Robust Growth',
    category: 'Sector Analysis',
    date: 'May 15, 2024',
    trend: 'positive',
    confidence: 87,
    summary: 'AI and digital transformation initiatives are expected to drive continued outperformance in the Indian IT sector, with projected growth exceeding broader market returns by 3-5%.',
    details: 'Our IT sector growth model analyzes revenue projections, global tech spending, client budget allocations, and digitalization trends. The model predicts Indian IT sector growth will outpace the broader market by 3-5% over the next 12 months, with AI/ML services and cloud migration as the primary growth drivers. This analysis is supported by increasing global enterprise spending on digital transformation and particular strength in key markets like the US and Europe. Top performers are expected to be TCS, Infosys, and HCL Technologies, with mid-tier firms showing potential for higher percentage growth.'
  },
  {
    id: 4,
    title: 'INR Expected to Face Moderate Pressure Against USD',
    category: 'Forex Outlook',
    date: 'May 12, 2024',
    trend: 'negative',
    confidence: 76,
    summary: 'Our models project continued pressure on the Indian Rupee against the USD, with potential depreciation of 1-3% over the next quarter.',
    details: 'Factors contributing to this outlook include US monetary policy, global risk sentiment, India\'s trade balance, and capital flows. The INR has shown relative stability compared to other emerging market currencies but is expected to face challenges as the Fed maintains higher rates for longer. Our currency model identifies potential depreciation to the 84-85 range against the USD by Q3 2024. RBI\'s forex intervention strategy will be crucial in determining the extent of this depreciation. Import cover remains comfortable at 11+ months, providing a buffer against extreme volatility.'
  },
  {
    id: 5,
    title: 'Indian Corporate Bond Yields Expected to Narrow',
    category: 'Fixed Income',
    date: 'May 10, 2024',
    trend: 'positive',
    confidence: 82,
    summary: 'Credit spreads in Indian investment-grade corporate bonds are projected to narrow by 15-25 basis points as default risk declines.',
    details: 'Our fixed income models analyze credit quality metrics, corporate balance sheets, default probabilities, and macroeconomic indicators to project corporate bond performance. The analysis suggests improving corporate fundamentals in India will lead to spread compression, particularly in AA-rated securities. This trend is likely to be most pronounced in financial and infrastructure sectors. The improving domestic growth outlook, stable inflation trajectory, and potential for monetary easing later in the year support this thesis. India\'s sovereign yield curve is expected to flatten somewhat, with short-term rates remaining anchored by RBI policy.'
  }
];

const renderTrendIndicator = (trend: string) => {
  if (trend === 'positive') {
    return (
      <div className="flex items-center text-finance-green">
        <TrendingUp className="h-5 w-5 mr-1" />
        <span className="font-medium">Positive</span>
      </div>
    );
  } else if (trend === 'negative') {
    return (
      <div className="flex items-center text-finance-red">
        <TrendingDown className="h-5 w-5 mr-1" />
        <span className="font-medium">Negative</span>
      </div>
    );
  } else {
    return (
      <div className="flex items-center text-gray-500 dark:text-gray-400">
        <span className="inline-block h-3 w-3 bg-gray-400 dark:bg-gray-500 rounded-full mr-1"></span>
        <span className="font-medium">Neutral</span>
      </div>
    );
  }
};

const Insights = () => {
  const [selectedInsight, setSelectedInsight] = useState(insights[0]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredInsights = filter === 'all' 
    ? insights 
    : insights.filter(insight => insight.trend === filter);

  return (
    <MainLayout>
      <div className="pt-28 pb-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="animate-slide-up">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                AI-Generated Indian Market Insights
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Data-driven financial predictions and market analysis for the Indian economy powered by artificial intelligence.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 animate-slide-up animate-delay-100">
                <div className="glass-card rounded-xl p-5 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Indian Market Insights
                    </h2>
                    <div className="flex items-center space-x-2">
                      <button className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-finance-blue dark:hover:text-finance-blue transition-colors">
                        <Filter className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-finance-blue dark:hover:text-finance-blue transition-colors">
                        <Calendar className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center border-b border-gray-200 dark:border-gray-700 mb-4">
                    <button
                      onClick={() => setFilter('all')}
                      className={`px-4 py-2 text-sm font-medium border-b-2 ${
                        filter === 'all' 
                          ? 'border-finance-blue text-finance-blue' 
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setFilter('positive')}
                      className={`px-4 py-2 text-sm font-medium border-b-2 ${
                        filter === 'positive' 
                          ? 'border-finance-green text-finance-green' 
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      Positive
                    </button>
                    <button
                      onClick={() => setFilter('negative')}
                      className={`px-4 py-2 text-sm font-medium border-b-2 ${
                        filter === 'negative' 
                          ? 'border-finance-red text-finance-red' 
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      Negative
                    </button>
                  </div>
                  
                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                    {filteredInsights.map((insight) => (
                      <div
                        key={insight.id}
                        onClick={() => setSelectedInsight(insight)}
                        className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                          selectedInsight.id === insight.id
                            ? 'bg-finance-blue text-white shadow-md'
                            : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 border border-gray-100 dark:border-gray-700'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className={`text-xs font-medium ${
                            selectedInsight.id === insight.id 
                              ? 'text-blue-100' 
                              : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {insight.category}
                          </span>
                          <span className={`text-xs ${
                            selectedInsight.id === insight.id 
                              ? 'text-blue-100' 
                              : 'text-gray-400 dark:text-gray-500'
                          }`}>
                            {insight.date}
                          </span>
                        </div>
                        
                        <h3 className={`font-medium mb-2 line-clamp-2 ${
                          selectedInsight.id === insight.id 
                            ? 'text-white' 
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {insight.title}
                        </h3>
                        
                        <div className="flex items-center justify-between">
                          <div className={`text-xs flex items-center ${
                            selectedInsight.id === insight.id
                              ? insight.trend === 'positive' 
                                ? 'text-green-100' 
                                : insight.trend === 'negative' 
                                  ? 'text-red-100' 
                                  : 'text-blue-100'
                              : insight.trend === 'positive' 
                                ? 'text-finance-green' 
                                : insight.trend === 'negative' 
                                  ? 'text-finance-red' 
                                  : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {insight.trend === 'positive' && <TrendingUp className="h-3 w-3 mr-1" />}
                            {insight.trend === 'negative' && <TrendingDown className="h-3 w-3 mr-1" />}
                            {insight.trend === 'neutral' && <span className="inline-block h-2 w-2 bg-current rounded-full mr-1"></span>}
                            {insight.trend.charAt(0).toUpperCase() + insight.trend.slice(1)}
                          </div>
                          
                          {selectedInsight.id === insight.id ? (
                            <ChevronRight className="h-4 w-4 text-white" />
                          ) : (
                            <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                              {insight.confidence}% conf.
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="md:w-2/3 animate-slide-up animate-delay-200">
                <div className="glass-card rounded-xl p-6">
                  <div className="mb-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center mb-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mr-2">
                            {selectedInsight.category}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {selectedInsight.date}
                          </span>
                        </div>
                        
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                          {selectedInsight.title}
                        </h1>
                        
                        <div className="flex items-center space-x-6 mb-6">
                          <div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Trend</div>
                            {renderTrendIndicator(selectedInsight.trend)}
                          </div>
                          
                          <div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Confidence</div>
                            <div className="flex items-center">
                              <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    selectedInsight.trend === 'positive' ? 'bg-finance-green' : 
                                    selectedInsight.trend === 'negative' ? 'bg-finance-red' : 'bg-finance-blue'
                                  }`}
                                  style={{ width: `${selectedInsight.confidence}%` }}
                                />
                              </div>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {selectedInsight.confidence}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <button className="flex items-center justify-center h-8 w-8 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 mb-8">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Summary</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {selectedInsight.summary}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Detailed Analysis</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                        {selectedInsight.details}
                      </p>
                    </div>
                  </div>
                  
                  <div className="rounded-lg bg-gray-50 dark:bg-gray-900/50 p-5">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Indian Market Data</h3>
                    
                    <div className="relative h-64 bg-white dark:bg-gray-800 rounded-lg overflow-hidden mb-4">
                      {selectedInsight.trend === 'positive' && (
                        <svg className="absolute inset-0" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <path 
                            d="M0,50 C10,45 20,60 30,40 C40,20 50,30 60,25 C70,20 80,15 90,10 L90,100 L0,100 Z" 
                            fill="rgba(52, 199, 89, 0.2)"
                          />
                          <path 
                            d="M0,50 C10,45 20,60 30,40 C40,20 50,30 60,25 C70,20 80,15 90,10" 
                            fill="none" 
                            stroke="#34C759" 
                            strokeWidth="2"
                          />
                        </svg>
                      )}
                      {selectedInsight.trend === 'negative' && (
                        <svg className="absolute inset-0" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <path 
                            d="M0,30 C10,35 20,25 30,40 C40,55 50,60 60,70 C70,80 80,85 90,90 L90,100 L0,100 Z" 
                            fill="rgba(255, 59, 48, 0.2)"
                          />
                          <path 
                            d="M0,30 C10,35 20,25 30,40 C40,55 50,60 60,70 C70,80 80,85 90,90" 
                            fill="none" 
                            stroke="#FF3B30" 
                            strokeWidth="2"
                          />
                        </svg>
                      )}
                      {selectedInsight.trend === 'neutral' && (
                        <svg className="absolute inset-0" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <path 
                            d="M0,50 C10,48 20,52 30,49 C40,46 50,51 60,50 C70,49 80,47 90,51 L90,100 L0,100 Z" 
                            fill="rgba(0, 122, 255, 0.2)"
                          />
                          <path 
                            d="M0,50 C10,48 20,52 30,49 C40,46 50,51 60,50 C70,49 80,47 90,51" 
                            fill="none" 
                            stroke="#007AFF" 
                            strokeWidth="2"
                          />
                        </svg>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent dark:from-gray-800 dark:to-transparent" />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Indian Data Points</div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">1.5M+</div>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Sources Analyzed</div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">350+</div>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Historical Accuracy</div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">{selectedInsight.confidence - 3}%</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 rounded-lg bg-gray-50 dark:bg-gray-900/50 p-5">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Key Indian Market Indices</h3>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Nifty 50</div>
                        <div className="text-base font-semibold text-gray-900 dark:text-white">23,567.85</div>
                        <div className="text-xs font-medium text-finance-green">+0.62%</div>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Sensex</div>
                        <div className="text-base font-semibold text-gray-900 dark:text-white">77,233.69</div>
                        <div className="text-xs font-medium text-finance-green">+0.58%</div>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Nifty Bank</div>
                        <div className="text-base font-semibold text-gray-900 dark:text-white">48,965.30</div>
                        <div className="text-xs font-medium text-finance-red">-0.15%</div>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Nifty IT</div>
                        <div className="text-base font-semibold text-gray-900 dark:text-white">37,842.45</div>
                        <div className="text-xs font-medium text-finance-green">+1.34%</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Key Economic Indicators</div>
                        <div className="space-y-2 mt-2">
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-600 dark:text-gray-400">GDP Growth (FY24)</span>
                            <span className="text-xs font-medium text-finance-green">7.2%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-600 dark:text-gray-400">Inflation (CPI)</span>
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">4.85%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-600 dark:text-gray-400">Repo Rate</span>
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">6.50%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-600 dark:text-gray-400">INR/USD</span>
                            <span className="text-xs font-medium text-finance-red">₹83.47</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Sector Performance (1M)</div>
                        <div className="space-y-2 mt-2">
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-600 dark:text-gray-400">FMCG</span>
                            <span className="text-xs font-medium text-finance-green">+3.8%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-600 dark:text-gray-400">IT</span>
                            <span className="text-xs font-medium text-finance-green">+5.2%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-600 dark:text-gray-400">Banking</span>
                            <span className="text-xs font-medium text-finance-red">-0.7%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-600 dark:text-gray-400">Auto</span>
                            <span className="text-xs font-medium text-finance-green">+2.1%</span>
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
      </div>
    </MainLayout>
  );
};

export default Insights;
