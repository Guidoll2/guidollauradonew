/**
 * ARCHIVO DE EJEMPLO: Cómo integrar PricingSection en tu proyecto
 * 
 * Este archivo muestra ejemplos de uso del componente PricingSection
 * en diferentes contextos y configuraciones.
 */

// ============================================
// EJEMPLO 1: Uso Básico en una Página
// ============================================

import PricingSection from '@/components/PricingSection';

export default function ServicesPage() {
  return (
    <main>
      <header>
        <h1>Nuestros Servicios</h1>
      </header>
      
      {/* Componente PricingSection - Usa todas las traducciones automáticamente */}
      <PricingSection />
      
      <footer>
        <p>© 2025 Guidodev</p>
      </footer>
    </main>
  );
}

// ============================================
// EJEMPLO 2: En el Layout Principal (Layout.tsx)
// ============================================

'use client';

import { LanguageProvider } from '@/lib/language-context';
import PricingSection from '@/components/PricingSection';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <LanguageProvider>
          <Header />
          {children}
          <PricingSection /> {/* Mostrar en todas las páginas */}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

// ============================================
// EJEMPLO 3: Uso Avanzado con PricingCard
// ============================================

'use client';

import { useLanguage } from '@/lib/language-context';
import { PricingCard } from '@/components/PricingCard';

export function AdvancedPricingPage() {
  const { t } = useLanguage();

  const packages = [
    {
      id: 'landing',
      title: t.initialPackageTitle || 'Paquete Inicial: Landing Page',
      description: t.initialPackageDescription || 'Una Landing Page profesional...',
      price: '750€',
      customizationText: t.personalCustomization || 'Personalizable',
      buttonText: t.startMyProject || 'Empezar',
      features: [
        t.feature1 || 'Diseño personalizado',
        t.feature2 || 'Desarrollo moderno',
        t.feature3 || 'Hosting incluido',
      ],
      isRecommended: true,
    },
    {
      id: 'professional',
      title: 'Sitio Web Profesional',
      description: 'Sitio completo con múltiples páginas y funcionalidades',
      price: '1,500€',
      customizationText: 'Escalable según necesidades',
      buttonText: 'Solicitar Cotización',
      features: [
        'Múltiples páginas',
        'CMS integrado',
        'Blog',
        'Galería de proyectos',
        'Formularios avanzados',
      ],
      isRecommended: false,
    },
    {
      id: 'ecommerce',
      title: 'Tienda Online Completa',
      description: 'Plataforma e-commerce con gestión de inventario',
      price: 'Desde 2,500€',
      customizationText: 'Según funcionalidades',
      buttonText: 'Hablar con Experto',
      features: [
        'Catálogo de productos',
        'Pasarela de pagos',
        'Gestión de órdenes',
        'Panel de control',
        'Integración API',
      ],
      isRecommended: false,
    },
  ];

  return (
    <section className="w-full py-20 px-4 md:px-8 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">Todos Nuestros Planes</h2>
          <p className="text-xl text-gray-300">
            Encuentra la solución perfecta para tu negocio
          </p>
        </div>

        {/* Grilla de Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <PricingCard
              key={pkg.id}
              title={pkg.title}
              description={pkg.description}
              price={pkg.price}
              customizationText={pkg.customizationText}
              buttonText={pkg.buttonText}
              features={pkg.features}
              includesLabel={t.includesLabel || 'Incluye:'}
              noCommitmentText={t.noCommitment || '💳 Sin compromiso'}
              isRecommended={pkg.isRecommended}
              badgeText={pkg.isRecommended ? 'RECOMENDADO' : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// EJEMPLO 4: Composición con Otros Componentes
// ============================================

'use client';

import PricingSection from '@/components/PricingSection';
import { ProjectCarousel } from '@/components/ProjectCarousel';
import AboutMe from '@/components/AboutMe';

export default function FullMarketingPage() {
  return (
    <main className="bg-slate-950">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-4">Desarrollo Web Premium</h1>
          <p className="text-2xl text-gray-300 mb-8">
            Soluciones digitales para tu negocio
          </p>
          <button className="bg-gradient-to-r from-[#ffbba8] to-[#67e2f0] text-slate-900 font-bold px-8 py-3 rounded-lg hover:scale-105 transition">
            Conocer Más
          </button>
        </div>
      </section>

      {/* Sección de Precios */}
      <PricingSection />

      {/* Carrusel de Proyectos */}
      <ProjectCarousel />

      {/* About Me */}
      <AboutMe />
    </main>
  );
}

// ============================================
// EJEMPLO 5: Personalización de Traducciones
// ============================================

/**
 * Si necesitas agregar más traducciones, actualiza los archivos JSON:
 * 
 * /public/locales/es.json
 * /public/locales/en.json
 * /public/locales/ca.json
 * 
 * Ejemplo estructura:
 * {
 *   "customKey": "Valor en español",
 *   "anotherKey": "Otro valor"
 * }
 */

// ============================================
// EJEMPLO 6: Estilos Personalizados
// ============================================

/**
 * Para cambiar los colores de marca, busca y reemplaza:
 * 
 * Salmón (Rosa): #ffbba8
 * Celeste (Azul): #67e2f0
 * 
 * En los archivos:
 * - components/PricingCard.tsx
 * - components/PricingSection.tsx
 * 
 * O crea variables CSS en globals.css:
 */

export const CustomCSSExample = `
:root {
  --color-salmon: #ffbba8;
  --color-cyan: #67e2f0;
}

.pricing-gradient {
  background: linear-gradient(to right, var(--color-salmon), var(--color-cyan));
}
`;

// ============================================
// EJEMPLO 7: Testing del Componente
// ============================================

/**
 * Ejemplo de test unitario (usando Jest + React Testing Library)
 */

// import { render, screen } from '@testing-library/react';
// import { LanguageProvider } from '@/lib/language-context';
// import PricingSection from '@/components/PricingSection';
//
// describe('PricingSection', () => {
//   it('renders pricing section with title', () => {
//     render(
//       <LanguageProvider>
//         <PricingSection />
//       </LanguageProvider>
//     );
//
//     expect(screen.getByText(/Elige la Solución Web/i)).toBeInTheDocument();
//   });
//
//   it('displays pricing card with price', () => {
//     render(
//       <LanguageProvider>
//         <PricingSection />
//       </LanguageProvider>
//     );
//
//     expect(screen.getByText(/750€/)).toBeInTheDocument();
//   });
// });

// ============================================
// NOTAS FINALES
// ============================================

/**
 * 1. MULTIIDIOMA:
 *    - El componente detecta automáticamente el idioma del usuario
 *    - Fallback a español si no hay traducción disponible
 * 
 * 2. RESPONSIVO:
 *    - Mobile: Pila de tarjetas
 *    - Tablet: 2 columnas
 *    - Desktop: 3 columnas (para múltiples planes)
 * 
 * 3. ACCESIBILIDAD:
 *    - Contraste de colores accesible
 *    - Estructura semántica de HTML
 *    - Botones con estados hover/focus
 * 
 * 4. PERFORMANCE:
 *    - Componentes optimizados para SSR
 *    - Lazy loading de imágenes (si las hay)
 *    - CSS optimizado con Tailwind
 * 
 * 5. SEO:
 *    - Estructura H2/H3 correcta
 *    - Meta descripciones en traducción
 *    - Semantic HTML
 */
