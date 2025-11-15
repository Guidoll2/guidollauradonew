'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Language } from '@/lib/types';
import { getTranslation } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: ReturnType<typeof getTranslation>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getDefaultLanguage = (): Language => {
  // Si estamos en servidor, devolver español por defecto
  if (typeof window === 'undefined') return 'es';

  // Intentar obtener del localStorage primero
  const savedLanguage = localStorage.getItem('preferredLanguage') as Language | null;
  if (savedLanguage && ['es', 'ca', 'en'].includes(savedLanguage)) {
    return savedLanguage;
  }

  // Detectar del navegador
  const browserLang = navigator.language.split('-')[0];
  const supportedLanguages: Language[] = ['es', 'ca', 'en'];

  if (supportedLanguages.includes(browserLang as Language)) {
    return browserLang as Language;
  }

  // Por defecto español
  return 'es';
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');
  const [isMounted, setIsMounted] = useState(false);

  // Detectar idioma cuando el componente se monta
  useEffect(() => {
    const defaultLang = getDefaultLanguage();
    setLanguage(defaultLang);
    setIsMounted(true);
  }, []);

  // Guardar preferencia cuando cambia
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredLanguage', lang);
    }
  };

  const t = getTranslation(language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {isMounted ? children : null}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}