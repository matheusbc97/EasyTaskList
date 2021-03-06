import {AppThemeName} from './AppThemeName';

export type User = {
  uid: string;
  email: string;
  name: string;
  avatar?: number;
  image?: string;
  theme: AppThemeName;
};
