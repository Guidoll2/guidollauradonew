import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PricingSection from '@/components/PricingSection';
import AboutMe from '@/components/AboutMe';
import Footer from '@/components/Footer';
import AuthoritySection from '@/components/AuthoritySection';
import ProjectsSection from '@/components/ProjectsSection';
import ShowcaseSection from '@/components/ShowcaseSection';
import FloatingAssistant from '@/components/FloatingAssistant';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <PricingSection />
      <AuthoritySection />
      <ShowcaseSection />
      <AboutMe />
      <Footer />
      <FloatingAssistant />
    </main>
  );
}
