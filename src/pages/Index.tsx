
import { useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import InsightsSection from '@/components/home/InsightsSection';
import NewsSection from '@/components/home/NewsSection';
import CTASection from '@/components/home/CTASection';
import TestimonialsSection from '@/components/home/TestimonialsSection';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Investere - AI-Powered Indian Financial Analytics";
  }, []);

  return (
    <MainLayout>
      <HeroSection />
      <FeaturesSection />
      <InsightsSection />
      <NewsSection />
      <TestimonialsSection />
      <CTASection />
    </MainLayout>
  );
};

export default Index;
