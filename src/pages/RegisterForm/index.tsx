import React, {useRef} from 'react';
import {View} from 'react-native';
import {
  ScreenWrapper,
  RoudedButton,
  TextInput,
  Text,
} from '../../library/components';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import LinearGradient from 'react-native-linear-gradient';

import TTextInput from './UnformInput';

import {useDimensions} from '@react-native-community/hooks';

import styles from './styles';

const RegisterForm = () => {
  const formRef = useRef<FormHandles>(null);

  return (
    <ScreenWrapper>
      <LinearGradient style={styles.background} colors={['#66F6A9', '#1FB7C8']}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Text type="title-big" style={{alignSelf: 'center', marginTop: 10}}>
              Crie Sua Conta de Usuário
            </Text>
            <Form
              ref={formRef}
              onSubmit={(form) => {
                console.log('form', form);
              }}>
              <TTextInput label="lado" name="teste" defaultValue="kkk" />
              <TTextInput
                label="Qualquer coisa mesmo"
                name="email"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
            </Form>
          </View>
        </View>
      </LinearGradient>
      {/*<View
        style={{
          position: 'absolute',
          right: 0,
          width: 0,
          height: 0,
          backgroundColor: 'transparent',
          borderStyle: 'solid',
          borderLeftWidth: 420,
          borderTopWidth: 450,
          borderLeftColor: 'transparent',
          borderTopColor: 'red',
        }}
      />*/}
    </ScreenWrapper>
  );
};

export default RegisterForm;
