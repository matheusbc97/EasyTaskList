import formatDate from '@/modules/shared/utils/formatDate';

const date = new Date(2023, 4, 1, 4, 10, 10); // 2023-05-01T04:10:10

describe('formatDate Util', () => {
  it('Should format date as 01/05/2023', () => {
    const dateFormatted = formatDate(date, 'date');

    expect(dateFormatted).toBe('01/05/2023');

    const dateFormattedDefault = formatDate(date);

    expect(dateFormattedDefault).toBe('01/05/2023');
  });

  it('Should format time as 04:10h', () => {
    const dateFormatted = formatDate(date, 'time');

    expect(dateFormatted).toBe('04:10h');
  });

  it('Should format date and time as 04:10h', () => {
    const dateFormatted = formatDate(date, 'dateAndTime');

    expect(dateFormatted).toBe('01/05/2023 às 04:10h');
  });

  it('Should format date as 01 de MAR', () => {
    const dateFormatted = formatDate(date, 'dateOfMonthAndYear');

    expect(dateFormatted).toBe('01 de mai, 2023');
  });

  it('Should format date as  01 MAR', () => {
    const dateFormatted = formatDate(date, 'dateOfMonth');

    expect(dateFormatted).toBe('01 mai');
  });

  it('Should return empty when date is undefined', () => {
    const dateFormatted = formatDate(undefined);

    expect(dateFormatted).toBe('');
  });
});
