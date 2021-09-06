import React, {useRef} from 'react';
import {View} from 'react-native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import {
  ScreenWrapper,
  UnformInput as TextInput,
  RoundedButton,
  Text,
  DateInput,
  TimeInput,
  CategoryInput,
} from '@shared/components';
import {useValidateField, useAppTheme, useTranslation} from '@shared/hooks';
import {Category} from '@shared/models';

import Wrapper from './components/Wrapper';
import useHandleSubmit from './hooks/useHandleSubmit';
import getInitialData from './utils/getInitialData';
import styles from './styles';
import {Props} from './types';

const TaskForm: React.FC<Props> = ({navigation, route}) => {
  const {task} = route.params ?? {
    task: null,
  };

  const initialData = getInitialData(task);

  const formRef = useRef<FormHandles>(null);

  let chosenCategory: Category | null = useRef(null).current;

  const {translation} = useTranslation();
  const appTheme = useAppTheme();

  const validateField = useValidateField(formRef);

  const handleFormSubmit = useHandleSubmit({formRef, chosenCategory, task});

  const onCategoryChange = (category: Category) => {
    if (category) {
      formRef.current?.setFieldValue('category', category.name);
    }

    chosenCategory = category;
  };

  return (
    <ScreenWrapper>
      <Wrapper>
        <Text type="title-big" primaryColor style={styles.title}>
          {!task ? translation('CREATE_TASK') : translation('EDIT_TASK')}
        </Text>
        <Form
          onSubmit={handleFormSubmit}
          ref={formRef}
          initialData={initialData}>
          <TextInput
            name="title"
            label={translation('TITLE')}
            validateField={validateField}
            onSubmitEditing={() =>
              formRef.current?.getFieldRef('description').focus()
            }
          />
          <TextInput name="description" label={translation('DESCRIPTION')} />

          <DateInput />

          <TimeInput />

          <CategoryInput onCategoryChange={onCategoryChange} />
        </Form>
        <View style={styles.footer}>
          <RoundedButton
            text={translation('GO_BACK')}
            inverted
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          />
          <RoundedButton
            text={translation('SAVE')}
            style={styles.saveButton}
            onPress={() => formRef.current?.submitForm()}
          />
        </View>
      </Wrapper>
    </ScreenWrapper>
  );
};

export default TaskForm;
