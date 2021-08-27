import {useCallback} from 'react';
import {useTranslation as useI18NextTranslation} from 'react-i18next';

import {tKeys} from '@/translations';

type Translation = (key: keyof typeof tKeys) => string;

const useTranslation = () => {
  const {t} = useI18NextTranslation();

  const translation: Translation = useCallback(key => t(key), [t]);

  return {translation};
};

export default useTranslation;
