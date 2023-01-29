import React from 'react';
import {Snackbar} from 'react-native-paper';

import {TEST_IDS} from '@/shared/constants/testIds';
import {ToastType} from './types/ShowToastOptions';
import {showToast} from './toastEventListener';
import useToastOptions from './hooks/useToastOptions';

export {showToast};

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
        backgroundColor: _getToastColor(
          toastOptions.type ? toastOptions.type : 'normal',
        ),
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
