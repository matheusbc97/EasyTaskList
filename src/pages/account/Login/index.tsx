import React, {useRef} from 'react';
import {Image} from 'react-native';
import {FormHandles} from '@unform/core';

import {useValidateField, useTranslation} from '@shared/hooks';
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
  const {translation} = useTranslation();
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
        <TopText>{translation('TYPE_YOUR_EMAIL_AND_PASSWORD')}</TopText>
        <LoginForm ref={formRef} onSubmit={handleSubmit}>
          <TextInput
            iconName="user"
            name="email"
            placeholder={translation('EMAIL')}
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
            placeholder={translation('PASSWORD')}
            textContentType="password"
            validateField={validateField}
            secureTextEntry
            autoCapitalize="none"
            onSubmitEditing={() => formRef.current?.submitForm()}
            returnKeyType="send"
          />
          <ButtonContainer>
            <LoginButton
              text={translation('LOG_IN')}
              onPress={() => formRef.current?.submitForm()}
            />
          </ButtonContainer>
        </LoginForm>

        <LoginTextButton
          text={translation('QUESTION_DO_NOT_HAVE_A_REGISTRATION')}
          textInEvidence={translation('REGISTER_HERE')}
          onPress={handleRegisterPress}
        />
        <LoginTextButton
          text={translation('QUESTION_FORGOT_PASSWORD')}
          textInEvidence={translation('RECOVER_HERE')}
          onPress={handleForgotPasswordPress}
        />
      </FormContainer>
    </ScreenWrapper>
  );
};

export default Login;
