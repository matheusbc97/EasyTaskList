import React from 'react';
import {Platform} from 'react-native';
import {Checkbox, Switch} from 'react-native-paper';

interface CheckInputProps {
  value: boolean;
  onChange: (value: boolean) => void;
  testID?: string;
}

export default function CheckInput({value, onChange, testID}: CheckInputProps) {
  if (Platform.OS === 'ios') {
    return (
      <Switch
        testID={testID}
        style={{marginHorizontal: 10}}
        value={value}
        onValueChange={_value => onChange(_value)}
      />
    );
  }

  return (
    <Checkbox
      status={value ? 'checked' : 'unchecked'}
      onPress={() => onChange(!value)}
    />
  );
}
