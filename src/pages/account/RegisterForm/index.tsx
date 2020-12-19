import React, {useRef, useState, useMemo, useEffect, useCallback} from 'react';
import {
  View,
  Animated,
  Image,
  ScrollView,
  ImageBackground,
  Platform,
} from 'react-native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import LinearGradient from 'react-native-linear-gradient';
import {Checkbox, TouchableRipple, Switch} from 'react-native-paper';
import {useDimensions} from '@react-native-community/hooks';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch} from 'react-redux';

import useValidateField from '@shared/hooks/useValidateField';
import {
  ScreenWrapper,
  RoundedButton,
  Text,
  UnformInput as TextInput,
  TextButton,
} from '@shared/components';
import {
  GEAR,
  PERSON_SEATED,
  GRAPH,
  CHECKED,
  PIZZA_GRAPH,
  ADVANCE_BTN,
} from '@assets/images';
import {UnauthenticatedStackParams} from '@navigation/types';
import {registerUser} from '@store/account/user';
import {validateAll} from '@shared/utils/validations';
import {showToast} from '@shared/components/Toast';

import styles from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';

type ChooseUserConfigurationsNavigationProp = StackNavigationProp<
  UnauthenticatedStackParams,
  'ChooseUserConfigurations'
>;

interface FormDetails {
  name: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
}

interface Props {
  navigation: ChooseUserConfigurationsNavigationProp;
}

const RegisterForm: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const formRef = useRef<FormHandles>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const validateField = useValidateField(formRef);
  const [privacyPolicyIsChecked, setPrivacyPolicyIsChecked] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const width = useDimensions().window.width;
  const backgroundWidth = useMemo(() => new Animated.Value(width + 80), [
    width,
  ]);

  const confirmButtonWidth = useMemo(() => new Animated.Value(200), []);
  const advanceButtonRight = useMemo(() => new Animated.Value(-100), []);

  const AnimatedLinearGradient = useMemo(
    () => Animated.createAnimatedComponent(LinearGradient),
    [],
  );

  const handlePrivacyPolicyCheckChange = useCallback(
    () => setPrivacyPolicyIsChecked(!privacyPolicyIsChecked),
    [privacyPolicyIsChecked],
  );

  const handleSubmit = useCallback(
    async (form: FormDetails) => {
      const [formErrors, isValid] = validateAll(form);

      formRef.current?.setErrors(formErrors);

      if (!privacyPolicyIsChecked) {
        showToast({
          text: 'É necessário aceitar os termos de privacidade',
          type: 'danger',
          remain: true,
        });
        return;
      }

      if (isValid) {
        const {email, newPassword: password} = form;
        const action = await dispatch(
          registerUser({
            email,
            password,
          }),
        );

        if (action.payload) {
          setIsConfirmed(true);

          scrollViewRef.current?.scrollToEnd({animated: true});
        }
      }
    },
    [dispatch, privacyPolicyIsChecked],
  );

  useEffect(() => {
    Animated.timing(backgroundWidth, {
      toValue: 0,
      useNativeDriver: false,
      duration: 350,
      delay: 350,
    }).start();
  }, [backgroundWidth]);

  useEffect(() => {
    if (isConfirmed) {
      Animated.timing(confirmButtonWidth, {
        toValue: 33,
        useNativeDriver: false,
        duration: 350,
      }).start(() =>
        Animated.spring(advanceButtonRight, {
          toValue: 40,
          useNativeDriver: false,
          bounciness: 14,
        }).start(),
      );
    }
  }, [isConfirmed, confirmButtonWidth, advanceButtonRight]);
  console.log('isCon', isConfirmed);
  return (
    <>
      <ScreenWrapper>
        <ScrollView contentContainerStyle={styles.scroll} ref={scrollViewRef}>
          <AnimatedLinearGradient
            style={[styles.background, {right: backgroundWidth}]}
            colors={['#66F6A9', '#1FB7C8']}>
            <View style={[styles.container]}>
              <Image source={PERSON_SEATED} style={styles.personSeatedImage} />
              <Image source={CHECKED} style={styles.checkedImage} />
              <Image source={PIZZA_GRAPH} style={styles.pizzaGraphImage} />

              <View style={styles.content}>
                <Text type="title" style={styles.title}>
                  Crie Sua Conta de Usuário
                </Text>
                <View style={styles.formWrapper}>
                  <Form ref={formRef} onSubmit={handleSubmit}>
                    <TextInput
                      label="Email"
                      name="email"
                      textContentType="emailAddress"
                      validateField={validateField}
                      onSubmitEditing={() =>
                        formRef.current?.getFieldRef('newPassword').focus()
                      }
                      autoCapitalize="none"
                      autoCompleteType="email"
                    />
                    <TextInput
                      label="Senha"
                      name="newPassword"
                      validateField={validateField}
                      onSubmitEditing={() =>
                        formRef.current
                          ?.getFieldRef('confirmNewPassword')
                          .focus()
                      }
                      secureTextEntry
                      textContentType="newPassword"
                      autoCapitalize="none"
                    />
                    <TextInput
                      label="Confirmar Senha"
                      name="confirmNewPassword"
                      validateField={validateField}
                      secureTextEntry
                      textContentType="newPassword"
                      autoCapitalize="none"
                    />
                  </Form>
                </View>
                <TouchableOpacity
                  style={styles.checkBoxItem}
                  onPress={handlePrivacyPolicyCheckChange}>
                  {Platform.OS === 'ios' ? (
                    <Switch
                      style={{marginHorizontal: 10}}
                      value={privacyPolicyIsChecked}
                      onValueChange={handlePrivacyPolicyCheckChange}
                    />
                  ) : (
                    <Checkbox
                      status={privacyPolicyIsChecked ? 'checked' : 'unchecked'}
                      onPress={handlePrivacyPolicyCheckChange}
                    />
                  )}
                  <Text style={styles.checkBoxText}>
                    Li e concordo com a política de privacidade
                  </Text>
                </TouchableOpacity>
                <View style={styles.footer}>
                  <Animated.View style={{width: confirmButtonWidth}}>
                    <RoundedButton
                      disabled={isConfirmed}
                      style={{width: '100%'}}
                      text={isConfirmed ? '' : 'Enviar'}
                      inverted
                      icon={isConfirmed ? 'check' : ''}
                      onPress={() => formRef.current?.submitForm()}
                    />
                  </Animated.View>
                  <TextButton
                    style={{marginTop: 10, marginBottom: 5}}
                    onPress={() => navigation.navigate('Login')}
                    text="Já possui uma conta?"
                    textInEvidence="Conecte-se aqui."
                  />
                </View>
              </View>
            </View>
            <Image source={GEAR} style={styles.gearImage} />
            <Image source={GRAPH} style={styles.graphImage} />
            <Animated.View
              style={[
                styles.advanceButtonContainer,
                {
                  right: advanceButtonRight,
                },
              ]}>
              <TouchableRipple
                onPress={() => navigation.navigate('ChooseUserConfigurations')}>
                <ImageBackground
                  source={ADVANCE_BTN}
                  style={styles.advanceButton}>
                  <Text
                    type="title"
                    style={{paddingLeft: 20, color: '#1fb7c8'}}>
                    AVANÇAR
                  </Text>
                  <MaterialIcon
                    name="keyboard-arrow-right"
                    size={40}
                    style={{marginLeft: -8, color: '#1fb7c8'}}
                  />
                </ImageBackground>
              </TouchableRipple>
            </Animated.View>
            {isConfirmed && (
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#000',
                  opacity: 0.2,
                  position: 'absolute',
                }}
              />
            )}
          </AnimatedLinearGradient>
        </ScrollView>
      </ScreenWrapper>
    </>
  );
};

export default RegisterForm;
