import {DeviceEventEmitter} from 'react-native';
import {ShowToastOptions} from './types/ShowToastOptions';

export const showToast = (toastOptions: ShowToastOptions) =>
  DeviceEventEmitter.emit('show-toast', toastOptions);

export const toastEventListener = (
  listener: (data: ShowToastOptions) => void,
) => {
  return DeviceEventEmitter.addListener('show-toast', listener);
};
