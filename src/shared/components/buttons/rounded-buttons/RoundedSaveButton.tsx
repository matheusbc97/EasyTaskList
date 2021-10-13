import React from 'react';

import {useTranslation} from '@/shared/hooks';

import RoundedButton, {RoundedButtonProps} from '../RoundedButton';

export default function SaveRoundedButton({
  text = '',
  style,
  onPress,
  ...rest
}: RoundedButtonProps) {
  const {translation} = useTranslation();

  if (!text) {
    text = translation('SAVE');
  }

  return (
    <RoundedButton
      text={text}
      style={[
        {
          width: 150,
          alignSelf: 'center',
        },
        style,
      ]}
      onPress={onPress}
      {...rest}
    />
  );
}
