
import React from 'react';
import { TimeRange } from '@/utils/marketData';
import { cn } from '@/lib/utils';

interface TimeRangeSelectorProps {
  selectedRange: TimeRange;
  onRangeChange: (range: TimeRange) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ 
  selectedRange, 
  onRangeChange 
}) => {
  const ranges: TimeRange[] = ['1D', '1W', '2W', '1M', '3M'];
  
  return (
    <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
      {ranges.map((range) => (
        <button
          key={range}
          onClick={() => onRangeChange(range)}
          className={cn(
            "px-3 py-1 text-xs font-medium rounded-md transition-colors",
            selectedRange === range 
              ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm" 
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          )}
        >
          {range}
        </button>
      ))}
    </div>
  );
};

export default TimeRangeSelector;
