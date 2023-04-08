import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';

import TextButton from '@/modules/shared/components/buttons/TextButton';
import {useAppTheme} from '@/modules/shared/hooks';
import {useTranslation} from '@/modules/shared/hooks';

export interface EditButtonProps {
  onPress: () => void;
  style: StyleProp<ViewStyle>;
}

export default function EditButton({onPress, style}: EditButtonProps) {
  const {translation} = useTranslation();
  const {primaryColor} = useAppTheme();

  return (
    <TextButton
      onPress={onPress}
      style={style}
      text={translation('EDIT')}
      textType="title"
      color={primaryColor}
      iconName="pencil"
    />
  );
}
