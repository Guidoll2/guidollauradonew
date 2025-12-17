'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/language-context';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { PricingCard } from './PricingCard';
import { useTheme } from '@/lib/theme-context';
import ContactModal from './ContactModal';

export default function PricingSection() {
  const { t } = useLanguage();
  const { isLightMode } = useTheme();
  useScrollAnimation();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Características para Web Profesional
  const professionalFeatures = [
    t.feature1 || 'Diseño Profesional Personalizado',
    t.feature2 || 'Desarrollo Web Moderno',
    t.feature3 || 'Integración Avanzada con Contactos',
    t.feature4 || 'Optimización SEO y Análisis de Palabras Clave',
    t.feature5 || 'Sitio Multi-Página',
    t.feature6 || 'Hosting de Alto Rendimiento (1 año)',
    t.feature7 || 'Galería de Proyectos y Testimonios',
    t.feature8 || 'Integración de Google Analytics / Search Console',
    t.feature9 || 'Integración de PIXEL (Meta y TikTok)',
  ];

  // Características para Landing Page
  const landingFeatures = [
    t.landingFeature1 || 'Diseño Estratégico y enfocado a un objetivo',
    t.landingFeature2 || 'Optimización 100% para Publicidad',
    t.landingFeature3 || 'Velocidad de Carga Garantizada',
    t.landingFeature4 || 'Desarrollo Moderno y 100% Responsivo',
    t.landingFeature5 || 'Formulario de Captación de Leads Integrado',
    t.landingFeature6 || 'Botón de WhatsApp directo',
    t.landingFeature7 || 'Integración con Google Analytics',
    t.landingFeature8 || 'Soporte Técnico por 1 mes',
  ];

  // Definición de los 3 planes (Premium primero para efecto de anclaje)
  const pricingPlans = [
    // Plan 1: Premium / Ancla
    {
      title: t.proPackageTitle || 'Paquete Pro: Desarrollo a Medida',
      description: t.proPackageDescription || 'Soluciones digitales avanzadas para empresas, profesionales y e-commerce.',
      price: t.proPackagePrice || '3.200 €',
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
      isRecommended: true,
      badgeText: t.mostPopular || 'El más Popular',
    },
    // Plan 2: Intermedio
    {
      title: t.businessPackageTitle || 'Paquete Negocio: Web Corporativa',
      description: t.businessPackageDescription || 'Web corporativa multi-página con galería y SEO avanzado. Ideal para negocios en crecimiento.',
      price: t.businessPackagePrice || '1.800€',
      customizationText: t.businessPackageSubtext || 'Diseño, desarrollo y un año de Hosting incluidos.',
      buttonText: t.startMyProject || 'Empezar mi Proyecto',
      features: professionalFeatures,
      includesLabel: t.includesLabel || 'Incluye:',
      noCommitmentText: t.noCommitment || '💳 Sin compromiso • Cotización gratuita',
      isRecommended: false,
      badgeText: '',
    },
    // Plan 3: Inicial / Entrada
    {
      title: t.initialPackageTitle || 'Paquete Inicial: Landing Page',
      description: t.initialPackageDescription || 'Una Landing Page profesional optimizada para generar leads. Tu herramienta más poderosa para resultados rápidos.',
      price: t.initialPackagePrice || '750€',
      customizationText: t.initialPackageSubtext || 'Diseño estratégico y despliegue rápido.',
      buttonText: t.startMyProject || 'Empezar mi Proyecto',
      features: landingFeatures,
      includesLabel: t.includesLabel || 'Incluye:',
      noCommitmentText: t.noCommitment || '💳 Sin compromiso • Cotización gratuita',
      isRecommended: false,
      badgeText: '',
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

        {/* Cuadrícula de Tarjetas de Precios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
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
