import React, {useRef} from 'react';

import {
  AnimatedBackground,
  Center,
  FormContainer,
  Header,
  RoundedSaveButton,
} from '@/shared/components';
import {useTranslation} from '@/shared/hooks';
import CategoryForm, {
  FormObject,
  CategoryFormHandles,
} from '@/shared/templates/forms/CategoryForm';

import {Props} from './types';
import useHandleSubmit from './hooks/useHandleSubmit';
import {Category} from '@shared/models';

const getInitialData = (category: Category) => {
  const initialData: FormObject = {
    name: category.name,
    colorIndex: category.colorIndex,
    iconIndex: category.iconIndex,
  };

  return initialData;
};

const CategoryFormScreen: React.FC<Props> = ({route}) => {
  const {translation} = useTranslation();
  const category = route.params.category;

  const formRef = useRef<CategoryFormHandles>(null);

  const handleFormSubmit = useHandleSubmit(category);

  const initialData = getInitialData(category);

  return (
    <AnimatedBackground>
      <Center>
        <FormContainer>
          <Header type="secondary" title={translation('EDIT_CATEGORY')} />

          <CategoryForm
            ref={formRef}
            onSubmitSuccess={form => handleFormSubmit(form)}
            initialValues={initialData}
          />
          <RoundedSaveButton onPress={() => formRef.current?.submitForm()} />
        </FormContainer>
      </Center>
    </AnimatedBackground>
  );
};

export default CategoryFormScreen;
