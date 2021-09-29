import React from 'react';
import {View} from 'react-native';

import Text, {TextTypes} from '../Text';
import Button, {ButtonProps} from './Button';

export interface TextButtonProps extends ButtonProps {
  text: string;
  primaryColor?: boolean;
  icon?: any;
  textType?: TextTypes;
}

const TextButton: React.FC<TextButtonProps> = ({
  onPress,
  text,
  style,
  primaryColor = false,
  icon,
  textType,
  ...rest
}) => (
  <Button
    onPress={onPress}
    style={[
      {flexDirection: 'row', justifyContent: 'center', paddingVertical: 10},
      style,
    ]}
    {...rest}>
    <Text primaryColor={primaryColor} type={textType}>
      {text}
    </Text>
    {!!icon && <View style={{marginLeft: 10}}>{icon}</View>}
  </Button>
);

export default TextButton;
