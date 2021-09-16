import React from 'react';

import TextInput from './UnformInput';
import {useTranslation} from '@/shared/hooks';
import {useNavigation} from '@react-navigation/core';
import {Category} from '@shared/models';

interface Props {
  onCategoryChange: (category: Category) => void;
}

function CategoryInput({onCategoryChange}: Props) {
  const navigation = useNavigation();

  const {translation} = useTranslation();
  return (
    <TextInput
      name="category"
      label={translation('CATEGORY')}
      button
      onPress={() => navigation.navigate('CategorySearch', {onCategoryChange})}
    />
  );
}

export default CategoryInput;
