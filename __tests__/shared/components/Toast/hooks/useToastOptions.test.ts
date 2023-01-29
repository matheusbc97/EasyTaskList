import useToastOptions, {
  showToast,
} from '@/shared/components/Toast/hooks/useToastOptions';
import {ShowToastOptions} from '@/shared/components/Toast/types/ShowToastOptions';
import {act, renderHook, waitFor} from '@testing-library/react-native';

let mockedToastEventListener: jest.Mock<any, any>;
let mockedShowToast: jest.Mock<any, any>;
let mockListenerFunction: Function;

type ToastListener = (data: ShowToastOptions) => void;

jest.mock('@/shared/components/Toast/toastEventListener', () => {
  mockedToastEventListener = jest.fn((listener: ToastListener) => {
    mockListenerFunction = listener;
    return {remove: () => {}};
  });

  mockedShowToast = jest.fn((data: ShowToastOptions) => {
    mockListenerFunction?.(data);
  });

  return {
    toastEventListener: mockedToastEventListener,
    showToast: mockedShowToast,
  };
});

describe('useToastOptions hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should be visible', async () => {
    const {result} = renderHook(() => useToastOptions());

    expect(mockedToastEventListener).toHaveBeenCalledTimes(1);

    act(() => {
      showToast({text: 'test'});
    });

    expect(result.current.toastOptions.isVisible).toBe(true);
  });
});
