import React, {useRef, useState} from 'react';
import {Animated, ScrollView} from 'react-native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import useValidateField from '@shared/hooks/useValidateField';
import {
  RoundedButton,
  TextButton,
  EmailInput,
  ConfirmNewPasswordInput,
  NewPasswordInput,
  ScreenWrapper,
  CheckInputWithButtonText,
} from '@shared/components';
import {useTranslation} from '@/shared/hooks';

import useHandleSubmit from './hooks/useHandleSubmit';
import useOnRegisterUserSuccessAnimation from './hooks/useOnRegisterUserSuccessAnimation';
import RegisterFormAnimatedBackground from './components/RegisterFormAnimatedBackground';
import AdvanceButton from './components/AdvanceButton';
import {
  Shadow,
  Content,
  FormWrapper,
  Title,
  Scroll,
  FormFooter,
} from './styles';
import {Props} from './types';

const RegisterForm: React.FC<Props> = ({navigation}) => {
  const formRef = useRef<FormHandles>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const validateField = useValidateField(formRef);
  const {translation} = useTranslation();

  const [privacyPolicyIsChecked, setPrivacyPolicyIsChecked] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const onRegisteredUser = () => {
    setIsConfirmed(true);
    scrollViewRef.current?.scrollToEnd({animated: true});
  };

  const handleSubmit = useHandleSubmit({
    formRef,
    onRegisteredUser,
    privacyPolicyIsChecked,
  });

  const {
    advanceButtonRight,
    confirmButtonWidth,
  } = useOnRegisterUserSuccessAnimation(isConfirmed);

  const focusInput = (name: string) => () =>
    formRef.current?.getFieldRef(name).focus();

  return (
    <ScreenWrapper>
      <Scroll ref={scrollViewRef}>
        <RegisterFormAnimatedBackground>
          <Content>
            <Title type="title">
              {translation('CREATE_YOUR_USER_ACCOUNT')}
            </Title>
            <FormWrapper>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <EmailInput
                  validateField={validateField}
                  onSubmitEditing={focusInput('newPassword')}
                />
                <NewPasswordInput
                  validateField={validateField}
                  onSubmitEditing={focusInput('confirmNewPassword')}
                />
                <ConfirmNewPasswordInput validateField={validateField} />

                <CheckInputWithButtonText
                  value={privacyPolicyIsChecked}
                  onChange={value => setPrivacyPolicyIsChecked(value)}
                  text={translation('I_READ_AND_I_AGREE_WITH_THE')}
                  textInEvidence={translation('PRIVACY_POLICY')}
                  onTextInEvidencePress={() =>
                    navigation.navigate('PrivacyPolicy')
                  }
                />
                <FormFooter>
                  <Animated.View style={{width: confirmButtonWidth}}>
                    <RoundedButton
                      disabled={isConfirmed}
                      style={{width: '100%'}}
                      text={isConfirmed ? '' : translation('SEND')}
                      inverted
                      icon={isConfirmed ? 'check' : ''}
                      onPress={() => formRef.current?.submitForm()}
                    />
                  </Animated.View>
                </FormFooter>
              </Form>
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
    </ScreenWrapper>
  );
};

export default RegisterForm;
