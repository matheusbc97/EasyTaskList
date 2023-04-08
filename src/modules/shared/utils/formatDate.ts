import {format as DateFNSFormat} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export type FormatTypes =
  | 'date'
  | 'time'
  | 'dateAndTime'
  | 'dateOfMonthAndYear'
  | 'dateOfMonth';

function getDateFormat(formatType: FormatTypes) {
  switch (formatType) {
    case 'time':
      return "HH:mm'h'";
    case 'dateAndTime':
      return "dd/MM/yyyy 'às' HH:mm'h'";
    case 'dateOfMonth':
      return 'dd MMM';
    case 'dateOfMonthAndYear':
      return "dd 'de' MMM, yyyy";
    default:
      return 'dd/MM/yyyy';
  }
}

export default function formatDate(
  value: string | Date | undefined | null,
  format: FormatTypes = 'date',
) {
  if (!value) {
    return '';
  }
  if (typeof value === 'string') {
    return DateFNSFormat(new Date(value), getDateFormat(format), {
      locale: ptBR,
    });
  }

  return DateFNSFormat(value, getDateFormat(format), {locale: ptBR});
}
