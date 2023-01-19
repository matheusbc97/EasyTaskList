import React from 'react';
import UnformInput, {AppTextInputProps} from '../UnformInput';
import {useTranslation} from '@/shared/hooks';
import {TEST_IDS} from '@/shared/constants/testIds';

export default function ConfirmNewPasswordInput({
  label = '',
  name = 'confirmNewPassword',
  secureTextEntry = true,
  textContentType = 'newPassword',
  autoCapitalize = 'none',
  testID = TEST_IDS.CONFIRM_NEW_PASSWORD_INPUT,
  ...rest
}: AppTextInputProps) {
  const {translation} = useTranslation();

  if (!label) {
    label = translation('CONFIRM_PASSWORD');
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
