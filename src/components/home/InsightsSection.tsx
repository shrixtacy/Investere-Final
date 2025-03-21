
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const marketInsights = [
  {
    id: 1,
    title: 'Nifty 50 Expected to Rise 2.1% in Next Quarter',
    category: 'Indian Market Prediction',
    trend: 'positive',
    confidence: 84,
    snippet: 'Our AI models indicate a strong likelihood of continued growth in the Nifty 50 index over the next 3 months, driven by IT, banking, and consumer goods sectors.'
  },
  {
    id: 2,
    title: 'India Inflation Rate Projected to Moderate to 4.5%',
    category: 'Indian Economic Indicator',
    trend: 'positive',
    confidence: 91,
    snippet: 'Following recent RBI policy adjustments, our models predict India\'s inflation will stabilize near the target range within the next two quarters.'
  },
  {
    id: 3,
    title: 'Indian IT Sector Poised for Robust Growth',
    category: 'Sector Analysis',
    trend: 'positive',
    confidence: 87,
    snippet: 'AI and digital transformation initiatives are expected to drive continued outperformance in the Indian IT sector, with projected growth exceeding broader market returns by 3-5%.'
  },
  {
    id: 4,
    title: 'INR Expected to Face Moderate Pressure Against USD',
    category: 'Forex Outlook',
    trend: 'negative',
    confidence: 76,
    snippet: 'Our models project continued pressure on the Indian Rupee against the USD, with potential depreciation of 1-3% over the next quarter.'
  }
];

const renderTrendBadge = (trend: string) => {
  if (trend === 'positive') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
        <svg className="mr-1 h-2 w-2 text-green-500" fill="currentColor" viewBox="0 0 8 8">
          <path d="M4 0l4 8H0z" transform="rotate(180 4 4)" />
        </svg>
        Positive
      </span>
    );
  } else if (trend === 'negative') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
        <svg className="mr-1 h-2 w-2 text-red-500" fill="currentColor" viewBox="0 0 8 8">
          <path d="M4 0l4 8H0z" />
        </svg>
        Negative
      </span>
    );
  } else {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
        <svg className="mr-1 h-2 w-2 text-gray-500" fill="currentColor" viewBox="0 0 8 8">
          <circle cx="4" cy="4" r="3" />
        </svg>
        Neutral
      </span>
    );
  }
};

const InsightsSection = () => {
  const [activeInsight, setActiveInsight] = useState(marketInsights[0]);

  return (
    <section className="py-24 px-4 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-slide-up">
            AI-Generated Indian Market Insights
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 animate-slide-up animate-delay-100">
            Our artificial intelligence continuously analyzes Indian financial data to generate 
            accurate market predictions and insights.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 space-y-4 animate-slide-up animate-delay-200">
            {marketInsights.map((insight) => (
              <div 
                key={insight.id}
                onClick={() => setActiveInsight(insight)}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  activeInsight.id === insight.id 
                    ? 'bg-finance-blue text-white shadow-lg transform scale-[1.02]' 
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 border border-gray-100 dark:border-gray-700'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`text-lg font-semibold ${
                    activeInsight.id === insight.id ? 'text-white' : 'text-gray-900 dark:text-white'
                  }`}>
                    {insight.title}
                  </h3>
                  {activeInsight.id === insight.id && (
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                      <ArrowRight className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`text-xs font-medium ${
                    activeInsight.id === insight.id ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {insight.category}
                  </span>
                  {activeInsight.id !== insight.id && renderTrendBadge(insight.trend)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="lg:col-span-2 animate-slide-up animate-delay-300">
            <div className="glass-card p-6 rounded-xl h-full relative overflow-hidden">
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      AI-GENERATED INDIAN MARKET INSIGHT
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      {activeInsight.title}
                    </h3>
                  </div>
                  {renderTrendBadge(activeInsight.trend)}
                </div>
                
                <div className="mt-4 flex items-center">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                    Confidence Score:
                  </div>
                  <div className="w-48 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div 
                      className={`h-2 rounded-full ${
                        activeInsight.trend === 'positive' ? 'bg-finance-green' : 
                        activeInsight.trend === 'negative' ? 'bg-finance-red' : 'bg-finance-blue'
                      }`}
                      style={{ width: `${activeInsight.confidence}%` }}
                    />
                  </div>
                  <div className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {activeInsight.confidence}%
                  </div>
                </div>
              </div>
              
              <div className="p-5 rounded-lg bg-gray-50 dark:bg-gray-800/50 mb-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {activeInsight.snippet}
                </p>
              </div>
              
              <div className="relative h-48 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-4">
                {activeInsight.trend === 'positive' && (
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
                {activeInsight.trend === 'negative' && (
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
                {activeInsight.trend === 'neutral' && (
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
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-gray-100 to-transparent dark:from-gray-800 dark:to-transparent" />
              </div>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="p-2 bg-white dark:bg-gray-800/80 rounded border border-gray-100 dark:border-gray-700 text-xs">
                  <span className="text-gray-500 dark:text-gray-400 mr-2">Nifty 50:</span>
                  <span className="font-medium text-gray-900 dark:text-white">23,567.85</span>
                  <span className="ml-1 text-finance-green">+0.62%</span>
                </div>
                <div className="p-2 bg-white dark:bg-gray-800/80 rounded border border-gray-100 dark:border-gray-700 text-xs">
                  <span className="text-gray-500 dark:text-gray-400 mr-2">INR/USD:</span>
                  <span className="font-medium text-gray-900 dark:text-white">₹83.47</span>
                </div>
                <div className="p-2 bg-white dark:bg-gray-800/80 rounded border border-gray-100 dark:border-gray-700 text-xs">
                  <span className="text-gray-500 dark:text-gray-400 mr-2">FII Net:</span>
                  <span className="font-medium text-gray-900 dark:text-white">₹1,254 Cr</span>
                  <span className="ml-1 text-finance-green">↑</span>
                </div>
              </div>
              
              <Link 
                to="/insights"
                className="inline-flex items-center text-finance-blue hover:text-blue-700 transition-colors font-medium"
              >
                View detailed analysis
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
