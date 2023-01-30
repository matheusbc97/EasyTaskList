import useToastOptions, {
  showToast,
  useToastOptionsInitialState,
} from '@/shared/components/Toast/hooks/useToastOptions';
import {ShowToastOptions} from '@/shared/components/Toast/types/ShowToastOptions';
import {act, renderHook} from '@testing-library/react-native';

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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('isVisible should be true', async () => {
    const {result} = renderHook(() => useToastOptions());

    expect(mockedToastEventListener).toHaveBeenCalledTimes(1);

    act(() => {
      showToast({text: 'test'});
    });

    expect(result.current.toastOptions.isVisible).toBe(true);
  });

  it('Should reset options', async () => {
    const {result} = renderHook(() => useToastOptions());

    expect(mockedToastEventListener).toHaveBeenCalledTimes(1);

    act(() => {
      showToast({text: 'test'});
    });

    expect(result.current.toastOptions.isVisible).toBe(true);

    act(() => {
      result.current.resetOptions();
    });

    expect(result.current.toastOptions).toBe(useToastOptionsInitialState);
    expect(result.current._timeoutRef.current).toBe(null);
  });

  it('Should have timeout', async () => {
    const {result} = renderHook(() => useToastOptions());

    expect(mockedToastEventListener).toHaveBeenCalledTimes(1);

    act(() => {
      showToast({text: 'test', remain: false});
    });

    expect(result.current._timeoutRef.current).toBeTruthy();
  });

  it('Should not have timeout', async () => {
    const {result} = renderHook(() => useToastOptions());

    expect(mockedToastEventListener).toHaveBeenCalledTimes(1);

    act(() => {
      showToast({text: 'test', remain: true});
    });

    expect(result.current._timeoutRef.current).toBe(null);
  });
});
