import {TextStyle} from 'react-native';

import {AppTheme} from '@/shared/models';

import {TextType} from '../types/TextType';
import {initGetColor} from './initGetColor';

interface GetTextStyle {
  primaryColor: boolean;
  secondaryColor: boolean;
  theme: AppTheme;
  type?: TextType;
  centerText: boolean;
}

export const getTextStyle = ({
  primaryColor,
  secondaryColor,
  theme,
  type,
  centerText,
}: GetTextStyle) => {
  let textStyle: TextStyle = {};
  const getColor = initGetColor({
    primaryColor,
    secondaryColor,
    theme,
  });

  switch (type) {
    case 'title':
      textStyle = {
        color: getColor(theme.textColor),
        fontWeight: 'bold',
      };
      break;
    case 'title-medium':
      textStyle = {
        color: getColor(theme.textColor),
        fontWeight: 'bold',
        fontSize: 18,
      };
      break;
    case 'title-big':
      textStyle = {
        color: getColor(theme.textColor),
        fontWeight: 'bold',
        fontSize: 21,
      };
      break;
    case 'title-grey':
      textStyle = {
        color: getColor(theme.secondaryTextColor),
        fontWeight: 'bold',
      };
      break;
    case 'title-inverse':
      textStyle = {
        color: getColor(theme.aboveBackground),
        fontWeight: 'bold',
      };
      break;
    case 'subtitle':
      textStyle = {
        color: getColor(theme.secondaryTextColor),
        fontSize: 16,
      };
      break;
    default: {
      //'body'
      textStyle = {
        color: getColor(theme.textColor),
      };
      break;
    }
  }

  if (centerText) {
    textStyle.textAlign = 'center';
  }

  return textStyle;
};
