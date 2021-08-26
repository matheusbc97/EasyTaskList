import React from 'react';
import UnformInput, {AppTextInputProps} from './UnformInput';

export default function EmailInput({
  label = 'Email',
  name = 'email',
  textContentType = 'emailAddress',
  autoCapitalize = 'none',
  autoCompleteType = 'email',
  ...rest
}: AppTextInputProps) {
  return (
    <UnformInput
      label={label}
      name={name}
      textContentType={textContentType}
      autoCapitalize={autoCapitalize}
      autoCompleteType={autoCompleteType}
      {...rest}
    />
  );
}
