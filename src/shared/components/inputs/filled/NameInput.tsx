import React from 'react';
import {useTranslation} from '@/shared/hooks';
import {TEST_IDS} from '@/shared/constants/testIds';

import TextInput, {AppTextInputProps} from '../UnformInput';

export default function NewPasswordInput({
  label = '',
  name = 'name',
  testID = TEST_IDS.NEW_PASSWORD_INPUT,
  ...rest
}: AppTextInputProps) {
  const {translation} = useTranslation();

  if (!label) {
    label = translation('NAME');
  }

  return <TextInput testID={testID} label={label} name={name} {...rest} />;
}
