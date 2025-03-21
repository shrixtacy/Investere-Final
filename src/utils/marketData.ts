
// Market data for different time periods
export type MarketDataPoint = {
  day: string;
  nifty: number;
  prediction: number;
};

// Full data set (last 30 days)
export const marketData: MarketDataPoint[] = [
  { day: 'Apr 1', nifty: 22405, prediction: 22350 },
  { day: 'Apr 2', nifty: 22485, prediction: 22420 },
  { day: 'Apr 3', nifty: 22358, prediction: 22380 },
  { day: 'Apr 4', nifty: 22415, prediction: 22440 },
  { day: 'Apr 5', nifty: 22570, prediction: 22520 },
  { day: 'Apr 6', nifty: 22750, prediction: 22680 },
  { day: 'Apr 7', nifty: 22842, prediction: 22880 },
  { day: 'Apr 8', nifty: 22820, prediction: 22900 },
  { day: 'Apr 9', nifty: 22950, prediction: 22980 },
  { day: 'Apr 10', nifty: 23120, prediction: 23050 },
  { day: 'Apr 11', nifty: 23040, prediction: 23100 },
  { day: 'Apr 12', nifty: 22990, prediction: 23050 },
  { day: 'Apr 13', nifty: 23210, prediction: 23180 },
  { day: 'Apr 14', nifty: 23350, prediction: 23280 },
  { day: 'Apr 15', nifty: 23410, prediction: 23450 },
  { day: 'Apr 16', nifty: 23480, prediction: 23520 },
  { day: 'Apr 17', nifty: 23567, prediction: 23600 },
  { day: 'Apr 18', nifty: 23612, prediction: 23640 },
  { day: 'Apr 19', nifty: 23580, prediction: 23600 },
  { day: 'Apr 20', nifty: 23520, prediction: 23550 },
  { day: 'Apr 21', nifty: 23490, prediction: 23510 },
  { day: 'Apr 22', nifty: 23510, prediction: 23530 },
  { day: 'Apr 23', nifty: 23540, prediction: 23560 },
  { day: 'Apr 24', nifty: 23580, prediction: 23600 },
  { day: 'Apr 25', nifty: 23650, prediction: 23680 },
  { day: 'Apr 26', nifty: 23700, prediction: 23720 },
  { day: 'Apr 27', nifty: 23710, prediction: 23730 },
  { day: 'Apr 28', nifty: 23720, prediction: 23740 },
  { day: 'Apr 29', nifty: 23750, prediction: 23780 },
  { day: 'Apr 30', nifty: 23780, prediction: 23810 },
];

export type TimeRange = '1D' | '1W' | '2W' | '1M' | '3M';

export const getMarketDataForRange = (range: TimeRange): MarketDataPoint[] => {
  switch (range) {
    case '1D':
      return marketData.slice(-1);
    case '1W':
      return marketData.slice(-7);
    case '2W':
      return marketData.slice(-14);
    case '1M':
      return marketData;
    case '3M':
      // For 3 months, we'll use the 30-day data and add more variation to represent 3 months
      return [...marketData.map((data, index) => ({
        day: `Mar ${index + 1}`,
        nifty: data.nifty - Math.floor(Math.random() * 500 + 200),
        prediction: data.prediction - Math.floor(Math.random() * 500 + 200),
      })), ...marketData];
    default:
      return marketData;
  }
};

// Current Indian market indices with latest data
export const currentIndices = [
  { 
    name: 'Nifty 50', 
    value: '23,896.70', 
    change: '+0.89%', 
    status: 'up',
    dayHigh: '23,920.55',
    dayLow: '23,781.60',
    volume: '198.5M'
  },
  { 
    name: 'Sensex', 
    value: '78,748.25', 
    change: '+0.82%', 
    status: 'up',
    dayHigh: '78,845.50',
    dayLow: '78,295.80',
    volume: '145.2M'
  },
  { 
    name: 'Nifty Bank', 
    value: '49,752.40', 
    change: '+0.63%', 
    status: 'up',
    dayHigh: '49,830.25',
    dayLow: '49,511.35',
    volume: '87.3M'
  },
  { 
    name: 'Nifty IT', 
    value: '38,421.75', 
    change: '+1.24%', 
    status: 'up',
    dayHigh: '38,560.90',
    dayLow: '38,112.45',
    volume: '56.8M'
  },
  { 
    name: 'Nifty Auto', 
    value: '22,587.35', 
    change: '+0.45%', 
    status: 'up',
    dayHigh: '22,625.10',
    dayLow: '22,498.70',
    volume: '32.1M'
  },
  { 
    name: 'Nifty FMCG', 
    value: '55,284.10', 
    change: '-0.28%', 
    status: 'down',
    dayHigh: '55,420.80',
    dayLow: '55,221.35',
    volume: '28.7M'
  }
];

// Top gaining and declining stocks
export const topGainers = [
  { name: 'TCS', value: '₹3,986.45', change: '+3.21%' },
  { name: 'Infosys', value: '₹1,572.30', change: '+2.85%' },
  { name: 'Wipro', value: '₹495.75', change: '+2.62%' },
  { name: 'HCL Tech', value: '₹1,394.60', change: '+2.37%' },
  { name: 'Tech Mahindra', value: '₹1,284.95', change: '+2.18%' }
];

export const topLosers = [
  { name: 'ITC', value: '₹434.85', change: '-1.24%' },
  { name: 'Nestle India', value: '₹2,385.60', change: '-1.18%' },
  { name: 'HUL', value: '₹2,642.75', change: '-0.92%' },
  { name: 'Asian Paints', value: '₹2,927.40', change: '-0.85%' },
  { name: 'Britannia', value: '₹4,982.30', change: '-0.72%' }
];

// Market updates and news
export const marketUpdates = [
  { 
    title: 'RBI keeps repo rate unchanged at 6.5%', 
    time: '2 hours ago',
    source: 'Economic Times'
  },
  { 
    title: 'FIIs turn net buyers, pump ₹2,750 cr into Indian equities', 
    time: '4 hours ago',
    source: 'Mint'
  },
  { 
    title: 'IT stocks rally on strong US earnings, digital spending outlook', 
    time: '5 hours ago',
    source: 'Business Standard'
  },
  { 
    title: 'India\'s GDP growth projected at 7.2% for FY25: RBI Governor', 
    time: '8 hours ago',
    source: 'Financial Express'
  }
];
