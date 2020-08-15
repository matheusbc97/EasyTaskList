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
}

const Text = ({
  children,
  style,
  type = 'body',
  primaryColor = false,
}: Props) => {
  const theme = useSelector(selectAppTheme);

  const getStyle = useCallback(() => {
    switch (type) {
      case 'title':
        return {
          color: primaryColor ? theme.primaryColor : theme.textColor,
          fontWeight: 'bold',
        };
      case 'title-medium':
        return {
          color: primaryColor ? theme.primaryColor : theme.textColor,
          fontWeight: 'bold',
          fontSize: 18,
        };
      case 'title-big':
        return {
          color: primaryColor ? theme.primaryColor : theme.textColor,
          fontWeight: 'bold',
          fontSize: 21,
        };
      case 'title-grey':
        return {
          color: primaryColor ? theme.primaryColor : theme.secondaryTextColor,
          fontWeight: 'bold',
        };
      case 'title-inverse':
        return {
          color: theme.aboveBackground,
          fontWeight: 'bold',
        };
      case 'subtitle':
        return {
          color: primaryColor ? theme.primaryColor : theme.secondaryTextColor,
          fontSize: 16,
        };
      case 'body': {
        return {
          color: primaryColor ? theme.primaryColor : theme.textColor,
        };
      }
      default:
        return {
          color: theme.textColor,
        };
    }
  }, [theme, type, primaryColor]);

  return <RNText style={[getStyle(), style]}>{children}</RNText>;
};

export default Text;
