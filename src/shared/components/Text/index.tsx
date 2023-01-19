import React, {PropsWithChildren} from 'react';
import {StyleProp, Text as RNText, TextStyle} from 'react-native';

import {useAppTheme} from '@/shared/hooks';

import {TextType} from './types/TextType';
import {getTextStyle} from './utils/getTextStyle';
import {TEST_IDS} from '@/shared/constants/testIds';

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
  testID = TEST_IDS.TEXT_BASE,
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
