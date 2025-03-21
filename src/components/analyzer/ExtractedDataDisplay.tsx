
import React, { useState } from 'react';
import { FileText, Download, ArrowRight, ChartLine, ChartBar } from 'lucide-react';
import { NewsArticle } from '@/utils/api/newsService';
import { generateNewsAnalysisPDF } from '@/utils/pdf';
import { toast } from "sonner";
import EnhancedCharts from './EnhancedCharts';

interface ExtractedDataDisplayProps {
  data: NewsArticle[];
  onGeneratePdf: (article: NewsArticle) => void;
}

const ExtractedDataDisplay: React.FC<ExtractedDataDisplayProps> = ({ 
  data, 
  onGeneratePdf 
}) => {
  const [expandedArticle, setExpandedArticle] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="text-center p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
        <p className="text-gray-500 dark:text-gray-400">No financial data has been extracted yet.</p>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Enter a URL above to analyze financial content.</p>
      </div>
    );
  }

  // Generate chart data from the article metrics
  const generateChartData = (article: NewsArticle) => {
    if (!article.metrics || article.metrics.length === 0) return [];
    
    // Transform metrics into chart-friendly format
    return article.metrics.map(metric => ({
      name: metric.name,
      value: parseFloat(metric.value.replace(/[^0-9.-]+/g, '')),
      status: metric.status
    }));
  };

  // Generate sentiment trend data (simplified example)
  const generateSentimentData = (article: NewsArticle) => {
    // This would ideally come from actual time-series data
    // For now, creating a simple visualization based on confidence score
    const score = article.confidenceScore || 0.5;
    
    const baseValue = 50;
    const variation = 15;
    
    return [
      { period: 'Previous', value: baseValue - variation * (Math.random() * 0.5) },
      { period: 'Current', value: baseValue + (score * 100 - 50) },
      { period: 'Projected', value: baseValue + (score * 100 - 50) + variation * (Math.random() * 0.5) }
    ];
  };

  // Determine key insights for the key points chart
  const generateKeyPointsData = (article: NewsArticle) => {
    if (!article.keyPoints || article.keyPoints.length === 0) return [];
    
    // Transform the key points into a format suitable for a chart
    return article.keyPoints.map((point, index) => ({
      insight: `Point ${index + 1}`,
      relevance: 100 - (index * 10), // Decreasing relevance for demonstration
      description: point
    }));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Extracted Financial Data
      </h3>
      
      <div className="grid grid-cols-1 gap-4">
        {data.map((article, index) => (
          <div 
            key={index} 
            className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">{article.title}</h4>
              <div className="flex space-x-2">
                <button
                  onClick={() => onGeneratePdf(article)}
                  className="flex items-center text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  title="Download as PDF"
                >
                  <FileText className="h-3 w-3 mr-1" />
                  PDF
                </button>
                <button
                  onClick={() => {
                    // Create downloadable text content
                    const content = generateTextContent(article);
                    downloadTextFile(content, article.title);
                    toast.success("Text file downloaded successfully");
                  }}
                  className="flex items-center text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  title="Download as Text"
                >
                  <Download className="h-3 w-3 mr-1" />
                  TXT
                </button>
              </div>
            </div>
            
            <div className="mb-3 text-xs text-gray-500 dark:text-gray-400 flex items-center">
              <span>{article.source}</span>
              <span className="mx-2">•</span>
              <span>{article.date}</span>
              <span 
                className={`ml-auto px-2 py-0.5 rounded text-white ${
                  article.sentiment === 'positive' ? 'bg-green-500' :
                  article.sentiment === 'negative' ? 'bg-red-500' : 'bg-yellow-500'
                }`}
              >
                {article.sentiment}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{article.description}</p>
            
            <div className="space-y-2">
              <h5 className="text-xs font-medium text-gray-700 dark:text-gray-300">Key Financial Points:</h5>
              <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                {article.keyPoints.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
            
            {article.metrics && article.metrics.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                <h5 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Extracted Metrics:</h5>
                <div className="grid grid-cols-2 gap-2">
                  {article.metrics.map((metric, i) => (
                    <div key={i} className="text-xs">
                      <span className="text-gray-500 dark:text-gray-400">{metric.name}: </span>
                      <span className={`font-medium ${
                        metric.status === 'positive' ? 'text-green-600 dark:text-green-400' :
                        metric.status === 'negative' ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-300'
                      }`}>{metric.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Charts toggle button */}
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => setExpandedArticle(expandedArticle === index ? null : index)}
                className="text-xs flex items-center px-3 py-1.5 rounded-md bg-finance-blue text-white hover:bg-blue-700 transition-colors"
              >
                {expandedArticle === index ? (
                  <>Hide Charts <ChartLine className="h-3 w-3 ml-1" /></>
                ) : (
                  <>View Charts <ChartBar className="h-3 w-3 ml-1" /></>
                )}
              </button>
              
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-finance-blue hover:text-blue-700 transition-colors flex items-center"
              >
                View original <ArrowRight className="h-3 w-3 ml-1" />
              </a>
            </div>
            
            {/* Chart section - only shown when expanded */}
            {expandedArticle === index && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Sentiment analysis chart */}
                <EnhancedCharts
                  data={generateSentimentData(article)}
                  type="area"
                  title="Sentiment Trend Analysis"
                  height={200}
                  dataKeys={['value']}
                  xAxisKey="period"
                  colors={['#10B981']} // Green for sentiment
                />
                
                {/* Financial metrics chart */}
                {article.metrics && article.metrics.length > 0 && (
                  <EnhancedCharts
                    data={generateChartData(article)}
                    type="bar"
                    title="Financial Metrics Comparison"
                    height={200}
                    dataKeys={['value']}
                    xAxisKey="name"
                    colors={['#3B82F6']} // Blue for metrics
                  />
                )}
                
                {/* Key insights chart */}
                {article.keyPoints && article.keyPoints.length > 0 && (
                  <div className="md:col-span-2">
                    <EnhancedCharts
                      data={generateKeyPointsData(article)}
                      type="composed"
                      title="Key Insights Analysis"
                      height={200}
                      dataKeys={['relevance']}
                      xAxisKey="insight"
                      colors={['#8B5CF6']} // Purple for key insights
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to generate text content for download
const generateTextContent = (article: NewsArticle): string => {
  let content = '';
  
  // Add title and basic info
  content += `FINANCIAL INSIGHT: ${article.title}\n`;
  content += `=================================================================\n\n`;
  content += `Source: ${article.source}\n`;
  content += `Date: ${article.date}\n`;
  content += `Sentiment: ${article.sentiment}\n\n`;
  
  // Add description
  content += `SUMMARY:\n`;
  content += `${article.description}\n\n`;
  
  // Add key points
  content += `KEY FINANCIAL POINTS:\n`;
  article.keyPoints.forEach((point, index) => {
    content += `${index + 1}. ${point}\n`;
  });
  content += '\n';
  
  // Add metrics if available
  if (article.metrics && article.metrics.length > 0) {
    content += `EXTRACTED FINANCIAL METRICS:\n`;
    article.metrics.forEach((metric) => {
      content += `- ${metric.name}: ${metric.value} (${metric.status || 'neutral'})\n`;
    });
    content += '\n';
  }
  
  // Add confidence score and footer
  content += `Confidence Score: ${Math.round((article.confidenceScore || 0) * 100)}%\n\n`;
  content += `=================================================================\n`;
  content += `Generated by Financial Analyzer | ${new Date().toLocaleString()}\n`;
  content += `This analysis is generated automatically and should not be considered financial advice.\n`;
  
  return content;
};

// Helper function to download text as a file
const downloadTextFile = (content: string, title: string): void => {
  const element = document.createElement('a');
  const file = new Blob([content], {type: 'text/plain'});
  element.href = URL.createObjectURL(file);
  
  // Clean the title for a filename
  const fileName = title
    .slice(0, 30)
    .replace(/[^a-z0-9]/gi, '_')
    .toLowerCase();
  
  element.download = `financial_insights_${fileName}.txt`;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export default ExtractedDataDisplay;
