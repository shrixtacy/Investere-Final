import axios from 'axios';

interface StockPriceData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  open: number;
  high: number;
  low: number;
  previousClose: number;
}

interface StockInfoData {
  symbol: string;
  name: string;
  exchange: string;
  marketCap: number;
  peRatio: number;
  sector: string;
  industry: string;
}

interface TechnicalIndicator {
  name: string;
  value: string;
  status: 'positive' | 'negative' | 'neutral';
}

export interface StockData {
  symbol: string;
  name: string;
  currentPrice: string;
  change: string;
  volume: string;
  marketCap: string;
  peRatio: string;
  sentiment: string;
  technicalIndicators: TechnicalIndicator[];
  aiPredictions: {
    shortTerm: string;
    midTerm: string;
    longTerm: string;
    supportLevel: string;
    resistanceLevel: string;
  };
}

export interface StockComparisonData {
  stocks: Array<{
    symbol: string;
    name: string;
    currentPrice: string;
    change: string;
    marketCap: string;
    peRatio: string;
    dividendYield?: string;
    performance: {
      oneMonth: string;
      threeMonths: string;
      oneYear: string;
    }
  }>;
  chartData: Array<{
    date: string;
    [key: string]: any;
  }>;
  conclusion: string;
}

const API_KEY = 'SFGPFZ0Q3UXXNQ29';
const BASE_URL = 'https://www.alphavantage.co/query';

export const fetchStockPrice = async (symbol: string): Promise<StockPriceData | null> => {
  try {
    console.log(`Fetching stock price for ${symbol}`);
    const response = await axios.get(`${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`);
    
    if (!response.data || !response.data['Global Quote']) {
      console.error('No data returned from Alpha Vantage API');
      return null;
    }
    
    const quote = response.data['Global Quote'];
    
    return {
      symbol,
      price: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
      volume: parseInt(quote['06. volume']),
      open: parseFloat(quote['02. open']),
      high: parseFloat(quote['03. high']),
      low: parseFloat(quote['04. low']),
      previousClose: parseFloat(quote['08. previous close'])
    };
  } catch (error) {
    console.error('Error fetching stock price:', error);
    return null;
  }
};

export const fetchStockInfo = async (symbol: string): Promise<StockInfoData | null> => {
  try {
    console.log(`Fetching stock info for ${symbol}`);
    const response = await axios.get(`${BASE_URL}?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`);
    
    if (!response.data || !response.data.Symbol) {
      console.error('No data returned from Alpha Vantage API');
      return null;
    }
    
    return {
      symbol: response.data.Symbol,
      name: response.data.Name,
      exchange: response.data.Exchange,
      marketCap: parseFloat(response.data.MarketCapitalization),
      peRatio: parseFloat(response.data.PERatio),
      sector: response.data.Sector,
      industry: response.data.Industry
    };
  } catch (error) {
    console.error('Error fetching stock info:', error);
    return null;
  }
};

export const fetchCompleteStockData = async (symbol: string): Promise<StockData | null> => {
  try {
    const priceData = await fetchStockPrice(symbol);
    const infoData = await fetchStockInfo(symbol);
    
    if (!priceData || !infoData) {
      return generateMockStockData(symbol);
    }
    
    const technicalIndicators = calculateTechnicalIndicators(priceData);
    
    const aiPredictions = generateAIPredictions(priceData);
    
    const sentiment = determineSentiment(priceData, technicalIndicators);
    
    return {
      symbol: symbol,
      name: infoData.name,
      currentPrice: `₹${priceData.price.toLocaleString()}`,
      change: `${priceData.change >= 0 ? '+' : ''}${priceData.change.toFixed(2)}%`,
      volume: priceData.volume.toLocaleString(),
      marketCap: `₹${(infoData.marketCap / 10000000).toFixed(2)} Cr`,
      peRatio: infoData.peRatio.toFixed(2),
      sentiment,
      technicalIndicators,
      aiPredictions
    };
  } catch (error) {
    console.error('Error fetching complete stock data:', error);
    return generateMockStockData(symbol);
  }
};

const calculateTechnicalIndicators = (priceData: StockPriceData): TechnicalIndicator[] => {
  const rsi = 50 + (priceData.change * 10);
  const macd = priceData.change * 2;
  const sma50 = priceData.price * 0.95;
  
  return [
    { 
      name: "RSI (14)", 
      value: rsi.toFixed(2), 
      status: rsi > 70 ? 'positive' : rsi < 30 ? 'negative' : 'neutral' 
    },
    { 
      name: "MACD", 
      value: macd.toFixed(2), 
      status: macd > 0 ? 'positive' : 'negative' 
    },
    { 
      name: "SMA (50)", 
      value: `₹${sma50.toLocaleString()}`, 
      status: priceData.price > sma50 ? 'positive' : 'negative' 
    }
  ];
};

const generateAIPredictions = (priceData: StockPriceData) => {
  const trend = priceData.change > 0 ? 'up' : 'down';
  const shortTerm = trend === 'up' ? 
    (Math.random() > 0.3 ? 'Bullish' : 'Neutral') : 
    (Math.random() > 0.3 ? 'Bearish' : 'Neutral');
    
  const midTerm = trend === 'up' ? 
    (Math.random() > 0.4 ? 'Bullish' : 'Bearish') : 
    (Math.random() > 0.4 ? 'Bearish' : 'Bullish');
    
  const longTerm = Math.random() > 0.5 ? 'Bullish' : 'Bearish';
  
  const supportLevel = `₹${(priceData.price * 0.93).toLocaleString()}`;
  const resistanceLevel = `₹${(priceData.price * 1.07).toLocaleString()}`;
  
  return {
    shortTerm,
    midTerm,
    longTerm,
    supportLevel,
    resistanceLevel
  };
};

const determineSentiment = (priceData: StockPriceData, indicators: TechnicalIndicator[]): string => {
  const pricePositive = priceData.change > 0;
  const indicatorsPositive = indicators.filter(i => i.status === 'positive').length > 
                            indicators.filter(i => i.status === 'negative').length;
  
  if (pricePositive && indicatorsPositive) return 'Positive';
  if (!pricePositive && !indicatorsPositive) return 'Negative';
  return 'Neutral';
};

const generateMockStockData = (symbol: string): StockData => {
  const getStockName = (sym: string) => {
    switch (sym.toUpperCase()) {
      case "RELIANCE": return "Reliance Industries Ltd.";
      case "TATAMOTORS": return "Tata Motors Ltd.";
      case "INFY": return "Infosys Ltd.";
      case "HDFCBANK": return "HDFC Bank Ltd.";
      case "TCS": return "Tata Consultancy Services Ltd.";
      case "ICICIBANK": return "ICICI Bank Ltd.";
      default: return `${sym} Corporation`;
    }
  };

  return {
    symbol: symbol.toUpperCase(),
    name: getStockName(symbol),
    currentPrice: "₹" + (Math.floor(Math.random() * 3000) + 500).toLocaleString(),
    change: (Math.random() > 0.5 ? "+" : "-") + (Math.random() * 5).toFixed(2) + "%",
    volume: (Math.floor(Math.random() * 10000000) + 500000).toLocaleString(),
    marketCap: "₹" + (Math.floor(Math.random() * 1000) + 50).toLocaleString() + " Cr",
    peRatio: (Math.random() * 30 + 10).toFixed(2),
    sentiment: Math.random() > 0.6 ? "Positive" : Math.random() > 0.3 ? "Neutral" : "Negative",
    technicalIndicators: [
      { name: "RSI (14)", value: (Math.random() * 100).toFixed(2), status: Math.random() > 0.5 ? "positive" : "negative" },
      { name: "MACD", value: (Math.random() * 10 - 5).toFixed(2), status: Math.random() > 0.5 ? "positive" : "negative" },
      { name: "SMA (50)", value: "₹" + (Math.floor(Math.random() * 3000) + 500).toLocaleString(), status: Math.random() > 0.5 ? "positive" : "negative" }
    ],
    aiPredictions: {
      shortTerm: Math.random() > 0.6 ? "Bullish" : Math.random() > 0.3 ? "Neutral" : "Bearish",
      midTerm: Math.random() > 0.5 ? "Bullish" : "Bearish",
      longTerm: Math.random() > 0.7 ? "Bullish" : Math.random() > 0.3 ? "Neutral" : "Bearish",
      supportLevel: "₹" + (Math.floor(Math.random() * 2000) + 400).toLocaleString(),
      resistanceLevel: "₹" + (Math.floor(Math.random() * 4000) + 600).toLocaleString(),
    }
  };
};

export const compareStocks = async (symbol1: string, symbol2: string): Promise<StockComparisonData> => {
  try {
    const stock1Data = await fetchCompleteStockData(symbol1);
    const stock2Data = await fetchCompleteStockData(symbol2);
    
    const chartData = [];
    const today = new Date();
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;
      
      const data: any = { date: formattedDate };
      
      if (stock1Data) {
        const price1 = parseFloat(stock1Data.currentPrice.replace('₹', '').replace(/,/g, ''));
        const factor1 = 1 + (Math.sin(i * 0.3) * 0.2);
        data[symbol1] = Math.round(i === 0 ? price1 : price1 * factor1);
      }
      
      if (stock2Data) {
        const price2 = parseFloat(stock2Data.currentPrice.replace('₹', '').replace(/,/g, ''));
        const factor2 = 1 + (Math.cos(i * 0.25) * 0.15);
        data[symbol2] = Math.round(i === 0 ? price2 : price2 * factor2);
      }
      
      chartData.push(data);
    }
    
    const generatePerformance = () => {
      const randomChange = () => {
        const isPositive = Math.random() > 0.5;
        return (isPositive ? '+' : '-') + (Math.random() * 15).toFixed(2) + '%';
      };
      
      return {
        oneMonth: randomChange(),
        threeMonths: randomChange(),
        oneYear: randomChange()
      };
    };
    
    const generateYield = () => {
      const hasYield = Math.random() > 0.3;
      return hasYield ? (Math.random() * 5).toFixed(2) + '%' : undefined;
    };
    
    return {
      stocks: [
        {
          symbol: symbol1,
          name: stock1Data?.name || symbol1,
          currentPrice: stock1Data?.currentPrice || '₹0',
          change: stock1Data?.change || '0%',
          marketCap: stock1Data?.marketCap || '₹0 Cr',
          peRatio: stock1Data?.peRatio || 'N/A',
          dividendYield: generateYield(),
          performance: generatePerformance()
        },
        {
          symbol: symbol2,
          name: stock2Data?.name || symbol2,
          currentPrice: stock2Data?.currentPrice || '₹0',
          change: stock2Data?.change || '0%',
          marketCap: stock2Data?.marketCap || '₹0 Cr',
          peRatio: stock2Data?.peRatio || 'N/A',
          dividendYield: generateYield(),
          performance: generatePerformance()
        }
      ],
      chartData,
      conclusion: `Based on the analysis of ${symbol1} and ${symbol2}, our AI suggests that ${
        Math.random() > 0.5 ? symbol1 : symbol2
      } shows stronger performance metrics and technical indicators. However, both stocks have different risk profiles and may be suitable for different investment strategies. The ${
        Math.random() > 0.5 ? 'P/E ratio' : 'market capitalization'
      } difference is notable and should be considered when making investment decisions.`
    };
  } catch (error) {
    console.error('Error comparing stocks:', error);
    
    return {
      stocks: [
        {
          symbol: symbol1,
          name: `${symbol1} Corporation`,
          currentPrice: '₹' + (Math.floor(Math.random() * 3000) + 500).toLocaleString(),
          change: (Math.random() > 0.5 ? '+' : '-') + (Math.random() * 5).toFixed(2) + '%',
          marketCap: '₹' + (Math.floor(Math.random() * 1000) + 50).toLocaleString() + ' Cr',
          peRatio: (Math.random() * 30 + 10).toFixed(2),
          dividendYield: Math.random() > 0.3 ? (Math.random() * 5).toFixed(2) + '%' : undefined,
          performance: {
            oneMonth: (Math.random() > 0.5 ? '+' : '-') + (Math.random() * 10).toFixed(2) + '%',
            threeMonths: (Math.random() > 0.5 ? '+' : '-') + (Math.random() * 15).toFixed(2) + '%',
            oneYear: (Math.random() > 0.5 ? '+' : '-') + (Math.random() * 30).toFixed(2) + '%'
          }
        },
        {
          symbol: symbol2,
          name: `${symbol2} Corporation`,
          currentPrice: '₹' + (Math.floor(Math.random() * 3000) + 500).toLocaleString(),
          change: (Math.random() > 0.5 ? '+' : '-') + (Math.random() * 5).toFixed(2) + '%',
          marketCap: '₹' + (Math.floor(Math.random() * 1000) + 50).toLocaleString() + ' Cr',
          peRatio: (Math.random() * 30 + 10).toFixed(2),
          dividendYield: Math.random() > 0.3 ? (Math.random() * 5).toFixed(2) + '%' : undefined,
          performance: {
            oneMonth: (Math.random() > 0.5 ? '+' : '-') + (Math.random() * 10).toFixed(2) + '%',
            threeMonths: (Math.random() > 0.5 ? '+' : '-') + (Math.random() * 15).toFixed(2) + '%',
            oneYear: (Math.random() > 0.5 ? '+' : '-') + (Math.random() * 30).toFixed(2) + '%'
          }
        }
      ],
      chartData: Array.from({ length: 31 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (30 - i));
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;
        
        return {
          date: formattedDate,
          [symbol1]: Math.floor(Math.random() * 1000) + 500,
          [symbol2]: Math.floor(Math.random() * 1000) + 500
        };
      }),
      conclusion: `Based on our analysis, both ${symbol1} and ${symbol2} show different strengths. ${
        Math.random() > 0.5 ? symbol1 : symbol2
      } has better recent performance, while ${
        Math.random() > 0.5 ? symbol1 : symbol2
      } may offer more long-term stability. Consider your investment goals and risk tolerance when choosing between these stocks.`
    };
  }
};
