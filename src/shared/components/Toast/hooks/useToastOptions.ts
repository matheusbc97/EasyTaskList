import {useState, useRef, useCallback, useLayoutEffect} from 'react';

import {ShowToastOptions, ToastOptions} from '../types/ShowToastOptions';
import {toastEventListener, showToast} from '../toastEventListener';

export {showToast};

const initialState: ToastOptions = {
  isVisible: false,
  text: '',
  type: 'normal',
};

export default function useToastOptions() {
  const [toastOptions, setToastOptions] = useState<ToastOptions>(initialState);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimeoutIfExists = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  useLayoutEffect(() => {
    const emitter = toastEventListener((data: ShowToastOptions) => {
      clearTimeoutIfExists();

      const timeout = data.remain
        ? null
        : setTimeout(() => setToastOptions(initialState), 4000);

      timeoutRef.current = timeout;
      setToastOptions({
        ...data,
        isVisible: true,
      });
    });

    return () => {
      emitter.remove();
    };
  }, [clearTimeoutIfExists]);

  const resetOptions = () => {
    clearTimeoutIfExists();
    setToastOptions(initialState);
    toastOptions.buttonOnPress && toastOptions.buttonOnPress();
  };

  return {toastOptions, resetOptions};
}
