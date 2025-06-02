// data/services.ts
export type Service = {
  id: string;
  name: string;
  description: string;
  priceUSD: number; // Precio en USD
  priceARS: number; // Precio en ARS
  features: string[];
  image: string; // URL de la imagen generada con IA
};

export const services: Service[] = [
  {
    id: 'web-design-basic',
    name: 'Diseño Web Básico',
    description: 'Página web responsive con UX/UI impecable, ideal para emprendedores.',
    priceUSD: 500,
    priceARS: 450000, // Ejemplo, actualiza a valores reales
    features: ['1 página', 'Diseño responsive', 'SEO básico'],
    image: '/images/web-design-basic.png',
  },
  {
    id: 'custom-calendar',
    name: 'Desarrollo de Calendario Personalizado',
    description: 'Integración de un calendario dinámico y personalizable para tu plataforma.',
    priceUSD: 800,
    priceARS: 720000, // Ejemplo
    features: ['Integración API', 'Gestión de eventos', 'Alertas'],
    image: '/images/custom-calendar.png',
  },
  // Agrega más servicios
];