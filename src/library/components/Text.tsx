import React, {PropsWithChildren} from 'react';
import {Text as RNText, TextProps, TextStyle} from 'react-native';

type TextTypes = 'title' | 'title-big' | 'subtitle' | 'title-grey' | 'body';

interface Props extends TextProps, PropsWithChildren<Text> {
  type?: TextTypes;
}

const getStyle = (name: TextTypes): TextStyle => {
  switch (name) {
    case 'title':
      return {
        color: '#424242',
        fontWeight: 'bold',
      };
    case 'title-big':
      return {
        color: '#424242',
        fontWeight: 'bold',
        fontSize: 21,
      };
    case 'title-grey':
      return {
        color: '#bdbdbd',
        fontWeight: 'bold',
      };
    case 'subtitle':
      return {
        color: '#bdbdbd',
        fontSize: 16,
      };
    case 'body': {
      return {
        color: '#424242',
      };
    }
    default:
      return {
        color: '#424242',
      };
  }
};

const Text = ({children, style, type = 'body'}: Props) => {
  return <RNText style={[getStyle(type), style]}>{children}</RNText>;
};

export default Text;
