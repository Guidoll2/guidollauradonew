'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, X } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';
import { useLanguage } from '@/lib/language-context';
import PalantirOrb from './PalantirOrb';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function FloatingAssistant() {
  const { isLightMode } = useTheme();
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Mostrar el orbe después de hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Mensaje de bienvenida al abrir
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: t.assistantWelcome || '¡Hola! 👋 Soy el asistente virtual de Guido. Estoy aquí para ayudarte a encontrar la solución web perfecta para tu proyecto. ¿En qué puedo ayudarte hoy?',
        },
      ]);
    }
  }, [isOpen, t.assistantWelcome]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);

    // Contar mensajes del usuario
    const userMessageCount = newMessages.filter(m => m.role === 'user').length;
    
    // Mostrar que se envió email en mensaje 6 o superior
    if (userMessageCount >= 6 && !emailSent) {
      setEmailSent(true);
    }

    try {
      const response = await fetch('/api/openai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          messageCount: userMessageCount,
          language: language, // Pasar el idioma al backend
        }),
      });

      if (!response.ok) throw new Error('Error en la respuesta');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;

              try {
                const parsed = JSON.parse(data);
                if (parsed.text) {
                  assistantMessage += parsed.text;
                  setMessages([...newMessages, { role: 'assistant', content: assistantMessage }]);
                }
              } catch (e) {
                // Ignorar errores de parsing
              }
            }
          }
        }
      }

      setIsTyping(false);
    } catch (error) {
      console.error('Error:', error);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: t.assistantError || 'Lo siento, hubo un error. Por favor, intenta de nuevo.',
        },
      ]);
      setIsTyping(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isVisible) return null;

  // Theme-aware colors
  const colors = isLightMode ? {
    // Light mode - using blue gradient as primary accent
    primary: '#1e3a8a',
    secondary: '#475569',
    background: '#FFFFFF',
    panelBg: '#F7F8FA',
    border: '#E6E8EC',
    userBubbleBg: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
    userBubbleText: '#FFFFFF',
    assistantBubbleBg: '#FFFFFF',
    assistantBubbleText: '#0F172A',
    inputBg: '#F7F8FA',
    inputText: '#0F172A',
    placeholderText: '#94A3B8',
    closeIconColor: '#94A3B8',
    orbBase: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)',
    orbShadow: 'rgba(30, 64, 175, 0.3)',
    orbGlow: 'rgba(59, 130, 246, 0.2)',
    sendButtonBg: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
    sendButtonShadow: '0 2px 8px rgba(30, 64, 175, 0.25)',
    inputFocusBorder: '#3b82f6',
  } : {
    // Dark mode - using hero gradient colors
    primary: '#E5E7EB',
    secondary: '#9CA3AF',
    background: '#121826',
    panelBg: '#0B0F1A',
    border: '#1F2937',
    userBubbleBg: 'linear-gradient(135deg, #ffbba8 0%, #67e2f0 100%)',
    userBubbleText: '#0B0F1A',
    assistantBubbleBg: '#121826',
    assistantBubbleText: '#E5E7EB',
    inputBg: '#0B0F1A',
    inputText: '#E5E7EB',
    placeholderText: '#6B7280',
    closeIconColor: '#9CA3AF',
    orbBase: 'linear-gradient(135deg, #ffbba8 0%, #67e2f0 100%)',
    orbShadow: 'rgba(255, 187, 168, 0.25)',
    orbGlow: 'rgba(103, 226, 240, 0.15)',
    sendButtonBg: 'linear-gradient(135deg, #ffbba8 0%, #67e2f0 100%)',
    sendButtonShadow: '0 4px 12px rgba(255, 187, 168, 0.25)',
    inputFocusBorder: '#ffbba8',
  };

  return (
    <>
      {/* Palantír Orb - Orbe vivo flotante */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 group">
          <PalantirOrb
            size={56}
            isLightMode={isLightMode}
            onClick={() => setIsOpen(true)}
            className="md:w-16 md:h-16"
          />

          {/* Tooltip minimalista */}
          <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform group-hover:translate-y-0 translate-y-1">
            <div 
              className="text-sm px-4 py-2.5 rounded-xl backdrop-blur-md whitespace-nowrap font-medium"
              style={{
                background: colors.background,
                border: `1px solid ${colors.border}`,
                color: colors.secondary,
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(15, 23, 42, 0.04)'
              }}
            >
              {t.assistantTooltip || '¿Necesitas ayuda?'}
            </div>
          </div>
        </div>
      )}

      {/* Modal del chat */}
      {isOpen && (
        <div 
          className="fixed bottom-0 left-0 right-0 md:bottom-8 md:right-8 md:left-auto z-50 w-full md:w-96 h-[100dvh] md:h-[600px] flex flex-col md:rounded-3xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300"
          style={{
            background: colors.background,
            border: `1px solid ${colors.border}`,
            boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(15, 23, 42, 0.04)'
          }}
        >
          {/* Header */}
          <div 
            className="flex items-center justify-between p-5"
            style={{ borderBottom: `1px solid ${colors.border}` }}
          >
            <div className="flex items-center gap-3">
              {/* Mini orbe en el header - sin icono */}
              <div 
                className="w-10 h-10 rounded-full relative"
                style={{
                  background: colors.orbBase,
                  boxShadow: `0 4px 12px ${colors.orbShadow}`
                }}
              >
                <div 
                  className="absolute inset-0 rounded-full opacity-30"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent 60%)'
                  }}
                />
              </div>
              <div>
                <h3 className="font-semibold text-[15px]" style={{ color: colors.primary }}>
                  {t.assistantTitle || 'Asistente Virtual'}
                </h3>
                <p className="text-xs" style={{ color: colors.secondary }}>
                  {t.assistantSubtitle || 'Estoy aquí para ayudarte'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full transition-all duration-200"
              style={{ 
                color: colors.closeIconColor,
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = colors.panelBg}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              aria-label="Cerrar chat"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Mensajes */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-5 space-y-3 scrollbar-thin"
            style={{ background: colors.panelBg }}
          >
            {/* Indicador de email enviado */}
            {emailSent && (
              <div className="flex justify-center my-2">
                <div 
                  className="text-xs px-4 py-2.5 rounded-full flex items-center gap-2"
                  style={{
                    background: isLightMode ? '#ECFDF5' : '#064E3B',
                    border: `1px solid ${isLightMode ? '#A7F3D0' : '#047857'}`,
                    color: isLightMode ? '#065F46' : '#A7F3D0'
                  }}
                >
                  <span 
                    className="w-1.5 h-1.5 rounded-full animate-pulse" 
                    style={{ background: isLightMode ? '#10B981' : '#34D399' }}
                  />
                  {t.assistantEmailSent || 'Guido recibirá un resumen de esta conversación'}
                </div>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === 'assistant' ? 'border' : ''
                  }`}
                  style={msg.role === 'user' 
                    ? {
                        background: colors.userBubbleBg,
                        color: colors.userBubbleText,
                        boxShadow: isLightMode 
                          ? '0 2px 8px rgba(15, 23, 42, 0.08)'
                          : '0 4px 12px rgba(255, 187, 168, 0.15)'
                      }
                    : {
                        background: colors.assistantBubbleBg,
                        color: colors.assistantBubbleText,
                        border: `1px solid ${colors.border}`
                      }
                  }
                >
                  <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}

            {/* Indicador de escritura */}
            {isTyping && (
              <div className="flex justify-start">
                <div 
                  className="px-5 py-3.5 rounded-2xl border"
                  style={{
                    background: colors.assistantBubbleBg,
                    border: `1px solid ${colors.border}`
                  }}
                >
                  <div className="flex gap-1.5">
                    <div 
                      className="w-2 h-2 rounded-full animate-bounce" 
                      style={{ background: colors.secondary, animationDelay: '0ms' }} 
                    />
                    <div 
                      className="w-2 h-2 rounded-full animate-bounce" 
                      style={{ background: colors.secondary, animationDelay: '150ms' }} 
                    />
                    <div 
                      className="w-2 h-2 rounded-full animate-bounce" 
                      style={{ background: colors.secondary, animationDelay: '300ms' }} 
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div 
            className="p-5"
            style={{ 
              borderTop: `1px solid ${colors.border}`,
              background: colors.background
            }}
          >
            <div className="flex gap-2.5">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t.assistantPlaceholder || 'Escribe tu mensaje...'}
                disabled={isLoading}
                className="flex-1 px-4 py-3 rounded-2xl border focus:outline-none transition-all disabled:opacity-50"
                style={{
                  background: colors.inputBg,
                  border: `1px solid ${colors.border}`,
                  color: colors.inputText,
                  fontSize: '14px'
                }}
                onFocus={(e) => e.target.style.borderColor = colors.inputFocusBorder}
                onBlur={(e) => e.target.style.borderColor = colors.border}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="p-3 rounded-2xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: input.trim() && !isLoading 
                    ? colors.sendButtonBg
                    : colors.border,
                  color: input.trim() && !isLoading 
                    ? '#FFFFFF'
                    : colors.secondary,
                  boxShadow: input.trim() && !isLoading 
                    ? colors.sendButtonShadow
                    : 'none'
                }}
                aria-label="Enviar mensaje"
              >
                <Send className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Estilos para el scrollbar personalizado */}
      <style jsx global>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 5px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: ${isLightMode ? '#E6E8EC' : '#1F2937'};
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: ${isLightMode ? '#CBD5E1' : '#374151'};
        }
      `}</style>
    </>
  );
}
