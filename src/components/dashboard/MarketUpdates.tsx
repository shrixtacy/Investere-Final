
import React from 'react';
import { marketUpdates } from '@/utils/marketData';
import { Clock, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const MarketUpdates: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 p-4 mt-8">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Latest Market Updates</h3>
      <div className="space-y-4">
        {marketUpdates.map((update, index) => (
          <div key={index} className="p-3 bg-gray-50 dark:bg-gray-750 rounded-lg">
            <div className="text-sm text-gray-900 dark:text-white font-medium mb-2">{update.title}</div>
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <Clock className="h-3 w-3 mr-1" />
                {update.time}
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 dark:text-gray-400 mr-2">{update.source}</span>
                <Link to="/news" className="text-finance-blue hover:text-blue-700 dark:hover:text-blue-400">
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link to="/news" className="block text-sm text-finance-blue hover:text-blue-700 dark:hover:text-blue-400 mt-4 text-center">
        View all market news
      </Link>
    </div>
  );
};

export default MarketUpdates;
