
import React from 'react';
import { currentIndices } from '@/utils/marketData';

const MarketIndices: React.FC = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {currentIndices.map((index, i) => (
        <div key={i} className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-start mb-2">
            <div className="text-sm font-semibold text-gray-900 dark:text-white">{index.name}</div>
            <div className={`text-xs font-medium ${index.status === 'up' ? 'text-finance-green' : 'text-finance-red'}`}>
              {index.change}
            </div>
          </div>
          <div className="text-lg font-bold text-gray-900 dark:text-white mb-2">{index.value}</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-gray-500 dark:text-gray-400">High: </span>
              <span className="text-gray-900 dark:text-white">{index.dayHigh}</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Low: </span>
              <span className="text-gray-900 dark:text-white">{index.dayLow}</span>
            </div>
            <div className="col-span-2">
              <span className="text-gray-500 dark:text-gray-400">Volume: </span>
              <span className="text-gray-900 dark:text-white">{index.volume}</span>
            </div>
          </div>
          <div className="h-1 w-full mt-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full ${index.status === 'up' ? 'bg-finance-green' : 'bg-finance-red'} rounded-full`}
              style={{ width: `${Math.min(Math.abs(parseFloat(index.change)), 5) * 20}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarketIndices;
