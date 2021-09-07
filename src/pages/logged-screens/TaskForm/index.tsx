import React, {useRef} from 'react';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import {
  RoundedButton,
  DateInput,
  TimeInput,
  CategoryInput,
  AnimatedBackground,
  Header,
  FormContainer,
  DescriptionInput,
  TitleInput,
  SaveRoundedButton,
} from '@shared/components';
import {useValidateField, useTranslation} from '@shared/hooks';
import {Category} from '@shared/models';

import Center from './components/Center';
import useHandleSubmit from './hooks/useHandleSubmit';
import getInitialData from './utils/getInitialData';
import styles from './styles';
import {Props} from './types';

const TaskForm: React.FC<Props> = ({route}) => {
  const {task} = route.params ?? {
    task: null,
  };

  const initialData = getInitialData(task);

  const formRef = useRef<FormHandles>(null);

  let chosenCategory: Category | null = useRef(null).current;

  const {translation} = useTranslation();

  const validateField = useValidateField(formRef);

  const handleFormSubmit = useHandleSubmit({formRef, chosenCategory, task});

  const onCategoryChange = (category: Category) => {
    if (category) {
      formRef.current?.setFieldValue('category', category.name);
    }

    chosenCategory = category;
  };

  return (
    <AnimatedBackground>
      <Center>
        <FormContainer>
          <Header
            type="secondary"
            title={
              !task ? translation('CREATE_TASK') : translation('EDIT_TASK')
            }
          />

          <Form
            onSubmit={handleFormSubmit}
            ref={formRef}
            initialData={initialData}>
            <TitleInput
              validateField={validateField}
              onSubmitEditing={() =>
                formRef.current?.getFieldRef('description').focus()
              }
            />

            <DescriptionInput />

            <DateInput />

            <TimeInput />

            <CategoryInput onCategoryChange={onCategoryChange} />
          </Form>

          <SaveRoundedButton onPress={() => formRef.current?.submitForm()} />
        </FormContainer>
      </Center>
    </AnimatedBackground>
  );
};

export default TaskForm;
