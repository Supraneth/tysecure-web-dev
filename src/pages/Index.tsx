import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection, ProblematiqueSection, ValuesSection, ProcessPreview, CTASection } from '@/components/sections/HomeSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ProblematiqueSection />
        <ValuesSection />
        <ProcessPreview />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
