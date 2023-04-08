import React, {useRef} from 'react';

import {
  Header,
  RoundedSaveButton,
  FormScreenWrapper,
} from '@/modules/shared/components';
import {useTranslation, useCreateCategory} from '@/modules/shared/hooks';
import CategoryForm, {
  CategoryFormHandles,
} from '@/modules/shared/templates/forms/CategoryForm';

import {Props} from './types';

function CategoryFormPage({navigation}: Props) {
  const {translation} = useTranslation();

  const formRef = useRef<CategoryFormHandles>(null);

  const createCategory = useCreateCategory({
    onSuccess: () => {
      navigation.goBack();
    },
  });

  return (
    <FormScreenWrapper>
      <Header type="secondary" title={translation('CREATE_CATEGORY')} />

      <CategoryForm ref={formRef} onSubmitSuccess={createCategory} />
      <RoundedSaveButton onPress={() => formRef.current?.submitForm()} />
    </FormScreenWrapper>
  );
}

export default CategoryFormPage;
