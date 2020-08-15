import {useCallback} from 'react';
import formatDate, {FormatTypes} from '@shared/utils/fomatDate';

const useFormatDate = () =>
  useCallback(
    (date: string | Date, format?: FormatTypes) => formatDate(date, format),
    [],
  );

export default useFormatDate;
