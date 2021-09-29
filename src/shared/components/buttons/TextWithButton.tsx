import React from 'react';
import {Text} from '@shared/components';
import {RectButton, RectButtonProperties} from 'react-native-gesture-handler';
import {TextStyle, View} from 'react-native';

export interface TextWithButtonProps extends RectButtonProperties {
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
    <RectButton onPress={onPress} {...rest}>
      <Text primaryColor style={textInEvidenceStyle}>
        {textInEvidence}
      </Text>
    </RectButton>
  </View>
);

export default TextWithButton;
