import React from 'react';
import TextInput, {AppTextInputProps} from './UnformInput';
import {useTranslation} from '@/shared/hooks';

export default function NewPasswordInput({
  label = '',
  name = 'name',
  ...rest
}: AppTextInputProps) {
  const {translation} = useTranslation();

  if (!label) {
    label = translation('NAME');
  }

  return <TextInput label={label} name={name} {...rest} />;
}
