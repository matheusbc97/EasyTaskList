import React from 'react';
import UnformInput, {AppTextInputProps} from '../EnhancedInput';
import {useTranslation} from '@/shared/hooks';
import {TEST_IDS} from '@/shared/constants/testIds';

export default function NewPasswordInput({
  label = '',
  name = 'newPassword',
  secureTextEntry = true,
  textContentType = 'newPassword',
  autoCapitalize = 'none',
  testID = TEST_IDS.NEW_PASSWORD_INPUT,
  ...rest
}: AppTextInputProps) {
  const {translation} = useTranslation();

  if (!label) {
    label = translation('PASSWORD');
  }

  return (
    <UnformInput
      testID={testID}
      label={label}
      name={name}
      secureTextEntry={secureTextEntry}
      textContentType={textContentType}
      autoCapitalize={autoCapitalize}
      {...rest}
    />
  );
}
