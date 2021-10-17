import React from 'react';
import UnformInput, {AppTextInputProps} from '../UnformInput';
import {useTranslation} from '@/shared/hooks';

export default function EmailInput({
  label = '',
  name = 'email',
  textContentType = 'emailAddress',
  autoCapitalize = 'none',
  autoCompleteType = 'email',
  ...rest
}: AppTextInputProps) {
  const {translation} = useTranslation();

  if (!label) {
    label = translation('EMAIL');
  }

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