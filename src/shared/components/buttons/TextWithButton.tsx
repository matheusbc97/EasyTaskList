import React from 'react';
import {Text} from '@shared/components';
import {TextStyle, View} from 'react-native';

import Button, {ButtonProps} from './Button';

export interface TextWithButtonProps extends ButtonProps {
  text: string;
  textInEvidence: string;
  textInEvidenceStyle?: TextStyle;
}

const TextWithButton: React.FC<TextWithButtonProps> = ({
  onPress,
  text,
  textInEvidence,
  textInEvidenceStyle,
  style,
  ...rest
}) => (
  <View
    style={[
      {flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'},
      style,
    ]}>
    <Text>{text}</Text>
    <Button onPress={onPress} {...rest}>
      <Text primaryColor style={textInEvidenceStyle}>
        {textInEvidence}
      </Text>
    </Button>
  </View>
);

export default TextWithButton;
