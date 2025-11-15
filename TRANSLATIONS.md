# Sistema de Traducciones con JSON

## Descripción

Este proyecto ahora soporta dos sistemas de traducciones:

### 1. Sistema actual (TypeScript)
Ubicación: `lib/translations.ts`
- Las traducciones están en TypeScript
- Se cargan automáticamente según el idioma seleccionado
- Se usa el hook `useLanguage()` en los componentes

### 2. Sistema alternativo (JSON) - Recomendado
Ubicación: `public/locales/{es,ca,en}.json`
- Las traducciones están en archivos JSON separados
- Se cargan dinámicamente desde el cliente
- Más fácil de mantener y actualizar
- Se usa el hook `useTranslationsJSON()` en los componentes

## Cómo cambiar al sistema JSON

### Paso 1: Usar el hook en tus componentes

En lugar de:
```tsx
import { useLanguage } from '@/lib/language-context';

export default function MyComponent() {
  const { t } = useLanguage();
  return <h1>{t.heroTitle}</h1>;
}
```

Usa:
```tsx
import { useTranslationsJSON } from '@/hooks/useTranslationsJSON';

export default function MyComponent() {
  const { translations } = useTranslationsJSON();
  return <h1>{translations.heroTitle}</h1>;
}
```

### Paso 2: Mantener los archivos JSON actualizados

Cada vez que agregues nuevas traducciones, actualiza los tres archivos:
- `public/locales/es.json`
- `public/locales/ca.json`
- `public/locales/en.json`

## Ventajas del sistema JSON

✅ **Fácil mantenimiento**: Las traducciones están separadas por idioma
✅ **Mejor performance**: Se cargan solo las traducciones necesarias
✅ **Detección automática**: El navegador detecta automáticamente el idioma
✅ **Escalabilidad**: Más fácil agregar nuevos idiomas
✅ **SEO**: Mejor para implementar i18n con Next.js

## Detección automática de idioma

Para detectar automáticamente el idioma del navegador, modifica `lib/language-context.tsx`:

```tsx
// En el useEffect inicial
const getDefaultLanguage = () => {
  if (typeof window === 'undefined') return 'es';
  
  const browserLang = navigator.language.split('-')[0];
  const supportedLanguages = ['es', 'ca', 'en'];
  
  return supportedLanguages.includes(browserLang) ? browserLang : 'es';
};

// En el useState
const [language, setLanguage] = useState<Language>(getDefaultLanguage);
```

## Estructura de archivos

```
public/
  locales/
    es.json    # Español
    ca.json    # Catalán
    en.json    # Inglés

lib/
  translations.ts     # Sistema antiguo (TypeScript)
  language-context.tsx # Contexto del idioma

hooks/
  useTranslationsJSON.ts # Hook para cargar JSON
```

## Próximos pasos

1. Migrar componentes gradualmente al sistema JSON
2. Implementar detección automática de idioma
3. Agregar más idiomas según sea necesario
4. Considerar usar librerías como `next-i18next` para funcionalidades más avanzadas
