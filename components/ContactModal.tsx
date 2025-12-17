'use client';

import { X, MessageCircle, Mail, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '@/lib/theme-context';
import { useLanguage } from '@/lib/language-context';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { isLightMode, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isClosing, setIsClosing] = useState(false);

  if (!isOpen && !isClosing) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300); // Duración de la animación
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => {
          handleClose();
          setSubmitStatus('idle');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-end backdrop-blur-sm transition-all duration-300 ${
        isClosing ? 'bg-black/0 animate-fadeOut' : 'bg-black/70 animate-fadeIn'
      }`}
      onClick={handleOverlayClick}
    >
      <div className={`relative shadow-2xl w-full h-full md:h-full md:max-w-md md:rounded-l-2xl md:m-0 p-6 md:p-8 overflow-y-auto transition-all duration-300 ${
        isClosing ? 'animate-slideOutRight' : 'animate-slideInRight'
      } ${
        isLightMode 
          ? 'bg-white' 
          : 'bg-slate-800'
      }`}>
        
        {/* Botones superiores: Theme toggle (izquierda) y Close (derecha) */}
        <div className="sticky top-0 flex justify-between items-center mb-4 z-10">
          {/* Botón de Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-200 ${
              isLightMode
                ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
            aria-label={t.changeTheme || 'Cambiar tema'}
          >
            {isLightMode ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Botón de Cierre */}
          <button
            onClick={handleClose}
            className={`p-2 rounded-full transition-all duration-200 ${
              isLightMode
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                : 'text-gray-400 hover:text-white hover:bg-slate-700'
            }`}
            aria-label={t.closeModal || 'Cerrar modal'}
          >
            <X size={24} />
          </button>
        </div>

        {/* Contenido con padding inferior para scroll */}
        <div className="pb-6">
        {/* Título */}
        <h2 className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
          isLightMode ? 'text-slate-900' : 'text-white'
        }`}>
          {t.modalTitle || 'Hablemos de tu Proyecto'}
        </h2>
        <p className={`mb-6 transition-colors duration-300 ${
          isLightMode ? 'text-slate-600' : 'text-gray-300'
        }`}>
          {t.modalSubtitle || 'Elige tu forma preferida de contacto'}
        </p>

        {/* Sección 1: Contacto Instantáneo - WhatsApp */}
        <div className="mb-4">
          <a
            href="https://wa.me/34675497068?text=Hola%20Guidodev,%20quiero%20empezar%20un%20proyecto."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-[#ffbba8] to-[#67e2f0] hover:opacity-90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <MessageCircle size={24} />
            <span className="text-lg">{t.chatWhatsApp || 'Chatear por WhatsApp'}</span>
          </a>
        </div>

        {/* Sección 2: Contacto Formal - Email */}
        <div className="mb-6">
          <a
            href="mailto:contacto@guidodev.es"
            className={`flex items-center justify-center gap-3 w-full py-3 px-6 rounded-xl font-medium border-2 transition-all duration-300 ${
              isLightMode
                ? 'text-slate-900 border-slate-300 hover:border-[#67e2f0] hover:bg-slate-100'
                : 'text-white border-gray-600 hover:border-[#67e2f0] hover:bg-slate-700'
            }`}
          >
            <Mail size={20} />
            <span>{t.sendEmail || 'Enviar un Email Directo'}</span>
          </a>
        </div>

        {/* Divisor */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className={`w-full border-t transition-colors duration-300 ${
              isLightMode ? 'border-slate-300' : 'border-gray-600'
            }`}></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className={`px-4 transition-colors duration-300 ${
              isLightMode ? 'bg-white text-slate-500' : 'bg-slate-800 text-gray-400'
            }`}>{t.orDivider || 'o'}</span>
          </div>
        </div>

        {/* Sección 3: Formulario Rápido */}
        <div>
          <h3 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
            isLightMode ? 'text-slate-900' : 'text-white'
          }`}>
            {t.quickMessageTitle || 'O déjanos un mensaje rápido y te contactamos'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isLightMode ? 'text-slate-700' : 'text-gray-300'
              }`}>
                {t.nameLabel || 'Nombre'}
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67e2f0] focus:border-transparent transition-all ${
                  isLightMode
                    ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                    : 'bg-slate-700 border-gray-600 text-white placeholder-gray-400'
                }`}
                placeholder={t.namePlaceholder || 'Tu nombre'}
              />
            </div>

            <div>
              <label htmlFor="email" className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isLightMode ? 'text-slate-700' : 'text-gray-300'
              }`}>
                {t.emailLabel || 'Email'}
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67e2f0] focus:border-transparent transition-all ${
                  isLightMode
                    ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                    : 'bg-slate-700 border-gray-600 text-white placeholder-gray-400'
                }`}
                placeholder={t.emailPlaceholder || 'tu@email.com'}
              />
            </div>

            <div>
              <label htmlFor="message" className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isLightMode ? 'text-slate-700' : 'text-gray-300'
              }`}>
                {t.messageLabel || 'Mensaje'}
              </label>
              <textarea
                id="message"
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67e2f0] focus:border-transparent transition-all resize-none ${
                  isLightMode
                    ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                    : 'bg-slate-700 border-gray-600 text-white placeholder-gray-400'
                }`}
                placeholder={t.messagePlaceholder || 'Cuéntanos sobre tu proyecto...'}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ${
                isLightMode
                  ? 'text-white bg-slate-800 hover:bg-slate-700'
                  : 'text-white bg-slate-700 hover:bg-slate-600'
              }`}
            >
              {isSubmitting ? (t.sendingButton || 'Enviando...') : (t.sendButton || 'Enviar Mensaje')}
            </button>

            {submitStatus === 'success' && (
              <p className="text-green-400 text-center text-sm">
                {t.successMessage || '✓ Mensaje enviado con éxito. Te contactaremos pronto.'}
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-400 text-center text-sm">
                {t.errorMessage || '✗ Hubo un error. Por favor, intenta de nuevo.'}
              </p>
            )}
          </form>
        </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes slideOutRight {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(100%);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-fadeOut {
          animation: fadeOut 0.3s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-slideOutRight {
          animation: slideOutRight 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
}
