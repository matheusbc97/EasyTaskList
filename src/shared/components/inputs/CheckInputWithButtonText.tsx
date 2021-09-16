import React from 'react';
import {View} from 'react-native';

import TextButton from '@shared/components/buttons/TextButton';
import CheckInput from './CheckInput';

interface CheckInputWithButtonTextProps {
  value: boolean;
  onChange: (value: boolean) => void;
  onTextInEvidencePress: () => void;
  text: string;
  textInEvidence: string;
}

function CheckInputWithButtonText({
  value,
  onChange,
  onTextInEvidencePress,
  text,
  textInEvidence,
}: CheckInputWithButtonTextProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <CheckInput value={value} onChange={onChange} />

      <TextButton
        style={{flex: 1}}
        onPress={onTextInEvidencePress}
        text={text}
        textInEvidence={textInEvidence}
      />
    </View>
  );
}

export default CheckInputWithButtonText;
