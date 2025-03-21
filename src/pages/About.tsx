
import { useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "About - Investere";
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto py-24 px-4">
        <h1 className="text-4xl font-bold text-center mb-12">About Investere</h1>
        <div className="max-w-3xl mx-auto prose dark:prose-invert">
          <p>
            Investere is a cutting-edge AI-powered financial analytics platform designed to provide real-time insights and predictions for the Indian market. Our platform uses advanced machine learning algorithms to analyze patterns and trends in financial data, helping investors make informed decisions.
          </p>
          <p>
            Our mission is to democratize financial analytics and make advanced tools accessible to investors and startups across India. We believe that with the right insights, anyone can make smart investment decisions.
          </p>
          <h2>Our Technology</h2>
          <p>
            At Investere, we've developed proprietary AI models specifically trained on Indian market data. Our algorithms analyze thousands of data points across multiple sectors to identify trends, predict market movements, and highlight investment opportunities.
          </p>
          <h2>Who We Serve</h2>
          <p>
            We provide tailored solutions for both investors looking for high-quality market insights and startups seeking to understand their market position and attract investment. Our platform bridges the gap between these two communities, creating value for the entire financial ecosystem.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
