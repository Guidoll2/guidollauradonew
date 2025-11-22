'use client';

import { useLanguage } from '@/lib/language-context';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Services() {
  const { t } = useLanguage();
  useScrollAnimation();

  const services = [
    {
      title: t.service1 || 'Desarrollo Web Moderno',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      color: 'from-sky-400 to-blue-500',
      shadow: 'shadow-blue-500/30'
    },
    {
      title: t.service2 || 'Experiencia UI/UX',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ),
      color: 'from-orange-400 to-red-500',
      shadow: 'shadow-orange-500/30'
    },
    {
      title: t.service3 || 'Integraciones API',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: 'from-purple-400 to-pink-500',
      shadow: 'shadow-purple-500/30'
    },
    {
      title: t.service4 || 'Tiendas Online',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      // Cambié a esmeralda para coincidir con la sección de Apps/Tiendas anterior
      color: 'from-emerald-400 to-teal-500', 
      shadow: 'shadow-emerald-500/30'
    },
    {
      title: t.service5 || 'Sistemas de Gestión',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: 'from-amber-400 to-yellow-500',
      shadow: 'shadow-amber-500/30'
    }
  ];

  return (
    // CAMBIO: Fondo blanco para mantener continuidad. ID "services" para el scroll.
    <section className="py-24 bg-white relative overflow-hidden" id="services">
      
      {/* Fondo decorativo muy sutil para que no sea blanco aburrido */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
            {t.servicesTitle || 'Soluciones Integrales'}
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
             Un resumen de mis capacidades técnicas para llevar tu proyecto al siguiente nivel.
          </p>
        </div>

        {/* GRID INTELIGENTE:
            - Desktop (lg): 3 columnas. Los elementos fluyen. 
            - Como son 5 elementos, usaremos flexbox con wrap y 'justify-center' para que
              la última fila (de 2 elementos) quede centrada automáticamente.
        */}
        <div className="flex flex-wrap justify-center gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 fade-in flex flex-col items-center text-center cursor-default"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon Container con Gradiente y Sombra de color */}
              <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${service.color} text-white rounded-2xl mb-6 shadow-lg ${service.shadow} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                {service.icon}
              </div>
              
              <h3 className="text-lg font-bold text-slate-800 group-hover:text-slate-900 mb-2">
                {service.title}
              </h3>
              
              {/* Pequeña línea decorativa que crece en hover */}
              <div className={`h-1 w-8 rounded-full bg-gradient-to-r ${service.color} opacity-30 group-hover:w-16 group-hover:opacity-100 transition-all duration-300`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}