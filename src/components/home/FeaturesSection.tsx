
import { TrendingUp, Search, BarChart4, Zap } from 'lucide-react';

const features = [
  {
    icon: <TrendingUp className="h-6 w-6 text-finance-blue" />,
    title: 'Market Prediction',
    description: 'Advanced AI algorithms predict market trends, stock movements, and economic shifts with remarkable accuracy.'
  },
  {
    icon: <Search className="h-6 w-6 text-finance-teal" />,
    title: 'Financial Data Extraction',
    description: 'Extract structured financial data from blogs, news articles, and market websites using our intelligent crawling technology.'
  },
  {
    icon: <BarChart4 className="h-6 w-6 text-finance-indigo" />,
    title: 'Intelligent Analytics',
    description: 'Transform raw financial data into actionable insights with our AI-powered analytics engine.'
  },
  {
    icon: <Zap className="h-6 w-6 text-finance-orange" />,
    title: 'Real-Time Insights',
    description: 'Get immediate notifications about market changes, economic indicators, and investment opportunities.'
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 px-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI-Powered Financial Analysis
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Our platform combines artificial intelligence with financial expertise to deliver 
            unparalleled market insights and predictions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card p-6 rounded-xl animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-12 w-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-24 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-200/20 via-transparent to-transparent dark:from-blue-800/20" />
          </div>
          
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-12">
            <div className="space-y-6 flex flex-col justify-center animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Advanced AI Technology
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Our platform utilizes cutting-edge AI models specifically trained on financial data to provide accurate predictions and insights.
              </p>
              <ul className="space-y-3">
                {[
                  'Neural networks trained on decades of market data',
                  'Natural language processing for financial news analysis',
                  'Machine learning algorithms for trend identification',
                  'Deep learning models for complex pattern recognition'
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="h-6 w-6 text-finance-blue mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative h-[400px] flex items-center justify-center animate-slide-up animate-delay-200">
              <div className="absolute inset-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-100 dark:border-blue-900/40 shadow-lg">
                <div className="h-full p-6 flex flex-col">
                  <div className="mb-4 flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-finance-red"></div>
                    <div className="h-3 w-3 rounded-full bg-finance-yellow"></div>
                    <div className="h-3 w-3 rounded-full bg-finance-green"></div>
                  </div>
                  
                  <div className="flex-1 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 p-4">
                    <div className="h-6 w-2/3 bg-gray-200 dark:bg-gray-600 rounded mb-4 animate-pulse-soft"></div>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="h-24 bg-blue-100 dark:bg-blue-900/30 rounded-lg p-3">
                        <div className="h-3 w-12 bg-gray-300 dark:bg-gray-500 rounded mb-2"></div>
                        <div className="h-5 w-16 bg-gray-400 dark:bg-gray-400 rounded mb-1"></div>
                        <div className="h-3 w-8 bg-finance-green rounded"></div>
                      </div>
                      <div className="h-24 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg p-3">
                        <div className="h-3 w-12 bg-gray-300 dark:bg-gray-500 rounded mb-2"></div>
                        <div className="h-5 w-16 bg-gray-400 dark:bg-gray-400 rounded mb-1"></div>
                        <div className="h-3 w-8 bg-finance-red rounded"></div>
                      </div>
                      <div className="h-24 bg-green-100 dark:bg-green-900/30 rounded-lg p-3">
                        <div className="h-3 w-12 bg-gray-300 dark:bg-gray-500 rounded mb-2"></div>
                        <div className="h-5 w-16 bg-gray-400 dark:bg-gray-400 rounded mb-1"></div>
                        <div className="h-3 w-8 bg-finance-green rounded"></div>
                      </div>
                    </div>
                    
                    <div className="h-32 bg-white dark:bg-gray-800 rounded-lg p-3 relative overflow-hidden">
                      <div className="h-3 w-24 bg-gray-300 dark:bg-gray-500 rounded mb-4"></div>
                      <div className="relative h-16">
                        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                          <path 
                            d="M0,50 L5,45 L10,46 L15,42 L20,40 L25,42 L30,35 L35,30 L40,32 L45,28 L50,25 L55,28 L60,26 L65,22 L70,18 L75,20 L80,15 L85,10 L90,12 L95,8 L100,5" 
                            fill="none" 
                            stroke="#007AFF" 
                            strokeWidth="1.5"
                          />
                          <path 
                            d="M0,50 L5,48 L10,46 L15,47 L20,45 L25,43 L30,45 L35,42 L40,44 L45,40 L50,38 L55,36 L60,38 L65,35 L70,32 L75,35 L80,30 L85,28 L90,32 L95,28 L100,25" 
                            fill="none" 
                            stroke="#5AC8FA" 
                            strokeWidth="1.5"
                            strokeDasharray="2,2"
                          />
                        </svg>
                      </div>
                      <div className="flex justify-between">
                        <div className="h-2 w-8 bg-gray-300 dark:bg-gray-500 rounded"></div>
                        <div className="h-2 w-8 bg-gray-300 dark:bg-gray-500 rounded"></div>
                        <div className="h-2 w-8 bg-gray-300 dark:bg-gray-500 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
