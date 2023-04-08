import React, {useRef} from 'react';

import {
  Header,
  RoundedSaveButton,
  FormScreenWrapper,
} from '@/modules/shared/components';
import {useTranslation, useUpdateTask} from '@/modules/shared/hooks';
import TaskFormTemplate, {
  TaskFormHandles,
} from '@/modules/shared/templates/forms/TaskForm';

import getInitialData from './utils/getInitialData';
import {FormObject} from '@/modules/shared/templates/forms/TaskForm';
import {Props} from './types';
import getDateByDateAndTime from '@/modules/shared/utils/getDateByDateAndTime';

function UpdateTaskFormPage({route, navigation}: Props) {
  const {task} = route.params;

  const formRef = useRef<TaskFormHandles>(null);

  const {translation} = useTranslation();

  const updateTask = useUpdateTask();

  const handleFormSubmit = (form: FormObject) => {
    updateTask({
      taskId: task.id,
      title: form.title,
      description: form.description,
      categoryId: form.category.id,
      date: getDateByDateAndTime(form.date, form.time).toISOString(),
    });
    navigation.goBack();
  };

  return (
    <FormScreenWrapper>
      <Header type="secondary" title={translation('EDIT_TASK')} />

      <TaskFormTemplate
        ref={formRef}
        onSubmitSuccess={handleFormSubmit}
        initialValues={getInitialData(task)}
      />

      <RoundedSaveButton onPress={() => formRef.current?.submitForm()} />
    </FormScreenWrapper>
  );
}

export default UpdateTaskFormPage;
