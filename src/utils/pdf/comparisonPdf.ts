
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { StockComparisonData } from '../api/stockService';
import { formatDate } from '../formatters';
import { addFooter, addDisclaimer } from './pdfUtils';

export const generateComparisonPDF = (comparisonData: StockComparisonData): void => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(22);
  doc.setTextColor(33, 37, 41);
  doc.text('Stock Comparison Analysis', 15, 20);
  
  // Add subtitle
  doc.setFontSize(16);
  doc.setTextColor(108, 117, 125);
  doc.text(comparisonData.stocks.map(s => s.symbol).join(' vs '), 15, 30);
  
  // Add date
  doc.setFontSize(12);
  doc.text(`Generated on: ${formatDate(new Date(), 'long')}`, 15, 40);
  
  // Add price comparison
  doc.setFontSize(16);
  doc.setTextColor(33, 37, 41);
  doc.text('Price Comparison', 15, 60);
  
  const priceData = comparisonData.stocks.map(stock => [
    stock.symbol, 
    stock.currentPrice,
    stock.change
  ]);
  
  doc.autoTable({
    startY: 65,
    head: [['Symbol', 'Price', 'Change']],
    body: priceData,
    theme: 'striped',
    headStyles: { fillColor: [13, 110, 253] },
    margin: { left: 15, right: 15 }
  });
  
  // Add performance comparison
  const performanceY = doc.lastAutoTable.finalY + 15;
  doc.setFontSize(16);
  doc.setTextColor(33, 37, 41);
  doc.text('Performance Comparison', 15, performanceY);
  
  const performanceData = comparisonData.stocks.map(stock => [
    stock.symbol,
    stock.performance.oneMonth,
    stock.performance.threeMonths,
    stock.performance.oneYear
  ]);
  
  doc.autoTable({
    startY: performanceY + 5,
    head: [['Symbol', '1 Month', '3 Months', '1 Year']],
    body: performanceData,
    theme: 'striped',
    headStyles: { fillColor: [13, 110, 253] },
    margin: { left: 15, right: 15 }
  });
  
  // Add key metrics comparison
  const metricsY = doc.lastAutoTable.finalY + 15;
  doc.setFontSize(16);
  doc.setTextColor(33, 37, 41);
  doc.text('Key Metrics Comparison', 15, metricsY);
  
  const metricsData = comparisonData.stocks.map(stock => [
    stock.symbol,
    stock.marketCap,
    stock.peRatio,
    stock.dividendYield || 'N/A'
  ]);
  
  doc.autoTable({
    startY: metricsY + 5,
    head: [['Symbol', 'Market Cap', 'P/E Ratio', 'Dividend Yield']],
    body: metricsData,
    theme: 'striped',
    headStyles: { fillColor: [13, 110, 253] },
    margin: { left: 15, right: 15 }
  });
  
  // Add conclusion
  const conclusionY = doc.lastAutoTable.finalY + 15;
  doc.setFontSize(16);
  doc.setTextColor(33, 37, 41);
  doc.text('Comparison Conclusion', 15, conclusionY);
  
  doc.setFontSize(12);
  doc.setTextColor(33, 37, 41);
  const conclusionText = comparisonData.conclusion;
  const splitConclusion = doc.splitTextToSize(conclusionText, 180);
  doc.text(splitConclusion, 15, conclusionY + 10);
  
  // Add disclaimer
  const disclaimerY = conclusionY + 10 + (splitConclusion.length * 5) + 10;
  addDisclaimer(doc, disclaimerY);
  
  // Add footer
  addFooter(doc, 'Financial Analyzer');
  
  // Save the PDF
  const symbols = comparisonData.stocks.map(s => s.symbol).join('_vs_');
  doc.save(`Stock_Comparison_${symbols}_${formatDate(new Date(), 'YYYYMMDD')}.pdf`);
};
