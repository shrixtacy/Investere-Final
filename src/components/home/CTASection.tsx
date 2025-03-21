
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const CTASection = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <section className="py-24 px-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-blue-gradient opacity-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-finance-blue/20 via-transparent to-transparent" />
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[30rem] h-[30rem] rounded-full bg-finance-teal opacity-10 blur-3xl" />
          
          <div className="relative px-6 py-16 md:px-12 md:py-24 text-center">
            <div className="animate-slide-up">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 max-w-3xl mx-auto leading-tight">
                Transform Your Financial Analysis with AI-Powered Insights
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                Join thousands of investors and financial professionals who use our platform to make data-driven decisions.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up animate-delay-100">
              {isAuthenticated ? (
                <Link 
                  to="/dashboard" 
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-finance-blue text-white hover:bg-blue-600 transition-colors font-medium"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link 
                    to="/sign-up" 
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-finance-blue text-white hover:bg-blue-600 transition-colors font-medium"
                  >
                    Get Started
                  </Link>
                  <Link 
                    to="/sign-in" 
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors font-medium"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
            
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto animate-slide-up animate-delay-200">
              {[
                { label: 'Financial Data Sources', value: '500+' },
                { label: 'Model Accuracy', value: '93.7%' },
                { label: 'Daily Predictions', value: '10K+' },
                { label: 'Active Users', value: '25K+' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-finance-blue mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
