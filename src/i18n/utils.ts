import { ui, defaultLocale, type Locale } from './ui';

export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Locale;
  return defaultLocale;
}

export function useTranslations(lang: Locale) {
  return function t(key: keyof (typeof ui)[typeof defaultLocale]): string {
    return (ui[lang][key] ?? ui[defaultLocale][key]) as string;
  };
}

export const dateLocales: Record<Locale, string> = {
  pl: 'pl-PL',
  en: 'en-GB',
};
