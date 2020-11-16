import React, {useRef, useCallback} from 'react';

import {FormHandles} from '@unform/core';
import {Form} from '@unform/mobile';

import {
  AnimatedBackground,
  UnformInput as TextInput,
  Text,
  BackButton,
  RoundedButton,
} from '@shared/components';
import {useValidateField} from '@shared/hooks';
import {validateAll} from '@shared/utils/validations';

import {Content} from './styles';

interface FormDetails {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}

export default function ChangePasswordForm() {
  const formRef = useRef<FormHandles>(null);
  const validateField = useValidateField(formRef);

  const handleSubmit = useCallback((form: FormDetails) => {
    const [formErrors, isValid] = validateAll(form);

    formRef.current?.setErrors(formErrors);

    if (isValid) {
      return;
    }
  }, []);

  return (
    <AnimatedBackground>
      <Content>
        <BackButton onPress={() => {}} />
        <Text type="title-big" style={{alignSelf: 'center', marginVertical: 5}}>
          Alterar Senha
        </Text>
        <Form ref={formRef} onSubmit={handleSubmit} style={{marginTop: 5}}>
          <TextInput
            label="Senha Atual"
            name="password"
            validateField={validateField}
            onSubmitEditing={() =>
              formRef.current?.getFieldRef('newPassword').focus()
            }
            secureTextEntry
            textContentType="password"
            autoCapitalize="none"
            returnKeyType="next"
          />
          <TextInput
            label="Nova Senha"
            name="newPassword"
            validateField={validateField}
            onSubmitEditing={() =>
              formRef.current?.getFieldRef('confirmNewPassword').focus()
            }
            secureTextEntry
            textContentType="newPassword"
            autoCapitalize="none"
            returnKeyType="next"
          />
          <TextInput
            label="Confirmar Nova Senha"
            name="confirmNewPassword"
            validateField={validateField}
            secureTextEntry
            textContentType="newPassword"
            autoCapitalize="none"
          />
        </Form>
        <RoundedButton
          text="Salvar"
          style={{alignSelf: 'center'}}
          onPress={() => formRef.current?.submitForm()}
        />
      </Content>
    </AnimatedBackground>
  );
}
