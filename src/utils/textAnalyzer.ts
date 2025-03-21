
import { analyzeTextSentiment } from './sentiment/sentimentAnalyzer';
import { NewsArticle } from './api/newsService';

// Analyzes pasted financial text and returns structured data
export const analyzeFinancialText = async (text: string, title: string = 'Pasted Content'): Promise<NewsArticle> => {
  try {
    // Perform sentiment analysis
    const sentimentResult = await analyzeTextSentiment(text);
    
    // Extract key points
    const keyPoints = extractKeyPoints(text);
    
    // Extract financial metrics
    const metrics = extractFinancialMetrics(text, sentimentResult.sentiment);
    
    // Create a structured article object
    const article: NewsArticle = {
      title: title || 'Financial Text Analysis',
      source: 'User Provided Content',
      url: '',
      date: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      description: text.length > 500 ? text.slice(0, 500) + '...' : text,
      content: text,
      keyPoints,
      metrics,
      sentiment: sentimentResult.sentiment,
      confidenceScore: sentimentResult.score
    };
    
    return article;
  } catch (error) {
    console.error('Error analyzing text:', error);
    throw new Error('Failed to analyze the financial text');
  }
};

// Extract key points from text
const extractKeyPoints = (text: string): string[] => {
  if (!text || text.length < 50) {
    return ['No key points available'];
  }
  
  // Split into sentences
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 20);
  
  // Find sentences that likely contain key financial information
  const financialKeywords = ['market', 'stock', 'economy', 'growth', 'investment', 'rate', 'price', 
                           'index', 'forecast', 'trend', 'report', 'increase', 'decrease',
                           'profit', 'revenue', 'earnings', 'dividend', 'quarter', 'fiscal',
                           'portfolio', 'sector', 'industry', 'inflation', 'recession'];
  
  const keyPointCandidates = sentences.filter(sentence => {
    const lowerSentence = sentence.toLowerCase();
    return financialKeywords.some(keyword => lowerSentence.includes(keyword));
  });
  
  // Return top 3-5 key points or default message
  return keyPointCandidates.slice(0, 5).map(s => s.trim()) || ['No key points available'];
};

// Extract financial metrics from text
const extractFinancialMetrics = (
  text: string, 
  sentiment: 'positive' | 'negative' | 'neutral'
): { name: string; value: string; status?: 'positive' | 'negative' | 'neutral' }[] => {
  const metrics = [];
  
  // Look for percentage changes
  const percentageRegex = /(\+|\-)?(\d+(\.\d+)?)(\s*)?(%)/g;
  const percentMatches = text.match(percentageRegex);
  
  if (percentMatches && percentMatches.length > 0) {
    // Take the first percentage found
    metrics.push({
      name: 'Change',
      value: percentMatches[0],
      status: percentMatches[0].includes('+') ? 'positive' : 
             percentMatches[0].includes('-') ? 'negative' : 'neutral'
    });
  }
  
  // Look for monetary values
  const monetaryRegex = /(\$|\€|\£|\₹)(\s*)?(\d+(,\d+)*(\.\d+)?)/g;
  const monetaryMatches = text.match(monetaryRegex);
  
  if (monetaryMatches && monetaryMatches.length > 0) {
    // Take the first monetary value found
    metrics.push({
      name: 'Value',
      value: monetaryMatches[0]
    });
  }
  
  // Add general market sentiment
  metrics.push({
    name: 'Market Trend',
    value: sentiment === 'positive' ? 'Upward' : 
           sentiment === 'negative' ? 'Downward' : 'Stable',
    status: sentiment
  });
  
  return metrics;
};
