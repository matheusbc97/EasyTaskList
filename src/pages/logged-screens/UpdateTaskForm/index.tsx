import React, {useRef} from 'react';

import {
  AnimatedBackground,
  Header,
  FormContainer,
  RoundedSaveButton,
  Center,
} from '@shared/components';
import {useTranslation} from '@shared/hooks';

import useHandleSubmit from './hooks/useHandleSubmit';
import getInitialData from './utils/getInitialData';
import {Props} from './types';
import TaskFormTemplate, {TaskFormHandles} from '../../../templates/TaskForm';

const UpdateTaskForm: React.FC<Props> = ({route}) => {
  const {task} = route.params;

  const formRef = useRef<TaskFormHandles>(null);

  const {translation} = useTranslation();

  const handleFormSubmit = useHandleSubmit({task});

  return (
    <AnimatedBackground>
      <Center>
        <FormContainer>
          <Header type="secondary" title={translation('EDIT_TASK')} />

          <TaskFormTemplate
            ref={formRef}
            onSubmitSuccess={handleFormSubmit}
            initialValues={getInitialData(task)}
          />

          <RoundedSaveButton onPress={() => formRef.current?.submitForm()} />
        </FormContainer>
      </Center>
    </AnimatedBackground>
  );
};

export default UpdateTaskForm;
