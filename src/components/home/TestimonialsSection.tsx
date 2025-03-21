
const testimonials = [
  {
    quote: "The AI-powered predictions have completely transformed our investment strategy. We've seen a 27% increase in returns since implementing insights from this platform.",
    author: "Sarah Johnson",
    title: "Investment Director, Capital Ventures",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    quote: "The ability to extract structured financial data from blogs and news articles has given us a competitive edge in identifying market trends before they become obvious.",
    author: "Michael Chen",
    title: "Chief Data Officer, FinTech Innovations",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg"
  },
  {
    quote: "As a financial analyst, I rely on accurate data to make recommendations. This platform's AI-driven insights have improved my prediction accuracy by over 30%.",
    author: "Elena Rodriguez",
    title: "Senior Financial Analyst, Global Advisors",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 px-4 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by Financial Professionals
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Hear what industry leaders say about our AI-powered financial analysis platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="glass-card p-6 rounded-xl flex flex-col animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="mb-6">
                <svg width="45" height="36" className="text-gray-300 dark:text-gray-600" viewBox="0 0 45 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 18H9C9 12.6152 13.6152 8 19 8V12C15.6863 12 13 14.6863 13 18V18.5C13 19.3284 13.6716 20 14.5 20H18.5C19.3284 20 20 20.6716 20 21.5V30.5C20 31.3284 19.3284 32 18.5 32H14.5C13.6716 32 13 31.3284 13 30.5V18H13.5Z" fill="currentColor"/>
                  <path d="M31.5 18H27C27 12.6152 31.6152 8 37 8V12C33.6863 12 31 14.6863 31 18V18.5C31 19.3284 31.6716 20 32.5 20H36.5C37.3284 20 38 20.6716 38 21.5V30.5C38 31.3284 37.3284 32 36.5 32H32.5C31.6716 32 31 31.3284 31 30.5V18H31.5Z" fill="currentColor"/>
                </svg>
              </div>
              
              <div className="flex-grow">
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {testimonial.quote}
                </p>
              </div>
              
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author} 
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {testimonial.author}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 pt-8 text-center animate-slide-up animate-delay-500">
          <div className="inline-flex flex-wrap justify-center gap-x-6 gap-y-4">
            {['TechFinance', 'InvestGroup', 'Market Insights', 'Global Capital', 'Analytics Pro'].map((company, index) => (
              <div key={index} className="text-gray-400 dark:text-gray-500 font-medium text-lg">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
