import React, {useRef, useMemo} from 'react';

import {
  AnimatedBackground,
  Center,
  FormContainer,
  Header,
} from '@/shared/components';
import {useTranslation} from '@/shared/hooks';
import CategoryForm, {
  FormObject,
  CategoryFormHandles,
} from '@/templates/CategoryForm';

import {SaveButton} from './styles';
import {Props} from './types';
import useHandleSubmit from './hooks/useHandleSubmit';

const CategoryFormScreen: React.FC<Props> = ({route}) => {
  const {translation} = useTranslation();
  const category = route.params?.category;

  const formRef = useRef<CategoryFormHandles>(null);

  const handleFormSubmit = useHandleSubmit(category);

  const initialData = useMemo<undefined | FormObject>(() => {
    if (!category) {
      return undefined;
    }

    const _initialData: FormObject = {
      name: category.name,
      colorIndex: category.colorIndex,
      iconIndex: category.iconIndex,
    };

    return _initialData;
  }, [category]);

  return (
    <AnimatedBackground>
      <Center>
        <FormContainer>
          <Header type="secondary" title={translation('CREATE_CATEGORY')} />

          <CategoryForm
            ref={formRef}
            onSubmitSuccess={form => handleFormSubmit(form)}
            initialValues={initialData}
          />
          <SaveButton
            text={translation('SAVE')}
            onPress={() => formRef.current?.submitForm()}
          />
        </FormContainer>
      </Center>
    </AnimatedBackground>
  );
};

export default CategoryFormScreen;
