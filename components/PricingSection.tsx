'use client';

import { useLanguage } from '@/lib/language-context';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { PricingCard } from './PricingCard';
import { useTheme } from '@/lib/theme-context';

export default function PricingSection() {
  const { t } = useLanguage();
  const { isLightMode } = useTheme();
  useScrollAnimation();

  // Características base para el plan inicial
  const baseFeatures = [
    t.feature1 || 'Diseño profesional personalizado',
    t.feature2 || 'Desarrollo web moderno',
    t.feature3 || 'Hosting incluido',
    t.feature4 || 'Dominio personalizado',
    t.feature5 || 'Enlaces a redes sociales',
    t.feature6 || 'Formularios de contacto',
    t.feature7 || 'Botones de WhatsApp',
    t.feature8 || 'Optimización SEO básica',
  ];

  // Definición de los 3 planes (Premium primero para efecto de anclaje)
  const pricingPlans = [
    // Plan 1: Premium / Ancla
    {
      title: t.proPackageTitle || 'Paquete Pro: Web a Medida',
      description: t.proPackageDescription || 'Desarrollo de aplicaciones online profesionales: Tiendas online completas, software empresarial, paneles administrativos, portales para profesionales (médicos, universitarios) y cualquier proyecto personalizado que necesites.',
      price: '3.200€',
      customizationText: t.personalCustomization || 'Personalizamos según tus necesidades',
      buttonText: t.startMyProject || 'Empezar mi Proyecto',
      features: [
        ...baseFeatures,
        t.featureDatabaseIntegration || 'Integración de Base de Datos',
        t.featureBrandDesign || 'Diseño de Marca (Logo y Paleta)',
        t.featurePrioritySupport || 'Soporte Prioritario 6 meses',
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
      price: '1.800€',
      customizationText: t.personalCustomization || 'Personalizamos según tus necesidades',
      buttonText: t.startMyProject || 'Empezar mi Proyecto',
      features: [
        ...baseFeatures,
        t.featureProductGallery || 'Galería de Productos',
        t.featureMultiplePages || 'Múltiples Páginas (5-7)',
        t.featureAdvancedSEO || 'SEO Avanzado',
      ],
      includesLabel: t.includesLabel || 'Incluye:',
      noCommitmentText: t.noCommitment || '💳 Sin compromiso • Cotización gratuita',
      isRecommended: false,
      badgeText: '',
    },
    // Plan 3: Inicial / Entrada
    {
      title: t.initialPackageTitle || 'Paquete Inicial: Landing Page',
      description: t.initialPackageDescription || 'Una Landing Page profesional optimizada para generar leads. Tu herramienta más poderosa para resultados rápidos.',
      price: '750€',
      customizationText: t.personalCustomization || 'Personalizamos según tus necesidades',
      buttonText: t.startMyProject || 'Empezar mi Proyecto',
      features: baseFeatures,
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
            />
          ))}
        </div>

        {/* Mensaje de Más Opciones */}
        <div className="text-center mt-12">
          <p className={`mb-4 transition-colors duration-500 ${
            isLightMode ? 'text-gray-400' : 'text-slate-500'
          }`}>
            {t.needMoreFeatures || '¿Necesitas más funcionalidades? Contáctanos para un presupuesto personalizado'}
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
    </section>
  );
}
