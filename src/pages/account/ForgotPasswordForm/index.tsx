import React, {useCallback, useRef} from 'react';

import {StackNavigationProp} from '@react-navigation/stack';
import {UnauthenticatedStackParams} from '@navigation/types';

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
import {handleErrorMessage} from '@shared/utils/errorHandler';
import {FormHandles} from '@unform/core';
import {useValidateField} from '@shared/hooks';
import {validateAll} from '@shared/utils/validations';
import {sendResetPasswordToken} from '@shared/firebase';
import {loaderHandler} from '@shared/components/LoadingHandler';
import {showToast} from '@shared/components/Toast';

interface Props {
  navigation: StackNavigationProp<
    UnauthenticatedStackParams,
    'ForgotPasswordForm'
  >;
}

interface FormDetails {
  email: string;
}

function ForgotPasswordForm({navigation}: Props) {
  const formRef = useRef<FormHandles>(null);
  const validateField = useValidateField(formRef);

  const handleSubmit = useCallback(
    async (form: FormDetails) => {
      const [formErrors, isValid] = validateAll(form);

      formRef.current?.setErrors(formErrors);

      if (isValid) {
        try {
          loaderHandler.showLoader();
          await sendResetPasswordToken(form.email);
          loaderHandler.hideLoader();
          showToast({
            text: 'Email enviado com sucesso',
            type: 'success',
            buttonLabel: 'Voltar ao login',
            buttonOnPress: () => navigation.navigate('Login'),
            remain: true,
          });
        } catch (error) {
          loaderHandler.hideLoader();
          handleErrorMessage(error);
        }
        return;
      }
    },
    [navigation],
  );

  return (
    <ScreenWrapper>
      <AnimatedBackground>
        <AnimatedBackgroundContent>
          <BackButton onPress={() => navigation.pop()} />
          <Text
            type="title-big"
            style={{alignSelf: 'center', marginVertical: 5}}>
            Recuperar Senha
          </Text>
          <Form ref={formRef} onSubmit={handleSubmit} style={{marginTop: 5}}>
            <TextInput
              label="Email"
              name="email"
              validateField={validateField}
              onSubmitEditing={() => formRef.current?.submitForm()}
              textContentType="emailAddress"
              autoCapitalize="none"
              returnKeyType="send"
            />
          </Form>
          <RoundedButton
            text="Enviar"
            style={{alignSelf: 'center'}}
            onPress={() => formRef.current?.submitForm()}
          />
        </AnimatedBackgroundContent>
      </AnimatedBackground>
    </ScreenWrapper>
  );
}

export default ForgotPasswordForm;
