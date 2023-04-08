import React from 'react';
import TextInput, {AppTextInputProps} from '../EnhancedInput';
import {useTranslation} from '@/modules/shared/hooks';

export default function DescriptionInput({
  label = '',
  name = 'description',
  ...rest
}: AppTextInputProps) {
  const {translation} = useTranslation();

  if (!label) {
    label = translation('DESCRIPTION');
  }

  return <TextInput name={name} label={label} {...rest} />;
}
