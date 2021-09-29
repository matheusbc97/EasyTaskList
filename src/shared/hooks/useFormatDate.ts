import {useCallback} from 'react';
import formatDate, {FormatTypes} from '@shared/utils/formatDate';

const useFormatDate = () =>
  useCallback(
    (date: string | Date, format?: FormatTypes) => formatDate(date, format),
    [],
  );

export default useFormatDate;
