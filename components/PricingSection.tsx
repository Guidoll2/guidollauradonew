'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/language-context';
import { useRegion } from '@/lib/region-context';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { PricingCard } from './PricingCard';
import { useTheme } from '@/lib/theme-context';
import ContactModal from './ContactModal';

export default function PricingSection() {
  const { t } = useLanguage();
  const { pricing } = useRegion();
  const { isLightMode } = useTheme();
  useScrollAnimation();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Características para Pack Presencia Express
  const expressFeatures = [
    t.expressFeature1 || 'Landing Page One-Page',
    t.expressFeature2 || 'Optimización para Google Maps',
    t.expressFeature3 || 'Botón de WhatsApp directo',
    t.expressFeature4 || 'Hosting bonificado (1er mes)',
    t.expressFeature5 || 'Diseño limpio y profesional',
    t.expressFeature6 || 'Responsive (móvil y desktop)',
    t.expressFeature7 || 'Entrega en 3-5 días',
  ];

  // Características para Landing Page
  const landingFeatures = [
    t.landingFeature1 || 'Diseño Estratégico y enfocado a un objetivo',
    t.landingFeature2 || 'Copywriting persuasivo',
    t.landingFeature3 || 'SEO On-page básico',
    t.landingFeature4 || 'Integración con CRM/Email Marketing',
    t.landingFeature5 || 'Alta velocidad de carga',
    t.landingFeature6 || 'Formulario de Captación de Leads',
    t.landingFeature7 || 'Botón de WhatsApp directo',
    t.landingFeature8 || 'Integración con Google Analytics',
  ];

  // Características para Web Profesional
  const professionalFeatures = [
    t.feature1 || 'Diseño Profesional Personalizado',
    t.feature2 || 'Multi-página (hasta 5)',
    t.feature3 || 'Blog/Noticias',
    t.feature4 || 'Diseño 100% personalizado',
    t.feature5 || 'Panel de gestión',
    t.feature6 || 'Optimización SEO avanzado',
    t.feature7 || 'Hosting de Alto Rendimiento (1 año)',
    t.feature8 || 'Galería de Proyectos y Testimonios',
    t.feature9 || 'Integración de Google Analytics / Search Console',
  ];

  // Definición de los 4 planes (De menor a mayor precio para crear escalón de entrada suave)
  const pricingPlans = [
    // Plan 1: Pack Presencia Express - Punto de entrada
    {
      title: t.expressPackageTitle || 'Pack Presencia Express',
      description: t.expressPackageDescription || 'La solución rápida para tener presencia hoy mismo. Ideal para negocios locales.',
      price: pricing?.priceLabels.express || '199€',
      customizationText: t.expressPackageSubtext || 'Diseño minimalista y profesional.',
      buttonText: t.startMyProject || 'Empezar mi Proyecto',
      features: expressFeatures,
      includesLabel: t.includesLabel || 'Incluye:',
      noCommitmentText: t.noCommitment || '💳 Sin compromiso • Cotización gratuita',
      isRecommended: false,
      badgeText: '',
    },
    // Plan 2: Landing Page de Alta Conversión - Actualizado
    {
      title: t.initialPackageTitle || 'Landing Page de Alta Conversión',
      description: t.initialPackageDescription || 'Diseño estratégico enfocado en vender un producto o servicio específico.',
      price: pricing?.priceLabels.landing || '550€',
      customizationText: t.initialPackageSubtext || 'Diseño estratégico y despliegue rápido.',
      buttonText: t.startMyProject || 'Empezar mi Proyecto',
      features: landingFeatures,
      includesLabel: t.includesLabel || 'Incluye:',
      noCommitmentText: t.noCommitment || '💳 Sin compromiso • Cotización gratuita',
      isRecommended: true,
      badgeText: t.mostPopular || 'El más Popular',
    },
    // Plan 3: Web Profesional - Ajustado
    {
      title: t.businessPackageTitle || 'Web Profesional de Autoridad',
      description: t.businessPackageDescription || 'El cimiento digital para profesionales y empresas que buscan escalar.',
      price: pricing?.priceLabels.professional || '1.200€',
      customizationText: t.businessPackageSubtext || 'Diseño, desarrollo y un año de Hosting incluidos.',
      buttonText: t.startMyProject || 'Empezar mi Proyecto',
      features: professionalFeatures,
      includesLabel: t.includesLabel || 'Incluye:',
      noCommitmentText: t.noCommitment || '💳 Sin compromiso • Cotización gratuita',
      isRecommended: false,
      badgeText: '',
    },
    // Plan 4: Premium - Desarrollo Integral
    {
      title: t.proPackageTitle || 'Desarrollo Integral / Software a Medida',
      description: t.proPackageDescription || 'Soluciones complejas y escalables para proyectos únicos.',
      price: pricing?.priceLabels.custom || 'Desde 2.500€',
      customizationText: t.personalCustomization || 'Proyectos personalizados según tus necesidades.',
      buttonText: t.startMyProject || 'Empezar mi Proyecto',
      features: [
        t.featureCustomDesign || 'Arquitectura y diseño profesional a medida',
        t.featureModernDev || 'Desarrollo web moderno y escalable',
        t.featureHosting || 'Hosting y dominio incluidos',
        t.featureDatabase || 'Integración con bases de datos y APIs',
        t.featureAdminPanel || 'Panel administrativo / Dashboard personalizado',
        t.featureAdvancedForms || 'Formularios y flujos avanzados de contacto',
        t.featureWhatsapp || 'Botones e integraciones con WhatsApp',
        t.featureSeo || 'Optimización SEO técnica y de rendimiento',
        t.featureBranding || 'Diseño de marca (logo, paleta y guía visual)',
        t.featureSocial || 'Enlaces a redes sociales',
        t.featureSupport || 'Soporte prioritario por 6 meses',
      ],
      includesLabel: t.includesLabel || 'Incluye:',
      noCommitmentText: t.noCommitment || '💳 Sin compromiso • Cotización gratuita',
      isRecommended: false,
      badgeText: t.premiumBadge || 'Premium',
    },
  ];

  return (
    <section className={`w-full py-20 px-4 md:px-8 scroll-animation transition-colors duration-500 ${
      isLightMode ? 'bg-slate-900' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Título Principal */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-500 ${
            isLightMode ? 'text-white' : 'text-slate-900'
          }`}>
            {t.pricingSectionTitle || 'Elige la Solución Web que Impulsará tu Negocio'}
          </h2>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto transition-colors duration-500 ${
            isLightMode ? 'text-gray-300' : 'text-slate-600'
          }`}>
            {t.pricingSectionSubtitle || 'Comienza con nuestros planes base, diseñados para convertir. Rápido, escalable y profesional.'}
          </p>
        </div>

        {/* Cuadrícula de Tarjetas de Precios - Ahora con 4 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={index}
              title={plan.title}
              description={plan.description}
              price={plan.price}
              customizationText={plan.customizationText}
              buttonText={plan.buttonText}
              features={plan.features}
              includesLabel={plan.includesLabel}
              noCommitmentText={plan.noCommitmentText}
              isRecommended={plan.isRecommended}
              badgeText={plan.badgeText}
              onButtonClick={() => setIsContactModalOpen(true)}
            />
          ))}
        </div>

        {/* Mensaje de Más Opciones */}
        <div className="text-center mt-12">
          <p className={`mb-4 transition-colors duration-500 ${
            isLightMode ? 'text-gray-400' : 'text-slate-500'
          }`}>
            {t.needMoreFeatures || '¿Necesitas más funcionalidades? Contáctame para un presupuesto personalizado'}
          </p>
          <a
            href="https://wa.me/34"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#67e2f0] hover:text-[#ffbba8] transition-colors duration-300 font-semibold"
          >
            {t.contactWhatsApp || 'Contáctame por WhatsApp'} →
          </a>
        </div>
      </div>
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </section>
  );
}
