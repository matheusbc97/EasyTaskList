import React, {useRef, useCallback} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import {authenticateUser} from '@store/account/user';
import {validateAll} from '@shared/utils/validations';
import {useValidateField} from '@shared/hooks';
import {Props, FormDetails} from './types';
import {RoudedButton, ScreenWrapper, Text} from '@shared/components';
import TextInput from './Input';

import styles from './styles';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Login = ({navigation}: Props) => {
  const dispatch = useDispatch();
  const formRef = useRef<FormHandles>(null);
  const validateField = useValidateField(formRef);

  const handleSubmit = useCallback(
    (form: FormDetails) => {
      const [formErrors, isValid] = validateAll(form);

      isValid
        ? dispatch(
            authenticateUser({
              email: form.email,
            }),
          )
        : formRef.current?.setErrors(formErrors);
    },
    [dispatch, formRef],
  );

  return (
    <ScreenWrapper style={styles.screen}>
      <View style={styles.formWrapper}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <TextInput
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
            autoCompleteType="email"
            validateField={validateField} // Valida ao o usuario digitar
            onSubmitEditing={() =>
              formRef.current?.getFieldRef('password').focus()
            }
          />
          <TextInput
            name="password"
            placeholder="Senha"
            textContentType="password"
            validateField={validateField} // Valida ao o usuario digitar
            secureTextEntry
            onSubmitEditing={() => formRef.current?.submitForm()}
          />
        </Form>
        <View style={styles.buttonWrapper}>
          <RoudedButton
            text="Entrar"
            onPress={() => formRef.current?.submitForm()}
          />
        </View>
        <TouchableOpacity style={styles.registerButton} onPress={() => {}}>
          <Text>Não tem cadastro? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

export default Login;
