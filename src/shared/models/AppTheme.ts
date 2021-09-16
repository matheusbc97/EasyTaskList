import {AppThemeName} from '@shared/models/AppThemeName';
export type AppTheme = {
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  secondaryTextColor: string;
  background: string;
  aboveBackground: string;
  dark: boolean;
  name: AppThemeName;
};
