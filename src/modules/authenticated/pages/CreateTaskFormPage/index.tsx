import React, {useRef} from 'react';

import {
  Header,
  RoundedSaveButton,
  FormScreenWrapper,
} from '@/modules/shared/components';
import {useTranslation} from '@/modules/shared/hooks';
import TaskFormTemplate from '@/modules/shared/templates/forms/TaskForm';
import {FormHandles} from '@/modules/shared/models';

import useHandleSubmit from './hooks/useHandleSubmit';
import {Props} from './types';

const TaskForm: React.FC<Props> = () => {
  const formRef = useRef<FormHandles>(null);

  const {translation} = useTranslation();

  const handleFormSubmit = useHandleSubmit();

  return (
    <FormScreenWrapper>
      <Header type="secondary" title={translation('CREATE_TASK')} />

      <TaskFormTemplate ref={formRef} onSubmitSuccess={handleFormSubmit} />

      <RoundedSaveButton onPress={() => formRef.current?.submitForm()} />
    </FormScreenWrapper>
  );
};

export default TaskForm;
