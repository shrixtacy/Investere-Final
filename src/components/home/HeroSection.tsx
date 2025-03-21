
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedChartIllustration from './AnimatedChartIllustration';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center py-24 px-4">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950" />
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[40rem] h-[40rem] rounded-full bg-finance-blue opacity-5 blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[45rem] h-[45rem] rounded-full bg-finance-teal opacity-5 blur-3xl" />
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl mx-auto lg:mx-0 space-y-6 animate-slide-up">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800">
              <span className="text-xs font-medium text-finance-blue dark:text-blue-400">
                AI-Powered Financial Insights
              </span>
            </div>
            
            <div className="flex flex-col space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
                Intelligent Finance <span className="text-finance-blue">Analytics</span> & <span className="text-finance-blue">Predictions</span>
              </h1>
              
              <div className="hidden sm:flex items-center">
                <div className="h-0.5 w-24 bg-finance-blue mr-3"></div>
                <span className="text-sm font-medium text-finance-blue">Real-time insights on Indian markets</span>
              </div>
            </div>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Extract powerful insights from Indian financial data with AI-driven analysis. 
              Get real-time market predictions, trend analysis, and investment recommendations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link 
                to="/dashboard" 
                className="flex items-center justify-center px-6 py-3 bg-finance-blue text-white rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium"
              >
                Explore Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              
              <Link 
                to="/insights" 
                className="flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-200 font-medium"
              >
                View Market Insights
              </Link>
            </div>
            
            <div className="pt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-finance-green mr-2" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.75 12.75L10 15.25L16.25 8.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                No credit card required. Start analyzing financial data today.
              </p>
            </div>
          </div>
          
          <div className="relative h-[500px] flex items-center justify-center animate-slide-up animate-delay-200">
            {/* Improved chart container with better shadows and glow effects */}
            <div className="absolute inset-0 bg-blue-500/5 dark:bg-blue-500/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-blue-200/50 dark:border-blue-500/20 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-500/10 dark:to-blue-500/20" />
              
              {/* Enhanced glow effects */}
              <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 opacity-30 blur-3xl" />
              <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 opacity-30 blur-3xl" />
              
              <div className="relative p-6 h-full flex flex-col">
                {/* Chart section with more height */}
                <div className="mb-4 h-[300px]">
                  <AnimatedChartIllustration />
                </div>
                
                <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex flex-col">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Indian Market Snapshot</h3>
                  <div className="flex-1 grid grid-cols-3 gap-4">
                    <div className="flex flex-col">
                      <div className="text-xs text-gray-500 dark:text-gray-400">Nifty 50</div>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">22,493</div>
                      <div className="text-xs text-finance-green">+1.2%</div>
                    </div>
                    <div className="flex flex-col">
                      <div className="text-xs text-gray-500 dark:text-gray-400">Sensex</div>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">73,876</div>
                      <div className="text-xs text-finance-green">+0.9%</div>
                    </div>
                    <div className="flex flex-col">
                      <div className="text-xs text-gray-500 dark:text-gray-400">Bank Nifty</div>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">48,125</div>
                      <div className="text-xs text-finance-red">-0.3%</div>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                    <span>Last updated: Today, 3:30 PM IST</span>
                    <span className="flex items-center">
                      <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-1 animate-pulse"></span>
                      Live
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced glow effects around the chart container */}
            <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-gradient-to-br from-finance-blue to-finance-teal rounded-xl rotate-6 opacity-70 blur-2xl" />
            <div className="absolute -top-6 -left-6 h-32 w-32 bg-gradient-to-br from-finance-indigo to-finance-blue rounded-xl -rotate-12 opacity-70 blur-2xl" />
            <div className="absolute top-1/2 right-1/4 h-24 w-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-30 blur-3xl" />
            <div className="absolute bottom-1/3 left-1/4 h-20 w-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full opacity-20 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
