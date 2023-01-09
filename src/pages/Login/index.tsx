import React, {useRef} from 'react';
import {Image} from 'react-native';

import {useTranslation} from '@/shared/hooks';
import {ScreenWrapper} from '@/shared/components';
import {FormHandles} from '@/shared/models';
import LoginForm from '@/shared/templates/forms/LoginForm';
import {TRIANGLE_PLAY, PEOPLE_LOGIN} from '@/assets/images';

import {Props} from './types';
import {
  ImageBackground,
  LoginTextButton,
  LoginButton,
  TopText,
  FormContainer,
  ButtonContainer,
} from './styles';
import useHandleSubmit from './hooks/useHandleSubmit';

const Login = ({navigation}: Props) => {
  const {translation} = useTranslation();
  const formRef = useRef<FormHandles>(null);

  const userWhithoutConfigurationsCallback = () =>
    navigation.navigate('ChooseUserConfigurations');

  const handleSubmit = useHandleSubmit(userWhithoutConfigurationsCallback);

  return (
    <ScreenWrapper>
      <ImageBackground source={TRIANGLE_PLAY}>
        <Image source={PEOPLE_LOGIN} />
      </ImageBackground>
      <FormContainer>
        <TopText>{translation('TYPE_YOUR_EMAIL_AND_PASSWORD')}</TopText>

        <LoginForm ref={formRef} onSubmitSuccess={handleSubmit} />

        <ButtonContainer>
          <LoginButton
            text={translation('LOG_IN')}
            onPress={() => formRef.current?.submitForm()}
          />
        </ButtonContainer>

        <LoginTextButton
          text={translation('QUESTION_DO_NOT_HAVE_A_REGISTRATION')}
          textInEvidence={translation('REGISTER_HERE')}
          onPress={() => navigation.navigate('RegisterForm')}
        />
        <LoginTextButton
          text={translation('QUESTION_FORGOT_PASSWORD')}
          textInEvidence={translation('RECOVER_HERE')}
          onPress={() => navigation.navigate('ForgotPasswordForm')}
        />
      </FormContainer>
    </ScreenWrapper>
  );
};

export default Login;
