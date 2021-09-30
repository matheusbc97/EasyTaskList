import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {OutlineButton} from '@/shared/components';
import {useTranslation} from '@/shared/hooks';

export default function CreateNewCategoryButton() {
  const {translation} = useTranslation();
  const navigation = useNavigation();

  return (
    <OutlineButton
      iconName="plus"
      text={translation('CREATE_CATEGORY')}
      onPress={() => navigation.navigate('CreateCategoryForm')}
    />
  );
}
