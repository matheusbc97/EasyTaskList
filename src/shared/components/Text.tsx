import React, {PropsWithChildren, useCallback} from 'react';
import {StyleProp, Text as RNText, TextStyle} from 'react-native';
import useAppTheme from '@/shared/hooks/useAppTheme';

export type TextTypes =
  | 'title'
  | 'title-big'
  | 'subtitle'
  | 'title-grey'
  | 'body'
  | 'title-medium'
  | 'title-inverse';

export interface TextProps {
  type?: TextTypes;
  primaryColor?: boolean;
  secondaryColor?: boolean;
  centerText?: boolean;
  testID?: string;
  style?: StyleProp<TextStyle>;
}

const Text = ({
  children,
  style,
  type = 'body',
  primaryColor = false,
  secondaryColor = false,
  centerText = false,
  testID = 'text-base',
}: PropsWithChildren<TextProps>) => {
  const theme = useAppTheme();

  const getColor = useCallback(
    (defaultColor: string) => {
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

  return (
    <RNText style={[getStyle(), style]} testID={testID}>
      {children}
    </RNText>
  );
};

export default Text;
