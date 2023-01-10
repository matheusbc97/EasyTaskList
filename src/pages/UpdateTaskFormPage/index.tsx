import React, {useRef} from 'react';

import {
  Header,
  RoundedSaveButton,
  FormScreenWrapper,
} from '@/shared/components';
import {useTranslation} from '@/shared/hooks';
import TaskFormTemplate, {TaskFormHandles} from '@/shared/templates/forms/TaskForm';

import useHandleSubmit from './hooks/useHandleSubmit';
import getInitialData from './utils/getInitialData';
import {Props} from './types';

const UpdateTaskForm: React.FC<Props> = ({route}) => {
  const {task, onTaskUpdatedCallback} = route.params;

  const formRef = useRef<TaskFormHandles>(null);

  const {translation} = useTranslation();

  const handleFormSubmit = useHandleSubmit(task.id, onTaskUpdatedCallback);

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
