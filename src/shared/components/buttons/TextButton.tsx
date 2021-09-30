import React from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import Text, {TextTypes} from '../Text';
import Button, {ButtonProps} from './Button';

export interface TextButtonProps extends ButtonProps {
  text: string;
  iconName?: string;
  textType?: TextTypes;
  color?: string;
}

const TextButton: React.FC<TextButtonProps> = ({
  onPress,
  text,
  style,
  iconName,
  textType,
  color,
  ...rest
}) => (
  <Button
    onPress={onPress}
    style={[
      {flexDirection: 'row', justifyContent: 'center', paddingVertical: 10},
      style,
    ]}
    {...rest}>
    <Text style={{color}} type={textType}>
      {text}
    </Text>
    {!!iconName && (
      <FontAwesomeIcon
        style={{marginLeft: 10}}
        name={iconName}
        size={18}
        color={color}
      />
    )}
  </Button>
);

export default TextButton;
