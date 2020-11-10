import React, {useRef, useCallback} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import {authenticateUser} from '@store/account/user';
import {validateAll} from '@shared/utils/validations';
import {useValidateField} from '@shared/hooks';
import {Props, FormDetails} from './types';
import {RoundedButton, ScreenWrapper, TextButton} from '@shared/components';
import TextInput from './Input';

import styles from './styles';

const Login = ({navigation}: Props) => {
  const dispatch = useDispatch();
  const formRef = useRef<FormHandles>(null);
  const validateField = useValidateField(formRef);

  const handleRegisterPress = useCallback(
    () => navigation.navigate('RegisterForm'),
    [navigation],
  );

  const handleSubmit = useCallback(
    async (form: FormDetails) => {
      const [formErrors, isValid] = validateAll(form);

      if (!isValid) {
        formRef.current?.setErrors(formErrors);
        return;
      }

      const response = await dispatch(
        authenticateUser({
          email: form.email,
          password: form.password,
        }),
      );

      const payload = response.payload as any;

      if (!payload.isLogged) {
        navigation.navigate('ChooseUserConfigurations');
      }
    },
    [dispatch, formRef, navigation],
  );

  return (
    <ScreenWrapper style={styles.screen}>
      <View style={styles.formWrapper}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <TextInput
            iconName="user"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
            autoCompleteType="email"
            validateField={validateField} // Valida ao o usuario digitar
            onSubmitEditing={() =>
              formRef.current?.getFieldRef('password').focus()
            }
            autoCapitalize="none"
          />
          <TextInput
            iconName="lock"
            name="password"
            placeholder="Senha"
            textContentType="password"
            validateField={validateField} // Valida ao o usuario digitar
            secureTextEntry
            autoCapitalize="none"
            onSubmitEditing={() => formRef.current?.submitForm()}
          />
        </Form>
        <View style={styles.buttonWrapper}>
          <RoundedButton
            style={{
              backgroundColor: '#e63a5a',
            }}
            text="Entrar"
            onPress={() => formRef.current?.submitForm()}
          />
        </View>
        <TextButton
          textInEvidenceStyle={{
            color: '#e63a5a',
          }}
          text="Não tem cadastro?"
          textInEvidence="Cadastre-se aqui"
          onPress={handleRegisterPress}
        />
      </View>
    </ScreenWrapper>
  );
};

export default Login;
