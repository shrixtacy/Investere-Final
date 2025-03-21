
import { useEffect, useState } from 'react';
import { ExternalLink, Zap, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchFinanceNews, NewsArticle } from '@/utils/api/newsService';

const News = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Investere - Financial News";
    
    const getNews = async () => {
      setLoading(true);
      try {
        const newsArticles = await fetchFinanceNews();
        setNews(newsArticles);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };
    
    getNews();
  }, []);

  // Helper to get sentiment color
  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-500';
      case 'negative':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  // Helper to get sentiment icon
  const getSentimentIcon = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'negative':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <MainLayout>
      <div className="pt-28 pb-16 px-4 min-h-screen">
        <div className="container mx-auto">
          <div className="mb-8 animate-fade-up">
            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Financial News</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
              Latest business and financial news with AI-powered sentiment analysis and key metrics.
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All News</TabsTrigger>
              <TabsTrigger value="positive">Positive Sentiment</TabsTrigger>
              <TabsTrigger value="negative">Negative Sentiment</TabsTrigger>
              <TabsTrigger value="neutral">Neutral Sentiment</TabsTrigger>
            </TabsList>

            {['all', 'positive', 'negative', 'neutral'].map((tab) => (
              <TabsContent key={tab} value={tab} className="space-y-6">
                {loading ? (
                  // Loading skeletons
                  Array(3).fill(0).map((_, i) => (
                    <Card key={i} className="overflow-hidden animate-pulse">
                      <CardHeader>
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/3" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-2/3" />
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  // Filter articles based on selected tab
                  news
                    .filter(article => 
                      tab === 'all' || 
                      (article.sentiment && article.sentiment.toLowerCase() === tab)
                    )
                    .map((article, index) => (
                      <Card key={index} className="overflow-hidden border-gray-200 dark:border-gray-800 hover:shadow-md transition-all duration-300">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-xl font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                                  {article.title}
                                  <ExternalLink className="h-4 w-4 inline ml-1" />
                                </a>
                              </CardTitle>
                              <CardDescription className="mt-1 flex items-center gap-2">
                                <span>{article.source}</span>
                                <span>•</span>
                                <span>{article.date}</span>
                                {article.sentiment && (
                                  <>
                                    <span>•</span>
                                    <span className={`flex items-center gap-1 ${getSentimentColor(article.sentiment)}`}>
                                      {getSentimentIcon(article.sentiment)}
                                      {article.sentiment.charAt(0).toUpperCase() + article.sentiment.slice(1)}
                                    </span>
                                  </>
                                )}
                              </CardDescription>
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-full">
                              <Zap className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent>
                          <p className="text-gray-700 dark:text-gray-300 mb-4">{article.description}</p>
                          
                          {article.keyPoints && article.keyPoints.length > 0 && (
                            <div className="mb-4">
                              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Key Points</h4>
                              <ul className="space-y-1">
                                {article.keyPoints.map((point, i) => (
                                  <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500 inline-block"></span>
                                    {point}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {article.metrics && article.metrics.length > 0 && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Metrics</h4>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {article.metrics.map((metric, i) => (
                                  <div key={i} className="bg-gray-50 dark:bg-gray-800 p-2 rounded-lg">
                                    <div className="text-xs text-gray-500 dark:text-gray-400">{metric.name}</div>
                                    <div className={`text-sm font-medium ${
                                      metric.status === 'positive' ? 'text-green-600 dark:text-green-400' :
                                      metric.status === 'negative' ? 'text-red-600 dark:text-red-400' :
                                      'text-gray-900 dark:text-gray-100'
                                    }`}>
                                      {metric.value}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                        
                        <CardFooter className="border-t border-gray-100 dark:border-gray-800">
                          <a 
                            href={article.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                          >
                            Read full article <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        </CardFooter>
                      </Card>
                    ))
                )}

                {!loading && news.filter(a => tab === 'all' || (a.sentiment && a.sentiment.toLowerCase() === tab)).length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-gray-500 dark:text-gray-400">No {tab !== 'all' ? tab : ''} news articles found.</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default News;
