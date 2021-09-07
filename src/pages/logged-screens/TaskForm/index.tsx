import React, {useRef} from 'react';

import {
  AnimatedBackground,
  Header,
  FormContainer,
  RoundedSaveButton,
} from '@shared/components';
import {useTranslation} from '@shared/hooks';

import Center from './components/Center';
import useHandleSubmit from './hooks/useHandleSubmit';
import getInitialData from './utils/getInitialData';
import {Props} from './types';
import TaskFormTemplate, {TaskFormHandles} from './templates/TaskForm';

const TaskForm: React.FC<Props> = ({route}) => {
  const {task} = route.params ?? {
    task: null,
  };

  const formRef = useRef<TaskFormHandles>(null);

  const {translation} = useTranslation();

  const handleFormSubmit = useHandleSubmit({task, formRef});

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

export default TaskForm;
