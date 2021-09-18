import React, {useRef, useState} from 'react';
import {Animated, ScrollView} from 'react-native';

import {RoundedButton, TextButton} from '@/shared/components';
import {useTranslation} from '@/shared/hooks';
import {FormHandles} from '@/shared/models';
import RegisterForm from '@/templates/forms/RegisterForm';

import useHandleSubmit from './hooks/useHandleSubmit';
import useOnRegisterUserSuccessAnimation from './hooks/useOnRegisterUserSuccessAnimation';
import RegisterFormAnimatedBackground from './components/RegisterFormAnimatedBackground';
import AdvanceButton from './components/AdvanceButton';
import {Shadow, Content, FormWrapper, Title, Scroll} from './styles';
import {Props} from './types';

const RegisterFormPage: React.FC<Props> = ({navigation}) => {
  const formRef = useRef<FormHandles>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const {translation} = useTranslation();

  const [isConfirmed, setIsConfirmed] = useState(false);

  const onRegisteredUser = () => {
    setIsConfirmed(true);
    scrollViewRef.current?.scrollToEnd({animated: true});
  };

  const handleSubmit = useHandleSubmit({
    onRegisteredUser,
  });

  const {
    advanceButtonRight,
    confirmButtonWidth,
  } = useOnRegisterUserSuccessAnimation(isConfirmed);

  return (
    <Scroll ref={scrollViewRef}>
      <RegisterFormAnimatedBackground>
        <Content>
          <Title type="title">{translation('CREATE_YOUR_USER_ACCOUNT')}</Title>
          <FormWrapper>
            <RegisterForm ref={formRef} onSubmitSuccess={handleSubmit} />
            <Animated.View style={{width: confirmButtonWidth, marginTop: 10}}>
              <RoundedButton
                inverted
                disabled={isConfirmed}
                text={isConfirmed ? '' : translation('SEND')}
                icon={isConfirmed ? 'check' : ''}
                onPress={() => formRef.current?.submitForm()}
              />
            </Animated.View>
          </FormWrapper>
          <TextButton
            style={{marginTop: 10, marginBottom: 5, alignSelf: 'center'}}
            onPress={() => navigation.navigate('Login')}
            text={translation('QUESTION_ALREADY_HAVE_AN_ACCOUNT')}
            textInEvidence={translation('CONNECT_HERE')}
          />
        </Content>
      </RegisterFormAnimatedBackground>
      {isConfirmed && <Shadow />}
      <AdvanceButton
        onPress={() => navigation.navigate('ChooseUserConfigurations')}
        style={{right: advanceButtonRight}}
      />
    </Scroll>
  );
};

export default RegisterFormPage;
