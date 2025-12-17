'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/language-context';
import { useTheme } from '@/lib/theme-context';
import { Target, CheckCircle, Briefcase, Code, Zap, Layout } from 'lucide-react';
import ContactModal from './ContactModal';

export default function AboutMeSection() {
  const { t } = useLanguage();
  const { isLightMode } = useTheme();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <section 
      id="about"
      className={`w-full py-24 transition-colors duration-500 ${
        isLightMode ? 'bg-[#F8FAFC]' : 'bg-slate-900'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        {/* Título Principal */}
        <div className="text-center mb-16 space-y-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border transition-colors duration-500 ${
            isLightMode 
              ? 'bg-white border-slate-200 text-slate-500' 
              : 'bg-slate-800 border-slate-700 text-slate-400'
          }`}>
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#ffbba8] to-[#67e2f0]"></span>
            {t.aboutLabel || 'Sobre mí'}
          </div>
          
          <h2 className={`text-4xl md:text-5xl font-bold tracking-tight transition-colors duration-500 ${
            isLightMode ? 'text-slate-900' : 'text-white'
          }`}>
            {t.aboutTitle || 'Guido Llaurado: Desarrollo, Estrategia y Resultados.'}
          </h2>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto transition-colors duration-500 ${
            isLightMode ? 'text-slate-600' : 'text-slate-400'
          }`}>
            {t.aboutFocusTitle || 'Mi Enfoque'}
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* CARD 1: Perfil (Vertical) */}
          <div className={`md:col-span-1 md:row-span-2 rounded-[2rem] p-8 flex flex-col items-center text-center border transition-all duration-500 ${
            isLightMode 
              ? 'bg-white border-slate-100 shadow-xl shadow-slate-200/50' 
              : 'bg-slate-800 border-slate-700 shadow-xl shadow-slate-900/50'
          }`}>
            <div className="relative w-40 h-40 mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#ffbba8] to-[#67e2f0] blur-lg opacity-50 animate-pulse"></div>
              <div className={`relative w-full h-full rounded-full overflow-hidden border-4 transition-colors duration-500 ${
                isLightMode ? 'border-white' : 'border-slate-700'
              }`}>
                <Image
                  src="/oficina.png"
                  alt="Guido Llaurado"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <h3 className={`text-2xl font-bold mb-2 transition-colors duration-500 ${
              isLightMode ? 'text-slate-900' : 'text-white'
            }`}>
              Guido Llaurado
            </h3>
            <p className={`text-sm font-medium mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500`}>
              Full Stack Developer
            </p>
            
            <p className={`text-sm leading-relaxed mb-8 transition-colors duration-500 ${
              isLightMode ? 'text-slate-600' : 'text-slate-300'
            }`}>
              {t.aboutIntro || 'Soy Guido Llaurado, desarrollador web Full Stack, especializado en la creación de activos digitales modernos, rápidos y eficientes. Trabajo con tecnologías como Next.js, React y Vercel para garantizar que tu sitio web cargue instantáneamente, luzca profesional y te ayude a conseguir más clientes.'}
            </p>

            <div className="mt-auto w-full">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className={`block w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-[1.02] ${
                  isLightMode
                    ? 'bg-slate-900 text-white hover:bg-slate-800'
                    : 'bg-white text-slate-900 hover:bg-slate-100'
                }`}
              >
                {t.contactMe || 'Contáctame'}
              </button>
            </div>
          </div>

          {/* CARD 2: Enfoque (Horizontal Superior) */}
          <div className={`md:col-span-2 rounded-[2rem] p-8 border relative overflow-hidden transition-all duration-500 group ${
            isLightMode 
              ? 'bg-white border-slate-100 shadow-lg shadow-slate-200/40' 
              : 'bg-slate-800 border-slate-700 shadow-lg shadow-slate-900/40'
          }`}>
            {/* Gradiente de fondo sutil */}
            <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity duration-500 ${
              isLightMode ? 'bg-[#ffbba8]/20 opacity-60' : 'bg-[#ffbba8]/10 opacity-30'
            }`}></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${
                  isLightMode ? 'bg-blue-50 text-blue-600' : 'bg-blue-900/30 text-blue-400'
                }`}>
                  <Target size={24} />
                </div>
                <h3 className={`text-xl font-bold transition-colors duration-500 ${
                  isLightMode ? 'text-slate-900' : 'text-white'
                }`}>
                  {t.aboutFocusSubtitle || 'Mi Experiencia: Diseño + Ingeniería para tu Negocio'}
                </h3>
              </div>
              
              <p className={`text-lg leading-relaxed transition-colors duration-500 ${
                isLightMode ? 'text-slate-600' : 'text-slate-300'
              }`}>
                {t.aboutFocusDescription || 'Me encargo personalmente del ciclo completo de tu proyecto: diseño estratégico, desarrollo de vanguardia y optimización SEO. Utilizo programación moderna (Next.js/React) para asegurar que cada Euro invertido se traduzca en clientes reales y crecimiento.'}
              </p>
            </div>
          </div>

          {/* CARD 3: Beneficios (Grid 2x2) */}
          <div className={`md:col-span-2 rounded-[2rem] p-8 border transition-all duration-500 ${
            isLightMode 
              ? 'bg-white border-slate-100 shadow-lg shadow-slate-200/40' 
              : 'bg-slate-800 border-slate-700 shadow-lg shadow-slate-900/40'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2 rounded-lg ${
                isLightMode ? 'bg-cyan-50 text-cyan-600' : 'bg-cyan-900/30 text-cyan-400'
              }`}>
                <Briefcase size={24} />
              </div>
              <h3 className={`text-xl font-bold transition-colors duration-500 ${
                isLightMode ? 'text-slate-900' : 'text-white'
              }`}>
                {t.aboutBenefitsTitle || '¿Por Qué Elegir Mis Servicios?'}
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { 
                  icon: <Zap size={20} />, 
                  text: t.aboutModernTech || 'Garantía de Código y Velocidad. Utilizo el stack más moderno (Next.js & React) para asegurar el máximo rendimiento y la escalabilidad futura.' 
                },
                { 
                  icon: <CheckCircle size={20} />, 
                  text: t.aboutFullCycle || 'Experto en el Ciclo Completo. Manejo todas las fases (diseño, desarrollo, optimización y lanzamiento), asegurando consistencia y cero fricción.' 
                },
                { 
                  icon: <Code size={20} />, 
                  text: t.aboutPaymentsSEO || 'Enfoque en Transacciones. Especializado en la integración de pagos internacionales (Stripe) y SEO avanzado para transformar visitantes en clientes.' 
                }
              ].map((item, idx) => (
                <div key={idx} className={`flex items-start gap-3 p-4 rounded-xl transition-colors duration-500 ${
                  isLightMode ? 'bg-slate-50' : 'bg-slate-700/50'
                }`}>
                  <div className={`mt-0.5 ${
                    isLightMode ? 'text-[#67e2f0]' : 'text-[#67e2f0]'
                  }`}>
                    {item.icon}
                  </div>
                  <span className={`text-sm font-medium transition-colors duration-500 ${
                    isLightMode ? 'text-slate-700' : 'text-slate-200'
                  }`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </section>
  );
}
