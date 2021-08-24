import React from 'react';
import {Text} from '@shared/components';
import {RectButton, RectButtonProperties} from 'react-native-gesture-handler';
import {TextStyle, View} from 'react-native';

export interface TextButtonProps extends RectButtonProperties {
  text: string;
  textInEvidence: string;
  textInEvidenceStyle?: TextStyle;
}

const TextButton: React.FC<TextButtonProps> = ({
  onPress,
  text,
  textInEvidence,
  textInEvidenceStyle,
  style,
  ...rest
}) => (
  <View style={[{flexDirection: 'row', alignItems: 'center'}, style]}>
    <Text>{text}</Text>
    <RectButton style={{marginLeft: 5}} onPress={onPress} {...rest}>
      <Text primaryColor style={textInEvidenceStyle}>
        {textInEvidence}
      </Text>
    </RectButton>
  </View>
);

export default TextButton;
