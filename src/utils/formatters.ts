
// Utility function to format dates in various formats
export const formatDate = (date: Date, format: string = 'long'): string => {
  if (format === 'long') {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } else if (format === 'short') {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } else if (format === 'YYYYMMDD') {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  } else {
    return date.toISOString();
  }
};

// Format currency values
export const formatCurrency = (value: number, currency: string = 'INR'): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency
  }).format(value);
};

// Format large numbers with abbreviations (K, M, B)
export const formatLargeNumber = (num: number): string => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  } else {
    return num.toString();
  }
};

// Format percentage values
export const formatPercentage = (value: number, includeSign: boolean = true): string => {
  const formatted = Math.abs(value).toFixed(2) + '%';
  if (includeSign) {
    return value >= 0 ? '+' + formatted : '-' + formatted;
  }
  return formatted;
};
