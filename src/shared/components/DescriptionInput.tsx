import React from 'react';
import TextInput, {AppTextInputProps} from './UnformInput';
import {useTranslation} from '@/shared/hooks';

export default function DescriptionInput({
  label = '',
  name = 'description',
  ...rest
}: AppTextInputProps) {
  const {translation} = useTranslation();

  if (!label) {
    label = translation('EMAIL');
  }

  return <TextInput name={name} label={label} {...rest} />;
}
