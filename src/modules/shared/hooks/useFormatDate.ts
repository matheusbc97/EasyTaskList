import {useCallback} from 'react';
import formatDate, {FormatTypes} from '@/modules/shared/utils/formatDate';

export const useFormatDate = () =>
  useCallback(
    (date: string | Date, format?: FormatTypes) => formatDate(date, format),
    [],
  );
