import React from 'react';
import {useTranslation} from '@/modules/shared/hooks';
import {TEST_IDS} from '@/modules/shared/constants/testIds';

import TextInput, {AppTextInputProps} from '../EnhancedInput';

export default function NameInput({
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
