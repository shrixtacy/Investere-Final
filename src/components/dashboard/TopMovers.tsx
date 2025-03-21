
import React from 'react';
import { topGainers, topLosers } from '@/utils/marketData';
import { ArrowUp, ArrowDown } from 'lucide-react';

const TopMovers: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 p-4">
        <div className="flex items-center text-finance-green mb-4">
          <ArrowUp className="h-4 w-4 mr-2" />
          <h3 className="text-sm font-semibold">Top Gainers</h3>
        </div>
        <div className="space-y-3">
          {topGainers.map((stock, index) => (
            <div key={index} className="flex justify-between items-center p-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
              <div className="text-sm font-medium text-gray-900 dark:text-white">{stock.name}</div>
              <div className="flex items-end flex-col">
                <div className="text-sm text-gray-900 dark:text-white">{stock.value}</div>
                <div className="text-xs font-medium text-finance-green">{stock.change}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 p-4">
        <div className="flex items-center text-finance-red mb-4">
          <ArrowDown className="h-4 w-4 mr-2" />
          <h3 className="text-sm font-semibold">Top Losers</h3>
        </div>
        <div className="space-y-3">
          {topLosers.map((stock, index) => (
            <div key={index} className="flex justify-between items-center p-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
              <div className="text-sm font-medium text-gray-900 dark:text-white">{stock.name}</div>
              <div className="flex items-end flex-col">
                <div className="text-sm text-gray-900 dark:text-white">{stock.value}</div>
                <div className="text-xs font-medium text-finance-red">{stock.change}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopMovers;
