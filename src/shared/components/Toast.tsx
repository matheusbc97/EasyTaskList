import React, {useState, useEffect, useRef, useCallback} from 'react';
import {DeviceEventEmitter} from 'react-native';

import {Snackbar} from 'react-native-paper';

type ToastType = 'success' | 'danger' | 'alert' | 'normal';

interface ToastOptions {
  type?: ToastType;
  text: string;
  isVisible: boolean;
  buttonLabel?: string;
  buttonOnPress?(): void;
}

export interface ShowToastOptions
  extends Omit<ToastOptions, 'isVisible' | 'idTimeout'> {
  remain?: boolean;
  buttonLabel?: string;
  buttonOnPress?(): void;
}

export const showToast = (toastOptions: ShowToastOptions) =>
  DeviceEventEmitter.emit('show-toast', toastOptions);

const _getToastColor = (type: ToastType) => {
  switch (type) {
    case 'alert':
      return '#ffa000';
    case 'danger':
      return '#f44336';
    case 'success':
      return '#00c853';
    default:
      return '#333';
  }
};

const initialState: ToastOptions = {
  isVisible: false,
  text: '',
  type: 'normal',
};

const Toast = () => {
  const [toastOptions, setToastOptions] = useState<ToastOptions>(initialState);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimeoutIfExists = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  useEffect(() => {
    const emitter = DeviceEventEmitter.addListener(
      'show-toast',
      (data: ShowToastOptions) => {
        clearTimeoutIfExists();

        const timeout = data.remain
          ? null
          : setTimeout(() => setToastOptions(initialState), 4000);

        timeoutRef.current = timeout;
        setToastOptions({
          ...data,
          isVisible: true,
        });
      },
    );

    return () => {
      emitter.remove();
    };
  }, [clearTimeoutIfExists]);

  if (!toastOptions.isVisible) {
    return null;
  }

  return (
    <Snackbar
      theme={{
        colors: {
          surface: 'white',
          accent: '#eceff1',
        },
      }}
      style={{
        backgroundColor: _getToastColor(
          toastOptions.type ? toastOptions.type : 'normal',
        ),
      }}
      visible={true}
      onDismiss={() => {}}
      action={{
        label: toastOptions.buttonLabel || 'Fechar',
        onPress: () => {
          clearTimeoutIfExists();
          setToastOptions(initialState);
          toastOptions.buttonOnPress && toastOptions.buttonOnPress();
        },
      }}>
      {toastOptions.text}
    </Snackbar>
  );
};

export default Toast;
