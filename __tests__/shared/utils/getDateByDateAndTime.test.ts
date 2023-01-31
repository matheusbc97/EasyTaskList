import getDateByDateAndTime from '@/shared/utils/getDateByDateAndTime';

let mockedShowToast: jest.Mock<any, any>;

jest.mock('@/shared/components/Toast', () => {
  mockedShowToast = jest.fn();

  return {
    showToast: mockedShowToast,
  };
});

describe('getDateByDateAndTime Util', () => {
  it('should show right date', () => {
    const date = '2021-05-01T00:00:00';
    const time = '1990-01-01T04:01:00';

    const jsDate = getDateByDateAndTime(date, time);

    expect(jsDate).toEqual(new Date(2021, 4, 1, 4, 1));
  });
});
