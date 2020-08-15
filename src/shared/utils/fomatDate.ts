import {format as DateFNSFormat} from 'date-fns';

export type FormatTypes = 'date' | 'time' | 'dateAndTime';

function getDateFormat(formatType: FormatTypes) {
  switch (formatType) {
    case 'time':
      return "HH:mm'h'";
    case 'dateAndTime':
      return "dd/MM/yyyy 'às' HH:mm'h'";
    default:
      return 'dd/MM/yyyy';
  }
}

export default function formatDate(
  value: string | Date,
  format: FormatTypes = 'date',
) {
  if (typeof value === 'string') {
    return DateFNSFormat(new Date(value), getDateFormat(format));
  }

  return DateFNSFormat(value, getDateFormat(format));
}
