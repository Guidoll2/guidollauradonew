'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/language-context';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useCart } from '@/lib/cart-context';

export default function ServicesShop() {
  const { t } = useLanguage();
  const { addItem } = useCart();
  useScrollAnimation();
  const [showNotification, setShowNotification] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    { src: '/cmm.jpeg', url: 'https://www.alarmascmm.com' },
    { src: '/pidosoporte.jpeg', url: 'https://www.pidosoporte.com' },
    { src: '/bscustoms.jpeg', url: 'https://www.bscustoms.com.ar' }
  ];

  const handleAddToCart = () => {
    addItem({
      id: 'landing-page',
      name: t.landingPageTitle || 'Landing Page Profesional',
      price: '250€',
      priceNumber: 250,
      quantity: 1,
      source: 'landing'
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

  return (
    // CAMBIO: Fondo Slate-50 para continuidad con el Hero
    <section id="services" className="py-24 bg-slate-50 relative overflow-hidden">
      
      {/* Decorative elements (Subtle blobs like Hero) */}
      <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-cyan-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header de la sección (Más limpio) */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            {t.chooseIdealPlan || 'Elige tu Plan Ideal'}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t.landingPageIntro || 'Comienza con una landing page diseñada para convertir. Simple, rápida y escalable.'}
          </p>
        </div>

        {/* --- PRODUCT CARD (Estilo E-commerce) --- */}
        <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] overflow-hidden border border-slate-100 animate-slide-in-scale">
          <div className="grid md:grid-cols-2 gap-0">
            
            {/* COLUMNA IZQUIERDA: Galería de Imágenes */}
            <div className="relative h-[400px] md:h-auto bg-slate-100 group overflow-hidden">
                {/* Badge "Best Seller" */}
                <div className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-slate-800 shadow-sm border border-slate-200">
                  {t.completedProjects || 'Proyectos Realizados'}
                </div>

                <Image
                  src={images[currentImageIndex].src}
                  alt="Project Preview"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay oscuro sutil en hover */}
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-300" />

                {/* Controles de navegación (Estilo minimalista) */}
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={handlePrevImage} className="p-3 rounded-full bg-white/90 text-slate-800 shadow-lg hover:scale-110 transition-transform">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button onClick={handleNextImage} className="p-3 rounded-full bg-white/90 text-slate-800 shadow-lg hover:scale-110 transition-transform">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>

                {/* Link externo flotante */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                     <a href={images[currentImageIndex].url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-full text-sm font-medium shadow-xl hover:bg-slate-800">
                        <span>Ver Demo en Vivo</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                     </a>
                </div>
            </div>

            {/* COLUMNA DERECHA: Detalles de Venta */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              
              <div className="mb-2 text-rose-500 font-bold text-sm tracking-wider uppercase">{t.initialPackage || 'Paquete Inicial'}</div>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.landingPageTitle || 'Landing Page Pro'}</h3>
              <p className="text-slate-500 mb-8 leading-relaxed">
                {t.landingPageDescription || 'Diseño de alto impacto optimizado para conversiones. La solución perfecta para validar tu idea de negocio o presentar tu portafolio.'}
              </p>

              {/* Precio */}
              <div className="flex items-end gap-2 mb-8">
                 <span className="text-5xl font-bold text-slate-900">250€</span>
                 <span className="text-slate-400 mb-2 font-medium line-through">350€</span>
                 <span className="mb-2 px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-md">Oferta</span>
              </div>

              {/* Lista de Features (Estilo Check) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 mb-8">
                {[
                  t.feature1 || 'Diseño Responsivo',
                  t.feature2 || 'Dominio Incluido',
                  t.feature3 || 'Hosting Gratis 1 año',
                  t.feature4 || 'Formulario de Contacto',
                  t.feature5 || 'Integración WhatsApp',
                  t.feature6 || 'Optimización SEO Básica'
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    {feature}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-4 px-6 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:bg-slate-800 hover:shadow-slate-900/20 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    <span>{t.addToCart || 'Agregar al Carrito'}</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                  </button>
                  
                  <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    {t.noCommitment || 'Pago seguro tras finalizar el proyecto'}
                  </p>
              </div>

            </div>
          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-12 text-center">
            <a href="https://wa.me/34675497068?text=Hola%20Guidoll,%20tengo%20una%20pregunta%20sobre%20desarrollo%20web" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium">
                {t.doubtsBeforeBuying || '¿Tienes dudas antes de comprar?'} <span className="underline decoration-slate-300 underline-offset-4">{t.talkWhatsApp || 'Hablemos por WhatsApp'}</span>
            </a>
        </div>

      </div>

      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed bottom-8 right-8 bg-slate-900 text-white px-6 py-4 rounded-xl shadow-2xl animate-fade-in-up z-50 flex items-center gap-3">
          <div className="bg-green-500 rounded-full p-1">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
          <div>
              <p className="font-bold text-sm">{t.addedToCart || '¡Producto añadido!'}</p>
              <p className="text-xs text-slate-400">{t.cartTitle || 'Revisa tu carrito para finalizar.'}</p>
          </div>
        </div>
      )}
    </section>
  );
}