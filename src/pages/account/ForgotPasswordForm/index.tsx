import React, {useRef} from 'react';

import {
  Text,
  ScreenWrapper,
  AnimatedBackground,
  AnimatedBackgroundContent,
  BackButton,
  UnformInput as TextInput,
  RoundedButton,
} from '@shared/components';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import {useValidateField} from '@shared/hooks';
import styled from 'styled-components/native';
import useHandleSubmit from './hooks/useHandleSubmit';

const RecoverPasswordText = styled(Text)`
  align-self: center;
  margin: 5px 0;
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

  return (
    <ScreenWrapper>
      <AnimatedBackground>
        <AnimatedBackgroundContent>
          <BackButton />
          <RecoverPasswordText type="title-big">
            Recuperar Senha
          </RecoverPasswordText>
          <ForgotPasswordForm ref={formRef} onSubmit={handleSubmit}>
            <TextInput
              label="Email"
              name="email"
              validateField={validateField}
              onSubmitEditing={submitForm}
              textContentType="emailAddress"
              autoCapitalize="none"
              returnKeyType="send"
            />
          </ForgotPasswordForm>
          <SendButton text="Enviar" onPress={submitForm} />
        </AnimatedBackgroundContent>
      </AnimatedBackground>
    </ScreenWrapper>
  );
}

export default ForgotPasswordFormPage;
