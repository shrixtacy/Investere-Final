
// This is a simplified sentiment analyzer that would be replaced by a proper ML model in production
// For a real implementation, consider using libraries like TensorFlow.js or a cloud-based NLP API

interface SentimentResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
}

// Lists of words that indicate sentiment
const POSITIVE_WORDS = [
  'surge', 'gain', 'profit', 'growth', 'rally', 'boom', 'rise', 'improve',
  'benefit', 'success', 'strong', 'bullish', 'positive', 'optimistic', 'uptrend',
  'recovery', 'outperform', 'beat', 'expand', 'exceed', 'upside', 'opportunity',
  'advance', 'upgrade', 'momentum', 'confident', 'robust', 'strength', 'favorable'
];

const NEGATIVE_WORDS = [
  'decline', 'loss', 'drop', 'fall', 'plunge', 'crash', 'weak', 'bearish',
  'tumble', 'downturn', 'downgrade', 'negative', 'risk', 'uncertainty', 'concern',
  'default', 'crisis', 'fail', 'miss', 'underperform', 'pressure', 'struggle',
  'recession', 'inflation', 'volatility', 'slump', 'slowdown', 'caution', 'worry'
];

const NEUTRAL_WORDS = [
  'stable', 'steady', 'maintain', 'unchanged', 'flat', 'balanced', 'moderate',
  'unchanged', 'expected', 'projected', 'forecast', 'estimate', 'typical', 'normal',
  'consistent', 'in line', 'hold', 'neutral', 'sideways', 'consolidate', 'mixed'
];

export const analyzeTextSentiment = async (text: string): Promise<SentimentResult> => {
  // Convert to lowercase for case-insensitive matching
  const lowerText = text.toLowerCase();
  
  // Count occurrences of positive, negative, and neutral words
  let positiveCount = 0;
  let negativeCount = 0;
  let neutralCount = 0;
  
  // Check for positive words
  for (const word of POSITIVE_WORDS) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = lowerText.match(regex);
    if (matches) positiveCount += matches.length;
  }
  
  // Check for negative words
  for (const word of NEGATIVE_WORDS) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = lowerText.match(regex);
    if (matches) negativeCount += matches.length;
  }
  
  // Check for neutral words
  for (const word of NEUTRAL_WORDS) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = lowerText.match(regex);
    if (matches) neutralCount += matches.length;
  }
  
  // Calculate sentiment score (-1 to +1)
  const totalWords = positiveCount + negativeCount + neutralCount;
  let score = 0;
  
  if (totalWords > 0) {
    score = (positiveCount - negativeCount) / totalWords;
  }
  
  // Determine sentiment based on score
  let sentiment: 'positive' | 'negative' | 'neutral';
  
  if (score > 0.2) {
    sentiment = 'positive';
  } else if (score < -0.2) {
    sentiment = 'negative';
  } else {
    sentiment = 'neutral';
  }
  
  return {
    sentiment,
    score: Math.abs(score) // Return absolute score for confidence
  };
};
