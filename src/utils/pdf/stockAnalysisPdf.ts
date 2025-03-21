
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { StockData } from '../api/stockService';
import { formatDate } from '../formatters';
import { addFooter, addDisclaimer } from './pdfUtils';

export const generateStockAnalysisPDF = (stockData: StockData): void => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(22);
  doc.setTextColor(33, 37, 41);
  doc.text(`Stock Analysis Report: ${stockData.symbol}`, 15, 20);
  
  // Add subtitle
  doc.setFontSize(16);
  doc.setTextColor(108, 117, 125);
  doc.text(stockData.name, 15, 30);
  
  // Add date
  doc.setFontSize(12);
  doc.text(`Generated on: ${formatDate(new Date(), 'long')}`, 15, 40);
  
  // Add stock price box
  doc.setFillColor(240, 249, 255);
  doc.rect(15, 50, 180, 30, 'F');
  
  doc.setFontSize(14);
  doc.setTextColor(33, 37, 41);
  doc.text('Current Price', 25, 62);
  
  doc.setFontSize(20);
  doc.setTextColor(13, 110, 253);
  doc.text(stockData.currentPrice, 100, 62);
  
  doc.setFontSize(14);
  doc.setTextColor(33, 37, 41);
  doc.text('Change', 25, 72);
  
  const changeColor = stockData.change.startsWith('+') ? [40, 167, 69] : [220, 53, 69];
  doc.setTextColor(changeColor[0], changeColor[1], changeColor[2]);
  doc.text(stockData.change, 100, 72);
  
  // Add key metrics table
  doc.setFontSize(16);
  doc.setTextColor(33, 37, 41);
  doc.text('Key Metrics', 15, 100);
  
  const metricsData = [
    ['Volume', stockData.volume],
    ['Market Cap', stockData.marketCap],
    ['P/E Ratio', stockData.peRatio],
    ['Sentiment', stockData.sentiment]
  ];
  
  doc.autoTable({
    startY: 105,
    head: [['Metric', 'Value']],
    body: metricsData,
    theme: 'striped',
    headStyles: { fillColor: [13, 110, 253] },
    margin: { left: 15, right: 15 }
  });
  
  // Add technical indicators
  const startY = doc.lastAutoTable.finalY + 15;
  doc.setFontSize(16);
  doc.setTextColor(33, 37, 41);
  doc.text('Technical Indicators', 15, startY);
  
  const indicatorsData = stockData.technicalIndicators.map(indicator => {
    const statusColor = indicator.status === 'positive' ? '🟢' : 
                         indicator.status === 'negative' ? '🔴' : '🟡';
    return [indicator.name, indicator.value, statusColor];
  });
  
  doc.autoTable({
    startY: startY + 5,
    head: [['Indicator', 'Value', 'Signal']],
    body: indicatorsData,
    theme: 'striped',
    headStyles: { fillColor: [13, 110, 253] },
    margin: { left: 15, right: 15 }
  });
  
  // Add AI predictions
  const predictionStartY = doc.lastAutoTable.finalY + 15;
  doc.setFontSize(16);
  doc.setTextColor(33, 37, 41);
  doc.text('AI-Powered Predictions', 15, predictionStartY);
  
  const predictionsData = [
    ['Short Term', stockData.aiPredictions.shortTerm],
    ['Mid Term', stockData.aiPredictions.midTerm],
    ['Long Term', stockData.aiPredictions.longTerm],
    ['Support Level', stockData.aiPredictions.supportLevel],
    ['Resistance Level', stockData.aiPredictions.resistanceLevel]
  ];
  
  doc.autoTable({
    startY: predictionStartY + 5,
    head: [['Time Frame', 'Prediction']],
    body: predictionsData,
    theme: 'striped',
    headStyles: { fillColor: [13, 110, 253] },
    margin: { left: 15, right: 15 }
  });
  
  // Add disclaimer
  const disclaimerY = doc.lastAutoTable.finalY + 15;
  addDisclaimer(doc, disclaimerY);
  
  // Add footer with proper arguments
  addFooter(doc, 'Financial Analyzer');
  
  // Save the PDF
  doc.save(`${stockData.symbol}_Analysis_${formatDate(new Date(), 'YYYYMMDD')}.pdf`);
};
