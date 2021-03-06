import React, {useRef, useCallback} from 'react';
import {View, Image, ImageBackground} from 'react-native';
import {useDispatch} from 'react-redux';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
//import {Switch} from 'react-native-paper';
import {authenticateUser} from '@store/account/user';
import {validateAll} from '@shared/utils/validations';
import {useValidateField} from '@shared/hooks';
import {Props, FormDetails} from './types';
import {
  RoundedButton,
  ScreenWrapper,
  TextButton,
  Text,
} from '@shared/components';
import TextInput from './Input';

import styles from './styles';

const Login = ({navigation}: Props) => {
  const dispatch = useDispatch();
  const formRef = useRef<FormHandles>(null);
  const validateField = useValidateField(formRef);

  //const [rememberUser, changeRememberUser] = useSwitchState();

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

      if (!response.payload) {
        //Some error happened
        return;
      }

      const payload = response.payload as any;

      if (!payload.isLogged) {
        navigation.navigate('ChooseUserConfigurations');
      }
    },
    [dispatch, formRef, navigation],
  );

  return (
    <ScreenWrapper>
      <ImageBackground
        style={{
          width: '100%',
          paddingVertical: 40,
          alignItems: 'center',
        }}
        source={require('../../../assets/images/triangulo_play.png')}>
        <Image source={require('../../../assets/images/imagem_login.png')} />
      </ImageBackground>
      <View style={styles.formWrapper}>
        <Text style={{color: '#E63A5A', fontSize: 24, fontWeight: 'bold'}}>
          Digite seu e-mail
        </Text>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          style={{width: '100%', marginTop: 10}}>
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
          {/*<View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-end',
            }}>
            <Text type="title" style={{color: '#E63A5A'}}>
              Lembrar usuário
            </Text>
            <Switch
              value={rememberUser}
              onValueChange={changeRememberUser}
              color="#E63A5A"
            />
          </View>*/}
        </Form>
        <View style={styles.buttonWrapper}>
          <RoundedButton
            style={{
              backgroundColor: '#e63a5a',
            }}
            text="ENTRAR"
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
        <TextButton
          textInEvidenceStyle={{
            color: '#e63a5a',
          }}
          text="Esqueceu sua senha?"
          textInEvidence="Recupere-a aqui"
          onPress={() => navigation.navigate('ForgotPasswordForm')}
        />
      </View>
    </ScreenWrapper>
  );
};

export default Login;
