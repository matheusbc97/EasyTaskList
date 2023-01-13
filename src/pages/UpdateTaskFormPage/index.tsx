import React, {useRef} from 'react';

import {
  Header,
  RoundedSaveButton,
  FormScreenWrapper,
} from '@/shared/components';
import {useTranslation, useUpdateTask} from '@/shared/hooks';
import TaskFormTemplate, {
  TaskFormHandles,
} from '@/shared/templates/forms/TaskForm';

import getInitialData from './utils/getInitialData';
import {FormObject} from '@/shared/templates/forms/TaskForm';
import {Props} from './types';
import getDateByDateAndTime from '@/shared/utils/getDateByDateAndTime';

const UpdateTaskForm: React.FC<Props> = ({route, navigation}) => {
  const {task, onTaskUpdatedCallback} = route.params;

  const formRef = useRef<TaskFormHandles>(null);

  const {translation} = useTranslation();

  const updateTask = useUpdateTask();

  const handleFormSubmit = (form: FormObject) => {
    updateTask({
      taskId: task.id,
      title: form.title,
      description: form.description,
      //category: form.category,
      date: getDateByDateAndTime(form.date, form.time).toISOString(),
    });
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
};

export default UpdateTaskForm;
