// Supported locales
export const locales = ['el', 'en'] as const;
export const defaultLocale = 'el' as const;

export type Locale = (typeof locales)[number];

// Translation messages
import elMessages from '@/messages/el.json';
import enMessages from '@/messages/en.json';

export const messages = {
  el: elMessages,
  en: enMessages,
} as const;

// Get translation function
export function getTranslations(locale: Locale) {
  const t = (key: string): any => {
    const keys = key.split('.');
    let value: any = messages[locale];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to default locale if key not found
        value = messages[defaultLocale];
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return undefined; // Return undefined if not found
          }
        }
      }
    }

    return value; // Return the actual value (string, array, object, etc.)
  };

  return t;
}

// Validate locale
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
