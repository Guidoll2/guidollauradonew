import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PricingSection from '@/components/PricingSection';
import Services from '@/components/Services';
import AboutMe from '@/components/AboutMe';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <PricingSection />
      <Services />
      <AboutMe />
      <Footer />
    </main>
  );
}
