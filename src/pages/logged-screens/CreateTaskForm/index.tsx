import React, {useRef} from 'react';

import {
  AnimatedBackground,
  Header,
  FormContainer,
  RoundedSaveButton,
  Center,
} from '@shared/components';
import {useTranslation} from '@shared/hooks';
import TaskFormTemplate, {TaskFormHandles} from '@/templates/TaskForm';

import useHandleSubmit from './hooks/useHandleSubmit';
import {Props} from './types';

const TaskForm: React.FC<Props> = () => {
  const formRef = useRef<TaskFormHandles>(null);

  const {translation} = useTranslation();

  const handleFormSubmit = useHandleSubmit();

  return (
    <AnimatedBackground>
      <Center>
        <FormContainer>
          <Header type="secondary" title={translation('CREATE_TASK')} />

          <TaskFormTemplate ref={formRef} onSubmitSuccess={handleFormSubmit} />

          <RoundedSaveButton onPress={() => formRef.current?.submitForm()} />
        </FormContainer>
      </Center>
    </AnimatedBackground>
  );
};

export default TaskForm;
