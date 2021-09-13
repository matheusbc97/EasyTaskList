import React, {PropsWithChildren, useCallback} from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from 'react-native';
import {useSelector} from 'react-redux';

import {selectAppTheme} from '../../store/configs';

type TextTypes =
  | 'title'
  | 'title-big'
  | 'subtitle'
  | 'title-grey'
  | 'body'
  | 'title-medium'
  | 'title-inverse';

export interface TextProps extends RNTextProps, PropsWithChildren<Text> {
  type?: TextTypes;
  primaryColor?: boolean;
  secondaryColor?: boolean;
  centerText?: boolean;
}

const Text = ({
  children,
  style,
  type = 'body',
  primaryColor = false,
  secondaryColor = false,
  centerText = false,
}: TextProps) => {
  const theme = useSelector(selectAppTheme);

  const getColor = useCallback(
    defaultColor => {
      if (primaryColor) {
        return theme.primaryColor;
      }

      if (secondaryColor) {
        return theme.secondaryColor;
      }

      return defaultColor;
    },
    [theme, primaryColor, secondaryColor],
  );

  const getStyle: any = useCallback(() => {
    let textStyle: TextStyle = {};

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
      case 'body': {
        textStyle = {
          color: getColor(theme.textColor),
        };
        break;
      }
      default:
        textStyle = {
          color: getColor(theme.textColor),
        };
        break;
    }

    if (centerText) {
      textStyle.textAlign = 'center';
    }

    return textStyle;
  }, [theme, type, getColor, centerText]);

  return <RNText style={[getStyle(), style]}>{children}</RNText>;
};

export default Text;
