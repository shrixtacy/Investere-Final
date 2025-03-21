
import React, { useEffect, useState } from 'react';

type MarketData = {
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
};

const defaultData: MarketData[] = [
  { name: 'Nifty 50', value: '22,493', change: '+1.2%', isPositive: true },
  { name: 'Sensex', value: '73,876', change: '+0.9%', isPositive: true },
  { name: 'Bank Nifty', value: '48,125', change: '-0.3%', isPositive: false },
];

const LiveMarketIndicator = () => {
  const [marketData, setMarketData] = useState<MarketData[]>(defaultData);
  const [currentTime, setCurrentTime] = useState<string>('');
  
  // Update the current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      setCurrentTime(`Today, ${formattedHours}:${formattedMinutes} ${ampm} IST`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);
  
  // Simulate small random fluctuations in the market data
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prevData => 
        prevData.map(item => {
          const fluctuation = (Math.random() - 0.5) * 0.2;
          const currentChange = parseFloat(item.change.replace('%', '').replace('+', ''));
          const newChange = (currentChange + fluctuation).toFixed(1);
          const isPositive = parseFloat(newChange) >= 0;
          
          return {
            ...item,
            change: `${isPositive ? '+' : ''}${newChange}%`,
            isPositive
          };
        })
      );
    }, 8000); // Update every 8 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex flex-col">
      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Indian Market Snapshot</h3>
      <div className="flex-1 grid grid-cols-3 gap-4">
        {marketData.map((item, index) => (
          <div key={index} className="flex flex-col">
            <div className="text-xs text-gray-500 dark:text-gray-400">{item.name}</div>
            <div className="text-lg font-medium text-gray-900 dark:text-white">
              {item.value}
              <span className={`ml-1 text-xs ${item.isPositive ? 'text-finance-green' : 'text-finance-red'}`}>
                {item.change}
              </span>
            </div>
            <div className={`h-1 w-full mt-1 rounded-full ${
              item.isPositive ? 'bg-finance-green' : 'bg-finance-red'
            } bg-opacity-30`}>
              <div 
                className={`h-1 rounded-full ${item.isPositive ? 'bg-finance-green' : 'bg-finance-red'}`}
                style={{ width: `${Math.min(Math.abs(parseFloat(item.change)), 5) * 20}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
        <span>Last updated: {currentTime}</span>
        <span className="flex items-center">
          <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-1 animate-pulse"></span>
          Live
        </span>
      </div>
    </div>
  );
};

export default LiveMarketIndicator;
