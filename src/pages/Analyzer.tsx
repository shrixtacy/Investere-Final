
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { 
  Search, ArrowRight, Check, ArrowUp, ArrowDown, RefreshCw, 
  Download, BarChart4, Globe, FileText, TrendingUp, CircleDollarSign, 
  Percent, FileUp, ChartPie, Activity, FileType
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import StockComparison from '@/components/analyzer/StockComparison';
import { NewsArticle, fetchFinanceNews } from '@/utils/api/newsService';
import { StockData, fetchCompleteStockData } from '@/utils/api/stockService';
import { scrapeWebsite } from '@/utils/webscraper/webScraper';
import { generateNewsAnalysisPDF, generateStockAnalysisPDF } from '@/utils/pdf';
import EnhancedCharts from '@/components/analyzer/EnhancedCharts';
import ExtractedDataDisplay from '@/components/analyzer/ExtractedDataDisplay';
import { analyzeFinancialText } from '@/utils/textAnalyzer';

const Analyzer = () => {
  // Text analyzer state
  const [financialText, setFinancialText] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisCompleted, setAnalysisCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [extractedData, setExtractedData] = useState<NewsArticle[]>([]);
  
  // Stock analyzer state
  const [stockSymbol, setStockSymbol] = useState('');
  const [isAnalyzingStock, setIsAnalyzingStock] = useState(false);
  const [stockAnalysisCompleted, setStockAnalysisCompleted] = useState(false);
  const [stockProgress, setStockProgress] = useState(0);
  const [stockData, setStockData] = useState<StockData | null>(null);
  
  // Tab state
  const [activeTab, setActiveTab] = useState("text-analyzer");
  
  // Chart state
  const [activeChartType, setActiveChartType] = useState("price");
  
  // Load news data on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Preload news data on component mount
    const preloadNews = async () => {
      try {
        const newsData = await fetchFinanceNews();
        if (newsData && newsData.length > 0) {
          console.log('Preloaded news data:', newsData);
          setExtractedData(prev => {
            // Avoid duplicates by checking if news already exists
            const existingUrls = new Set(prev.map(item => item.url));
            const newItems = newsData.filter(item => !existingUrls.has(item.url));
            return [...prev, ...newItems];
          });
        }
      } catch (error) {
        console.error('Error fetching initial news data:', error);
      }
    };
    
    preloadNews();
  }, []);

  // Handle text submission and data extraction
  const handleSubmitText = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!financialText) return;
    
    setIsAnalyzing(true);
    setAnalysisCompleted(false);
    setProgress(0);
    
    try {
      // Progress simulation
      const updateProgress = () => {
        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 95) {
              clearInterval(interval);
              return 95; // Hold at 95% until actual completion
            }
            return prev + Math.floor(Math.random() * 8) + 1;
          });
        }, 300);
        return interval;
      };
      
      const interval = updateProgress();
      
      // Perform actual text analysis
      const title = customTitle || "Financial Text Analysis";
      const analysisResult = await analyzeFinancialText(financialText, title);
      
      // Complete progress and update UI
      clearInterval(interval);
      setProgress(100);
      
      if (analysisResult) {
        console.log('New extracted data:', analysisResult);
        
        // Use functional update to ensure we're working with the latest state
        setExtractedData(prevData => [analysisResult, ...prevData]);
        
        toast.success("Financial data extracted successfully");
      } else {
        toast.error("Failed to extract data from the provided text");
      }
    } catch (error) {
      console.error('Error processing text:', error);
      toast.error("An error occurred while processing the text");
    } finally {
      setIsAnalyzing(false);
      setAnalysisCompleted(true);
    }
  };

  // Handle stock analysis submission
  const handleSubmitStock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stockSymbol) return;
    
    setIsAnalyzingStock(true);
    setStockAnalysisCompleted(false);
    setStockProgress(0);
    
    try {
      // Progress simulation
      const updateProgress = () => {
        const interval = setInterval(() => {
          setStockProgress((prev) => {
            if (prev >= 95) {
              clearInterval(interval);
              return 95; // Hold at 95% until actual completion
            }
            return prev + Math.floor(Math.random() * 8) + 1;
          });
        }, 300);
        return interval;
      };
      
      const interval = updateProgress();
      
      // Fetch real stock data
      const data = await fetchCompleteStockData(stockSymbol);
      
      // Complete progress and update UI
      clearInterval(interval);
      setStockProgress(100);
      
      if (data) {
        console.log('Stock data fetched:', data);
        setStockData(data);
        toast.success("Stock analysis completed");
      } else {
        toast.error("Failed to fetch stock data");
      }
    } catch (error) {
      console.error('Error analyzing stock:', error);
      toast.error("An error occurred while analyzing the stock");
    } finally {
      setIsAnalyzingStock(false);
      setStockAnalysisCompleted(true);
    }
  };

  // Generate PDF functions
  const generatePdfReport = useCallback(() => {
    if (stockData) {
      generateStockAnalysisPDF(stockData);
      toast.success("PDF report generated and downloaded");
    }
  }, [stockData]);
  
  const generateNewsPdfReport = useCallback((article: NewsArticle) => {
    generateNewsAnalysisPDF(article);
    toast.success("News analysis PDF report generated and downloaded");
  }, []);

  // Download text file for stock analysis
  const downloadStockTextFile = useCallback(() => {
    if (!stockData) return;
    
    let content = '';
    
    // Add title and basic info
    content += `STOCK ANALYSIS REPORT: ${stockData.symbol}\n`;
    content += `=================================================================\n\n`;
    content += `Company: ${stockData.name}\n`;
    content += `Generated on: ${formatDate(new Date(), 'long')}\n\n`;
    
    // Add current price information
    content += `CURRENT PRICE INFORMATION:\n`;
    content += `Price: ${stockData.currentPrice}\n`;
    content += `Change: ${stockData.change}\n\n`;
    
    // Add key metrics
    content += `KEY METRICS:\n`;
    content += `Volume: ${stockData.volume}\n`;
    content += `Market Cap: ${stockData.marketCap}\n`;
    content += `P/E Ratio: ${stockData.peRatio}\n`;
    content += `Sentiment: ${stockData.sentiment}\n\n`;
    
    // Add technical indicators
    content += `TECHNICAL INDICATORS:\n`;
    stockData.technicalIndicators.forEach(indicator => {
      const statusSymbol = indicator.status === 'positive' ? '↑' : 
                          indicator.status === 'negative' ? '↓' : '→';
      content += `- ${indicator.name}: ${indicator.value} ${statusSymbol}\n`;
    });
    content += '\n';
    
    // Add AI predictions
    content += `AI-POWERED PREDICTIONS:\n`;
    content += `Short Term: ${stockData.aiPredictions.shortTerm}\n`;
    content += `Mid Term: ${stockData.aiPredictions.midTerm}\n`;
    content += `Long Term: ${stockData.aiPredictions.longTerm}\n`;
    content += `Support Level: ${stockData.aiPredictions.supportLevel}\n`;
    content += `Resistance Level: ${stockData.aiPredictions.resistanceLevel}\n\n`;
    
    // Add disclaimer
    content += `=================================================================\n`;
    content += `DISCLAIMER: This analysis is generated automatically and should not be considered financial advice.\n`;
    content += `Always consult with a qualified financial advisor before making investment decisions.\n`;
    content += `Generated by Financial Analyzer | ${formatDate(new Date(), 'short')}\n`;
    
    // Create and download the file
    const element = document.createElement('a');
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${stockData.symbol}_Analysis_${formatDate(new Date(), 'YYYYMMDD')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast.success("Text file downloaded successfully");
  }, [stockData]);

  // Generates chart data for stock visualization
  const generateChartData = useCallback(() => {
    if (!stockData) return [];
    
    const basePrice = parseFloat(stockData.currentPrice.replace('₹', '').replace(/,/g, ''));
    const isPositive = stockData.change.startsWith('+');
    const changePercent = parseFloat(stockData.change.replace(/[%+]/g, ''));
    
    // Generate historical data with a trend that matches the current price movement
    const data = [];
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;
      
      // Create a trendline with some random noise
      let trend = 0;
      if (isPositive) {
        trend = basePrice * (0.9 + (0.1 * (30 - i) / 30)); // Upward trend
      } else {
        trend = basePrice * (1.1 - (0.1 * (30 - i) / 30)); // Downward trend
      }
      
      // Add some random noise
      const noise = basePrice * (Math.random() * 0.04 - 0.02);
      const price = i === 0 ? basePrice : trend + noise;
      
      const volume = parseInt(stockData.volume.replace(/,/g, '')) * (0.7 + Math.random() * 0.6);
      
      data.push({
        date: formattedDate,
        price: Math.round(price),
        volume: Math.round(volume / 1000000), // In millions
        ma50: Math.round(basePrice * (0.95 + (i / 600))),
        rsi: 50 + (isPositive ? 1 : -1) * (20 - i * 0.5) + (Math.random() * 5 - 2.5)
      });
    }
    
    return data;
  }, [stockData]);

  return (
    <MainLayout>
      <div className="pt-28 pb-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="animate-slide-up">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Financial Data Analyzer
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Extract and analyze financial data from articles, blogs, websites, and Indian stock markets.
              </p>
            </div>
            
            <div className="glass-card rounded-xl p-6 mb-8 animate-slide-up animate-delay-100">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="text-analyzer" className="flex items-center gap-2">
                    <FileType className="h-4 w-4" />
                    <span>Text Analyzer</span>
                  </TabsTrigger>
                  <TabsTrigger value="stock-analyzer" className="flex items-center gap-2">
                    <BarChart4 className="h-4 w-4" />
                    <span>Stock Analyzer</span>
                  </TabsTrigger>
                  <TabsTrigger value="comparison" className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    <span>Stock Comparison</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="text-analyzer">
                  <div className="max-w-3xl mx-auto">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                      Extract Financial Insights from Text
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                      Paste financial articles, blog posts, or reports to extract structured data and generate AI-powered insights.
                    </p>
                    
                    <form onSubmit={handleSubmitText} className="mb-8">
                      <div className="flex flex-col gap-3">
                        <Input
                          type="text"
                          value={customTitle}
                          onChange={(e) => setCustomTitle(e.target.value)}
                          placeholder="Optional: Enter a title for this analysis"
                          className="w-full"
                        />
                        
                        <div className="relative">
                          <Textarea
                            value={financialText}
                            onChange={(e) => setFinancialText(e.target.value)}
                            className="min-h-[200px] w-full p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-finance-blue text-gray-900 dark:text-white"
                            placeholder="Paste financial text content here..."
                            required
                          />
                        </div>
                        
                        <button
                          type="submit"
                          disabled={isAnalyzing || !financialText}
                          className="w-full px-6 py-3 bg-finance-blue text-white rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {isAnalyzing ? (
                            <span className="flex items-center justify-center">
                              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                              Analyzing...
                            </span>
                          ) : (
                            'Extract Financial Insights'
                          )}
                        </button>
                      </div>
                    </form>
                    
                    {isAnalyzing && (
                      <div className="mb-8 animate-fade-in">
                        <div className="mb-2 flex justify-between text-sm text-gray-600 dark:text-gray-400">
                          <span>Analyzing financial data...</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-finance-blue transition-all duration-300 rounded-full"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Check className="h-4 w-4 mr-2 text-finance-green" />
                            Processing text content
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            {progress > 30 ? (
                              <Check className="h-4 w-4 mr-2 text-finance-green" />
                            ) : (
                              <div className="h-4 w-4 mr-2 rounded-full border-2 border-gray-300 dark:border-gray-600 border-t-transparent animate-spin" />
                            )}
                            Identifying financial data points
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            {progress > 60 ? (
                              <Check className="h-4 w-4 mr-2 text-finance-green" />
                            ) : (
                              <div className="h-4 w-4 mr-2 rounded-full border-2 border-gray-300 dark:border-gray-600 border-t-transparent animate-spin opacity-0" style={{ opacity: progress > 30 ? 1 : 0 }} />
                            )}
                            Structuring financial information
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            {progress > 85 ? (
                              <Check className="h-4 w-4 mr-2 text-finance-green" />
                            ) : (
                              <div className="h-4 w-4 mr-2 rounded-full border-2 border-gray-300 dark:border-gray-600 border-t-transparent animate-spin opacity-0" style={{ opacity: progress > 60 ? 1 : 0 }} />
                            )}
                            Generating AI insights
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {analysisCompleted && (
                      <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 mb-6 animate-fade-in">
                        <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-800 text-green-500 dark:text-green-300 mb-3">
                          <Check className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-medium text-green-800 dark:text-green-300 mb-1">
                          Analysis Complete
                        </h3>
                        <p className="text-green-600 dark:text-green-400">
                          Financial insights have been successfully extracted from your text.
                        </p>
                      </div>
                    )}
                    
                    {/* Financial data categories */}
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-center mb-8">
                      {[
                        { icon: 'S&P', label: 'Stock Indices' },
                        { icon: '$', label: 'Currency Data' },
                        { icon: '%', label: 'Interest Rates' },
                        { icon: '📈', label: 'Market Trends' },
                        { icon: '💹', label: 'Economic Indicators' },
                        { icon: '🏢', label: 'Company Data' }
                      ].map((item, index) => (
                        <div key={index} className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                          <div className="text-xl font-bold text-finance-blue mb-2">{item.icon}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">{item.label}</div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Extracted data display */}
                    <ExtractedDataDisplay 
                      data={extractedData}
                      onGeneratePdf={generateNewsPdfReport}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="stock-analyzer">
                  <div className="max-w-3xl mx-auto">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                      Indian Stock Market Analyzer
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                      Enter an NSE/BSE stock symbol to get real-time data, technical analysis, and AI-powered predictions.
                    </p>
                    
                    <form onSubmit={handleSubmitStock} className="mb-8">
                      <div className="flex flex-col md:flex-row gap-3">
                        <div className="flex-grow relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <CircleDollarSign className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            value={stockSymbol}
                            onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
                            className="block w-full pl-10 pr-3 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-finance-blue text-gray-900 dark:text-white uppercase"
                            placeholder="RELIANCE, TATAMOTORS, INFY, etc."
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={isAnalyzingStock || !stockSymbol}
                          className="flex-shrink-0 px-6 py-3 bg-finance-blue text-white rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {isAnalyzingStock ? (
                            <span className="flex items-center">
                              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                              Analyzing...
                            </span>
                          ) : (
                            'Analyze Stock'
                          )}
                        </button>
                      </div>
                    </form>
                    
                    {isAnalyzingStock && (
                      <div className="mb-8 animate-fade-in">
                        <div className="mb-2 flex justify-between text-sm text-gray-600 dark:text-gray-400">
                          <span>Analyzing stock data...</span>
                          <span>{stockProgress}%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-finance-blue transition-all duration-300 rounded-full"
                            style={{ width: `${stockProgress}%` }}
                          />
                        </div>
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Check className="h-4 w-4 mr-2 text-finance-green" />
                            Fetching stock data
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            {stockProgress > 30 ? (
                              <Check className="h-4 w-4 mr-2 text-finance-green" />
                            ) : (
                              <div className="h-4 w-4 mr-2 rounded-full border-2 border-gray-300 dark:border-gray-600 border-t-transparent animate-spin" />
                            )}
                            Calculating technical indicators
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            {stockProgress > 60 ? (
                              <Check className="h-4 w-4 mr-2 text-finance-green" />
                            ) : (
                              <div className="h-4 w-4 mr-2 rounded-full border-2 border-gray-300 dark:border-gray-600 border-t-transparent animate-spin opacity-0" style={{ opacity: stockProgress > 30 ? 1 : 0 }} />
                            )}
                            Running AI prediction models
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            {stockProgress > 85 ? (
                              <Check className="h-4 w-4 mr-2 text-finance-green" />
                            ) : (
                              <div className="h-4 w-4 mr-2 rounded-full border-2 border-gray-300 dark:border-gray-600 border-t-transparent animate-spin opacity-0" style={{ opacity: stockProgress > 60 ? 1 : 0 }} />
                            )}
                            Generating investment insights
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {stockAnalysisCompleted && stockData && (
                      <div className="animate-fade-in">
                        <div className="glass-card rounded-xl overflow-hidden mb-6">
                          <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                              <div>
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
                                  {stockData.name} ({stockData.symbol})
                                </h3>
                                <div className="flex items-center space-x-4 text-sm">
                                  <span className="text-gray-500 dark:text-gray-400">NSE/BSE</span>
                                  <span className="text-gray-500 dark:text-gray-400">Indian Stock</span>
                                  <span className={`font-medium ${stockData.sentiment === 'Positive' ? 'text-finance-green' : stockData.sentiment === 'Negative' ? 'text-finance-red' : 'text-finance-yellow'}`}>
                                    {stockData.sentiment} Sentiment
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button 
                                  onClick={generatePdfReport}
                                  className="flex items-center px-3 py-2 rounded-lg bg-finance-blue text-white hover:bg-blue-600 transition-colors text-sm font-medium"
                                >
                                  <FileText className="h-4 w-4 mr-1" />
                                  PDF
                                </button>
                                <button 
                                  onClick={downloadStockTextFile}
                                  className="flex items-center px-3 py-2 rounded-lg bg-finance-blue text-white hover:bg-blue-600 transition-colors text-sm font-medium"
                                >
                                  <Download className="h-4 w-4 mr-1" />
                                  TXT
                                </button>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Current Price</div>
                                <div className="text-xl font-semibold text-gray-900 dark:text-white">{stockData.currentPrice}</div>
                                <div className={`mt-1 text-sm font-medium flex items-center ${stockData.change.startsWith('+') ? 'text-finance-green' : 'text-finance-red'}`}>
                                  {stockData.change.startsWith('+') ? (
                                    <ArrowUp className="h-3 w-3 mr-1" />
                                  ) : (
                                    <ArrowDown className="h-3 w-3 mr-1" />
                                  )}
                                  {stockData.change}
                                </div>
                              </div>
                              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Volume</div>
                                <div className="text-xl font-semibold text-gray-900 dark:text-white">{stockData.volume}</div>
                                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">Today's trading</div>
                              </div>
                              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Market Cap</div>
                                <div className="text-xl font-semibold text-gray-900 dark:text-white">{stockData.marketCap}</div>
                                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">Indian Rupees</div>
                              </div>
                              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">P/E Ratio</div>
                                <div className="text-xl font-semibold text-gray-900 dark:text-white">{stockData.peRatio}</div>
                                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">Price to Earnings</div>
                              </div>
                            </div>
                            
                            {/* Enhanced Visualization Section */}
                            <div className="mb-6">
                              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                                <h4 className="text-md font-medium text-gray-700 dark:text-gray-300">
                                  Stock Performance Visualization
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  <button 
                                    onClick={() => setActiveChartType('price')}
                                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                                      activeChartType === 'price' 
                                        ? 'bg-finance-blue text-white' 
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                                    }`}
                                  >
                                    Price History
                                  </button>
                                  <button 
                                    onClick={() => setActiveChartType('volume')}
                                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                                      activeChartType === 'volume' 
                                        ? 'bg-finance-blue text-white' 
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                                    }`}
                                  >
                                    Volume
                                  </button>
                                  <button 
                                    onClick={() => setActiveChartType('technical')}
                                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                                      activeChartType === 'technical' 
                                        ? 'bg-finance-blue text-white' 
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                                    }`}
                                  >
                                    Technical
                                  </button>
                                  <button 
                                    onClick={() => setActiveChartType('composed')}
                                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                                      activeChartType === 'composed' 
                                        ? 'bg-finance-blue text-white' 
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                                    }`}
                                  >
                                    Combined
                                  </button>
                                </div>
                              </div>
                              
                              <EnhancedCharts
                                data={generateChartData()}
                                type={
                                  activeChartType === 'price' ? 'area' :
                                  activeChartType === 'volume' ? 'bar' :
                                  activeChartType === 'technical' ? 'line' : 'composed'
                                }
                                title=""
                                dataKeys={
                                  activeChartType === 'price' ? ['price', 'ma50'] :
                                  activeChartType === 'volume' ? ['volume'] :
                                  activeChartType === 'technical' ? ['rsi'] : ['price', 'volume']
                                }
                                xAxisKey="date"
                                colors={['#3B82F6', '#10B981', '#F97316']}
                                height={300}
                              />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                  Technical Indicators
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  {stockData.technicalIndicators.map((indicator, i) => (
                                    <div key={i} className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                        {indicator.name}
                                      </div>
                                      <div className="flex items-center">
                                        <span className="text-lg font-semibold text-gray-900 dark:text-white mr-2">
                                          {indicator.value}
                                        </span>
                                        {indicator.status === 'positive' && (
                                          <ArrowUp className="h-3 w-3 text-finance-green" />
                                        )}
                                        {indicator.status === 'negative' && (
                                          <ArrowDown className="h-3 w-3 text-finance-red" />
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                  AI Predictions & Analysis
                                </h4>
                                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                                  <div className="grid grid-cols-3 gap-4 mb-4">
                                    <div className="text-center">
                                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Short Term</div>
                                      <div className={`text-sm font-medium ${
                                        stockData.aiPredictions.shortTerm === 'Bullish' ? 'text-finance-green' : 
                                        stockData.aiPredictions.shortTerm === 'Bearish' ? 'text-finance-red' : 'text-finance-yellow'
                                      }`}>
                                        {stockData.aiPredictions.shortTerm}
                                      </div>
                                    </div>
                                    <div className="text-center">
                                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Mid Term</div>
                                      <div className={`text-sm font-medium ${
                                        stockData.aiPredictions.midTerm === 'Bullish' ? 'text-finance-green' : 
                                        stockData.aiPredictions.midTerm === 'Bearish' ? 'text-finance-red' : 'text-finance-yellow'
                                      }`}>
                                        {stockData.aiPredictions.midTerm}
                                      </div>
                                    </div>
                                    <div className="text-center">
                                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Long Term</div>
                                      <div className={`text-sm font-medium ${
                                        stockData.aiPredictions.longTerm === 'Bullish' ? 'text-finance-green' : 
                                        stockData.aiPredictions.longTerm === 'Bearish' ? 'text-finance-red' : 'text-finance-yellow'
                                      }`}>
                                        {stockData.aiPredictions.longTerm}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
                                    <div className="mb-2">
                                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Key Support Level</div>
                                      <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                        {stockData.aiPredictions.supportLevel}
                                      </div>
                                    </div>
                                    <div>
                                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Key Resistance Level</div>
                                      <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                        {stockData.aiPredictions.resistanceLevel}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="comparison">
                  <StockComparison />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

// Helper function to format date for filenames and display
const formatDate = (date: Date, format: string = 'long'): string => {
  if (format === 'long') {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } else if (format === 'short') {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } else if (format === 'YYYYMMDD') {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  } else {
    return date.toISOString();
  }
};

export default Analyzer;
