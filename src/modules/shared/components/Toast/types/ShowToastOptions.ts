export type ToastType = 'success' | 'danger' | 'alert' | 'normal';

export interface ToastOptions {
  type?: ToastType;
  text: string;
  isVisible: boolean;
  buttonLabel?: string;
}

export interface ShowToastOptions
  extends Omit<ToastOptions, 'isVisible' | 'idTimeout'> {
  remain?: boolean;
  buttonLabel?: string;
}
