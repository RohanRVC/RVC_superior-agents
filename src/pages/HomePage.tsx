import React from 'react';
import HeroSection from '../components/HeroSection';
import HowItWorksSection from '../components/HowItWorksSection';
import WhyChooseSection from '../components/WhyChooseSection';
import LiveTerminalSection from '../components/LiveTerminalSection';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HowItWorksSection />
      <WhyChooseSection />
      <LiveTerminalSection />
    </div>
  );
};

export default HomePage;