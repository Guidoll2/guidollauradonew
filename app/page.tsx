import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ServicesShop from '@/components/ServicesShop';
import ProfessionalWebsites from '@/components/ProfessionalWebsites';
import WebApplications from '@/components/WebApplications';
import Services from '@/components/Services';
import AboutMe from '@/components/AboutMe';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ServicesShop />
      <ProfessionalWebsites />
      <WebApplications />
      <Services />
      <AboutMe />
      <Footer />
    </main>
  );
}
