import React from 'react';
import {Text} from '@shared/components';
import {RectButton, RectButtonProperties} from 'react-native-gesture-handler';

interface Props extends RectButtonProperties {
  text: string;
  textInEvidence: string;
}

const TextButton: React.FC<Props> = ({
  onPress,
  text,
  textInEvidence,
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
      {text} <Text primaryColor>{textInEvidence}</Text>
    </Text>
  </RectButton>
);

export default TextButton;
