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
  CategoryFormHandles,
} from '@/templates/forms/CategoryForm';

import {Props} from './types';
import useHandleSubmit from './hooks/useHandleSubmit';

const CategoryFormScreen: React.FC<Props> = ({}) => {
  const {translation} = useTranslation();

  const formRef = useRef<CategoryFormHandles>(null);

  const handleFormSubmit = useHandleSubmit();

  return (
    <AnimatedBackground>
      <Center>
        <FormContainer>
          <Header type="secondary" title={translation('CREATE_CATEGORY')} />

          <CategoryForm
            ref={formRef}
            onSubmitSuccess={form => handleFormSubmit(form)}
          />
          <RoundedSaveButton onPress={() => formRef.current?.submitForm()} />
        </FormContainer>
      </Center>
    </AnimatedBackground>
  );
};

export default CategoryFormScreen;
