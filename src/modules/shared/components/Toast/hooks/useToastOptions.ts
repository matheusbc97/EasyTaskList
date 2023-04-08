import {useState, useRef, useCallback, useEffect} from 'react';

import {ShowToastOptions, ToastOptions} from '../types/ShowToastOptions';
import {toastEventListener, showToast} from '../toastEventListener';

export {showToast};

export const useToastOptionsInitialState: ToastOptions = {
  isVisible: false,
  text: '',
  type: 'normal',
};

export default function useToastOptions() {
  const [toastOptions, setToastOptions] = useState<ToastOptions>(
    useToastOptionsInitialState,
  );
  const _timeoutRef = useRef<NodeJS.Timeout | null>(null);
  console.log('_timeoutRef', _timeoutRef.current);

  const clearTimeoutIfExists = useCallback(() => {
    if (_timeoutRef.current) {
      clearTimeout(_timeoutRef.current);
      _timeoutRef.current = null;
    }
  }, []);

  const resetOptions = useCallback(() => {
    clearTimeoutIfExists();
    setToastOptions(useToastOptionsInitialState);
  }, [clearTimeoutIfExists]);

  useEffect(() => {
    const emitter = toastEventListener((data: ShowToastOptions) => {
      clearTimeoutIfExists();

      if (!data.remain) {
        _timeoutRef.current = setTimeout(resetOptions, 4000);
      }

      setToastOptions({
        ...data,
        isVisible: true,
      });
    });

    return () => {
      emitter.remove();
    };
  }, [resetOptions, clearTimeoutIfExists]);

  return {toastOptions, resetOptions, _timeoutRef};
}
