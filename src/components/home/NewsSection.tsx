
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchFinanceNews, NewsArticle } from '@/utils/api/newsService';

const NewsSection = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNews = async () => {
      try {
        const newsArticles = await fetchFinanceNews();
        setNews(newsArticles.slice(0, 3)); // Only take the first 3 articles for the homepage
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };
    
    getNews();
  }, []);

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
    <section className="py-16 px-4 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">Latest Financial News</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Stay informed with the latest market news and AI-powered sentiment analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {loading 
            ? Array(3).fill(0).map((_, i) => (
                <Card key={i} className="animate-pulse h-64">
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ))
            : news.map((article, index) => (
                <Card key={index} className="border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">
                        <a 
                          href={article.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2"
                        >
                          {article.title}
                        </a>
                      </CardTitle>
                      {article.sentiment && (
                        <div className="flex-shrink-0 ml-2 mt-1">
                          {getSentimentIcon(article.sentiment)}
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {article.source} • {article.date}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3 mb-2">
                      {article.description}
                    </p>
                    {article.keyPoints && article.keyPoints.length > 0 && (
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                        <span className="font-medium">Key point:</span> {article.keyPoints[0]}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
          }
        </div>
        
        <div className="text-center">
          <Link 
            to="/news" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            View All Financial News
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
