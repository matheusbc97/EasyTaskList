import React from 'react';
import {Snackbar} from 'react-native-paper';

import {TEST_IDS} from '@/modules/shared/constants/testIds';
import {ToastType} from './types/ShowToastOptions';
import {showToast} from './toastEventListener';
import useToastOptions from './hooks/useToastOptions';

export {showToast};

type ToastDictionary = {[key in ToastType]: string};

const TOAST_COLORS: ToastDictionary = {
  alert: '#ffa000',
  danger: '#f44336',
  success: '#00c853',
  normal: '#333',
};

const Toast = () => {
  const {toastOptions, resetOptions} = useToastOptions();

  if (!toastOptions.isVisible) {
    return null;
  }

  return (
    <Snackbar
      testID={TEST_IDS.TOAST}
      theme={{
        colors: {
          surface: 'white',
          accent: '#eceff1',
        },
      }}
      style={{
        backgroundColor:
          TOAST_COLORS[toastOptions.type ? toastOptions.type : 'normal'],
      }}
      visible={true}
      onDismiss={() => {}}
      action={{
        label: toastOptions.buttonLabel || 'Fechar',
        onPress: resetOptions,
      }}>
      {toastOptions.text}
    </Snackbar>
  );
};

export default Toast;
