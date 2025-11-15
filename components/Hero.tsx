'use client';

import { useLanguage } from '@/lib/language-context';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-900">
      {/* Glow Background Gradient with wave effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#34489a] via-[#126e9c] to-slate-900"></div>
      
      {/* Wave overlay for additional depth */}
      <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none" viewBox="0 0 1200 120">
        <path d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z" fill="url(#waveGradient)" />
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#34489a" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#126e9c" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#34489a" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Radial Glow Effect */}
      <div className="absolute inset-0 radial-glow"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          {t.heroTitle}
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
          {t.heroSubtitle}
        </p>

        {/* Glass card with Welcome message */}
        <div className="inline-block px-8 py-4 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl hover:shadow-3xl hover:bg-white/15 transition-all duration-300">
          <p className="text-2xl md:text-3xl font-semibold text-white">
            {t.heroWelcome}
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}