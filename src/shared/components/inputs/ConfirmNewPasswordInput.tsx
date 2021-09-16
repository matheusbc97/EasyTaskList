import React from 'react';
import UnformInput, {AppTextInputProps} from './UnformInput';
import {useTranslation} from '@/shared/hooks';

export default function ConfirmNewPasswordInput({
  label = '',
  name = 'confirmNewPassword',
  secureTextEntry = true,
  textContentType = 'newPassword',
  autoCapitalize = 'none',
  ...rest
}: AppTextInputProps) {
  const {translation} = useTranslation();

  if (!label) {
    label = translation('CONFIRM_PASSWORD');
  }

  return (
    <UnformInput
      label={label}
      name={name}
      secureTextEntry={secureTextEntry}
      textContentType={textContentType}
      autoCapitalize={autoCapitalize}
      {...rest}
    />
  );
}
