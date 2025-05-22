import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en.json';
import heTranslation from './locales/he.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      he: {
        translation: heTranslation
      }
    },
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false // not needed for React
    },
    // RTL support
    supportedLngs: ['en', 'he'],
    // Language direction mapping
    dir: (lng) => {
      return lng === 'he' ? 'rtl' : 'ltr';
    }
  });

export default i18n;
