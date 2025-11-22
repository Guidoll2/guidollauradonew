'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/language-context';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useCart } from '@/lib/cart-context';

export default function WebApplications() {
  const { t } = useLanguage();
  const { addItem } = useCart();
  useScrollAnimation();
  const [showNotification, setShowNotification] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    { src: '/cuatrogranos.jpeg', url: 'https://cuatrogranos.com' },
    { src: '/emplearg.jpeg', url: 'https://www.emplearg.com' }
  ];

  const handleAddToCart = () => {
    addItem({
      id: 'web-app',
      // CAMBIO: Título más descriptivo en el carrito
      name: t.webAppTitle || 'Desarrollo App / E-commerce',
      price: '1200€',
      priceNumber: 1200,
      quantity: 1,
      source: 'webapp'
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
    // CAMBIO: Fondo Slate-50 para alternar con la sección anterior (que era blanca)
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      
      {/* Decorative elements (Tonos Esmeralda/Teal para "Ventas/Dinero") */}
      <div className="absolute top-40 right-0 w-[700px] h-[700px] bg-emerald-100/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob" />
      <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-teal-100/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob animation-delay-2000" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          {/* CAMBIO: Título explícito incluyendo Tiendas Online */}
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            {t.customAppsOnlineStores || 'Apps a Medida & Tiendas Online'}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t.powerfulSolutions || 'Soluciones potentes para negocios que necesitan más que una web. Vende productos, gestiona usuarios y escala sin límites.'}
          </p>
        </div>

        {/* --- PRODUCT CARD (Estilo Flagship) --- */}
        <div className="bg-white rounded-[2rem] shadow-[0_25px_60px_-12px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-100 animate-slide-in-scale relative">
          
          {/* Etiqueta "Best Choice" flotando en la esquina del card */}
          <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-6 py-2 rounded-bl-2xl z-30 shadow-sm">
             {t.mostCompleteOption || 'Opción Más Completa'}
          </div>

          <div className="grid md:grid-cols-2 gap-0">
            
            {/* COLUMNA IZQUIERDA: Galería */}
            <div className="relative h-[500px] md:h-auto bg-slate-900 group overflow-hidden">
                
                {/* Badge "Full Stack" */}
                <div className="absolute top-6 left-6 z-20 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-lg border border-white/20">
                  {t.fullStackDevelopment || 'Desarrollo Full Stack'}
                </div>

                <Image
                  src={images[currentImageIndex].src}
                  alt="Web App Preview"
                  fill
                  className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100"
                />
                
                {/* Overlay Gradiente para legibilidad de controles */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

                {/* Navigation Controls */}
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={handlePrevImage} className="p-3 rounded-full bg-white/90 text-slate-900 shadow-lg hover:scale-110 transition-transform">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button onClick={handleNextImage} className="p-3 rounded-full bg-white/90 text-slate-900 shadow-lg hover:scale-110 transition-transform">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>

                {/* Link externo */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full text-center z-20 px-6">
                     <a href={images[currentImageIndex].url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-full text-sm font-bold shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 hover:-translate-y-1 transition-all">
                        <span>{t.seeHowItWorks || 'Ver Funcionamiento'}</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                     </a>
                </div>
            </div>

            {/* COLUMNA DERECHA: Info de Venta */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              
              <div className="mb-2 flex items-center gap-2">
                 <span className="text-emerald-600 font-bold text-sm tracking-wider uppercase">{t.ecommerce || 'E-commerce'}</span>
                 <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                 <span className="text-emerald-600 font-bold text-sm tracking-wider uppercase">{t.saas || 'SaaS'}</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.customPlatform || 'Plataforma a Medida'}</h3>
              <p className="text-slate-500 mb-8 leading-relaxed">
                {t.customPlatformDescription || 'Desde tiendas online con miles de productos hasta paneles de administración complejos. Desarrollo robusto enfocado en la escalabilidad.'}
              </p>

              {/* Pricing Block - Highlighted */}
              <div className="flex items-baseline gap-2 mb-8">
                 <span className="text-6xl font-bold text-slate-900 tracking-tight">1.200€</span>
                 <span className="text-xl text-slate-400 font-medium">+</span>
              </div>

              {/* Features Grid - More items for the biggest package */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mb-10">
                {[
                  t.completeOnlineStore || 'Tienda Online Completa',
                  t.paymentGateway || 'Pasarela de Pagos (Stripe/MP)',
                  t.scalableDatabase || 'Base de Datos Escalable',
                  t.adminPanel || 'Panel de Administración',
                  t.userAccountsLogin || 'Cuentas de Usuario / Login',
                  t.realStockManagement || 'Gestión de Stock Real',
                  t.apiIntegration || 'Integración con APIs',
                  t.deployVPS || 'Deploy & Servidor VPS'
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                    {/* Icono Check en Esmeralda */}
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    {feature}
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="space-y-4">
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-5 px-6 bg-slate-900 text-white font-bold rounded-xl shadow-xl shadow-slate-900/10 hover:bg-slate-800 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    <span>Comenzar Proyecto Grande</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </button>
                  
                  <p className="text-center text-xs text-slate-400">
                    {t.noCommitment || 'Presupuesto personalizado según funcionalidades requeridas.'}
                  </p>
              </div>

            </div>
          </div>
        </div>
        
         {/* Footer Link */}
         <div className="mt-12 text-center">
            <a href="https://wa.me/+34675987068" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors text-sm font-bold bg-emerald-50 px-6 py-3 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                <span>{t.talkExpertAboutApp || 'Hablar con un Experto sobre mi App'}</span>
            </a>
        </div>

      </div>

      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed bottom-8 right-8 bg-slate-900 text-white px-6 py-4 rounded-xl shadow-2xl animate-fade-in-up z-50 flex items-center gap-3">
          <div className="bg-emerald-500 rounded-full p-1">
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