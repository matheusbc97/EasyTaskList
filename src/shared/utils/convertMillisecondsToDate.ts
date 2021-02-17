import {fromUnixTime} from 'date-fns';

export default function convertMillisecondsToDate(timestamp: number): Date {
  return fromUnixTime(timestamp / 1000);
}
