import React from 'react';

import TextButton from '@/shared/components/buttons/TextButton';
import {useTranslation} from '@/shared/hooks';
import {StyleProp, ViewStyle} from 'react-native';

export interface DeleteButtonProps {
  onPress: () => void;
  style: StyleProp<ViewStyle>;
}

export default function DeleteButton({onPress, style}: DeleteButtonProps) {
  const {translation} = useTranslation();

  return (
    <TextButton
      style={style}
      text={translation('DELETE')}
      textType="title"
      iconName="trash"
      onPress={onPress}
    />
  );
}
