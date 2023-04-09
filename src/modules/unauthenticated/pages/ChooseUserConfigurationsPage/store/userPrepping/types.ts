import {AppThemeName} from '@/modules/shared/models';

export interface UserPrepping {
  name?: string;
  avatar?: number;
  theme?: AppThemeName;
}

export type UserPreppingState = UserPrepping;
