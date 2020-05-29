import React, {PropsWithChildren, useCallback} from 'react';
import {Text as RNText, TextProps, TextStyle} from 'react-native';
import {useSelector} from 'react-redux';

import {selectAppTheme} from '../../store/configs';

type TextTypes =
  | 'title'
  | 'title-big'
  | 'subtitle'
  | 'title-grey'
  | 'body'
  | 'title-medium';

interface Props extends TextProps, PropsWithChildren<Text> {
  type?: TextTypes;
}

const Text = ({children, style, type = 'body'}: Props) => {
  const theme = useSelector(selectAppTheme);

  const getStyle = useCallback(() => {
    switch (type) {
      case 'title':
        return {
          color: theme.textColor,
          fontWeight: 'bold',
        };
      case 'title-medium':
        return {
          color: theme.textColor,
          fontWeight: 'bold',
          fontSize: 18,
        };
      case 'title-big':
        return {
          color: theme.textColor,
          fontWeight: 'bold',
          fontSize: 21,
        };
      case 'title-grey':
        return {
          color: theme.secondaryTextColor,
          fontWeight: 'bold',
        };
      case 'subtitle':
        return {
          color: theme.secondaryTextColor,
          fontSize: 16,
        };
      case 'body': {
        return {
          color: theme.textColor,
        };
      }
      default:
        return {
          color: theme.textColor,
        };
    }
  }, [theme]);

  return <RNText style={[getStyle(), style]}>{children}</RNText>;
};

export default Text;
