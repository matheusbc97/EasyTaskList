import React, {PropsWithChildren, useCallback} from 'react';
import {Text as RNText, TextProps} from 'react-native';
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

interface Props extends TextProps, PropsWithChildren<Text> {
  type?: TextTypes;
  primaryColor?: boolean;
  secondaryColor?: boolean;
}

const Text = ({
  children,
  style,
  type = 'body',
  primaryColor = false,
  secondaryColor = false,
}: Props) => {
  const theme = useSelector(selectAppTheme);

  const getColor = useCallback(
    (defaultColor) => {
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
    switch (type) {
      case 'title':
        return {
          color: getColor(theme.textColor),
          fontWeight: 'bold',
        };
      case 'title-medium':
        return {
          color: getColor(theme.textColor),
          fontWeight: 'bold',
          fontSize: 18,
        };
      case 'title-big':
        return {
          color: getColor(theme.textColor),
          fontWeight: 'bold',
          fontSize: 21,
        };
      case 'title-grey':
        return {
          color: getColor(theme.secondaryTextColor),
          fontWeight: 'bold',
        };
      case 'title-inverse':
        return {
          color: getColor(theme.aboveBackground),
          fontWeight: 'bold',
        };
      case 'subtitle':
        return {
          color: getColor(theme.secondaryTextColor),
          fontSize: 16,
        };
      case 'body': {
        return {
          color: getColor(theme.textColor),
        };
      }
      default:
        return {
          color: getColor(theme.textColor),
        };
    }
  }, [theme, type, getColor]);

  return <RNText style={[getStyle(), style]}>{children}</RNText>;
};

export default Text;
