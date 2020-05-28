import React, {useCallback, useRef} from 'react';
import {View, ScrollView} from 'react-native';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import {useDispatch} from 'react-redux';

import {
  FloatingLabelIpnput,
  ScreenWrapper,
  RoudedButton,
} from '../../../library/components';
import {validateAll} from '../../../library/utils/validations';
import {FormDetails} from './types';
import useValidateField from '../../../library/hooks/useValidateField';
import {registerUser} from '../../../store/account/actions';

import styles from './styles';

const Register = () => {
  const formRef = useRef<FormHandles>(null);
  const dispatch = useDispatch();

  const validateField = useValidateField(formRef);

  const handleSubmit = useCallback(
    (form: FormDetails) => {
      const [formErrors, isValid] = validateAll(form);

      if (isValid) {
        dispatch(
          registerUser({
            name: form.name,
            email: form.email,
            password: form.newPassword,
          }),
        );
      } else {
        formRef.current?.setErrors(formErrors);
      }
    },
    [dispatch],
  );

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <FloatingLabelIpnput
              label="Nome"
              name="name"
              validateField={validateField}
              autoCapitalize="words"
              autoCompleteType="name"
              textContentType="name"
              onSubmitEditing={() =>
                formRef.current?.getFieldRef('email').focus()
              }
            />
            <FloatingLabelIpnput
              validateField={validateField}
              label="Email"
              name="email"
              textContentType="emailAddress"
              autoCapitalize="none"
              autoCompleteType="email"
              onSubmitEditing={() =>
                formRef.current?.getFieldRef('newPassword').focus()
              }
            />
            <FloatingLabelIpnput
              validateField={validateField}
              label="Senha"
              name="newPassword"
              textContentType="password"
              secureTextEntry
              onSubmitEditing={() =>
                formRef.current?.getFieldRef('confirmPassword').focus()
              }
            />
            <FloatingLabelIpnput
              validateField={validateField}
              label="Confirmar Senha"
              name="confirmPassword"
              textContentType="password"
              secureTextEntry
              onSubmitEditing={() => formRef.current?.submitForm()}
            />
          </Form>
        </View>
        <View style={styles.buttonWrapper}>
          <RoudedButton
            text="Enviar"
            onPress={() => formRef.current?.submitForm()}
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Register;
