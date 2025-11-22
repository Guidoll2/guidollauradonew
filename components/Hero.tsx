'use client';

import { useLanguage } from '@/lib/language-context';
import { useEffect, useMemo, useState } from 'react';

// Componente para animar palabras
function AnimatedWords({
  text,
  className,
  delay = 4000,
  highlightWords,
  // CAMBIO: Usamos un gradiente que coincide con tus colores de marca
  highlightClass = 'text-transparent bg-clip-text bg-gradient-to-r from-[#ffbba8] to-[#67e2f0] font-bold',
  stack = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  highlightWords?: string[];
  highlightClass?: string;
  stack?: boolean;
}) {
  const words = useMemo(() => text.split(' '), [text]);
  const [mounted, setMounted] = useState(false);

  const stagger = words.length > 0 ? delay / (words.length * 2.5) : 0;
  const durationMs = Math.max(800, Math.floor(delay * 0.6));

  useEffect(() => {
    const to = setTimeout(() => setMounted(true), 20);
    return () => clearTimeout(to);
  }, [text, delay]);

  return (
    <span className={className}>
      {words.map((w, i) => {
        const cleaned = w.replace(/[.,;:!?]/g, '').toLowerCase();
        const shouldHighlight = highlightWords?.some(
          (hw) => hw.toLowerCase() === cleaned
        );
        return (
          <span
            key={`${w}-${i}`}
            className={`${stack ? 'block' : 'inline-block mr-2'} transform ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            } ${shouldHighlight ? highlightClass : ''}`}
            style={{
              transitionProperty: 'opacity, transform',
              transitionDuration: `${durationMs}ms`,
              transitionTimingFunction: 'cubic-bezier(.15,.85,.25,.98)',
              transitionDelay: `${Math.floor(i * stagger)}ms`,
              willChange: 'opacity, transform',
            }}
          >
            {w}
            {stack ? '' : i === words.length - 1 ? '' : '\u00A0'}
          </span>
        );
      })}
    </span>
  );
}

export default function Hero() {
  const { t, language } = useLanguage();

  const title = t.heroTitle || 'Desarrollo web profesional';
  // CAMBIO: Frase más corta y potente para el diseño centrado
  const subtitle = t.heroSubtitle || 'Transformo tus ideas en experiencias digitales de alto impacto.';

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50">
      
      {/* --- FONDO AMBIENT (Usando tus tonos) --- */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
            {/* Orbe Durazno */}
            <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-[#ffbba8]/30 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob" />
            {/* Orbe Cyan */}
            <div className="absolute top-[10%] right-[15%] w-[500px] h-[500px] bg-[#67e2f0]/30 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob animation-delay-2000" />
            {/* Orbe Central */}
            <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#ffbba8]/20 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob animation-delay-4000" />
        </div>
        {/* Trama de ruido sutil para textura (opcional) */}
        <div className="absolute inset-0 bg-white/20 mix-blend-overlay" />
      </div>

      <div className="relative z-10 mx-auto w-full px-6 py-24 flex flex-col items-center">
        
        {/* --- CARD PRINCIPAL CENTRADO Y ANCHO --- */}
        <div className="w-full max-w-4xl rounded-[2.5rem] bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] p-8 md:p-16 flex flex-col items-center text-center relative overflow-hidden group hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500">
          
          {/* Efecto de brillo al pasar el mouse */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* 1. CHIPS / ETIQUETAS (Centradas) */}
           <div className="flex flex-wrap justify-center gap-3 mb-8">
             <span className="px-4 py-1.5 rounded-full bg-white/60 text-xs font-bold uppercase tracking-wider text-slate-500 border border-white shadow-sm backdrop-blur-sm">{t.service1 || 'Desarrollo Web'}</span>
             <span className="px-4 py-1.5 rounded-full bg-white/60 text-xs font-bold uppercase tracking-wider text-slate-500 border border-white shadow-sm backdrop-blur-sm">{t.service2 || 'UI/UX'}</span>
             <span className="px-4 py-1.5 rounded-full bg-white/60 text-xs font-bold uppercase tracking-wider text-slate-500 border border-white shadow-sm backdrop-blur-sm">Next.js</span>
           </div>

          {/* 2. TÍTULO (Grande y centrado) */}
          <h1 className="mb-6 text-5xl md:text-7xl font-bold leading-[1.1] text-slate-900 tracking-tight max-w-3xl">
            <AnimatedWords
              text={title}
              highlightWords={['Profesional', 'Professional', 'premium']}
              stack={false} // Importante: false para que fluya en horizontal
              className="inline-block"
            />
          </h1>

          {/* 3. SUBTÍTULO (Limpio) */}
          <p className="mb-10 text-lg md:text-2xl text-slate-600 leading-relaxed font-medium max-w-2xl mx-auto">
             {/* Renderizamos el subtitulo directamente o con AnimatedWords si prefieres */}
             <AnimatedWords text={subtitle} delay={3000} />
          </p>

          {/* 4. BOTONES (El cierre visual) */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button 
              onClick={() => {
                const heroSection = document.querySelector('section');
                if (heroSection) {
                  const nextSection = heroSection.nextElementSibling;
                  nextSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="group relative px-8 py-4 rounded-full bg-[#1e2a37] text-white font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">{t.viewProject || 'Ver Proyectos'}</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <a href="https://wa.me/34675497068?text=Hola%20Guidoll,%20quiero%20contactar%20contigo" target="_blank" rel="noopener noreferrer">            <button className="px-8 py-4 rounded-full bg-white/50 text-slate-700 font-semibold text-lg border border-white/60 hover:bg-white hover:border-white hover:-translate-y-1 transition-all duration-300 shadow-sm">
              {t.contact || 'Contactar'}
            </button></a>

          </div>

        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <svg
          className="w-6 h-6 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}