import {AppTheme} from '@/shared/models';

export const useAppThemeReturnMock = {
  primaryColor: '#21B9C7',
  secondaryColor: '#4ADDB5',
  textColor: '#424242',
  secondaryTextColor: '#bdbdbd',
  background: '#fafafa',
  aboveBackground: '#FFF',
  dark: false,
  name: 'BLUE_GREEN',
} as AppTheme;

export default () => useAppThemeReturnMock;
