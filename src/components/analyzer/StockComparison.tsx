
import React, { useState } from 'react';
import { ArrowRight, Download, BarChart4, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { StockComparisonData, compareStocks } from '@/utils/api/stockService';
import { generateComparisonPDF } from '@/utils/pdf';
import StockComparisonChart from './StockComparisonChart';

const StockComparison: React.FC = () => {
  const [stock1, setStock1] = useState('');
  const [stock2, setStock2] = useState('');
  const [isComparing, setIsComparing] = useState(false);
  const [comparisonProgress, setComparisonProgress] = useState(0);
  const [comparisonData, setComparisonData] = useState<StockComparisonData | null>(null);

  const handleCompare = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stock1 || !stock2) {
      toast.error("Please enter two stock symbols to compare");
      return;
    }
    
    setIsComparing(true);
    setComparisonProgress(0);
    setComparisonData(null);
    
    try {
      // Progress simulation
      const interval = setInterval(() => {
        setComparisonProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return 95;
          }
          return prev + Math.floor(Math.random() * 8) + 1;
        });
      }, 300);
      
      // Fetch comparison data
      const data = await compareStocks(stock1, stock2);
      
      clearInterval(interval);
      setComparisonProgress(100);
      
      if (data) {
        setComparisonData(data);
        toast.success("Stock comparison completed");
      } else {
        toast.error("Failed to fetch comparison data");
      }
    } catch (error) {
      console.error('Error comparing stocks:', error);
      toast.error("An error occurred while comparing the stocks");
    } finally {
      setIsComparing(false);
    }
  };

  const handleGeneratePDF = () => {
    if (comparisonData) {
      generateComparisonPDF(comparisonData);
      toast.success("Comparison PDF report generated and downloaded");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
        Compare Stock Performance
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
        Enter two NSE/BSE stock symbols to compare their performance, metrics, and get AI-powered insights.
      </p>
      
      <form onSubmit={handleCompare} className="mb-8">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Input
            type="text"
            value={stock1}
            onChange={(e) => setStock1(e.target.value.toUpperCase())}
            placeholder="First Stock (e.g., RELIANCE)"
            className="flex-1"
            required
          />
          <ArrowRight className="hidden sm:block h-5 w-5 text-gray-400 flex-shrink-0" />
          <Input
            type="text"
            value={stock2}
            onChange={(e) => setStock2(e.target.value.toUpperCase())}
            placeholder="Second Stock (e.g., TATAMOTORS)"
            className="flex-1"
            required
          />
          <Button
            type="submit"
            disabled={isComparing}
            className="w-full sm:w-auto"
          >
            {isComparing ? (
              <span className="flex items-center">
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Comparing...
              </span>
            ) : (
              <span className="flex items-center">
                <BarChart4 className="h-4 w-4 mr-2" />
                Compare
              </span>
            )}
          </Button>
        </div>
      </form>
      
      {isComparing && (
        <div className="mb-8 animate-fade-in">
          <div className="mb-2 flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Comparing stocks...</span>
            <span>{comparisonProgress}%</span>
          </div>
          <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-finance-blue transition-all duration-300 rounded-full"
              style={{ width: `${comparisonProgress}%` }}
            />
          </div>
        </div>
      )}
      
      {comparisonData && (
        <div className="animate-fade-in space-y-6">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Comparison: {comparisonData.stocks[0].symbol} vs {comparisonData.stocks[1].symbol}
              </h3>
              <Button 
                onClick={handleGeneratePDF}
                variant="outline"
                className="flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF Report
              </Button>
            </div>
            
            <div className="mb-6">
              <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">
                Performance Comparison
              </h4>
              <div className="aspect-video w-full h-full">
                <StockComparisonChart 
                  data={comparisonData.chartData}
                  stockSymbols={comparisonData.stocks.map(s => s.symbol)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {comparisonData.stocks.map((stock, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{stock.symbol}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{stock.name}</p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Current Price</div>
                      <div className="text-base font-medium text-gray-900 dark:text-white">{stock.currentPrice}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Change</div>
                      <div className={`text-base font-medium ${stock.change.startsWith('+') ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                        {stock.change}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Market Cap</div>
                      <div className="text-base font-medium text-gray-900 dark:text-white">{stock.marketCap}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">P/E Ratio</div>
                      <div className="text-base font-medium text-gray-900 dark:text-white">{stock.peRatio}</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Performance</div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-2 bg-white dark:bg-gray-800 rounded">
                        <div className="text-xs text-gray-500 dark:text-gray-400">1M</div>
                        <div className={`text-sm font-medium ${stock.performance.oneMonth.startsWith('+') ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                          {stock.performance.oneMonth}
                        </div>
                      </div>
                      <div className="p-2 bg-white dark:bg-gray-800 rounded">
                        <div className="text-xs text-gray-500 dark:text-gray-400">3M</div>
                        <div className={`text-sm font-medium ${stock.performance.threeMonths.startsWith('+') ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                          {stock.performance.threeMonths}
                        </div>
                      </div>
                      <div className="p-2 bg-white dark:bg-gray-800 rounded">
                        <div className="text-xs text-gray-500 dark:text-gray-400">1Y</div>
                        <div className={`text-sm font-medium ${stock.performance.oneYear.startsWith('+') ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                          {stock.performance.oneYear}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">
                AI-Powered Comparison Insights
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {comparisonData.conclusion}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockComparison;
