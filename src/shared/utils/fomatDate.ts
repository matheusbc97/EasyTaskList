import {format as DateFNSFormat} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export type FormatTypes =
  | 'date'
  | 'time'
  | 'dateAndTime'
  | 'dateOfMotnhAndYear';

function getDateFormat(formatType: FormatTypes) {
  switch (formatType) {
    case 'time':
      return "HH:mm'h'";
    case 'dateAndTime':
      return "dd/MM/yyyy 'às' HH:mm'h'";
    case 'dateOfMotnhAndYear':
      return "dd 'de' MMM, yyyy";
    default:
      return 'dd/MM/yyyy';
  }
}

export default function formatDate(
  value: string | Date,
  format: FormatTypes = 'date',
) {
  if (typeof value === 'string') {
    return DateFNSFormat(new Date(value), getDateFormat(format), {
      locale: ptBR,
    });
  }

  return DateFNSFormat(value, getDateFormat(format), {locale: ptBR});
}
