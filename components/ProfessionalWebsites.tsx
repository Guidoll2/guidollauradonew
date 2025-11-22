'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/language-context';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useCart } from '@/lib/cart-context';

export default function ProfessionalWebsites() {
  const { t } = useLanguage();
  const { addItem } = useCart();
  useScrollAnimation();
  const [showNotification, setShowNotification] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    { src: '/eventosenbarcelona.jpeg', url: 'https://www.eventosenbarcelona.com/' },
    { src: '/fontaneria.jpeg', url: 'https://www.fontaneriaipiscinas.com/' },
    { src: '/laugh.jpeg', url: 'https://laureanogh.vercel.app/' }
  ];

  const handleAddToCart = () => {
    addItem({
      id: 'professional-web',
      name: t.professionalWebTitle || 'Web Profesional Completa',
      price: '500€',
      priceNumber: 500,
      quantity: 1,
      source: 'professional'
    });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev + 1) % images.length);
  };

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    servicesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    // CAMBIO: Fondo blanco para contrastar con la sección anterior (que era slate-50)
    // Esto crea un ritmo visual agradable entre secciones.
    <section className="py-24 bg-white relative overflow-hidden">
      
      {/* Decorative elements (Tonos Azules/Violetas para "Profesional") */}
      <div className="absolute top-20 left-0 w-[600px] h-[600px] bg-indigo-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            {t.professionalWebTitle || 'Webs Corporativas'}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t.professionalWebDescription || 'La herramienta definitiva para empresas que buscan destacar. Múltiples páginas, integraciones avanzadas y diseño a medida.'}
          </p>
        </div>

        {/* --- PRODUCT CARD (Estilo Split Premium) --- */}
        <div className="bg-slate-50 rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] overflow-hidden border border-slate-200 animate-slide-in-scale">
          <div className="grid md:grid-cols-2 gap-0">
            
            {/* COLUMNA IZQUIERDA: Galería */}
            {/* Nota: Usamos 'order-last md:order-first' si quisieras alternar imagen izq/der en cada sección, 
                pero para e-commerce, mantener la imagen a la izquierda es estándar. */}
            <div className="relative h-[450px] md:h-auto bg-slate-200 group overflow-hidden">
                
                {/* Badge "Premium" */}
                <div className="absolute top-6 left-6 z-20 bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-lg border border-slate-700">
                  Recomendado
                </div>

                <Image
                  src={images[currentImageIndex].src}
                  alt="Professional Web Preview"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/10 transition-colors duration-300" />

                {/* Navigation Controls */}
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={handlePrevImage} className="p-3 rounded-full bg-white/90 text-slate-800 shadow-lg hover:scale-110 transition-transform">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button onClick={handleNextImage} className="p-3 rounded-full bg-white/90 text-slate-800 shadow-lg hover:scale-110 transition-transform">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>

                {/* Link externo */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                     <a href={images[currentImageIndex].url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 rounded-full text-sm font-bold shadow-xl hover:bg-slate-100">
                        <span>Explorar Sitio</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                     </a>
                </div>
            </div>

            {/* COLUMNA DERECHA: Info de Venta */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              
              <div className="mb-2 text-indigo-600 font-bold text-sm tracking-wider uppercase">{t.businessSolution || 'Solución Empresarial'}</div>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.completeWebsite || 'Sitio Web Completo'}</h3>
              <p className="text-slate-500 mb-8 leading-relaxed">
                {t.businessSolutionDescription || 'Ideal para marcas establecidas, catálogos de servicios o empresas que requieren una arquitectura de información robusta y escalable.'}
              </p>

              {/* Pricing Block */}
              <div className="flex items-end gap-3 mb-8 p-4 bg-white rounded-xl border border-slate-100 shadow-sm w-fit">
                 <div>
                    <p className="text-xs text-slate-400 mb-1">{t.oneTimePaymentFrom || 'Pago único desde'}</p>
                    <span className="text-5xl font-bold text-slate-900">500€</span>
                 </div>
                 <div className="pb-2">
                    <span className="text-slate-400 font-medium line-through block text-sm">750€</span>
                 </div>
              </div>

              {/* Features Grid (Iconos Azules/Indigo) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 mb-8">
                {[
                  t.multiPageSupport || 'Múltiples Páginas',
                  t.serviceDetails || 'Detalle de Servicios',
                  t.videoRendering || 'Optimización de Video',
                  t.advancedFeatures || 'Animaciones Avanzadas',
                  t.contentManagement || 'Gestor de Contenidos',
                  t.seoOptimization || 'SEO Técnico Avanzado',
                  t.analyticsIntegration || 'Google Analytics 4',
                  'Soporte Prioritario'
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-slate-700 text-sm font-medium group/item">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-colors duration-300">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    {feature}
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="space-y-4">
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-4 px-6 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:bg-slate-800 hover:shadow-slate-900/20 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    <span>{t.hireProfessionalPack || 'Contratar Pack Profesional'}</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                  </button>
                  
                  <p className="text-center text-xs text-slate-400">
                    {t.noCommitment || 'Consulta gratuita inicial incluida en el proceso.'}
                  </p>
              </div>

            </div>
          </div>
        </div>

        {/* Botón "Ver más servicios" convertido a WhatsApp link */}
        <div className="mt-16 text-center">
             <a 
                href="https://wa.me/34675497068?text=Hola%20Guidoll,%20tengo%20una%20pregunta%20sobre%20desarrollo%20web"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-all duration-300 text-sm font-semibold"
              >
                <span>{t.compareAllServices || 'Comparar todos los servicios'}</span>
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </a>
        </div>
      </div>

      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed bottom-8 right-8 bg-slate-900 text-white px-6 py-4 rounded-xl shadow-2xl animate-fade-in-up z-50 flex items-center gap-3">
          <div className="bg-indigo-500 rounded-full p-1">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
          <div>
              <p className="font-bold text-sm">{t.addedToCart || '¡Producto añadido!'}</p>
              <p className="text-xs text-slate-400">{t.cartTitle || 'Finaliza tu solicitud en el carrito.'}</p>
          </div>
        </div>
      )}
    </section>
  );
}