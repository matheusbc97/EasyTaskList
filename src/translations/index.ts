import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './languages/en';
import ptBR from './languages/pt-BR';

import tKeys from './keys';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    ptBR: {
      translation: ptBR,
    },
  },
  interpolation: {
    escapeValue: false,
  },
  lng: 'en',
});

export default i18n;

export {tKeys};
