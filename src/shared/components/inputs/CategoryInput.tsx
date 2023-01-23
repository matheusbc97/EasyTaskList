import React from 'react';
import {useNavigation} from '@react-navigation/core';

import {useTranslation} from '@/shared/hooks';
import {Category, FormControl} from '@/shared/models';

import TextInput from './UnformInput';

interface Props {
  onCategoryChange: (category: Category) => void;
  control: FormControl;
}

function CategoryInput({onCategoryChange, control}: Props) {
  const navigation = useNavigation();

  const {translation} = useTranslation();
  return (
    <TextInput
      control={control}
      name="category"
      label={translation('CATEGORY')}
      button
      onPress={() => navigation.navigate('CategorySearch', {onCategoryChange})}
    />
  );
}

export default CategoryInput;
