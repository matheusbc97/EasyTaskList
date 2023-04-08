import {AppTheme} from '@/modules/shared/models';

interface InitGetColor {
  primaryColor: boolean;
  secondaryColor: boolean;
  theme: AppTheme;
}

export function initGetColor({
  primaryColor,
  secondaryColor,
  theme,
}: InitGetColor) {
  return (defaultColor: string) => {
    if (primaryColor) {
      return theme.primaryColor;
    }

    if (secondaryColor) {
      return theme.secondaryColor;
    }

    return defaultColor;
  };
}
