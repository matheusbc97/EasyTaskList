import React from 'react';
import {View} from 'react-native';

import TextWithButton from '@/shared/components/buttons/TextWithButton';
import CheckInput from './CheckInput';

interface CheckInputWithButtonTextProps {
  value: boolean;
  onChange: (value: boolean) => void;
  onTextInEvidencePress: () => void;
  text: string;
  textInEvidence: string;
  testID?: string;
}

function CheckInputWithButtonText({
  value,
  onChange,
  onTextInEvidencePress,
  text,
  textInEvidence,
  testID,
}: CheckInputWithButtonTextProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <CheckInput testID={testID} value={value} onChange={onChange} />

      <TextWithButton
        style={{flex: 1}}
        onPress={onTextInEvidencePress}
        text={text}
        textInEvidence={textInEvidence}
      />
    </View>
  );
}

export default CheckInputWithButtonText;
