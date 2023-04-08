import {handleErrorMessage} from '@/modules/shared/utils/errorHandler';

let mockedShowToast: jest.Mock<any, any>;

jest.mock('@/shared/components/Toast', () => {
  mockedShowToast = jest.fn();

  return {
    showToast: mockedShowToast,
  };
});

describe('handleErrorMessage Util', () => {
  it('should show toast error message', () => {
    handleErrorMessage('error message');

    expect(mockedShowToast).toHaveBeenCalledTimes(1);
  });
});
