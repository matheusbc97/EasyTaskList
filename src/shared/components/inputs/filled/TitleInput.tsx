import React from 'react';
import TextInput, {AppTextInputProps} from '../EnhancedInput';
import {useTranslation} from '@/shared/hooks';

export default function DescriptionInput({
  label = '',
  name = 'title',
  ...rest
}: AppTextInputProps) {
  const {translation} = useTranslation();

  if (!label) {
    label = translation('TITLE');
  }

  return <TextInput name={name} label={label} {...rest} />;
}
