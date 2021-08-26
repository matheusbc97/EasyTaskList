import React from 'react';
import UnformInput, {AppTextInputProps} from './UnformInput';

export default function ConfirmNewPasswordInput({
  label = 'Confirmar Senha',
  name = 'confirmNewPassword',
  secureTextEntry = true,
  textContentType = 'newPassword',
  autoCapitalize = 'none',
  ...rest
}: AppTextInputProps) {
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
