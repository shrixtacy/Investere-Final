
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { NewsArticle } from '../api/newsService';
import { formatDate } from '../formatters';
import { addFooter, addDisclaimer } from './pdfUtils';

export const generateNewsAnalysisPDF = (article: NewsArticle): void => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.setTextColor(33, 37, 41);
  doc.text('Indian Financial Market Analysis', 15, 20);
  
  // Add article title
  doc.setFontSize(16);
  doc.setTextColor(13, 110, 253);
  
  // Split long titles into multiple lines
  const splitTitle = doc.splitTextToSize(article.title, 180);
  doc.text(splitTitle, 15, 30);
  
  // Add source and date
  const titleHeight = splitTitle.length * 8;
  doc.setFontSize(12);
  doc.setTextColor(108, 117, 125);
  doc.text(`Source: ${article.source} | Date: ${article.date}`, 15, 30 + titleHeight);
  
  // Add sentiment analysis
  doc.setFillColor(240, 249, 255);
  doc.rect(15, 40 + titleHeight, 180, 25, 'F');
  
  doc.setFontSize(14);
  doc.setTextColor(33, 37, 41);
  doc.text('Market Sentiment Analysis', 25, 52 + titleHeight);
  
  const sentimentColor = article.sentiment === 'positive' ? [40, 167, 69] : 
                        article.sentiment === 'negative' ? [220, 53, 69] : [255, 193, 7];
  
  doc.setTextColor(sentimentColor[0], sentimentColor[1], sentimentColor[2]);
  doc.text(article.sentiment || 'Unknown', 100, 52 + titleHeight);
  
  doc.setFontSize(12);
  doc.setTextColor(33, 37, 41);
  doc.text(`Confidence Score: ${Math.round((article.confidenceScore || 0) * 100)}%`, 100, 60 + titleHeight);
  
  // Add Indian market indices section
  const indicesY = 75 + titleHeight;
  doc.setFontSize(16);
  doc.setTextColor(33, 37, 41);
  doc.text('Indian Market Indices', 15, indicesY);
  
  const currentDate = new Date();
  const formattedDate = formatDate(currentDate, 'short');
  
  const indicesData = [
    ['Nifty 50', '23,500.00', '+0.75%'],
    ['Sensex', '77,200.00', '+0.68%'],
    ['Nifty Bank', '50,400.00', '+0.41%'],
    ['Nifty IT', '38,700.00', '+1.24%']
  ];
  
  doc.autoTable({
    startY: indicesY + 5,
    head: [['Index', 'Value (' + formattedDate + ')', 'Change']],
    body: indicesData,
    theme: 'striped',
    headStyles: { fillColor: [13, 110, 253] },
    margin: { left: 15, right: 15 }
  });
  
  // Add key points
  const keyPointsY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(16);
  doc.setTextColor(33, 37, 41);
  doc.text('Key Indian Market Insights', 15, keyPointsY);
  
  const keyPointsData = article.keyPoints.map(point => [point]);
  
  doc.autoTable({
    startY: keyPointsY + 5,
    head: [['Extracted Market Insights']],
    body: keyPointsData,
    theme: 'striped',
    headStyles: { fillColor: [13, 110, 253] },
    margin: { left: 15, right: 15 }
  });
  
  // Add financial metrics
  const metricsY = doc.lastAutoTable.finalY + 15;
  doc.setFontSize(16);
  doc.setTextColor(33, 37, 41);
  doc.text('Indian Financial Metrics', 15, metricsY);
  
  const metricsData = article.metrics.map(metric => {
    const statusText = metric.status === 'positive' ? '🟢 Positive' : 
                       metric.status === 'negative' ? '🔴 Negative' : '🟡 Neutral';
    return [metric.name, metric.value, metric.status ? statusText : ''];
  });
  
  doc.autoTable({
    startY: metricsY + 5,
    head: [['Metric', 'Value', 'Impact']],
    body: metricsData,
    theme: 'striped',
    headStyles: { fillColor: [13, 110, 253] },
    margin: { left: 15, right: 15 }
  });
  
  // Add description
  const descriptionY = doc.lastAutoTable.finalY + 15;
  doc.setFontSize(16);
  doc.setTextColor(33, 37, 41);
  doc.text('Indian Market Summary', 15, descriptionY);
  
  doc.setFontSize(12);
  doc.setTextColor(33, 37, 41);
  const splitDescription = doc.splitTextToSize(article.description, 180);
  doc.text(splitDescription, 15, descriptionY + 10);
  
  // Add India-specific data visualization section
  const visualizationY = descriptionY + 10 + (splitDescription.length * 5) + 15;
  
  // Check if we have enough space for the visualization
  if (visualizationY < doc.internal.pageSize.getHeight() - 80) {
    doc.setFontSize(16);
    doc.setTextColor(33, 37, 41);
    doc.text('Indian Market Visualization', 15, visualizationY);
    
    // Add a simple bar chart visualization for India-specific metrics
    if (article.metrics && article.metrics.length > 0) {
      const chartY = visualizationY + 10;
      const chartHeight = 40;
      const chartWidth = 150;
      const barSpacing = chartWidth / article.metrics.length;
      
      // Draw chart background
      doc.setFillColor(245, 245, 245);
      doc.rect(25, chartY, chartWidth, chartHeight, 'F');
      
      // Draw bars
      article.metrics.forEach((metric, index) => {
        const barValue = parseFloat(metric.value.replace(/[^0-9.-]+/g, '')) || 0;
        const maxValue = 100; // Assuming normalized values or using a relative scale
        const barHeight = (barValue / maxValue) * chartHeight;
        const barWidth = barSpacing * 0.7;
        const barX = 25 + (index * barSpacing) + (barSpacing * 0.15);
        const barY = chartY + chartHeight - barHeight;
        
        // Set bar color based on status
        if (metric.status === 'positive') {
          doc.setFillColor(40, 167, 69); // Green
        } else if (metric.status === 'negative') {
          doc.setFillColor(220, 53, 69); // Red
        } else {
          doc.setFillColor(255, 193, 7); // Yellow
        }
        
        // Draw the bar
        doc.rect(barX, barY, barWidth, barHeight, 'F');
        
        // Add metric name below the bar
        doc.setFontSize(8);
        doc.setTextColor(33, 37, 41);
        doc.text(metric.name.substring(0, 10), barX, chartY + chartHeight + 10, { 
          align: 'center',
          maxWidth: barWidth
        });
      });
      
      // Draw x and y axes
      doc.setDrawColor(33, 37, 41);
      doc.line(25, chartY + chartHeight, 25 + chartWidth, chartY + chartHeight); // x-axis
      doc.line(25, chartY, 25, chartY + chartHeight); // y-axis
      
      // Add chart legend
      const legendY = chartY + chartHeight + 20;
      
      doc.setFillColor(40, 167, 69);
      doc.rect(25, legendY, 10, 5, 'F');
      doc.setFontSize(8);
      doc.setTextColor(33, 37, 41);
      doc.text('Bullish', 40, legendY + 4);
      
      doc.setFillColor(220, 53, 69);
      doc.rect(70, legendY, 10, 5, 'F');
      doc.text('Bearish', 85, legendY + 4);
      
      doc.setFillColor(255, 193, 7);
      doc.rect(125, legendY, 10, 5, 'F');
      doc.text('Neutral', 140, legendY + 4);
      
      // Add India-specific economic indicators
      const economicY = legendY + 20;
      
      if (economicY < doc.internal.pageSize.getHeight() - 50) {
        doc.setFontSize(14);
        doc.setTextColor(33, 37, 41);
        doc.text('Key Indian Economic Indicators', 15, economicY);
        
        const economicData = [
          ['GDP Growth', '7.2%', 'Positive'],
          ['Inflation (CPI)', '4.9%', 'Neutral'],
          ['Repo Rate', '6.5%', 'Neutral'],
          ['INR/USD', '₹83.20', 'Negative']
        ];
        
        doc.autoTable({
          startY: economicY + 5,
          head: [['Indicator', 'Current Value', 'Outlook']],
          body: economicData,
          theme: 'striped',
          headStyles: { fillColor: [13, 110, 253] },
          margin: { left: 15, right: 15 }
        });
        
        // Add quick summary box after the visualization
        const summaryY = doc.lastAutoTable.finalY + 10;
        
        if (summaryY < doc.internal.pageSize.getHeight() - 50) {
          doc.setFillColor(245, 245, 245);
          doc.rect(15, summaryY, 180, 30, 'F');
          
          doc.setFontSize(14);
          doc.setTextColor(33, 37, 41);
          doc.text('Indian Market Quick Summary', 25, summaryY + 10);
          
          const quickSummary = getIndianMarketSummary(article);
          const splitSummary = doc.splitTextToSize(quickSummary, 160);
          doc.setFontSize(10);
          doc.text(splitSummary, 25, summaryY + 20);
          
          // Add disclaimer after the summary box
          addDisclaimer(doc, summaryY + 40);
        } else {
          // Add disclaimer if we don't have room for the summary
          addDisclaimer(doc, summaryY);
        }
      } else {
        // Add quick summary box if we don't have metrics to visualize
        const summaryY = visualizationY + 10;
        
        doc.setFillColor(245, 245, 245);
        doc.rect(15, summaryY, 180, 30, 'F');
        
        doc.setFontSize(14);
        doc.setTextColor(33, 37, 41);
        doc.text('Indian Market Quick Summary', 25, summaryY + 10);
        
        const quickSummary = getIndianMarketSummary(article);
        const splitSummary = doc.splitTextToSize(quickSummary, 160);
        doc.setFontSize(10);
        doc.text(splitSummary, 25, summaryY + 20);
        
        // Add disclaimer after the summary box
        addDisclaimer(doc, summaryY + 40);
      }
    } else {
      // If no metrics to visualize, add sectoral indices table
      const sectoralY = visualizationY + 10;
      
      doc.setFontSize(14);
      doc.setTextColor(33, 37, 41);
      doc.text('Indian Sectoral Indices', 15, sectoralY);
      
      const sectoralData = [
        ['Nifty Auto', '24,500.00', '+1.2%'],
        ['Nifty FMCG', '52,800.00', '+0.5%'],
        ['Nifty Pharma', '18,300.00', '-0.3%'],
        ['Nifty Metal', '8,600.00', '+2.1%']
      ];
      
      doc.autoTable({
        startY: sectoralY + 5,
        head: [['Sector', 'Value', 'Change']],
        body: sectoralData,
        theme: 'striped',
        headStyles: { fillColor: [13, 110, 253] },
        margin: { left: 15, right: 15 }
      });
      
      // Add quick summary box
      const summaryY = doc.lastAutoTable.finalY + 10;
      
      doc.setFillColor(245, 245, 245);
      doc.rect(15, summaryY, 180, 30, 'F');
      
      doc.setFontSize(14);
      doc.setTextColor(33, 37, 41);
      doc.text('Indian Market Quick Summary', 25, summaryY + 10);
      
      const quickSummary = getIndianMarketSummary(article);
      const splitSummary = doc.splitTextToSize(quickSummary, 160);
      doc.setFontSize(10);
      doc.text(splitSummary, 25, summaryY + 20);
      
      // Add disclaimer after the summary box
      addDisclaimer(doc, summaryY + 40);
    }
  } else {
    // If no space for visualization, just add the quick summary
    const summaryY = visualizationY;
    
    if (summaryY < doc.internal.pageSize.getHeight() - 50) {
      doc.setFillColor(245, 245, 245);
      doc.rect(15, summaryY, 180, 30, 'F');
      
      doc.setFontSize(14);
      doc.setTextColor(33, 37, 41);
      doc.text('Indian Market Quick Summary', 25, summaryY + 10);
      
      const quickSummary = getIndianMarketSummary(article);
      const splitSummary = doc.splitTextToSize(quickSummary, 160);
      doc.setFontSize(10);
      doc.text(splitSummary, 25, summaryY + 20);
    }
    
    // Add disclaimer
    addDisclaimer(doc, summaryY + 40);
  }
  
  // Add footer with proper arguments
  addFooter(doc, 'Indian Financial Market Analyzer');
  
  // Save the PDF
  const fileName = article.title.slice(0, 20).replace(/[^a-z0-9]/gi, '_').toLowerCase();
  doc.save(`Indian_Market_Analysis_${fileName}_${formatDate(new Date(), 'YYYYMMDD')}.pdf`);
};

// Helper function to generate an India-specific market summary from article data
const getIndianMarketSummary = (article: NewsArticle): string => {
  const sentimentDesc = 
    article.sentiment === 'positive' ? 'bullish' : 
    article.sentiment === 'negative' ? 'bearish' : 'neutral';
  
  let summary = `The Indian markets are showing a ${sentimentDesc} trend according to this ${article.source} analysis. `;
  
  // Include the first couple of key points
  if (article.keyPoints.length > 0) {
    const points = article.keyPoints.slice(0, 2);
    summary += points.join(' while ').toLowerCase();
    summary += '.';
  } else {
    summary += 'Major indices like Nifty and Sensex are showing mixed signals.';
  }
  
  // Include key metrics if available
  if (article.metrics.length > 0) {
    const positiveMetrics = article.metrics.filter(m => m.status === 'positive');
    const negativeMetrics = article.metrics.filter(m => m.status === 'negative');
    
    if (positiveMetrics.length > 0) {
      summary += ` Bullish indicators include ${positiveMetrics[0].name}.`;
    }
    
    if (negativeMetrics.length > 0) {
      summary += ` Concerns exist around ${negativeMetrics[0].name}.`;
    }
  }
  
  // Add a standard closing note about Indian market context
  summary += ' Investors should consider both global factors and domestic policies when making investment decisions in the Indian market.';
  
  return summary;
};
