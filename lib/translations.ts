// Deprecated translations module.
// All translations are now fetched dynamically from /public/locales via LanguageProvider.
// This stub is kept only to avoid breaking any lingering imports.

export const translations: Record<string, any> = {};
export function getTranslation(language: string) {
  return {};
}
