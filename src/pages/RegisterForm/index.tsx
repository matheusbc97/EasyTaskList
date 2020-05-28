import React, {useRef} from 'react';
import {View} from 'react-native';
import {ScreenWrapper, RoudedButton, Text} from '../../library/components';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import LinearGradient from 'react-native-linear-gradient';

import TextInput from './UnformInput';
import useValidateField from '../../library/hooks/useValidateField';

import styles from './styles';

const RegisterForm = () => {
  const formRef = useRef<FormHandles>(null);
  const validateField = useValidateField(formRef);

  return (
    <ScreenWrapper>
      <LinearGradient style={styles.background} colors={['#66F6A9', '#1FB7C8']}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Text type="title" style={styles.title}>
              Crie Sua Conta de Usuário
            </Text>
            <View style={{marginTop: 15, paddingTop: 10}}>
              <Form
                ref={formRef}
                onSubmit={(form) => {
                  console.log('form', form);
                }}>
                <TextInput
                  label="Nome"
                  name="name"
                  validateField={validateField}
                />
                <TextInput
                  label="Email"
                  name="email"
                  validateField={validateField}
                />
                <TextInput
                  label="Senha"
                  name="newPassword"
                  validateField={validateField}
                />
                <TextInput
                  label="Confirmar Senha"
                  name="confirmPassword"
                  validateField={validateField}
                />
              </Form>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ScreenWrapper>
  );
};

export default RegisterForm;
