import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import LOCALE_RU from './ru/localization';
import LOCALE_EN from './en/localization';

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        fallbackLng: 'ru',
        resources: {
            en: {
                translation: LOCALE_EN,
            },
            ru: {
                translation: LOCALE_RU,
            },
        },

    });

export default i18next;
