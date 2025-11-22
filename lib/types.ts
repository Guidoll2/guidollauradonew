// TypeScript interfaces for the portfolio

export interface Project {
  _id: string;
  title: {
    es: string;
    ca: string;
    en: string;
  };
  description: {
    es: string;
    ca: string;
    en: string;
  };
  image: string;
  technologies: string[];
  liveUrl?: string;
  featured: boolean;
  order: number;
  createdAt: Date;
}

export interface Client {
  _id: string;
  name: string;
  logo: string;
  website?: string;
  featured: boolean;
  order: number;
}

export interface Testimonial {
  _id: string;
  clientName: string;
  clientCompany: string;
  content: {
    es: string;
    ca: string;
    en: string;
  };
  rating: number;
  featured: boolean;
  createdAt: Date;
}

export type Language = 'es' | 'ca' | 'en';

export interface Translation {
  // Header
  contact: string;
  
  // Hero section
  heroTitle: string;
  heroSubtitle: string;
  heroWelcome: string;
  heroEyebrow: string;
  heroClear: string;
  heroFast: string;
  heroReady: string;
  heroDescription: string;
  
  // Services
  servicesTitle: string;
  service1: string;
  service2: string;
  service3: string;
  service4: string;
  service5: string;
  
  // Services Shop
  servicesShopTitle: string;
  landingPageTitle: string;
  landingPagePrice: string;
  landingPageIncludes: string;
  addToCart: string;
  landingPageDescription: string;
  completedProjects: string;
  includesLabel: string;
  priceFrom: string;
  personalCustomization: string;
  noCommitment: string;
  questions: string;
  contactWhatsApp: string;
  consultationText: string;
  moreServices: string;
  visitSite: string;
  
  // Features list
  feature1: string;
  feature2: string;
  feature3: string;
  feature4: string;
  feature5: string;
  feature6: string;
  feature7: string;
  feature8: string;
  
  // Notifications
  addedToCart: string;
  
  // Navigation titles
  prevImage: string;
  nextImage: string;
  cartTitle: string;
  projectsTitle: string;
  viewProject: string;
  clientsTitle: string;
  
  // Professional Websites
  professionalWebTitle: string;
  professionalWebDescription: string;
  multiPageSupport: string;
  serviceDetails: string;
  videoRendering: string;
  advancedFeatures: string;
  professionalDesign: string;
  contentManagement: string;
  analyticsIntegration: string;
  seoOptimization: string;
  professionalWebPrice: string;
  
  // Web Applications
  webAppTitle: string;
  webAppDescription: string;
  webAppFeature1: string;
  webAppFeature2: string;
  webAppFeature3: string;
  webAppFeature4: string;
  webAppFeature5: string;
  webAppFeature6: string;
  webAppFeature7: string;
  webAppFeature8: string;
  webAppPrice: string;
  webAppPriceSubtitle: string;
  webAppQuestion: string;
  webAppConsultation: string;
  
  // About Me
  aboutTitle: string;
  aboutIntro: string;
  aboutTechnologies: string;
  aboutClosure: string;
  
  // Footer
  footerContact: string;
  footerEmail: string;
  footerPhone: string;
  footerSocial: string;
}