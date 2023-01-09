import React, {PropsWithChildren} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {TouchableRipple} from 'react-native-paper';

export interface ButtonProps {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  disabled?: boolean;
  testID?: string;
}

function Button({
  children,
  disabled,
  onPress,
  style,
  testID = 'button-base',
}: PropsWithChildren<ButtonProps>) {
  return (
    <TouchableRipple
      testID={testID}
      style={style}
      disabled={disabled}
      onPress={onPress}>
      <>{children}</>
    </TouchableRipple>
  );
}

export default Button;
