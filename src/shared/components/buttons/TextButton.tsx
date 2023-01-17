import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import Text, {TextTypes} from '../Text';
import Button from './Button';

export interface TextButtonProps {
  text: string;
  iconName?: string;
  textType?: TextTypes;
  color?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const TextButton: React.FC<TextButtonProps> = ({
  onPress,
  text,
  style,
  iconName,
  textType,
  color,
}) => (
  <Button
    onPress={onPress}
    style={[
      {flexDirection: 'row', justifyContent: 'center', paddingVertical: 10},
      style,
    ]}>
    <Text style={{color}} type={textType}>
      {text}
    </Text>
    {!!iconName && (
      <FontAwesomeIcon
        testID="TextButtonIcon"
        style={{marginLeft: 10}}
        name={iconName}
        size={18}
        color={color}
      />
    )}
  </Button>
);

export default TextButton;
