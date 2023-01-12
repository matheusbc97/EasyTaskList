import React from 'react';
import {useNavigation} from '@react-navigation/core';

import {useTranslation} from '@/shared/hooks';
import {Category} from '@/shared/models';

import TextInput from './UnformInput';

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
