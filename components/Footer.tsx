'use client';

import { useLanguage } from '@/lib/language-context';
import { useTheme } from '@/lib/theme-context';
import Image from 'next/image';
import { Mail, MessageCircle, Instagram, ArrowRight } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();
  const { isLightMode } = useTheme();

  const contactInfo = {
    email: 'guido.llaurado@gmail.com',
    instagram: 'https://www.instagram.com/guidoll.dev/',
    whatsapp: '+34675497068'
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${contactInfo.email}`;
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hola Guidoll, estoy interesado en tus servicios de desarrollo web.');
    window.open(`https://wa.me/${contactInfo.whatsapp.replace('+', '')}?text=${message}`, '_blank');
  };

  const handleInstagramClick = () => {
    window.open(contactInfo.instagram, '_blank');
  };

  return (
    <footer id="contact" className={`py-20 transition-colors duration-500 ${
      isLightMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'
    }`}>
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Call to Action Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-10">
          <div className="text-center md:text-left max-w-2xl">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 tracking-tight ${
              isLightMode ? 'text-white' : 'text-slate-900'
            }`}>
              {t.footerContact || 'Hablemos de tu proyecto'}
            </h2>
            <p className={`text-xl ${
              isLightMode ? 'text-gray-400' : 'text-slate-600'
            }`}>
              {t.footerProjectPrompt || '¿Tienes una idea? Vamos a hacerla realidad. Contacta conmigo directamente.'}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button 
              onClick={handleWhatsAppClick}
              className={`group flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold transition-all duration-300 ${
                isLightMode 
                  ? 'bg-white text-slate-900 hover:bg-gray-100' 
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              <MessageCircle size={20} />
              <span>WhatsApp</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={handleEmailClick}
              className={`group flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold border transition-all duration-300 ${
                isLightMode 
                  ? 'border-slate-700 text-white hover:bg-slate-800' 
                  : 'border-slate-200 text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Mail size={20} />
              <span>Email</span>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className={`w-full h-px mb-12 ${
          isLightMode ? 'bg-slate-800' : 'bg-slate-200'
        }`}></div>

        {/* Bottom Section */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className={`relative w-10 h-10 rounded-full overflow-hidden border ${
                isLightMode ? 'border-slate-700' : 'border-slate-200'
              }`}>
                <Image 
                  src="/logoredondo.png" 
                  alt="Logo" 
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-bold text-xl">Guido.dev</span>
            </div>
            <p className={`max-w-sm ${
              isLightMode ? 'text-gray-400' : 'text-slate-600'
            }`}>
              {t.footerTagline || 'Desarrollo web premium en Barcelona. Especializado en Next.js, React y experiencias digitales de alto rendimiento.'}
            </p>
            <div className="flex gap-4">
              <button onClick={handleInstagramClick} className={`p-2 rounded-full transition-colors ${
                isLightMode ? 'hover:bg-slate-800 text-gray-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
              }`}>
                <Instagram size={20} />
              </button>
              <button onClick={handleEmailClick} className={`p-2 rounded-full transition-colors ${
                isLightMode ? 'hover:bg-slate-800 text-gray-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
              }`}>
                <Mail size={20} />
              </button>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h3 className="font-semibold mb-4">Servicios</h3>
            <ul className={`space-y-3 ${
              isLightMode ? 'text-gray-400' : 'text-slate-600'
            }`}>
              <li><a href="#" className="hover:text-[#67e2f0] transition-colors">Web Development</a></li>
              <li><a href="#" className="hover:text-[#67e2f0] transition-colors">E-commerce</a></li>
              <li><a href="#" className="hover:text-[#67e2f0] transition-colors">SEO Optimization</a></li>
              <li><a href="#" className="hover:text-[#67e2f0] transition-colors">UI/UX Design</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className={`space-y-3 ${
              isLightMode ? 'text-gray-400' : 'text-slate-600'
            }`}>
              <li><a href="#" className="hover:text-[#67e2f0] transition-colors">Privacidad</a></li>
              <li><a href="#" className="hover:text-[#67e2f0] transition-colors">Términos</a></li>
              <li><a href="#" className="hover:text-[#67e2f0] transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm ${
          isLightMode ? 'border-slate-800 text-gray-500' : 'border-slate-200 text-slate-500'
        }`}>
          <p>© 2025 Guido.dev. Todos los derechos reservados.</p>
          <p>{t.footerBuiltWith || 'Diseñado y desarrollado con Next.js y Tailwind CSS.'}</p>
        </div>
      </div>
    </footer>
  );
}