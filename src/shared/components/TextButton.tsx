import React from 'react';
import {Text} from '@shared/components';
import {RectButton, RectButtonProperties} from 'react-native-gesture-handler';
import {TextStyle} from 'react-native';

interface Props extends RectButtonProperties {
  text: string;
  textInEvidence: string;
  textInEvidenceStyle?: TextStyle;
}

const TextButton: React.FC<Props> = ({
  onPress,
  text,
  textInEvidence,
  textInEvidenceStyle,
  style,
  ...rest
}) => (
  <RectButton
    style={[
      {
        alignSelf: 'center',
      },
      style,
    ]}
    onPress={onPress}
    {...rest}>
    <Text>
      {text}{' '}
      <Text primaryColor style={textInEvidenceStyle}>
        {textInEvidence}
      </Text>
    </Text>
  </RectButton>
);

export default TextButton;
