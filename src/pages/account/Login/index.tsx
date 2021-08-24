import React, {useRef} from 'react';
import {Image} from 'react-native';
import {FormHandles} from '@unform/core';

import {useValidateField} from '@shared/hooks';
import {ScreenWrapper} from '@shared/components';

import TextInput from './components/Input';
import {Props} from './types';
import {
  ImageBackground,
  LoginTextButton,
  LoginButton,
  TopText,
  FormContainer,
  ButtonContainer,
  LoginForm,
} from './styles';
import useHandleSubmit from './hooks/useHandleSubmit';

const Login = ({navigation}: Props) => {
  const formRef = useRef<FormHandles>(null);
  const validateField = useValidateField(formRef);

  const handleRegisterPress = () => navigation.navigate('RegisterForm');

  const handleForgotPasswordPress = () =>
    navigation.navigate('ForgotPasswordForm');

  const userWhithoutConfigurationsCallback = () =>
    navigation.navigate('ChooseUserConfigurations');

  const handleSubmit = useHandleSubmit(
    formRef,
    userWhithoutConfigurationsCallback,
  );

  return (
    <ScreenWrapper>
      <ImageBackground
        source={require('../../../assets/images/triangulo_play.png')}>
        <Image source={require('../../../assets/images/imagem_login.png')} />
      </ImageBackground>
      <FormContainer>
        <TopText>Digite seu e-mail e senha</TopText>
        <LoginForm ref={formRef} onSubmit={handleSubmit}>
          <TextInput
            iconName="user"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
            autoCompleteType="email"
            validateField={validateField}
            onSubmitEditing={() =>
              formRef.current?.getFieldRef('password').focus()
            }
            autoCapitalize="none"
            returnKeyType="next"
          />
          <TextInput
            iconName="lock"
            name="password"
            placeholder="Senha"
            textContentType="password"
            validateField={validateField}
            secureTextEntry
            autoCapitalize="none"
            onSubmitEditing={() => formRef.current?.submitForm()}
            returnKeyType="send"
          />
          <ButtonContainer>
            <LoginButton
              text="ENTRAR"
              onPress={() => formRef.current?.submitForm()}
            />
          </ButtonContainer>
        </LoginForm>

        <LoginTextButton
          text="Não tem cadastro?"
          textInEvidence="Cadastre-se aqui"
          onPress={handleRegisterPress}
        />
        <LoginTextButton
          text="Esqueceu sua senha?"
          textInEvidence="Recupere-a aqui"
          onPress={handleForgotPasswordPress}
        />
      </FormContainer>
    </ScreenWrapper>
  );
};

export default Login;
