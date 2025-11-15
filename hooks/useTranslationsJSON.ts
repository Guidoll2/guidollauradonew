import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/language-context';

type TranslationKeys = Record<string, string>;

export function useTranslationsJSON() {
  const { language } = useLanguage();
  const [translations, setTranslations] = useState<TranslationKeys>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/locales/${language}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load translations for ${language}`);
        }
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error('Error loading translations:', error);
        // Fallback to Spanish if there's an error
        const response = await fetch('/locales/es.json');
        const data = await response.json();
        setTranslations(data);
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [language]);

  return { translations, isLoading };
}
