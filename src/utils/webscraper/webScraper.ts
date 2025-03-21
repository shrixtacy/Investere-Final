
import axios from 'axios';
import { analyzeTextSentiment } from '../sentiment/sentimentAnalyzer';

interface ScrapedArticle {
  title: string;
  content: string;
  keyPoints: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
  confidenceScore: number;
  financialMetrics: {
    name: string;
    value: string;
    status?: 'positive' | 'negative' | 'neutral';
  }[];
}

// This is a proxy service that helps bypass CORS issues when scraping websites
// In a production environment, you would use a proper backend service
const ALLORIGINS_PROXY = 'https://api.allorigins.win/raw?url=';

export const scrapeWebsite = async (url: string): Promise<ScrapedArticle | null> => {
  try {
    console.log(`Scraping website: ${url}`);
    
    // Use proxy to bypass CORS
    const proxyUrl = `${ALLORIGINS_PROXY}${encodeURIComponent(url)}`;
    const response = await axios.get(proxyUrl);
    
    if (!response.data) {
      console.error('No data returned from website');
      return null;
    }
    
    // Extract content using basic DOM parsing
    // In a real implementation, you would use proper HTML parsing libraries like Cheerio
    const htmlContent = response.data;
    
    // Extract title (simplistic approach)
    const titleMatch = htmlContent.match(/<title[^>]*>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : 'Unknown Title';
    
    // Extract paragraphs (simplistic approach)
    const paragraphs: string[] = [];
    const paragraphRegex = /<p[^>]*>(.*?)<\/p>/gi;
    let match;
    while ((match = paragraphRegex.exec(htmlContent)) !== null) {
      // Strip HTML tags from paragraph content
      const cleanText = match[1].replace(/<\/?[^>]+(>|$)/g, '');
      if (cleanText.length > 30) { // Avoid empty or very short paragraphs
        paragraphs.push(cleanText);
      }
    }
    
    // Combine paragraphs into content
    const content = paragraphs.join('\n\n');
    
    // Extract key points
    const keyPoints = extractKeyPoints(content);
    
    // Analyze sentiment
    const sentimentResult = await analyzeTextSentiment(content);
    
    // Extract financial metrics
    const financialMetrics = extractFinancialMetrics(content, sentimentResult.sentiment);
    
    return {
      title,
      content,
      keyPoints,
      sentiment: sentimentResult.sentiment,
      confidenceScore: sentimentResult.score,
      financialMetrics
    };
  } catch (error) {
    console.error('Error scraping website:', error);
    return null;
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
                           'index', 'forecast', 'trend', 'report', 'increase', 'decrease'];
  
  const keyPointCandidates = sentences.filter(sentence => {
    const lowerSentence = sentence.toLowerCase();
    return financialKeywords.some(keyword => lowerSentence.includes(keyword));
  });
  
  // Return top 3 key points or default message
  return keyPointCandidates.slice(0, 3).map(s => s.trim()) || ['No key points available'];
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
