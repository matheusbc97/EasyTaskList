import React, {useRef, useCallback} from 'react';

import {FormHandles} from '@unform/core';
import {Form} from '@unform/mobile';
import {changeUserPassword} from '@shared/firebase';

import {
  AnimatedBackground,
  UnformInput as TextInput,
  Text,
  BackButton,
  RoundedButton,
} from '@shared/components';
import {useValidateField} from '@shared/hooks';
import {validateAll} from '@shared/utils/validations';
import {showToast} from '@shared/components/Toast';
import {loaderHandler} from '@shared/components/LoadingHandler';
import {handleErrorMessage} from '@shared/utils/errorHandler';

import {Content} from './styles';
import {AuthenticatedStackParams} from '@navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

interface Props {
  navigation: StackNavigationProp<
    AuthenticatedStackParams,
    'ChangePasswordForm'
  >;
  route: RouteProp<AuthenticatedStackParams, 'ChangePasswordForm'>;
}

interface FormDetails {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}

function ChangePasswordForm({navigation}: Props) {
  const formRef = useRef<FormHandles>(null);
  const validateField = useValidateField(formRef);

  const handleSubmit = useCallback(
    async (form: FormDetails) => {
      const [formErrors, isValid] = validateAll(form);

      formRef.current?.setErrors(formErrors);

      if (isValid) {
        try {
          loaderHandler.showLoader();
          await changeUserPassword(form.password, form.newPassword);
          loaderHandler.hideLoader();
          navigation.pop();
          showToast({
            text: 'Senha Alterada Com sucesso',
            type: 'success',
          });
        } catch (error) {
          handleErrorMessage(error);
        }
        return;
      }
    },
    [navigation],
  );

  return (
    <AnimatedBackground>
      <Content>
        <BackButton onPress={() => navigation.pop()} />
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

export default ChangePasswordForm;
