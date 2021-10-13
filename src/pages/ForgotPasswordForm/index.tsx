import React, {useRef} from 'react';

import {
  Text,
  FormScreenWrapper,
  BackButton,
  RoundedButton,
  EmailInput,
} from '@shared/components';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import {useValidateField} from '@shared/hooks';
import styled from 'styled-components/native';
import useHandleSubmit from './hooks/useHandleSubmit';

import {useTranslation} from '@/shared/hooks';

const RecoverPasswordText = styled(Text)`
  align-self: center;
  margin: 10px 0;
`;

const SendButton = styled(RoundedButton)`
  align-self: center;
  margin: 5px 0;
`;

const ForgotPasswordForm = styled(Form)`
  margin-top: 5px;
`;

function ForgotPasswordFormPage() {
  const formRef = useRef<FormHandles>(null);

  const validateField = useValidateField(formRef);
  const handleSubmit = useHandleSubmit(formRef);
  const submitForm = () => formRef.current?.submitForm();

  const {translation} = useTranslation();

  return (
    <FormScreenWrapper>
      <BackButton />
      <RecoverPasswordText type="title-big">
        {translation('RECOVER_PASSWORD')}
      </RecoverPasswordText>
      <ForgotPasswordForm ref={formRef} onSubmit={handleSubmit}>
        <EmailInput
          validateField={validateField}
          onSubmitEditing={submitForm}
          returnKeyType="send"
        />
      </ForgotPasswordForm>
      <SendButton text="Enviar" onPress={submitForm} />
    </FormScreenWrapper>
  );
}

export default ForgotPasswordFormPage;
