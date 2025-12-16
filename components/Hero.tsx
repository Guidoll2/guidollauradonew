'use client';

import { useLanguage } from '@/lib/language-context';
import { useEffect, useMemo, useState } from 'react';
import ContactModal from './ContactModal';
import { useTheme } from '@/lib/theme-context';

// Componente para animar palabras
function AnimatedWords({
  text,
  className,
  delay = 4000,
  highlightWords,
  // CAMBIO: Gradiente "Tech Corporate" (Azul Real a Cian) en lugar de pasteles.
  // Transmite confianza, tecnología y seriedad.
  highlightClass = 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 font-extrabold',
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
        // Limpiamos puntuación para comparar, pero renderizamos la palabra original
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
            {/* Espacio seguro entre palabras */}
            {stack ? '' : i === words.length - 1 ? '' : '\u00A0'}
          </span>
        );
      })}
    </span>
  );
}

// Componente para badge animado con palabras rotando
function AnimatedBadge({
  words,
  isLastWord,
}: {
  words: string[];
  isLastWord: boolean;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [words.length, mounted]);

  const isCurrentLast = currentIndex === words.length - 1;

  return (
    <div className={`relative px-4 py-1.5 rounded-l-full rounded-r-none bg-slate-100/80 text-[11px] font-bold uppercase tracking-widest border border-slate-200 shadow-sm inline-block h-8 flex items-center justify-center min-w-[120px] overflow-hidden`}>
      <style>{`
        @keyframes slideOutUp {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
        
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .badge-exit {
          animation: slideOutUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .badge-enter {
          animation: slideInDown 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
      
      <span
        key={currentIndex}
        className={`${
          isTransitioning ? 'badge-exit' : 'badge-enter'
        } inline-block transition-colors duration-500 ${
          isCurrentLast && isLastWord
            ? 'text-slate-600'
            : 'text-slate-600'
        }`}
      >
        {words[currentIndex]}
      </span>
    </div>
  );
}

export default function Hero() {
  const { t, language } = useLanguage();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { isLightMode } = useTheme();

  const title = t.heroTitle || 'Desarrollo web profesional';
  const subtitle = t.heroSubtitle || 'Transformo tus ideas en experiencias digitales de alto impacto.';
  
  // Palabras para el badge animado en mobile
  const badgeWords = [
    t.service1 || 'Web Sites',
    t.service2 || 'Custom software',
    t.service3 || 'Online stores'
  ];

  return (
    // Agregué selection:bg-blue-100 para que al seleccionar texto se vea del color de marca
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden selection:bg-blue-100 selection:text-blue-900 transition-colors duration-500 ${
      isLightMode ? 'bg-[#F8FAFC]' : 'bg-slate-900'
    }`}>
      
      {/* --- FONDO AMBIENT (Ajustado a tonos Azules/Profesionales) --- */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
            {/* Orbe Azul Principal */}
            <div className={`absolute top-[10%] left-[10%] w-[600px] h-[600px] rounded-full mix-blend-multiply filter blur-[90px] opacity-60 animate-blob transition-colors duration-500 ${
              isLightMode ? 'bg-blue-400/20' : 'bg-blue-500/10'
            }`} />
            {/* Orbe Cian/Violeta */}
            <div className={`absolute top-[15%] right-[10%] w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-[90px] opacity-60 animate-blob animation-delay-2000 transition-colors duration-500 ${
              isLightMode ? 'bg-indigo-300/20' : 'bg-indigo-500/10'
            }`} />
            {/* Orbe Central Inferior */}
            <div className={`absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full mix-blend-multiply filter blur-[90px] opacity-50 animate-blob animation-delay-4000 transition-colors duration-500 ${
              isLightMode ? 'bg-sky-200/30' : 'bg-sky-400/10'
            }`} />
        </div>
        {/* Trama de ruido muy sutil */}
        <div className={`absolute inset-0 mix-blend-overlay transition-colors duration-500 ${
          isLightMode ? 'bg-white/40' : 'bg-black/20'
        }`} />
      </div>

      <div className="relative z-10 mx-auto w-full px-6 py-24 flex flex-col items-center">
        
        {/* --- CARD PRINCIPAL --- */}
        {/* Ajustes visuales: Sombra más difusa pero borde más definido para contraste */}
        <div className={`w-full max-w-5xl rounded-[1rem] backdrop-blur-2xl border shadow-[0_30px_60px_-15px_rgba(37,99,235,0.08)] px-6 py-12 md:py-20 md:px-12 flex flex-col items-center text-left md:text-center lg:text-center relative overflow-visible transition-all duration-500 hover:shadow-[0_40px_70px_-12px_rgba(37,99,235,0.12)] order-1 md:order-none ${
          isLightMode 
            ? 'bg-white/80 border-white/60' 
            : 'bg-slate-800/80 border-slate-700/60'
        }`}>
          
          {/* FONDO CON GRADIENTE Y BURBUJAS - FROSTED GLASS EFFECT */}
          <div className="absolute inset-0 rounded-[1rem] overflow-hidden pointer-events-none">
            {/* Base suave sin gradiente lineal */}
            <div className={`absolute inset-0 transition-colors duration-500 ${
              isLightMode ? 'bg-white/30' : 'bg-slate-800/30'
            }`} />
            
            {/* Burbuja salmon superior izquierda */}
            <div className="absolute top-[-80px] left-[-100px] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-[#ffbba8]/40 to-[#ffbba8]/10 blur-[60px]" />
            
            {/* Burbuja celeste superior derecha */}
            <div className="absolute top-[-100px] right-[-120px] w-[350px] h-[350px] rounded-full bg-gradient-to-br from-[#67e2f0]/35 to-[#67e2f0]/8 blur-[70px]" />
            
            {/* Burbuja salmon inferior izquierda */}
            <div className="absolute bottom-[-80px] left-[5%] w-[280px] h-[280px] rounded-full bg-gradient-to-tr from-[#ffbba8]/30 to-[#ffbba8]/5 blur-[50px]" />
            
            {/* Burbuja celeste inferior derecha */}
            <div className="absolute bottom-[-100px] right-[-50px] w-[320px] h-[320px] rounded-full bg-gradient-to-tl from-[#67e2f0]/30 to-[#67e2f0]/5 blur-[60px]" />
            
            {/* Burbuja central mixta para más dinámica */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full bg-gradient-to-r from-[#ffbba8]/20 to-[#67e2f0]/20 blur-[50px]" />
          </div>
          
          {/* 1. BADGE ANIMADO - MOBILE ONLY (esquina superior derecha) */}
          <div className="md:hidden absolute top-0 right-0 z-20">
            <AnimatedBadge words={badgeWords} isLastWord={true} />
          </div>
          
          {/* Brillo sutil superior con gradiente salmon-celeste */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#ffbba8]/30 to-transparent" />
          {/* Brillo sutil inferior con transición a celeste */}
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#67e2f0]/20 to-transparent" />

          {/* CONTENIDO RELATIVO PARA Z-INDEX */}
          <div className="relative z-10 w-full">

          {/* 1. CHIPS / ETIQUETAS - DESKTOP ONLY */}
          {/* Estilo más técnico: Texto más pequeño, tracking amplio, uppercase */}
          <div className="hidden md:flex flex-wrap justify-center gap-3 mb-12">
            <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest border shadow-sm transition-colors duration-500 ${
              isLightMode
                ? 'bg-slate-100/80 text-slate-600 border-slate-200'
                : 'bg-slate-700/80 text-slate-300 border-slate-600'
            }`}>{t.service1}</span>
            <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest border shadow-sm transition-colors duration-500 ${
              isLightMode
                ? 'bg-slate-100/80 text-slate-600 border-slate-200'
                : 'bg-slate-700/80 text-slate-300 border-slate-600'
            }`}>{t.service2}</span>
            <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest border shadow-sm transition-colors duration-500 ${
              isLightMode
                ? 'bg-slate-100/80 text-slate-600 border-blue-100'
                : 'bg-slate-700/80 text-slate-300 border-slate-600'
            }`}>{t.service3}</span>
          </div>

          {/* 2. TÍTULO (Ajustado: Más elegante y contenido) */}
          {/* Antes era text-5xl md:text-7xl... ahora lo bajamos un nivel para que respire */}
          <h1 className={`mb-6 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight max-w-4xl transition-colors duration-500 ${
            isLightMode ? 'text-slate-900' : 'text-white'
          }`}>
            <AnimatedWords
              text={title}
              stack={false}
              className="inline-block"
            />
           </h1>

          {/* 3. SUBTÍTULO (Ajustado) */}
          {/* Bajamos de text-2xl a text-xl para mejor jerarquía visual */}
          <p className={`mb-10 text-base sm:text-lg md:text-xl leading-relaxed font-medium max-w-2xl mx-auto antialiased transition-colors duration-500 ${
            isLightMode ? 'text-slate-600' : 'text-slate-300'
          }`}>
             <AnimatedWords text={subtitle} delay={2000} />
          </p>
          
          {/* 4. BOTÓN - DESKTOP ONLY */}
          <div className="hidden md:flex flex-col sm:flex-row gap-5 w-full sm:w-auto items-center">
            
            {/* Botón de Contacto - MINIMALISTA */}
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className={`px-10 py-4 rounded-full font-light text-lg border hover:-translate-y-1 transition-all duration-300 ${
                isLightMode
                  ? 'bg-transparent text-slate-900 border-slate-400 hover:border-slate-600 hover:bg-slate-50'
                  : 'bg-transparent text-white border-slate-500 hover:border-slate-300 hover:bg-slate-800'
              }`}
            >
              {t.contact || 'Hablemos'}
            </button>

          </div>
          </div>

        </div>

        {/* BOTÓN - MOBILE ONLY (outside card) */}
        <div className="md:hidden flex flex-col gap-3 w-full max-w-xs items-center mt-8 order-2">
          
          {/* Botón de Contacto - MINIMALISTA */}
          <button 
            onClick={() => setIsContactModalOpen(true)}
            className={`w-full px-10 py-4 rounded-full font-light text-lg border hover:-translate-y-1 transition-all duration-300 ${
              isLightMode
                ? 'bg-transparent text-slate-900 border-slate-400 hover:border-slate-600 hover:bg-slate-50'
                : 'bg-transparent text-white border-slate-500 hover:border-slate-300 hover:bg-slate-800'
            }`}
          >
            {t.contact || 'Hablemos'}
          </button>

        </div>
      </div>

      {/* Indicador de scroll */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block opacity-50 transition-colors duration-500`}>
        <svg
          className={`w-6 h-6 ${isLightMode ? 'text-slate-400' : 'text-slate-500'}`}
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

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </section>
  );
}