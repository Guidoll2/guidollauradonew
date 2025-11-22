"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Language } from '@/lib/types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Record<string, string>;
  isLoading: boolean;
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
  const [t, setT] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Detectar idioma inicial
  useEffect(() => {
    const defaultLang = getDefaultLanguage();
    setLanguage(defaultLang);
    setIsMounted(true);
  }, []);

  // Cargar traducciones cuando cambia el idioma
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/locales/${language}.json`);
        if (!res.ok) throw new Error('Failed to load translations');
        const data = await res.json();
        setT(data);
      } catch (e) {
        try {
          const res = await fetch('/locales/es.json');
          const data = await res.json();
          setT(data);
        } catch {
          setT({});
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadTranslations();
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredLanguage', lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, isLoading }}>
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