'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/language-context';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useCart } from '@/lib/cart-context';

export default function ServicesShop() {
  const { t } = useLanguage();
  const { addItem, setIsCheckoutOpen } = useCart();
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
      name: t.landingPageTitle,
      price: '250€',
      priceNumber: 250,
      quantity: 1,
      source: 'landing'
    });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % images.length);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-gray-100 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-smooth"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-salmon rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float-smooth" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            {t.landingPageTitle}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t.landingPageDescription}
          </p>
        </div>

        {/* Main Card with Glass Effect Images */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl border-2 border-salmon shadow-2xl p-8 md:p-12 animate-slide-in-scale hover:animate-glow-pulse transition-all duration-300 salmon-glow-border">
          
          {/* Single Image with Navigation */}
          <div className="relative group rounded-2xl overflow-hidden h-80 mb-12">
            {/* Badge */}
            <div className="absolute top-4 left-4 z-20 border-2 border-salmon px-4 py-2 rounded-lg bg-white/95 text-black font-semibold text-sm">
              {t.completedProjects}
            </div>

            {/* Glass effect overlay - LIGHTER */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-white/5 backdrop-blur-[3px] z-10 group-hover:backdrop-blur-[1px] transition-all duration-300"></div>
            
            <Image
              src={images[currentImageIndex].src}
              alt={`Landing Page Example ${currentImageIndex + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Hover Overlay with Link */}
            <div className="absolute inset-0 z-15 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-6">
              <a 
                href={images[currentImageIndex].url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/95 text-sky-600 font-semibold px-6 py-3 rounded-lg hover:bg-white transition-all duration-300 text-center"
              >
                Visitar: {images[currentImageIndex].url.replace('https://', '').replace('www.', '')}
              </a>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-900 p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
              title={t.prevImage}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-900 p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
              title={t.nextImage}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>

          {/* Features and Price Section */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Features */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.includesLabel}</h3>
              <ul className="space-y-3">
                {[
                  t.feature1,
                  t.feature2,
                  t.feature3,
                  t.feature4,
                  t.feature5,
                  t.feature6,
                  t.feature7,
                  t.feature8
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-700 hover:text-salmon transition-colors duration-300">
                    <svg className="w-5 h-5 text-salmon flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Price and CTA */}
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="text-center">
                <p className="text-gray-500 text-sm mb-2">{t.priceFrom}</p>
                <p className="text-6xl font-bold text-salmon mb-2">250€</p>
                <p className="text-gray-600">{t.personalCustomization}</p>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full py-4 px-8 bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl active:scale-95"
              >
                + {t.addToCart}
              </button>

              <p className="text-sm text-gray-500">
                {t.noCommitment}
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <p className="text-gray-600 mb-4">
            {t.questions}
            <a 
              href="https://wa.me/34675497068" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sky-500 font-semibold hover:text-sky-600 transition-colors duration-300 ml-2"
            >
              {t.contactWhatsApp}
            </a>
            {' '}{t.consultationText}
          </p>
          <button 
            onClick={() => {
              const servicesSection = document.getElementById('services');
              servicesSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-salmon font-semibold hover:text-orange-400 transition-colors duration-300 inline-flex items-center gap-2"
          >
            {t.moreServices}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Floating Cart Button */}
      {showNotification && (
        <div className="fixed bottom-32 right-8 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-up z-30">
          {t.addedToCart}
        </div>
      )}
    </section>
  );
}
