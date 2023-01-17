import React, {PropsWithChildren} from 'react';
import {StyleProp, Text as RNText, TextStyle} from 'react-native';

import useAppTheme from '@/shared/hooks/useAppTheme';

import {TextType} from './types/TextType';
import {getTextStyle} from './utils/getTextStyle';

export interface TextProps {
  type?: TextType;
  primaryColor?: boolean;
  secondaryColor?: boolean;
  centerText?: boolean;
  testID?: string;
  style?: StyleProp<TextStyle>;
}

const Text = ({
  children,
  style,
  type,
  primaryColor = false,
  secondaryColor = false,
  centerText = false,
  testID = 'text-base',
}: PropsWithChildren<TextProps>) => {
  const theme = useAppTheme();

  const styles = getTextStyle({
    centerText,
    primaryColor,
    secondaryColor,
    theme,
    type,
  });

  return (
    <RNText style={[styles, style]} testID={testID}>
      {children}
    </RNText>
  );
};

export default Text;
